# Architecture

## Stack

| Layer | Tool | Purpose |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | Full stack framework |
| UI Library | React 19.2.4 | Component rendering |
| Database | PostgreSQL (latest) | Relational storage for profiles, interviews, questions, analytics |
| Authentication | Email Authentication | Email & password based login, session cookie |
| Storage | InsForge Storage | File storage (uploaded resumes). Cloudinary is an acceptable drop-in alternative if InsForge limits become a problem — keep storage access behind `lib/storage.ts` so the provider can be swapped without touching callers. |
| AI model | Kimi 2.6 (OpenAI-compatible SDK, custom baseURL) | Interview question generation, real-time answer evaluation, feedback synthesis, resume extraction |
| Speech-to-text | Browser Web Speech API | In-browser voice-to-text for answer input. No server-side audio processing. |
| Proctoring | Fullscreen API + Page Visibility API + Screen Capture detection (client-side only) | Detect fullscreen exit, tab switch, minimize, screenshot attempts. No video/screen recording is stored — violations are detected and acted on client-side only. |
| PDF/DOCX parsing | pdf-parse (PDF) + mammoth (DOCX) | Extract text from uploaded resumes before sending to Kimi for profile auto-fill |
| Analytics | PostHog | Event tracking and dashboard charts |
| Forms | TanStack Form + Zod | Schema-driven auth, settings, and wizard validation |
| Data tables | TanStack Table v8 | Client-side history table filtering, search, pagination, and row model management |
| Styling | Tailwind CSS v4 + shadcn/ui | UI components and styling |
| Language | TypeScript strict | Throughout |

---

## Folder Structure

