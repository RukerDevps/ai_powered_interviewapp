# UI Tokens

Design tokens for **Interv AI** — AI Mock Interview Platform. All colors, typography, spacing, and component values extracted directly from the delivered UI screenshots. Use these exact values throughout the codebase — never hardcode colors or use raw Tailwind color classes in components.

---

## How to Use

This project uses **Tailwind CSS v4**. All design tokens are defined using the `@theme` directive in `app/globals.css`. No `tailwind.config.ts` needed for colors or tokens.

Tailwind v4 automatically generates utility classes from `@theme` variables:

- `--color-accent` → `bg-accent`, `text-accent`, `border-accent`
- `--color-surface` → `bg-surface`, `text-surface`, `border-surface`

```tsx
// Correct — uses generated utility classes
className="bg-surface text-text-primary border-border"

// Also correct — references CSS variable directly
style={{ color: 'var(--color-text-primary)' }}

// Never — hardcoded hex values
className="bg-[#F6F7FB] text-[#101828]"

// Never — raw Tailwind color classes
className="bg-purple-500 text-gray-600"
---

## globals.css — Complete Token Definition
@import "tailwindcss";

@theme {
  /* Font */
  --font-sans: "Inter", sans-serif;

  /* Page and surface backgrounds */
  --color-background: #f6f4fd;
  --color-surface: #ffffff;
  --color-surface-secondary: #f9f8fe;
  --color-surface-tertiary: #f3f0fe;
  --color-surface-muted: #f5f0fd;

  /* Borders */
  --color-border: #e7eaf3;
  --color-border-light: #e5e7eb;
  --color-border-muted: #dfe1e7;

  /* Text */
  --color-text-primary: #101828;
  --color-text-secondary: #6a7282;
  --color-text-muted: #99a1af;
  --color-text-dark: #364153;
  --color-text-darker: #36394a;
  --color-text-darkest: #111827;
  --color-text-black: #131316;
  --color-text-slate: #272835;
  --color-text-slate-medium: #666d80;

  /* Primary accent — purple */
  --color-accent: #6740fa;
  --color-accent-hover: #7c5cfc;
  --color-accent-dark: #5a29f5;
  --color-accent-darker: #4621e7;
  --color-accent-light: #e8e2fd;
  --color-accent-lighter: #f3f0fe;
  --color-accent-muted: #f9f7fc;
  --color-accent-foreground: #ffffff;

  /* Success — green */
  --color-success: #10b981;
  --color-success-alt: #00bc7d;
  --color-success-dark: #007a55;
  --color-success-darker: #009966;
  --color-success-light: #d0fae5;
  --color-success-lightest: #ecfdf5;
  --color-success-foreground: #007a55;

  /* Info — blue */
  --color-info: #61a8ff;
  --color-info-dark: #155dfc;
  --color-info-medium: #2b7fff;
  --color-info-light: #dbeafe;
  --color-info-lightest: #eff6ff;
  --color-info-foreground: #155dfc;
  --color-info-muted: #94a2c5;

  /* Warning — orange/amber */
  --color-warning: #ff8904;
  --color-warning-light: #fef3c7;
  --color-warning-foreground: #92400e;

  /* Error — red */
  --color-error: #ef4444;
  --color-error-light: #fee2e2;
  --color-error-foreground: #ffffff;

  /* Behavioral — pink */
  --color-behavioral: #ec4899;
  --color-behavioral-light: #fce7f3;
  --color-behavioral-foreground: #be185d;

  /* Technical — amber/yellow */
  --color-technical: #f59e0b;
  --color-technical-light: #fef3c7;
  --color-technical-foreground: #92400e;

  /* LinkedIn brand */
  --color-linkedin: #0a66c2;
  --color-linkedin-light: #dce6f1;
  --color-linkedin-foreground: #ffffff;

  /* Dark overlays */
  --color-overlay: #111827;
  --color-overlay-dark: #131316;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-full: 9999px;
}

Tailwind v4 generates utility classes automatically from every --color-* token above:
bg-accent, text-accent, border-accent
bg-surface, text-surface-secondary
bg-success-light, text-text-muted
bg-behavioral-light, text-technical
etc.

## Color Usage Guide

### Page Layout

| Element            | Token                            |
| ------------------ | -------------------------------- |
| Page background    | `bg-background` (#f6f4fd)        |
| Card / surface     | `bg-surface` (#ffffff)           |
| Secondary surface  | `bg-surface-secondary` (#f9f8fe) |
| Sidebar background | `bg-surface-tertiary` (#f3f0fe)  |
| Default border     | `border-border`                  |
| Light border       | `border-border-light`            |


### Typography

| Element                | Token                           |
| ---------------------- | ------------------------------- |
| Headings, primary text | `text-text-primary` (#101828)   |
| Secondary text, labels | `text-text-secondary` (#6A7282) |
| Placeholder, muted     | `text-text-muted` (#99A1AF)     |
| Dark labels            | `text-text-dark` (#364153)      |
| Accent text (AI, etc.) | `text-accent-dark` (#5a29f5)    |


### Accent (Primary Purple)

Used for: primary buttons, active nav items, match score bars, tailored badge, focus rings

| Element                | Token                         |
| ---------------------- | ----------------------------- |
| Button background      | `bg-accent` (#6740fa)         |
| Button hover           | `bg-accent-hover` (#7c5cfc)   |
| Button text            | `text-accent-foreground`      |
| Dark accent text       | `text-accent-dark` (#5a29f5)  |
| Active nav background  | `bg-accent-muted` (#f9f7fc)   |
| Light badge background | `bg-accent-light` (#e8e2fd)   |
| Subtle background      | `bg-accent-lighter` (#f3f0fe) |


### Score Colors

Match score bars and indicators use gradient stops based on score range:

| Score Range | Color  | Token                                  |
| ----------- | ------ | -------------------------------------- |
| 90-100%     | Green  | `text-success` / `bg-success-lightest` |
| 70-89%      | Green  | `text-success` / `bg-success-light`    |
| 50-69%      | Orange | `text-warning` / `bg-warning-light`    |
| Below 50%   | Red    | `text-error` / `bg-error-light`        |


### Interview Status Badges

| Status      | Background             | Text                      |
| ----------- | ---------------------- | ------------------------- |
| Answered    | `bg-success-lightest`  | `text-success-foreground` |
| Current     | `bg-accent-light`      | `text-accent`             |
| Pending     | `bg-surface-secondary` | `text-text-muted`         |
| Completed   | `bg-success-lightest`  | `text-success-foreground` |
| Incomplete  | `bg-info-lightest`     | `text-info-foreground`    |
| In Progress | `bg-accent-light`      | `text-accent`             |


###Interview Type Badges
| Type       | Background            | Text                         |
| ---------- | --------------------- | ---------------------------- |
| Technical  | `bg-technical-light`  | `text-technical-foreground`  |
| Behavioral | `bg-behavioral-light` | `text-behavioral-foreground` |



### Source Badges

| Source   | Background             | Text                  |
| -------- | ---------------------- | --------------------- |
| LinkedIn | `bg-linkedin-light`    | `text-linkedin`       |
| URL      | `bg-surface-secondary` | `text-text-secondary` |



---

## Typography

| Element              | Size | Weight | Line height | Color token           |
| -------------------- | ---- | ------ | ----------- | --------------------- |
| Logo text            | 19px | 700    | 28px        | `text-text-darkest`   |
| Page heading         | 28px | 700    | 36px        | `text-text-primary`   |
| Section heading      | 20px | 600    | 28px        | `text-text-primary`   |
| Card title           | 16px | 600    | 24px        | `text-text-primary`   |
| Stat number          | 30px | 600    | 36px        | `text-text-primary`   |
| Nav item (active)    | 14px | 500    | 20px        | `text-accent`         |
| Nav item (inactive)  | 14px | 500    | 20px        | `text-text-dark`      |
| Card label           | 14px | 500    | 20px        | `text-text-secondary` |
| Body / activity text | 14px | 500    | 20px        | `text-text-primary`   |
| Badge text           | 12px | 500    | 16px        | varies by type        |
| Timestamp / muted    | 12px | 400    | 16px        | `text-text-muted`     |
| Trend badge text     | 12px | 500    | 16px        | `text-success-darker` |
| Stat subtitle        | 12px | 400    | 16px        | `text-text-muted`     |


Font family: Inter — import from Google Fonts or use next/font/google.

---

## Spacing

| Token       | Value      | Usage                 |
| ----------- | ---------- | --------------------- |
| `gap-1`     | 4px        | Tight inline gaps     |
| `gap-2`     | 8px        | Badge and tag gaps    |
| `gap-3`     | 12px       | Form field gaps       |
| `gap-4`     | 16px       | Section internal gaps |
| `gap-6`     | 24px       | Between sections      |
| `gap-8`     | 32px       | Page section gaps     |
| `p-4`       | 16px       | Card padding          |
| `p-6`       | 24px       | Large card padding    |
| `px-4 py-2` | 16px / 8px | Button padding        |
| `px-3 py-1` | 12px / 4px | Badge padding         |


---

## Component Tokens

### Cards

```
background: bg-surface
border: 1px solid var(--border)
border-radius: 16px (rounded-2xl in Tailwind)
padding: 24px (p-6)
box-shadow: 0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)
```

### Buttons

**Primary:**

```
background: bg-accent
text: text-accent-foreground
border-radius: rounded-md
padding: px-4 py-2
font-weight: font-medium
hover: bg-accent-hover
```

**Secondary:**

```
background: bg-surface
border: border border-border
text: text-text-primary
border-radius: rounded-md
padding: px-4 py-2
```

**Ghost:**

```
background: transparent
text: text-text-secondary
hover: hover:bg-surface-secondary
border-radius: rounded-md
```

### Input Fields

```
background: bg-surface
border: border border-border
border-radius: rounded-md
padding: px-3 py-2
text: text-text-primary
placeholder: text-text-muted
focus: ring-1 ring-accent
```

### Badges

```
border-radius: rounded-full
padding: px-2 py-0.5
font-size: text-xs
font-weight: font-medium
```

### Score Ring / Progress Circle

```
background track: bg-surface-secondary
fill: bg-accent
stroke: var(--color-accent)
stroke-width: 6px
border-radius: rounded-full
```

### Progress Bar

```
background track: bg-surface-secondary
fill: bg-accent
height: 6px
border-radius: rounded-full
```
### Trend Badges (stat cards)

```
background: bg-success-lightest
text color: text-success-darker
border-radius: 4px (rounded-sm)
padding: 2px 8px
font-size: 12px
font-weight: 500
```

### Activity Dots

| Activity Type                                     | Outer ring                | Inner dot               |
| ------------------------------------------------- | ------------------------- | ----------------------- |
| Resume tailored                                   | `#E8E2FD` (accent-light)  | `#6740FA` (accent)      |
| Cover letter                                      | `#DBEAFE` (info-light)    | `#61A8FF` (info)        |
| Job found                                         | `#D0FAE5` (success-light) | `#00BC7D` (success-alt) |
| Dot size: 8px inner, 16px outer with white border |                           |                         |

