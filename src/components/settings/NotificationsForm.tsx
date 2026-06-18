"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationsForm() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Form Fields
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [recommendations, setRecommendations] = useState(true);
  const [violationAlerts, setViolationAlerts] = useState(false);
  const [billingAlerts, setBillingAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="border-b border-border/60 pb-4">
        <h3 className="text-[18px] font-semibold leading-7 text-text-primary">Notification Preferences</h3>
        <p className="text-sm font-medium text-text-secondary mt-0.5">
          Choose how and when you want to receive alerts.
        </p>
      </div>

      <div className="space-y-4">
        {/* Weekly Digest */}
        <label className="flex items-start gap-3.5 rounded-xl border border-border bg-surface-secondary/40 p-4 cursor-pointer hover:bg-surface-secondary/70 transition-colors">
          <input
            type="checkbox"
            checked={weeklyDigest}
            onChange={(e) => setWeeklyDigest(e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 rounded border-border text-accent focus:ring-accent accent-accent"
          />
          <div className="space-y-0.5">
            <span className="text-sm font-semibold text-text-primary">Weekly Performance Summary</span>
            <span className="block text-xs text-text-secondary leading-relaxed">
              Receive a detailed performance and progress analysis email every Monday morning.
            </span>
          </div>
        </label>

        {/* Recommendations */}
        <label className="flex items-start gap-3.5 rounded-xl border border-border bg-surface-secondary/40 p-4 cursor-pointer hover:bg-surface-secondary/70 transition-colors">
          <input
            type="checkbox"
            checked={recommendations}
            onChange={(e) => setRecommendations(e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 rounded border-border text-accent focus:ring-accent accent-accent"
          />
          <div className="space-y-0.5">
            <span className="text-sm font-semibold text-text-primary">Interview & Skill Recommendations</span>
            <span className="block text-xs text-text-secondary leading-relaxed">
              Get customized questions and resource tips based on your recent interview evaluations.
            </span>
          </div>
        </label>

        {/* Proctoring security alerts */}
        <label className="flex items-start gap-3.5 rounded-xl border border-border bg-surface-secondary/40 p-4 cursor-pointer hover:bg-surface-secondary/70 transition-colors">
          <input
            type="checkbox"
            checked={violationAlerts}
            onChange={(e) => setViolationAlerts(e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 rounded border-border text-accent focus:ring-accent accent-accent"
          />
          <div className="space-y-0.5">
            <span className="text-sm font-semibold text-text-primary">Proctoring Security Violations</span>
            <span className="block text-xs text-text-secondary leading-relaxed">
              Receive immediately flagged warnings if a fullscreen lock is breached, or screenshot attempts occur.
            </span>
          </div>
        </label>

        {/* Billing Alerts */}
        <label className="flex items-start gap-3.5 rounded-xl border border-border bg-surface-secondary/40 p-4 cursor-pointer hover:bg-surface-secondary/70 transition-colors">
          <input
            type="checkbox"
            checked={billingAlerts}
            onChange={(e) => setBillingAlerts(e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 rounded border-border text-accent focus:ring-accent accent-accent"
          />
          <div className="space-y-0.5">
            <span className="text-sm font-semibold text-text-primary">Account & Billing Transactions</span>
            <span className="block text-xs text-text-secondary leading-relaxed">
              Receive receipts, credit additions, billing alerts, or account plan modification updates.
            </span>
          </div>
        </label>
      </div>

      {/* Footer Save */}
      <div className="border-t border-border/50 pt-5 flex items-center justify-between">
        <div>
          {saveStatus === "saved" && (
            <div className="flex items-center gap-1.5 text-success text-sm font-semibold animate-in fade-in duration-300">
              <Check className="h-4 w-4" />
              Notifications updated successfully!
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