```
/
├── AGENTS.md
├── middleware.ts                           → Session cookie check on protected routes
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── ui-tokens.md
│   ├── ui-rules.md
│   ├── ui-registry.md
│   ├── code-standards.md
│   ├── library-docs.md
│   ├── build-plan.md
│   └── progress-tracker.md
├── app/
│   ├── layout.tsx                          → Root layout, PostHog provider, theme provider
│   ├── page.tsx                            → Landing page (marketing)
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx                   → Login page (email/password)
│   │   └── register/
│   │       └── page.tsx                   → Register page (email/password signup)
│   ├── dashboard/
│   │   └── page.tsx                       → Dashboard — stats, continue interview, recent performance, tips
│   ├── interview/
│   │   ├── new/
│   │   │   └── page.tsx                   → Start New Interview — 4-step config wizard
│   │   └── [id]/
│   │       ├── page.tsx                   → Live interview session (fullscreen, AI chat)
│   │       └── analysis/
│   │           └── page.tsx               → Live/post analysis panel for this interview
│   ├── history/
│   │   └── page.tsx                       → Interview history shell — passes serializable sample/session rows into client table
│   ├── analytics/
│   │   └── page.tsx                       → Analytics — score breakdowns, trends, per-question review
│   ├── resources/
│   │   └── page.tsx                       → Interview resources / prep materials
│   ├── settings/
│   │   └── page.tsx                       → Profile, preferences, notifications, billing
│   └── api/
│       ├── interview/
│       │   ├── generate/route.ts          → Generate question set via Kimi (start of session)
│       │   ├── complete/route.ts          → Evaluate interview, generate question feedback, finalize session, write DB
│       │   └── [id]/
│       │       └── abandon/route.ts       → Mark interview abandoned (proctoring violation or user exit)
│       └── resume/
│           ├── extract/route.ts           → Parse uploaded resume + Kimi profile auto-fill
├── agent/
│   ├── interviewer.ts                     → Kimi prompt construction for question generation (streaming)
│   ├── evaluator.ts                       → Kimi prompt construction for post-interview evaluation and feedback synthesis
│   ├── resume-extractor.ts                → Kimi-based resume → profile field extraction
│   └── types.ts                           → Agent-specific TypeScript types (prompts, Kimi responses)
├── actions/
│   ├── auth.ts                            → Email auth actions (login, signup, logout)
│   ├── profile.ts                         → Profile save + update, resume upload handling
│   ├── interview.ts                       → Create interview record, save question/answer rows, update status
│   └── settings.ts                        → Preferences, theme, notification settings updates
├── components/
│   ├── ui/                                → shadcn/ui components only
│   │   ├── alert.tsx, button.tsx, card.tsx, dropdown-menu.tsx, input.tsx, label.tsx, table.tsx, textarea.tsx
│   ├── layout/
│   │   ├── Navbar.tsx                     → Landing page top nav
│   │   ├── Sidebar.tsx                    → Dashboard left sidebar
│   │   ├── Header.tsx                     → Dashboard top header (badge, theme toggle, user dropdown)
│   │   └── Footer.tsx
│   ├── homepage/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   └── FAQ.tsx
│   ├── dashboard/
│   │   ├── WelcomeHeader.tsx
│   │   ├── QuickStats.tsx
│   │   ├── ContinueInterviewCard.tsx
│   │   ├── RecentPerformance.tsx
│   │   ├── InterviewTips.tsx
│   │   └── RecentInterviews.tsx
│   ├── interview-setup/
│   │   ├── StepInterviewDetails.tsx       → Step 1: role, experience, type, skills
│   │   ├── StepContext.tsx                → Step 2: resume upload, JD paste
│   │   ├── StepCustomize.tsx              → Step 3: question sections, focus
│   │   ├── StepDuration.tsx               → Step 4: session duration
│   │   └── InterviewSummary.tsx           → Right sidebar live summary
│   ├── interview-session/
│   │   ├── InterviewerAvatar.tsx          → AI avatar + speaking indicator + waveform
│   │   ├── AnswerInput.tsx                → Text + Web Speech API voice input
│   │   ├── QuestionsPanel.tsx             → Right sidebar question list with status
│   │   ├── SessionTimer.tsx               → Countdown timer
│   │   ├── ProctoringGuard.tsx            → Fullscreen/visibility/screenshot detection, triggers abandon
│   │   └── SessionActionBar.tsx           → Live Analysis / Notes / Settings / End Interview
│   ├── analysis/
│   │   ├── ScoreCard.tsx                  → Circular progress score (Overall/Clarity/Relevance/Depth/Confidence)
│   │   ├── StrengthsAndImprovements.tsx
│   │   ├── PerQuestionFeedback.tsx
│   │   ├── SpeakingPaceChart.tsx
│   │   └── ConfidenceTrendChart.tsx
│   ├── history/
│   │   ├── HistoryTable.tsx               → TanStack Table client component with search, filters, pagination, and row actions
│   │   ├── HistoryFilters.tsx             → Legacy/static filter component kept until removed or reused
│   │   └── HistoryPagination.tsx          → Legacy/static pagination component kept until removed or reused
│   ├── resume/
│   │   ├── ResumeUpload.tsx
│   │   ├── ResumePreview.tsx
│   │   └── CompletionIndicator.tsx
│   └── settings/
│       ├── ProfileForm.tsx
│       ├── PreferencesForm.tsx
│       └── BillingSection.tsx
├── lib/
│   ├── db.ts                              → PostgreSQL connection pool (pg client)
│   ├── kimi.ts                            → Kimi 2.6 client (OpenAI SDK, custom baseURL + apiKey)
│   ├── storage.ts                         → InsForge Storage client (resume uploads)
│   ├── posthog-client.ts                  → PostHog browser client
│   ├── posthog-server.ts                  → PostHog server client
│   ├── proctoring.ts                      → Fullscreen/visibility/screenshot event listeners (client-only)
│   └── utils.ts                           → Shared utility functions (`cn`, class merging)
└── types/
    └── index.ts                           → Global TypeScript types
```

---

## System Boundaries

| Folder | Owns |
| --- | --- |
| `app/` | Pages and API routes only. No business logic. |
| `agent/` | All Kimi prompt construction and response parsing — question generation, answer evaluation, feedback aggregation, resume extraction. Nothing here touches React. |
| `actions/` | Server Actions for UI-triggered mutations — auth, profile, settings, and writing interview/question rows. |
| `components/` | UI only. No data fetching logic, no direct DB or Kimi calls. |
| `lib/` | Third-party client initialization, proctoring listeners, and shared utilities only. |
| `types/` | TypeScript types shared across the project. |

---

## Data Flow

### UI Mutations (Server Actions)

```
User interaction in component
        ↓
Server Action in actions/
        ↓
PostgreSQL DB write
        ↓
Revalidate or redirect
```

### Schema-Driven Forms (Client + Server Boundary)

```
User edits auth/settings/interview inputs in client form
        ↳
TanStack Form manages field state, touched state, and submit state
        ↳
Zod validates structure and user-facing constraints
        ↳
Client shows inline field errors plus a top-level alert summary
        ↳
Server action or route handler receives normalized payload
```

### Interview History Table (Client-side UI State)

