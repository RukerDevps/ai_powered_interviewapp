import {
  BrainCircuit,
  Code2,
  Database,
  FileCode2,
  MessageSquareMore,
  PenTool,
  Sigma,
  SquareCode,
} from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/card";
import { HistoryFilters } from "@/components/history/HistoryFilters";
import { HistoryPagination } from "@/components/history/HistoryPagination";
import { HistoryTable, type HistoryInterviewRow } from "@/components/history/HistoryTable";

const historyInterviews: HistoryInterviewRow[] = [
  {
    id: "frontend-1",
    name: "Frontend Developer Interview",
    questions: "8 Questions",
    role: "Frontend Developer",
    type: "Technical",
    date: "May 18, 2025",
    time: "10:30 AM",
    duration: "30 Min",
    score: 78,
    status: "Completed",
    action: "View Details",
    href: "/interview/1/analysis",
    icon: Code2,
    iconTone: "success",
  },
  {
    id: "react-1",
    name: "React Developer Interview",
    questions: "10 Questions",
    role: "React Developer",
    type: "Technical",
    date: "May 16, 2025",
    time: "02:15 PM",
    duration: "30 Min",
    score: 65,
    status: "Completed",
    action: "View Details",
    href: "/interview/2/analysis",
    icon: BrainCircuit,
    iconTone: "accent",
  },
  {
    id: "javascript-1",
    name: "JavaScript Interview",
    questions: "8 Questions",
    role: "Frontend Developer",
    type: "Technical",
    date: "May 15, 2025",
    time: "11:45 AM",
    duration: "25 Min",
    score: 64,
    status: "Completed",
    action: "View Details",
    href: "/interview/3/analysis",
    icon: SquareCode,
    iconTone: "warning",
  },
  {
    id: "node-1",
    name: "Node.js Interview",
    questions: "8 Questions",
    role: "Backend Developer",
    type: "Technical",
    date: "May 12, 2025",
    time: "09:20 AM",
    duration: "30 Min",
    score: 48,
    status: "Completed",
    action: "View Details",
    href: "/interview/4/analysis",
    icon: Database,
    iconTone: "info",
  },
  {
    id: "system-design-1",
    name: "System Design Interview",
    questions: "12 Questions",
    role: "Software Engineer",
    type: "Technical",
    date: "May 10, 2025",
    time: "04:00 PM",
    duration: "45 Min",
    score: undefined,
    status: "Incomplete",
    action: "Continue",
    href: "/interview/5",
    icon: FileCode2,
    iconTone: "success",
  },
  {
    id: "behavioral-1",
    name: "Behavioral Interview",
    questions: "8 Questions",
    role: "Frontend Developer",
    type: "Behavioral",
    date: "May 8, 2025",
    time: "01:30 PM",
    duration: "20 Min",
    score: 85,
    status: "Completed",
    action: "View Details",
    href: "/interview/6/analysis",
    icon: MessageSquareMore,
    iconTone: "behavioral",
  },
  {
    id: "full-stack-1",
    name: "Full Stack Developer Interview",
    questions: "15 Questions",
    role: "Full Stack Developer",
    type: "Technical",
    date: "May 5, 2025",
    time: "10:00 AM",
    duration: "60 Min",
    score: 72,
    status: "Completed",
    action: "View Details",
    href: "/interview/7/analysis",
    icon: PenTool,
    iconTone: "accent",
  },
  {
    id: "python-1",
    name: "Python Developer Interview",
    questions: "8 Questions",
    role: "Backend Developer",
    type: "Technical",
    date: "May 3, 2025",
    time: "03:45 PM",
    duration: "30 Min",
    score: 70,
    status: "Completed",
    action: "View Details",
    href: "/interview/8/analysis",
    icon: Sigma,
    iconTone: "success",
  },
];

export default function HistoryPage() {
  return (
    <DashboardShell>
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-[28px] font-bold leading-9 text-text-primary">Interview History</h1>
          <p className="text-sm font-medium text-text-secondary">
            Review your past interviews and track your progress over time.
          </p>
        </div>

        <HistoryFilters />

        <Card className="overflow-hidden shadow-sm">
          <HistoryTable interviews={historyInterviews} />
          <div className="border-t border-border px-6 py-5">
            <HistoryPagination start={1} end={8} total={12} currentPage={1} totalPages={2} />
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
