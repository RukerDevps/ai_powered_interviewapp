"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Sparkles, Mic, Play, CheckCircle, Clock, Check, HelpCircle, Briefcase, Award } from "lucide-react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial positions and opacities to prevent flash before animation
      gsap.set(".animate-hero-item", { y: 24, opacity: 0 });
      gsap.set(".animate-hero-mockup", { y: 32, scale: 0.96, opacity: 0 });
      gsap.set(".animate-hero-footer", { y: 16, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });

      // Animate left side items
      tl.to(".animate-hero-item", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Animate right mockup
      tl.to(
        ".animate-hero-mockup",
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: "back.out(1.2)",
        },
        "-=0.6"
      );

      // Animate brand logos
      tl.to(
        ".animate-hero-footer",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-accent-light/30 blur-3xl opacity-60" />
      <div className="absolute top-1/2 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-success-light/20 blur-3xl opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <span className="animate-hero-item opacity-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="h-3.5 w-3.5" /> AI-Powered Mock Interviews
            </span>
            <h1 className="animate-hero-item opacity-0 text-4xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
              Ace Every Interview with <span className="text-accent">AI.</span>
            </h1>
            <p className="animate-hero-item opacity-0 text-base sm:text-lg text-text-secondary leading-relaxed">
              Realistic mock interviews, personalized feedback, and smart insights to help you land your dream job.
            </p>
            <div className="animate-hero-item opacity-0 flex flex-wrap gap-4 w-full sm:w-auto">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-medium text-accent-foreground shadow-lg hover:bg-accent-hover hover:shadow-xl transition-all"
              >
                Start Free Interview &rarr;
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-surface border border-border px-6 py-3 text-base font-medium text-text-primary hover:bg-surface-secondary transition-colors"
              >
                View Features
              </Link>
            </div>

            {/* Micro Benefits List */}
            <div className="animate-hero-item opacity-0 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full border-t border-border mt-6">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-lighter text-accent">
                  <Award className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-text-dark">AI Interviewer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-lighter text-accent">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-text-dark">Real-time Feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-lighter text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-text-dark">Personalized Insights</span>
              </div>
            </div>
          </div>

          {/* Hero Right Graphic Mockup */}
          <div className="lg:col-span-7 justify-center animate-hero-mockup opacity-0 hidden sm:flex">
            <div className="relative w-full max-w-[580px] p-2 sm:p-4 bg-surface/40 backdrop-blur-md border border-border rounded-2xl shadow-2xl">
              {/* Header bar */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border bg-surface-secondary rounded-t-xl">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <div className="text-[10px] text-text-muted font-mono ml-4">app.intervai.com/interview/active</div>
              </div>

              {/* Main Panel Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-surface rounded-b-xl overflow-hidden min-h-[380px]">
                {/* Left Area (AI Chat & Input) */}
                <div className="md:col-span-8 p-4 flex flex-col justify-between border-r border-border gap-4">
                  {/* AI Interviewer details */}
                  <div className="flex items-center justify-between border-b border-border-light pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-accent-light flex items-center justify-center text-accent">
                        <span className="text-xs font-black">AI</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-text-primary">AI Interviewer</div>
                        <div className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                          <span className="text-[10px] text-success font-medium">Speaking...</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transcript area */}
                  <div className="flex-1 space-y-3 pt-2">
                    <div className="bg-accent-muted p-3 rounded-lg border border-accent-light">
                      <p className="text-xs text-text-dark font-medium leading-relaxed">
                        Hello Alex! I&apos;m your AI interviewer. Let&apos;s start your Frontend Developer interview. Are you ready?
                      </p>
                    </div>

                    {/* Waveform Visualization mockup */}
                    <div className="flex items-center justify-center gap-0.5 py-4 px-2">
                      {[3, 5, 2, 7, 4, 8, 3, 6, 2, 8, 5, 9, 3, 7, 4, 8, 2, 5, 3, 7, 4, 6, 2, 5, 3].map((height, i) => (
                        <div
                          key={i}
                          style={{ height: `${height * 3}px` }}
                          className={`w-0.5 rounded-full ${i % 2 === 0 ? "bg-accent" : "bg-accent-hover"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Textarea mock and submit actions */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Your Answer</label>
                    <div className="border border-border rounded-lg p-2 bg-surface-secondary text-xs text-text-muted min-h-[60px] flex items-start">
                      Type or speak your answer...
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-surface text-[11px] font-semibold text-text-primary hover:bg-surface-secondary">
                        <Mic className="h-3.5 w-3.5 text-accent" /> Speak Answer
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-accent text-[11px] font-semibold text-accent-foreground hover:bg-accent-hover shadow-sm">
                        Submit Answer <Play className="h-2.5 w-2.5 fill-current ml-0.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Area (Sidebar details) */}
                <div className="md:col-span-4 bg-surface-secondary p-3 flex flex-col gap-4">
                  {/* Timer & Progress */}
                  <div className="space-y-2 border-b border-border pb-3">
                    <div className="flex items-center justify-between text-text-muted">
                      <span className="text-[10px] font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Time Remaining
                      </span>
                    </div>
                    <div className="text-lg font-bold text-text-primary">24:35</div>
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Question 3 of 5</span>
                    </div>

                    <div className="bg-surface border border-accent p-2.5 rounded-lg">
                      <div className="text-[10px] text-accent font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Current
                      </div>
                      <p className="text-[11px] font-semibold text-text-primary leading-snug">
                        How does event delegation work in JavaScript?
                      </p>
                    </div>

                    {/* Question list mockup */}
                    <div className="space-y-1.5 pt-1">
                      {[4, 5].map((num) => (
                        <div key={num} className="flex items-center gap-2 p-1.5 rounded border border-border bg-surface/50 text-[10px] text-text-secondary font-medium">
                          <div className="h-4 w-4 rounded-full bg-border flex items-center justify-center text-[9px] text-text-muted font-bold">{num}</div>
                          <span className="truncate">Question test goes here?</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand logos row */}
        <div className="mt-16 border-t border-border-light pt-8 text-center animate-hero-footer opacity-0">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-6">
            Trusted by job seekers from top companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40 grayscale hover:opacity-75 transition-opacity duration-300">
            {/* Google Logo */}
            <span className="text-base font-bold tracking-tight text-text-slate font-sans">Google</span>
            {/* Microsoft Logo */}
            <span className="text-base font-bold tracking-tight text-text-slate font-sans">Microsoft</span>
            {/* Amazon Logo */}
            <span className="text-base font-bold tracking-tight text-text-slate font-sans">amazon</span>
            {/* Adobe Logo */}
            <span className="text-base font-bold tracking-tight text-text-slate font-sans font-semibold">Adobe</span>
            {/* Airbnb Logo */}
            <span className="text-base font-bold tracking-tight text-text-slate font-sans">airbnb</span>
            {/* Meta Logo */}
            <span className="text-base font-extrabold tracking-tight text-text-slate font-sans">Meta</span>
          </div>
        </div>
      </div>
    </section>
  );
};
