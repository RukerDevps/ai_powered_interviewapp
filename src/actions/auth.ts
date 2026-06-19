"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
}

export async function revokeSessionsAction() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user?.id) {
    await auth.api.revokeSessions({ headers: await headers() });
  }

  redirect("/login");
}
