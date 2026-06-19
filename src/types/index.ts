export type InterviewStatusValue =
  | "in_progress"
  | "completed"
  | "abandoned"
  | "incomplete"
  | "not_eligible";

export type InterviewDifficultyValue = "easy" | "medium" | "hard";

export interface HistoryInterviewRow {
  id: string;
  name: string;
  questions: string;
  role: string;
  type: "Technical" | "Behavioral" | "Mixed";
  date: string;
  time: string;
  duration: string;
  score?: number;
  status: "Completed" | "Incomplete" | "In Progress" | "Abandoned" | "Not Eligible";
  action: "View Details" | "Continue";
  href: string;
  icon: "brain" | "code" | "database" | "file-code" | "message" | "pen-tool" | "sigma" | "square-code";
  iconTone: "accent" | "success" | "warning" | "info" | "behavioral";
}

export interface InterviewQuestionFeedback {
  order: number;
  questionText: string;
  answerText: string;
  feedback: string;
  score?: number | null;
}

export interface InterviewAnalysisViewModel {
  id: string;
  role: string;
  experienceLevel: string;
  interviewType: string;
  status: InterviewStatusValue;
  score: number | null;
  completedAt: string | null;
  overallScore: number;
  clarityScore: number;
  relevanceScore: number;
  technicalDepthScore: number;
  confidenceScore: number;
  strengths: string[];
  improvements: string[];
  questionFeedback: InterviewQuestionFeedback[];
  speakingPaceLabel: string | null;
  confidenceTrend: number[];
}
