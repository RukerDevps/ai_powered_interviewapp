"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, useStore } from "@tanstack/react-form";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, AlertCircle, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { socialButtons } from "./auth-content";
import type { AuthMode } from "./auth-types";
import {
  collectValidationMessages,
  defaultAuthValues,
  emailSchema,
  loginSchema,
  passwordSchema,
  registerPasswordSchema,
  registerSchema,
  usernameSchema,
} from "./auth-validation";
import { AuthTextField } from "./AuthTextField";

interface AuthFormPanelProps {
  mode: AuthMode;
}

export const AuthFormPanel = ({ mode }: AuthFormPanelProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const reduceMotion = useReducedMotion();

  const isLogin = mode === "login";
  const activeSchema = isLogin ? loginSchema : registerSchema;

  const form = useForm({
    defaultValues: defaultAuthValues,
    onSubmit: async ({ value }) => {
      // Placeholder until auth actions are wired in.
      console.log("Auth submit", { mode, value });
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = activeSchema.safeParse(value);
        if (!result.success) {
          return result.error.issues.map((issue) => issue.message).join(", ");
        }
        return undefined;
      },
    },
  });

  const formErrorMap = useStore(form.store, (state) => state.errorMap);
  const canSubmit = useStore(form.store, (state) => state.canSubmit);
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
  const validationMessages = [
    ...collectValidationMessages(formErrorMap.onChange),
    ...collectValidationMessages(formErrorMap.onSubmit),
  ];
  const hasValidationErrors =
    validationMessages.length > 0 && (hasAttemptedSubmit || canSubmit === false);

  const title = isLogin ? "Sign in to your account" : "Create your account";
  const subtitle = isLogin ? "Let&apos;s get you back on track." : "Start practicing smarter in a few seconds.";
  const primaryLabel = isLogin ? "Sign In" : "Create Account";
  const footerPrompt = isLogin ? "Don&apos;t have an account?" : "Already have an account?";
  const footerLink = isLogin ? "/register" : "/login";
  const footerLinkLabel = isLogin ? "Sign up" : "Login";
  const emailFieldLabel = "Email Address";
  const emailFieldPlaceholder = "Enter your email";
  const passwordLabel = isLogin ? "Password" : "Create New Password";
  const passwordPlaceholder = isLogin ? "Enter your password" : "Create a password";

  return (
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
          <p className="mt-2 text-sm text-text-secondary sm:text-base lg:text-sm">{subtitle}</p>
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
          onSubmit={(event) => {
            event.preventDefault();
            setHasAttemptedSubmit(true);
            void form.handleSubmit();
          }}
          className="space-y-4 xl:space-y-5"
        >
          {hasValidationErrors ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Alert variant="destructive" className="border-error/20 bg-error-light/70 shadow-sm">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-error" />
                  <div className="min-w-0">
                    <AlertTitle>Check the highlighted fields</AlertTitle>
                    <AlertDescription>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {validationMessages.slice(0, 4).map((message) => (
                          <li key={message}>{message}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            </motion.div>
          ) : null}

          {!isLogin ? (
            <form.Field
              name="username"
              validators={{
                onChange: usernameSchema,
                onBlur: usernameSchema,
              }}
            >
              {(field) => (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36 }}
                >
                  <AuthTextField
                    autoComplete="username"
                    errorMessages={field.state.meta.errors}
                    icon={<User className="h-5 w-5" />}
                    id={field.name}
                    label="Username"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    placeholder="Choose a username"
                    showError={field.state.meta.isTouched || hasAttemptedSubmit}
                    type="text"
                    value={field.state.value}
                  />
                </motion.div>
              )}
            </form.Field>
          ) : null}

          <form.Field
            name="email"
            validators={{
              onChange: emailSchema,
              onBlur: emailSchema,
            }}
          >
            {(field) => (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.36 : 0.44 }}
              >
                <AuthTextField
                  autoComplete="email"
                  errorMessages={field.state.meta.errors}
                  icon={<Mail className="h-5 w-5" />}
                  id={field.name}
                  label={emailFieldLabel}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  placeholder={emailFieldPlaceholder}
                  showError={field.state.meta.isTouched || hasAttemptedSubmit}
                  type="email"
                  value={field.state.value}
                />
              </motion.div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: isLogin ? passwordSchema : registerPasswordSchema,
              onBlur: isLogin ? passwordSchema : registerPasswordSchema,
            }}
          >
            {(field) => (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isLogin ? 0.44 : 0.52 }}
              >
                <AuthTextField
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                  errorMessages={field.state.meta.errors}
                  icon={<Lock className="h-5 w-5" />}
                  id={field.name}
                  label={passwordLabel}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  placeholder={passwordPlaceholder}
                  showError={field.state.meta.isTouched || hasAttemptedSubmit}
                  type={showPassword ? "text" : "password"}
                  value={field.state.value}
                />
              </motion.div>
            )}
          </form.Field>

          {!isLogin ? (
            <form.Field
              name="confirmPassword"
              validators={{
                onChange: (value) => (value ? undefined : "Please confirm your password"),
                onBlur: (value) => (value ? undefined : "Please confirm your password"),
              }}
            >
              {(field) => (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <AuthTextField
                    autoComplete="new-password"
                    endAdornment={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((value) => !value)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
                        aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                    errorMessages={field.state.meta.errors}
                    icon={<Lock className="h-5 w-5" />}
                    id={field.name}
                    label="Confirm Password"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    placeholder="Re-enter your password"
                    showError={field.state.meta.isTouched || hasAttemptedSubmit}
                    type={showConfirmPassword ? "text" : "password"}
                    value={field.state.value}
                  />
                </motion.div>
              )}
            </form.Field>
          ) : null}

          {isLogin ? (
            <div className="flex items-center justify-between gap-4 pt-1">
              <form.Field name="rememberMe">
                {(field) => (
                  <label className="inline-flex items-center gap-2 text-sm text-text-dark">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(event) => field.handleChange(event.target.checked)}
                      className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    Remember me
                  </label>
                )}
              </form.Field>
              <Link href="/forgot-password" className="text-sm font-medium text-accent transition-colors hover:text-accent-hover">
                Forgot password?
              </Link>
            </div>
          ) : (
            <form.Field
              name="agreeToTerms"
              validators={{
                onChange: (value) =>
                  value ? undefined : "Please accept the Terms of Service and Privacy Policy",
                onBlur: (value) =>
                  value ? undefined : "Please accept the Terms of Service and Privacy Policy",
              }}
            >
              {(field) => (
                <label className="flex items-start gap-2 pt-1 text-sm text-text-dark">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(event) => field.handleChange(event.target.checked)}
                    onBlur={field.handleBlur}
                    className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/terms" className="font-medium text-accent hover:text-accent-hover">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-medium text-accent hover:text-accent-hover">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              )}
            </form.Field>
          )}

          <motion.button
            type="submit"
            whileHover={reduceMotion ? undefined : { y: -1, scale: 1.01 }}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            aria-disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-accent px-5 py-3.5 text-base font-semibold text-accent-foreground shadow-[0_16px_30px_rgba(103,64,250,0.25)] transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 aria-disabled:cursor-wait aria-disabled:opacity-80"
          >
            <span>{isSubmitting ? "Please wait..." : primaryLabel}</span>
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
  );
};
