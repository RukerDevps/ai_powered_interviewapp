"use client";

import { BarChart3, ChevronRight, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionActionBarProps {
  onLiveAnalysisClick: () => void;
  onNotesClick: () => void;
  onSettingsClick: () => void;
  isPaused: boolean;
  className?: string;
}

export const SessionActionBar = ({
  onLiveAnalysisClick,
  onNotesClick,
  onSettingsClick,
  isPaused,
  className,
}: SessionActionBarProps) => {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-3 border-t border-border/60 bg-surface/50 pt-5",
        className
      )}
    >
      {/* Live Analysis Tab */}
      <button
        type="button"
        disabled={isPaused}
        onClick={onLiveAnalysisClick}
        className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 shadow-sm text-left transition-all duration-300 hover:border-accent hover:bg-surface-secondary hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-lighter text-accent group-hover:scale-110 transition-transform">
            <BarChart3 className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary">Live Analysis</p>
            <p className="text-xs text-text-secondary mt-0.5 truncate">View real-time feedback</p>
          </div>
        </div>
        <ChevronRight className="h-4.5 w-4.5 text-text-secondary group-hover:translate-x-1 transition-transform shrink-0" />
      </button>

      {/* Interview Notes Tab */}
      <button
        type="button"
        disabled={isPaused}
        onClick={onNotesClick}
        className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 shadow-sm text-left transition-all duration-300 hover:border-accent hover:bg-surface-secondary hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-lightest text-success-foreground border border-success/10 group-hover:scale-110 transition-transform">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary">Interview Notes</p>
            <p className="text-xs text-text-secondary mt-0.5 truncate">Add personal notes</p>
          </div>
        </div>
        <ChevronRight className="h-4.5 w-4.5 text-text-secondary group-hover:translate-x-1 transition-transform shrink-0" />
      </button>

      {/* Settings Tab */}
      <button
        type="button"
        disabled={isPaused}
        onClick={onSettingsClick}
        className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 shadow-sm text-left transition-all duration-300 hover:border-accent hover:bg-surface-secondary hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning-light text-warning-foreground border border-warning/10 group-hover:scale-110 transition-transform">
            <Settings className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary">Settings</p>
            <p className="text-xs text-text-secondary mt-0.5 truncate">Adjust interview settings</p>
          </div>
        </div>
        <ChevronRight className="h-4.5 w-4.5 text-text-secondary group-hover:translate-x-1 transition-transform shrink-0" />
      </button>
    </div>
  );
};
