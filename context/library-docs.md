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
