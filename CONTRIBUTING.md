# Contributing to Mezes Academy

Thanks for your interest in making Mezes Academy better. This document
captures how we work so the codebase stays consistent, the learning
experience stays trustworthy, and contributions can be reviewed fast.

> New here? Read the [README](./README.md) first, then this file.

---

## Philosophy

We build a certifying learning platform. A few principles guide every
decision:

- **Pedagogy over volume**: each module must actually teach something, not
  just exist. If a quiz or exercise doesn't sharpen the skill, it's noise.
- **Friction over comfort**: we accept a slightly harder UX (anti-paste,
  gated solutions, strict validation) when it protects learning quality.
- **Portable progress**: a learner owns their account, progress, profile,
  and (opt-in) their public project. Nothing should be locked inside a
  single device.
- **Admin stays private**: administrative surface is never exposed to the
  public navigation. Admin URLs, UIs, and actions live on their own path
  and are gated at the data layer (RLS) — not only in the UI.
- **Declarative content, typed everywhere**: new content is a typed object,
  not a bespoke component.

When in doubt, prefer the option that makes the learner's outcome more real
(a deployed project, a validated skill), even if it's harder to build.

---

## Ground rules

- Be respectful. Constructive feedback, concrete suggestions.
- No harassment, no discrimination.
- By contributing, you agree to the project's license terms.
- Never commit secrets. `.env` is in `.gitignore`; treat any accidental
  leak as an incident (rotate the key, force-push the commit out,
  notify the maintainer).

---

## Getting set up

### Prerequisites

- Node.js ≥ 18
- A Supabase project (free tier is fine) for auth + storage
- A text editor with TypeScript support (VS Code recommended)

### Local setup

```bash
git clone <your-fork-url>
cd react-learn
npm install
cp .env.example .env   # fill VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY
npm run dev
```

Then open the **Supabase SQL Editor** and run `supabase/schema.sql` once
(it is idempotent — re-running is safe when the schema evolves).

### Useful scripts

| Script               | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `npm run dev`        | Vite dev server with HMR                             |
| `npm run build`      | Type-check + production bundle in `dist/`            |
| `npm run preview`    | Serve the production build locally                   |
| `npm run type-check` | TypeScript only (`tsc --noEmit`)                     |
| `npm run lint`       | ESLint                                               |

Before opening a PR, at minimum run:

```bash
npm run type-check && npm run build
```

---

## Project structure

```
src/
├── App.tsx                     # Router, providers, route guards
├── main.tsx                    # React entry
├── types.ts                    # Domain types (content + progression)
│
├── data/                       # Curriculum (typed, declarative)
│   ├── courses/<id>/
│   │   ├── meta.ts             # Course metadata (title, tagline, icon, …)
│   │   └── phases/<slug>/
│   │       ├── modules/*.ts    # One file per module
│   │       ├── quizzes.ts
│   │       ├── exercises.ts
│   │       └── index.ts        # Assembles the phase
│   ├── catalog.ts              # Landing catalog (auto-derived)
│   └── index.ts                # Unified data helpers
│
├── hooks/                      # Global logic (one hook per concern)
│   ├── useAuth.tsx             # Supabase session + profile
│   ├── useProgress.tsx         # Progress state + sync status
│   ├── useThemeEffect.ts
│   └── useSearch.ts
│
├── components/
│   ├── layout/                 # LandingNav, CourseLayout, Sidebar, …
│   ├── auth/                   # RequireAuth, UserMenu, SyncStatusBadge
│   ├── account/                # AvatarUploader, InlineText, LinksEditor, …
│   ├── learning/               # Quiz, CodeExercise, ModuleView
│   └── ui/                     # Design-system primitives
│
├── pages/                      # Routes
│
└── lib/                        # Reusable, side-effect-free helpers
    ├── supabase.ts
    ├── progressRemote.ts
    ├── avatarStorage.ts
    ├── identity.ts
    └── utils.ts
```

Rules of thumb:

- `lib/` contains **stateless helpers**. No React, no hooks.
- `hooks/` contains **global state and side-effect bridges**. Anything the
  whole app must read should live here.
- `components/<domain>/` contains **reusable building blocks**. A page
  should mostly _assemble_ them, not reimplement them.
- `pages/` assembles layout + content. Thin orchestrators.
- `data/` is **content only**. No components, no JSX.

---

## Branching and commits

### Branches

- `main` — always deployable.
- Feature branches: `feat/<short-kebab-name>`.
- Bugfix branches: `fix/<short-kebab-name>`.
- Content branches: `content/<course>/<topic>`.
- Chore / refactor: `chore/<topic>`, `refactor/<topic>`.

### Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/).
Keep the subject imperative, ≤ 72 characters, scoped when relevant.

```
feat(account): add avatar uploader with Supabase Storage
fix(progress): keep editor state when toggling solution panel
refactor(profile-header): split into reusable components
chore(schema): bump avatars bucket size to 2 MB
docs(readme): document new sync status pill
content(react/core): add M15 advanced hooks quiz
```

Suggested types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`,
`test`, `build`, `chore`, `content`, `revert`.

---

## Pull requests

Before requesting review:

1. Pull `main`, rebase your branch, resolve conflicts.
2. `npm run type-check && npm run build` pass locally.
3. Manual sanity check of the affected flows (sign-in, module read,
   exercise run, profile edit, progress sync…).

A good PR description answers:

- **Why** is this change happening? (bug report, pedagogical goal, UX gap)
- **What** changed, at a high level?
- **Screenshots or clips** for any visible UI change.
- **Migration notes** if schema or stored shapes changed.
- **Testing** — manual steps and edge cases you covered.

Keep PRs focused. If a refactor sneaks in beside a feature, split it.

---

## Coding standards

### TypeScript

- Strict mode is on; keep it on. Prefer fixing the types over `any`.
- Prefer `interface` for public shapes, `type` for unions and narrow aliases.
- Export types from the module that owns the domain (e.g. `hooks/useAuth.tsx`
  exports `UserProfile`). Reuse them instead of duplicating fields.
- Never broaden a type just to make a test or a component happy. Narrow it
  where it belongs (usually at the data boundary).

### React

- Functional components, no classes.
- Hooks at the top of the function, no conditional hook calls.
- **One concern per component**. If a component accepts more than a few
  props that configure behavior, consider splitting it.
- Keep pages thin — they glue layout + data + components.
- Extract interactive widgets (editors, uploaders, menus) into
  `components/<domain>/` so they can be reused.
- Prefer _composition_ over prop sprawl. If a component needs ten props,
  it's probably two components.

### Styling

- Tailwind first, tokenized colors (`bg-bg`, `bg-bg-2`, `text-fg-2`,
  `accent`, `accent-2`, …). Avoid raw hex or named colors outside of
  decorative gradients.
- Use `cn()` from `src/lib/utils.ts` to compose classes conditionally.
- Respect the existing rhythm (`h-9`, `h-10`, `rounded-lg`, `rounded-xl`,
  `text-[11px] font-mono uppercase tracking-wider` for labels).
- Dark mode is the baseline; verify light mode still works.

### Accessibility

- Every actionable element must be reachable by keyboard.
- Visible focus rings: keep `focus-visible:ring-*` classes.
- `aria-label` on icon-only buttons.
- Respect reduced motion: avoid long auto-playing animations.
- Color-only cues are not allowed — double them with text or an icon.

### Forms and inputs

- Validate client-side for UX, server-side for truth.
- Normalize values at submit (trim, lowercase for usernames, etc.).
- Translate backend errors into human-readable French messages where the
  app already does so (`AuthPage`, `SecurityTab`, profile edits).

---

## Adding content

### Add a module to an existing phase

Create a new file under
`src/data/courses/react/phases/<phase>/modules/NN-topic.ts`:

```ts
import type { Module } from "@/types";

