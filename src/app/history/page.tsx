import { DashboardShell } from "@/components/layout/DashboardShell";
import { HistoryTable, type HistoryInterviewRow } from "@/components/history/HistoryTable";

const historyInterviews: HistoryInterviewRow[] = [
  {
    id: "frontend-1",
    name: "Frontend Developer Interview",
    questions: "8 Questions",
    role: "Frontend Developer",
    type: "Technical",
    date: "May 18, 2026",
    time: "10:30 AM",
    duration: "30 Min",
    score: 78,
    status: "Completed",
    action: "View Details",
    href: "/interview/1/analysis",
    icon: "code",
    iconTone: "success",
  },
  {
    id: "react-1",
    name: "React Developer Interview",
    questions: "10 Questions",
    role: "React Developer",
    type: "Technical",
    date: "May 16, 2026",
    time: "02:15 PM",
    duration: "30 Min",
    score: 65,
    status: "Completed",
    action: "View Details",
    href: "/interview/2/analysis",
    icon: "brain",
    iconTone: "accent",
  },
  {
    id: "javascript-1",
    name: "JavaScript Interview",
    questions: "8 Questions",
    role: "Frontend Developer",
    type: "Technical",
    date: "May 15, 2026",
    time: "11:45 AM",
    duration: "25 Min",
    score: 64,
    status: "Completed",
    action: "View Details",
    href: "/interview/3/analysis",
    icon: "square-code",
    iconTone: "warning",
  },
  {
    id: "node-1",
    name: "Node.js Interview",
    questions: "8 Questions",
    role: "Backend Developer",
    type: "Technical",
    date: "May 12, 2026",
    time: "09:20 AM",
    duration: "30 Min",
    score: 48,
    status: "Completed",
    action: "View Details",
    href: "/interview/4/analysis",
    icon: "database",
    iconTone: "info",
  },
  {
    id: "system-design-1",
    name: "System Design Interview",
    questions: "12 Questions",
    role: "Software Engineer",
    type: "Technical",
    date: "May 10, 2026",
    time: "04:00 PM",
    duration: "45 Min",
    score: undefined,
    status: "Incomplete",
    action: "Continue",
    href: "/interview/5",
    icon: "file-code",
    iconTone: "success",
  },
  {
    id: "behavioral-1",
    name: "Behavioral Interview",
    questions: "8 Questions",
    role: "Frontend Developer",
    type: "Behavioral",
    date: "May 8, 2026",
    time: "01:30 PM",
    duration: "20 Min",
    score: 85,
    status: "Completed",
    action: "View Details",
    href: "/interview/6/analysis",
    icon: "message",
    iconTone: "behavioral",
  },
  {
    id: "full-stack-1",
    name: "Full Stack Developer Interview",
    questions: "15 Questions",
    role: "Full Stack Developer",
    type: "Technical",
    date: "May 5, 2026",
    time: "10:00 AM",
    duration: "60 Min",
    score: 72,
    status: "Completed",
    action: "View Details",
    href: "/interview/7/analysis",
    icon: "pen-tool",
    iconTone: "accent",
  },
  {
    id: "python-1",
    name: "Python Developer Interview",
    questions: "8 Questions",
    role: "Backend Developer",
    type: "Technical",
    date: "May 3, 2026",
    time: "03:45 PM",
    duration: "30 Min",
    score: 70,
    status: "Completed",
    action: "View Details",
    href: "/interview/8/analysis",
    icon: "sigma",
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

        <HistoryTable interviews={historyInterviews} />
      </div>
    </DashboardShell>
  );
}
