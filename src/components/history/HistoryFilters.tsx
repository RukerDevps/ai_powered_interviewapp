import { BriefcaseBusiness, CalendarDays, ChevronDown, Code2, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const HistoryFilters = () => {
  return (
    <Card className="p-4 shadow-sm">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <Input
            type="search"
            placeholder="Search interviews..."
            className="h-12 rounded-xl border-border bg-surface pl-11 text-sm text-text-primary placeholder:text-text-muted"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Button
            type="button"
            variant="outline"
            className="h-12 justify-between rounded-xl border-border px-4 text-sm font-medium text-text-primary shadow-none hover:bg-surface-secondary hover:text-text-primary"
          >
            <span className="flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-text-secondary" />
              All Roles
            </span>
            <ChevronDown className="h-4 w-4 text-text-secondary" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 justify-between rounded-xl border-border px-4 text-sm font-medium text-text-primary shadow-none hover:bg-surface-secondary hover:text-text-primary"
          >
            <span className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-text-secondary" />
              All Types
            </span>
            <ChevronDown className="h-4 w-4 text-text-secondary" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 justify-between rounded-xl border-border px-4 text-sm font-medium text-text-primary shadow-none hover:bg-surface-secondary hover:text-text-primary"
          >
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-text-secondary" />
              All Time
            </span>
            <SlidersHorizontal className="h-4 w-4 text-text-secondary" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
