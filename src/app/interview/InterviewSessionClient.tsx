"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  ChartColumn,
  Code2,
  AlertCircle,
  ShieldCheck,
  Video,
  Mic,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Component imports
import { ProctoringGuard } from "@/components/interview-session/ProctoringGuard";
import { InterviewerAvatar } from "@/components/interview-session/InterviewerAvatar";
import { AnswerInput } from "@/components/interview-session/AnswerInput";
import { QuestionsPanel, type QuestionItem } from "@/components/interview-session/QuestionsPanel";
import { SessionTimer } from "@/components/interview-session/SessionTimer";
import { SessionActionBar } from "@/components/interview-session/SessionActionBar";

interface InterviewSessionClientProps {
  interviewId: string;
}

interface ApiQuestion {
  id: string;
  order: number;
  text: string;
  difficulty: "easy" | "medium" | "hard";
  answered: boolean;
  answerScore: number | null;
}

interface InterviewSessionData {
  id: string;
  role: string;
  experienceLevel: string;
  interviewType: string;
  durationMinutes: number;
  currentDifficulty: "easy" | "medium" | "hard";
  status: "in_progress" | "completed" | "abandoned" | "incomplete" | "not_eligible";
  completedAt: string | null;
  questions: ApiQuestion[];
  hasAnalytics: boolean;
}

const mapQuestions = (apiQuestions: ApiQuestion[]): QuestionItem[] => {
  const firstUnansweredIndex = apiQuestions.findIndex((question) => !question.answered);

  return apiQuestions.map((question, index) => ({
    id: question.id,
    text: question.text,
    status: question.answered
      ? "answered"
      : index === firstUnansweredIndex
      ? "current"
      : "pending",
  }));
};

