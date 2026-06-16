"use client";

import Link from "next/link";

interface BrandLogoProps {
  href?: string;
  showSubtitle?: boolean;
  subtitle?: string;
  className?: string;
}

export const BrandLogo = ({
  href = "/",
  showSubtitle = false,
  subtitle = "AI Mock Interview",
  className = "",
}: BrandLogoProps) => {
  return (
    <Link href={href} className={`inline-flex flex-col ${className}`.trim()}>
      <span className="flex h-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-accent to-accent-dark px-3 py-1 font-bold text-accent-foreground shadow-sm">
        <span className="text-sm font-extrabold tracking-wider">INTERV</span>
        <span className="ml-1 rounded bg-surface px-1 py-0.5 text-[10px] font-black text-accent">
          AI
        </span>
      </span>
      {showSubtitle && (
        <span className="mt-1 text-left text-xs font-medium text-text-secondary">
          {subtitle}
        </span>
      )}
    </Link>
  );
};
