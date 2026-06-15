"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI interviewer work?",
      answer: "IntervAI leverages Kimi 2.6 (via an OpenAI-compatible SDK) to dynamically generate adaptive interview questions tailored to your target role, difficulty level, resume, and listed skills. The interviewer reads your answers and modifies downstream questions in real-time, matching a real human conversation flow.",
    },
    {
      question: "Do I need a microphone to practice?",
      answer: "While typing is supported, using a microphone provides the most realistic experience. IntervAI uses the browser's built-in Web Speech API to transcribe your voice directly inside the browser. No audio recordings are uploaded or saved to our servers, keeping your voice inputs completely private.",
    },
    {
      question: "What is the strict proctoring lock?",
      answer: "When starting a live mock session, the interview interface goes full screen. The Proctoring Guard detects if you exit fullscreen mode, switch tabs, minimize the browser window, or press screenshot keys. If any violation is detected, the session is terminated and marked as abandoned to maintain mock integrity.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 30-day money-back guarantee on all paid plans. If you decide that IntervAI doesn't meet your preparation needs, you can cancel your subscription and request a full refund, no questions asked.",
    },
    {
      question: "Can I cancel or change plans anytime?",
      answer: "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time directly through the Billing tab in your account Settings page. If you cancel, your premium benefits will continue until the end of your current billing period.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-20 bg-surface-secondary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            Everything you need to know about the mock interview platform.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            return (
              <div
                key={i}
                className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-text-primary hover:bg-surface-secondary/50 focus:outline-none"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-accent shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-text-secondary shrink-0" />
                  )}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-border p-5 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
