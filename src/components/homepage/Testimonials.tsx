"use client";

import { Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "IntervAI helped me gain confidence and improve my answers. I cracked my dream job at Google!",
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      initials: "PS",
      bgGradient: "from-pink-500 to-rose-500",
      srclink:"/images/image 18.png",
    },
    {
      quote: "The feedback is so detailed and helpful. It's like having a real mentor for interviews.",
      name: "Rohan Verma",
      role: "Frontend Developer",
      initials: "RV",
      bgGradient: "from-purple-500 to-indigo-500",
      srclink:"/images/image 22.png",
    },
    {
      quote: "Best AI interview platform I've used. Super realistic and easy to use.",
      name: "Ananya Singh",
      role: "Product Manager",
      initials: "AS",
      bgGradient: "from-blue-500 to-cyan-500",
      srclink:"/images/image 49.png",
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-20 bg-surface-secondary overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Loved by Job Seekers
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            See how job hunters are using IntervAI to build confidence and land their target roles.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-[0px_1px_3px_rgba(0,0,0,0.1),_0px_1px_2px_-1px_rgba(0,0,0,0.1)] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote text */}
              <div className="relative z-10 pt-4 mb-6">
                <p className="text-sm sm:text-base text-text-dark font-medium leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-3 border-t border-border-light pt-4">
                <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.bgGradient} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                  <img src={t.srclink} alt="" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">{t.name}</h4>
                  <p className="text-[11px] font-semibold text-text-secondary">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots pagination indicator (Visual markup only) */}
        <div className="flex justify-center items-center gap-1.5 mt-8">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="h-1.5 w-1.5 rounded-full bg-border-muted" />
          <span className="h-1.5 w-1.5 rounded-full bg-border-muted" />
        </div>
      </div>
    </section>
  );
};
