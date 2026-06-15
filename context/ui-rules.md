# UI Rules

Concise rules for building IntervAI UI. Use these rules as the source of truth for visual decisions. These rules cover the most important patterns and constraints to keep the UI consistent without over-specifying every detail.

---

## Font

Always import Inter via `next/font/google` in the root layout.

```typescript
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
```

The `--font-sans` variable is declared in `@theme` in `globals.css` (Tailwind v4). Apply the font variable class to the `<html>` or `<body>` tag in the root layout. Never use system fonts as the primary font.

---

## Layout

### Landing Page Layout
- Page max-width: 1440px, centered
- Top Navbar: height 64px, full width, white background (`bg-surface`), padding `px-4 sm:px-6 lg:px-8`
- Landing Footer: full width, white background (`bg-surface`), border `border-x border-b border-border`

### Dashboard / App Layout
- Left Sidebar: collapsible on mobile, includes "Powered by Kimi 2.6 AI" card
- Top Header: height 64px, includes Kimi 2.6 badge, theme toggle, "Hello, [Name]" user dropdown with avatar
- Main content area: full-width layout, padding `p-6` (24px) or `p-8` (32px), gap between page sections: `gap-6` (24px)

### Live Interview Layout
- Automatically enters/enlarges to full screen mode on launch
- Hidden dashboard sidebar and header to minimize distractions
- Top info bar: contains role, difficulty, interview type, and session countdown timer
- Right sidebar: Question list panel showing session questions (width 320px)
- Bottom action bar: contains notes, settings, and "End Interview" action

---

## Navigation

### Landing Navbar
Items: Features, How it Works, Pricing, Testimonials, FAQ. Plus "Log in" link and "Get Started" CTA button.
- Full desktop nav and auth actions should stay hidden below `lg`; tablet widths should collapse to the menu button so link labels never wrap.
- Landing anchor links should use native smooth scrolling, with section offsets preserved so the sticky navbar does not cover section headings.

### Auth Pages
- Use a split-screen shell with the illustration panel on the left and the form card on the right.
- The left panel should be treated as the visual hero of the page and should use the provided mockup artwork directly when available.
- Right-side form controls should use rounded-xl inputs, motion-based entrance, and the accent-colored primary action button.
- On desktop, the auth shell should fit the viewport height without page scrolling; tighten vertical spacing before expanding the page height.
- Register mode should present fields in this order: username, email, create new password, confirm password.

### Dashboard Left Sidebar
Items: Dashboard, History, Analytics, Settings.
- Active nav item: text `text-accent` (`#6740fa`), background `bg-accent-muted` (`#f9f7fc`), font weight `font-medium` (500)
- Inactive nav item: text `text-text-dark` (`#364153`), font weight `font-medium` (500)
- Hover state: text `text-accent`, background `bg-accent-lighter` or `bg-accent-muted`

---

## Cards

Every content section lives in a card.

```
background: bg-surface (#ffffff)
border: 1px solid var(--color-border) (#e7eaf3)
border-radius: 16px (rounded-2xl in Tailwind)
padding: 24px (p-6)
box-shadow: 0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)
```

**Variations:**
- Start Interview / Settings Summary Panel / Plan Cards: Use `rounded-xl` (12px) border radius with `p-6` padding.
- Pro Pricing Card: Highlights with `2px solid var(--color-accent)`.

---

## Typography Hierarchy

- **Logo text**: 19px, weight 700, line height 28px, color `text-text-darkest`
- **Page heading**: 28px, weight 700, line height 36px, color `text-text-primary`
- **Section heading**: 20px, weight 600, line height 28px, color `text-text-primary`
- **Card title**: 16px, weight 600, line height 24px, color `text-text-primary`
- **Stat number**: 30px, weight 600, line height 36px, color `text-text-primary`
- **Nav item / Card label**: 14px, weight 500, line height 20px, color `text-text-primary` / `text-text-secondary`
- **Badge text**: 12px, weight 500, line height 16px
- **Timestamp / Muted**: 12px, weight 400, line height 16px, color `text-text-muted`

---

## Badges & Tags

### Status Badges
All status badges use `border-radius: 9999px` (pill shape), padding `px-2 py-0.5`, text `text-xs font-medium`.
- **Answered / Completed**: `bg-success-lightest` / `text-success-foreground`
- **Current / In Progress**: `bg-accent-light` / `text-accent`
- **Pending**: `bg-surface-secondary` / `text-text-muted`
- **Incomplete**: `bg-info-lightest` / `text-info-foreground`

### Interview Type Badges
- **Technical**: `bg-technical-light` / `text-technical-foreground`
- **Behavioral**: `bg-behavioral-light` / `text-behavioral-foreground`

