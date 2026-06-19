import { createKimiJsonCompletion } from "@/lib/kimi";
import {
  type AnswerEvaluation,
  type InterviewContext,
  type InterviewDifficultyValue,
  answerEvaluationSchema,
  parseJsonObject,
} from "./types";

const systemPrompt = [
  "You are Kimi 2.6 grading one mock interview answer.",
  "Score honestly from 0 to 100. A very poor answer is off-topic, empty, unsafe, or shows no usable understanding.",
  "Be deterministic and concise. Return only JSON.",
  "Shape: { \"overallScore\": number, \"clarityScore\": number, \"relevanceScore\": number, \"technicalDepthScore\": number, \"confidenceScore\": number, \"summary\": string, \"feedback\": string }.",
].join(" ");

export async function evaluateInterviewAnswer({
  context,
  question,
  answer,
  difficulty,
}: {
  context: InterviewContext;
  question: string;
  answer: string;
  difficulty: InterviewDifficultyValue;
}): Promise<AnswerEvaluation> {
  const userPrompt = [
    `Role: ${context.role}`,
    `Experience level: ${context.experienceLevel}`,
    `Interview type: ${context.interviewType}`,
    `Skills: ${context.skills.length > 0 ? context.skills.join(", ") : "None provided"}`,
    `Question focus: ${context.questionFocus}`,
    `Difficulty: ${difficulty}`,
    `Question: ${question}`,
    `Answer: ${answer}`,
    "",
    "Judge the answer for the target role and difficulty. Penalize vague, memorized, irrelevant, or non-answer responses.",
  ].join("\n");

  const raw = await createKimiJsonCompletion({
    system: systemPrompt,
    user: userPrompt,
    temperature: 0.2,
  });

  return answerEvaluationSchema.parse(parseJsonObject(raw));
}
