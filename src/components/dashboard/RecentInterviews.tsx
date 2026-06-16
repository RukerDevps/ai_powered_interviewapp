import Link from "next/link";
import { Check, ChevronRight, Clock3, X } from "lucide-react";

export interface RecentInterview {
  title: string;
  date: string;
  time: string;
  score: number;
}

interface RecentInterviewsProps {
  interviews: RecentInterview[];
}

const getScoreClasses = (score: number) => {
  if (score >= 70) {
    return {
      badge: "bg-success-lightest text-success-foreground",
      icon: "bg-success-lightest text-success-foreground",
      Icon: Check,
    };
  }

  if (score >= 50) {
    return {
      badge: "bg-warning-light text-warning-foreground",
      icon: "bg-warning-light text-warning-foreground",
      Icon: Clock3,
    };
  }

  return {
    badge: "bg-error-light text-error",
    icon: "bg-error-light text-error",
    Icon: X,
  };
};

export const RecentInterviews = ({ interviews }: RecentInterviewsProps) => {
  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm lg:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-bold text-text-primary">Your Recent Interviews</h2>
        <Link href="/history" className="text-sm font-semibold text-accent hover:text-accent-hover">
          View All
        </Link>
      </div>

      <div className="mt-5 divide-y divide-border">
        {interviews.map((interview) => {
          const scoreStyle = getScoreClasses(interview.score);
          const Icon = scoreStyle.Icon;

          return (
            <Link
              key={`${interview.title}-${interview.date}-${interview.time}`}
              href="/history"
              className="flex items-center gap-4 py-3.5 transition-colors hover:bg-surface-secondary"
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${scoreStyle.icon}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-text-primary">
                  {interview.title}
                </span>
                <span className="mt-1 block text-sm text-text-secondary">
                  {interview.date} <span className="px-2">•</span> {interview.time}
                </span>
              </span>
              <span className={`rounded-md px-3 py-1 text-sm font-bold ${scoreStyle.badge}`}>
                {interview.score}/100
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-text-primary" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