### Source Badges
- **LinkedIn**: `bg-linkedin-light` / `text-linkedin`
- **URL**: `bg-surface-secondary` / `text-text-secondary`

### Skill Tags
- `bg-accent-light` / `text-accent`, `rounded-md`, `px-2 py-1`, `text-sm font-medium`

---

## Buttons

**Primary Button:**
```
background: bg-accent (#6740fa)
text: text-accent-foreground (#ffffff)
border-radius: rounded-md
padding: px-4 py-2
font-weight: font-medium
hover: bg-accent-hover (#7c5cfc)
```

**Secondary Button:**
```
background: bg-surface (#ffffff)
border: border border-border
text: text-text-primary (#101828)
border-radius: rounded-md
padding: px-4 py-2
```

**Ghost Button:**
```
background: transparent
text: text-text-secondary
hover: bg-surface-secondary
border-radius: rounded-md
```

---

## Form Inputs

```
background: bg-surface (#ffffff)
border: border border-border
border-radius: rounded-md
padding: px-3 py-2
text: text-text-primary
placeholder: text-text-muted
focus: ring-1 ring-accent border-accent
```

---

## Tables (Interview History)

- No alternating row colors — white rows only, separated by border
- Row border: `1px solid var(--color-border)` between rows
- Column headers: uppercase, 12px, font-weight 500, color `text-text-secondary`
- Row text: 14px, color `text-text-primary`
- Hover state: `bg-surface-secondary`
- Score column badges are color-coded based on the score range.

---

## Match & Performance Indicators

### Score Progress Ring (Circular)
- Track: `bg-surface-secondary`
- Fill / Stroke: `bg-accent` / `var(--color-accent)`
- Stroke width: 6px
- Radius: rounded-full

### Score / Match Progress Bar (Horizontal)
- Track: `bg-surface-secondary`
- Fill: `bg-accent`
- Height: 6px
- Radius: rounded-full

### Performance Score Ranges & Colors
- **90-100% (Excellent)**: Green (`text-success` / `bg-success-lightest`)
- **70-89% (Good)**: Green (`text-success` / `bg-success-light`)
- **50-69% (Average)**: Orange (`text-warning` / `bg-warning-light`)
- **Below 50% (Poor)**: Red (`text-error` / `bg-error-light`)

---

## Empty States

Every section that can be empty must have an empty state:
- Short descriptive text in `color: text-text-muted`
- Optional icon above text (e.g. standard Lucide icon)
- CTA button if there's a logical next action

---

## Tailwind v4 Note

This project uses Tailwind v4. Tokens are defined with `@theme` in `app/globals.css`. Never define colors in a config file. Always use `@theme` for new tokens.

---

## Sequential Scroll Animations

When implementing sequential flow animations (like step-by-step instructions or onboarding wizards):
- Use **Framer Motion's** `useInView` hook (or native Intersection Observers) to trigger animation when the component is at least 15% visible.
- Use `<motion.div>` with spring physics configurations (e.g. `type: "spring", stiffness: 90, damping: 14`) for card entrance animations to give them a premium, organic feel.
- Manage staggered entry sequences by setting relative `delay` calculations based on element indices (`idx * 0.6` seconds).
- Animate connecting lines (horizontal on desktop, vertical on mobile) using `<motion.div>` with simple height/width ease transitions timed to start mid-reveal of their respective steps.

---

## Page Entrance Animations (GSAP)

When implementing top-of-page entry animations (such as the Hero section):
- Use **GSAP timelines** inside a React `useEffect` hook. Always run `gsap.context()` to scope element selections to the component's container and return `ctx.revert()` in the hook's cleanup function to prevent memory leaks during hot-reloads and route changes.
- Add an initial `opacity-0` class on the DOM elements to prevent layout flash (FOUC) before JavaScript compiles and GSAP starts.
- Use `gsap.set()` inside the context to set initial Y translations or scaling before building the timeline to avoid conflicts with Tailwind transition variables.
- Stagger animations using standard easing (e.g. `ease: "power3.out"`, `ease: "back.out(1.2)"` for interactive layouts) to keep the entrance feeling smooth and premium.

---

## Do Nots

- Never use Tailwind's built-in color classes (`bg-purple-500`, `text-gray-600`) — use project tokens only
- Never define colors in `tailwind.config.ts` — use `@theme` in `globals.css`
- Never add gradients to card backgrounds (except logo and subtle specific page glows)
- Never use more than one font weight in a single UI element
- Never show raw error messages to users — always show human-readable text
- Never stack more than 2 levels of border radius inside each other
- Never use `position: fixed` for layout sidebars/headers unless implementing mobile overlays
