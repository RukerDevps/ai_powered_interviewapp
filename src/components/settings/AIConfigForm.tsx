"use client";

import { useState } from "react";
import { Check, ChevronDown, Sparkles, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const personaOptions = [
  { label: "Professional Recruiter (HR focus)", value: "recruiter" },
  { label: "Technical Lead (Architecture focus)", value: "lead" },
  { label: "Friendly Peer (Collaborative focus)", value: "peer" },
  { label: "Strict Examiner (High standard depth check)", value: "strict" },
];

const modelOptions = [
  { label: "Kimi 2.6 Engine (Default, fast streaming)", value: "kimi-2.6" },
  { label: "Kimi 2.6 Pro (Deep thinking model)", value: "kimi-2.6-pro" },
  { label: "Kimi 2.0 Legacy (Stable, standard rate)", value: "kimi-2.0" },
];

export function AIConfigForm() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Form Fields
  const [persona, setPersona] = useState("lead");
  const [modelVersion, setModelVersion] = useState("kimi-2.6");
  const [temperature, setTemperature] = useState(0.7);
  const [speechRate, setSpeechRate] = useState(1.05);

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
        <h3 className="text-[18px] font-semibold leading-7 text-text-primary">AI Configuration</h3>
        <p className="text-sm font-medium text-text-secondary mt-0.5">
          Fine-tune Kimi 2.6 model parameters and response style.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          {/* AI Interviewer Persona */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Interviewer Persona</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {personaOptions.find((opt) => opt.value === persona)?.label || persona}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuRadioGroup value={persona} onValueChange={setPersona}>
                  {personaOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* AI Model Version */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">AI Model Version</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                    <Code2 className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {modelOptions.find((opt) => opt.value === modelVersion)?.label || modelVersion}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuRadioGroup value={modelVersion} onValueChange={setModelVersion}>
                  {modelOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Temperature slider */}
        <div className="space-y-2.5 rounded-xl border border-border bg-surface-secondary/30 p-4">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-text-primary font-bold">Model Temperature (Creativity)</span>
            <span className="text-accent">{temperature}</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="1.2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer accent-accent rounded-lg bg-surface-secondary border border-border"
          />
          <p className="text-xs text-text-secondary leading-relaxed">
            Lower temperatures produce more standard, factual questions. Higher temperatures result in more creative, contextual scenarios.
          </p>
        </div>

        {/* Speech rate slider */}
        <div className="space-y-2.5 rounded-xl border border-border bg-surface-secondary/30 p-4">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-text-primary font-bold">Text-to-Speech Voice Rate</span>
            <span className="text-accent">{speechRate}x</span>
          </div>
          <input
            type="range"
            min="0.8"
            max="1.5"
            step="0.05"
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer accent-accent rounded-lg bg-surface-secondary border border-border"
          />
          <p className="text-xs text-text-secondary leading-relaxed">
            Configure the rate at which the browser Speaks the question prompts. Default is 1.05x speed.
          </p>
        </div>
      </div>

      {/* Footer Save */}
      <div className="border-t border-border/50 pt-5 flex items-center justify-between">
        <div>
          {saveStatus === "saved" && (
            <div className="flex items-center gap-1.5 text-success text-sm font-semibold animate-in fade-in duration-300">
              <Check className="h-4 w-4" />
              AI settings updated successfully!
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={saveStatus === "saving"}
          className="h-11 bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-6 rounded-lg"
        >
          {saveStatus === "saving" ? "Saving..." : "Save AI Configuration"}
        </Button>
      </div>
    </form>
  );
}
