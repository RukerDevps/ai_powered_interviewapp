"use client";

import { Briefcase, Zap, BarChart2, Sliders, FileText } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "AI Mock Interviews",
      description: "Practice with AI interviewers that adapt to your answers in real-time.",
      icon: Briefcase,
      color: "text-accent",
      bgColor: "bg-accent-light",
    },
    {
      title: "Real-time Feedback",
      description: "Get instant, actionable feedback on your answers as you go.",
      icon: Zap,
      color: "text-success-foreground",
      bgColor: "bg-success-light",
    },
    {
      title: "Detailed Analytics",
      description: "Track your performance with in-depth analytics and improvement tips.",
      icon: BarChart2,
      color: "text-accent-darker",
      bgColor: "bg-accent-light",
    },
    {
      title: "Custom Interviews",
      description: "Customize roles, difficulty, and question types to match your goals.",
      icon: Sliders,
      color: "text-info-foreground",
      bgColor: "bg-info-light",
    },
    {
      title: "Resume & JD Support",
      description: "Upload your resume or job description to get tailored interview questions.",
      icon: FileText,
      color: "text-behavioral-foreground",
      bgColor: "bg-behavioral-light",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-20 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Features</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Everything You Need to Succeed
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            Prepare, practice, and polish your skills in one central AI-driven platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            // Span the last feature to take 2 cols on desktop for a balanced grid representation, or keep standard grid cols.
            // Let's make it look balanced on desktop: the 5 features are distributed nicely.
            const gridClass = i === 4 ? "md:col-span-2 lg:col-span-1" : "";
            return (
              <div
                key={feature.title}
                className={`bg-surface border border-border rounded-2xl p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.1),_0px_1px_2px_-1px_rgba(0,0,0,0.1)] hover:shadow-lg hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-300 ${gridClass}`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} ${feature.color} mb-5`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
