"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, Upload, ShieldAlert, TrendingUp } from "lucide-react";

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const steps = [
    {
      step: 1,
      title: "Choose Your Role",
      description: "Select the job role and interview type you want to practice for.",
      icon: UserPlus,
    },
    {
      step: 2,
      title: "Add Your Context",
      description: "Upload your resume or add job description for a more personalized experience.",
      icon: Upload,
    },
    {
      step: 3,
      title: "Start Interview",
      description: "Answer questions in a real-time AI interview environment just like the real thing.",
      icon: ShieldAlert,
    },
    {
      step: 4,
      title: "Get Insights & Improve",
      description: "Receive detailed feedback and tips to improve your performance.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-surface">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">How it Works</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Simple Steps to Interview Success
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            Get comfortable with the platform layout and start mastering your interview techniques.
          </p>
        </div>

        {/* Steps Flowchart Container */}
        <div className="relative">
          {/* Connecting lines (Desktop only) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-[2px] z-0">
            {/* Segment 1: Step 1 to Step 2 */}
            <div className="absolute left-[12.5%] w-[25%] h-[2px] border-t-2 border-dashed border-border-muted">
              <motion.div 
                className="absolute -top-[2px] left-0 h-[2px] bg-accent" 
                initial={{ width: "0%" }}
                animate={{ width: isInView ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
              />
            </div>
            {/* Segment 2: Step 2 to Step 3 */}
            <div className="absolute left-[37.5%] w-[25%] h-[2px] border-t-2 border-dashed border-border-muted">
              <motion.div 
                className="absolute -top-[2px] left-0 h-[2px] bg-accent" 
                initial={{ width: "0%" }}
                animate={{ width: isInView ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 1.0 }}
              />
            </div>
            {/* Segment 3: Step 3 to Step 4 */}
            <div className="absolute left-[62.5%] w-[25%] h-[2px] border-t-2 border-dashed border-border-muted">
              <motion.div 
                className="absolute -top-[2px] left-0 h-[2px] bg-accent" 
                initial={{ width: "0%" }}
                animate={{ width: isInView ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 1.6 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              
              // Stagger reveal delays:
              // Step 1: 0s, Step 2: 0.6s, Step 3: 1.2s, Step 4: 1.8s
              const cardDelay = idx * 0.6; 
              // Line segments start drawing halfway through the step reveal
              const lineDelay = cardDelay + 0.35; 

              return (
                <motion.div 
                  key={item.step} 
                  className="flex flex-col items-center text-center relative z-10 group"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 14,
                    delay: cardDelay,
                  }}
                >
                  {/* Step Icon Container */}
                  <div className="relative mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-muted border-2 border-accent-light text-accent group-hover:scale-105 transition-transform duration-300 shadow-sm">
                      <Icon className="h-8 w-8" />
                    </div>
                    {/* Number Badge */}
                    <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-black text-accent-foreground shadow-md">
                      {item.step}
                    </div>
                  </div>

                  {/* Text details */}
                  <h3 className="text-base font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary px-4 leading-relaxed">{item.description}</p>

                  {/* Mobile connecting lines */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden block absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-6">
                      {/* Background dashed line */}
                      <div className="w-full h-full border-l border-dashed border-border-muted" />
                      {/* Animated solid purple line overlay */}
                      <motion.div 
                        className="absolute top-0 left-0 w-[2px] bg-accent -translate-x-[0.5px]" 
                        initial={{ height: "0%" }}
                        animate={{ height: isInView ? "100%" : "0%" }}
                        transition={{ duration: 0.4, ease: "easeInOut", delay: lineDelay }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
