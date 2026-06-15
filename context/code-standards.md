# Code Standards

Coding standards, conventions, and rules for **IntervAI** Mock Interview Platform. All development must adhere strictly to these principles.

---

## 1. Type Safety (TypeScript)

- **Strict Mode**: Enable strict typing across the entire project. Do not use `any` unless absolutely unavoidable (e.g., when integrating with dynamic third-party JS objects where type definition is impossible, and even then, prefer `unknown`).
- **Implicit Casts**: Avoid implicit type coercion or loose casting. Use explicit runtime checks or assertions when necessary.
- **Interfaces vs Types**:
  - Use `interface` for definitions that represent objects, especially if they can be extended or implemented (e.g., component props, database records).
  - Use `type` for unions, intersections, primitives, tuples, or function signatures.
- **Component Props**: Declare explicit type interfaces for all React component props, naming them `ComponentNameProps` (e.g., `ScoreCardProps`).
- **Shared Types**: Keep global or shared types in `types/index.ts`. Do not duplicate types across files.

---

## 2. Component Structure (React & Next.js)

- **Server vs Client Components**:
  - Components are **Server Components by default**. Only use `"use client"` when the component uses browser APIs (e.g., Web Speech API, window events), React hooks (`useState`, `useEffect`, `useRef`, `useContext`), or custom client side hooks.
  - Keep client components as leaf nodes. Wrap client logic in compact modules and pass server-fetched data down as props.
- **Folder Organization**:
  - Core layouts in `components/layout/`.
  - Feature-specific UI in `components/[feature-name]/` (e.g., `components/dashboard/`, `components/analysis/`).
  - Raw UI components from `shadcn/ui` go strictly into `components/ui/`.
- **Export Style**: Use named exports for components (e.g., `export const ScoreCard = (...) => {}`) to enforce imports searchability and IDE refactoring safety.
- **Lint Rules**: Follow standard ESLint configs. No unused imports, no unescaped quotes in TSX (use `&apos;`, `&quot;`), and always provide `key` props for array maps.

---

## 3. Data Fetching & Mutations

- **Server Actions**:
  - Put user mutations (submitting form preferences, finishing interviews, user logins) in `actions/` files.
  - Handle form states using React transitions or `useActionState` (or similar Next.js-native hook depending on react/next version).
  - Return clean result objects: `{ success: boolean; data?: any; error?: string }`.
- **Database Access**:
  - Database queries are executed strictly on the server (inside Server Components, Route Handlers, or Server Actions).
  - Use the PostgreSQL connection pool from `lib/db.ts`.
  - **Parameterized Queries**: Always use parameters (`$1`, `$2`, etc.) to prevent SQL injection. Never concatenate raw SQL queries.
  - **Scoped Queries**: Always filter by the current logged-in user (`user_id = $1`) to enforce strict data ownership.
- **API Routes**:
  - Use Next.js Route Handlers (`app/api/.../route.ts`) for streaming AI responses, resume uploads, or proctoring violation alerts.
  - Put resource/interactor logic in `agent/` or `lib/` to keep route handlers lean.

---

## 4. State Management

- **Database / Server State**: Treat the database as the single source of truth. Rely on Next.js server actions and page revalidation (`revalidatePath`, `revalidateTag`) to refresh data.
- **URL Query Parameters**: Use URL parameters (`?id=...`, `?step=...`, `?filter=...`) to store UI states that can be bookmarked or shared (e.g., active step in wizard, history page filters, active interview ID).
- **React Context**: Limit Context to global concerns (e.g., theme providers, PostHog providers, or state management within a single multi-step wizard if needed). Never use Context as a general store for database values.

---

## 5. AI Agent & LLM Calls (Kimi 2.6)

- **Isolation**: All prompts and LLM-handling logic live in the `agent/` directory (e.g., `agent/interviewer.ts`, `agent/evaluator.ts`). Do not construct prompts or invoke Kimi directly inside route handlers, actions, or client files.
- **Strict Temperature Settings**:
  - **Question Generation**: Set temperature to `0.7` for creative, natural, and adaptive interview progression.
  - **Evaluation & Grading**: Set temperature to `0.2` for deterministic, structured grading metrics (scores 0-100, clarity, relevance, etc.) and standardized feedback outputs.
- **Response Validation**: Always validate the structure of JSON strings returned by Kimi before writing them to the database or passing them to the frontend.

---

## 6. Styling Conventions (Tailwind CSS v4)

- **Design System Tokens**: Use CSS variables or generated Tailwind v4 classes exclusively (e.g., `bg-accent`, `text-text-primary`, `border-border`).
- **No Hardcoded Hex values**: Do not include hardcoded color hex values (e.g., `bg-[#6740fa]`) or arbitrary Tailwind built-in colors (e.g., `bg-indigo-600`) in components. Refer to `ui-tokens.md` for proper mappings.
- **Layout Rhythm**: Use standard padding (`p-4`, `p-6`) and spacing (`gap-4`, `gap-6`) to maintain a clean layout rhythm.
- **Responsive Layouts**: Design mobile-first. Ensure all layout files handle screen sizes from 375px (mobile) to 1920px (desktop) without overlapping text or clipping containers.

---

## 7. Telemetry & Events

- **PostHog Integration**:
  - Track critical lifecycle events (e.g., `interview_started`, `question_answered`, `interview_completed`, `interview_abandoned`, `resume_uploaded`).
  - Match event schemas defined in `project-overview.md` exactly.
  - Do not track raw passwords or personal sensitive details in PostHog payloads.