```
app/history/page.tsx (Server Component)
        ↓
passes serializable interview rows only
        ↓
components/history/HistoryTable.tsx (Client Component)
        ↳
TanStack Table manages global search, role/type/time column filters,
pagination state, and filtered row models
        ↳
shadcn table primitives render the table
        ↳
shadcn dropdown-menu renders row overflow actions
        ↳
local delete action removes rows from client state for now
```

**Boundary rule:** server page data must stay plain and serializable. For example, history rows pass an icon key string such as `"code"` or `"brain"`; `HistoryTable.tsx` maps that key to the actual Lucide icon inside the client component. Do not pass React components, class instances, or objects with methods from `app/history/page.tsx` into `HistoryTable`.

Future database-backed history should replace the sample row array in `app/history/page.tsx` with server-fetched rows, while keeping filtering/pagination client-side unless the result set becomes large enough to require URL/search-param-backed server queries.

### Question Generation (API Route, streaming)

```
User completes Start New Interview wizard, clicks "Start Interview"
        ↓
actions/interview.ts creates `interviews` row (status: in_progress)
        ↓
API route app/api/interview/generate (streamed)
        ↓
agent/interviewer.ts builds prompt from profile + resume/JD context + wizard config
        ↓
Kimi 2.6 streams questions dynamically based on context (temperature 0.7)
        ↓
Questions written to `interview_questions` rows as they are generated
        ↓
Client renders questions progressively in QuestionsPanel
```

### Session Completion & Evaluation (API Route)

```
User finishes interview or timer expires
        ↓
API route app/api/interview/complete
        ↓
agent/evaluator.ts evaluates all answers together
        → generates per-question scores/feedback + overall score,
          per-dimension averages, strengths[], areas_to_improve[],
          speaking_pace_rating, confidence_trend_data
        ↓
Row written to `interview_questions` (ai_feedback, scores_json) and `interview_analytics`
        ↓
interviews.status = 'completed', completed_at set, score = overall_score
        ↓
Dashboard / History / Analytics pages revalidated
```

### Proctoring Violation (Client-side)

```
ProctoringGuard detects: fullscreen exit | tab switch | window minimize | screenshot attempt
        ↓
Client immediately stops local recording state (no video stored)
        ↓
Client calls app/api/interview/[id]/abandon
        ↓
interviews.status = 'abandoned', completed_at set
        ↓
Redirect to /dashboard with proctoring violation status message
```

### Resume Operations (API Routes)

```
User uploads resume (PDF/DOCX) and selects "Extract from Resume"
        ↓
API route app/api/resume/extract
        ↓
PDF → pdf-parse text / DOCX → mammoth text
        ↓
agent/resume-extractor.ts → Kimi 2.6 structures text into profile fields
        ↓
Extracted fields returned to client for user review/edit
        ↓
actions/profile.ts saves confirmed fields + uploads original file to InsForge Storage
```

---

## PostgreSQL Database Schema

### `users`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary Key |
| email | text | Unique |
| password_hash | text | Salted and hashed password |
| created_at | timestamptz | |

### `profiles`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | References users(id), `ON DELETE CASCADE` |
| name | text | |
| email | text | Pre-filled from user account |
| avatar | text | Optional avatar URL |
| target_role | text | e.g. "Frontend Developer" |
| experience_level | text | junior / mid / senior |
| primary_skills | text[] | Array of skill tags |
| resume_url | text | InsForge Storage URL of current resume |
| job_description_text | text | Most recently pasted JD, used for context |
| plan | text | free / pro / team / enterprise |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `interviews`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary Key |
| user_id | uuid | References profiles(id), `ON DELETE CASCADE` |
| role | text | |
| experience_level | text | junior / mid / senior |
| interview_type | text | technical / behavioral / mixed |
| skills | text[] | |
| sections | text[] | technical / behavioral / system_design / coding_challenge |
| question_focus | text | conceptual / practical / problem_solving / mixed |
| duration | integer | Minutes (15/30/45/60) |
| questions_attempted | integer | |
| status | text | in_progress / completed / abandoned / incomplete |
| score | integer | Overall score 0-100, set on completion |
| started_at | timestamptz | |
| completed_at | timestamptz | |

### `interview_questions`

| Column | Type | Notes |
| --- | --- | --- |
| interview_id | uuid | References interviews(id), `ON DELETE CASCADE` |
| question_number | integer | Compound PK with interview_id |
| question_text | text | |
| user_answer | text | Text or Web Speech API transcript |
| ai_feedback | text | Per-question Kimi feedback |
| scores_json | jsonb | { clarity, relevance, technical_depth, confidence, overall } |
| duration_seconds | integer | Time taken to answer |
| created_at | timestamptz | |

