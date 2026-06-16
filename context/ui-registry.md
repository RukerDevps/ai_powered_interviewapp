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

### Core UI Primitives

#### Alert
File: `src/components/ui/alert.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface`, `bg-error-light/70` |
| Border | `border border-border`, `border-error/20` |
| Border radius | `rounded-lg` |
| Text â€” primary | `text-text-primary` |
| Text â€” secondary | `text-text-primary` |
| Spacing | `px-4 py-3` |
| Hover state | none |
| Shadow | none |
| Accent usage | `text-error` |

**Pattern notes:**
- This is the canonical shadcn-style alert surface for validation and other user-facing notices.
- Use the destructive variant when the message should stand out above form fields, but keep the same token palette so alerts stay consistent with the app shell.

#### Button
File: `src/components/ui/button.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-primary`, `bg-secondary`, `bg-background` |
| Border | `border border-border` |
| Border radius | `rounded-md` |
| Text — primary | `text-primary-foreground`, `text-secondary-foreground`, `text-text-primary` |
| Text — secondary | `text-text-primary`, `text-text-secondary` |
| Spacing | `h-10 px-4 py-2`, `h-9 px-3`, `h-11 px-8` |
| Hover state | `hover:bg-accent-hover`, `hover:bg-surface-secondary`, `hover:underline` |
| Shadow | `shadow-sm` |
| Accent usage | `bg-primary`, `text-primary-foreground`, `bg-destructive` |

**Pattern notes:**
- This is the base shadcn-style button primitive for future forms and CTAs.
- Variants stay aligned to the IntervAI token set by mapping shadcn aliases to the existing purple accent and surface palette.
- The component supports `asChild` so links and compound controls can share the same visual treatment.

#### Card
File: `src/components/ui/card.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-card` |
| Border | `border border-border` |
| Border radius | `rounded-2xl` |
| Text — primary | `text-card-foreground`, `text-text-primary` |
| Text — secondary | `text-text-secondary` |
| Spacing | Header/footer `p-6`, content `p-6 pt-0` |
| Hover state | none |
| Shadow | `shadow-sm` |
| Accent usage | none |

**Pattern notes:**
- Card primitives match the existing dashboard surface language and use the same rounded-2xl shell as the feature cards already in the app.
- Header, content, and footer spacing intentionally mirrors the existing section-card rhythm so feature screens can mix custom cards and shadcn cards without visual drift.

#### Dropdown Menu
File: `src/components/ui/dropdown-menu.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface` |
| Border | `border border-border` |
| Border radius | `rounded-xl` container, `rounded-md` items |
| Text — primary | `text-text-primary` |
| Text — secondary | `text-text-muted` |
| Spacing | `p-1` content, `px-2 py-2` items |
| Hover state | `focus:bg-surface-secondary` |
| Shadow | `shadow-[0_18px_40px_rgba(16,24,40,0.14)]` |
| Accent usage | `text-error` for destructive items |

**Pattern notes:**
- This is the canonical shadcn-style action menu for row-level overflow controls.
- Destructive actions use token-based error styling so table menus stay consistent with the rest of the IntervAI palette.

#### Table
File: `src/components/ui/table.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | none |
| Border | row borders via `border-border` |
| Border radius | none |
| Text — primary | `text-text-primary` |
| Text — secondary | `text-text-secondary` |
| Spacing | Header cells `px-6 py-4`, body cells `px-6 py-5` |
| Hover state | `hover:bg-surface-secondary` |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
- This is the canonical shadcn-style table primitive for dense dashboard data views.
- The component keeps row separators, hover states, and spacing token-based so history and analytics tables can stay consistent.

#### Input
File: `src/components/ui/input.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-background` |
| Border | `border border-input` |
| Border radius | `rounded-md` |
| Text — primary | `text-text-primary` |
| Text — secondary | `placeholder:text-text-muted` |
| Spacing | `h-10 px-3 py-2` |
| Hover state | none |
| Shadow | none |
| Accent usage | `focus-visible:ring-ring` |

**Pattern notes:**
- This is the default form field primitive for future auth, settings, and wizard inputs.
- It intentionally uses the shadcn alias tokens in `globals.css` while still resolving to the IntervAI palette.

#### Label
File: `src/components/ui/label.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | none |
| Border | none |
| Border radius | none |
| Text — primary | `text-text-primary` |
| Text — secondary | `peer-disabled:opacity-70` |
| Spacing | none |
| Hover state | none |
| Shadow | none |
| Accent usage | none |

**Pattern notes:**
- Label stays intentionally minimal so it can be paired with any future form control without adding extra visual weight.

