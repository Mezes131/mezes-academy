# Secure Vibe Coding Strapi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move React Learn course content from TypeScript files into Strapi while
keeping Supabase responsible for authentication and learner data, and run the
web app, Strapi, PostgreSQL, and the deterministic audit worker as Docker
services.

**Architecture:** Strapi is the published-content API. The existing React/Vite
application consumes Strapi through a repository and mapper, while Supabase
continues to own Auth, profiles, progression, bookmarks, and submissions.
Docker Compose provides local orchestration with a deterministic audit worker.

**Tech Stack:** React 18, Vite, TypeScript, Strapi, PostgreSQL, Supabase,
Docker Compose, Nginx, Node.js worker, Sandpack.

## Global Constraints

- Preserve stable identifiers such as `react-core-m06`.
- Strapi is content-only; do not migrate Supabase Auth or progression.
- Never expose Strapi write credentials or Supabase service-role credentials to the browser.
- Keep `starterFiles`, `solutionFiles`, `tests`, and `validator` protected from public content responses.
- Store production secrets only in environment variables or the deployment secret store.
- Every production container runs as a non-root user and has a healthcheck.
- Docker Compose must run `web`, `strapi`, `postgres`, and `worker` locally.
- No Kubernetes is required for the MVP.
- Keep the existing React UI and domain types unless a change is required by the content adapter.

---

## File Map

### Create

- `docker-compose.yml`: local orchestration.
- `Dockerfile`: production build for the React/Vite web app.
- `nginx.conf`: static asset serving and SPA fallback.
- `.dockerignore`: excludes local dependencies, build output, and secrets.
- `.env.example`: documented local variables without secrets.
- `strapi/`: Strapi application, content-types, policies, and seed data.
- `worker/`: deterministic audit worker and its Dockerfile.
- `src/lib/strapi/client.ts`: read-only Strapi HTTP client.
- `src/lib/strapi/courses.ts`: course queries.
- `src/lib/strapi/mapper.ts`: Strapi response to existing domain types.
- `src/lib/strapi/types.ts`: minimal API response types.
- `src/lib/courseRepository.ts`: content source interface and implementations.
- `src/data/courses/staticCourseRepository.ts`: temporary static fallback.
- `src/lib/strapi/mapper.test.ts`: mapper contract tests.

### Modify

- `package.json`: add `test:mapper` using Vitest.
- `src/data/index.ts`: expose the repository without changing current consumers prematurely.
- `src/data/courses/index.ts`: route course lookup through the repository.
- `src/hooks/useProgress.tsx`: keep Supabase progress keyed by stable content IDs.
- `.gitignore`: ignore local Strapi uploads, worker artifacts, and environment files.

### Do not modify for the content migration

- `supabase/schema.sql`: retain the current Auth/profile/progress schema.
- `src/types.ts`: preserve existing public domain types; add fields only when the mapper requires them.
- `src/components/learning/CodeExercise.tsx`: continue consuming `CodeExercise`.

---

## Task 1: Container foundation

**Files:**

- Create: `docker-compose.yml`
- Create: `Dockerfile`
- Create: `nginx.conf`
- Create: `.dockerignore`
- Create: `.env.example`
- Modify: `.gitignore`

**Interfaces:**

- Produces services named `web`, `strapi`, `postgres`, and `worker`.
- Exposes the web on `http://localhost:5173`, Strapi on
  `http://localhost:1337`, and PostgreSQL only on the Docker network.

- [ ] **Step 1: Define the Compose services**

Use health-gated dependencies:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: strapi
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - strapi-db:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U strapi -d strapi"]

  strapi:
    build: ./strapi
    depends_on:
      postgres:
        condition: service_healthy

  web:
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      strapi:
        condition: service_started

  worker:
    build: ./worker
    depends_on:
      strapi:
        condition: service_started
```

Use an internal network for PostgreSQL and named volumes only for local
development data.

- [ ] **Step 2: Add the multi-stage frontend image**

Build with Node, then serve `dist/` with Nginx. Configure `try_files` in
`nginx.conf` so React Router deep links resolve to `index.html`.

- [ ] **Step 3: Add environment documentation**

Document `POSTGRES_PASSWORD`, `STRAPI_APP_KEYS`, `STRAPI_API_TOKEN`,
`VITE_STRAPI_URL`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_ANON_KEY` in
`.env.example`. Do not add values from `.env`.

- [ ] **Step 4: Verify the foundation**

Run:

```bash
docker compose config
docker compose build web
docker compose up -d postgres
docker compose ps
```

Expected: Compose validates, the web image builds, and PostgreSQL reports
`healthy`.

---

