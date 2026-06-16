import type { LucideIcon } from "lucide-react";

export interface QuickStat {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "accent" | "success" | "warning" | "info" | "behavioral";
}

interface QuickStatsProps {
  stats: QuickStat[];
}

const toneClasses: Record<QuickStat["tone"], string> = {
  accent: "bg-accent-light text-accent",
  success: "bg-success-light text-success-foreground",
  warning: "bg-warning-light text-warning-foreground",
  info: "bg-info-light text-info-foreground",
  behavioral: "bg-behavioral-light text-behavioral-foreground",
};

export const QuickStats = ({ stats }: QuickStatsProps) => {
  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={`flex items-center gap-4 px-1 py-3 ${
                index > 0 ? "xl:border-l xl:border-border xl:pl-6" : ""
              }`}
            >
              <span className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full ${toneClasses[stat.tone]}`}>
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-medium text-text-secondary">{stat.label}</p>
                <p className="mt-2 text-sm font-bold text-text-primary">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
