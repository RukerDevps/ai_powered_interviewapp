"use client";
/* eslint-disable react-hooks/incompatible-library */

import Link from "next/link";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  ChevronDown,
  Code2,
  Database,
  FileCode2,
  Filter,
  MessageSquareMore,
  MoreVertical,
  PenTool,
  Search,
  Sigma,
  SquareCode,
  Trash2,
} from "lucide-react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type HistoryInterviewIcon =
  | "brain"
  | "code"
  | "database"
  | "file-code"
  | "message"
  | "pen-tool"
  | "sigma"
  | "square-code";

export interface HistoryInterviewRow {
  id: string;
  name: string;
  questions: string;
  role: string;
  type: "Technical" | "Behavioral";
  date: string;
  time: string;
  duration: string;
  score?: number;
  status: "Completed" | "Incomplete" | "In Progress";
  action: "View Details" | "Continue";
  href: string;
  icon: HistoryInterviewIcon;
  iconTone: "accent" | "success" | "warning" | "info" | "behavioral";
}

interface HistoryTableProps {
  interviews: HistoryInterviewRow[];
}

const roleOptions = [
  "All Roles",
  "Frontend Developer",
  "React Developer",
  "Backend Developer",
  "Software Engineer",
  "Full Stack Developer",
] as const;

const typeOptions = ["All Types", "Technical", "Behavioral"] as const;

const timeOptions = [
  { label: "All Time", value: "all" },
  { label: "Last 30 Days", value: "30" },
  { label: "Last 90 Days", value: "90" },
  { label: "Last 6 Months", value: "180" },
] as const;

const iconToneClasses: Record<HistoryInterviewRow["iconTone"], string> = {
  accent: "bg-accent-light text-accent",
  success: "bg-success-lightest text-success-foreground",
  warning: "bg-warning-light text-warning-foreground",
  info: "bg-info-lightest text-info-foreground",
  behavioral: "bg-behavioral-light text-behavioral-foreground",
};

const iconMap: Record<HistoryInterviewIcon, LucideIcon> = {
  brain: BrainCircuit,
  code: Code2,
  database: Database,
  "file-code": FileCode2,
  message: MessageSquareMore,
  "pen-tool": PenTool,
  sigma: Sigma,
  "square-code": SquareCode,
};

const typeClasses: Record<HistoryInterviewRow["type"], string> = {
  Technical: "bg-technical-light text-technical-foreground",
  Behavioral: "bg-behavioral-light text-behavioral-foreground",
};

const statusClasses: Record<HistoryInterviewRow["status"], string> = {
  Completed: "bg-success-lightest text-success-foreground",
  Incomplete: "bg-info-lightest text-info-foreground",
  "In Progress": "bg-accent-light text-accent",
};