#### Textarea
File: `src/components/ui/textarea.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-background` |
| Border | `border border-input` |
| Border radius | `rounded-md` |
| Text — primary | `text-text-primary` |
| Text — secondary | `placeholder:text-text-muted` |
| Spacing | `min-h-24 px-3 py-2` |
| Hover state | none |
| Shadow | none |
| Accent usage | `focus-visible:ring-ring` |

**Pattern notes:**
- Textarea mirrors the input primitive so long-form form fields keep the same focus and spacing behavior.

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
- The brand mark now comes from the shared `BrandLogo` component so auth and marketing surfaces stay visually identical.

---

#### Brand Logo
File: `components/layout/BrandLogo.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-gradient-to-br from-accent to-accent-dark` |
| Border | none |
| Border radius | `rounded-[10px]` |
| Text â€” primary | `text-accent-foreground` |
| Text â€” secondary | `text-accent` on the AI badge, `text-text-secondary` for subtitle |
| Spacing | `h-9 px-3 py-1`, optional subtitle `mt-1` |
| Hover state | none |
| Shadow | `shadow-sm` |
| Accent usage | `bg-accent`, `bg-accent-dark`, `text-accent-foreground` |

**Pattern notes:**
- This is the canonical IntervAI brand lockup used in both the navbar and auth hero.
- The subtitle is optional so the same component can stay compact in navigation but explanatory in the auth shell.

---

#### Dashboard Left Sidebar
File: `components/layout/Sidebar.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface`, powered card `bg-accent-muted` |
| Border | `border-r border-border`, card `border border-border` |
| Text | `text-text-dark`, active `text-accent`, muted `text-text-secondary` |
| Spacing | Shell `w-[280px]`, logo area `px-8 py-7`, nav `px-6 py-7`, links `px-4 py-4 gap-4` |
| Hover State | `hover:bg-accent-lighter hover:text-accent` |
| Accent Usage | Active link `bg-accent-muted text-accent`, CTA `bg-accent text-accent-foreground` |

**Pattern notes:**
- Sidebar is hidden below `lg` and acts as the persistent dashboard navigation on desktop.
- The rail is locked to the viewport height with the content column handling scrolling, so the navigation and Kimi card remain stationary while dashboard sections move.
- The Kimi promotion card uses the same accent-muted surface as active navigation to keep the dashboard palette consistent.
- On mobile and tablet widths, the same sidebar content is exposed through a slide-in drawer so the navigation stays reachable without collapsing the desktop rail.
- The mobile drawer uses a spring-based `AnimatePresence` slide from the left with a fading overlay for a smoother open/close transition.
- Active sidebar state now follows the current route path, so `/dashboard`, `/history`, `/analytics`, and `/settings` each highlight correctly without per-page props.

---

#### Dashboard Top Header
File: `components/layout/Header.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface` |
| Border | `border-b border-border` |
| Text | `text-text-primary`, `text-text-secondary`, `text-accent` |
| Spacing | `h-20 px-4 sm:px-6`, desktop `lg:h-[92px] lg:px-8` |
| Hover State | `hover:bg-surface-secondary` |
| Accent/Theme Toggle | Kimi badge icon `text-accent`, avatar `bg-accent text-accent-foreground` |

**Pattern notes:**
- Header mirrors the dashboard screenshot with a right-aligned Kimi badge and user menu on desktop.
- On mobile it shows a compact product label while the full sidebar is hidden.
- The header includes the mobile menu button that opens the sidebar drawer on tablet and mobile breakpoints.
- The menu button is the only trigger for the drawer on small screens, keeping the interaction predictable.

### Interview Setup

#### Start New Interview Page
File: `src/components/interview-setup/InterviewSetupPage.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface`, page shell inside `DashboardShell` |
| Border | `border border-border`, section dividers `border-b border-border`, `border-t border-border` |
| Border radius | Section cards `rounded-xl`, inner field/icon shells `rounded-xl`, tags `rounded-md`, CTA `rounded-lg` |
| Text — primary | `text-text-primary`, headings `text-[28px] font-bold`, section titles `text-[18px] font-semibold` |
| Text — secondary | `text-text-secondary`, labels `text-text-dark`, muted security/help copy `text-text-secondary` |
| Spacing | Page stack `gap-6`, cards `p-6`, fields `px-3 py-2` or `px-4 py-3`, summary stack `space-y-5` |
| Hover state | Buttons inherit shadcn token states: `hover:bg-accent-hover`, `hover:bg-surface-secondary`; selected option cards use `border-accent bg-accent-muted/40` |
| Shadow | `shadow-sm` throughout page surfaces and input-like rows |
| Accent usage | `bg-accent`, `bg-accent-light`, `bg-accent-lighter`, `text-accent`, success/warning/info token icon chips, selected checks `border-accent bg-accent` |

