"use client";

import type { ComponentType, CSSProperties } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Eye,
  Flame,
  MessageSquareText,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type RangeKey = "7D" | "30D" | "3M" | "All";
type RoleFilter = "All Roles" | "Frontend Developer" | "React Developer" | "JavaScript" | "System Design";

interface MetricCard {
  label: string;
  value: string;
  helper: string;
  icon: ComponentType<{ className?: string }>;
  tone: string;
  trend?: string;
}

interface ScorePoint {
  label: string;
  overall: number;
  clarity: number;
  relevance: number;
  depth: number;
  confidence: number;
}

interface RadarMetric {
  label: string;
  score: number;
}

interface TopicCoverage {
  label: string;
  percent: number;
  color: string;
  badgeClass: string;
}

interface DurationPoint {
  duration: number;
  score: number;
}

interface RecentSession {
  date: string;
  role: RoleFilter;
  score: string;
  duration: string;
  questions: string;
  tag: string;
  tagClass: string;
}

interface FocusArea {
  title: string;
  helper: string;
  score: number;
  icon: ComponentType<{ className?: string }>;
  tone: string;
  barClass: string;
}

interface NextStep {
  title: string;
  helper: string;
  icon: ComponentType<{ className?: string }>;
  tone: string;
}

const ranges: RangeKey[] = ["7D", "30D", "3M", "All"];

const rangeLabels: Record<RangeKey, string> = {
  "7D": "Last 7 Days",
  "30D": "Last 30 Days",
  "3M": "Last 3 Months",
  All: "All Time",
};

const roleOptions: RoleFilter[] = [
  "All Roles",
  "Frontend Developer",
  "React Developer",
  "JavaScript",
  "System Design",
];

