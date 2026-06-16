"use client";

import { motion, useReducedMotion } from "framer-motion";

import { AuthFormPanel } from "./AuthFormPanel";
import { AuthHeroPanel } from "./AuthHeroPanel";
import type { AuthScreenProps } from "./auth-types";

export const AuthScreen = ({ mode }: AuthScreenProps) => {
  const reduceMotion = !!useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-4 sm:px-6 sm:py-6 lg:h-[100dvh] lg:px-8 lg:py-0">
      <motion.main
        className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1500px] items-center justify-center py-3 lg:h-full lg:min-h-0"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <section className="grid w-full overflow-hidden rounded-[32px] border border-border bg-surface shadow-[0_30px_90px_rgba(16,24,40,0.14)] lg:h-[min(920px,100%)] lg:grid-cols-[1.06fr_0.94fr] my-5">
          <AuthHeroPanel reduceMotion={reduceMotion} />
          <AuthFormPanel mode={mode} />
        </section>
      </motion.main>
    </div>
  );
};
