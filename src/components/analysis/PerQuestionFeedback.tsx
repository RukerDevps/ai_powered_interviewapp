"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PerQuestionFeedbackProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  feedbackText: string;
  submittedAnswer: string;
}

export function PerQuestionFeedback({
  questionNumber,
  totalQuestions,
  questionText,
  feedbackText,
  submittedAnswer,
}: PerQuestionFeedbackProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      {/* Header with question count and toggle view answer */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
            Detailed Feedback
          </h3>
          <span className="inline-block rounded-md bg-accent-muted px-2.5 py-0.5 text-xs font-bold text-accent">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAnswer(!showAnswer)}
          className="h-9 rounded-lg border-border text-xs font-semibold flex items-center gap-1.5 hover:bg-surface-secondary"
        >
          {showAnswer ? (
            <>
              <EyeOff className="h-4 w-4" />
              Hide Answer
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              View Answer
            </>
          )}
        </Button>
      </div>

      {/* Question Text Box */}
      <div className="rounded-xl bg-accent-muted/40 border border-accent/10 p-4 mb-4">
        <p className="text-sm font-bold text-accent leading-relaxed">
          {questionText}
        </p>
      </div>

      {/* Feedback Body */}
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-1.5">
            AI Analysis
          </h4>
          <p className="text-sm font-medium text-text-dark leading-relaxed">
            {feedbackText}
          </p>
        </div>

        {/* Collapsible Submitted Answer Section */}
        {showAnswer && (
          <div className="rounded-xl border border-border bg-surface-secondary p-4 mt-4 animate-in fade-in duration-300">
            <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-2">
              Your Answer
            </h4>
            <p className="text-sm font-medium text-text-primary italic leading-relaxed whitespace-pre-wrap">
              &quot;{submittedAnswer}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
