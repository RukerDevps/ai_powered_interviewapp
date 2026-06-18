"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ScoreCardProps {
  label: string;
  score: number;
  maxScore?: number;
  status: string;
  color: "purple" | "green" | "orange" | "pink" | "blue";
  icon: LucideIcon;
}

export function ScoreCard({
  label,
  score,
  maxScore = 100,
  status,
  color,
  icon: Icon,
}: ScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate the score counting up on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 150);
    return () => clearTimeout(timer);
  }, [score]);

  // Color mappings
  const colorMap = {
    purple: {
      text: "text-accent",
      border: "border-accent/10",
      bg: "bg-accent/5",
      ring: "stroke-accent",
      track: "stroke-accent/10",
      statusText: "text-accent bg-accent-muted",
    },
    green: {
      text: "text-success",
      border: "border-success/10",
      bg: "bg-success/5",
      ring: "stroke-success",
      track: "stroke-success/10",
      statusText: "text-success bg-success-lightest border border-success/15",
    },
    orange: {
      text: "text-warning",
      border: "border-warning/10",
      bg: "bg-warning/5",
      ring: "stroke-warning",
      track: "stroke-warning/10",
      statusText: "text-warning bg-warning-light border border-warning/15",
    },
    pink: {
      text: "text-error",
      border: "border-error/10",
      bg: "bg-error/5",
      ring: "stroke-error",
      track: "stroke-error/10",
      statusText: "text-error bg-error-light/20 border border-error/15",
    },
    blue: {
      text: "text-info-foreground",
      border: "border-info/10",
      bg: "bg-info/5",
      ring: "stroke-info",
      track: "stroke-info/10",
      statusText: "text-info-foreground bg-info-lightest border border-info/15",
    },
  };

  const currentTheme = colorMap[color] || colorMap.purple;

  // SVG parameters for progress ring
  const radius = 38;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / maxScore) * circumference;

  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80">
      {/* Label and Icon Header */}
      <div className="flex items-center gap-2 mb-4 self-start">
        <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg border", currentTheme.bg, currentTheme.border, currentTheme.text)}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span className="text-sm font-bold text-text-secondary">{label}</span>
      </div>

      {/* Circular Progress Ring */}
      <div className="relative flex items-center justify-center h-28 w-28">
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            className={cn("fill-transparent stroke-2", currentTheme.track)}
            strokeWidth={strokeWidth}
          />
          {/* Foreground circle */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            className={cn("fill-transparent transition-all duration-1000 ease-out")}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke={color === "purple" ? "var(--color-accent)" : color === "green" ? "var(--color-success)" : color === "orange" ? "var(--color-warning)" : color === "pink" ? "var(--color-error)" : "var(--color-info)"}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black text-text-primary leading-none">{animatedScore}</span>
          <span className="text-[10px] font-bold text-text-muted mt-0.5">/{maxScore}</span>
        </div>
      </div>

      {/* Status indicator text */}
      <span className={cn("mt-4 rounded-full px-3 py-0.5 text-xs font-bold capitalize tracking-wide", currentTheme.statusText)}>
        {status}
      </span>
    </div>
  );
}