**Pattern notes:**
- The interview setup page uses a two-column dashboard composition: a flexible form stack on the left and a sticky summary card on desktop.
- Every setup section is a tokenized card with a short heading block, then dense form-like rows built from bordered surfaces rather than introducing new primitives.
- Icon-leading fields, upload panels, dropdown selectors, and selectable options all reuse the same rounded-xl + border-border + shadow-sm treatment so the full page reads as one system.
- Skill chips are removable inside the dropdown trigger without breaking the overall field chrome, which is the preferred pattern for future multi-select controls.
- Summary metadata uses compact icon chips plus split label/value rows, and the primary action stays isolated in its own bordered footer zone.

---

#### History Filters
File: `src/components/history/HistoryFilters.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-card` |
| Border | `border border-border` |
| Border radius | `rounded-2xl` |
| Text — primary | `text-text-primary` |
| Text — secondary | `text-text-secondary` |
| Spacing | Shell `p-4`, search field `h-12 pl-11`, filter buttons `h-12 px-4` |
| Hover state | `hover:bg-surface-secondary` on filter controls |
| Shadow | `shadow-sm` |
| Accent usage | `text-accent` only through shared button/input primitives |

**Pattern notes:**
- This is the standard history-page filter strip with a search field and three dropdown-style triggers.
- The controls are static right now, but the layout is ready for real filter state without changing the visual surface.

#### History Table
File: `src/components/history/HistoryTable.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface` card shell, table rows on `bg-surface` |
| Border | `border-b border-border` |
| Border radius | `rounded-2xl` shell, `rounded-md` actions |
| Text — primary | `text-text-primary` |
| Text — secondary | `text-text-secondary` |
| Spacing | Toolbar `p-4`, head cells `px-6 py-4`, rows `px-6 py-5`, footer `px-6 py-5` |
| Hover state | `hover:bg-surface-secondary` |
| Shadow | `shadow-sm` |
| Accent usage | score/status/type badges, action outline button, filter chips |

**Pattern notes:**
- History now uses a real TanStack Table with global search, role/type/time filtering, pagination, and a destructive delete action in the row overflow menu.
- The action column keeps a primary outline button plus a shadcn dropdown menu so row actions stay consistent with the rest of the dashboard UI.

