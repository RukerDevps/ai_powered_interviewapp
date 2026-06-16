import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  Code2,
  Clock3,
  FileText,
  Lightbulb,
  Puzzle,
  Sparkles,
  Timer,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ContinueInterviewCard } from "@/components/dashboard/ContinueInterviewCard";
import { InterviewTips, type InterviewTip } from "@/components/dashboard/InterviewTips";
import { QuickStats, type QuickStat } from "@/components/dashboard/QuickStats";
import {
  RecentInterviews,
  type RecentInterview,
} from "@/components/dashboard/RecentInterviews";
import {
  RecentPerformance,
  type PerformanceMetric,
} from "@/components/dashboard/RecentPerformance";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";

const quickStats: QuickStat[] = [
  { label: "Role", value: "Frontend Developer", icon: BriefcaseBusiness, tone: "accent" },
  { label: "Difficulty", value: "Medium", icon: BarChart3, tone: "success" },
  { label: "Interview Type", value: "Technical", icon: Code2, tone: "warning" },
  { label: "Time per Interview", value: "30 Min", icon: Clock3, tone: "accent" },
  { label: "Questions", value: "8 - 10", icon: FileText, tone: "behavioral" },
];

const performanceMetrics: PerformanceMetric[] = [
  { label: "Average Score", value: "72/100", icon: Sparkles, tone: "success" },
  { label: "Interviews Taken", value: "5", icon: ClipboardList, tone: "info" },
  { label: "Questions Answered", value: "42", icon: FileText, tone: "warning" },
  { label: "Total Time", value: "2h 35m", icon: Timer, tone: "accent" },
];

const tips: InterviewTip[] = [
  {
    title: "Review JavaScript fundamentals",
    description: "Focus on closures, scope, and event loop.",
    icon: Lightbulb,
    tone: "success",
  },
  {
    title: "Practice React concepts",
    description: "Hooks, state management, and component lifecycle.",
    icon: Code2,
    tone: "accent",
  },
  {
    title: "Work on problem solving",
    description: "Solve coding problems on data structures.",
    icon: Puzzle,
    tone: "warning",
  },
];

const recentInterviews: RecentInterview[] = [
  {
    title: "Frontend Developer Interview",
    date: "May 18, 2025",
    time: "10:30 AM",
    score: 78,
  },
  {
    title: "React Developer Interview",
    date: "May 16, 2025",
    time: "02:15 PM",
    score: 65,
  },
  {
    title: "JavaScript Interview",
    date: "May 15, 2025",
    time: "11:45 AM",
    score: 64,
  },
  {
    title: "Frontend Developer Interview",
    date: "May 12, 2025",
    time: "09:20 AM",
    score: 48,
  },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6">
        <WelcomeHeader name="Alex" />
        <QuickStats stats={quickStats} />

        <div className="grid gap-6 xl:grid-cols-2">
          <ContinueInterviewCard
            title="Frontend Developer Interview"
            questionLabel="Question 3 of 8"
            timeRemaining="24:35 remaining"
            progress={37}
          />
          <RecentPerformance score={72} metrics={performanceMetrics} />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <InterviewTips tips={tips} />
          <RecentInterviews interviews={recentInterviews} />
        </div>
      </div>
    </DashboardShell>
  );
}
