"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChartNoAxesCombined, Eye, EyeOff, FileText, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { BrandLogo } from "../layout/BrandLogo";

type AuthMode = "login" | "register";

interface AuthScreenProps {
  mode: AuthMode;
}

const socialButtons = [
  {
    label: "Continue with Google",
    iconSrc: "/images/Google.png",
    iconAlt: "Google logo",
  },
  {
    label: "Continue with Microsoft",
    iconSrc: "/images/Microsoft_Logo%201.png",
    iconAlt: "Microsoft logo",
  },
];

export const AuthScreen = ({ mode }: AuthScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const reduceMotion = useReducedMotion();

  const isLogin = mode === "login";

  const title = isLogin ? "Sign in to your account" : "Create your account";
  const subtitle = isLogin ? "Let&apos;s get you back on track." : "Start practicing smarter in a few seconds.";
  const primaryLabel = isLogin ? "Sign In" : "Create Account";
  const footerPrompt = isLogin ? "Don&apos;t have an account?" : "Already have an account?";
  const footerLink = isLogin ? "/register" : "/login";
  const footerLinkLabel = isLogin ? "Sign up" : "Login";
  const emailFieldLabel = "Email Address";
  const emailFieldPlaceholder = "Enter your email";
  const emailFieldType = "email";
  const emailFieldAutoComplete = "email";
  const passwordLabel = isLogin ? "Password" : "Create New Password";
  const passwordPlaceholder = isLogin ? "Enter your password" : "Create a password";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-4 sm:px-6 sm:py-6 lg:h-[100dvh] lg:px-8 lg:py-0">


      <motion.main
        className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1500px] items-center justify-center lg:h-full lg:min-h-0 py-3"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <section className="grid w-full overflow-hidden rounded-[32px] border border-border bg-surface shadow-[0_30px_90px_rgba(16,24,40,0.14)] lg:h-[min(920px,100%)] lg:grid-cols-[1.06fr_0.94fr] my-5">
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

              <div className="mt-16 max-w-xl flex flex-col items-center">
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
                    className="absolute left-1/2 top-[1px] flex h-88 w-88 bg-[#e8e2fd] rounded-full -translate-x-1/2 items-center justify-center"
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
                    className="absolute -right-5 -top-10 "
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
                    className="absolute left-10 top-36 "
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
                    <p className="text-sm font-medium text-text-dark">
                      How would you handle a tight deadline?
                    </p>
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
                        <FileText className="text-accent"/>
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
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent-light">
                    <ShieldCheck />
                  </span>
                  Your data is secure and encrypted. We respect your privacy.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-10 xl:px-14 xl:py-12"
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.16 }}
          >
            <div className="mx-auto w-full max-w-[440px]">
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-[2.1rem]">
                  {title}
                </h1>
                <p className="mt-2 text-sm text-text-secondary sm:text-base lg:text-sm">
                  {subtitle}
                </p>
              </div>

              <div className="mt-6 space-y-3 xl:mt-7">
                {socialButtons.map((button, index) => (
                  <motion.button
                    key={button.label}
                    type="button"
                    whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 text-sm font-medium text-text-dark shadow-sm transition-colors hover:border-accent-light hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                      delay: 0.2 + index * 0.08,
                    }}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      <Image
                        src={button.iconSrc}
                        alt={button.iconAlt}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    </span>
                    <span>{button.label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="my-5 flex items-center gap-3 xl:my-6">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-text-secondary">
                  Or
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form
                onSubmit={(event) => event.preventDefault()}
                className="space-y-4 xl:space-y-5"
              >
                {!isLogin && (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.36 }}
                  >
                    <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-text-dark">
                      Username
                    </label>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent xl:py-3">
                      <User className="h-5 w-5 shrink-0 text-text-secondary" />
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        placeholder="Choose a username"
                        className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isLogin ? 0.36 : 0.44 }}
                >
                  <label htmlFor={isLogin ? "email" : "signupEmail"} className="mb-1.5 block text-sm font-medium text-text-dark">
                    {emailFieldLabel}
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent xl:py-3">
                    <Mail className="h-5 w-5 shrink-0 text-text-secondary" />
                    <input
                      id={isLogin ? "email" : "signupEmail"}
                      name={isLogin ? "email" : "signupEmail"}
                      type={emailFieldType}
                      autoComplete={emailFieldAutoComplete}
                      placeholder={emailFieldPlaceholder}
                      className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isLogin ? 0.44 : 0.52 }}
                >
                  <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-text-dark">
                    {passwordLabel}
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent xl:py-3">
                    <Lock className="h-5 w-5 shrink-0 text-text-secondary" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      placeholder={passwordPlaceholder}
                      className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </motion.div>

                {!isLogin && (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-text-dark">
                      Confirm Password
                    </label>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent xl:py-3">
                      <Lock className="h-5 w-5 shrink-0 text-text-secondary" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((value) => !value)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
                        aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </motion.div>
                )}

                {isLogin ? (
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <label className="inline-flex items-center gap-2 text-sm text-text-dark">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                      />
                      Remember me
                    </label>
                    <Link href="#" className="text-sm font-medium text-accent transition-colors hover:text-accent-hover">
                      Forgot password?
                    </Link>
                  </div>
                ) : (
                  <label className="flex items-start gap-2 pt-1 text-sm text-text-dark">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <span>
                      I agree to the <Link href="#" className="font-medium text-accent hover:text-accent-hover">Terms of Service</Link> and <Link href="#" className="font-medium text-accent hover:text-accent-hover">Privacy Policy</Link>.
                    </span>
                  </label>
                )}

                <motion.button
                  type="submit"
                  whileHover={reduceMotion ? undefined : { y: -1, scale: 1.01 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-accent px-5 py-3.5 text-base font-semibold text-accent-foreground shadow-[0_16px_30px_rgba(103,64,250,0.25)] transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  <span>{primaryLabel}</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </form>

              <p className="mt-6 text-center text-sm text-text-secondary xl:mt-7">
                {footerPrompt}{" "}
                <Link href={footerLink} className="font-semibold text-accent transition-colors hover:text-accent-hover">
                  {footerLinkLabel}
                </Link>
              </p>
            </div>
          </motion.div>
        </section>
      </motion.main>
    </div>
  );
};
