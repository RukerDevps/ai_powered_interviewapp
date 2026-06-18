"use client";

import { useEffect, useState, useRef } from "react";
import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionTimerProps {
  initialMinutes: number;
  isPaused: boolean;
  onTimeout: () => void;
  className?: string;
}

export const SessionTimer = ({
  initialMinutes,
  isPaused,
  onTimeout,
  className,
}: SessionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeoutRef = useRef(onTimeout);

  // Keep ref to avoid recreating interval on prop changes
  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    if (isPaused) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          onTimeoutRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isPaused]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Add low-time warning visual (e.g. red/alert styling when less than 3 minutes remain)
  const isLowTime = timeLeft <= 180;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors",
        isLowTime
          ? "border-error/30 bg-error-light/10 text-error animate-pulse"
          : "border-border bg-surface text-text-primary",
        className
      )}
    >
      <Clock3 className={cn("h-4 w-4", isLowTime ? "text-error" : "text-text-secondary")} />
      <span className="tabular-nums">{formattedTime}</span>
    </div>
  );
};
