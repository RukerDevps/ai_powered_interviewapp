"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut, Menu, Settings, Sparkles, User } from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { signOutAction } from "@/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const displayName = user?.name ?? user?.email ?? "Guest";
  const avatarInitial = displayName.charAt(0).toUpperCase();

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-text-primary shadow-sm transition-colors hover:bg-surface-secondary sm:px-4 sm:py-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                {isPending ? (
                  <Sparkles className="h-4 w-4" />
                ) : user?.image ? (
                  <Image
                    src={user.image}
                    alt={displayName}
                    width={36}
                    height={36}
                    unoptimized
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold">{avatarInitial}</span>
                )}
              </span>
              <span className="hidden sm:inline">
                {isPending ? "Loading..." : `Hello, ${displayName.split(" ")[0]}`}
              </span>
              <ChevronDown className="h-4 w-4 text-text-secondary" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-semibold text-text-primary">{displayName}</p>
              {user?.email ? (
                <p className="text-xs text-text-secondary">{user.email}</p>
              ) : null}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOutAction()}
              destructive
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
