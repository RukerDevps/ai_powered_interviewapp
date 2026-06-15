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

## Do Nots

- Never use Tailwind's built-in color classes (`bg-purple-500`, `text-gray-600`) — use project tokens only
- Never define colors in `tailwind.config.ts` — use `@theme` in `globals.css`
- Never add gradients to card backgrounds (except logo and subtle specific page glows)
- Never use more than one font weight in a single UI element
- Never show raw error messages to users — always show human-readable text
- Never stack more than 2 levels of border radius inside each other
- Never use `position: fixed` for layout sidebars/headers unless implementing mobile overlays
