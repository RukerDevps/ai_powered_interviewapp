"use client";

import { useState } from "react";
import { Check, ChevronDown, Sliders, Code2, Clock3, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const difficultyOptions = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

const interviewTypeOptions = [
  { label: "Technical Focus", value: "technical" },
  { label: "Behavioral Focus", value: "behavioral" },
  { label: "Mixed Focus", value: "mixed" },
];

const timeLimitOptions = [
  { label: "2 Minutes", value: "2" },
  { label: "3 Minutes", value: "3" },
  { label: "5 Minutes", value: "5" },
  { label: "Unlimited Time", value: "unlimited" },
];

const durationOptions = [
  { label: "15 Minutes", value: "15" },
  { label: "30 Minutes", value: "30" },
  { label: "45 Minutes", value: "45" },
];

export function PreferencesForm() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Form Fields
  const [difficulty, setDifficulty] = useState("medium");
  const [type, setType] = useState("technical");
  const [timeLimit, setTimeLimit] = useState("3");
  const [duration, setDuration] = useState("30");
  const [enableEditor, setEnableEditor] = useState(true);
  const [enableSpeechMetrics, setEnableSpeechMetrics] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-border/60 pb-4">
        <h3 className="text-[18px] font-semibold leading-7 text-text-primary">Interview Preferences</h3>
        <p className="text-sm font-medium text-text-secondary mt-0.5">
          Configure default wizard settings for your mock interviews.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Default Difficulty */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Default Difficulty</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                    <Sliders className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {difficultyOptions.find((opt) => opt.value === difficulty)?.label || difficulty}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuRadioGroup value={difficulty} onValueChange={setDifficulty}>
                  {difficultyOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Default Interview Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Default Interview Type</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                    <Code2 className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {interviewTypeOptions.find((opt) => opt.value === type)?.label || type}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuRadioGroup value={type} onValueChange={setType}>
                  {interviewTypeOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Default Time-per-Question */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Default Time-per-Question</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                    <Timer className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {timeLimitOptions.find((opt) => opt.value === timeLimit)?.label || timeLimit}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuRadioGroup value={timeLimit} onValueChange={setTimeLimit}>
                  {timeLimitOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Default Timer Duration */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Default Timer Duration</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                    <Clock3 className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {durationOptions.find((opt) => opt.value === duration)?.label || duration}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuRadioGroup value={duration} onValueChange={setDuration}>
                  {durationOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Checkbox Options styled like premium switch controls */}
        <div className="space-y-4 pt-2">
          {/* Include Code Editor */}
          <label className="flex items-start gap-3.5 rounded-xl border border-border bg-surface-secondary/40 p-4 cursor-pointer hover:bg-surface-secondary/70 transition-colors">
            <input
              type="checkbox"
              checked={enableEditor}
              onChange={(e) => setEnableEditor(e.target.checked)}
              className="mt-0.5 h-4.5 w-4.5 rounded border-border text-accent focus:ring-accent accent-accent"
            />
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-text-primary">Enable In-Browser Code Editor</span>
              <span className="block text-xs text-text-secondary leading-relaxed">
                Automatically opens a side-by-side interactive code IDE workspace for technical algorithm assessments.
              </span>
            </div>
          </label>

          {/* Include Live Speech Metrics */}
          <label className="flex items-start gap-3.5 rounded-xl border border-border bg-surface-secondary/40 p-4 cursor-pointer hover:bg-surface-secondary/70 transition-colors">
            <input
              type="checkbox"
              checked={enableSpeechMetrics}
              onChange={(e) => setEnableSpeechMetrics(e.target.checked)}
              className="mt-0.5 h-4.5 w-4.5 rounded border-border text-accent focus:ring-accent accent-accent"
            />
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-text-primary">Enable Live Speech Metrics</span>
              <span className="block text-xs text-text-secondary leading-relaxed">
                Provide real-time speed (WPM) and pacing feedback charts in your evaluation dashboard post-session.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Footer Save */}
      <div className="border-t border-border/50 pt-5 flex items-center justify-between">
        <div>
          {saveStatus === "saved" && (
            <div className="flex items-center gap-1.5 text-success text-sm font-semibold animate-in fade-in duration-300">
              <Check className="h-4 w-4" />
              Preferences updated successfully!
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={saveStatus === "saving"}
          className="h-11 bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-6 rounded-lg"
        >
          {saveStatus === "saving" ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </form>
  );
}
