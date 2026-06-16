import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

export interface InterviewTip {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "success" | "accent" | "warning";
}

interface InterviewTipsProps {
  tips: InterviewTip[];
}

const tipToneClasses: Record<InterviewTip["tone"], string> = {
  success: "bg-success-lightest text-success-foreground",
  accent: "bg-accent-lighter text-accent",
  warning: "bg-warning-light text-warning-foreground",
};

export const InterviewTips = ({ tips }: InterviewTipsProps) => {
  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm lg:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-bold text-text-primary">Upcoming Interview Tips</h2>
        <Link href="/resources" className="text-sm font-semibold text-accent hover:text-accent-hover">
          View All
        </Link>
      </div>

      <div className="mt-5 divide-y divide-border">
        {tips.map((tip) => {
          const Icon = tip.icon;

          return (
            <Link
              key={tip.title}
              href="/resources"
              className="flex items-center gap-4 py-4 transition-colors hover:bg-surface-secondary"
            >
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${tipToneClasses[tip.tone]}`}>
                <Icon className="h-7 w-7" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-text-primary">{tip.title}</span>
                <span className="mt-2 block text-sm text-text-secondary">{tip.description}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-text-primary" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
