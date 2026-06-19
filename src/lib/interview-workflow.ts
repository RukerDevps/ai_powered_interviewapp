import {
  InterviewDifficulty,
  InterviewStatus,
  type Interview,
  type InterviewQuestion,
} from "@/generated/prisma/client";
import { evaluateInterviewAnswer } from "@/agent/answer-evaluator";
import { evaluateCompletedInterview } from "@/agent/final-evaluator";
import { generateInterviewQuestion } from "@/agent/interviewer";
import type {
  ConversationTurn,
  InterviewContext,
  InterviewDifficultyValue,
} from "@/agent/types";
import { prisma } from "@/lib/prisma";
import type { InterviewStatusValue } from "@/types";

export interface CreateInterviewInput {
  role: string;
  experienceLevel: string;
  interviewType: string;
  skills: string[];
  duration: string;
  questionTarget: string;
  timePerQuestion: string;
  sections: string[];
  questionFocus: string;
  jobDescriptionText?: string;
}

export interface SubmitAnswerInput {
  interviewId: string;
  questionId: string;
  answer: string;
}

const difficultyOrder: InterviewDifficulty[] = [
  InterviewDifficulty.easy,
  InterviewDifficulty.medium,
  InterviewDifficulty.hard,
];

export function normalizeDifficulty(difficulty: InterviewDifficulty): InterviewDifficultyValue {
  return difficulty;
}

export function initialDifficultyForExperience(experienceLevel: string) {
  const normalized = experienceLevel.toLowerCase();

  if (normalized.includes("junior")) {
    return InterviewDifficulty.easy;
  }

  if (normalized.includes("senior")) {
    return InterviewDifficulty.hard;
  }

  return InterviewDifficulty.medium;
}

export function parseDurationMinutes(duration: string) {
  const match = duration.match(/\d+/);
  return match ? Number(match[0]) : 30;
}

export function getNextDifficulty(current: InterviewDifficulty, score: number) {
  const currentIndex = difficultyOrder.indexOf(current);

  if (score >= 75) {
    return difficultyOrder[Math.min(currentIndex + 1, difficultyOrder.length - 1)];
  }

  if (score < 45) {
    return difficultyOrder[Math.max(currentIndex - 1, 0)];
  }

  return current;
}

export function buildInterviewContext(interview: Pick<
  Interview,
  | "role"
  | "experienceLevel"
  | "interviewType"
  | "skills"
  | "sections"
  | "questionFocus"
  | "jobDescriptionText"
>): InterviewContext {
  return {
    role: interview.role,
    experienceLevel: interview.experienceLevel,
    interviewType: interview.interviewType,
    skills: interview.skills,
    sections: interview.sections,
    questionFocus: interview.questionFocus,
    jobDescriptionText: interview.jobDescriptionText,
  };
}

export function buildConversationTurns(questions: InterviewQuestion[]): ConversationTurn[] {
  return questions.map((question) => ({
    order: question.order,
    question: question.questionText,
    answer: question.answerText,
    score: question.answerScore,
    difficulty: normalizeDifficulty(question.difficulty),
  }));
}