#### History Pagination
File: `src/components/history/HistoryPagination.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | none |
| Border | none |
| Border radius | `rounded-md` on buttons |
| Text — primary | `text-text-primary` |
| Text — secondary | `text-text-secondary` |
| Spacing | footer row `px-1 pt-2`, buttons `h-10` |
| Hover state | `hover:bg-surface-secondary` |
| Shadow | none |
| Accent usage | current page `bg-accent-muted text-accent` |

**Pattern notes:**
- Pagination is intentionally lightweight and matches the compact footer treatment in the screenshot.
- The current page chip uses the same accent-muted treatment as the active sidebar item.

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
- The left panel now recreates the provided login mockup as a coded hero composition with the shared brand logo, floating insight cards, and the central AI illustration.
- Entrance motion uses Framer Motion spring/tween combos with reduced-motion fallback.
- Social auth actions are styled as secondary buttons with consistent icon containers and now use the actual provider logo assets from `public/images`.
- The left-side cards intentionally reuse the existing public icon assets so the visual language stays tied to the current asset set.
- Desktop spacing is compressed to fit the shell into the viewport height without introducing page scroll.
- Register mode uses the field order `username`, `email`, `create new password`, `confirm password` while keeping the same visual system as login.
- The form now uses TanStack Form field state plus Zod validation schemas, with a destructive alert summary above the inputs and inline error text beneath each invalid control.

#### Auth Hero Panel
File: `src/components/auth/AuthHeroPanel.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface-secondary`, ambient glows `bg-accent-light/10`, `bg-accent-light/30`, `bg-success-light/30`, `bg-surface-tertiary/70` |
| Border | `border-b border-border`, desktop divider `lg:border-r` |
| Border radius | `rounded-none` shell composition, floating cards `rounded-2xl` |
| Text — primary | `text-text-primary` |
| Text — secondary | `text-text-secondary`, `text-text-dark` |
| Spacing | Shell `px-10 py-10 xl:px-12 xl:py-12`, hero stack `mt-16`, support rail `mt-8` |
| Hover state | none |
| Shadow | `shadow-[0_18px_40px_rgba(16,24,40,0.08)]`, `shadow-sm` on brand/support chip |
| Accent usage | `bg-accent-light`, `bg-accent-lighter`, `text-accent`, `bg-accent-foreground/20` |

**Pattern notes:**
- This component owns the left auth illustration panel and keeps the shared brand lockup, central robot illustration, floating insight cards, and privacy chip together.
- It is responsible for the motion-heavy hero half of the split screen, while the right panel stays focused on form interactions.

#### Auth Form Panel
File: `src/components/auth/AuthFormPanel.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface` |
| Border | shared shell divider from `AuthScreen` |
| Border radius | form controls `rounded-xl` |
| Text — primary | `text-text-primary`, `text-text-dark` |
| Text — secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | Shell `px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-10 xl:px-14 xl:py-12`, input rows `space-y-4 xl:space-y-5` |
| Hover state | `hover:border-accent-light`, `hover:bg-surface-secondary`, `hover:text-accent-hover` |
| Shadow | `shadow-sm`, `shadow-[0_16px_30px_rgba(103,64,250,0.25)]` on submit |
| Accent usage | `bg-accent`, `focus:ring-accent`, `text-accent`, `border-error/20` for validation alert |

**Pattern notes:**
- This component owns TanStack Form state, Zod validation, the top-level destructive alert summary, and the login/register field arrangement.
- Keep future auth or onboarding forms aligned to this layout pattern so validation and field messaging stay consistent.

#### Auth Text Field
File: `src/components/auth/AuthTextField.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface` |
| Border | `border border-border` |
| Border radius | `rounded-xl` |
| Text — primary | `text-text-primary` |
| Text — secondary | `text-text-secondary`, `text-text-muted` |
| Spacing | Shell `px-4 py-2.5`, desktop `xl:py-3` |
| Hover state | focus-within `border-accent`, `focus-within:ring-1 focus-within:ring-accent` |
| Shadow | none |
| Accent usage | `text-accent` via icons and focus ring |

**Pattern notes:**
- This is the shared shell for auth text inputs so icon placement, label spacing, and inline error messaging stay identical across login and register modes.
- Reuse it for any future auth field with an icon and optional trailing control, instead of rebuilding the wrapper inline.

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
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | none |
| Welcome Typography | `text-3xl font-bold tracking-normal text-text-primary`, subtitle `text-base text-text-secondary` |
| CTA Button | `rounded-lg bg-accent px-6 py-5 text-accent-foreground hover:bg-accent-hover` |

---

#### Quick Stats Row
File: `components/dashboard/QuickStats.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Card Background | `bg-surface` |
| Border / Radius | `border border-border rounded-xl` |
| Value Typography | `text-sm font-bold text-text-primary` |
| Label Typography | `text-xs font-medium text-text-secondary` |
| Icon Treatments | `bg-accent-light`, `bg-success-light`, `bg-warning-light`, `bg-behavioral-light` |

---

#### Continue Interview Card
File: `components/dashboard/ContinueInterviewCard.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface` |
| Progress Bar Track/Fill | Track `bg-surface-secondary`, fill `bg-accent` |
| Resume Button | `bg-accent text-accent-foreground hover:bg-accent-hover` |
| Border / Radius | `border border-border rounded-xl` |
| Badge | `bg-accent-light text-accent rounded-full` |

---

#### Recent Performance Section
File: `components/dashboard/RecentPerformance.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface` |
| Score Chart Circle | CSS `conic-gradient` using `var(--color-accent)` and `var(--color-surface-secondary)` |
| Dropdown Trigger | `border border-border bg-surface hover:bg-surface-secondary rounded-md` |
| Metric Rows | `divide-y divide-border`, icon pills use semantic token backgrounds |

---

#### Upcoming Interview Tips
File: `components/dashboard/InterviewTips.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| Background | `bg-surface` |
| Tip List Spacing | `divide-y divide-border`, row `py-4 gap-4` |
| Icon Accents | `bg-success-lightest`, `bg-accent-lighter`, `bg-warning-light` |
| Hover State | `hover:bg-surface-secondary` |

---

#### Recent Interviews List
File: `components/dashboard/RecentInterviews.tsx`
Status: `Completed`

| Property | Class |
| :--- | :--- |
| List Row Background | `bg-surface`, hover `hover:bg-surface-secondary` |
| Border Separators | `divide-y divide-border` |
| Score Badge Colors | `bg-success-lightest text-success-foreground`, `bg-warning-light text-warning-foreground`, `bg-error-light text-error` |
| Spacing | Row `py-3.5 gap-4`, card `p-5 lg:p-6` |

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