export function InterviewSessionClient({ interviewId }: InterviewSessionClientProps) {
  const router = useRouter();

  // Onboarding / Setup States
  const [isReady, setIsReady] = useState(false);
  const [micPermission, setMicPermission] = useState<"checking" | "granted" | "denied">("checking");

  // Live Session States
  const [isPaused, setIsPaused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [sessionData, setSessionData] = useState<InterviewSessionData | null>(null);
  const [loadError, setLoadError] = useState("");
  const [sessionError, setSessionError] = useState("");
  const [notEligibleMessage, setNotEligibleMessage] = useState("");

  // Bottom Panel Drawers
  const [activeDrawer, setActiveDrawer] = useState<"analysis" | "notes" | "settings" | null>(null);
  const [notesContent, setNotesContent] = useState("");
  const [micVolume, setMicVolume] = useState(80);
  const [selectedDevice, setSelectedDevice] = useState("default-mic");

  const [questions, setQuestions] = useState<QuestionItem[]>([]);

  // Current active question
  const currentQuestionIndex = questions.findIndex((q) => q.status === "current");
  const currentQuestion = questions[currentQuestionIndex] ?? questions[0];
  const currentQuestionText = currentQuestion
    ? `Question ${currentQuestionIndex + 1}: ${currentQuestion.text}`
    : "Loading your interview question...";

  // Check microphone permissions on mount
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          queueMicrotask(() => setMicPermission("granted"));
        })
        .catch(() => {
          queueMicrotask(() => setMicPermission("denied"));
        });
    } else {
      queueMicrotask(() => setMicPermission("denied"));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadInterview = async () => {
      try {
        const response = await fetch(`/api/interview/${interviewId}`);
        const payload = await response.json();

        if (!response.ok || !payload.success) {
          throw new Error(payload.error ?? "Could not load interview.");
        }

        if (!isMounted) {
          return;
        }

        const loadedInterview = payload.interview as InterviewSessionData;
        setSessionData(loadedInterview);
        setQuestions(mapQuestions(loadedInterview.questions));

        if (loadedInterview.status !== "in_progress") {
          router.replace(`/interview/${interviewId}/analysis`);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(
            error instanceof Error ? error.message : "Could not load interview."
          );
        }
      }
    };

    loadInterview();

    return () => {
      isMounted = false;
    };
  }, [interviewId, router]);

  // Text-To-Speech (TTS) voice synthesis using Web Speech API
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isSpeaking) {
      const textToSpeak = currentQuestionText;
      
      // Cancel any active speaking instances
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "en-US";
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Select an English voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(
        (v) => v.lang.startsWith("en-") && v.name.toLowerCase().includes("google")
      ) || voices.find((v) => v.lang.startsWith("en-"));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSpeaking, currentQuestionText]);

  // Enter Fullscreen & Start Live Session
  const handleStartSession = async () => {
    if (!sessionData) {
      setSessionError("Interview data is still loading.");
      return;
    }

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      setIsReady(true);
      setIsPaused(false);
      setSessionError("");

      if (currentQuestionText && currentQuestion) {
        setIsSpeaking(true);
      }
    } catch (err) {
      console.error("Failed to request fullscreen:", err);
      setSessionError("Fullscreen could not be enabled, but the session can still continue.");
      // Fallback: Proceed even if fullscreen is blocked by settings
      setIsReady(true);
    }
  };

  const completeInterview = async (status: "completed" | "incomplete") => {
    const response = await fetch("/api/interview/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interviewId,
        status,
      }),
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(payload.error ?? "Could not finish interview.");
    }

    router.replace(payload.href as string);
  };

  // Submit Answer Trigger
  const handleSubmitAnswer = async () => {
    if (!answerText.trim() || isSubmitting || !currentQuestion) return;

    setIsSubmitting(true);
    setIsRecording(false);
    setIsThinking(true);
    setSessionError("");

    try {
      const response = await fetch(`/api/interview/${interviewId}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          answer: answerText,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error ?? "Could not submit answer.");
      }

      const updatedQuestions = [...questions];
      const currentIndex = updatedQuestions.findIndex((question) => question.id === currentQuestion.id);

      if (currentIndex !== -1) {
        updatedQuestions[currentIndex] = {
          ...updatedQuestions[currentIndex],
          status: "answered",
        };

        if (payload.question) {
          updatedQuestions.splice(currentIndex + 1, 0, {
            id: payload.question.id,
            text: payload.question.questionText ?? payload.question.text ?? "",
            status: "current",
          });
        } else if (currentIndex + 1 < updatedQuestions.length) {
          updatedQuestions[currentIndex + 1] = {
            ...updatedQuestions[currentIndex + 1],
            status: "current",
          };
        }
      }

      setQuestions(updatedQuestions);
      setAnswerText("");
      setSessionData((current) =>
        current
          ? {
              ...current,
              status: payload.status,
              currentDifficulty: payload.difficulty ?? current.currentDifficulty,
            }
          : current
      );

      if (payload.status === "not_eligible") {
        setNotEligibleMessage(
          payload.message ?? "You are not eligible for this role based on this interview performance."
        );
        setIsReady(true);
        setIsThinking(false);
        setTimeout(() => {
          router.replace(`/interview/${interviewId}/analysis`);
        }, 1800);
        return;
      }

      setIsSpeaking(true);
    } catch (error) {
      setSessionError(error instanceof Error ? error.message : "Could not submit answer.");
    } finally {
      setIsSubmitting(false);
      setIsThinking(false);
    }
  };

  const handleTimeout = async () => {
    try {
      await completeInterview("incomplete");
    } catch (error) {
      setSessionError(error instanceof Error ? error.message : "Could not finish the interview.");
    }
  };

  const handleConfirmEndInterview = async () => {
    setShowEndDialog(false);
    try {
      if (document.exitFullscreen && document.fullscreenElement) {
        await document.exitFullscreen();
      }
      await completeInterview("completed");
    } catch (error) {
      setSessionError(error instanceof Error ? error.message : "Could not finish the interview.");
    }
  };

  return (
    <div className="min-h-dvh w-full bg-background selection:bg-accent/30">
      {/* Onboarding Gate Overlay */}
      {!isReady ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4">
          <Card className="w-full max-w-[580px] border-border bg-surface shadow-2xl">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-lighter text-accent overflow-hidden">
                <img src="/icons/Robot.png" alt="Robot" className="h-6 w-6 object-contain" />
              </div>
              <div className="space-y-1.5">
                <CardTitle className="text-[22px] font-bold text-text-primary">
                  Ready to Start Your Interview?
                </CardTitle>
                <CardDescription className="text-sm font-medium text-text-secondary">
                  Please review the system checks below to ensure a smooth, secure session.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              {/* Checklist details */}
              <div className="space-y-4 rounded-xl border border-border bg-surface-secondary p-5">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Compliance Checklist
                </h3>
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-success" />
                    <span className="text-sm text-text-dark font-medium">
                      Proctoring Guard: Enforces strict fullscreen lock.
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mic className="h-5 w-5 shrink-0 text-success" />
                    <span className="text-sm text-text-dark font-medium">
                      Audio Setup: Browser Speech API captures local responses.
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 shrink-0 text-text-muted" />
                    <span className="text-sm text-text-dark font-medium">
                      Camera Check: Offline only (no video uploads stored).
                    </span>
                  </div>
                </div>
              </div>

              {/* Warnings and Permissions */}
              {micPermission === "denied" && (
                <div className="flex items-start gap-3 rounded-xl bg-error-light/10 border border-error/25 p-4 text-error">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Microphone Permission Required</p>
                    <p className="text-xs leading-relaxed">
                      Please allow microphone access in your browser settings to continue. This is needed for transcription.
                    </p>
                  </div>
                </div>
              )}

              <div className="text-xs text-text-muted leading-relaxed">
                By clicking &quot;Start Session&quot;, your browser will enter fullscreen mode. Do not exit fullscreen, switch tabs, or use screenshot shortcuts, as this will result in immediate termination of the interview.
              </div>
              {loadError ? (
                <div className="rounded-xl border border-error/20 bg-error-light/10 px-4 py-3 text-sm font-medium text-error">
                  {loadError}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  className="h-11 font-semibold"
                  onClick={() => router.push("/dashboard")}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleStartSession}
                  disabled={micPermission === "denied" || !sessionData || Boolean(loadError)}
                  className="h-11 bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-6"
                >
                  Start Session & Enter Fullscreen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          {/* Active Proctoring Guard */}
          <ProctoringGuard
            interviewId={interviewId}
            isReady={isReady}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />

          <div className="flex h-dvh flex-col overflow-hidden lg:flex-row">
            {/* Left Column: Interview Actions */}
            <main className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-surface p-4 sm:p-6 lg:p-8">
              <div className="mx-auto flex w-full max-w-[960px] flex-1 flex-col gap-6">
                
                {/* Waving Hello encouragement banner */}
                <div className="relative overflow-hidden rounded-2xl bg-surface-secondary border border-border p-6 sm:p-8 flex items-center justify-between shadow-sm">
                  <div className="space-y-1.5 min-w-0 flex-1 pr-4">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                      {sessionData?.role ? `${sessionData.role} interview` : "Interview session"}
                    </h1>
                    <p className="text-sm sm:text-base text-text-secondary font-medium">
                      Answer carefully. The interview adapts as you go.
                    </p>
                  </div>
                  {/* Banner wave animation character mockup */}
                  <div className="hidden sm:block shrink-0 pr-4">
                    <img src="/icons/Robot.png" alt="Robot" className="h-16 w-16 object-contain animate-bounce" />
                  </div>
                </div>

                {/* Session Metadata header */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-xl border border-border bg-surface p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                      <BriefcaseBusiness className="h-4.5 w-4.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider">Role</p>
                      <p className="text-sm font-bold text-text-primary truncate">
                        {sessionData?.role ?? "Loading..."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success-lightest text-success-foreground border border-success/10">
                      <ChartColumn className="h-4.5 w-4.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider">Difficulty</p>
                      <p className="text-sm font-bold text-text-primary truncate capitalize">
                        {sessionData?.currentDifficulty ?? "medium"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-info-lightest text-info-foreground border border-info/10">
                      <Code2 className="h-4.5 w-4.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider">Type</p>
                      <p className="text-sm font-bold text-text-primary truncate">
                        {sessionData?.interviewType ?? "Technical"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <SessionTimer
                      initialMinutes={sessionData?.durationMinutes ?? 25}
                      isPaused={isPaused}
                      onTimeout={handleTimeout}
                      className="border-none bg-transparent p-0"
                    />
                  </div>
                </div>

                {/* AI Interviewer Card */}
                <Card className="rounded-xl border border-border shadow-sm overflow-hidden bg-surface">
                  <div className="flex items-center justify-between border-b border-border/60 bg-surface-secondary px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <img src="/icons/Robot.png" alt="Robot" className="h-5 w-5 object-contain" />
                      <span className="text-sm font-bold text-text-primary">AI Interviewer</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowEndDialog(true)}
                      className="h-8 rounded-lg text-error hover:bg-error-light/10 hover:text-error border-error/25 font-semibold flex items-center gap-1.5"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      End Interview
                    </Button>
                  </div>

                  <CardContent className="grid gap-6 p-6 md:grid-cols-[200px_1fr] md:items-start md:gap-8">
                    {/* Avatar representation and speech animation */}
                    <InterviewerAvatar isSpeaking={isSpeaking} isThinking={isThinking} />

                    {/* Chat Bubble container */}
                    <div className="space-y-4">
                      {sessionError ? (
                        <div className="rounded-xl border border-error/20 bg-error-light/10 px-4 py-3 text-sm font-medium text-error">
                          {sessionError}
                        </div>
                      ) : null}
                      {notEligibleMessage ? (
                        <div className="rounded-xl border border-warning/25 bg-warning-light px-4 py-3 text-sm font-semibold text-warning-foreground">
                          {notEligibleMessage}
                        </div>
                      ) : null}
                      <div className="relative rounded-2xl bg-surface-secondary border border-border p-5 text-sm leading-relaxed text-text-dark font-medium shadow-sm">
                        {/* Simulated Kimi 2.6 Streaming text */}
                        {isThinking ? (
                          <div className="flex items-center gap-2 text-text-secondary">
                            <span className="h-2 w-2 rounded-full bg-accent animate-bounce" />
                            <span className="h-2 w-2 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                            <span className="h-2 w-2 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                            <span>Processing feedback...</span>
                          </div>
                        ) : (
                          currentQuestionText
                        )}
                        <span className="absolute left-6 -top-3 h-3 w-3 rotate-45 border-l border-t border-border bg-surface-secondary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Answer Input Panel */}
                <AnswerInput
                  value={answerText}
                  onChange={setAnswerText}
                  onSubmit={handleSubmitAnswer}
                  isSubmitting={isSubmitting}
                  isPaused={isPaused || Boolean(notEligibleMessage) || !currentQuestion}
                  isRecording={isRecording}
                  setIsRecording={setIsRecording}
                />

                {/* Bottom ActionBar Utilities */}
                <SessionActionBar
                  onLiveAnalysisClick={() => setActiveDrawer(activeDrawer === "analysis" ? null : "analysis")}
                  onNotesClick={() => setActiveDrawer(activeDrawer === "notes" ? null : "notes")}
                  onSettingsClick={() => setActiveDrawer(activeDrawer === "settings" ? null : "settings")}
                  isPaused={isPaused}
                />

                {/* Sliding drawers inside main session block */}
                {activeDrawer && (
                  <div className="rounded-xl border border-border bg-surface p-5 shadow-inner animate-in slide-in-from-bottom duration-300">
                    {activeDrawer === "analysis" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-border/50 pb-2">
                          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Live Speech Analysis</h3>
                          <span className="text-xs text-success font-semibold">Active Metrics</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                          <div className="rounded-lg bg-surface-secondary p-3 text-center border border-border">
                            <p className="text-xs text-text-secondary">Speaking Pace</p>
                            <p className="text-base font-bold text-text-primary mt-1">135 WPM</p>
                            <span className="inline-block text-[10px] font-bold text-success bg-success-lightest px-1.5 py-0.5 rounded-md mt-1 border border-success/15">Good Pace</span>
                          </div>
                          <div className="rounded-lg bg-surface-secondary p-3 text-center border border-border">
                            <p className="text-xs text-text-secondary">Vocabulary Range</p>
                            <p className="text-base font-bold text-text-primary mt-1">High (76%)</p>
                            <span className="inline-block text-[10px] font-bold text-success bg-success-lightest px-1.5 py-0.5 rounded-md mt-1 border border-success/15">Strong Variety</span>
                          </div>
                          <div className="rounded-lg bg-surface-secondary p-3 text-center border border-border">
                            <p className="text-xs text-text-secondary">Sentiment Flow</p>
                            <p className="text-base font-bold text-text-primary mt-1">Positive (84%)</p>
                            <span className="inline-block text-[10px] font-bold text-accent bg-accent-lighter px-1.5 py-0.5 rounded-md mt-1 border border-accent/15">Constructive</span>
                          </div>
                          <div className="rounded-lg bg-surface-secondary p-3 text-center border border-border">
                            <p className="text-xs text-text-secondary">Confidence Trend</p>
                            <p className="text-base font-bold text-text-primary mt-1">Stable (72%)</p>
                            <span className="inline-block text-[10px] font-bold text-success bg-success-lightest px-1.5 py-0.5 rounded-md mt-1 border border-success/15">Consistent</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeDrawer === "notes" && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Interview Notes</h3>
                        <Textarea
                          placeholder="Jot down notes, key keywords, or structures to guide your speaking flow..."
                          value={notesContent}
                          onChange={(e) => setNotesContent(e.target.value)}
                          className="min-h-[100px] resize-none bg-surface border-border text-sm"
                        />
                        <p className="text-[10px] text-text-muted">
                          Notes are stored locally in browser session memory and will not be submitted with your evaluations.
                        </p>
                      </div>
                    )}

                    {activeDrawer === "settings" && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Audio Settings</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-text-dark">Select Input Device</label>
                            <select
                              value={selectedDevice}
                              onChange={(e) => setSelectedDevice(e.target.value)}
                              className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm focus:border-accent"
                            >
                              <option value="default-mic">System Default Microphone</option>
                              <option value="external-mic">External USB Microphone</option>
                              <option value="headset-mic">Headset Microphone</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-semibold text-text-dark">
                              <span>Microphone Gain</span>
                              <span>{micVolume}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={micVolume}
                              onChange={(e) => setMicVolume(Number(e.target.value))}
                              className="h-1.5 w-full cursor-pointer accent-accent rounded-lg bg-surface-secondary border border-border"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </main>

            {/* Right Sidebar Column: Questions List */}
            <QuestionsPanel
              questions={questions}
              onClose={() => {}}
            />
          </div>

          {/* End Interview Warning Dialog Modal */}
          <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
            <DialogContent className="max-w-[440px] border-error/20 bg-surface shadow-2xl">
              <DialogHeader className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error-light text-error">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <DialogTitle className="text-[18px] font-bold text-text-primary">
                  End Mock Interview?
                </DialogTitle>
                <DialogDescription className="text-sm font-medium text-text-secondary leading-relaxed">
                  Are you sure you want to end this interview? Ending now will submit your completed answers for AI evaluation and score calculations. You cannot resume this session later.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                <Button
                  variant="outline"
                  className="w-full h-11 font-semibold"
                  onClick={() => setShowEndDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmEndInterview}
                  className="w-full h-11 bg-error hover:bg-error-hover text-error-foreground font-semibold"
                >
                  Yes, End Interview
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
