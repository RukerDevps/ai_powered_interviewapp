"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const authCookieNames = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
  "better-auth.session_data",
  "__Secure-better-auth.session_data",
  "better-auth.account_data",
  "__Secure-better-auth.account_data",
  "better-auth.dont_remember",
  "__Secure-better-auth.dont_remember",
] as const;

async function clearAuthCookies() {
  const cookieStore = await cookies();

  for (const name of authCookieNames) {
    cookieStore.delete(name);
  }
}

export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() });
  await clearAuthCookies();
  redirect("/login");
}

export async function revokeSessionsAction() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user?.id) {
    await auth.api.revokeSessions({ headers: await headers() });
  }

  await clearAuthCookies();
  redirect("/login");
}
