"use client";

import { Check, HelpCircle, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuestionItem {
  id: string;
  text: string;
  status: "answered" | "current" | "pending";
}

interface QuestionsPanelProps {
  questions: QuestionItem[];
  className?: string;
  onClose?: () => void;
}

export const QuestionsPanel = ({ questions, className, onClose }: QuestionsPanelProps) => {
  const answeredCount = questions.filter((q) => q.status === "answered").length;
  const totalQuestions = questions.length;
  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col border-l border-border bg-surface shadow-sm xl:w-[320px] shrink-0",
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-border px-5">
        <h2 className="text-base font-bold text-text-primary">Questions</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-surface-secondary"
          >
            <span className="sr-only">Close sidebar</span>
            <span className="text-lg">×</span>
          </button>
        )}
      </div>

      {/* Progress Section */}
      <div className="border-b border-border px-5 py-4 space-y-2.5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-text-primary">Progress</span>
          <span className="font-bold text-text-primary tabular-nums">
            {answeredCount} / {totalQuestions}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-surface-secondary overflow-hidden">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
          />
        </div>
      </div>

      {/* Questions Scroll Area */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 space-y-3">
        {questions.map((question, index) => {
          const isAnswered = question.status === "answered";
          const isCurrent = question.status === "current";
          const isPending = question.status === "pending";

          return (
            <div
              key={question.id}
              className={cn(
                "rounded-xl border p-4 transition-all duration-300",
                isCurrent
                  ? "border-accent bg-accent-muted/10 shadow-sm"
                  : isAnswered
                  ? "border-border bg-surface"
                  : "border-border/60 bg-surface/50 opacity-70"
              )}
            >
              <div className="flex gap-3 items-start">
                {/* Number Circle Badge */}
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white transition-all",
                    isCurrent
                      ? "bg-accent shadow-sm"
                      : isAnswered
                      ? "bg-success"
                      : "bg-text-muted/40 text-text-secondary"
                  )}
                >
                  {index + 1}
                </div>

                {/* Question Body */}
                <div className="space-y-2 min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-sm font-semibold leading-relaxed break-words",
                      isCurrent
                        ? "text-text-primary"
                        : isAnswered
                        ? "text-text-dark"
                        : "text-text-secondary"
                    )}
                  >
                    {question.text}
                  </p>

                  {/* Status Badge Tag */}
                  <div>
                    {isAnswered && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-success-lightest px-2 py-0.5 text-xs font-bold text-success-foreground border border-success/15">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                        Answered
                      </span>
                    )}
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-accent-lighter px-2 py-0.5 text-xs font-bold text-accent border border-accent/15">
                        <Play className="h-2.5 w-2.5 fill-accent stroke-none" />
                        Current
                      </span>
                    )}
                    {isPending && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-surface-secondary px-2 py-0.5 text-xs font-bold text-text-secondary border border-border">
                        <HelpCircle className="h-3 w-3" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-border p-4">
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary"
        >
          <span className="flex h-4 w-4 items-center justify-center font-bold">☰</span>
          View Answered Questions
        </button>
      </div>
    </aside>
  );
};
