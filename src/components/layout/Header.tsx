import { ChevronDown, Menu, Sparkles } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-surface px-4 sm:px-6 lg:h-[92px] lg:justify-end lg:px-8">
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-text-primary shadow-sm transition-colors hover:bg-surface-secondary"
          aria-label="Open sidebar menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-lg font-bold text-text-primary">IntervAI</p>
          <p className="text-xs text-text-secondary">AI Mock Interview</p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">


        <button
          type="button"
          className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-text-primary shadow-sm transition-colors hover:bg-surface-secondary sm:px-4 sm:py-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">Hello, Alex</span>
          <ChevronDown className="h-4 w-4 text-text-secondary" />
        </button>
      </div>
    </header>
  );
};