## Task 2: Bootstrap Strapi with PostgreSQL

**Files:**

- Create: `strapi/package.json`
- Create: `strapi/config/database.ts`
- Create: `strapi/config/server.ts`
- Create: `strapi/Dockerfile`
- Create: `strapi/.dockerignore`

**Interfaces:**

- Produces a Strapi service reachable from the web container as
  `http://strapi:1337`.
- Uses the `postgres` service, never a local SQLite database.

- [ ] **Step 1: Scaffold Strapi**

From the repository root, run `npx create-strapi-app@latest strapi --no-run`,
select PostgreSQL in the CLI prompts, and keep the generated application inside
`strapi/`.

- [ ] **Step 2: Configure database environment variables**

Map Strapi's database config to:

```text
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=${POSTGRES_PASSWORD}
```

- [ ] **Step 3: Add the Strapi Dockerfile**

Install dependencies, build the admin panel in the image build stage, and run
the production server as a non-root user. Add a healthcheck that requests the
Strapi health endpoint.

- [ ] **Step 4: Verify Strapi startup**

Run:

```bash
docker compose up -d postgres strapi
docker compose logs --no-log-prefix strapi
```

Expected: Strapi connects to PostgreSQL and the admin panel is reachable at
`http://localhost:1337/admin`.

---

## Task 3: Create the Strapi content model

**Files:**

- Create: `strapi/src/api/course/content-types/course/schema.json`
- Create: `strapi/src/api/phase/content-types/phase/schema.json`
- Create: `strapi/src/api/module/content-types/module/schema.json`
- Create: `strapi/src/api/lesson/content-types/lesson/schema.json`
- Create: `strapi/src/api/exercise/content-types/exercise/schema.json`
- Create: `strapi/src/api/quiz/content-types/quiz/schema.json`
- Create: `strapi/src/api/quiz-question/content-types/quiz-question/schema.json`
- Create: `strapi/src/api/quiz-answer/content-types/quiz-answer/schema.json`
- Create: `strapi/src/api/resource/content-types/resource/schema.json`
- Create: `strapi/src/components/lesson/text-block.json`
- Create: `strapi/src/components/lesson/code-block.json`
- Create: `strapi/src/components/lesson/callout-block.json`
- Create: `strapi/src/components/lesson/video-block.json`
- Create: `strapi/src/components/lesson/image-block.json`
- Create: `strapi/src/components/lesson/exercise-block.json`
- Create: `strapi/src/components/lesson/checklist-block.json`

**Interfaces:**

- Produces REST resources for `courses`, `phases`, `modules`, `lessons`,
  `exercises`, `quizzes`, and `resources`.
- Relations match `Course → Phase → Module → Lesson → Exercise`.

- [ ] **Step 1: Create Course, Phase, Module, and Lesson**

Add the fields and relations from the approved specification. Include
`legacyId` on Course, Phase, Module, Lesson, and Exercise. Add `order` to every
ordered child collection.

- [ ] **Step 2: Create Exercise fields**

Store Sandpack files as protected JSON fields. Restrict public API responses so
`solutionFiles` and `validator` are never returned to unauthenticated readers.

- [ ] **Step 3: Create quiz and resource types**

Create quiz relations and a Resource type with `access` set to
`public`, `enrolled`, or `instructor`.

- [ ] **Step 4: Create lesson components**

Create `text-block`, `code-block`, `callout-block`, `video-block`,
`image-block`, `exercise-block`, and `checklist-block`. Use relations for
exercise and checklist references instead of embedding their full data.

- [ ] **Step 5: Configure API permissions**

Allow unauthenticated read access only to published catalogue content. Deny
public create, update, and delete operations. Add a custom controller or
sanitized serializer for protected exercise fields.

- [ ] **Step 6: Verify the content model**

Create one test Course, Phase, Module, Lesson, Quiz, and Exercise in the
backoffice. Request the public endpoint and verify that draft content and
protected exercise fields are absent.

---

## Task 4: Import the current React course

**Files:**

- Create: `strapi/src/seed/react-course.ts`
- Create: `strapi/src/seed/README.md`
- Modify: `src/data/courses/react/program.ts` only if an export adapter is needed.

**Interfaces:**

- Produces Strapi records with stable IDs matching the current content.
- Does not write to Supabase or alter learner progress.

- [ ] **Step 1: Build a one-time importer**

Read the existing `reactProgram` structure and create records in this order:

```text
Course → Phase → Module → Lesson → Quiz → Exercise
```

Use `legacyId` as the idempotency key. Re-running the importer updates the
matching record instead of creating duplicates.

- [ ] **Step 2: Convert lesson blueprints**

