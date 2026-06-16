import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Clock3,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: true },
  { label: "History", href: "/history", icon: Clock3, active: false },
  { label: "Analytics", href: "/analytics", icon: BarChart3, active: false },
  { label: "Settings", href: "/settings", icon: Settings, active: false },
];

export const Sidebar = () => {
  return (
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
  );
};
