import { DetailedAnalyticsView } from "@/components/analysis/DetailedAnalyticsView";
import { requireActiveSession } from "@/lib/session";

export default async function AnalyticsDetailsPage() {
  await requireActiveSession();

  return <DetailedAnalyticsView />;
}