### Logo

```
background: linear-gradient(45deg, #6740FA 0%, #5A29F5 100%)
border-radius: 10px
size: 36x36px
text: "INTERV" + "AI" badge
```

---

## Interview Page Specific Tokens

### AI Interviewer Avatar

```
background: bg-accent-light
icon color: text-accent
size: 48x48px
border-radius: rounded-full
```

### Question List Sidebar

```
background: bg-surface
border-left: border-l border-border
width: 320px
```

### Question Status Indicators

| Status   | Number Circle                          | Badge Background      | Badge Text                |
| -------- | -------------------------------------- | --------------------- | ------------------------- |
| Pending  | `bg-surface-secondary text-text-muted` | —                     | —                         |
| Current  | `bg-accent text-accent-foreground`     | `bg-accent-light`     | `text-accent`             |
| Answered | `bg-success text-success-foreground`   | `bg-success-lightest` | `text-success-foreground` |

### Answer Input Area

```
background: bg-surface
border: border border-border
border-radius: rounded-lg
padding: p-4
min-height: 120px
```

---

## Pricing Page Tokens

### Plan Cards

**Standard Card:**
```
background: bg-surface
border: border border-border
border-radius: rounded-2xl
padding: p-6
```

**Pro Card (Most Popular):**
```
border: 2px solid var(--color-accent)
header-background: bg-accent
header-text: text-accent-foreground
background: bg-surface
border-radius: rounded-2xl
padding: p-6
```

