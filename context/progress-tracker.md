# Progress Tracker

Living tracker to monitor development progress of **IntervAI**. Updated after every feature is built.

---

## Overall Status

- **Current Phase**: `Phase 1: Foundation & Database Setup`
- **Overall Completion**: `5%`
- **Last Updated**: `2026-06-15`

---

## Feature Roadmap & Status

### Phase 1: Foundation & Database Setup
- [x] Context & Guidelines Setup (Overview, Architecture, Tokens, Rules, Registry, Standards, Library Docs, Build Plan)
- [ ] Database Schema Initialization (SQL migrations)
- [ ] Database Connection Pool helper (`lib/db.ts`)
- [ ] Design System theme tokens in `@theme` (`app/globals.css`)
- [ ] Font imports & Root layout configurations (`app/layout.tsx`)

### Phase 2: Authentication & Profile Setup
- [ ] Password hashing & Session utilities (`actions/auth.ts`)
- [ ] Split-panel Login & Registration views (`/login`, `/register`)
- [ ] Protected route check Middleware (`middleware.ts`)
- [ ] Profile Save & Edit forms
- [ ] PDF & DOCX resume parser utilities
- [ ] Kimi 2.6 resume structure extractor (`agent/resume-extractor.ts`)
- [ ] InsForge Storage integration (`lib/storage.ts`)

### Phase 3: Layouts & Marketing Dashboard
- [ ] Marketing Homepage sections (Hero, Features, Pricing with annual toggles)
- [ ] Landing page Navbar and Footer
- [ ] Dashboard layout Shell (collapsible left Sidebar + Header)
- [ ] Dashboard Page metrics, quick stats, and list grids
- [ ] Settings Page tabs (Profile, Preferences, Billing)

### Phase 4: Interview Setup Wizard
- [ ] 4-Step Setup Wizard container (`/interview/new`)
- [ ] Wizard forms: Job Details, Context attachments, Section selections, and Timer duration
- [ ] Wizard Live Summary sidebar card
- [ ] DB interview creation handler (`actions/interview.ts`)

### Phase 5: Live Interview Session
- [ ] Live interview layout view (`/interview/[id]`)
- [ ] ProctoringGuard event listeners (Fullscreen & page visibility locks)
- [ ] AI Interviewer Avatar waveform SVG & speak pulse animations
- [ ] Text & Voice response inputs (Web Speech API transcription)
- [ ] Dynamic Question sidebar listing with attempted badges
- [ ] Live Kimi 2.6 question generator streaming (`agent/interviewer.ts`)
- [ ] Session timer countdown component

### Phase 6: Post-Interview Evaluation & Analytics
- [ ] Kimi 2.6 Multi-Dimensional grading engine (`agent/evaluator.ts`)
- [ ] Post-interview Compilation route (`/api/interview/complete`)
- [ ] Post-feedback metrics cards (circular progress visualizers)
- [ ] Strengths, weaknesses, and individual question feedback accordions
- [ ] Recharts confidence chart & speaking pace indicators
- [ ] Performance Analytics Dashboard (`/analytics`)
- [ ] Session History table with score badge highlights (`/history`)

### Phase 7: Telemetry & Polish
- [ ] PostHog events instrumentation
- [ ] Personalized dashboard recommendation cards
- [ ] Tailwind v4 smooth Dark Mode toggle support
- [ ] Verification checklist runs

---

## Session Handoff Notes

### 2026-06-15: Landing Page & Pricing Setup
- **Decisions Made**:
  - Initiated coding for the landing page UI design based on delivered screenshots.
  - Aligned on integration of the separate pricing section with billing toggle into the marketing homepage layout flow.
- **Next Steps**:
  - Review implementation plan and obtain approval.
  - Initialize CSS design tokens inside `src/app/globals.css` and font styling in `src/app/layout.tsx`.
  - Implement full responsive HTML/Tailwind mockup components for all landing sections, navbar, and footer.