const metricCards: MetricCard[] = [
  {
    label: "Interviews Attended",
    value: "12",
    helper: "from last month",
    trend: "+3",
    icon: BriefcaseBusiness,
    tone: "bg-accent-lighter text-accent",
  },
  {
    label: "Overall Score",
    value: "74/100",
    helper: "points from last month",
    trend: "+8",
    icon: Sparkles,
    tone: "bg-success-lightest text-success-foreground",
  },
  {
    label: "Success Rate",
    value: "66%",
    helper: "from last month",
    trend: "+12%",
    icon: Target,
    tone: "bg-error-light text-error",
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
  {
    label: "Practice Time",
    value: "8",
    helper: "Unique skills practiced",
    icon: BookOpen,
    tone: "bg-info-light text-info-foreground",
  },
  {
    label: "Streak",
    value: "4 days",
    helper: "Practice streak",
    icon: Flame,
    tone: "bg-accent-light text-accent",
  },
];

const scoreDataByRange: Record<RangeKey, ScorePoint[]> = {
  "7D": [
    { label: "Jun 8", overall: 72, clarity: 58, relevance: 56, depth: 43, confidence: 18 },
    { label: "Jun 9", overall: 76, clarity: 60, relevance: 58, depth: 44, confidence: 22 },
    { label: "Jun 10", overall: 82, clarity: 65, relevance: 64, depth: 48, confidence: 24 },
    { label: "Jun 11", overall: 79, clarity: 62, relevance: 61, depth: 46, confidence: 25 },
    { label: "Jun 12", overall: 86, clarity: 68, relevance: 70, depth: 54, confidence: 29 },
    { label: "Jun 13", overall: 84, clarity: 66, relevance: 69, depth: 55, confidence: 28 },
    { label: "Jun 14", overall: 94, clarity: 78, relevance: 77, depth: 62, confidence: 34 },
  ],
  "30D": [
    { label: "May 16", overall: 72, clarity: 53, relevance: 45, depth: 38, confidence: 20 },
    { label: "May 18", overall: 82, clarity: 64, relevance: 58, depth: 50, confidence: 24 },
    { label: "May 20", overall: 76, clarity: 57, relevance: 49, depth: 43, confidence: 18 },
    { label: "May 22", overall: 85, clarity: 54, relevance: 40, depth: 48, confidence: 32 },
    { label: "May 24", overall: 72, clarity: 56, relevance: 52, depth: 50, confidence: 22 },
    { label: "May 26", overall: 79, clarity: 59, relevance: 55, depth: 47, confidence: 18 },
    { label: "May 28", overall: 85, clarity: 68, relevance: 58, depth: 53, confidence: 28 },
    { label: "May 30", overall: 75, clarity: 58, relevance: 52, depth: 44, confidence: 17 },
    { label: "Jun 1", overall: 86, clarity: 65, relevance: 61, depth: 54, confidence: 30 },
    { label: "Jun 3", overall: 84, clarity: 67, relevance: 64, depth: 58, confidence: 31 },
    { label: "Jun 5", overall: 79, clarity: 58, relevance: 55, depth: 49, confidence: 26 },
    { label: "Jun 7", overall: 72, clarity: 57, relevance: 50, depth: 43, confidence: 18 },
    { label: "Jun 9", overall: 78, clarity: 61, relevance: 57, depth: 45, confidence: 22 },
    { label: "Jun 11", overall: 84, clarity: 67, relevance: 64, depth: 54, confidence: 24 },
    { label: "Jun 13", overall: 95, clarity: 78, relevance: 76, depth: 62, confidence: 34 },
  ],
  "3M": [
    { label: "Apr 1", overall: 61, clarity: 48, relevance: 44, depth: 35, confidence: 16 },
    { label: "Apr 15", overall: 66, clarity: 50, relevance: 47, depth: 38, confidence: 19 },
    { label: "May 1", overall: 70, clarity: 55, relevance: 51, depth: 42, confidence: 21 },
    { label: "May 15", overall: 76, clarity: 58, relevance: 56, depth: 47, confidence: 24 },
    { label: "Jun 1", overall: 84, clarity: 66, relevance: 64, depth: 55, confidence: 30 },
    { label: "Jun 14", overall: 94, clarity: 78, relevance: 76, depth: 62, confidence: 34 },
  ],
  All: [
    { label: "Jan", overall: 54, clarity: 42, relevance: 40, depth: 32, confidence: 12 },
    { label: "Feb", overall: 58, clarity: 45, relevance: 43, depth: 34, confidence: 15 },
    { label: "Mar", overall: 63, clarity: 49, relevance: 46, depth: 37, confidence: 18 },
    { label: "Apr", overall: 67, clarity: 52, relevance: 50, depth: 40, confidence: 20 },
    { label: "May", overall: 76, clarity: 59, relevance: 55, depth: 48, confidence: 24 },
    { label: "Jun", overall: 94, clarity: 78, relevance: 76, depth: 62, confidence: 34 },
  ],
};

const trendSeries = [
  { key: "overall", label: "Overall Score", color: "var(--color-accent)" },
  { key: "clarity", label: "Clarity", color: "var(--color-success)" },
  { key: "relevance", label: "Relevance", color: "var(--color-info-medium)" },
  { key: "depth", label: "Technical Depth", color: "var(--color-warning)" },
  { key: "confidence", label: "Confidence", color: "var(--color-accent-hover)" },
] as const;

const radarMetrics: RadarMetric[] = [
  { label: "Clarity", score: 78 },
  { label: "Relevance", score: 74 },
  { label: "Technical Depth", score: 68 },
  { label: "Confidence", score: 76 },
];

const topicCoverage: TopicCoverage[] = [
  { label: "React", percent: 30, color: "var(--color-accent)", badgeClass: "bg-accent text-accent-foreground" },
  { label: "JavaScript", percent: 20, color: "var(--color-info-medium)", badgeClass: "bg-info-medium text-accent-foreground" },
  { label: "System Design", percent: 15, color: "var(--color-accent-hover)", badgeClass: "bg-accent-hover text-accent-foreground" },
  { label: "Behavioral", percent: 15, color: "var(--color-error-light)", badgeClass: "bg-error-light text-error" },
  { label: "HTML/CSS", percent: 10, color: "var(--color-accent-light)", badgeClass: "bg-accent-light text-accent" },
  { label: "Others", percent: 10, color: "var(--color-success-light)", badgeClass: "bg-success-light text-success-foreground" },
];

const durationPoints: DurationPoint[] = [
  { duration: 11, score: 48 },
  { duration: 18, score: 72 },
  { duration: 23, score: 68 },
  { duration: 27, score: 78 },
  { duration: 34, score: 73 },
  { duration: 41, score: 62 },
  { duration: 46, score: 70 },
  { duration: 51, score: 74 },
  { duration: 56, score: 88 },
  { duration: 63, score: 82 },
  { duration: 67, score: 47 },
  { duration: 76, score: 89 },
  { duration: 83, score: 74 },
];

const recentSessions: RecentSession[] = [
  {
    date: "Jun 13, 2025",
    role: "Frontend Developer",
    score: "82/100",
    duration: "32 min",
    questions: "8/10",
    tag: "React",
    tagClass: "bg-accent-light text-accent",
  },
  {
    date: "Jun 9, 2025",
    role: "React Developer",
    score: "78/100",
    duration: "28 min",
    questions: "10/10",
    tag: "React",
    tagClass: "bg-accent-light text-accent",
  },
  {
    date: "Jun 5, 2025",
    role: "JavaScript",
    score: "72/100",
    duration: "26 min",
    questions: "9/10",
    tag: "JavaScript",
    tagClass: "bg-info-light text-info-foreground",
  },
  {
    date: "Jun 1, 2025",
    role: "System Design",
    score: "68/100",
    duration: "45 min",
    questions: "11/14",
    tag: "System Design",
    tagClass: "bg-warning-light text-warning-foreground",
  },
  {
    date: "May 28, 2025",
    role: "Frontend Developer",
    score: "75/100",
    duration: "22 min",
    questions: "7/8",
    tag: "Behavioral",
    tagClass: "bg-success-lightest text-success-foreground",
  },
];

const focusAreas: FocusArea[] = [
  {
    title: "Technical Depth",
    helper: "Needs improvement",
    score: 68,
    icon: Target,
    tone: "bg-warning-light text-warning-foreground",
    barClass: "bg-warning",
  },
  {
    title: "Relevance",
    helper: "Room to grow",
    score: 74,
    icon: BookOpen,
    tone: "bg-info-light text-info-foreground",
    barClass: "bg-info-medium",
  },
  {
    title: "Confidence",
    helper: "Good progress",
    score: 76,
    icon: Trophy,
    tone: "bg-success-light text-success-foreground",
    barClass: "bg-success",
  },
];

const nextSteps: NextStep[] = [
  {
    title: "Practice React performance optimization questions",
    helper: "3 suggested mocks",
    icon: Sparkles,
    tone: "bg-accent-light text-accent",
  },
  {
    title: "Work on explaining tradeoffs for architecture decisions",
    helper: "2 recommended mocks",
    icon: TrendingUp,
    tone: "bg-info-light text-info-foreground",
  },
  {
    title: "Strengthen behavioral responses with the S.T.A.R. technique",
    helper: "2 suggested mocks",
    icon: BriefcaseBusiness,
    tone: "bg-success-light text-success-foreground",
  },
];

const sectionCardClass = "rounded-2xl border border-border bg-surface p-5 shadow-sm";
const compactCardClass = "rounded-2xl border border-border bg-surface p-4 shadow-sm";

const polarPoint = (center: number, radius: number, index: number, count: number) => {
  const angle = (Math.PI * 2 * index) / count - Math.PI / 2;

  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  };
};

