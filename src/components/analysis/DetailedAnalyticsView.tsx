"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  EyeOff,
  Filter,
  Lightbulb,
  ListFilter,
  MessageSquare,
  Share2,
  Target,
  TimerReset,
  Trophy,
  UserRound,
  WandSparkles,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuestionStatus = "answered" | "current" | "skipped" | "not_reached";
type QuestionFilter = "all" | "answered" | "weak" | "skipped";
type Tone = "accent" | "success" | "warning" | "error" | "info" | "muted";

interface AnalysisQuestion {
  number: number;
  title: string;
  status: QuestionStatus;
  score: number | null;
  tags: string[];
  answer: string;
  analysis: string;
  suggestion: string;
  practice: string;
}

interface ScoreRingProps {
  label?: string;
  score: number;
  status: string;
  tone: Exclude<Tone, "muted">;
  size?: number;
  strokeWidth?: number;
  labelPosition?: "top" | "bottom";
}

interface InsightItem {
  title: string;
  tag: string;
  tone: Exclude<Tone, "accent" | "info" | "muted">;
}

interface QuestionRowProps {
  question: AnalysisQuestion;
  active: boolean;
  onClick: () => void;
}

const questions: AnalysisQuestion[] = [
  {
    number: 1,
    title: "What is the virtual DOM in React?",
    status: "answered",
    score: 82,
    tags: ["React", "Rendering", "Performance"],
    answer:
      "The virtual DOM is a lightweight representation of the real DOM. React compares the new tree with the previous tree, finds the smallest set of changes, and applies them efficiently to the browser DOM.",
    analysis:
      "Strong answer. You explained reconciliation and performance benefits clearly. For an even stronger response, mention how React Fiber schedules work and why batching matters in modern React.",
    suggestion:
      "Add a short example comparing direct DOM manipulation with React reconciliation so the explanation feels more concrete.",
    practice: "Practice: Explain React Reconciliation with a Todo List",
  },
  {
    number: 2,
    title: "Explain the concept of closures in JavaScript.",
    status: "answered",
    score: 76,
    tags: ["JavaScript", "Functions", "Scope"],
    answer:
      "A closure happens when a function keeps access to variables from its lexical scope even after the outer function has finished running. It is useful for private state and callbacks.",
    analysis:
      "Good explanation of lexical scope and private state. You can improve by covering memory implications and showing one practical use case, such as a counter factory.",
    suggestion:
      "Use a small code example that returns an inner function and explain which variables are retained.",
    practice: "Practice: Build a Closure-Based Counter",
  },
  {
    number: 3,
    title: "How does event delegation work in JavaScript?",
    status: "current",
    score: 76,
    tags: ["JavaScript", "Event Handling", "Technical Depth"],
    answer:
      "Event delegation works by attaching a single event listener to a parent element instead of multiple listeners to child elements. When an event occurs, it bubbles up to the parent, and we can determine which child triggered the event using the event target.",
    analysis:
      "Good explanation! You understood the core concept of event delegation. To make it even better, try adding a real-world use case like dynamic list items and explain the event bubbling phase a bit more to show deeper framework knowledge.",
    suggestion:
      "Include a practical example of event delegation with dynamic elements. Also, mention stopPropagation() and how it impacts event flow.",
    practice: "Practice: Implement Event Delegation in a Todo List",
  },
  {
    number: 4,
    title: "What are the differences between var, let, and const?",
    status: "answered",
    score: 68,
    tags: ["JavaScript", "Scope", "Hoisting"],
    answer:
      "var is function scoped, while let and const are block scoped. const cannot be reassigned, and let is better for variables that need reassignment.",
    analysis:
      "The core distinction is correct, but the answer needs more depth. Hoisting, temporal dead zone behavior, and mutation versus reassignment for const should be covered.",
    suggestion:
      "Add a quick explanation of temporal dead zone and clarify that const objects can still have mutable properties.",
    practice: "Practice: Compare Scope Behavior in Small Snippets",
  },
  {
    number: 5,
    title: "Explain the box model in CSS.",
    status: "answered",
    score: 80,
    tags: ["CSS", "Layout", "Frontend"],
    answer:
      "The CSS box model includes content, padding, border, and margin. box-sizing controls whether width includes only content or includes border and padding.",
    analysis:
      "Clear and practical. You included the important parts and connected box-sizing to layout predictability. A real layout debugging example would make it stronger.",
    suggestion:
      "Mention why many projects use box-sizing: border-box globally to avoid unexpected width calculations.",
    practice: "Practice: Debug a Card Layout with Box Sizing",
  },
  {
    number: 6,
    title: "How does React handle state updates?",
    status: "skipped",
    score: null,
    tags: ["React", "State", "Rendering"],
    answer: "This question was skipped during the interview.",
    analysis:
      "No answer was submitted, so there is no AI scoring for this question yet. This is a good candidate for targeted review before the next session.",
    suggestion:
      "Practice explaining queued state updates, batching, and why functional updates prevent stale state.",
    practice: "Practice: Trace Batched React State Updates",
  },
  {
    number: 7,
    title: "What is the purpose of React keys in lists?",
    status: "not_reached",
    score: null,
    tags: ["React", "Lists", "Rendering"],
    answer: "This question was not reached before the interview ended.",
    analysis:
      "Not reached questions are not scored. Review this topic because keys are commonly used to test understanding of reconciliation and stable identity.",
    suggestion:
      "Prepare a short explanation of stable IDs and why array indexes can cause rendering bugs when list order changes.",
    practice: "Practice: Fix List Rendering with Stable Keys",
  },
  {
    number: 8,
    title: "How would you optimize a React app?",
    status: "not_reached",
    score: null,
    tags: ["React", "Performance", "Optimization"],
    answer: "This question was not reached before the interview ended.",
    analysis:
      "Not reached questions are not scored. This topic is valuable for senior frontend interviews because it connects measurement, rendering, loading, and architecture.",
    suggestion:
      "Structure your answer around profiling first, then memoization, code splitting, bundle analysis, and data loading improvements.",
    practice: "Practice: Create a React Performance Checklist",
  },
];

