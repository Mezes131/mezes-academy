# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Dates are in `YYYY-MM-DD` (UTC).

---

## [Unreleased]

### Planned

- **Pro tools transition phase** (VS Code, Git/GitHub, Vercel onboarding).
- **Capstone project** picker with 4–5 templates + branding customization
  (app name, colors, logo, short pitch).
- **Capstone submission** workflow (GitHub repo URL, live URL, checklist).
- **Private admin dashboard** on `/access/<slug>` with review queue,
  scoring rubric, and approve/request-changes actions.
- **Certificate emission** (PDF + public verification URL) on admin approval.
- **Public project gallery** with opt-in per learner + LinkedIn share.
- Spaced-repetition quick-review for past quizzes.
- Achievement / badge system.
- PWA offline polish.

---

## [0.4.0] — 2026-04-22

Account layer: every learner has a real profile and a cloud-synced progression.

### Added

- **Supabase authentication** (email + password) with email verification.
- **`/auth`** page: combined sign-in / sign-up with inline validation and
  humanized error messages. `?next=` redirects the learner back to their
  original destination after login.
- **Route guard** `<RequireAuth>` protecting `/react/*` and `/account`.
  Unauthenticated visitors are redirected to `/auth?next=...`.
- **Session bootstrap** with a 6 s safety timeout and a dedicated loading
  screen (logo, spinner, contextual hint after 3.5 s, reload action).
- **Admin hardening**: admins are never created through public sign-up.
  Promotion is done via SQL; admins sign in through a **separate private URL**
  (planned) — the public `UserMenu` no longer exposes any admin link.
- **Profile page `/account`** with 3 tabs (Overview · Preferences · Security):
  - Big gradient cover + **avatar uploader** (Supabase Storage bucket
    `avatars`, 2 MB cap, JPEG/PNG/WEBP only, old files cleaned up on replace).
  - **Inline-editable identity**: display name, public `@username` (unique,
    regex-validated), short bio (≤ 240 chars).
  - **Public links editor** (GitHub, LinkedIn, website) with URL validation.
  - **Profile completeness ring** (0–100%) with a contextual helper sentence.
  - **Progression snapshot side panel** with a CTA to the detailed view.
  - Preferences: light/dark theme and public-profile opt-in toggle.
  - Security: change password, request account deletion (mailto flow),
    read-only email with support contact note.
- **`UserMenu`** dropdown (avatar with initials or uploaded image) in both
  `LandingNav` and `CourseTopNav`, with quick links to profile, progress,
  bookmarks, and sign-out.
- **`SyncStatusBadge`** (pill in topbar + card on progress page) surfacing
  the local↔backend state: `hydrating | migrating | syncing | synced |
  offline | error`, with a manual retry when unreachable.
- **Cloud progression**:
  - `user_progress` table (JSON blob, RLS-scoped to `auth.uid()`).
  - One-shot migration of existing `localStorage` progress to the backend on
    first login, with a visible "migrating X items" state.
  - Debounced autosave on every progress change.
  - Offline-first fallback: stays writable even if the backend is unreachable.
- **Idempotent SQL migration** at `supabase/schema.sql` (profiles,
  user_progress, storage bucket + policies). Safe to re-run.
- Shared identity helpers (`getInitials`, `getDisplayName`, `isPlausibleUrl`)
  in `src/lib/identity.ts`, reused by the user menu and the account page.

### Changed

- `UserProfile` now includes `username`, `bio`, `avatarUrl`, `links`,
  `isPublic`.
- `useProgress` is now Supabase-aware: reads/writes backend when a session
  exists, falls back to `localStorage` otherwise.
- `LandingNav` CTA switches from "Access course" to "Continue" when the user
  is signed in, next to their avatar.
- `ScrollToTop` now smooth-scrolls to the target element on client-side
  hash navigation (so `/#catalog` works from anywhere in the app).

### Fixed

- Hash links in the landing nav (`#catalog`, `#how-it-works`) no longer
  produce URLs like `/account#catalog`; they consistently resolve to
  `/#section` via React Router.
- StrictMode double-mount could keep the Supabase auth lock busy and stall
  the loading screen; the session bootstrap is now resilient and decoupled
  from the background profile fetch.

---

## [0.3.0] — 2026-04-10

Turning the learning experience into something that can't be bypassed.

### Added