Map `ProgramLesson.courseOutline` to lesson components, `QuizBlueprint` to
Quiz metadata, and concrete `CodeExercise` records to Exercise fields.

- [ ] **Step 3: Import in draft state**

Import all records as drafts. Publish only the first end-to-end module after
backoffice verification.

- [ ] **Step 4: Verify content parity**

Compare counts and IDs between the static course and Strapi. Verify that the
first module renders the same lesson, quiz, and exercise content.

---

## Task 5: Add the frontend Strapi repository

**Files:**

- Create: `src/lib/strapi/types.ts`
- Create: `src/lib/strapi/client.ts`
- Create: `src/lib/strapi/courses.ts`
- Create: `src/lib/strapi/mapper.ts`
- Create: `src/lib/courseRepository.ts`
- Create: `src/data/courses/staticCourseRepository.ts`
- Create: `src/lib/strapi/mapper.test.ts`
- Modify: `src/data/index.ts`
- Modify: `src/data/courses/index.ts`

**Interfaces:**

```ts
export interface CourseRepository {
  getCourse(slug: string): Promise<Course | null>;
  getModule(legacyId: string): Promise<Module | null>;
  search(query: string): Promise<Lesson[]>;
}
```

`StrapiCourseRepository` implements the interface with published Strapi data.
`StaticCourseRepository` preserves the current local fallback during rollout.

- [ ] **Step 1: Write mapper contract tests**

Install the only new frontend development dependency required by this plan and
add the test script:

```bash
npm install --save-dev vitest
```

```json
{
  "scripts": {
    "test:mapper": "vitest run src/lib/strapi/mapper.test.ts"
  }
}
```

Test that a Strapi document with nested relations maps to:

```text
Course.meta
Course.phases
Phase.modules
Module.lessons
Lesson.quiz
Lesson.exercises
```

Also test that missing optional media and missing optional quiz data do not
throw.

- [ ] **Step 2: Implement the read-only client**

Use `VITE_STRAPI_URL`, set a bounded request timeout, check `response.ok`, and
return a typed error without exposing credentials.

- [ ] **Step 3: Implement the mapper**

Map Strapi attributes to the existing `Course`, `Phase`, `Module`, `Lesson`,
`Quiz`, and `CodeExercise` types. Preserve `legacyId` as the domain `id`.

- [ ] **Step 4: Add the repository selector**

Use Strapi when `VITE_STRAPI_CONTENT_ENABLED=true`; otherwise use the static
repository. Keep the fallback explicit so an API outage cannot silently
overwrite learner data.

- [ ] **Step 5: Route one course page through Strapi**

Switch only the React course catalogue and one module page first. Leave the
remaining static pages untouched until parity is verified.

- [ ] **Step 6: Verify**

Run:

```bash
npm run type-check
npm run lint
npm run build
```

Run:

```bash
npm run test:mapper
npm run type-check
npm run lint
npm run build
```

Expected: all mapper cases pass and the production build succeeds.

---

## Task 6: Preserve Supabase Auth and progression

**Files:**

- Modify: `src/hooks/useProgress.tsx` only if content lookup currently assumes a static source.
- Modify: `src/lib/progressRemote.ts` only if a stable-ID boundary is missing.
- Test: existing progress migration behavior through the current build and a manual authenticated smoke test.

**Interfaces:**

- Supabase schema remains unchanged.
- Progress keys remain `react-*` identifiers.

- [ ] **Step 1: Confirm stable ID reads**

Verify that `markModuleRead`, quiz scores, exercise progress, bookmarks, and
challenge scores use IDs from the mapped domain objects, not array indexes.

- [ ] **Step 2: Keep local migration behavior**

Do not remove the existing v1 → v2 → v3 localStorage migration. Confirm that
an existing local progress payload still hydrates and syncs to the same
Supabase row.

- [ ] **Step 3: Verify authenticated behavior**

Run the app with Strapi content enabled and confirm:

```text
sign in → load progress → complete exercise → refresh → progress remains
```

---

## Task 7: Add the deterministic audit worker

**Files:**

- Create: `worker/package.json`
- Create: `worker/Dockerfile`
- Create: `worker/src/index.ts`
- Create: `worker/src/checks/secrets.ts`
- Create: `worker/src/checks/dependencies.ts`
- Create: `worker/src/checks/lighthouse.ts`
- Create: `worker/src/report.ts`
- Create: `worker/.dockerignore`
- Modify: `docker-compose.yml`

**Interfaces:**

```ts
export interface AuditJob {
  projectId: string;
  submissionId: string;
  checklistVersion: string;
}

export interface AuditReport {
  status: "completed" | "failed";
  findings: Array<{
    domain: "security" | "performance" | "design";
    severity: "info" | "low" | "medium" | "high" | "critical";
    title: string;
    evidence: string;
    recommendation: string;
  }>;
}
```