### Toggle Switch

```
background: bg-accent
knob: bg-surface
inactive-background: bg-surface-secondary
```

---

## Login Page Tokens

### Split Layout

```
left-panel-background: bg-surface-tertiary
right-panel-background: bg-surface
divider: none
```

### Social Login Buttons

```
background: bg-surface
border: border border-border
text: text-text-primary
border-radius: rounded-md
padding: px-4 py-2
```

---

## Start Interview Page Tokens

### Section Cards

```
background: bg-surface
border: border border-border
border-radius: rounded-xl
padding: p-6
```

### Skill Tags

```
background: bg-accent-light
text: text-accent
border-radius: rounded-md
padding: px-2 py-1
font-size: text-sm
```

### Checkbox

```
checked-background: bg-accent
checked-icon: text-accent-foreground
unchecked-border: border-border
border-radius: rounded-sm
```

### Summary Panel

```
background: bg-surface-secondary
border: border border-border
border-radius: rounded-xl
padding: p-6
```
---

## Invariants

Never use hex values directly in components — always use CSS variables via Tailwind tokens
Font is Inter — always import via next/font/google, never use a fallback system font
Never use raw Tailwind color classes like bg-purple-500 or text-gray-600 — use project tokens only
--accent (#6740FA) is the only purple — never use Tailwind's built-in purple scale
Score indicators always use color tokens based on score range — never hardcoded colors
All borders default to --border (#E7EAF3) — never use border-gray-*
Interview type badges use --technical and --behavioral tokens exclusively
Status badges use semantic tokens (success, info, accent, warning, error)
