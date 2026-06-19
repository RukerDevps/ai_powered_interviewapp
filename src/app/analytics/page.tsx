import { AnalyticsOverviewPage } from "@/components/analysis/AnalyticsOverviewPage";
import { requireActiveSession } from "@/lib/session";

export default async function AnalyticsPage() {
  await requireActiveSession();

  return <AnalyticsOverviewPage />;
}
