"use client";

import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface InterviewerAvatarProps {
  isSpeaking: boolean;
  isThinking: boolean;
  className?: string;
}

export const InterviewerAvatar = ({
  isSpeaking,
  isThinking,
  className,
}: InterviewerAvatarProps) => {
  // Determine active status configurations
  let statusText = "Listening";
  let statusColor = "bg-info-lightest text-info-foreground border-info/20";
  let statusDotColor = "bg-info";

  if (isSpeaking) {
    statusText = "Speaking...";
    statusColor = "bg-success-lightest text-success-foreground border-success/20";
    statusDotColor = "bg-success animate-ping";
  } else if (isThinking) {
    statusText = "Thinking...";
    statusColor = "bg-warning-light text-warning-foreground border-warning/20";
    statusDotColor = "bg-warning animate-pulse";
  }

  // Waveform bars
  const waveformBars = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className={cn("flex flex-col items-center justify-center p-6 text-center", className)}>
      <div className="relative flex items-center justify-center mb-6">
        {/* Pulsing avatar background */}
        <span
          className={cn(
            "absolute inset-0 rounded-full scale-125 opacity-20 transition-all duration-700",
            isSpeaking ? "bg-success animate-ping" : isThinking ? "bg-warning animate-pulse" : "bg-info"
          )}
        />
        <div
          className={cn(
            "relative flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-md transition-all duration-500 overflow-hidden",
            isSpeaking
              ? "border-success bg-success-lightest/30 text-success-foreground"
              : isThinking
              ? "border-warning bg-warning-light/20 text-warning-foreground"
              : "border-border bg-surface text-text-primary"
          )}
        >
          <img
            src="/icons/Robot.png"
            alt="AI Interviewer"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Speaking/listening status badge */}
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-all",
          statusColor
        )}
      >
        <span className={cn("h-2.5 w-2.5 rounded-full", statusDotColor)} />
        {statusText}
      </div>

      {/* Audio Waveform visualization */}
      <div className="mt-8 flex h-10 w-full max-w-[280px] items-center justify-center gap-1">
        {waveformBars.map((bar) => {
          // Generate a staggered animation delay to create a waving effect
          const delay = `${(bar % 6) * 0.15}s`;
          return (
            <div
              key={bar}
              style={{ animationDelay: isSpeaking ? delay : undefined }}
              className={cn(
                "w-1 rounded-full bg-accent transition-all duration-300",
                isSpeaking
                  ? "animate-[waveform_1s_ease-in-out_infinite]"
                  : isThinking
                  ? "h-2 bg-warning/50 animate-pulse"
                  : "h-1 bg-text-muted/30"
              )}
            />
          );
        })}
      </div>

      {/* Inject custom waveform animation via global style (or Tailwind utility if configured) */}
      <style jsx global>{`
        @keyframes waveform {
          0%, 100% {
            height: 4px;
          }
          50% {
            height: 28px;
          }
        }
      `}</style>
    </div>
  );
};
