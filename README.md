# Mezes Academy

Mezes Academy is an interactive, certifying learning platform.  
Its first track — **React, from zero to expert** — transforms a dense curriculum
into an active journey: rich lessons, quizzes, live coding exercises, friction
against copy-paste, phase challenges, and a real-world capstone project that
earns a platform certificate.

> ⚛️ Stack: Vite · React 18 · TypeScript · Tailwind · Sandpack · Supabase

---

## 🎯 Product vision

- **Learn for real**, not just watch content. Every module validates through
a quiz and a hands-on exercise, with smart anti-cheat frictions.
- **Prove it ships**, not just "I finished the videos". The journey ends with
a capstone project built in a real-world toolchain (VS Code, Git/GitHub,
Vercel), reviewed by an admin, and rewarded with a signed certificate.
- **Be portable**. Each learner owns an account, their profile, their
progress, and (opt-in) their public project page.

> Pedagogy over volume. Friction over comfort. Results over completion rate.

---

## ✨ Core features

### Learning

- **Multi-phase React track** (Introduction → Core → TypeScript →
Ecosystem → Expert) built from typed, declarative data.
- **Rich lesson blocks**: titles, paragraphs, info boxes (tip / warn /
note / concept), highlights, lesson lists, syntax-highlighted code.
- **Quizzes** with single- or multi-select questions, explanations, and a
70% threshold to validate.
- **Live code exercises** powered by [Sandpack](https://sandpack.codesandbox.io/).
- **Progressive hints**, revealable solution (gated by attempts), and a
"Run + verify" button backed by a local, offline validator.
- **Phase challenges**: timed-style exam mode replaying 3 random exercises
from the phase without access to the solution.
- **Anti-cheat frictions**: paste disabled in the editor, solution viewer is
read-only and copy-protected, solution button locked until N real attempts,
and module "read" is only unlocked if its quiz **and** its exercises are
all solved.

### Account & progression

- **Supabase authentication** (email + password). Students sign up and verify
their email from the public landing.
- **Private admin URL** (`/access/<slug>`) — admins are never created through
public sign-up and do not share the student login surface.
- **Cloud-synced progression**: local progress is migrated once to the backend
on first login, then auto-saved with visible sync status.
- **Profile page `/account`**: avatar upload (Supabase Storage), display name,
public username, short bio, social links (GitHub / LinkedIn / website),
inline editing, profile completeness ring.
- **Preferences tab**: light/dark theme, public profile opt-in.
- **Security tab**: change password, request account deletion, email info.
- **Global progress dashboard** with per-phase progress and JSON export/import
as a local backup.

### Upcoming (on the roadmap below)

- Tutorial phase bridging the learner to **real pro tools** (VS Code, Git,
GitHub, Vercel).
- **Capstone project**: choose among 4–5 templates, customize branding
(name, colors, logo), build it locally, ship it on Vercel.
- **Admin review** of capstone submissions + **certificate emission**
(signed PDF + public verification URL).
- **Public gallery** of completed capstones with LinkedIn share.

---

## 🚀 Getting started

Prerequisites: Node.js ≥ 18, npm (or pnpm / yarn / bun).

```bash
npm install
cp .env.example .env        # fill in Supabase credentials
npm run dev
```

The app opens at [http://localhost:5173](http://localhost:5173).

### Supabase setup

1. Create a Supabase project (or reuse an existing one).
2. Copy `.env.example` to `.env` and set:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY` (or `VITE_SUPABASE_ANON_KEY`)
3. Open the **SQL Editor** and run `supabase/schema.sql`
  (idempotent — safe to re-run after updates).
4. Restart `npm run dev`.

The schema provisions:

- `public.profiles` — identity, bio, links, role, public opt-in.
- `public.user_progress` — JSON blob of the learner's progress.
- Row Level Security so each learner can only read/write their own rows.
- `storage.buckets.avatars` (public, 2 MB cap, image/ only) plus policies
restricting writes to `<user_id>/...`.

### Scripts


| Script               | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Vite dev server with HMR                    |
| `npm run build`      | Type-check + production bundle in `dist/`   |
| `npm run preview`    | Serve the production build locally          |
| `npm run type-check` | TypeScript type-check only (`tsc --noEmit`) |
| `npm run lint`       | ESLint across the codebase                  |


---

## 🧭 Architecture

```
react-learn/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── supabase/
│   └── schema.sql                 # Supabase migrations (idempotent)
└── src/
    ├── main.tsx                   # React entry point
    ├── App.tsx                    # Router, providers, route guards
    ├── index.css                  # Theme variables + Tailwind layers
    ├── types.ts                   # Domain-wide types
    │
    ├── data/                      # 📚 Curriculum (typed, declarative)
    │   ├── courses/react/phases/  #    Phase-level modules + exercises
    │   ├── catalog.ts             #    Landing catalog
    │   ├── phases.ts              #    Legacy aggregator
    │   └── index.ts               #    Unified helpers
    │
    ├── hooks/                     # ⚙️  Global logic
    │   ├── useAuth.tsx            #    Supabase session + profile
    │   ├── useProgress.tsx        #    Progress store + sync status
    │   ├── useThemeEffect.ts      #    Dark/light theme bridge
    │   └── useSearch.ts           #    Full-text module search
    │
    ├── components/
    │   ├── layout/                #    LandingNav, CourseLayout, Sidebar,
    │   │                          #    ScrollToTop, BackToTopButton
    │   ├── auth/                  #    RequireAuth, UserMenu, SyncStatusBadge
    │   ├── account/               #    AvatarUploader, InlineText,
    │   │                          #    LinksEditor, SidePanel (reusable)
    │   ├── learning/              #    Quiz, CodeExercise, ModuleView
    │   └── ui/                    #    Button, Badge, ProgressBar, InfoBox, …
    │
    ├── pages/                     # 📄 Pages = routes
    │   ├── LandingPage.tsx
    │   ├── AuthPage.tsx
    │   ├── account/AccountPage.tsx
    │   ├── ReactCoursePage.tsx
    │   ├── PhasePage.tsx
    │   ├── PhaseChallengePage.tsx
    │   ├── ModulePage.tsx
    │   ├── ProgressPage.tsx
    │   ├── BookmarksPage.tsx
    │   └── SearchPage.tsx
    │
    └── lib/
        ├── supabase.ts            # Typed Supabase client + `isSupabaseConfigured`
        ├── progressRemote.ts      # Load/save user_progress row
        ├── avatarStorage.ts       # Upload/remove avatars in Storage
        ├── identity.ts            # getInitials, getDisplayName, isPlausibleUrl
        └── utils.ts               # cn(), phaseAccent()
```

### Key patterns

- **Single progress store**: `ProgressProvider` keeps local state in sync with
`localStorage` and (when signed in) with Supabase. Exposes a `sync` state
(`idle | hydrating | migrating | syncing | synced | offline | error`) so the
UI can render a `SyncStatusBadge` anywhere.
- **Route protection**: `/react/`* and `/account` are wrapped in
`<RequireAuth>`. Unauthenticated users are redirected to `/auth?next=...`.
- **Declarative content**: a new module is just a typed object inside a phase
file. No custom component to write for new lessons.
- **Discriminated content blocks**: `ContentBlock` is a typed union so the
renderer is exhaustive by construction.
- **Anti-cheat scoped to the learner, not the platform**: blocks happen inside
the Sandpack editor only. Copy-paste elsewhere on the page is untouched.

---

## 📚 Adding content

A module is just a typed object inside its phase:

```ts
// src/data/courses/react/phases/core/modules/12-components-props.ts
{
  id: "react-core-m12",
  index: "M12",
  title: "Components & Props",
  subtitle: "Build reusable UI units",
  duration: "2 h",
  content: [
    { kind: "paragraph", html: "React is all about <strong>components</strong>..." },
    { kind: "info", box: { variant: "tip", title: "💡", body: "..." } },
    { kind: "lessons", items: [ { id: "12.1", title: "...", desc: "..." } ] },
  ],
  quiz: { /* ... */ },
  exercises: [ /* ... */ ],
}
```

### `ContentBlock` variants


| kind        | Usage                                         |
| ----------- | --------------------------------------------- |
| `title`     | H2-style section heading                      |
| `paragraph` | Body text with inline HTML allowed            |
| `info`      | Colored callout (tip / warn / note / concept) |
| `highlight` | Highlighted one-liner                         |
| `lessons`   | List of sub-lessons with tags                 |
| `code`      | Syntax-highlighted code sample                |


---

## 🎯 Live exercises (Sandpack + local validator)

Each `CodeExercise` defines:

- `starterFiles`   — the learner's starting point.
- `solutionFiles`  — revealed only after enough attempts, in a read-only panel.
- `hints`          — revealed one by one.
- `validator`      — **offline** JS snippet that inspects the current files
and returns `{ passed, total, failures? }`. Enables a deterministic
"Run + verify" button without depending on a remote runner.
- `template`       — `react` (default), `react-ts`, or `vanilla`.
- `attemptsBeforeSolution` — unlocks the solution button after N real runs
(default: 5).

The learner can **run**, **reveal the solution** (once unlocked), and
**restart the exercise from the starter**. The progress status is tracked per
exercise (`not-started | attempted | solved | revealed`).

---

## 💾 Progress storage

The progress blob contains:

- `readModules`         — ids of modules marked as read.
- `quizScores`          — each quiz's result and answers.
- `exerciseProgress`    — per-exercise status, attempts, hints used.
- `challengeScores`     — per-phase challenge attempts.
- `bookmarks`           — bookmarked modules.
- `theme`               — `"dark"` or `"light"`.

### Offline-first + cloud sync

Without a session, progress is kept in `localStorage`
(`react-learn:progress:v3`). When a learner signs in:

1. The client loads `user_progress` for that user.
2. If the backend is empty and local progress exists, it is **migrated once**
  to the backend (the UI shows a visible "Migrating…" → "Synced" state).
3. From there on, every mutation is debounced and persisted to Supabase.
4. If the backend is unreachable, the UI falls back to local and surfaces an
  `Offline` sync badge with a manual retry action.

---

## 🗺️ Roadmap

- Tutorial phase "Pro tools transition" (VS Code, Git, GitHub, Vercel).
- Capstone project picker (4–5 templates) + branding customization.
- Capstone submission workflow (repo + live URL + checklist).
- Admin review dashboard on a private URL.
- Certificate emission (PDF + public verification page).
- Public project gallery with opt-in + LinkedIn share.
- Spaced-repetition quick-review mode for past quizzes.
- Achievement & badge system.
- PWA / offline-first polish.

---

## 📝 License

© 2026 Mezes Corporation All rights reserved.