export const m13UseState: Module = {
  id: "react-core-m13",
  index: "M13",
  title: "useState",
  subtitle: "Make components remember things",
  duration: "2 h",
  content: [
    { kind: "paragraph", html: "State is how components <strong>remember</strong>..." },
    { kind: "info", box: { variant: "tip", title: "💡", body: "..." } },
    { kind: "lessons", items: [{ id: "13.1", title: "...", desc: "..." }] },
  ],
  quiz: /* … */,
  exercises: [/* … */],
};
```

Then re-export it from `phases/<phase>/index.ts`. IDs must stay unique
across courses (use the `<course>-<phase>-<key>` convention).

### Add a quiz

- 4 options is the sweet spot.
- Mix single-answer and multi-answer when it makes sense.
- Always provide an `explanation` — the quiz is a learning moment, not a
  gotcha.

### Add an exercise

Include:

- `starterFiles` the learner should realistically start from.
- `solutionFiles` minimal and idiomatic.
- `hints` that progressively unblock, not reveal the answer.
- A **`validator`** (offline JS string) that checks for real structural
  correctness — not a regex that a paste would satisfy. Reject patterns
  that look correct but break at runtime (e.g. `onClick={setCount(...)}`).
- `attemptsBeforeSolution` to tune the gating (default: 5).
- `challengeEligible: true` if the exercise makes sense in phase exam mode.

### Content quality bar

Before merging new content:

- Read it out loud — awkward phrasing jumps out.
- Execute the exercise yourself using the starter. Can you finish it
  without the solution? If not, improve the hints.
- Break the validator on purpose (wrong patterns) and confirm it fails.

---

## Supabase migrations

`supabase/schema.sql` is the single source of truth.

- All `create table` statements use `if not exists`.
- All `alter table` additions use `add column if not exists`.
- Constraints are added via a `DO $$ ... $$` block that checks
  `pg_constraint` first, so the script stays idempotent.
- Row Level Security is **mandatory** for any new table that references a
  user. Ship the policies in the same patch.
- Storage buckets use `on conflict (id) do update` to allow safe updates
  of limits and allowed MIME types.

When you change the schema:

1. Update `supabase/schema.sql`.
2. Note the change in `CHANGELOG.md` (under **Migrations** or **Changed**).
3. Mention it in the PR description so reviewers can re-run it locally.

---

## Security

- Auth and admin are separated. Never add the admin surface to the public
  UI (no "admin" link in the public `UserMenu`, no public link to
  `/access/...`).
- Treat the service role key as a secret — it must **never** leave the
  backend. The frontend uses the publishable/anon key only.
- If you find a security issue, do **not** open a public issue. Email the
  maintainer directly (see the README footer).

---

## Performance

- Don't import entire icon libraries — use the `lucide-react` tree-shaken
  imports only.
- Keep route-level chunks reasonable. If a new page brings heavy
  dependencies (editors, 3D, etc.), lazy-load it with `React.lazy`.
- Avoid unnecessary re-renders on the progress provider: mutations go
  through the existing `syncCompletedExercises` / `touch` helpers.

---

## Reviewing a PR

Reviewers should check:

- Does this _really_ improve learning outcomes, UX, or maintainability?
- Are types, Tailwind tokens, and layout patterns consistent with the rest?
- Is the change covered by the CHANGELOG?
- Are there RLS policies for any new table?
- Is the UI accessible (keyboard, focus, colors doubled)?
- Any console warnings or errors during manual checks?

When in doubt, request screenshots or a short Loom-style clip.

---

## Release process

Until the project hits `1.0.0`, minor versions (`0.x.0`) bundle meaningful
feature drops, patch versions (`0.x.y`) bundle fixes and small polish.

Steps:

1. Open a release PR that updates `CHANGELOG.md` (promote **Unreleased**
   to a new version) and bumps `package.json`.
2. Merge to `main`.
3. Tag the release (`git tag vX.Y.Z && git push --tags`).
4. Create a GitHub Release referencing the CHANGELOG entry.

---

## License

By submitting a contribution, you agree that it may be distributed under
the same license as the project.

Welcome aboard, and thank you for helping build something that teaches for
real. 🚀
