# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here.
2. If yes — match its exact classes and design tokens.
3. If no — build it following `ui-rules.md` and `ui-tokens.md`, then add its details here.

After building any component — update this file with the component name, file path, and exact classes used.

---

## Component Registry

### Layout & Navigation

#### Landing Navbar
File: `components/layout/Navbar.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface/90 backdrop-blur-md` |
| Border | `border-b border-border` |
| Text | `text-text-dark`, `text-text-secondary`, `text-accent` |
| Spacing | `h-16 w-full px-4 sm:px-6 lg:px-8`, desktop gaps `gap-6 lg:gap-8` |
| Hover State | `hover:text-accent`, `hover:bg-surface-secondary` |
| Accent Usage | `bg-accent` CTA button, `bg-gradient-to-br from-accent to-accent-dark` logo mark |

**Pattern notes:**
- Full desktop links and auth CTAs are revealed at `lg` and above.
- Tablet widths fall back to the hamburger menu to avoid wrapped nav text and broken alignment.
- Anchor links rely on native smooth scrolling, with section scroll offsets set globally for the sticky navbar.

---

#### Dashboard Left Sidebar
File: `components/layout/Sidebar.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Border | |
| Text | |
| Spacing | |
| Hover State | |
| Accent Usage | |

---

#### Dashboard Top Header
File: `components/layout/Header.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Border | |
| Text | |
| Spacing | |
| Hover State | |
| Accent/Theme Toggle | |

---

