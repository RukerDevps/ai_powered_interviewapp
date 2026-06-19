import { z } from "zod";

export const difficultySchema = z.enum(["easy", "medium", "hard"]);

export type InterviewDifficultyValue = z.infer<typeof difficultySchema>;

export interface InterviewContext {
  role: string;
  experienceLevel: string;
  interviewType: string;
  skills: string[];
  sections: string[];
  questionFocus: string;
  jobDescriptionText?: string | null;
}

export interface ConversationTurn {
  order: number;
  question: string;
  answer?: string | null;
  score?: number | null;
  difficulty: InterviewDifficultyValue;
}

export const generatedQuestionSchema = z.object({
  question: z.string().trim().min(12).max(1200),
  rationale: z.string().trim().min(1).max(800).optional(),
});

export type GeneratedQuestion = z.infer<typeof generatedQuestionSchema>;

export const answerEvaluationSchema = z.object({
  overallScore: z.number().int().min(0).max(100),
  clarityScore: z.number().int().min(0).max(100),
  relevanceScore: z.number().int().min(0).max(100),
  technicalDepthScore: z.number().int().min(0).max(100),
  confidenceScore: z.number().int().min(0).max(100),
  summary: z.string().trim().min(1).max(1200),
  feedback: z.string().trim().min(1).max(1600),
});

export type AnswerEvaluation = z.infer<typeof answerEvaluationSchema>;

export const questionFeedbackSchema = z.object({
  order: z.number().int().min(1),
  feedback: z.string().trim().min(1).max(1600),
  score: z.number().int().min(0).max(100),
});

export const finalEvaluationSchema = z.object({
  overallScore: z.number().int().min(0).max(100),
  clarityScore: z.number().int().min(0).max(100),
  relevanceScore: z.number().int().min(0).max(100),
  technicalDepthScore: z.number().int().min(0).max(100),
  confidenceScore: z.number().int().min(0).max(100),
  strengths: z.array(z.string().trim().min(1).max(220)).min(1).max(6),
  improvements: z.array(z.string().trim().min(1).max(220)).min(1).max(6),
  questionFeedback: z.array(questionFeedbackSchema),
  speakingPaceLabel: z.string().trim().min(1).max(80).optional(),
  confidenceTrend: z.array(z.number().int().min(0).max(100)).max(30).default([]),
});

export type FinalEvaluation = z.infer<typeof finalEvaluationSchema>;

export function parseJsonObject(raw: string) {
  try {
    const parsed: unknown = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Kimi response was not a JSON object.");
    }

    return parsed;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Could not parse Kimi JSON response: ${error.message}`
        : "Could not parse Kimi JSON response."
    );
  }
}