const scoreBreakdown = [
  { label: "Clarity", score: 78, status: "Good", tone: "success" as const },
  { label: "Relevance", score: 70, status: "Good", tone: "warning" as const },
  { label: "Technical Depth", score: 65, status: "Needs Work", tone: "error" as const },
  { label: "Confidence", score: 75, status: "Good", tone: "info" as const },
];

const strengths: InsightItem[] = [
  { title: "Explained concepts clearly with good examples.", tag: "Clarity", tone: "success" },
  { title: "Good understanding of core JavaScript principles.", tag: "Relevance", tone: "success" },
  { title: "Structured your answers well and stayed on point.", tag: "Confidence", tone: "success" },
];

const focusAreas: InsightItem[] = [
  { title: "Provide more real-world examples for advanced topics.", tag: "Technical Depth", tone: "warning" },
  { title: "Deepen technical explanations with implementation details.", tag: "Technical Depth", tone: "warning" },
  { title: "Work on concise summarization at the end of answers.", tag: "Clarity", tone: "success" },
];

const nextActions = [
  {
    title: "Start targeted practice",
    description: "Focus on JavaScript advanced concepts and real-world use cases.",
    icon: Target,
    action: "Start Practice",
  },
  {
    title: "Review weak questions",
    description: "Review your answers to weak questions and improve.",
    icon: MessageSquare,
    action: "Review Now",
  },
  {
    title: "Schedule next practice",
    description: "Consistency is key. Practice regularly to improve faster.",
    icon: TimerReset,
    action: "Schedule Now",
  },
];

const toneMap = {
  accent: {
    stroke: "var(--color-accent)",
    soft: "border-accent/15 bg-accent-lighter text-accent",
    solid: "bg-accent text-accent-foreground",
  },
  success: {
    stroke: "var(--color-success)",
    soft: "border-success/15 bg-success-lightest text-success-foreground",
    solid: "bg-success text-success-foreground",
  },
  warning: {
    stroke: "var(--color-warning)",
    soft: "border-warning/15 bg-warning-light text-warning-foreground",
    solid: "bg-warning text-warning-foreground",
  },
  error: {
    stroke: "var(--color-error)",
    soft: "border-error/15 bg-error-light/60 text-error",
    solid: "bg-error text-error-foreground",
  },
  info: {
    stroke: "var(--color-info)",
    soft: "border-info/15 bg-info-lightest text-info-foreground",
    solid: "bg-info text-info-foreground",
  },
  muted: {
    stroke: "var(--color-text-muted)",
    soft: "border-border bg-surface-secondary text-text-muted",
    solid: "bg-surface-secondary text-text-muted",
  },
};

