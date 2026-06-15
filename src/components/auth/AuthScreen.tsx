"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

type AuthMode = "login" | "register";

interface AuthScreenProps {
  mode: AuthMode;
}

const socialButtons = [
  {
    label: "Continue with Google",
    icon: (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-surface border border-border text-[10px] font-black text-accent">
        G
      </span>
    ),
  },
  {
    label: "Continue with Microsoft",
    icon: (
      <span className="grid h-4 w-4 grid-cols-2 gap-[1px]">
        <span className="rounded-[1px] bg-error" />
        <span className="rounded-[1px] bg-warning" />
        <span className="rounded-[1px] bg-info-medium" />
        <span className="rounded-[1px] bg-success" />
      </span>
    ),
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
      <div className="absolute -left-24 top-[-6rem] h-72 w-72 rounded-full bg-accent-light/40 blur-3xl" />
      <div className="absolute right-[-5rem] top-16 h-80 w-80 rounded-full bg-surface-tertiary/70 blur-3xl" />
      <div className="absolute bottom-[-7rem] left-1/4 h-80 w-80 rounded-full bg-success-light/30 blur-3xl" />

      <motion.main
        className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1500px] items-center justify-center lg:h-full lg:min-h-0"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <section className="grid w-full overflow-hidden rounded-[32px] border border-border bg-surface shadow-[0_30px_90px_rgba(16,24,40,0.14)] lg:h-[min(920px,100%)] lg:grid-cols-[1.06fr_0.94fr]">
          <motion.div
            className="relative min-h-[360px] overflow-hidden border-b border-border bg-surface-secondary lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r hidden md:block"
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.08 }}
          >
            <Image
              src="/images/login-page-ui-design.png"
              alt="IntervAI login illustration"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-left"
            />
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
                    {button.icon}
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
