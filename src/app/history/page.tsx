import { DashboardShell } from "@/components/layout/DashboardShell";
import { HistoryTable } from "@/components/history/HistoryTable";
import { getHistoryRows } from "@/lib/interview-data";
import { requireActiveSession } from "@/lib/session";

export default async function HistoryPage() {
  const session = await requireActiveSession();
  const historyInterviews = await getHistoryRows(session.user.id);

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
