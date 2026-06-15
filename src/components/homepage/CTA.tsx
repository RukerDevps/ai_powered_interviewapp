"use client";

import { Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-12 md:py-16 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-r from-accent to-accent-dark px-6 py-10 shadow-xl sm:px-12 sm:py-16 md:px-16 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
            {/* CTA text & bot icon */}
            <div className="space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-accent-foreground">
                  Ready to Ace Your Next Interview?
                </h3>
              </div>
              <p className="text-sm sm:text-base text-accent-light max-w-xl">
                Join thousands of successful candidates who improved their communication, confidence, and tech depth with IntervAI.
              </p>
            </div>

            {/* CTA Action button */}
            <div className="shrink-0 w-full sm:w-auto text-center">
              <a
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-surface px-6 py-3.5 text-sm sm:text-base font-bold text-accent shadow-md hover:bg-surface-secondary transition-all"
              >
                Get Started for Free &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
