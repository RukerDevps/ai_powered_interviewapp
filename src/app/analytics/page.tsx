import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronRight,
  Clock3,
  MessageSquareText,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

interface AnalyticsMetric {
  label: string;
  value: string;
  helper: string;
  icon: ComponentType<{ className?: string }>;
  tone: string;
}

interface InterviewInsight {
  title: string;
  role: string;
  date: string;
  score: number;
  status: string;
}

const metrics: AnalyticsMetric[] = [
  {
    label: "Interviews Attended",
    value: "12",
    helper: "+3 from last month",
    icon: BriefcaseBusiness,
    tone: "bg-accent-lighter text-accent",
  },
  {
    label: "Overall Score",
    value: "74/100",
    helper: "Good and improving",
    icon: Sparkles,
    tone: "bg-success-lightest text-success-foreground",
  },
  {
    label: "Questions Answered",
    value: "96",
    helper: "Across all completed interviews",
    icon: MessageSquareText,
    tone: "bg-warning-light text-warning-foreground",
  },
  {
    label: "Confidence Trend",
    value: "+8%",
    helper: "Stronger than last 5 sessions",
    icon: TrendingUp,
    tone: "bg-info-lightest text-info-foreground",
  },
];

const attendedInterviews: InterviewInsight[] = [
  {
    title: "Frontend Developer Interview",
    role: "Frontend Developer",
    date: "June 18, 2026",
    score: 72,
    status: "Completed",
  },
  {
    title: "React Performance Round",
    role: "React Developer",
    date: "June 16, 2026",
    score: 78,
    status: "Completed",
  },
  {
    title: "JavaScript Fundamentals",
    role: "Frontend Developer",
    date: "June 14, 2026",
    score: 69,
    status: "Completed",
  },
];

const scoreBreakdown = [
  { label: "Clarity", score: 78, barClass: "bg-success" },
  { label: "Relevance", score: 74, barClass: "bg-accent" },
  { label: "Technical Depth", score: 65, barClass: "bg-warning" },
  { label: "Confidence", score: 75, barClass: "bg-info" },
];

const focusAreas = [
  "Add more concrete project examples in technical answers.",
  "Expand tradeoff explanations to show senior-level depth.",
  "Keep answers concise before going into implementation details.",
];

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6">
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <span className="inline-flex w-fit items-center rounded-full border border-accent/10 bg-accent-muted px-3 py-1 text-xs font-semibold text-accent">
                Analytics Overview
              </span>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-text-primary">
                  Measure how your interviews are trending
                </h1>
                <p className="max-w-2xl text-sm font-medium leading-relaxed text-text-secondary">
                  Review attended interviews, overall performance, and the areas
                  that need the most attention before your next mock session.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/history"
                className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary"
              >
                View History
              </Link>
              <Link
                href="/analytics/details"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover"
              >
                Detailed Analysis
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.label}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-text-secondary">
                      {metric.label}
                    </p>
                    <p className="text-3xl font-bold tracking-tight text-text-primary">
                      {metric.value}
                    </p>
                  </div>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${metric.tone}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-4 text-xs font-medium text-text-secondary">
                  {metric.helper}
                </p>
              </article>
            );
          })}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Attended Interviews
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  A quick look at your most recent completed sessions.
                </p>
              </div>
              <Link
                href="/analytics/details"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Open detailed page
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {attendedInterviews.map((interview) => (
                <article
                  key={`${interview.title}-${interview.date}`}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-surface-secondary/60 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-text-primary">
                      {interview.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                      <span>{interview.role}</span>
                      <span className="text-text-muted">•</span>
                      <span>{interview.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex rounded-full bg-success-lightest px-2.5 py-1 text-xs font-semibold text-success-foreground">
                      {interview.status}
                    </span>
                    <span className="inline-flex min-w-20 items-center justify-center rounded-lg bg-accent-muted px-3 py-2 text-sm font-bold text-accent">
                      {interview.score}/100
                    </span>
                    <Link
                      href="/analytics/details"
                      className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary"
                    >
                      Review
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-lighter text-accent">
                <BarChart3 className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Overall Performance
                </h2>
                <p className="text-sm text-text-secondary">
                  Your aggregate interview readiness score.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-surface-secondary p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-text-secondary">
                    Composite Score
                  </p>
                  <p className="mt-1 text-4xl font-bold tracking-tight text-text-primary">
                    74
                  </p>
                </div>
                <span className="rounded-full bg-success-lightest px-3 py-1 text-xs font-semibold text-success-foreground">
                  Strong progress
                </span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface">
                <div className="h-full w-[74%] rounded-full bg-accent" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {scoreBreakdown.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-text-primary">{item.label}</span>
                    <span className="text-text-secondary">{item.score}/100</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-secondary">
                    <div
                      className={`h-full rounded-full ${item.barClass}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-light text-warning-foreground">
                <Target className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Focus Areas
                </h2>
                <p className="text-sm text-text-secondary">
                  The biggest opportunities across your recent sessions.
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {focusAreas.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border bg-surface-secondary/60 p-4 text-sm font-medium leading-relaxed text-text-dark"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-info-lightest text-info-foreground">
                <BrainCircuit className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Performance Snapshot
                </h2>
                <p className="text-sm text-text-secondary">
                  A compact summary of consistency, pace, and readiness.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-surface-secondary p-4">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock3 className="h-4 w-4" />
                  <span className="text-sm font-semibold">Avg. Session</span>
                </div>
                <p className="mt-3 text-2xl font-bold text-text-primary">28 min</p>
                <p className="mt-1 text-xs text-text-secondary">
                  Best results appear in focused mid-length interviews.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface-secondary p-4">
                <div className="flex items-center gap-2 text-text-secondary">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-semibold">Momentum</span>
                </div>
                <p className="mt-3 text-2xl font-bold text-text-primary">Upward</p>
                <p className="mt-1 text-xs text-text-secondary">
                  Scores improved in 4 of the last 5 completed interviews.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface-secondary p-4">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-semibold">Readiness</span>
                </div>
                <p className="mt-3 text-2xl font-bold text-text-primary">High</p>
                <p className="mt-1 text-xs text-text-secondary">
                  Communication and clarity are already in a strong range.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
