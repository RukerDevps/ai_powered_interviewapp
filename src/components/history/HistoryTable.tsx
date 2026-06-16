import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface HistoryInterviewRow {
  id: string;
  name: string;
  questions: string;
  role: string;
  type: "Technical" | "Behavioral";
  date: string;
  time: string;
  duration: string;
  score?: number;
  status: "Completed" | "Incomplete" | "In Progress";
  action: "View Details" | "Continue";
  href: string;
  icon: LucideIcon;
  iconTone: "accent" | "success" | "warning" | "info" | "behavioral";
}

interface HistoryTableProps {
  interviews: HistoryInterviewRow[];
}

const typeClasses: Record<HistoryInterviewRow["type"], string> = {
  Technical: "bg-technical-light text-technical-foreground",
  Behavioral: "bg-behavioral-light text-behavioral-foreground",
};

const statusClasses: Record<HistoryInterviewRow["status"], string> = {
  Completed: "bg-success-lightest text-success-foreground",
  Incomplete: "bg-info-lightest text-info-foreground",
  "In Progress": "bg-accent-light text-accent",
};

const iconToneClasses: Record<HistoryInterviewRow["iconTone"], string> = {
  accent: "bg-accent-light text-accent",
  success: "bg-success-lightest text-success-foreground",
  warning: "bg-warning-light text-warning-foreground",
  info: "bg-info-lightest text-info-foreground",
  behavioral: "bg-behavioral-light text-behavioral-foreground",
};

const getScoreClasses = (score?: number) => {
  if (typeof score !== "number") {
    return "bg-surface-secondary text-text-secondary";
  }

  if (score >= 70) {
    return "bg-success-lightest text-success-foreground";
  }

  if (score >= 50) {
    return "bg-warning-light text-warning-foreground";
  }

  return "bg-error-light text-error";
};

export const HistoryTable = ({ interviews }: HistoryTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[1040px]">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Interview</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interviews.map((interview) => {
            const Icon = interview.icon;

            return (
              <TableRow key={interview.id} className="group">
                <TableCell className="w-[320px]">
                  <div className="flex items-center gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconToneClasses[interview.iconTone]}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-text-primary">{interview.name}</p>
                      <p className="mt-1 text-sm text-text-secondary">{interview.questions}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[150px]">
                  <span className="block max-w-[120px] text-sm font-medium text-text-primary">
                    {interview.role}
                  </span>
                </TableCell>
                <TableCell className="w-[130px]">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${typeClasses[interview.type]}`}>
                    {interview.type}
                  </span>
                </TableCell>
                <TableCell className="w-[160px]">
                  <div className="text-sm text-text-primary">{interview.date}</div>
                  <div className="mt-1 text-sm text-text-secondary">{interview.time}</div>
                </TableCell>
                <TableCell className="w-[100px] text-sm text-text-primary">
                  {interview.duration}
                </TableCell>
                <TableCell className="w-[120px]">
                  <span className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${getScoreClasses(interview.score)}`}>
                    {typeof interview.score === "number" ? `${interview.score}/100` : "—"}
                  </span>
                </TableCell>
                <TableCell className="w-[130px]">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClasses[interview.status]}`}>
                    {interview.status}
                  </span>
                </TableCell>
                <TableCell className="w-[180px]">
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-10 rounded-md border-accent/40 px-4 text-sm font-medium text-accent shadow-none hover:border-accent hover:bg-accent-muted hover:text-accent"
                    >
                      <Link href={interview.href}>{interview.action}</Link>
                    </Button>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-text-primary transition-colors hover:bg-surface-secondary"
                      aria-label={`More actions for ${interview.name}`}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
