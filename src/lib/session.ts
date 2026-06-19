import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { prisma } from "./prisma";

export interface SessionCheckInput {
  session?: {
    id: string;
    userId: string;
    expiresAt: string | Date;
    token?: string | null;
  } | null;
  user?: {
    id: string;
    email: string;
    name?: string | null;
  } | null;
}

/**
 * Verifies that the session token matches the user's currently active
 * session token stored in the database. This enforces the "latest login
 * wins" single-session policy.
 */
export async function validateActiveSession(
  payload: SessionCheckInput
): Promise<boolean> {
  const token = payload.session?.token;
  const userId = payload.session?.userId ?? payload.user?.id;

  if (!token || !userId) {
    return false;
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { activeSessionToken: true },
  });

  return dbUser?.activeSessionToken === token;
}

export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  if (!result) {
    return null;
  }

  const isActive = await validateActiveSession(result);
  return isActive ? result : null;
}

export async function requireActiveSession(redirectTo = "/login") {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect(redirectTo);
  }

  return session;
}