const getLinePath = (points: ScorePoint[], key: keyof Pick<ScorePoint, "overall" | "clarity" | "relevance" | "depth" | "confidence">) => {
  const width = 520;
  const height = 160;
  const left = 44;
  const top = 16;
  const max = 100;

  return points
    .map((point, index) => {
      const x = left + (index / Math.max(points.length - 1, 1)) * width;
      const y = top + height - (point[key] / max) * height;

      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
};

const getLinePoints = (points: ScorePoint[], key: keyof Pick<ScorePoint, "overall" | "clarity" | "relevance" | "depth" | "confidence">) => {
  const width = 520;
  const height = 160;
  const left = 44;
  const top = 16;

  return points.map((point, index) => ({
    x: left + (index / Math.max(points.length - 1, 1)) * width,
    y: top + height - (point[key] / 100) * height,
  }));
};

const createDonutStyle = (topics: TopicCoverage[]): CSSProperties => {
  let cursor = 0;
  const segments = topics.map((topic) => {
    const start = cursor;
    cursor += topic.percent;
    return `${topic.color} ${start}% ${cursor}%`;
  });

  return {
    background: `conic-gradient(${segments.join(", ")})`,
  };
};

const TrendChart = ({ data }: { data: ScorePoint[] }) => {
  const selectedIndex = Math.max(0, data.length - 4);
  const selectedPoint = data[selectedIndex];
  const markerX = 44 + (selectedIndex / Math.max(data.length - 1, 1)) * 520;

  return (
    <div className="mt-5 overflow-x-auto">
      <svg viewBox="0 0 620 245" className="min-w-[620px]" role="img" aria-label="Score trend chart">
        {[0, 25, 50, 75, 100].map((score) => {
          const y = 16 + 160 - (score / 100) * 160;

          return (
            <g key={score}>
              <line x1="44" x2="564" y1={y} y2={y} stroke="var(--color-border)" strokeDasharray={score === 0 ? "0" : "6 6"} />
              <text x="8" y={y + 4} className="fill-text-secondary text-[10px]">
                {score}
              </text>
            </g>
          );
        })}

        {trendSeries.map((series) => {
          const points = getLinePoints(data, series.key);

          return (
            <g key={series.key}>
              <path d={getLinePath(data, series.key)} fill="none" stroke={series.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {points.map((point, index) => (
                <circle key={`${series.key}-${index}`} cx={point.x} cy={point.y} r="3.2" fill={series.color} stroke="var(--color-surface)" strokeWidth="1.5" />
              ))}
            </g>
          );
        })}

        <line x1={markerX} x2={markerX} y1="28" y2="178" stroke="var(--color-accent)" strokeDasharray="4 4" />
        <rect x={Math.min(markerX - 54, 486)} y="4" width="108" height="48" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" />
        <text x={Math.min(markerX - 44, 496)} y="22" className="fill-text-secondary text-[10px]">
          Jun 5, 2025
        </text>
        <text x={Math.min(markerX - 44, 496)} y="39" className="fill-accent text-[10px] font-bold">
          Overall Score: {selectedPoint.overall}/100
        </text>

        {data.map((point, index) => {
          if (index % Math.ceil(data.length / 7) !== 0 && index !== data.length - 1) {
            return null;
          }

          const x = 44 + (index / Math.max(data.length - 1, 1)) * 520;

          return (
            <text key={point.label} x={x - 14} y="202" className="fill-text-secondary text-[10px]">
              {point.label}
            </text>
          );
        })}

        <text x="8" y="10" className="fill-text-secondary text-[10px]">
          Score
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {trendSeries.map((series) => (
          <span key={series.key} className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: series.color }} />
            {series.label}
          </span>
        ))}
      </div>
    </div>
  );
};

const RadarChart = () => {
  const center = 108;
  const maxRadius = 78;
  const gridRadii = [22, 44, 66, 88];
  const shapePoints = radarMetrics.map((metric, index) =>
    polarPoint(center, (metric.score / 100) * maxRadius, index, radarMetrics.length)
  );

  return (
    <div className="mt-4 flex min-h-[230px] items-center justify-center">
      <svg viewBox="0 0 216 216" className="h-[230px] w-[230px]" role="img" aria-label="Skill breakdown radar chart">
        {gridRadii.map((radius) => {
          const points = radarMetrics.map((_, index) => polarPoint(center, radius, index, radarMetrics.length));

          return <polygon key={radius} points={points.map((point) => `${point.x},${point.y}`).join(" ")} fill="none" stroke="var(--color-border)" />;
        })}
        {radarMetrics.map((metric, index) => {
          const end = polarPoint(center, maxRadius + 10, index, radarMetrics.length);
          const label = polarPoint(center, maxRadius + 34, index, radarMetrics.length);

          return (
            <g key={metric.label}>
              <line x1={center} x2={end.x} y1={center} y2={end.y} stroke="var(--color-border)" />
              <text x={label.x} y={label.y} textAnchor="middle" className="fill-text-primary text-[10px] font-semibold">
                {metric.label}
              </text>
              <text x={label.x} y={label.y + 14} textAnchor="middle" className="fill-text-primary text-[11px] font-bold">
                {metric.score}
              </text>
            </g>
          );
        })}
        <polygon points={shapePoints.map((point) => `${point.x},${point.y}`).join(" ")} fill="var(--color-accent-light)" fillOpacity="0.55" stroke="var(--color-accent)" strokeWidth="2" />
        {shapePoints.map((point, index) => (
          <circle key={radarMetrics[index].label} cx={point.x} cy={point.y} r="3.2" fill="var(--color-accent)" stroke="var(--color-surface)" strokeWidth="1.5" />
        ))}
        <text x="108" y="38" textAnchor="middle" className="fill-text-secondary text-[8px]">
          100
        </text>
        <text x="108" y="83" textAnchor="middle" className="fill-text-secondary text-[8px]">
          50
        </text>
        <text x="108" y="110" textAnchor="middle" className="fill-text-secondary text-[8px]">
          25
        </text>
      </svg>
    </div>
  );
};

const TopicDonut = () => (
  <div className="mt-5 grid gap-5 md:grid-cols-[220px_1fr] md:items-center">
    <div className="relative mx-auto h-48 w-48 rounded-full" style={createDonutStyle(topicCoverage)}>
      <div className="absolute inset-12 flex flex-col items-center justify-center rounded-full bg-surface text-center shadow-sm">
        <span className="text-3xl font-bold text-text-primary">12</span>
        <span className="text-xs font-semibold text-text-secondary">Total</span>
        <span className="text-xs font-semibold text-text-secondary">Sessions</span>
      </div>
    </div>

    <div className="space-y-3">
      {topicCoverage.map((topic) => (
        <div key={topic.label} className="flex items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-2 font-medium text-text-primary">
            <span className={cn("h-2.5 w-2.5 rounded-full", topic.badgeClass)} />
            {topic.label}
          </span>
          <span className="font-semibold text-text-secondary">{topic.percent}%</span>
        </div>
      ))}
    </div>
  </div>
);

const DurationScatter = () => (
  <div className="mt-4 overflow-x-auto">
    <svg viewBox="0 0 640 220" className="min-w-[640px]" role="img" aria-label="Session duration versus performance scatter chart">
      {[0, 25, 50, 75, 100].map((score) => {
        const y = 18 + 150 - (score / 100) * 150;

        return (
          <g key={score}>
            <line x1="42" x2="600" y1={y} y2={y} stroke="var(--color-border)" strokeDasharray={score === 0 ? "0" : "7 7"} />
            <text x="10" y={y + 4} className="fill-text-secondary text-[10px]">
              {score}
            </text>
          </g>
        );
      })}

      <rect x="170" y="24" width="230" height="144" fill="var(--color-accent-lighter)" opacity="0.82" />
      <rect x="430" y="8" width="138" height="50" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" />
      <text x="442" y="28" className="fill-text-primary text-[10px] font-semibold">
        Best performance range
      </text>
      <text x="442" y="45" className="fill-accent text-[10px] font-bold">
        20 - 45 min
      </text>

      {durationPoints.map((point) => {
        const x = 42 + (point.duration / 90) * 558;
        const y = 18 + 150 - (point.score / 100) * 150;

        return <circle key={`${point.duration}-${point.score}`} cx={x} cy={y} r="4" fill="var(--color-accent)" opacity="0.9" />;
      })}

      {[0, 15, 30, 45, 60, 75, 90].map((tick) => {
        const x = 42 + (tick / 90) * 558;

        return (
          <text key={tick} x={x - 5} y="198" className="fill-text-secondary text-[10px]">
            {tick}
          </text>
        );
      })}
      <text x="10" y="12" className="fill-text-secondary text-[10px]">
        Score
      </text>
      <text x="290" y="216" className="fill-text-secondary text-[10px]">
        Duration (minutes)
      </text>
    </svg>
  </div>
);

export function AnalyticsOverviewPage() {
  const [selectedRange, setSelectedRange] = useState<RangeKey>("30D");
  const [selectedRole, setSelectedRole] = useState<RoleFilter>("All Roles");
  const scoreData = scoreDataByRange[selectedRange];
  const filteredSessions =
    selectedRole === "All Roles"
      ? recentSessions
      : recentSessions.filter((session) => session.role === selectedRole || session.tag === selectedRole);

  return (
    <DashboardShell>
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-4">
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-3">
              <span className="inline-flex w-fit rounded-full bg-accent-lighter px-4 py-1.5 text-xs font-bold text-accent">
                Analysis Overview
              </span>
              <div className="space-y-2">
                <h1 className="max-w-4xl text-[28px] font-bold leading-9 text-text-primary">
                  Track your interview readiness, trends, and focus areas at a glance.
                </h1>
                <p className="max-w-3xl text-sm font-medium text-text-secondary">
                  Understand your progress over time and know what to focus on before your next interview.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-11 min-w-[170px] justify-between rounded-lg border-border bg-surface px-4 shadow-none">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-text-secondary" />
                      {rangeLabels[selectedRange]}
                    </span>
                    <ChevronDown className="h-4 w-4 text-text-secondary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Range</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {ranges.map((range) => (
                    <DropdownMenuItem key={range} onClick={() => setSelectedRange(range)}>
                      {rangeLabels[range]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-11 min-w-[150px] justify-between rounded-lg border-border bg-surface px-4 shadow-none">
                    {selectedRole}
                    <ChevronDown className="h-4 w-4 text-text-secondary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {roleOptions.map((role) => (
                    <DropdownMenuItem key={role} onClick={() => setSelectedRole(role)}>
                      {role}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button asChild variant="outline" className="h-11 rounded-lg border-border bg-surface px-5 font-bold shadow-none">
                <Link href="/history">View History</Link>
              </Button>
              {/* <Button asChild className="h-11 rounded-lg px-5 font-bold">
                <Link href="/analytics/details">
                  Detailed Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button> */}
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
          {metricCards.map((metric) => {
            const Icon = metric.icon;

            return (
              <article key={metric.label} className={compactCardClass}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-text-secondary">{metric.label}</p>
                    <p className="mt-2 text-[26px] font-bold leading-8 text-text-primary">{metric.value}</p>
                  </div>
                  <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full", metric.tone)}>
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-3 text-xs font-medium text-text-secondary">
                  {metric.trend && <span className="font-bold text-success-foreground">{metric.trend} </span>}
                  {metric.helper}
                </p>
              </article>
            );
          })}
        </section>

        <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr] 2xl:grid-cols-[1.55fr_1fr_1fr]">
          <section className={sectionCardClass}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-text-primary">Score Trend</h2>
                <p className="mt-1 text-xs font-medium text-text-secondary">
                  Your overall score over time. Click on a point to view that interview.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {ranges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setSelectedRange(range)}
                    className={cn(
                      "rounded-full px-3 py-1 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary",
                      selectedRange === range && "bg-accent-light text-accent hover:bg-accent-light hover:text-accent"
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <TrendChart data={scoreData} />
          </section>

          <section className={sectionCardClass}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-text-primary">Skill Breakdown</h2>
                <p className="mt-1 text-xs font-medium text-text-secondary">Average scores across core competencies.</p>
              </div>
              <div className="flex items-center gap-2">
                {(["7D", "30D", "All"] as RangeKey[]).map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setSelectedRange(range)}
                    className={cn(
                      "rounded-full px-3 py-1 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary",
                      selectedRange === range && "bg-accent-light text-accent hover:bg-accent-light hover:text-accent"
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <RadarChart />
          </section>

          <section className={sectionCardClass}>
            <div>
              <h2 className="text-lg font-bold text-text-primary">Topic Coverage</h2>
              <p className="mt-1 text-xs font-medium text-text-secondary">Distribution of interview topics practiced.</p>
            </div>
            <TopicDonut />
            <Link href="/analytics/details" className="mt-4 flex items-center justify-end gap-2 text-sm font-bold text-accent hover:text-accent-hover">
              View all topics
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_1.35fr]">
          <section className={sectionCardClass}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-text-primary">Session Duration vs Performance</h2>
                <p className="mt-1 text-xs font-medium text-text-secondary">Each dot represents a completed interview session.</p>
              </div>
            </div>
            <DurationScatter />
          </section>

          <section className={sectionCardClass}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-text-primary">Recent Sessions</h2>
                <p className="mt-1 text-xs font-medium text-text-secondary">Your latest completed interview sessions.</p>
              </div>
              <Link href="/history" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-border text-xs font-semibold text-text-secondary">
                  <tr>
                    <th className="py-3 pr-4">Date</th>
                    <th className="py-3 pr-4">Role / Topic</th>
                    <th className="py-3 pr-4">Score</th>
                    <th className="py-3 pr-4">Duration</th>
                    <th className="py-3 pr-4">Questions</th>
                    <th className="py-3 pr-4">Tag</th>
                    <th className="py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredSessions.map((session) => (
                    <tr key={`${session.date}-${session.role}`} className="text-text-primary">
                      <td className="py-3 pr-4 font-medium">{session.date}</td>
                      <td className="py-3 pr-4 font-medium">{session.role}</td>
                      <td className="py-3 pr-4">{session.score}</td>
                      <td className="py-3 pr-4">{session.duration}</td>
                      <td className="py-3 pr-4">{session.questions}</td>
                      <td className="py-3 pr-4">
                        <span className={cn("inline-flex rounded-md px-2 py-1 text-xs font-semibold", session.tagClass)}>
                          {session.tag}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Link href="/analytics/details" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-accent transition-colors hover:bg-accent-muted">
                          <span className="sr-only">View session details</span>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.8fr]">
          <section className={sectionCardClass}>
            <h2 className="text-lg font-bold text-text-primary">Focus Areas</h2>
            <p className="mt-1 text-xs font-medium text-text-secondary">Top areas to improve based on recent performance.</p>
            <div className="mt-5 space-y-5">
              {focusAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <div key={area.title} className="grid gap-3 sm:grid-cols-[150px_1fr_56px] sm:items-center">
                    <div className="flex items-center gap-3">
                      <span className={cn("flex h-9 w-9 items-center justify-center rounded-full", area.tone)}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-bold text-text-primary">{area.title}</span>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium text-text-secondary">{area.helper}</p>
                      <div className="h-2 overflow-hidden rounded-full bg-surface-secondary">
                        <div className={cn("h-full rounded-full", area.barClass)} style={{ width: `${area.score}%` }} />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-text-secondary sm:text-right">{area.score}/100</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className={sectionCardClass}>
            <h2 className="text-lg font-bold text-text-primary">Recommended Next Steps</h2>
            <p className="mt-1 text-xs font-medium text-text-secondary">Personalized actions to help you improve.</p>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {nextSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <article key={step.title} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full", step.tone)}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold leading-5 text-text-primary">{step.title}</h3>
                        <p className="mt-2 text-xs font-medium text-text-secondary">{step.helper}</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm" className="mt-5 h-9 rounded-lg border-border bg-surface px-4 font-bold shadow-none">
                      <Link href="/interview/new">
                        Start Practice
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