const filterLabels: Record<QuestionFilter, string> = {
  all: "All Questions",
  answered: "Answered",
  weak: "Weak Questions",
  skipped: "Skipped / Not Reached",
};

const statusLabels: Record<QuestionStatus, string> = {
  answered: "Answered",
  current: "Answered",
  skipped: "Skipped",
  not_reached: "Not Reached",
};

const paceBars = [32, 48, 28, 62, 42, 74, 36, 56, 84, 44, 64, 34, 70, 52, 80, 40, 60, 30, 66, 48, 72, 38, 54, 42];
const confidencePath = "M 0 70 C 38 64, 72 42, 112 50 C 148 58, 168 76, 208 66 C 242 58, 256 38, 292 48 C 326 58, 346 72, 384 58";

function isWeakQuestion(question: AnalysisQuestion) {
  return question.score !== null && question.score < 70;
}

function getQuestionTone(question: AnalysisQuestion): Tone {
  if (question.status === "skipped" || question.status === "not_reached") return "muted";
  if (isWeakQuestion(question)) return "warning";
  if (question.status === "current") return "accent";
  return "success";
}

function scoreStatus(score: number | null) {
  if (score === null) return "No Score";
  if (score < 70) return "Needs Work";
  if (score >= 80) return "Strong";
  return "Good";
}

function ScoreRing({
  label,
  score,
  status,
  tone,
  size = 96,
  strokeWidth = 8,
  labelPosition = "bottom",
}: ScoreRingProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const theme = toneMap[tone];

  return (
    <div className="flex flex-col items-center">
      {label && labelPosition === "top" ? (
        <p className="mb-3 text-sm font-semibold text-text-primary">{label}</p>
      ) : null}
      <div className="relative" style={{ height: size, width: size }}>
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="var(--color-surface-secondary)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={theme.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[28px] font-bold leading-none text-text-primary">{score}</span>
          <span className="mt-1 text-[10px] font-semibold leading-none text-text-muted">/100</span>
        </div>
      </div>
      <span className={cn("mt-4 rounded-full border px-3 py-1 text-xs font-semibold", theme.soft)}>
        {status}
      </span>
      {label && labelPosition === "bottom" ? (
        <p className="mt-3 text-sm font-semibold text-text-primary">{label}</p>
      ) : null}
    </div>
  );
}

function MiniScoreRing({ label, score, status, tone }: Omit<ScoreRingProps, "size" | "strokeWidth">) {
  return (
    <div className="flex min-h-[172px] flex-col items-center rounded-2xl border border-border bg-surface px-4 py-5 shadow-sm">
      <ScoreRing
        label={label}
        labelPosition="top"
        score={score}
        status={status}
        strokeWidth={7}
        tone={tone}
        size={82}
      />
    </div>
  );
}

