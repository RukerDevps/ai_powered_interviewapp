"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProctoringGuardProps {
  interviewId: string;
  isReady: boolean;
  onViolation?: (reason: string) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
}

export const ProctoringGuard = ({
  interviewId,
  isReady,
  onViolation,
  isPaused,
  setIsPaused,
}: ProctoringGuardProps) => {
  const router = useRouter();
  const [strikeCount, setStrikeCount] = useState(0);
  const strikeCountRef = useRef(0);
  const [showSoftWarning, setShowSoftWarning] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isViolationTriggered = useRef(false);

  const triggerHardViolation = async (reason: string) => {
    if (isViolationTriggered.current) return;
    isViolationTriggered.current = true;

    if (onViolation) {
      onViolation(reason);
    }

    try {
      // Best effort API call to abandon the session
      await fetch(`/api/interview/${interviewId}/abandon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
    } catch (err) {
      console.error("Failed to report proctoring violation to backend", err);
    }

    // Redirect to dashboard with violation info
    router.push(`/dashboard?proctoring=violation&reason=${reason}`);
  };

  const handleReturnToInterview = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
      setShowSoftWarning(false);
      setIsPaused(false);
      setCountdown(10);
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    } catch (err) {
      console.error("Failed to re-enter fullscreen", err);
    }
  };

  useEffect(() => {
    if (!isReady) return;

    // 1. Fullscreen change listener
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !isViolationTriggered.current) {
        // If soft warning is already showing, keep fullscreen exit as hard violation
        triggerHardViolation("fullscreen_exit");
      }
    };

    // 2. Visibility change listener
    const handleVisibilityChange = () => {
      if (document.hidden && !isViolationTriggered.current) {
        triggerHardViolation("tab_switch_or_minimize");
      }
    };

    // 3. Keydown intercept (Screenshot, dev tools, view source)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInspector =
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j")) ||
        (e.metaKey && e.altKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j"));

      const isViewSource =
        (e.ctrlKey && (e.key === "U" || e.key === "u")) ||
        (e.metaKey && e.altKey && (e.key === "U" || e.key === "u"));

      if (e.key === "PrintScreen") {
        e.preventDefault();
        triggerHardViolation("screenshot_attempt");
      } else if (isInspector) {
        e.preventDefault();
        triggerHardViolation("devtools_open_attempt");
      } else if (isViewSource) {
        e.preventDefault();
        triggerHardViolation("view_source_attempt");
      }
    };

    // 4. Context menu disable (Right click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 5. Clipboard disable (Copy, Cut, Paste)
    const handleCopy = (e: ClipboardEvent) => e.preventDefault();
    const handleCut = (e: ClipboardEvent) => e.preventDefault();
    const handlePaste = (e: ClipboardEvent) => e.preventDefault();

    // 6. Window focus blur (Soft Violation Warning Strike System)
    const handleWindowBlur = () => {
      if (isViolationTriggered.current) return;

      const nextStrikes = strikeCountRef.current + 1;
      strikeCountRef.current = nextStrikes;
      setStrikeCount(nextStrikes);

      if (nextStrikes > 3) {
        triggerHardViolation("excessive_strikes");
        return;
      }

      // Trigger Soft Violation Warning Overlay
      setIsPaused(true);
      setShowSoftWarning(true);
      setCountdown(10);

      // Start 10 second countdown
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      
      let localCountdown = 10;
      countdownIntervalRef.current = setInterval(() => {
        localCountdown -= 1;
        setCountdown(localCountdown);
        if (localCountdown <= 0) {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
          }
          triggerHardViolation("soft_violation_timeout");
        }
      }, 1000);
    };

    // Register all listeners
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("paste", handlePaste);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("paste", handlePaste);
      window.removeEventListener("blur", handleWindowBlur);
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [isReady, interviewId]);

  return (
    <Dialog open={showSoftWarning} onOpenChange={() => {}}>
      <DialogContent className="max-w-[480px] border-warning/30 bg-surface text-center shadow-[0_24px_80px_rgba(16,24,40,0.18)]" aria-describedby="proctoring-warning-description">
        <DialogHeader className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-light text-warning-foreground">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl font-bold text-text-primary">
            Security Warning (Strike {strikeCount} of 3)
          </DialogTitle>
          <DialogDescription id="proctoring-warning-description" className="text-sm font-medium text-text-secondary">
            You clicked outside the interview window. Navigating away or losing focus violates our proctoring rules.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 rounded-xl bg-surface-secondary p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-text-dark font-medium">Time to return to interview:</span>
            <span className="text-4xl font-extrabold text-error tabular-nums">{countdown}s</span>
          </div>
          <p className="mt-3 text-xs text-text-muted">
            If you accumulate more than 3 strikes or fail to return within the time limit, your interview will be terminated automatically.
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            type="button"
            className="w-full h-11 bg-accent hover:bg-accent-hover text-accent-foreground font-semibold flex items-center justify-center gap-2"
            onClick={handleReturnToInterview}
          >
            <RefreshCw className="h-4 w-4" />
            Return to Interview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
