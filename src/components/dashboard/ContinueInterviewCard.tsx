import Link from "next/link";
import { Code2 } from "lucide-react";

interface ContinueInterviewCardProps {
  title: string;
  questionLabel: string;
  timeRemaining: string;
  progress: number;
}

export const ContinueInterviewCard = ({
  title,
  questionLabel,
  timeRemaining,
  progress,
}: ContinueInterviewCardProps) => {
  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm lg:p-6">
      <div className="flex items-center gap-3">
        <h2 className="text-base font-bold text-text-primary">Continue Interview</h2>
        <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent">
          In Progress
        </span>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-success-lightest text-success-foreground">
            <Code2 className="h-7 w-7" />
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-text-primary">{title}</h3>
            <p className="mt-2 text-sm text-text-secondary">
              {questionLabel} <span className="px-2">•</span> {timeRemaining}
            </p>
          </div>

          <Link
            href="/interview/current"
            className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover"
          >
            Resume
          </Link>
        </div>

        <div className="mt-7">
          <div className="h-2 max-w-[460px] rounded-full bg-surface-secondary">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm font-medium text-text-secondary">
            {progress}% Completed
          </p>
        </div>
      </div>
    </section>
  );
};
