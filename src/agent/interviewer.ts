import { createKimiJsonCompletion } from "@/lib/kimi";
import {
  type ConversationTurn,
  type GeneratedQuestion,
  type InterviewContext,
  type InterviewDifficultyValue,
  generatedQuestionSchema,
  parseJsonObject,
} from "./types";

const systemPrompt = [
  "You are Kimi 2.6 acting as a professional mock interviewer.",
  "Generate exactly one interview question in English.",
  "The question must match the requested role, interview type, selected sections, skills, and current difficulty.",
  "Avoid repeating earlier questions. Do not include answers, grading rubrics, markdown, or multiple questions.",
  "Return only JSON with this shape: { \"question\": string, \"rationale\": string }.",
].join(" ");

const summarizeHistory = (history: ConversationTurn[]) => {
  if (history.length === 0) {
    return "No previous questions.";
  }

  return history
    .map((turn) =>
      [
        `Q${turn.order} (${turn.difficulty}, score ${turn.score ?? "pending"}): ${turn.question}`,
        turn.answer ? `Answer: ${turn.answer}` : "Answer: not answered yet",
      ].join("\n")
    )
    .join("\n\n");
};

export async function generateInterviewQuestion({
  context,
  difficulty,
  history,
}: {
  context: InterviewContext;
  difficulty: InterviewDifficultyValue;
  history: ConversationTurn[];
}): Promise<GeneratedQuestion> {
  const userPrompt = [
    `Role: ${context.role}`,
    `Experience level: ${context.experienceLevel}`,
    `Interview type: ${context.interviewType}`,
    `Skills: ${context.skills.length > 0 ? context.skills.join(", ") : "None provided"}`,
    `Sections: ${context.sections.length > 0 ? context.sections.join(", ") : "Mixed"}`,
    `Question focus: ${context.questionFocus}`,
    `Current difficulty: ${difficulty}`,
    `Job description context: ${context.jobDescriptionText?.trim() || "None provided"}`,
    "",
    "Previous conversation:",
    summarizeHistory(history),
  ].join("\n");

  const raw = await createKimiJsonCompletion({
    system: systemPrompt,
    user: userPrompt,
    temperature: 0.7,
  });

  return generatedQuestionSchema.parse(parseJsonObject(raw));
}
