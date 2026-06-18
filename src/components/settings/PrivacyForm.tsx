"use client";

import { useState } from "react";
import { Check, ShieldAlert, Download, Trash2, ChevronDown, Clock3, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sensitivityOptions = [
  { label: "High (Immediate Session Abandonment)", value: "high" },
  { label: "Medium (Grace Warnings + 3 Strikes)", value: "medium" },
  { label: "Low (Metadata Flagging Only)", value: "low" },
];

const retentionOptions = [
  { label: "Delete immediately post-evaluation", value: "0" },
  { label: "Keep for 7 Days", value: "7" },
  { label: "Keep for 30 Days (Recommended)", value: "30" },
  { label: "Indefinite storage", value: "forever" },
];

const privacyOptions = [
  { label: "Strictly Private (Only viewable by you)", value: "private" },
  { label: "Recruiter-Only Access (Shareable link enabled)", value: "recruiters" },
  { label: "Public Portfolio (Showcase scores publicly)", value: "public" },
];

export function PrivacyForm() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Form Fields
  const [sensitivity, setSensitivity] = useState("medium");
  const [retention, setRetention] = useState("30");
  const [privacyLevel, setPrivacyLevel] = useState("private");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1000);
  };

  const handleExportData = () => {
    const data = {
      user: "Alex",
      email: "alex@email.com",
      timezone: "GMT+5:30",
      interviewsCompleted: 5,
      preferences: { sensitivity, retention, privacyLevel },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "intervai_profile_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
        <div className="border-b border-border/60 pb-4">
          <h3 className="text-[18px] font-semibold leading-7 text-text-primary">Privacy & Security</h3>
          <p className="text-sm font-medium text-text-secondary mt-0.5">
            Manage proctoring parameters and personal data retention.
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Proctoring Sensitivity */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-dark">Proctoring Sensitivity</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                      <ShieldAlert className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                      {sensitivityOptions.find((opt) => opt.value === sensitivity)?.label || sensitivity}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                  <DropdownMenuRadioGroup value={sensitivity} onValueChange={setSensitivity}>
                    {sensitivityOptions.map((opt) => (
                      <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                        {opt.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Audio Recording Retention */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-dark">Audio Transcription Retention</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                      <Clock3 className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                      {retentionOptions.find((opt) => opt.value === retention)?.label || retention}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                  <DropdownMenuRadioGroup value={retention} onValueChange={setRetention}>
                    {retentionOptions.map((opt) => (
                      <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                        {opt.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Evaluation Analytics Privacy */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Evaluation Analytics Privacy</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer hover:bg-surface-secondary select-none">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                    <Lock className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {privacyOptions.find((opt) => opt.value === privacyLevel)?.label || privacyLevel}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuRadioGroup value={privacyLevel} onValueChange={setPrivacyLevel}>
                  {privacyOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Action Tools (Export, Delete) */}
          <div className="pt-4 border-t border-border/50 space-y-4">
            <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Data Controls & Actions
            </h4>
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Export Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleExportData}
                className="h-11 rounded-lg border-border font-semibold flex items-center justify-center gap-2 hover:bg-surface-secondary flex-1"
              >
                <Download className="h-4 w-4" />
                Download Personal Data (JSON)
              </Button>

              {/* Delete Account button */}
              <Button
                type="button"
                onClick={() => setShowDeleteDialog(true)}
                className="h-11 rounded-lg bg-error hover:bg-error-hover text-error-foreground font-semibold flex items-center justify-center gap-2 flex-1"
              >
                <Trash2 className="h-4 w-4" />
                Delete Profile Account
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Save */}
        <div className="border-t border-border/50 pt-5 flex items-center justify-between">
          <div>
            {saveStatus === "saved" && (
              <div className="flex items-center gap-1.5 text-success text-sm font-semibold animate-in fade-in duration-300">
                <Check className="h-4 w-4" />
                Privacy parameters saved successfully!
              </div>
            )}
          </div>
          <Button
            type="submit"
            disabled={saveStatus === "saving"}
            className="h-11 bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-6 rounded-lg"
          >
            {saveStatus === "saving" ? "Saving..." : "Save Privacy Settings"}
          </Button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-[440px] border-error/20 bg-surface shadow-2xl">
          <DialogHeader className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error-light text-error">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <DialogTitle className="text-[18px] font-bold text-text-primary">
              Delete Profile Account?
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-text-secondary leading-relaxed">
              Are you sure you want to delete your profile account? This operation is irreversible. All of your mock interview records, scores, and evaluations will be purged forever.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              className="w-full h-11 font-semibold"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-full h-11 bg-error hover:bg-error-hover text-error-foreground font-semibold"
              onClick={() => {
                setShowDeleteDialog(false);
                alert("Mock Delete Action Triggered!");
              }}
            >
              Confirm Account Deletion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