- **Anti-cheat frictions on code exercises**:
  - Paste disabled inside the Sandpack editor (global listeners + keyboard
    combo interception) with a discreet toast.
  - Solution is displayed in a dedicated **read-only panel**, with text
    selection and copy blocked.
  - "Reveal solution" button is **locked until `attemptsBeforeSolution`
    real runs** (default: 5).
  - Revealing the solution downgrades the final status from `solved` to
    `revealed` in progression stats.
- **Local validator** for exercises: deterministic offline JavaScript that
  inspects the sandbox files and returns `{ passed, total, failures? }`.
  Removes the dependency on remote test infra and the previous
  `col.csbops.io` timeout errors.
- **Progressive hints**: revealed one by one through an "Encore bloqué ?"
  button. Hint usage is persisted per exercise.
- **Phase challenge mode** (`/react/phase/:phaseId/challenge`): picks 3
  random challenge-eligible exercises from the phase with no solution
  access, tracks pass/fail per run, and saves the best attempt.
- **Strict module validation rule**: a lesson is only markable as "read"
  when its quiz is validated (≥ 70%) **and** every associated exercise is
  `solved` (no longer passes on mere `revealed`).
- `ExerciseStatus` type (`not-started | attempted | solved | revealed`) and
  richer per-exercise progress (`attempts`, `hintsUsed`, `revealedSolution`,
  `solvedAt`).

### Changed

- Exercise header reflects the rich status via dedicated badges.
- Progress page shows new breakdowns for solved vs. revealed exercises and
  validated challenges.
- Quiz retake now fully clears the stored score, resetting the module's
  read status when appropriate.

### Fixed

- Validating a quiz on one module no longer visually "validates" quizzes on
  other modules (missing `key` on `ModuleView` caused stale component
  state across route changes).
- Hiding the solution panel no longer wipes the learner's in-progress code
  (the editor is no longer remounted on solution toggle).

---

## [0.2.0] — 2026-03-28

Making the curriculum scalable.

### Added

- **Multi-course architecture** under `src/data/courses/*` with a unified
  registry and per-course metadata (`meta.ts`).
- **Modular phase structure**: `phases/<slug>/index.ts` re-exports a phase
  assembled from `modules/*`, `quizzes.ts`, and `exercises.ts`.
- Full content for phases **TypeScript**, **Ecosystem**, and **Expert**
  (previously scaffolds): modules, quizzes, mixed conceptual/code exercises.
- **Prefixed IDs** (`react-core-m11`, `react-intro-quiz-m03`, …) for global
  uniqueness across courses.
- **Landing catalog** (`src/data/catalog.ts`) auto-derived from the course
  registry, with placeholder tiles for upcoming tracks.

### Changed

- Renamed phases for clarity: `phase3 → core`, `phase4 → typescript`,
  `phase5 → ecosystem`, `phase6 → expert`.
- Improved dark-mode and light-mode color contrast (`src/index.css`):
  refined `--bg`, `--fg2`, `--fg3`, `--accent`, `::selection`, comment
  color, and added `@media (prefers-contrast: more)` overrides.

### Migrations

- Transparent localStorage migration v1 → v2 (prefixed IDs) and v2 → v3
  (new `exerciseProgress` + `challengeScores` shape, with a conservative
  backfill from legacy `completedExercises`).

---

## [0.1.0] — 2026-03-01

Initial MVP: an interactive React track inspired by a static HTML course.

### Added

- **Phases and modules** rendered from typed, declarative data
  (`Phase`, `Module`, `Quiz`, `CodeExercise`, `ContentBlock` union).
- **Content blocks**: `title`, `paragraph`, `info`, `highlight`, `lessons`,
  `code`, with dedicated renderers.
- **Interactive quizzes** with single- and multi-select questions, inline
  explanations, and a 70% pass threshold.
- **Live code exercises** via Sandpack, with starter / solution files,
  progressive hints, and a reveal button.
- **Progress tracking** in `localStorage`:
  - modules read, quiz scores, completed exercises, bookmarks, theme.
- **Global + per-phase progress bars** and a dedicated `/react/progress`
  dashboard.
- **Light / dark theme** with persistence.
- **Bookmarks** per module.
- **Full-text search** across modules, lesson titles, and descriptions.
- **Export / Import JSON** of the full progression for local backups.

[Unreleased]: https://github.com/OWNER/REPO/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/OWNER/REPO/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/OWNER/REPO/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/OWNER/REPO/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/OWNER/REPO/releases/tag/v0.1.0
