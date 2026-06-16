# Progress Tracker

Living tracker to monitor development progress of **IntervAI**. Updated after every feature is built.

---

## Overall Status

- **Current Phase**: `Phase 4: Interview Setup Wizard`
- **Overall Completion**: `36%`
- **Last Updated**: `2026-06-16`

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
- [x] Dashboard layout Shell (collapsible left Sidebar + Header)
- [x] Dashboard Page metrics, quick stats, and list grids
- [ ] Settings Page tabs (Profile, Preferences, Billing)

### Phase 4: Interview Setup Wizard
- [x] 4-Step Setup Wizard container (`/interview/new`)
- [x] Wizard forms: Job Details, Context attachments, Section selections, and Timer duration
- [x] Wizard Live Summary sidebar card
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
- [x] Session History table with search, filters, pagination, score badges, and row actions (`/history`)

### Phase 7: Telemetry & Polish
- [ ] PostHog events instrumentation
- [ ] Personalized dashboard recommendation cards
- [ ] Tailwind v4 smooth Dark Mode toggle support
- [ ] Verification checklist runs

## Session Handoff Notes

### 2026-06-16: History Page UI Build
- **Decisions Made**:
  - Built the `/history` route as a dashboard-shell page with the same left rail and top header used elsewhere in the app.
  - Reused the shared UI primitives for the search field, filter triggers, action buttons, and a new shadcn-style table primitive so the page stays visually consistent.
  - Made the sidebar active state route-aware so the History nav item highlights automatically when the page is open.
  - Kept the table dense and horizontally scrollable on smaller screens so it still behaves well even though the design is optimized for desktop.
- **Next Steps**:
  - Wire the page to real interview records, filters, and pagination state when the data layer is ready.

### 2026-06-16: History Table Interaction Upgrade
- **Decisions Made**:
  - Replaced the static history table rendering with a TanStack Table-powered client component so search, role filtering, type filtering, and time filtering all update the visible rows.
  - Added a shadcn-style dropdown menu primitive for the row overflow action so the Delete option lives behind the same three-dot interaction shown in the mockup.
  - Kept delete behavior local for now so the row disappears immediately without requiring backend wiring.
  - Updated the server/client boundary so `/history` passes plain serializable row data only; Lucide icons are now selected inside the client table from string keys.
- **Next Steps**:
  - Hook the delete action to the real mutation layer when interview records are backed by the database.
  - Swap the sample data to live data once the history API is ready.
  - Decide whether to remove the older `HistoryFilters` and `HistoryPagination` files or reuse them as thin wrappers around the TanStack table state.

### 2026-06-16: Auth Screen Refactor
- **Decisions Made**:
  - Split the auth screen into a thin `AuthScreen` wrapper plus dedicated hero, form, and field-shell components to keep the layout readable and easier to maintain.
  - Kept the shared validation stack in reusable helpers so TanStack Form + Zod rules can be extended without duplicating schema code.
  - Recorded the new component boundaries in the living UI docs so future auth or onboarding screens can reuse the same structure.
- **Next Steps**:
  - Wire the auth submit handler to the real session/auth actions.
  - Reuse the same form pattern in settings and interview setup screens.

### 2026-06-16: Stack Strategy Update
- **Decisions Made**:
  - Standardized on TanStack Form plus Zod for schema-driven forms instead of ad hoc submit handling.
  - Added a shared shadcn-style alert primitive so future validation summaries and notices stay consistent.
  - Updated the architecture and library docs to capture the new form-validation boundary and package usage.
- **Next Steps**:
  - Reuse the same form stack in settings, interview setup, and any future user-input flows.
  - Keep new context updates in sync whenever the package strategy changes again.

### 2026-06-16: Auth Validation and Alert Feedback
- **Decisions Made**:
  - Added TanStack Form and Zod to the auth screen so login and registration now validate through the form state layer instead of raw submit prevention.
  - Introduced a shared shadcn-style `Alert` primitive for prominent validation summaries above the form.
  - Kept inline field messages beneath each control so users get both a top-level summary and precise field-level guidance.
  - Updated the auth links to use Next.js navigation routes instead of hash placeholders where they represent app routes.
- **Next Steps**:
  - Wire the auth form submit handler to the real session/auth actions.
  - Reuse the same validation pattern in settings and interview setup forms.

### 2026-06-16: shadcn/ui Foundation Added
- **Decisions Made**:
  - Installed the shadcn/ui support packages needed for the shared primitive layer.
  - Added the `components.json` baseline plus the shared `cn` helper in `src/lib/utils.ts`.
  - Created the first reusable primitives in `src/components/ui/` for button, card, input, label, and textarea.
  - Extended `globals.css` with shadcn-style alias tokens so the primitives map cleanly to the IntervAI palette instead of introducing a second visual system.
- **Next Steps**:
  - Swap future form and surface components over to the new primitives where it improves consistency.
  - Add any missing primitives only when a screen needs them, rather than expanding the set preemptively.

