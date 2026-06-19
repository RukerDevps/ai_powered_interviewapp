import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { dash } from "@better-auth/infra";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisma";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is not set");
}

if (!process.env.BETTER_AUTH_URL) {
  throw new Error("BETTER_AUTH_URL is not set");
}

const baseURL = process.env.BETTER_AUTH_URL;

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  plugins: [
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
    }),
    jwt({
      jwt: {
        issuer: baseURL,
        audience: baseURL,
        expirationTime: "15m",
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
        }),
      },
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await prisma.profile.create({
            data: {
              userId: user.id,
              email: user.email,
              name: user.name,
              avatar: user.image,
              plan: "free",
            },
          });
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          const latestSession = await prisma.session.findFirst({
            where: { userId: session.userId },
            orderBy: [
              { createdAt: "desc" },
              { updatedAt: "desc" },
              { id: "desc" },
            ],
            select: {
              id: true,
            },
          });

          if (latestSession?.id !== session.id) {
            return;
          }

          // Latest committed login wins: only the newest session row gets to
          // publish its token as the active-session marker for the user.
          await prisma.user.update({
            where: { id: session.userId },
            data: { activeSessionToken: session.token },
          });

          // Secondary cleanup: remove any older session rows for the same
          // user now that the new session is finalized.
          try {
            await prisma.session.deleteMany({
              where: {
                userId: session.userId,
                id: { not: session.id },
              },
            });
          } catch (error) {
            // Cleanup failures must not block a successful login.
            console.error("Failed to clean up stale sessions:", error);
          }
        },
      },
    },
  },
});

export type Auth = typeof auth;