export async function createInterviewForUser(userId: string, input: CreateInterviewInput) {
  const difficulty = initialDifficultyForExperience(input.experienceLevel);
  const context: InterviewContext = {
    role: input.role,
    experienceLevel: input.experienceLevel,
    interviewType: input.interviewType,
    skills: input.skills,
    sections: input.sections,
    questionFocus: input.questionFocus,
    jobDescriptionText: input.jobDescriptionText,
  };
  const firstQuestion = await generateInterviewQuestion({
    context,
    difficulty: normalizeDifficulty(difficulty),
    history: [],
  });

  return prisma.interview.create({
    data: {
      userId,
      role: input.role,
      experienceLevel: input.experienceLevel,
      interviewType: input.interviewType,
      skills: input.skills,
      durationMinutes: parseDurationMinutes(input.duration),
      questionTarget: input.questionTarget,
      timePerQuestion: input.timePerQuestion,
      sections: input.sections,
      questionFocus: input.questionFocus,
      jobDescriptionText: input.jobDescriptionText?.trim() || null,
      currentDifficulty: difficulty,
      questions: {
        create: {
          order: 1,
          questionText: firstQuestion.question,
          difficulty,
        },
      },
    },
    include: {
      questions: {
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function submitInterviewAnswerForUser(userId: string, input: SubmitAnswerInput) {
  const answer = input.answer.trim();

  if (!answer) {
    throw new Error("Answer is required.");
  }

  const interview = await prisma.interview.findFirst({
    where: {
      id: input.interviewId,
      userId,
      status: InterviewStatus.in_progress,
    },
    include: {
      questions: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!interview) {
    throw new Error("Interview not found or not in progress.");
  }

  const currentQuestion = interview.questions.find(
    (question) => question.id === input.questionId && !question.answerText
  );

  if (!currentQuestion) {
    throw new Error("Current question was not found or already answered.");
  }

  const context = buildInterviewContext(interview);
  const evaluation = await evaluateInterviewAnswer({
    context,
    question: currentQuestion.questionText,
    answer,
    difficulty: normalizeDifficulty(currentQuestion.difficulty),
  });
  const isVeryPoor = evaluation.overallScore < 25;
  const nextDifficulty = getNextDifficulty(
    interview.currentDifficulty,
    evaluation.overallScore
  );
  const nextVeryPoorTotal = interview.veryPoorTotal + (isVeryPoor ? 1 : 0);
  const nextConsecutiveVeryPoor = isVeryPoor ? interview.consecutiveVeryPoor + 1 : 0;
  const shouldStopAsNotEligible = nextConsecutiveVeryPoor >= 2 || nextVeryPoorTotal >= 3;
  const nextOrder = interview.questions.length + 1;

  if (shouldStopAsNotEligible) {
    await prisma.interview.update({
      where: { id: interview.id },
      data: {
        status: InterviewStatus.not_eligible,
        completedAt: new Date(),
        currentDifficulty: nextDifficulty,
        questionsAttempted: { increment: 1 },
        veryPoorTotal: nextVeryPoorTotal,
        consecutiveVeryPoor: nextConsecutiveVeryPoor,
        questions: {
          update: {
            where: { id: currentQuestion.id },
            data: {
              answerText: answer,
              answerSubmittedAt: new Date(),
              answerScore: evaluation.overallScore,
              clarityScore: evaluation.clarityScore,
              relevanceScore: evaluation.relevanceScore,
              depthScore: evaluation.technicalDepthScore,
              confidenceScore: evaluation.confidenceScore,
              evaluationSummary: evaluation.summary,
              feedback: evaluation.feedback,
              veryPoor: isVeryPoor,
            },
          },
        },
      },
    });

    await finalizeInterviewForUser(userId, interview.id, InterviewStatus.not_eligible);

    return {
      status: InterviewStatus.not_eligible,
      message: "You are not eligible for this role based on this interview performance.",
      evaluation,
      difficulty: nextDifficulty,
      question: null,
    };
  }

  const answeredHistory = interview.questions.map((question) =>
    question.id === currentQuestion.id
      ? {
          ...question,
          answerText: answer,
          answerScore: evaluation.overallScore,
        }
      : question
  );
  const nextQuestion = await generateInterviewQuestion({
    context,
    difficulty: normalizeDifficulty(nextDifficulty),
    history: buildConversationTurns(answeredHistory),
  });

  const updated = await prisma.interview.update({
    where: { id: interview.id },
    data: {
      currentDifficulty: nextDifficulty,
      questionsAttempted: { increment: 1 },
      veryPoorTotal: nextVeryPoorTotal,
      consecutiveVeryPoor: nextConsecutiveVeryPoor,
      questions: {
        update: {
          where: { id: currentQuestion.id },
          data: {
            answerText: answer,
            answerSubmittedAt: new Date(),
            answerScore: evaluation.overallScore,
            clarityScore: evaluation.clarityScore,
            relevanceScore: evaluation.relevanceScore,
            depthScore: evaluation.technicalDepthScore,
            confidenceScore: evaluation.confidenceScore,
            evaluationSummary: evaluation.summary,
            feedback: evaluation.feedback,
            veryPoor: isVeryPoor,
          },
        },
        create: {
          order: nextOrder,
          questionText: nextQuestion.question,
          difficulty: nextDifficulty,
        },
      },
    },
    include: {
      questions: {
        orderBy: { order: "asc" },
      },
    },
  });

  const createdQuestion = updated.questions.find((question) => question.order === nextOrder);

  return {
    status: updated.status,
    message: evaluation.summary,
    evaluation,
    difficulty: updated.currentDifficulty,
    question: createdQuestion,
  };
}

export async function finalizeInterviewForUser(
  userId: string,
  interviewId: string,
  status: InterviewStatusValue
) {
  const interview = await prisma.interview.findFirst({
    where: { id: interviewId, userId },
    include: {
      questions: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!interview) {
    throw new Error("Interview not found.");
  }

  const answeredQuestions = interview.questions.filter((question) => question.answerText);
  const finalEvaluation = await evaluateCompletedInterview({
    context: buildInterviewContext(interview),
    turns: buildConversationTurns(answeredQuestions),
  });

  const analytics = await prisma.interviewAnalytics.upsert({
    where: { interviewId },
    update: {
      overallScore: finalEvaluation.overallScore,
      clarityScore: finalEvaluation.clarityScore,
      relevanceScore: finalEvaluation.relevanceScore,
      technicalDepthScore: finalEvaluation.technicalDepthScore,
      confidenceScore: finalEvaluation.confidenceScore,
      strengths: finalEvaluation.strengths,
      improvements: finalEvaluation.improvements,
      questionFeedback: finalEvaluation.questionFeedback,
      speakingPaceLabel: finalEvaluation.speakingPaceLabel ?? null,
      confidenceTrend: finalEvaluation.confidenceTrend,
    },
    create: {
      interviewId,
      overallScore: finalEvaluation.overallScore,
      clarityScore: finalEvaluation.clarityScore,
      relevanceScore: finalEvaluation.relevanceScore,
      technicalDepthScore: finalEvaluation.technicalDepthScore,
      confidenceScore: finalEvaluation.confidenceScore,
      strengths: finalEvaluation.strengths,
      improvements: finalEvaluation.improvements,
      questionFeedback: finalEvaluation.questionFeedback,
      speakingPaceLabel: finalEvaluation.speakingPaceLabel ?? null,
      confidenceTrend: finalEvaluation.confidenceTrend,
    },
  });

  await prisma.interview.update({
    where: { id: interviewId },
    data: {
      status,
      score: finalEvaluation.overallScore,
      completedAt: new Date(),
      questionsAttempted: answeredQuestions.length,
    },
  });

  return analytics;
}

export async function abandonInterviewForUser(userId: string, interviewId: string) {
  return prisma.interview.updateMany({
    where: {
      id: interviewId,
      userId,
      status: InterviewStatus.in_progress,
    },
    data: {
      status: InterviewStatus.abandoned,
      completedAt: new Date(),
    },
  });
}
