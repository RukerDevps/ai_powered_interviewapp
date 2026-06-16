"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChartNoAxesCombined, FileText, ShieldCheck } from "lucide-react";

import { BrandLogo } from "../layout/BrandLogo";

interface AuthHeroPanelProps {
  reduceMotion: boolean;
}

export const AuthHeroPanel = ({ reduceMotion }: AuthHeroPanelProps) => {
  return (
    <motion.div
      className="relative hidden min-h-[360px] overflow-hidden border-b border-border bg-surface-secondary lg:flex lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r"
      initial={reduceMotion ? false : { opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.08 }}
    >
      <div className="absolute inset-0 bg-accent-light/10" />
      <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-accent-light/30 blur-3xl" />
      <div className="absolute right-10 top-16 h-24 w-24 rounded-full bg-surface-tertiary/70 blur-3xl" />
      <div className="absolute bottom-10 left-12 h-24 w-24 rounded-full bg-success-light/30 blur-3xl" />

      <div className="relative z-10 flex w-full flex-col px-10 py-10 xl:px-12 xl:py-12">
        <BrandLogo showSubtitle subtitle="AI Mock Interview" className="w-28" />

        <div className="mt-16 flex max-w-xl flex-col items-center">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary xl:text-5xl">
            Welcome <span className="text-accent">Back!</span> <span className="inline-block align-middle">👋</span>
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-text-secondary">
            Sign in to continue your AI-powered interview journey.
          </p>
        </div>

        <div className="relative mt-10 flex flex-1 items-center justify-center">
          <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light/35 blur-3xl" />

          <div className="relative h-[26rem] w-full max-w-[36rem]">
            <motion.div
              className="absolute left-1/2 top-[1px] flex h-88 w-88 -translate-x-1/2 items-center justify-center rounded-full bg-accent-light"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.18 }}
            >
              <Image
                src="/icons/Robot.png"
                alt="AI interviewer robot"
                width={160}
                height={160}
                className="h-72 w-72 object-contain"
                priority
              />
            </motion.div>

            <motion.div
              className="absolute -right-5 -top-10"
              initial={reduceMotion ? false : { opacity: 0, y: 14, x: 12 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ type: "spring", stiffness: 95, damping: 16, delay: 0.24 }}
            >
              <Image
                src="/icons/Speaking%20audio.svg"
                alt="Speaking indicator"
                width={18}
                height={18}
                className="h-40 w-50 object-contain"
              />
            </motion.div>

            <motion.div
              className="absolute left-10 top-36"
              initial={reduceMotion ? false : { opacity: 0, y: 14, x: -12 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ type: "spring", stiffness: 95, damping: 16, delay: 0.34 }}
            >
              <Image
                src="/icons/My logo.svg"
                alt="Speaking indicator"
                width={18}
                height={18}
                className="h-18 w-18 object-contain"
              />
            </motion.div>

            <motion.div
              className="absolute -right-16 top-29 w-[15rem] rounded-2xl border border-border bg-surface px-4 py-4 shadow-[0_18px_40px_rgba(16,24,40,0.08)]"
              initial={reduceMotion ? false : { opacity: 0, y: 14, x: 12 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ type: "spring", stiffness: 95, damping: 16, delay: 0.3 }}
            >
              <p className="text-sm font-medium text-text-dark">How would you handle a tight deadline?</p>
            </motion.div>

            <motion.div
              className="absolute bottom-25 -left-6 w-[13.75rem] rounded-2xl border border-border bg-surface px-4 py-3 shadow-[0_18px_40px_rgba(16,24,40,0.08)]"
              initial={reduceMotion ? false : { opacity: 0, y: 14, x: -12 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ type: "spring", stiffness: 95, damping: 16, delay: 0.34 }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-light/40">
                  <ChartNoAxesCombined className="text-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Real-time Feedback</p>
                  <p className="text-xs text-text-secondary">Improve as you go</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-1/2 w-[12.25rem] -translate-x-1/2 rounded-2xl border border-border bg-surface px-4 py-3 shadow-[0_18px_40px_rgba(16,24,40,0.08)]"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 95, damping: 16, delay: 0.38 }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-lighter">
                  <FileText className="text-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Resume Match</p>
                  <p className="text-xs text-text-secondary">AI-powered insights</p>
                </div>
              </div>
            </motion.div>

            <div className="absolute bottom-5 -right-10 h-44 w-44">
              <Image
                src="/icons/Group.svg"
                alt="Real-time feedback"
                width={20}
                height={20}
                className="h-36 w-36 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-5 py-3 text-xs font-medium text-text-secondary shadow-sm backdrop-blur-sm">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent-foreground/20">
              <ShieldCheck />
            </span>
            Your data is secure and encrypted. We respect your privacy.
          </div>
        </div>
      </div>
    </motion.div>
  );
};
