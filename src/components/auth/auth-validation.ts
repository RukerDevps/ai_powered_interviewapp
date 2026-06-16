import { z } from "zod";

import type { AuthFormValues } from "./auth-types";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email address is required")
  .email("Please enter a valid email address");

export const passwordSchema = z.string().min(1, "Password is required");
export const registerPasswordSchema = passwordSchema.min(8, "Password must be at least 8 characters");
export const usernameSchema = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters")
  .max(30, "Username must be 30 characters or fewer");

export const loginSchema = z.object({
  username: z.string().optional(),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().optional(),
  rememberMe: z.boolean(),
  agreeToTerms: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: registerPasswordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    rememberMe: z.boolean(),
    agreeToTerms: z.boolean().refine((value) => value, {
      message: "Please accept the Terms of Service and Privacy Policy",
    }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const defaultAuthValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  rememberMe: false as boolean,
  agreeToTerms: false as boolean,
} satisfies AuthFormValues;

export const collectValidationMessages = (error: unknown): string[] => {
  if (!error) {
    return [];
  }

  if (typeof error === "string") {
    return [error];
  }

  if (Array.isArray(error)) {
    return error.flatMap((item) => collectValidationMessages(item));
  }

  if (typeof error === "object" && error !== null) {
    if ("message" in error && typeof (error as any).message === "string") {
      return [(error as any).message];
    }

    return Object.values(error as Record<string, unknown>).flatMap((item) =>
      collectValidationMessages(item)
    );
  }

  return [String(error)];
};
