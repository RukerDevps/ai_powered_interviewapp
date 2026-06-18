"use client";

import { useState } from "react";
import { Edit2, Check, Globe, Clock3, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languageOptions = [
  { label: "English", value: "english" },
  { label: "Spanish", value: "spanish" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
];

const timezoneOptions = [
  { label: "(GMT+05:30) Asia/Kolkata", value: "kolkata" },
  { label: "GMT/UTC (London)", value: "gmt" },
  { label: "EST (New York)", value: "est" },
  { label: "PST (San Francisco)", value: "pst" },
];

export function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Form Fields
  const [fullName, setFullName] = useState("Alex");
  const [email, setEmail] = useState("alex@email.com");
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("kolkata");
  const [bio, setBio] = useState(
    "AI enthusiast and developer focused on building intelligent products."
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setIsEditing(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1200);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
      {/* Header section with Edit Profile button */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="space-y-0.5">
          <h3 className="text-[18px] font-semibold leading-7 text-text-primary">Profile Information</h3>
          <p className="text-sm font-medium text-text-secondary">
            Update your personal details and profile.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="h-9 rounded-lg border-accent/20 text-accent font-semibold flex items-center gap-1.5 hover:bg-accent-lighter/50"
        >
          <Edit2 className="h-3.5 w-3.5" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Profile Form Grid */}
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Full Name</label>
            <Input
              type="text"
              value={fullName}
              disabled={!isEditing}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 rounded-xl bg-surface border-border focus:border-accent disabled:bg-surface-secondary/50 disabled:text-text-secondary disabled:border-border/60 font-semibold"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Email Address</label>
            <Input
              type="email"
              value={email}
              disabled={!isEditing}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-surface border-border focus:border-accent disabled:bg-surface-secondary/50 disabled:text-text-secondary disabled:border-border/60 font-semibold"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Member Since (Read-only) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Member Since</label>
            <Input
              type="text"
              value="May 2025"
              disabled
              className="h-12 rounded-xl bg-surface-secondary/50 border-border/60 text-text-secondary font-semibold cursor-not-allowed"
            />
          </div>

          {/* Account Type (Read-only) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Account Type</label>
            <Input
              type="text"
              value="Free Plan"
              disabled
              className="h-12 rounded-xl bg-surface-secondary/50 border-border/60 text-text-secondary font-semibold cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Preferred Language */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Preferred Language</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={!isEditing}>
                <div className={cn(
                  "flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer select-none",
                  isEditing ? "hover:bg-surface-secondary" : "opacity-60 cursor-not-allowed bg-surface-secondary/50"
                )}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                    <Globe className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {languageOptions.find(opt => opt.value === language)?.label || language}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                  {languageOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Timezone */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-dark">Timezone</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={!isEditing}>
                <div className={cn(
                  "flex min-h-12 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-left shadow-sm transition-colors cursor-pointer select-none",
                  isEditing ? "hover:bg-surface-secondary" : "opacity-60 cursor-not-allowed bg-surface-secondary/50"
                )}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-lighter text-accent">
                    <Clock3 className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
                    {timezoneOptions.find(opt => opt.value === timezone)?.label || timezone}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-secondary" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuRadioGroup value={timezone} onValueChange={setTimezone}>
                  {timezoneOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value} className="font-semibold text-text-primary">
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Bio Textarea */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-dark">Bio</label>
          <Textarea
            value={bio}
            disabled={!isEditing}
            onChange={(e) => setBio(e.target.value)}
            className="min-h-[120px] rounded-xl resize-none bg-surface border-border focus:border-accent disabled:bg-surface-secondary/50 disabled:text-text-secondary disabled:border-border/60 font-semibold leading-relaxed"
          />
        </div>
      </div>

      {/* Footer Submit Buttons and Status */}
      <div className="border-t border-border/50 pt-5 flex items-center justify-between">
        <div>
          {saveStatus === "saved" && (
            <div className="flex items-center gap-1.5 text-success text-sm font-semibold animate-in fade-in duration-300">
              <Check className="h-4 w-4" />
              Settings saved successfully!
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={!isEditing || saveStatus === "saving"}
          className="h-11 bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-6 rounded-lg disabled:opacity-50"
        >
          {saveStatus === "saving" ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
