import { DashboardShell } from "@/components/layout/DashboardShell";
import { InterviewSetupPage } from "@/components/interview-setup/InterviewSetupPage";
import { requireActiveSession } from "@/lib/session";

export default async function NewInterviewPage() {
  await requireActiveSession();

  return (
    <DashboardShell>
      <InterviewSetupPage />
    </DashboardShell>
  );
}