#### Landing Footer
File: `components/layout/Footer.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Border | |
| Text | |
| Spacing | |
| Hover State | |

---

#### Auth Screen
File: `components/auth/AuthScreen.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-background`, soft glows via `bg-accent-light/40`, `bg-surface-tertiary/70`, `bg-success-light/30` |
| Border | `border border-border`, panel divider `lg:border-r` |
| Border radius | `rounded-[32px]`, inner controls `rounded-xl` |
| Text — primary | `text-text-primary` |
| Text — secondary | `text-text-secondary`, `text-text-dark`, `text-text-muted` |
| Spacing | Outer shell `px-4 py-4 sm:px-6 sm:py-6 lg:px-8`; form panel `px-5 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-16`; inputs `px-4 py-3` |
| Hover state | `hover:bg-surface-secondary`, `hover:text-accent`, `hover:bg-accent-hover`, `hover:border-accent-light` |
| Shadow | `shadow-[0_30px_90px_rgba(16,24,40,0.14)]`, button `shadow-[0_16px_30px_rgba(103,64,250,0.25)]` |
| Accent usage | `bg-accent`, `focus:ring-accent`, `text-accent`, `bg-accent-light/40` |

**Pattern notes:**
- The left panel reuses the provided login mockup image as the main visual attraction.
- Entrance motion uses Framer Motion spring/tween combos with reduced-motion fallback.
- Social auth actions are styled as secondary buttons with consistent icon containers.
- Desktop spacing is compressed to fit the shell into the viewport height without introducing page scroll.
- Register mode uses the field order `username`, `email`, `create new password`, `confirm password` while keeping the same visual system as login.

---

### Landing / Marketing Page

#### Landing Hero
File: `src/components/homepage/Hero.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | Ambient glows: `bg-accent-light/30` (#e8e2fd / 30%), `bg-success-light/20` (#e1fbf2 / 20%). Graphic panel background: `bg-surface/40 backdrop-blur-md` (#ffffff / 40%), `bg-surface` (#ffffff). |
| Border | `border-border` (#dfe1e7) on graphic container, `border-border-light` (#f3f4f6) on separators. |
| Title Typography | `text-4xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]` with `text-accent` (#6740fa) for highlights. |
| Subtitle Typography | `text-base sm:text-lg text-text-secondary leading-relaxed` |
| Buttons/CTAs | Primary: `bg-accent px-6 py-3 text-base font-medium text-accent-foreground shadow-lg hover:bg-accent-hover hover:shadow-xl`. Secondary: `bg-surface border border-border px-6 py-3 text-base font-medium text-text-primary hover:bg-surface-secondary`. |
| Spacing | Section: `pt-12 pb-16 md:pt-20 md:pb-24`. Grid: `gap-12 lg:gap-8`. Left container items: `space-y-6`. |
| Shadow | Primary CTA: `shadow-lg` (hover `shadow-xl`). Graphic Mockup: `shadow-2xl`. |

**Pattern notes:**
- Leverages GSAP context for timeline management to prevent memory leaks and React unmounting conflicts.
- Implements staggered fade/slide-up entrance animations for elements on page load:
  - Left-hand side copy and CTAs animate via class `.animate-hero-item` (`stagger: 0.12`).
  - Right-hand side mockup panel scales and slides up via class `.animate-hero-mockup` with a slight timeline overlap (`-=0.6s`).
  - Trusted brand logos fade in via class `.animate-hero-footer` at the end (`-=0.4s`).
- All elements start with a base class of `opacity-0` to avoid initial layout flashing before GSAP context executes.

---

#### Features Grid
File: `components/homepage/Features.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Border | |
| Text | |
| Spacing | |
| Inset Cards | |

---

#### How It Works Flow
File: `src/components/homepage/HowItWorks.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface` (#ffffff), `bg-accent-muted` (#f9f7fc) for active step icons |
| Step Border/Connectors | `border-border-muted` (#dfe1e7) for background line, `bg-accent` (#6740fa) for animated step lines |
| Text | `text-accent` (#6740fa), `text-text-primary` (#101828), `text-text-secondary` (#6a7282), `text-accent-foreground` (#ffffff) |
| Spacing | `py-16 md:py-20` for section container padding, `gap-12 lg:gap-8` for grid gap, `mb-16` for title spacing, `mb-6` for icon container margins |
| Hover State | `group-hover:scale-105` transition scale |
| Shadow | `shadow-sm` on step icon container, `shadow-md` on step number badge |
| Accent Usage | `bg-accent` (#6740fa) for active step numbers & progress lines, `border-accent-light` (#e8e2fd) for icon border |

**Pattern notes:**
- Integrates Framer Motion's `useInView` hook for viewport tracking (triggers once when 15% of section is visible).
- Staggers card reveals using spring physics (`staggerChildren` logic simulated via calculated index-based delays `idx * 0.6`s) with a customized spring transition (`stiffness: 90, damping: 14`).
- Progress lines (desktop horizontal width, mobile vertical height) animate sequentially using Framer Motion `<motion.div>` width/height transitions with customized delay timings starting mid-reveal of adjacent cards.

---

#### Testimonials
File: `components/homepage/Testimonials.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Text / Quotes | |
| Avatar / Profile | |
| Spacing | |

---

#### Pricing Tier Toggle
File: `components/homepage/Pricing.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Card Background | |
| Card Border | |
| Toggle Switch | |
| Spacing | |
| Highlight State (Pro) | |

---

#### Landing FAQ
File: `components/homepage/FAQ.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Accordion Trigger | |
| Text | |
| Spacing | |

---

### Dashboard Page

#### Welcome Header
File: `components/dashboard/WelcomeHeader.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Welcome Typography | |
| CTA Button | |

---

#### Quick Stats Row
File: `components/dashboard/QuickStats.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Card Background | |
| Border / Radius | |
| Value Typography | |
| Label Typography | |

---

#### Continue Interview Card
File: `components/dashboard/ContinueInterviewCard.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Progress Bar Track/Fill | |
| Resume Button | |

---

#### Recent Performance Section
File: `components/dashboard/RecentPerformance.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Score Chart Circle | |
| Dropdown Trigger | |

---

#### Upcoming Interview Tips
File: `components/dashboard/InterviewTips.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Tip List Spacing | |
| Icon Accents | |

---

#### Recent Interviews List
File: `components/dashboard/RecentInterviews.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| List Row Background | |
| Border Separators | |
| Score Badge Colors | |

---

### Interview Setup (Start New Interview)

#### Step 1: Interview Details
File: `components/interview-setup/StepInterviewDetails.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Form Label | |
| Input / Select | |
| Tag Input Shell | |

---

#### Step 2: Add Context (Resume & JD)
File: `components/interview-setup/StepContext.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Drag & Drop Zone | |
| Upload Icon / Ring | |
| JD Textarea | |

---

#### Step 3: Customize Interview
File: `components/interview-setup/StepCustomize.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Option Grid | |
| Custom Selectors | |

---

#### Step 4: Set Duration
File: `components/interview-setup/StepDuration.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Slider / Toggle Track | |
| Active Value Badge | |

---

#### Interview Summary Sidebar
File: `components/interview-setup/InterviewSummary.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| List Rows | |
| Start Button | |

---

### Live Interview Session

#### AI Interviewer Avatar
File: `components/interview-session/InterviewerAvatar.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Avatar Circle / Size | |
| Speaking Pulse Animation| |
| Audio Waveform SVG | |

---

#### Answer Input Area
File: `components/interview-session/AnswerInput.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Textarea Shell | |
| Voice Button | |
| Submit Button | |

---

#### Live Questions Panel (Sidebar)
File: `components/interview-session/QuestionsPanel.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Background | |
| Width | |
| Number Badge States | |

---

#### Session Countdown Timer
File: `components/interview-session/SessionTimer.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Timer Container | |
| Warning / Red Alert | |

---

#### Proctoring Guard
File: `components/interview-session/ProctoringGuard.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Screen Cover Overlay | |
| Warning Copy | |

---

### Interview Analysis & Post-Feedback

#### Score Card Metrics
File: `components/analysis/ScoreCard.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Circular Progress Ring | |
| Text Value | |
| Score Labels (Excellent/Good)| |

---

#### Strengths & Improvements
File: `components/analysis/StrengthsAndImprovements.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Section Cards | |
| Bullet Spacing | |
| Bullet Icons | |

---

#### Per-Question Feedback
File: `components/analysis/PerQuestionFeedback.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Accordion Panel | |
| Feedback Body Text | |
| Review Answer Button | |

---

#### Speaking Pace Chart
File: `components/analysis/SpeakingPaceChart.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Waveform Container | |
| Pace Badge | |

---

#### Confidence Trend Chart
File: `components/analysis/ConfidenceTrendChart.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Recharts Line Chart | |
| Tooltip styling | |

---

### Settings Page

#### Profile Setup Form
File: `components/settings/ProfileForm.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Card Background | |
| Inputs / Selects | |
| Save Button | |

---

#### Preferences Form
File: `components/settings/PreferencesForm.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Card Background | |
| Toggles / Checkboxes | |

---

#### Billing & Subscription Section
File: `components/settings/BillingSection.tsx`
Status: `Pending`

| Property | Class |
| :--- | :--- |
| Card Background | |
| Upgrade CTA | |
| Plan Badges | |