### `interview_analytics`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary Key |
| interview_id | uuid | References interviews(id), `ON DELETE CASCADE`, unique (1-to-1) |
| overall_score | integer | |
| clarity_score | integer | |
| relevance_score | integer | |
| technical_depth_score | integer | |
| confidence_score | integer | |
| strengths | text[] | |
| areas_to_improve | text[] | |
| speaking_pace_rating | text | e.g. "Good" / "Average" / "Excellent" |
| confidence_trend_data | jsonb | Array of {question_number, confidence_score} for line chart |
| created_at | timestamptz | |

---

## InsForge Storage

| Bucket | Path | Contents |
| --- | --- | --- |
| resumes | resumes/{user_id}/uploaded.pdf or .docx | User-uploaded resume (for extraction) |

Access: authenticated users only, own files only. If InsForge limits become a blocker, swap to Cloudinary behind `lib/storage.ts` — no other files should reference the storage provider directly.

---

## Authentication

- System: Session-based cookie authentication
- Methods: Email & password login and registration only (no OAuth for MVP)
- Protected routes: `/dashboard`, `/interview/*`, `/history`, `/analytics`, `/resources`, `/settings`
- Public routes: `/`, `/login`, `/register`
- `middleware.ts` checks the session cookie on every protected route
- On login → redirect to `/dashboard`

---

## PostgreSQL Client Pattern

```typescript
// lib/db.ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
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

## Kimi 2.6 Client Pattern

```typescript
// lib/kimi.ts
import OpenAI from "openai";

export const kimi = new OpenAI({
  apiKey: process.env.KIMI_API_KEY!,
  baseURL: process.env.KIMI_BASE_URL!, // Kimi's OpenAI-compatible endpoint
});
```

**Question generation (creative)** — `agent/interviewer.ts`, temperature `0.7`, `stream: true`.

**Answer evaluation & feedback (deterministic)** — `agent/evaluator.ts` and `agent/feedback.ts`, temperature `0.2`, `stream: true`.

---

## Web Speech API Pattern (Voice Answer Input)

```typescript
// components/interview-session/AnswerInput.tsx (client component)
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US"; // English-only for MVP

recognition.onresult = (event) => {
  const transcript = Array.from(event.results)
    .map((r) => r[0].transcript)
    .join(" ");
  // Append/update answer textarea state with transcript
};

// Fallback: if SpeechRecognition is unsupported, hide "Speak Answer"
// button and show text input only — never block submission.
```

No audio is sent to the server. All speech-to-text happens in the browser.

---

## Proctoring Pattern (Client-side only)

```typescript
// lib/proctoring.ts — registered by ProctoringGuard on session mount

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) triggerViolation("fullscreen_exit");
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) triggerViolation("tab_switch_or_minimize");
});

// Best-effort screenshot detection (e.g. keydown for PrintScreen / OS shortcuts)
window.addEventListener("keydown", (e) => {
  if (e.key === "PrintScreen") triggerViolation("screenshot_attempt");
});

async function triggerViolation(reason: string) {
  // No recording is stored — only the violation event is sent
  await fetch(`/api/interview/${interviewId}/abandon`, {
    method: "POST",
    body: JSON.stringify({ reason }),
  });
  window.location.href = "/dashboard?proctoring=violation";
}
```

---

## Invariants

Rules the AI agent must never violate:

- API routes contain no UI logic. Components contain no DB or Kimi logic.
- Agent code in `/agent` never imports from `/components` or `/actions`.
- Server Actions never call Kimi directly — Kimi calls only happen in `/agent`, invoked from API routes.
- All database operations use the PostgreSQL connection pool from `lib/db.ts`.
- No hardcoded hex values or raw Tailwind color classes in components — use CSS variables from `ui-tokens.md`.
- Question generation always uses temperature `0.7`; answer evaluation and feedback aggregation always use temperature `0.2`.
- Every interview session must produce a row in `interviews`, `interview_questions` (one per question), and `interview_analytics` on completion — never partial writes left dangling.
- Proctoring violations never store video or screenshots — only a violation reason and timestamp are recorded via the abandon endpoint.
- Voice input never leaves the browser — no audio is uploaded or sent to any API.
- Always scope database queries to the current `user_id` — never query without a user filter.
- `interviews.status` is always one of `in_progress`, `completed`, `abandoned`, `incomplete` — never any other value.
- Resume extraction (`/api/resume/extract`) never auto-saves to the profile — extracted fields are returned for user review/edit before `actions/profile.ts` persists them.
