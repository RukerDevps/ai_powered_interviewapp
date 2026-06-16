"use client";

import Link from "next/link";
import { CheckCircle2, Play, Calendar, Check } from "lucide-react";

export const WhyIntervAI = () => {
  const benefits = [
    "Built with advanced AI (Kimi 2.6)",
    "Real interview experience, anytime, anywhere",
    "Improve communication, confidence & clarity",
    "Designed to help you crack your dream job",
  ];

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column - Benefits & Value Prop */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Why IntervAI?</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight leading-tight">
              Smarter Practice, Better Results
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Ditch the stress of mock practice with friends. IntervAI creates a realistic interview environment tailored specifically to your experience level and targets.
            </p>

            {/* Check list */}
            <ul className="space-y-4 pt-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  <span className="text-sm font-semibold text-text-dark">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-lg hover:bg-accent-hover transition-all"
              >
                Start Free Interview &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column - Dashboard Preview Graphic */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[540px] bg-surface-secondary border border-border rounded-2xl shadow-xl p-4 overflow-hidden">
              {/* Mock Dashboard Top Header */}
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-extrabold text-text-primary">Welcome back, Alex! 👋</h3>
                  <p className="text-[10px] text-text-muted mt-0.5">Here is your interview performance summary.</p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-[11px] font-bold text-accent-foreground rounded-md shadow-sm">
                  + Start New Interview
                </button>
              </div>

              {/* Mock Dashboard Widgets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Total Interviews", val: "12" },
                  { label: "Average Score", val: "72/100" },
                  { label: "Questions Answered", val: "96" },
                  { label: "Time Practiced", val: "6h 30m" },
                ].map((stat, i) => (
                  <div key={i} className="bg-surface border border-border p-2.5 rounded-xl text-center">
                    <div className="text-[9px] text-text-secondary truncate">{stat.label}</div>
                    <div className="text-sm font-bold text-text-primary mt-1">{stat.val}</div>
                  </div>
                ))}
              </div>

              {/* Mock Dashboard Recent Interviews list */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Recent Interviews</div>
                <div className="space-y-2">
                  {[
                    { role: "Frontend Developer", date: "May 18, 2025", score: "78/100" },
                    { role: "React Developer", date: "May 16, 2025", score: "65/100" },
                    { role: "JavaScript Interview", date: "May 15, 2025", score: "64/100" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="bg-surface border border-border p-3 rounded-xl flex items-center justify-between shadow-[0px_1px_2px_rgba(0,0,0,0.03)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-full bg-accent-light text-accent flex items-center justify-center">
                          <span className="text-[10px] font-black">JS</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-text-primary">{row.role}</div>
                          <div className="text-[9px] text-text-muted flex items-center gap-1 mt-0.5">
                            <Calendar className="h-2.5 w-2.5" /> {row.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-text-primary">{row.score}</span>
                        <span className="inline-flex items-center rounded-full bg-success-lightest px-2 py-0.5 text-[10px] font-semibold text-success-foreground">
                          <Check className="h-2.5 w-2.5 mr-0.5" /> Completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
