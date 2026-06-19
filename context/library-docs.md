# Library Docs

Documentation and guidelines for third-party libraries used in **IntervAI**. Refer to this guide to maintain correct patterns when initializing or consuming libraries.

---

## 1. PostgreSQL (`pg` / `@types/pg`)

We use the native PostgreSQL client for Node.js (`pg` pool) for database access, rather than a heavy ORM, to optimize speed and query visibility in serverless functions.

### Installation
```bash
npm install pg
npm install --save-dev @types/pg
```

### Usage Pattern (`lib/db.ts`)
```typescript
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  max: 10,                 // Connection pool threshold
  idleTimeoutMillis: 30000,
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  
  if (duration > 100) {
    console.warn(`[db] Slow query: ${text} (${duration}ms)`);
  }
  return res;
};
```

---

## 2. OpenAI Node SDK (`openai`)

For interacting with **Kimi 2.6**, which provides an OpenAI-compatible API endpoint.

### Installation
```bash
npm install openai
```

### Usage Pattern (`lib/kimi.ts`)
```typescript
import OpenAI from "openai";

export const kimi = new OpenAI({
  apiKey: process.env.KIMI_API_KEY!,
  baseURL: process.env.KIMI_BASE_URL!, // e.g. Kimi's custom endpoint base URL
});
```

---

## 3. Recharts (`recharts`)

For rendering interactive analytics line, bar, and area charts.

### Installation
```bash
npm install recharts
```

### Constraints
- Recharts requires browser globals and React state. All chart files MUST start with `"use client"`.
- Wrap charts in `<ResponsiveContainer width="100%" height="100%">` and set explicit heights on parent containers to prevent sizing issues.
- Pass CSS variables (`var(--color-*)`) instead of raw hex values to keep recharts styled with our Tailwind v4 color tokens.

---

## 4. Resume Parsing (`pdf-parse`, `mammoth`)

Used for parsing text content from candidate resume files.

### Installation
```bash
npm install pdf-parse mammoth
npm install --save-dev @types/pdf-parse
```

### Usage Pattern (`lib/resume-parser.ts`)
- Parse PDF buffers with `pdf-parse`.
- Parse DOCX buffers with `mammoth.extractRawText`.
- Return raw extracted string to the API route, then pass it to the Kimi resume extractor client to structure the profile fields.

---

## 5. PostHog Client (`posthog-js`, `posthog-node`)

Used for user telemetry and dashboard charts tracking.

### Installation
```bash
npm install posthog-js
npm install posthog-node
```

### Client Setup (`lib/posthog-client.ts`)
```typescript
import posthog from "posthog-js";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // Page tracking handled manually or via Next.js router events
  });
}

export { posthog };
```

---

## 6. TanStack Form (`@tanstack/react-form`)

Used for schema-driven client forms with field state, touched state, submit state, and form-level error handling.

### Installation
```bash
npm install @tanstack/react-form
```

### Usage Pattern
```typescript
import { useForm, useStore } from "@tanstack/react-form";

const form = useForm({
  defaultValues: {
    email: "",
    password: "",
  },
  onSubmit: async ({ value }) => {
    // Send normalized payload to server action or route handler
  },
  validators: {
    onSubmit: ({ value }) => {
      // Return a string for a form-level error or undefined when valid
    },
  },
});

const formErrorMap = useStore(form.store, (state) => state.errorMap);
```

### Constraints
- Use field-level validators for inline messages and Zod for the underlying validation rules when the form needs structured schema checks.
- Keep submit summaries in a top-level alert and use field state for per-input feedback.
- Prefer `defaultValues` inference over explicit generic arguments unless the library version requires otherwise.

---

## 7. Zod (`zod`)

Used for runtime validation schemas in auth, settings, and interview setup forms.

### Installation
```bash
npm install zod
```

### Usage Pattern
```typescript
import { z } from "zod";

const authSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const result = authSchema.safeParse(formValue);
if (!result.success) {
  const messages = result.error.issues.map((issue) => issue.message);
}
```

### Constraints
- Use Zod for source-of-truth field constraints and cross-field checks.
- Translate schema issues into human-readable alerts or inline field copy before rendering them to users.

---

## 8. shadcn/ui Alert Primitive (`src/components/ui/alert.tsx`)

Used for validation summaries and lightweight user-facing notices.

### Usage Pattern
```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

<Alert variant="destructive">
  <AlertTitle>Check the highlighted fields</AlertTitle>
  <AlertDescription>Please enter a valid email address.</AlertDescription>
</Alert>
```

### Constraints
- Use the destructive variant for form validation summaries.
- Keep the component token-based so it matches the rest of the IntervAI palette.

---

## 9. Better Auth (`better-auth`, `@better-auth/prisma-adapter`)

Auth framework handling identity, sessions, OAuth, and JWT tokens.

### Installation
```bash
npm install better-auth @better-auth/prisma-adapter @prisma/adapter-pg pg
npm install --save-dev prisma
```

### Server Instance (`src/lib/auth.ts`)
```typescript
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisma";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [jwt()],
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          // single-active-session enforcement
        },
      },
    },
    user: {
      create: {
        after: async (user) => {
          // create application Profile row
        },
      },
    },
  },
});
```

### Client Instance (`src/lib/auth-client.ts`)
```typescript
import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
```

### Constraints
- Only email/password and Google OAuth are enabled.
- Only one session per user is active at a time. The `databaseHooks.session.create.before` hook deletes any existing non-expired sessions for the same `userId` before the new session is created, so logging in on a new device signs the old device out.
- Raw JWT tokens are never read by the frontend; use `useSession()` or server `getSession()` instead.
- The auth handler is mounted at `/api/auth/[...all]` via `toNextJsHandler(auth)`.

---

## 10. Prisma ORM (`prisma`, `@prisma/client`)

Database toolkit for auth and application persistence.

### Configuration
- Schema: `prisma/schema.prisma`
- Config: `prisma.config.ts` loads `.env.local`
- Generated client: `src/generated/prisma/client`
- Migrations: `prisma/migrations/`

### Common Commands
```bash
npx prisma generate          # generate client after schema changes
npx prisma migrate dev       # create and apply migrations in development
npx prisma migrate deploy    # apply migrations in production
```

### Constraints
- Import `PrismaClient` from `../generated/prisma/client` (or the configured output path).
- Use the `PrismaPg` driver adapter with the `DATABASE_URL` connection string.
- Keep the Prisma client as a singleton via `src/lib/prisma.ts`.
- Better Auth owns `User`, `Session`, `Account`, `Verification`, and `jwks` tables; app code owns `Profile` and future interview tables.
