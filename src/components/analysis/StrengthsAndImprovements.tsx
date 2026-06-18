"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

interface StrengthsAndImprovementsProps {
  strengths: string[];
  improvements: string[];
}

export function StrengthsAndImprovements({
  strengths,
  improvements,
}: StrengthsAndImprovementsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Strengths Card */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
          Strengths
        </h3>
        <ul className="space-y-3.5">
          {strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success mt-0.5" />
              <span className="text-sm font-medium text-text-dark leading-relaxed">
                {strength}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Areas to Improve Card */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
          Areas to Improve
        </h3>
        <ul className="space-y-3.5">
          {improvements.map((improvement, index) => (
            <li key={index} className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-error mt-0.5" />
              <span className="text-sm font-medium text-text-dark leading-relaxed">
                {improvement}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
