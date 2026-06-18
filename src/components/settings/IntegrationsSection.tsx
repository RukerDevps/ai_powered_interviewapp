"use client";

import { useState } from "react";
import { Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Custom SVG Brand Icons
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SlackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="3" height="8" x="13" y="2" rx="1.5" />
    <path d="M19 8.5c0 .8-.7 1.5-1.5 1.5H16V7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5z" />
    <rect width="8" height="3" x="14" y="13" rx="1.5" />
    <path d="M15.5 19c-.8 0-1.5-.7-1.5-1.5V16h1.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" />
    <rect width="3" height="8" x="8" y="14" rx="1.5" />
    <path d="M5 15.5c0-.8.7-1.5 1.5-1.5H8v1.5c0 .8-.7 1.5-1.5 1.5S5 16.3 5 15.5z" />
    <rect width="8" height="3" x="2" y="8" rx="1.5" />
    <path d="M8.5 5c.8 0 1.5.7 1.5 1.5V8H8.5C7.7 8 7 7.3 7 6.5S7.7 5 8.5 5z" />
  </svg>
);

interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected";
  user?: string;
  icon: any;
}

export function IntegrationsSection() {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([
    {
      id: "github",
      name: "GitHub Developer profile",
      description: "Link public repositories to enhance code context within interview setups.",
      status: "connected",
      user: "@alexdev",
      icon: GithubIcon,
    },
    {
      id: "linkedin",
      name: "LinkedIn Professional Graph",
      description: "Auto-sync resume experience, job title, and achievements into Kimi profiles.",
      status: "disconnected",
      icon: LinkedinIcon,
    },
    {
      id: "google-cal",
      name: "Google Calendar Scheduler",
      description: "Schedule mocks automatically and set calendar triggers for reminders.",
      status: "connected",
      user: "alex@email.com",
      icon: Calendar,
    },
    {
      id: "slack",
      name: "Slack Team Workspace",
      description: "Broadcast completed interview grades and reports to Slack channels.",
      status: "disconnected",
      icon: SlackIcon,
    },
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isConnected = item.status === "connected";
          return {
            ...item,
            status: isConnected ? "disconnected" : "connected",
            user: isConnected ? undefined : id === "linkedin" ? "@alex-linkedin" : "@alex-slack",
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-4">
        <h3 className="text-[18px] font-semibold leading-7 text-text-primary">Connected Services</h3>
        <p className="text-sm font-medium text-text-secondary mt-0.5">
          Integrate IntervAI with external platforms and tools.
        </p>
      </div>

      <div className="space-y-4">
        {integrations.map((item) => {
          const Icon = item.icon;
          const isConnected = item.status === "connected";

          return (
            <div
              key={item.id}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-border/80"
            >
              {/* Left Details */}
              <div className="flex gap-4 items-start">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                  isConnected ? "bg-accent-lighter text-accent border-accent/20" : "bg-surface-secondary text-text-muted border-border"
                }`}>
                  <Icon className="h-5.5 w-5.5" />
                </span>

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-text-primary">{item.name}</span>
                    {isConnected && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-success-lightest px-2 py-0.5 text-[10px] font-semibold text-success border border-success/15 uppercase tracking-wide">
                        <CheckCircle2 className="h-3 w-3" />
                        Connected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
                  {isConnected && item.user && (
                    <span className="block text-[11px] text-accent font-semibold mt-1.5 bg-accent-muted px-2 py-0.5 rounded w-fit">
                      User Account: {item.user}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Button
                type="button"
                variant={isConnected ? "outline" : "default"}
                onClick={() => toggleConnection(item.id)}
                className={`h-10 px-5 rounded-lg font-bold shrink-0 text-sm ${
                  isConnected
                    ? "border-error/25 text-error hover:bg-error-light/10 hover:text-error"
                    : "bg-accent hover:bg-accent-hover text-accent-foreground"
                }`}
              >
                {isConnected ? "Disconnect" : "Connect Account"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
