"use client";

import { useState } from "react";
import {
  User,
  Sliders,
  Sparkles,
  Bell,
  Shield,
  Puzzle,
  CreditCard,
  Palette,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/button";

// Settings Forms
import { ProfileForm } from "@/components/settings/ProfileForm";
import { PreferencesForm } from "@/components/settings/PreferencesForm";
import { AIConfigForm } from "@/components/settings/AIConfigForm";
import { NotificationsForm } from "@/components/settings/NotificationsForm";
import { PrivacyForm } from "@/components/settings/PrivacyForm";
import { IntegrationsSection } from "@/components/settings/IntegrationsSection";
import { BillingSection } from "@/components/settings/BillingSection";
import { AppearanceForm } from "@/components/settings/AppearanceForm";
import { signOutAction } from "@/actions/auth";

type TabId =
  | "profile"
  | "preferences"
  | "ai"
  | "notifications"
  | "privacy"
  | "integrations"
  | "billing"
  | "appearance";

interface SettingsTab {
  id: TabId;
  label: string;
  description: string;
  icon: LucideIcon;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const tabs: SettingsTab[] = [
    {
      id: "profile",
      label: "Profile",
      description: "Personal information",
      icon: User,
    },
    {
      id: "preferences",
      label: "Preferences",
      description: "Interview preferences",
      icon: Sliders,
    },
    {
      id: "ai",
      label: "AI Configuration",
      description: "AI model and behavior",
      icon: Sparkles,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Email and alerts",
      icon: Bell,
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      description: "Privacy and data settings",
      icon: Shield,
    },
    {
      id: "integrations",
      label: "Integrations",
      description: "Connected services",
      icon: Puzzle,
    },
    {
      id: "billing",
      label: "Billing",
      description: "Subscription and billing",
      icon: CreditCard,
    },
    {
      id: "appearance",
      label: "Appearance",
      description: "Theme and display",
      icon: Palette,
    },
  ];

  const handleLogout = () => {
    void signOutAction();
  };

  return (
    <DashboardShell>
      <div className="mx-auto w-full max-w-[1320px] space-y-6">
        {/* Title Header with Red LogOut button */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 pb-5">
          <div className="space-y-2">
            <h1 className="text-[28px] font-bold leading-9 text-text-primary">
              Settings
            </h1>
            <p className="text-base text-text-secondary">
              Manage your account, preferences and interview experience.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            className="h-10 border-error/25 text-error font-bold rounded-lg px-4 flex items-center gap-1.5 hover:bg-error-light/10 hover:text-error self-start sm:self-center"
          >
            Log Out
            <LogOut className="h-4.5 w-4.5" />
          </Button>
        </div>

        {/* Tab Selection & Content Panels Container */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
          {/* Left Tab selector rail */}
          <aside className="rounded-2xl border border-border bg-surface p-2.5 shadow-sm space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left flex items-start gap-3.5 rounded-xl px-4 py-3 transition-colors ${
                    isActive
                      ? "bg-accent-muted/50 text-accent"
                      : "text-text-secondary hover:bg-surface-secondary/70 hover:text-text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className={`block text-sm font-bold ${isActive ? "text-accent" : "text-text-primary"}`}>
                      {tab.label}
                    </span>
                    <span className="block text-xs text-text-secondary mt-0.5 truncate">
                      {tab.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </aside>

          {/* Right Content View Box */}
          <main className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
            {activeTab === "profile" && <ProfileForm />}
            {activeTab === "preferences" && <PreferencesForm />}
            {activeTab === "ai" && <AIConfigForm />}
            {activeTab === "notifications" && <NotificationsForm />}
            {activeTab === "privacy" && <PrivacyForm />}
            {activeTab === "integrations" && <IntegrationsSection />}
            {activeTab === "billing" && <BillingSection />}
            {activeTab === "appearance" && <AppearanceForm />}
          </main>
        </div>

        {/* Version Footer */}
        <div className="text-center sm:text-left text-xs text-text-secondary font-medium pt-4">
          Version 1.0.0
        </div>
      </div>
    </DashboardShell>
  );
}