const globalFilterFn: FilterFn<HistoryInterviewRow> = (row, _columnId, filterValue) => {
  const search = String(filterValue ?? "").trim().toLowerCase();

  if (!search) {
    return true;
  }

  const haystack = [
    row.original.name,
    row.original.questions,
    row.original.role,
    row.original.type,
    row.original.date,
    row.original.time,
    row.original.duration,
    row.original.status,
    row.original.score?.toString() ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(search);
};

const exactMatchFilter: FilterFn<HistoryInterviewRow> = (row, columnId, filterValue) => {
  const selected = String(filterValue ?? "").trim().toLowerCase();

  if (!selected || selected === "all") {
    return true;
  }

  return String(row.getValue(columnId)).toLowerCase() === selected;
};

const dateRangeFilter: FilterFn<HistoryInterviewRow> = (row, columnId, filterValue) => {
  const selected = String(filterValue ?? "all");

  if (selected === "all") {
    return true;
  }

  const dayCount = Number(selected);

  if (Number.isNaN(dayCount)) {
    return true;
  }

  const rowDate = new Date(String(row.getValue(columnId)));
  const threshold = new Date();

  threshold.setDate(threshold.getDate() - dayCount);

  return rowDate >= threshold;
};

const getScoreClasses = (score?: number) => {
  if (typeof score !== "number") {
    return "bg-surface-secondary text-text-secondary";
  }

  if (score >= 70) {
    return "bg-success-lightest text-success-foreground";
  }

  if (score >= 50) {
    return "bg-warning-light text-warning-foreground";
  }

  return "bg-error-light text-error";
};

export const HistoryTable = ({ interviews }: HistoryTableProps) => {
  const [rows, setRows] = useState(interviews);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Delete ${name}? This action cannot be undone.`)) {
      return;
    }

    setRows((current) => current.filter((row) => row.id !== id));
  };

  const columns: ColumnDef<HistoryInterviewRow>[] = [
    {
      accessorKey: "name",
      header: "Interview",
      cell: ({ row }) => {
        const interview = row.original;
        const Icon = iconMap[interview.icon];

        return (
          <div className="flex items-center gap-4">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconToneClasses[interview.iconTone]}`}>
              <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">{interview.name}</p>
              <p className="mt-1 text-sm text-text-secondary">{interview.questions}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      filterFn: exactMatchFilter,
      cell: ({ row }) => <span className="block max-w-[140px] text-sm font-medium text-text-primary">{row.original.role}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
      filterFn: exactMatchFilter,
      cell: ({ row }) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${typeClasses[row.original.type]}`}>
          {row.original.type}
        </span>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      filterFn: dateRangeFilter,
      cell: ({ row }) => (
        <div>
          <div className="text-sm text-text-primary">{row.original.date}</div>
          <div className="mt-1 text-sm text-text-secondary">{row.original.time}</div>
        </div>
      ),
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => <span className="text-sm text-text-primary">{row.original.duration}</span>,
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => (
        <span className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${getScoreClasses(row.original.score)}`}>
          {typeof row.original.score === "number" ? `${row.original.score}/100` : "—"}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      filterFn: exactMatchFilter,
      cell: ({ row }) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClasses[row.original.status]}`}>
          {row.original.status}
        </span>
      ),
    },
    {
      id: "action",
      header: () => <span className="block text-right">Action</span>,
      cell: ({ row }) => {
        const interview = row.original;

        return (
          <div className="flex items-center justify-end gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-10 rounded-md border-accent/40 px-4 text-sm font-medium text-accent shadow-none hover:border-accent hover:bg-accent-muted hover:text-accent"
            >
              <Link href={interview.href}>{interview.action}</Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-text-primary transition-colors hover:bg-surface-secondary"
                  aria-label={`Open actions for ${interview.name}`}
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive onClick={() => handleDelete(interview.id, interview.name)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      globalFilter,
      columnFilters,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn,
  });

  const roleFilterValue = String(table.getColumn("role")?.getFilterValue() ?? "all");
  const typeFilterValue = String(table.getColumn("type")?.getFilterValue() ?? "all");
  const timeFilterValue = String(table.getColumn("date")?.getFilterValue() ?? "all");
  const totalFilteredRows = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const start = totalFilteredRows === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min(totalFilteredRows, (pageIndex + 1) * pageSize);

  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="border-b border-border p-4">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <Input
              type="search"
              value={globalFilter}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              placeholder="Search interviews..."
              className="h-12 rounded-xl border-border bg-surface pl-11 text-sm text-text-primary placeholder:text-text-muted"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 min-w-[170px] justify-between rounded-xl border-border px-4 text-sm font-medium text-text-primary shadow-none hover:bg-surface-secondary hover:text-text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-text-secondary" />
                    {roleFilterValue === "all" ? "All Roles" : roleFilterValue}
                  </span>
                  <ChevronDown className="h-4 w-4 text-text-secondary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {roleOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => table.getColumn("role")?.setFilterValue(option === "All Roles" ? "all" : option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 min-w-[170px] justify-between rounded-xl border-border px-4 text-sm font-medium text-text-primary shadow-none hover:bg-surface-secondary hover:text-text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-text-secondary" />
                    {typeFilterValue === "all" ? "All Types" : typeFilterValue}
                  </span>
                  <ChevronDown className="h-4 w-4 text-text-secondary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {typeOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => table.getColumn("type")?.setFilterValue(option === "All Types" ? "all" : option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 min-w-[170px] justify-between rounded-xl border-border px-4 text-sm font-medium text-text-primary shadow-none hover:bg-surface-secondary hover:text-text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-text-secondary" />
                    {timeOptions.find((option) => option.value === timeFilterValue)?.label ?? "All Time"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-text-secondary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Time</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {timeOptions.map((option) => (
                  <DropdownMenuItem key={option.value} onClick={() => table.getColumn("date")?.setFilterValue(option.value)}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[1040px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={header.column.id === "action" ? "text-right" : ""}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-text-secondary">
                  No interviews match your search or filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="border-t border-border px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-secondary">
            Showing {start} to {end} of {totalFilteredRows} interviews
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-md border-border bg-surface text-text-secondary shadow-none hover:bg-surface-secondary hover:text-text-primary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Previous page</span>
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>

            {Array.from({ length: table.getPageCount() }, (_, index) => index + 1).map((page) => (
              <Button
                key={page}
                type="button"
                variant="outline"
                className={`h-10 min-w-10 rounded-md px-3 shadow-none ${
                  page === pageIndex + 1
                    ? "border-accent bg-accent-muted text-accent hover:bg-accent-muted hover:text-accent"
                    : "border-border bg-surface text-text-primary hover:bg-surface-secondary hover:text-text-primary"
                }`}
                onClick={() => table.setPageIndex(page - 1)}
              >
                {page}
              </Button>
            ))}

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-md border-border bg-surface text-text-secondary shadow-none hover:bg-surface-secondary hover:text-text-primary"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Next page</span>
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
