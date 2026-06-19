import { query } from "@/lib/db";
import type {
  InterviewAnalysisViewModel,
  HistoryInterviewRow,
  InterviewStatusValue,
} from "@/types";

const historyIconByRole = (role: string): HistoryInterviewRow["icon"] => {
  const normalized = role.toLowerCase();

  if (normalized.includes("react")) return "brain";
  if (normalized.includes("backend") || normalized.includes("node")) return "database";
  if (normalized.includes("full stack")) return "pen-tool";
  if (normalized.includes("behavioral")) return "message";
  if (normalized.includes("system design")) return "file-code";
  if (normalized.includes("python")) return "sigma";
  if (normalized.includes("javascript")) return "square-code";
  return "code";
};

const historyIconToneByStatus = (status: InterviewStatusValue): HistoryInterviewRow["iconTone"] => {
  if (status === "completed") return "success";
  if (status === "not_eligible") return "warning";
  if (status === "abandoned") return "info";
  if (status === "incomplete") return "accent";
  return "accent";
};

const historyStatusLabel = (status: InterviewStatusValue): HistoryInterviewRow["status"] => {
  if (status === "completed") return "Completed";
  if (status === "abandoned") return "Abandoned";
  if (status === "not_eligible") return "Not Eligible";
  if (status === "incomplete") return "Incomplete";
  return "In Progress";
};

const historyActionLabel = (status: InterviewStatusValue): HistoryInterviewRow["action"] => {
  return status === "in_progress" ? "Continue" : "View Details";
};

const historyHref = (id: string, status: InterviewStatusValue) => {
  if (status === "in_progress") {
    return `/interview?id=${id}`;
  }

  return `/interview/${id}/analysis`;
};

const formatDateParts = (value: Date) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date: dateFormatter.format(value),
    time: timeFormatter.format(value),
  };
};

interface InterviewRowRecord {
  id: string;
  role: string;
  interviewType: string;
  durationMinutes: number;
  status: InterviewStatusValue;
  score: number | null;
  startedAt: Date;
  completedAt: Date | null;
  questionsAttempted: number;
}

export async function getHistoryRows(userId: string): Promise<HistoryInterviewRow[]> {
  const result = await query<InterviewRowRecord>(
    `
      SELECT
        i.id,
        i.role,
        i."interviewType",
        i."durationMinutes",
        i.status,
        i.score,
        i."startedAt",
        i."completedAt",
        i."questionsAttempted"
      FROM "Interview" i
      WHERE i."userId" = $1
      ORDER BY i."startedAt" DESC
    `,
    [userId]
  );

  return result.rows.map((interview) => {
    const sourceDate = interview.completedAt ?? interview.startedAt;
    const { date, time } = formatDateParts(sourceDate);

    return {
      id: interview.id,
      name: `${interview.role} Interview`,
      questions: `${interview.questionsAttempted} Questions`,
      role: interview.role,
      type:
        interview.interviewType === "Mixed"
          ? "Mixed"
          : interview.interviewType === "Behavioral"
            ? "Behavioral"
            : "Technical",
      date,
      time,
      duration: `${interview.durationMinutes} Min`,
      score: interview.score ?? undefined,
      status: historyStatusLabel(interview.status),
      action: historyActionLabel(interview.status),
      href: historyHref(interview.id, interview.status),
      icon: historyIconByRole(interview.role),
      iconTone: historyIconToneByStatus(interview.status),
    };
  });
}

interface AnalyticsRowRecord {
  id: string;
  role: string;
  experienceLevel: string;
  interviewType: string;
  status: InterviewStatusValue;
  score: number | null;
  completedAt: Date | null;
  overallScore: number | null;
  clarityScore: number | null;
  relevanceScore: number | null;
  technicalDepthScore: number | null;
  confidenceScore: number | null;
  strengths: string[] | null;
  improvements: string[] | null;
  questionFeedback: unknown;
  speakingPaceLabel: string | null;
  confidenceTrend: number[] | null;
}

interface QuestionRowRecord {
  order: number;
  questionText: string;
  answerText: string | null;
  answerScore: number | null;
  feedback: string | null;
  evaluationSummary: string | null;
}

export async function getInterviewAnalysis(
  userId: string,
  interviewId: string
): Promise<InterviewAnalysisViewModel | null> {
  const interviewResult = await query<AnalyticsRowRecord>(
    `
      SELECT
        i.id,
        i.role,
        i."experienceLevel",
        i."interviewType",
        i.status,
        i.score,
        i."completedAt",
        a."overallScore",
        a."clarityScore",
        a."relevanceScore",
        a."technicalDepthScore",
        a."confidenceScore",
        a.strengths,
        a.improvements,
        a."questionFeedback",
        a."speakingPaceLabel",
        a."confidenceTrend"
      FROM "Interview" i
      LEFT JOIN "InterviewAnalytics" a ON a."interviewId" = i.id
      WHERE i.id = $1 AND i."userId" = $2
      LIMIT 1
    `,
    [interviewId, userId]
  );

  const interview = interviewResult.rows[0];

  if (!interview) {
    return null;
  }

  const questionsResult = await query<QuestionRowRecord>(
    `
      SELECT
        q."order",
        q."questionText",
        q."answerText",
        q."answerScore",
        q.feedback,
        q."evaluationSummary"
      FROM "InterviewQuestion" q
      WHERE q."interviewId" = $1
      ORDER BY q."order" ASC
    `,
    [interviewId]
  );

  const questionFeedback =
    interview.questionFeedback && Array.isArray(interview.questionFeedback) && interview.questionFeedback.length > 0
      ? interview.questionFeedback.map((item) => {
          const payload = item as { order?: number; feedback?: string; score?: number };
          const sourceQuestion = questionsResult.rows.find((question) => question.order === payload.order);

          return {
            order: payload.order ?? 0,
            questionText: sourceQuestion?.questionText ?? `Question ${payload.order ?? 0}`,
            answerText: sourceQuestion?.answerText ?? "",
            feedback: payload.feedback ?? "",
            score: payload.score ?? sourceQuestion?.answerScore ?? null,
          };
        })
      : questionsResult.rows.map((question) => ({
          order: question.order,
          questionText: question.questionText,
          answerText: question.answerText ?? "",
          feedback: question.feedback ?? question.evaluationSummary ?? "",
          score: question.answerScore,
        }));

  return {
    id: interview.id,
    role: interview.role,
    experienceLevel: interview.experienceLevel,
    interviewType: interview.interviewType,
    status: interview.status,
    score: interview.score ?? interview.overallScore ?? null,
    completedAt: interview.completedAt ? interview.completedAt.toISOString() : null,
    overallScore: interview.overallScore ?? 0,
    clarityScore: interview.clarityScore ?? 0,
    relevanceScore: interview.relevanceScore ?? 0,
    technicalDepthScore: interview.technicalDepthScore ?? 0,
    confidenceScore: interview.confidenceScore ?? 0,
    strengths: interview.strengths ?? [],
    improvements: interview.improvements ?? [],
    questionFeedback,
    speakingPaceLabel: interview.speakingPaceLabel ?? null,
    confidenceTrend: interview.confidenceTrend ?? [],
  };
}
