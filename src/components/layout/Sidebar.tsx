"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Clock3,
  X,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "./BrandLogo";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: true },
  { label: "History", href: "/history", icon: Clock3, active: false },
  { label: "Analytics", href: "/analytics", icon: BarChart3, active: false },
  { label: "Settings", href: "/settings", icon: Settings, active: false },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ mobileOpen = false, onClose }: SidebarProps) => {
  return (
    <>
      <aside className="hidden h-dvh w-[280px] shrink-0 overflow-hidden border-r border-border bg-surface lg:flex lg:flex-col">
        <div className="border-b border-border px-8 py-4">
          <BrandLogo showSubtitle />
        </div>

        <nav className="flex-1 space-y-5 overflow-hidden px-6 py-7">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-4 text-sm font-semibold transition-colors ${
                  item.active
                    ? "bg-accent-muted text-accent"
                    : "text-text-dark hover:bg-accent-lighter hover:text-accent"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-6 pb-8">
          <div className="rounded-2xl border border-border bg-accent-muted p-6 text-center shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-surface text-accent shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-4 text-xs font-medium text-text-secondary">Powered by</p>
            <p className="mt-1 text-lg font-bold text-accent">Kimi 2.6 AI</p>
            <p className="mt-5 text-sm leading-6 text-text-secondary">
              Advanced AI for smarter interviews.
            </p>
            <Link
              href="/resources"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover"
            >
              Learn More
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-overlay/40"
              aria-label="Close sidebar overlay"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 flex w-[86vw] max-w-[320px] flex-col overflow-hidden border-r border-border bg-surface shadow-[0_30px_80px_rgba(16,24,40,0.18)]"
              initial={{ x: -340, opacity: 0.98 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -340, opacity: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.9 }}
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <BrandLogo showSubtitle />
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary shadow-sm transition-colors hover:bg-surface-secondary hover:text-text-primary"
                  aria-label="Close sidebar menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-4 rounded-xl px-4 py-4 text-sm font-semibold transition-colors ${
                        item.active
                          ? "bg-accent-muted text-accent"
                          : "text-text-dark hover:bg-accent-lighter hover:text-accent"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="px-4 pb-5">
                <div className="rounded-2xl border border-border bg-accent-muted p-5 text-center shadow-sm">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-surface text-accent shadow-sm">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xs font-medium text-text-secondary">Powered by</p>
                  <p className="mt-1 text-lg font-bold text-accent">Kimi 2.6 AI</p>
                  <p className="mt-5 text-sm leading-6 text-text-secondary">
                    Advanced AI for smarter interviews.
                  </p>
                  <Link
                    href="/resources"
                    onClick={onClose}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover"
                  >
                    Learn More
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
