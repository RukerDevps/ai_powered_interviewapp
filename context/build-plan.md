# Build Plan

Implementation plan and checklist for building **IntervAI** Mock Interview Platform. Development is divided into 7 sequential phases. Each phase builds upon the previous one.

---

## Phase 1: Foundation & Database Setup

- [x] **1.1 Environment Config**: Setup `.env.local` containing:
  - `DATABASE_URL` (local or remote PostgreSQL)
  - `KIMI_API_KEY` (Kimi 2.6 API key)
  - `KIMI_BASE_URL` (Kimi API endpoint)
  - `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`
- [x] **1.2 Database Schema**: Run SQL migrations to create the tables:
  - `users` (primary account credentials)
  - `profiles` (candidate role, skills, resume url, JD text)
  - `interviews` (session data, overall score, statuses)
  - `interview_questions` (Q&A history, AI response analysis)
  - `interview_analytics` (overall averages, strengths, areas of improvement)
- [ ] **1.3 Database Pool Utility**: Implement `lib/db.ts` utilizing the `pg` package with pool configurations.
- [x] **1.4 Design Tokens Initialization**: Update `app/globals.css` with the Tailwind CSS v4 `@theme` directive, implementing all color tokens, border radius, and font scales defined in `ui-tokens.md`.
- [x] **1.5 Basic Layout & Font setup**: Wire Inter font variable `--font-sans` in `app/layout.tsx`.

---

## Phase 2: Authentication & Profile Setup

- [ ] **2.1 Email Authentication Actions**: Implement password hashing and session cookie generation/verification in `actions/auth.ts` (using standard cookies, no external auth providers).
- [ ] **2.2 Auth Views**: Build `/login` and `/register` pages using the split panel layout (split layout with custom background glow on the left, login form on the right).
- [ ] **2.3 Middleware Protection**: Implement `middleware.ts` to guard dashboard/interview routes and redirect unauthenticated users to `/login`.
- [ ] **2.4 Profile Management actions**: Create `actions/profile.ts` to save and edit profile preferences.
- [ ] **2.5 Resume Extraction Pipeline**:
  - Implement resume parsing helper (`pdf-parse`, `mammoth`).
  - Create `/api/resume/extract` API endpoint.
  - Implement `agent/resume-extractor.ts` using Kimi 2.6 to structure extracted text into profile fields.
  - Add Storage helper `lib/storage.ts` to upload resumes.

---

## Phase 3: Layouts & Marketing Dashboard

- [ ] **3.1 Marketing Homepage**: Build `/` containing Hero, Features grid, How it Works flow, Testimonials, Pricing cards (with monthly/yearly billing toggle), FAQ, and Footer.
- [ ] **3.2 Shared Shell Components**:
  - `components/layout/Navbar.tsx` (top navbar for marketing)
  - `components/layout/Sidebar.tsx` (dashboard left sidebar with "Powered by Kimi 2.6 AI" card)
  - `components/layout/Header.tsx` (dashboard top header with dropdown and theme switch)
- [ ] **3.3 Dashboard Page**: Build `/dashboard` containing WelcomeHeader, QuickStats cards, ContinueInterviewCard (conditional), and RecentInterviews list.
- [ ] **3.4 Settings Page**: Create `/settings` containing ProfileForm, PreferencesForm, and billing placeholders.

---

## Phase 4: Interview Setup Wizard

- [ ] **4.1 Wizard Page**: Build `/interview/new` as a multi-step layout.
- [ ] **4.2 Wizard Steps**:
  - Step 1: Position details & skill tags selection
  - Step 2: Upload resume/paste job description for context
  - Step 3: Question focus & customize sections
  - Step 4: Time duration configuration (15 / 30 / 45 / 60 minutes)
- [ ] **4.3 Wizard Summary**: Build `InterviewSummary.tsx` sidebar displaying current options in real-time.
- [x] **4.4 Wizard Action**: Wire Server Action in `actions/interview.ts` to create the database row in `interviews` (status: `in_progress`) and fetch/store the initial question.

---

## Phase 5: Live Interview Session

- [ ] **5.1 Session Layout**: Build `/interview/[id]` page. Enter browser fullscreen mode automatically on load.
- [ ] **5.2 Proctoring Guard**: Implement `components/interview-session/ProctoringGuard.tsx` containing listeners for fullscreen exit, tab switching, window resizing/minimizing, and screenshot keys. Triggers `/api/interview/[id]/abandon` route on violation.
- [ ] **5.3 AI Interviewer Avatar**: Build `InterviewerAvatar.tsx` displaying the avatar circle, a speaking pulse animation, and an audio waveform visualization during speech.
- [ ] **5.4 Answer Input Area**: Build `AnswerInput.tsx` supporting:
  - Multi-line textarea response.
  - "Speak Answer" voice recognition via browser Web Speech API transcription.
  - Submit button.
- [ ] **5.5 Question Sidebar**: Build `QuestionsPanel.tsx` right sidebar showing answered and current questions with status checkmarks. Show "Attempted Questions Count" (no total question limit set in advance).
- [x] **5.6 AI Question Streamer**: Implement `agent/interviewer.ts` utilizing Kimi 2.6 (temperature `0.7`) to generate adaptive questions based on user answers and target profile context.
- [x] **5.7 Live Answer Evaluation**: Evaluate each submitted answer with Kimi 2.6 (temperature `0.2`) and adjust difficulty or end as `not_eligible` when thresholds are met.

---

## Phase 6: Post-Interview Evaluation & Analytics

- [x] **6.1 Session Compilation API**: Build `/api/interview/complete` endpoint and persist final analytics.
- [x] **6.2 Analysis View**: Build `/interview/[id]/analysis` displaying persisted interview analytics.
- [ ] **6.3 Analytics Page**: Create `/analytics` page displaying historical score averages, performance indicators, and confidence trajectory trends.
- [x] **6.4 History Page**: Build `/history` featuring DB-backed search, filters, pagination, and score/status badges.

---

## Phase 7: Polish & Optimization

- [ ] **7.1 PostHog Telemetry**: Wire PostHog calls to log events (`interview_started`, `question_answered`, `interview_completed`, `interview_abandoned`, etc.).
- [ ] **7.2 Dashboard Refinement**: Update Dashboard widgets to consume actual analytics from completed sessions and generate personalized advice tips based on weaknesses.
- [ ] **7.3 Theme System**: Set up dark mode styles using Tailwind v4 theme configurations, allowing smooth light/dark toggling.
- [ ] **7.4 Verification Checklist**: Execute unit/integration checkups to ensure the fullscreen locks, database cascades, speech transcription fallbacks, and responsiveness metrics function successfully.