- [ ] **Step 1: Implement pure checks**

Each check accepts a bounded project workspace and returns findings without
network access. Do not execute untrusted project scripts inside the worker
container.

- [ ] **Step 2: Implement report persistence**

Write reports to the approved Supabase endpoint using a server-only key stored
in the worker environment. Never expose that key to `web` or Strapi.

- [ ] **Step 3: Add job handling**

Start with a simple polling endpoint or explicit command invocation. Avoid a
queue dependency until the first audit volume requires one.

- [ ] **Step 4: Verify isolation**

Run the worker image with a sample fixture and confirm it produces a report,
rejects oversized input, and cannot access PostgreSQL directly.

---

## Task 8: Backoffice workflow, checklists, and media

**Files:**

- Create: Strapi content-types for `Checklist`, `ChecklistItem`, `Rubric`, and `ProjectBrief`.
- Create: `strapi/src/api/course/policies/instructor-scope.ts` for instructor scope.
- Create: `strapi/src/api/phase/policies/instructor-scope.ts` for instructor scope.
- Create: `strapi/src/api/module/policies/instructor-scope.ts` for instructor scope.
- Create: `strapi/src/api/lesson/policies/instructor-scope.ts` for instructor scope.
- Create: `strapi/src/seed/checklists.ts`
- Modify: Strapi admin RBAC configuration.

**Interfaces:**

- Produces reusable Security, Performance, Design, and Accessibility
  checklists.
- Produces project briefs with `prompt`, `audit`, and `ship` stages.

- [ ] **Step 1: Create reusable checklist content**

Add versioned checklist items with a verification mode and evidence requirement.

- [ ] **Step 2: Add project brief relations**

Relate Course to ProjectBrief and ProjectBrief to stages, rubrics, and
checklists. Keep submissions in Supabase.

- [ ] **Step 3: Configure editorial roles**

Create administrator, pedagogical manager, instructor, and media editor roles.
Add custom policies for assigned-course filtering before granting write access.

- [ ] **Step 4: Configure media handling**

Use Strapi metadata for PDFs, code archives, and thumbnails. Store videos in a
video provider and keep only provider metadata in Strapi. Validate file type,
size, and access before generating download URLs.

- [ ] **Step 5: Verify no-code publishing**

A formateur must be able to create a draft module, attach a lesson resource,
submit it for review, publish it, and see it in the React frontend without a
code change.

---

## Task 9: End-to-end Docker verification

**Files:**

- Modify: `docker-compose.yml` if health or startup ordering fails.
- Create: `scripts/smoke-content.mjs`
- Create: `scripts/smoke-docker.ps1`

- [ ] **Step 1: Start the complete stack**

Run:

```powershell
docker compose up --build -d
docker compose ps
```

Expected: `postgres` is healthy and `strapi`, `web`, and `worker` are running.

- [ ] **Step 2: Verify content flow**

Run:

```powershell
node scripts/smoke-content.mjs
```

The script requests a published course, checks one phase/module/lesson, and
fails if protected exercise fields are present.

- [ ] **Step 3: Verify frontend deep links**

Request `/`, `/react`, `/react/module/<stable-id>`, and `/react/search` through
the web container. Each route must return the SPA shell and load without a
404 from Nginx.

- [ ] **Step 4: Run project checks**

Run:

```bash
npm run type-check
npm run lint
npm run build
docker compose config
```

Expected: all commands exit successfully.

---

## Delivery order

Implement and review the tasks in this order:

```text
1. Container foundation
2. Strapi + PostgreSQL
3. Strapi content model
4. Course importer
5. Frontend repository and mapper
6. Supabase compatibility
7. Deterministic worker
8. Backoffice workflow
9. End-to-end verification
```

Tasks 1–5 form the content migration sub-project. Tasks 6–8 can be reviewed
independently after the content contract is stable. Task 9 is the release
gate.

## Plan self-review

- Content types and relations: Tasks 3 and 8.
- Current static data migration: Task 4.
- React/Vite consumption: Task 5.
- Stable progress IDs and Supabase preservation: Task 6.
- Roles, permissions, media, and no-code publishing: Task 8.
- Docker web, Strapi, PostgreSQL, and worker: Tasks 1, 2, and 7.
- Deterministic audit only: Task 7.
- MVP to V1 sequencing: Delivery order and Task 8.
- Protected content and secrets: Tasks 3, 5, 7, and 8.
- No placeholders or deferred architectural decisions remain in the plan.
