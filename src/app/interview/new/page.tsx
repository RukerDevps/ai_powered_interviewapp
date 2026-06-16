import { DashboardShell } from "@/components/layout/DashboardShell";
import { InterviewSetupPage } from "@/components/interview-setup/InterviewSetupPage";

export default function NewInterviewPage() {
  return (
    <DashboardShell>
      <InterviewSetupPage />
    </DashboardShell>
  );
}
