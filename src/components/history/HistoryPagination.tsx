import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface HistoryPaginationProps {
  start: number;
  end: number;
  total: number;
  currentPage: number;
  totalPages: number;
}

export const HistoryPagination = ({
  start,
  end,
  total,
  currentPage,
  totalPages,
}: HistoryPaginationProps) => {
  return (
    <div className="flex flex-col gap-4 px-1 pt-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-text-secondary">
        Showing {start} to {end} of {total} interviews
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-md border-border bg-surface text-text-secondary shadow-none hover:bg-surface-secondary hover:text-text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Button
            key={page}
            type="button"
            variant="outline"
            className={`h-10 min-w-10 rounded-md px-3 shadow-none ${
              page === currentPage
                ? "border-accent bg-accent-muted text-accent hover:bg-accent-muted hover:text-accent"
                : "border-border bg-surface text-text-primary hover:bg-surface-secondary hover:text-text-primary"
            }`}
          >
            {page}
          </Button>
        ))}

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-md border-border bg-surface text-text-secondary shadow-none hover:bg-surface-secondary hover:text-text-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
