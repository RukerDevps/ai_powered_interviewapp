import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";

export interface PerformanceMetric {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "success" | "info" | "warning" | "accent";
}

interface RecentPerformanceProps {
  score: number;
  metrics: PerformanceMetric[];
}

const metricToneClasses: Record<PerformanceMetric["tone"], string> = {
  success: "bg-success-lightest text-success-foreground",
  info: "bg-info-lightest text-info-foreground",
  warning: "bg-warning-light text-warning-foreground",
  accent: "bg-accent-light text-accent",
};

export const RecentPerformance = ({ score, metrics }: RecentPerformanceProps) => {
  const scoreDegrees = Math.round((score / 100) * 360);

  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-bold text-text-primary">Recent Performance</h2>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
        >
          Last 5 Interviews
          <ChevronDown className="h-4 w-4 text-text-secondary" />
        </button>
      </div>

      <div className="mt-7 grid gap-7 md:grid-cols-[210px_1fr] md:items-center">
        <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full p-3"
          style={{
            background: `conic-gradient(var(--color-accent) ${scoreDegrees}deg, var(--color-surface-secondary) ${scoreDegrees}deg 360deg)`,
          }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-surface">
            <span className="text-4xl font-bold text-text-primary">{score}</span>
            <span className="text-sm font-medium text-text-secondary">/100</span>
          </div>
        </div>

        <div className="divide-y divide-border">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div key={metric.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="flex min-w-0 items-center gap-4">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${metricToneClasses[metric.tone]}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="truncate text-sm font-medium text-text-primary">
                    {metric.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-text-primary">{metric.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