function InsightCard({
  title,
  items,
  iconTone,
}: {
  title: string;
  items: InsightItem[];
  iconTone: "success" | "warning";
}) {
  const Icon = iconTone === "success" ? Check : Target;

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", toneMap[iconTone].soft)}>
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-xl font-semibold leading-7 text-text-primary">{title}</h2>
      </div>

      <ul className="mt-5 space-y-5">
        {items.map((item) => (
          <li key={item.title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
            <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border", toneMap[item.tone].soft)}>
              <Check className="h-3.5 w-3.5" />
            </span>
            <p className="text-sm font-medium leading-relaxed text-text-dark">{item.title}</p>
            <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", toneMap[item.tone].soft)}>
              {item.tag}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function QuestionRow({ question, active, onClick }: QuestionRowProps) {
  const tone = getQuestionTone(question);
  const isAnswered = question.status === "answered" || question.status === "current";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 rounded-xl border bg-surface px-3 py-4 text-left transition-colors",
        active ? "border-accent/50 bg-accent-muted/40" : "border-transparent hover:border-border hover:bg-surface-secondary/70"
      )}
    >
      <span className={cn("flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold", toneMap[tone].soft)}>
        {isAnswered && !active ? <Check className="h-4 w-4" /> : question.number}
      </span>
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-text-primary">{question.title}</p>
        <span className={cn("mt-2 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold", toneMap[tone].soft)}>
          {statusLabels[question.status]}
        </span>
      </div>
      <span className="mt-8 whitespace-nowrap text-xs font-semibold text-text-secondary">
        {question.score === null ? "-" : `${question.score}/100`}
      </span>
    </button>
  );
}

function WaveformBars() {
  return (
    <div className="flex h-14 items-center gap-1 overflow-hidden">
      {paceBars.map((bar, index) => (
        <span
          key={`${bar}-${index}`}
          className="w-1 rounded-full bg-accent"
          style={{ height: `${bar}%`, opacity: 0.35 + (index % 6) * 0.09 }}
        />
      ))}
    </div>
  );
}

function ConfidenceSparkline() {
  return (
    <div className="relative h-14 overflow-hidden">
      <svg viewBox="0 0 384 96" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="confidence-fill-detail" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-info)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-info)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${confidencePath} L 384 96 L 0 96 Z`} fill="url(#confidence-fill-detail)" />
        <path d={confidencePath} fill="none" stroke="var(--color-info)" strokeLinecap="round" strokeWidth="4" />
      </svg>
    </div>
  );
}

export function DetailedAnalyticsView() {
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(3);
  const [questionFilter, setQuestionFilter] = useState<QuestionFilter>("all");
  const [showAnswer, setShowAnswer] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const selectedIndex = questions.findIndex((question) => question.number === selectedQuestionNumber);
  const selectedQuestion = questions[selectedIndex] ?? questions[0];

  const filteredQuestions = useMemo(() => {
    if (questionFilter === "answered") {
      return questions.filter((question) => question.status === "answered" || question.status === "current");
    }

    if (questionFilter === "weak") {
      return questions.filter((question) => isWeakQuestion(question));
    }

    if (questionFilter === "skipped") {
      return questions.filter((question) => question.status === "skipped" || question.status === "not_reached");
    }

    return questions;
  }, [questionFilter]);

  const handleFilterChange = (value: QuestionFilter) => {
    const nextQuestions =
      value === "answered"
        ? questions.filter((question) => question.status === "answered" || question.status === "current")
        : value === "weak"
          ? questions.filter((question) => isWeakQuestion(question))
          : value === "skipped"
            ? questions.filter((question) => question.status === "skipped" || question.status === "not_reached")
            : questions;

    setQuestionFilter(value);

    if (!nextQuestions.some((question) => question.number === selectedQuestionNumber)) {
      setSelectedQuestionNumber(nextQuestions[0]?.number ?? questions[0].number);
    }
  };

  const goToQuestion = (offset: number) => {
    const nextQuestion = questions[selectedIndex + offset];

    if (nextQuestion) {
      setSelectedQuestionNumber(nextQuestion.number);
      setShowAnswer(true);
      setQuestionFilter("all");
    }
  };

  const handleDownloadReport = () => {
    setStatusMessage("Dummy report generated for this interview.");
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/analytics/details`;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setStatusMessage("Share link copied to clipboard.");
      return;
    }

    setStatusMessage("Share link ready: /analytics/details");
  };

  const handleAction = (label: string) => {
    setStatusMessage(`${label} selected for Question ${selectedQuestion.number}.`);
  };

  return (
    <DashboardShell>
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-6">
        <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-3">
            <Link
              href="/analytics"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Analytics
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[28px] font-bold leading-9 text-text-primary">Detailed Analysis</h1>
              <span className="inline-flex items-center rounded-full border border-success/10 bg-success-lightest px-3 py-1 text-xs font-semibold text-success-foreground">
                Completed
              </span>
            </div>

            <p className="text-sm font-medium leading-relaxed text-text-secondary">
              In-depth breakdown of your performance in this interview.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-text-secondary">
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4" />
                Frontend Developer (React)
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                June 18, 2026
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                28 min
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button variant="outline" className="h-10 rounded-lg px-4 text-sm font-semibold" onClick={handleDownloadReport}>
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button className="h-10 rounded-lg px-4 text-sm font-semibold" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </header>

        {statusMessage ? (
          <div className="rounded-xl border border-accent/15 bg-accent-muted px-4 py-3 text-sm font-semibold text-accent" role="status">
            {statusMessage}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <div className="grid items-center gap-6 lg:grid-cols-[180px_minmax(150px,0.8fr)_repeat(4,minmax(130px,1fr))]">
                <div className="flex flex-col items-center">
                  <span className="mb-3 rounded-full bg-surface-secondary px-3 py-1 text-xs font-semibold text-text-primary">
                    Overall Score
                  </span>
                  <ScoreRing score={72} status="Good" tone="accent" size={118} />
                </div>

                <div className="space-y-3">
                  <h2 className="text-sm font-semibold text-text-primary">Summary</h2>
                  <p className="max-w-[220px] text-sm font-medium leading-relaxed text-text-secondary">
                    Strong clarity and confidence, but technical depth needs improvement.
                  </p>
                </div>

                {scoreBreakdown.map((item) => (
                  <MiniScoreRing
                    key={item.label}
                    label={item.label}
                    score={item.score}
                    status={item.status}
                    tone={item.tone}
                  />
                ))}
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              <InsightCard title="Strengths" items={strengths} iconTone="success" />
              <InsightCard title="Focus Areas" items={focusAreas} iconTone="warning" />
            </div>

            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <div className="flex flex-col gap-4 border-b border-border/60 pb-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold leading-7 text-text-primary">
                    Question {selectedQuestion.number} of {questions.length}
                  </h2>
                  <span className="inline-flex rounded-full border border-accent/15 bg-accent-muted px-3 py-1 text-xs font-semibold text-accent">
                    {selectedQuestion.score === null
                      ? scoreStatus(selectedQuestion.score)
                      : `Score: ${selectedQuestion.score}/100 (${scoreStatus(selectedQuestion.score)})`}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 rounded-lg px-3 text-sm font-semibold"
                    disabled={selectedIndex <= 0}
                    onClick={() => goToQuestion(-1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 rounded-lg px-3 text-sm font-semibold"
                    disabled={selectedIndex >= questions.length - 1}
                    onClick={() => goToQuestion(1)}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-5 space-y-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <h3 className="text-lg font-semibold leading-7 text-text-primary">{selectedQuestion.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuestion.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-accent/10 bg-accent-lighter px-3 py-1 text-xs font-semibold text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface-secondary/40 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-text-primary">Your Answer</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 rounded-lg px-3 text-sm font-semibold"
                      onClick={() => setShowAnswer((current) => !current)}
                    >
                      {showAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {showAnswer ? "Hide Your Answer" : "View Your Answer"}
                    </Button>
                  </div>
                  {showAnswer ? (
                    <p className="mt-4 text-sm font-medium leading-relaxed text-text-dark">{selectedQuestion.answer}</p>
                  ) : (
                    <p className="mt-4 text-sm font-medium leading-relaxed text-text-muted">Answer hidden.</p>
                  )}
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <p className="text-sm font-semibold text-text-primary">AI Analysis</p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-text-dark">{selectedQuestion.analysis}</p>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-warning/15 bg-warning-light text-warning-foreground">
                      <Lightbulb className="h-4.5 w-4.5" />
                    </span>
                    <p className="text-sm font-semibold text-text-primary">Improvement Suggestion</p>
                  </div>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-text-dark">{selectedQuestion.suggestion}</p>
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-4 text-left shadow-sm transition-colors hover:bg-surface-secondary"
                  onClick={() => handleAction("Suggested practice")}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/15 bg-accent-lighter text-accent">
                      <WandSparkles className="h-4.5 w-4.5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-text-primary">Suggested Practice</span>
                      <span className="block text-sm font-medium text-accent">{selectedQuestion.practice}</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4.5 w-4.5 text-accent" />
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold leading-7 text-text-primary">Communication</h2>
                <p className="text-sm font-medium text-text-secondary">Insights about your speaking style and communication.</p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-text-primary">Speaking Pace</p>
                    <span className="rounded-full bg-success-lightest px-2.5 py-1 text-xs font-semibold text-success-foreground">Good</span>
                  </div>
                  <WaveformBars />
                  <p className="mt-3 text-base font-bold text-text-primary">135 WPM</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-text-secondary">Ideal pace. Clear and easy to follow.</p>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-text-primary">Confidence</p>
                    <span className="rounded-full bg-success-lightest px-2.5 py-1 text-xs font-semibold text-success-foreground">Good</span>
                  </div>
                  <ConfidenceSparkline />
                  <p className="mt-3 text-base font-bold text-text-primary">Steady</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-text-secondary">You sounded confident. Maintain steady tone.</p>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-text-primary">Filler Words</p>
                    <span className="rounded-full bg-success-lightest px-2.5 py-1 text-xs font-semibold text-success-foreground">Good</span>
                  </div>
                  <p className="mt-6 text-4xl font-bold leading-none text-text-primary">3</p>
                  <p className="mt-2 text-sm font-bold text-text-primary">Times</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">Low filler word usage. Great job!</p>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-text-primary">Pauses</p>
                    <span className="rounded-full bg-success-lightest px-2.5 py-1 text-xs font-semibold text-success-foreground">Good</span>
                  </div>
                  <p className="mt-6 text-4xl font-bold leading-none text-text-primary">2.1 <span className="text-sm font-bold">sec</span></p>
                  <p className="mt-2 text-sm font-bold text-text-primary">Avg. pause length</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">Good balance of pauses and speech.</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold leading-7 text-text-primary">What to do next</h2>
                <p className="text-sm font-medium text-text-secondary">Recommended actions to improve based on your performance.</p>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-3">
                {nextActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <article key={action.title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/15 bg-accent-lighter text-accent">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-text-primary">{action.title}</h3>
                          <p className="mt-1 text-sm font-medium leading-relaxed text-text-secondary">{action.description}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-4 h-10 rounded-lg px-3 text-sm font-semibold"
                        onClick={() => handleAction(action.action)}
                      >
                        {action.action}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </article>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl border border-accent/30 bg-accent-muted/30 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Trophy className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">Retake a similar interview</h3>
                      <p className="mt-1 text-sm font-medium text-text-secondary">
                        Start a new mock with similar role and topics to track your improvement.
                      </p>
                    </div>
                  </div>
                  <Button className="h-11 rounded-lg px-5 text-sm font-semibold" onClick={() => handleAction("Retake Interview")}>
                    Retake Interview
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </section>
          </div>

          <aside className="xl:sticky xl:top-6 xl:self-start">
            <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="border-b border-border/60 pb-4">
                <h2 className="text-xl font-semibold leading-7 text-text-primary">Questions ({questions.length})</h2>
                <label className="mt-4 flex h-11 items-center gap-2 rounded-lg border border-border bg-surface px-3">
                  <select
                    className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-text-primary outline-none"
                    value={questionFilter}
                    onChange={(event) => handleFilterChange(event.target.value as QuestionFilter)}
                  >
                    <option value="all">All Questions</option>
                    <option value="answered">Answered</option>
                    <option value="weak">Weak Questions</option>
                    <option value="skipped">Skipped / Not Reached</option>
                  </select>
                  <Filter className="h-4 w-4 text-text-secondary" />
                </label>
              </div>

              <div className="mt-3 divide-y divide-border/70">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => (
                    <QuestionRow
                      key={question.number}
                      active={question.number === selectedQuestion.number}
                      question={question}
                      onClick={() => {
                        setSelectedQuestionNumber(question.number);
                        setShowAnswer(true);
                      }}
                    />
                  ))
                ) : (
                  <p className="py-6 text-center text-sm font-medium text-text-muted">No questions match this filter.</p>
                )}
              </div>

              <div className="mt-4 border-t border-border/60 pt-4">
                <Button
                  variant={questionFilter === "weak" ? "default" : "outline"}
                  className="h-11 w-full rounded-lg px-4 text-sm font-semibold"
                  onClick={() => handleFilterChange(questionFilter === "weak" ? "all" : "weak")}
                >
                  <ListFilter className="h-4 w-4" />
                  {questionFilter === "weak" ? "Show all questions" : "View only weak questions"}
                </Button>
                <p className="mt-3 text-center text-xs font-medium text-text-muted">{filterLabels[questionFilter]}</p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
