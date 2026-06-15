# Progress Tracker

Living tracker to monitor development progress of **IntervAI**. Updated after every feature is built.

---

## Overall Status

- **Current Phase**: `Phase 1: Foundation & Database Setup`
- **Current Phase**: `Phase 2: Authentication & Profile Setup`
- **Overall Completion**: `12%`
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
- [x] Split-panel Login & Registration views (`/login`, `/register`)
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

### 2026-06-15: Landing Page, Pricing Setup & Hero/How-It-Works Animations
- **Decisions Made**:
  - Initiated coding for the landing page UI design based on delivered screenshots.
  - Aligned on integration of the separate pricing section with billing toggle into the marketing homepage layout flow.
  - Installed `framer-motion` dependency and rebuilt `HowItWorks` component scroll-animations using spring physics and the declarative `useInView` hook to improve layout responsiveness and feel.
  - Segmented the desktop connecting lines and mobile connecting lines to draw sequentially using Framer Motion path animations.
  - Installed `gsap` dependency and added a smooth, staggered page entrance animation in `Hero.tsx` using GSAP context timeline.
  - Set elements to start at `opacity-0` to prevent FOUC (flash of unstyled content) and used GSAP to coordinate the stagger and entry.
  - Updated `ui-registry.md` and `ui-rules.md` to establish visual standards for scroll-triggered and page load animations.
- **Next Steps**:
  - Implement full responsive HTML/Tailwind mockup components for all landing sections, navbar, and footer.
  - Initialize database schema migrations and connection pool utilities.

### 2026-06-15: Navbar Tablet Responsiveness Fix
- **Decisions Made**:
  - Moved the landing navbar’s full link set and auth CTAs to `lg` and above so tablet widths no longer force the labels to wrap.
  - Kept the logo compact by hiding the subtitle until `xl`, and made the hamburger menu the fallback for tablet widths.
  - Updated the living UI docs so the new landing navbar breakpoint rule is explicit for future layout work.
- **Next Steps**:
  - Finish the remaining landing footer polish and continue with the homepage sections as planned.

### 2026-06-15: Landing Smooth Scroll Links
- **Decisions Made**:
  - Enabled native smooth scrolling globally for landing page anchor links.
  - Added a section scroll offset so the sticky navbar does not obscure the target section heading after navigation.
  - Kept the solution dependency-free and aligned with browser-native behavior, including reduced-motion fallback.
- **Next Steps**:
  - Continue polishing landing page sections and footer interaction states.

### 2026-06-15: Auth Login Page Build
- **Decisions Made**:
  - Built a new split-screen auth shell for login and register pages.
  - Reused the provided design mockup directly as the left-side hero panel so the main illustration matches the reference exactly.
  - Added Framer Motion entrance animations, staggered social button motion, and interactive password visibility toggles.
  - Created a matching register route so the login page CTA path stays unbroken.
- **Follow-up**:
  - Updated the register variant to use the requested `username`, `email`, `create new password`, and `confirm password` field order while keeping the same layout.
- **Latest Fix**:
  - Corrected the register form so the second field is labeled and configured as `Email Address` instead of a duplicate username field.
- **Next Steps**:
  - Wire the form to real auth actions once the backend session utilities are ready.
  - Optional: refine the register page copy if you want it to follow a separate design later.
