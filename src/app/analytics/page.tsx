"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Check,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Target,
  Code2,
  Smile,
  List,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ScoreCard } from "@/components/analysis/ScoreCard";
import { StrengthsAndImprovements } from "@/components/analysis/StrengthsAndImprovements";
import { PerQuestionFeedback } from "@/components/analysis/PerQuestionFeedback";
import { SpeakingPaceChart } from "@/components/analysis/SpeakingPaceChart";
import { ConfidenceTrendChart } from "@/components/analysis/ConfidenceTrendChart";

// Type definitions matching mockup question status
type QuestionStatus = "answered" | "current" | "pending";

interface MockQuestion {
  id: string;
  number: number;
  text: string;
  status: QuestionStatus;
  feedbackText: string;
  submittedAnswer: string;
}

export default function AnalyticsPage() {
  // Mock questions database for interactive sidebar selection
  const [questions, setQuestions] = useState<MockQuestion[]>([
    {
      id: "q1",
      number: 1,
      text: "What is the virtual DOM in React?",
      status: "answered",
      feedbackText:
        "Excellent explanation of the virtual DOM! You clearly described the reconciliation process and diffing algorithm. Your details about DOM batch updates were highly accurate. To make it even better, you could mention React Fiber's asynchronous rendering capabilities.",
      submittedAnswer:
        "The virtual DOM is a programming concept where an ideal representation of a UI is kept in memory and synced with the 'real' DOM by ReactDOM. This reconciliation process computes differences via a diffing algorithm and updates only the changed elements, rather than re-rendering the whole page, which optimizes UI rendering speeds.",
    },
    {
      id: "q2",
      number: 2,
      text: "Explain the concept of closures in JavaScript.",
      status: "answered",
      feedbackText:
        "Good structural explanation of closures and lexical scoping. Your example about private variables was spot on. Consider highlighting memory implications (retaining references) and how JS engines garbage collect closures for senior roles.",
      submittedAnswer:
        "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, an inner function maintains access to variables in its outer function's scope even after the outer function has finished executing. It is key for data encapsulation.",
    },
    {
      id: "q3",
      number: 3,
      text: "How does event delegation work in JavaScript?",
      status: "current",
      feedbackText:
        "Good explanation! You understood the core concept of event delegation. To make it even better, try adding a real-world use case (like dynamic list items) and explain the event bubbling phase a bit more to show deep framework knowledge.",
      submittedAnswer:
        "Event delegation is a design pattern where a single event listener is attached to a parent element rather than attaching individual listeners to each child. It relies on event propagation (bubbling) where events bubble up to the parent. We then check event.target to inspect the source.",
    },
    {
      id: "q4",
      number: 4,
      text: "What are the differences between var, let, and const?",
      status: "pending",
      feedbackText:
        "Not yet answered. Please complete this section of the live interview wizard to view AI feedback, clarity ratings, and detailed code optimization metrics.",
      submittedAnswer: "This question has not been attempted yet.",
    },
    {
      id: "q5",
      number: 5,
      text: "Explain the box model in CSS.",
      status: "pending",
      feedbackText:
        "Not yet answered. Please complete this section of the live interview wizard to view AI feedback, clarity ratings, and detailed code optimization metrics.",
      submittedAnswer: "This question has not been attempted yet.",
    },
    {
      id: "q6",
      number: 6,
      text: "What is the purpose of useEffect in React?",
      status: "pending",
      feedbackText:
        "Not yet answered. Please complete this section of the live interview wizard to view AI feedback, clarity ratings, and detailed code optimization metrics.",
      submittedAnswer: "This question has not been attempted yet.",
    },
    {
      id: "q7",
      number: 7,
      text: "How does a browser render a web page?",
      status: "pending",
      feedbackText:
        "Not yet answered. Please complete this section of the live interview wizard to view AI feedback, clarity ratings, and detailed code optimization metrics.",
      submittedAnswer: "This question has not been attempted yet.",
    },
    {
      id: "q8",
      number: 8,
      text: "How would you optimize a slow website?",
      status: "pending",
      feedbackText:
        "Not yet answered. Please complete this section of the live interview wizard to view AI feedback, clarity ratings, and detailed code optimization metrics.",
      submittedAnswer: "This question has not been attempted yet.",
    },
  ]);

  // Selected question in detailed review
  const [selectedQuestionId, setSelectedQuestionId] = useState("q3");

  const selectedQuestion =
    questions.find((q) => q.id === selectedQuestionId) || questions[2];

  // Static strengths & areas of improvements lists
  const strengthsList = [
    "Explained concepts clearly with good examples.",
    "Good understanding of core principles.",
    "Structured your answers well.",
  ];

  const improvementsList = [
    "Provide more real-world examples.",
    "Deepen technical explanations.",
    "Work on concise summarization.",
  ];

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        {/* Main Center Content Column */}
        <div className="flex-1 space-y-6">
          {/* Back button and Page Title header row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition-colors hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <div className="flex items-center gap-2.5 mt-1">
                <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
                  Live Analysis
                </h1>
                <span className="inline-flex items-center rounded-full bg-success-lightest px-2.5 py-0.5 text-xs font-bold text-success border border-success/10">
                  Live
                </span>
              </div>
              <p className="text-sm font-medium text-text-secondary leading-relaxed">
                Real-time feedback and analysis of your performance.
              </p>
            </div>

            {/* Time remaining indicator block */}
            <div className="flex w-fit items-center gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-lighter text-accent">
                <Clock className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                  Time Remaining
                </p>
                <p className="text-xl font-black text-text-primary leading-tight mt-0.5">
                  24:35
                </p>
                <div className="mt-1.5 h-1.5 w-24 rounded-full bg-surface-secondary overflow-hidden border border-border/30">
                  <div className="h-full w-3/4 rounded-full bg-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Grid of Circular progress score cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            <ScoreCard
              label="Overall Score"
              score={72}
              status="Good"
              color="purple"
              icon={Sparkles}
            />
            <ScoreCard
              label="Clarity"
              score={78}
              status="Good"
              color="green"
              icon={MessageSquare}
            />
            <ScoreCard
              label="Relevance"
              score={70}
              status="Good"
              color="orange"
              icon={Target}
            />
            <ScoreCard
              label="Technical Depth"
              score={65}
              status="Average"
              color="pink"
              icon={Code2}
            />
            <ScoreCard
              label="Confidence"
              score={75}
              status="Good"
              color="blue"
              icon={Smile}
            />
          </div>

          {/* Strengths and Improvements side-by-side cards */}
          <StrengthsAndImprovements
            strengths={strengthsList}
            improvements={improvementsList}
          />

          {/* Per Question Detailed Feedback Card */}
          <PerQuestionFeedback
            questionNumber={selectedQuestion.number}
            totalQuestions={questions.length}
            questionText={selectedQuestion.text}
            feedbackText={selectedQuestion.feedbackText}
            submittedAnswer={selectedQuestion.submittedAnswer}
          />

          {/* Speaking Pace & Confidence spline wave visualizers */}
          <div className="grid gap-6 md:grid-cols-2">
            <SpeakingPaceChart paceWpm={135} status="Good" />
            <ConfidenceTrendChart status="Good" />
          </div>
        </div>

        {/* Right Sidebar Column: Questions List Tracker */}
        <div className="w-full xl:w-[380px] shrink-0">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/60 pb-3.5 mb-4">
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                Questions
              </h3>
              <span className="text-xs font-bold text-text-muted">
                {questions.filter((q) => q.status === "answered").length} Answered
              </span>
            </div>

            {/* Questions Listing */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {questions.map((q) => {
                const isSelected = q.id === selectedQuestionId;
                
                // Styling configurations based on question status
                let numberBadgeClass = "bg-surface-secondary text-text-secondary border-border";
                let statusBadgeClass = "bg-surface-secondary text-text-muted border-border/50";
                let statusText = "Pending";
                let statusIcon = null;

                if (q.status === "answered") {
                  numberBadgeClass = "bg-success-lightest text-success border-success/15 font-bold";
                  statusBadgeClass = "bg-success-lightest text-success border-success/15 font-semibold";
                  statusText = "Answered";
                  statusIcon = <Check className="h-3 w-3 inline mr-1" />;
                } else if (q.status === "current") {
                  numberBadgeClass = "bg-accent-lighter text-accent border-accent/20 font-bold";
                  statusBadgeClass = "bg-accent-lighter text-accent border-accent/20 font-semibold";
                  statusText = "Current";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuestionId(q.id)}
                    className={`w-full text-left flex gap-4 rounded-xl border p-4 transition-all duration-200 ${
                      isSelected
                        ? "bg-accent-muted/40 border-accent/40 shadow-sm"
                        : "border-border hover:bg-surface-secondary/50"
                    }`}
                  >
                    {/* Circle Question Number Badge */}
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs ${numberBadgeClass}`}>
                      {q.number}
                    </span>

                    {/* Question text and status badge */}
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <p className={`text-sm font-bold leading-relaxed line-clamp-2 ${isSelected ? "text-text-primary" : "text-text-dark"}`}>
                        {q.text}
                      </p>
                      <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] uppercase tracking-wide ${statusBadgeClass}`}>
                        {statusIcon}
                        {statusText}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* View Answered Questions footer button */}
            <div className="border-t border-border/50 pt-4 mt-4">
              <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary">
                <List className="h-4.5 w-4.5" />
                View Answered Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
