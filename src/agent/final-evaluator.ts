import { createKimiJsonCompletion } from "@/lib/kimi";
import {
  type ConversationTurn,
  type FinalEvaluation,
  type InterviewContext,
  finalEvaluationSchema,
  parseJsonObject,
} from "./types";

const systemPrompt = [
  "You are Kimi 2.6 creating final mock interview analytics.",
  "Review the full interview and produce structured, actionable feedback in English.",
  "Return only JSON with scores from 0 to 100, short strengths/improvements, per-question feedback, and confidence trend.",
  "Shape: { \"overallScore\": number, \"clarityScore\": number, \"relevanceScore\": number, \"technicalDepthScore\": number, \"confidenceScore\": number, \"strengths\": string[], \"improvements\": string[], \"questionFeedback\": [{ \"order\": number, \"feedback\": string, \"score\": number }], \"speakingPaceLabel\": string, \"confidenceTrend\": number[] }.",
].join(" ");

const formatTurns = (turns: ConversationTurn[]) =>
  turns
    .map((turn) =>
      [
        `Question ${turn.order} (${turn.difficulty}, live score ${turn.score ?? "not scored"}): ${turn.question}`,
        `Answer: ${turn.answer || "No answer submitted."}`,
      ].join("\n")
    )
    .join("\n\n");

export async function evaluateCompletedInterview({
  context,
  turns,
}: {
  context: InterviewContext;
  turns: ConversationTurn[];
}): Promise<FinalEvaluation> {
  if (turns.length === 0) {
    return {
      overallScore: 0,
      clarityScore: 0,
      relevanceScore: 0,
      technicalDepthScore: 0,
      confidenceScore: 0,
      strengths: ["The session was started successfully."],
      improvements: ["Submit at least one complete answer before ending the interview."],
      questionFeedback: [],
      speakingPaceLabel: "Not enough spoken-answer data",
      confidenceTrend: [],
    };
  }

  const userPrompt = [
    `Role: ${context.role}`,
    `Experience level: ${context.experienceLevel}`,
    `Interview type: ${context.interviewType}`,
    `Skills: ${context.skills.length > 0 ? context.skills.join(", ") : "None provided"}`,
    `Sections: ${context.sections.length > 0 ? context.sections.join(", ") : "Mixed"}`,
    `Question focus: ${context.questionFocus}`,
    `Job description context: ${context.jobDescriptionText?.trim() || "None provided"}`,
    "",
    "Interview transcript:",
    formatTurns(turns),
  ].join("\n");

  const raw = await createKimiJsonCompletion({
    system: systemPrompt,
    user: userPrompt,
    temperature: 0.2,
  });

  return finalEvaluationSchema.parse(parseJsonObject(raw));
}