### 2026-06-16: Dashboard Shell, Header, and Sidebar Polish
- **Decisions Made**:
  - Kept the desktop dashboard rail locked to the viewport while the main content column handles scrolling, so navigation stays stationary during long page views.
  - Added the mobile and tablet drawer interaction to the shared dashboard sidebar, with a spring-based slide-in panel and overlay dismissal.
  - Kept the header lean and responsive by using the mobile menu button as the only drawer trigger below `lg`, while preserving the desktop greeting and user controls.
  - Reused the shared brand lockup and Kimi 2.6 promo card so the layout stays visually consistent across desktop and mobile shells.
- **Next Steps**:
  - Wire the dashboard shell to real session and profile data.
  - Reuse the same responsive shell pattern for history and analytics pages.

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

### 2026-06-16: Auth Social Button Logo Swap
- **Decisions Made**:
  - Swapped the placeholder Google and Microsoft social button marks for the actual logo images stored in `public/images`.
  - Kept the existing secondary button styling so the buttons still match the auth shell spacing and border treatment.
- **Next Steps**:
  - If you want OAuth later, the buttons are now visually ready for provider wiring without another UI pass.

### 2026-06-16: Auth Hero Card Stack & Shared Logo
- **Decisions Made**:
  - Extracted the navbar wordmark into a shared `BrandLogo` component so the branding stays consistent across the site.
  - Rebuilt the left auth panel as a coded hero composition that mirrors the supplied login mockup with floating insight cards and a central AI illustration.
  - Reused the existing public icon assets in the hero cards instead of introducing new artwork, keeping the visual system tied to the current asset set.
- **Next Steps**:
  - If you want the same pattern on the register page or other auth variants, the shared logo and hero card structure are ready to reuse.

### 2026-06-16: Dashboard Page Build
- **Decisions Made**:
  - Created the `/dashboard` route as a reusable component composition matching the supplied dashboard UI design.
  - Added separate dashboard shell, sidebar, top header, welcome header, quick stats, continue interview, recent performance, interview tips, and recent interviews components.
  - Used typed sample data in the page module for now so the components can later accept database-backed props without a layout rewrite.
  - Updated `ui-registry.md` and `ui-rules.md` with the new dashboard shell and section-card patterns.
- **Next Steps**:
  - Wire dashboard components to real profile, interview, and analytics data after auth/session and database helpers are ready.

### 2026-06-16: Dashboard Scroll Behavior Tweak
- **Decisions Made**:
  - Locked the dashboard sidebar to the viewport height on desktop so the navigation and Kimi card stay stationary.
  - Moved vertical scrolling into the dashboard content column, keeping the header and section stack in the scrollable region.
  - Documented the fixed-rail behavior in the living UI rules and registry so future dashboard sections preserve the same shell.
- **Next Steps**:
  - Reuse the same shell pattern for analytics and history pages so the app feels consistent across the dashboard suite.

### 2026-06-16: Dashboard Mobile Drawer Navigation
- **Decisions Made**:
  - Added a menu button in the dashboard header for tablet and mobile breakpoints.
  - Reused the same sidebar content inside a slide-in drawer so navigation remains available on small screens without showing the desktop rail.
  - Kept the desktop sidebar fixed at viewport height while the main dashboard content remains the scrollable region.
- **Next Steps**:
  - Apply the same responsive drawer behavior to any future dashboard pages that use the shared shell.

### 2026-06-16: Dashboard Drawer Animation Polish
- **Decisions Made**:
  - Swapped the mobile sidebar from an instant mount to a spring-animated `AnimatePresence` drawer so open and close transitions feel smooth.
  - Added a fading overlay transition in sync with the drawer slide so the backdrop no longer appears abruptly.
  - Captured the animated drawer behavior in the living UI docs for future dashboard work.
- **Next Steps**:
  - Reuse the same motion recipe for any future off-canvas panels in the app.

### 2026-06-16: Start New Interview Page UI Build
- **Decisions Made**:
  - Built the `/interview/new` route inside the shared `DashboardShell`, keeping the existing sidebar and header untouched as requested.
  - Implemented the page as a static UI-first interview setup screen using the existing shadcn-style `Card` and `Button` primitives plus token-based custom field rows.
  - Matched the provided mockup with four setup sections on the left and a sticky interview summary panel on the right for desktop layouts.
  - Kept the existing dashboard CTA path to `/interview/new`, so the dashboard already serves as the entry point into this screen.
- **Next Steps**:
  - Add real form state, upload interactions, and start-interview submission logic when the interview action layer is ready.
  - Extract any repeated field/select patterns into smaller shared primitives if the settings or future wizard steps need the same chrome.

### 2026-06-16: Start New Interview Option Selection
- **Decisions Made**:
  - Converted `InterviewSetupPage.tsx` into a client component so the setup screen can manage local wizard selections without touching the server layer yet.
  - Added interactive option selection for role, experience, interview type, primary skills, question focus, duration, question count, time-per-question, and included sections using the existing shadcn-style dropdown menu primitives.
  - Made resume and job description cards toggleable so optional context state also feeds the preview.
  - Switched the right-side summary panel from hardcoded content to derived values, so every option change is reflected immediately in the preview.
- **Next Steps**:
  - Replace local state with TanStack Form + Zod when the interview creation flow is wired.
  - Connect resume and job description controls to the real upload and text-entry flows.
