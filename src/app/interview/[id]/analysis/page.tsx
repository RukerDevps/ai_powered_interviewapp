import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfidenceTrendChart } from "@/components/analysis/ConfidenceTrendChart";
import { PerQuestionFeedback } from "@/components/analysis/PerQuestionFeedback";
import { ScoreCard } from "@/components/analysis/ScoreCard";
import { SpeakingPaceChart } from "@/components/analysis/SpeakingPaceChart";
import { StrengthsAndImprovements } from "@/components/analysis/StrengthsAndImprovements";
import { requireActiveSession } from "@/lib/session";
import { getInterviewAnalysis } from "@/lib/interview-data";

interface InterviewAnalysisPageProps {
  params: Promise<{ id: string }>;
}

const scoreTone = (score: number) => {
  if (score >= 70) return "green" as const;
  if (score >= 50) return "orange" as const;
  return "pink" as const;
};

export default async function InterviewAnalysisPage({ params }: InterviewAnalysisPageProps) {
  const session = await requireActiveSession();
  const { id } = await params;
  const analysis = await getInterviewAnalysis(session.user.id, id);

  if (!analysis) {
    notFound();
  }

  const totalQuestions = Math.max(analysis.questionFeedback.length, 1);
  const weakQuestions = analysis.questionFeedback.filter((item) => (item.score ?? 0) < 50);

  return (
    <DashboardShell>
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <Button asChild variant="outline" size="sm" className="h-9 rounded-md">
              <Link href="/history">
                <ArrowLeft className="h-4 w-4" />
                Back to History
              </Link>
            </Button>
            <div className="space-y-1">
              <h1 className="text-[28px] font-bold leading-9 text-text-primary">
                {analysis.role} Interview Analysis
              </h1>
              <p className="text-sm font-medium text-text-secondary">
                Completed {analysis.completedAt ? new Date(analysis.completedAt).toLocaleString() : "recently"}.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
              {analysis.status.replaceAll("_", " ")}
            </span>
            <span className="inline-flex rounded-full bg-surface-secondary px-3 py-1 text-xs font-medium text-text-secondary">
              {analysis.interviewType}
            </span>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <ScoreCard
                label="Overall"
                score={analysis.overallScore}
                status="Overall"
                color={scoreTone(analysis.overallScore)}
                icon="trophy"
              />
              <ScoreCard
                label="Clarity"
                score={analysis.clarityScore}
                status="Clarity"
                color={scoreTone(analysis.clarityScore)}
                icon="check-circle"
              />
              <ScoreCard
                label="Relevance"
                score={analysis.relevanceScore}
                status="Relevance"
                color={scoreTone(analysis.relevanceScore)}
                icon="target"
              />
              <ScoreCard
                label="Technical Depth"
                score={analysis.technicalDepthScore}
                status="Depth"
                color={scoreTone(analysis.technicalDepthScore)}
                icon="list-checks"
              />
              <ScoreCard
                label="Confidence"
                score={analysis.confidenceScore}
                status="Confidence"
                color={scoreTone(analysis.confidenceScore)}
                icon="shield-check"
              />
            </div>

            <StrengthsAndImprovements
              strengths={analysis.strengths}
              improvements={analysis.improvements}
            />

            <div className="grid gap-6 xl:grid-cols-2">
              <SpeakingPaceChart status={analysis.speakingPaceLabel ?? "Good"} />
              <ConfidenceTrendChart status={analysis.confidenceTrend.length > 0 ? "Good" : "Pending"} />
            </div>

            <div className="space-y-4">
              {analysis.questionFeedback.length > 0 ? (
                analysis.questionFeedback.map((question, index) => (
                  <div key={`${question.order}-${index}`} id={`question-${question.order}`}>
                    <PerQuestionFeedback
                      questionNumber={question.order}
                      totalQuestions={totalQuestions}
                      questionText={question.questionText}
                      feedbackText={question.feedback}
                      submittedAnswer={question.answerText}
                    />
                  </div>
                ))
              ) : (
                <Card className="rounded-2xl border border-border bg-surface shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base text-text-primary">No question feedback yet</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-text-secondary">
                    This session does not have detailed question feedback available yet.
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <aside className="space-y-4 xl:sticky xl:top-6">
            <Card className="rounded-2xl border border-border bg-surface shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-text-primary">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysis.questionFeedback.map((question) => {
                  const isWeak = (question.score ?? 0) < 50;

                  return (
                    <a
                      key={question.order}
                      href={`#question-${question.order}`}
                      className="flex items-center justify-between rounded-xl border border-border bg-surface-secondary px-4 py-3 text-sm text-text-primary transition-colors hover:bg-accent-muted/40"
                    >
                      <span className="font-medium">Question {question.order}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          isWeak
                            ? "bg-warning-light text-warning-foreground"
                            : "bg-success-lightest text-success-foreground"
                        }`}
                      >
                        {isWeak ? "Weak" : "Answered"}
                      </span>
                    </a>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border bg-surface shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-text-primary">Session Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-text-secondary">
                <p>
                  <span className="font-medium text-text-primary">Role:</span> {analysis.role}
                </p>
                <p>
                  <span className="font-medium text-text-primary">Experience:</span> {analysis.experienceLevel}
                </p>
                <p>
                  <span className="font-medium text-text-primary">Questions reviewed:</span>{" "}
                  {analysis.questionFeedback.length}
                </p>
                <p>
                  <span className="font-medium text-text-primary">Weak questions:</span>{" "}
                  {weakQuestions.length}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border bg-surface shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-text-primary">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-text-secondary">
                <p>Review the weak questions first, then run another session with the same role.</p>
                <p>
                  <span className="font-medium text-text-primary">Recommended focus:</span>{" "}
                  {weakQuestions[0]?.questionText ?? "Maintain current pace and depth."}
                </p>
                <Button asChild className="w-full">
                  <Link href="/interview/new">Start another interview</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
