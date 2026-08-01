import type { ProgramPhase } from "@/types";
import { lesson, module, phase } from "./helpers";

/* ── P0: Web foundations (optional, product builders) ─────────────── */

export const basesPhase: ProgramPhase = phase({
  slug: "bases",
  title: "Web foundations (optional)",
  objective:
    "Give product builders (no-code → code) the web vocabulary and reflexes needed to follow the core track. Free to skip if basics are solid.",
  modules: [
    module({
      id: "svc-bases-m01",
      index: "01",
      title: "HTTP, HTML, useful JS",
      subtitle: "The bare minimum to understand what AI generates",
      duration: "30 min",
      difficulty: "intro",
      objectives: [
        "Read a request/response HTTP exchange",
        "Recognize minimal semantic HTML",
        "Understand fetch and async in modern JavaScript",
      ],
      lessons: [
        lesson({
          id: "svc-bases-m01-l1",
          title: "Request / response HTTP",
          objective: "Understand the request/response cycle and status codes.",
          concepts: ["HTTP methods", "status codes", "headers"],
        }),
        lesson({
          id: "svc-bases-m01-l2",
          title: "Minimal semantic HTML",
          objective: "Identify structural tags and their roles.",
          concepts: ["semantic tags", "page structure", "forms"],
        }),
        lesson({
          id: "svc-bases-m01-l3",
          title: "Useful modern JS",
          objective: "Read async JS: fetch, async/await, JSON.",
          concepts: ["fetch", "async/await", "JSON"],
        }),
      ],
      exercises: [
        {
          title: "Inspect a network flow",
          kind: "guided",
          brief:
            "Open DevTools on a real page, inspect a network flow, and explain each step (request, status, response).",
        },
      ],
    }),
    module({
      id: "svc-bases-m02",
      index: "02",
      title: "Git & local project",
      subtitle: "Version cleanly from the first commit",
      duration: "35 min",
      difficulty: "intro",
      objectives: [
        "Use repo, commits, and branches day to day",
        "Keep `.env` out of versioned code",
        "Run a project's npm scripts",
      ],
      lessons: [
        lesson({
          id: "svc-bases-m02-l1",
          title: "Repo, commits, branches",
          objective: "Master the basic Git cycle on a solo project.",
          concepts: ["init/clone", "commit", "branches"],
        }),
        lesson({
          id: "svc-bases-m02-l2",
          title: ".env vs code",
          objective: "Understand why secrets never belong in the repo.",
          concepts: ["environment variables", ".gitignore", ".env.example"],
          pitfalls: ["committing a .env", "hard-coded secrets in code"],
        }),
        lesson({
          id: "svc-bases-m02-l3",
          title: "npm scripts",
          objective: "Read package.json and run dev/build/test.",
          concepts: ["package.json", "npm scripts", "node_modules"],
        }),
      ],
      exercises: [
        {
          title: "Bootstrap a clean project",
          kind: "guided",
          brief:
            "Initialize a project with correct .gitignore and .env.example, plus a clear first commit.",
        },
      ],
    }),
    module({
      id: "svc-bases-m03",
      index: "03",
      title: "Front ↔ API",
      subtitle: "Understand the dialogue between UI and server",
      duration: "40 min",
      difficulty: "beginner",
      objectives: [
        "Consume a JSON API from the front end",
        "Handle HTTP errors and basic CORS",
        "Model loading / error / success states",
      ],
      lessons: [
        lesson({
          id: "svc-bases-m03-l1",
          title: "JSON and HTTP errors",
          objective: "Read a JSON response and react to error codes.",
          concepts: ["JSON", "4xx vs 5xx", "error handling"],
        }),
        lesson({
          id: "svc-bases-m03-l2",
          title: "Basic CORS",
          objective: "Understand why the browser blocks some requests.",
          concepts: ["same-origin", "CORS", "preflight"],
        }),
        lesson({
          id: "svc-bases-m03-l3",
          title: "Loading / error / success states",
          objective: "Structure a UI around the three states of a request.",
          concepts: ["request states", "user feedback"],
        }),
      ],
      exercises: [
        {
          title: "Consume a public API",
          kind: "guided",
          brief:
            "Call a public API with error handling and display all three states.",
        },
      ],
    }),
  ],
  project: {
    title: "P0 project: Page connected to an API",
    deliverable:
      "A page that calls a public API and correctly shows loading / error / success.",
    assessment: [
      "All three states are visible and correct",
      "HTTP errors are handled explicitly",
      "The project is versioned cleanly (.gitignore, .env.example)",
    ],
  },
});

/* ── P1: Vibe coding foundations ─────────────────────────────────── */

export const fondationsPhase: ProgramPhase = phase({
  slug: "fondations",
  title: "Vibe coding foundations",
  objective:
    "Understand vibe coding, its real risks, and the Prompt → Audit → Ship cycle that makes it reliable.",
  modules: [
    module({
      id: "svc-fondations-m01",
      index: "01",
      title: "Vibe coding: promises and pitfalls",
      subtitle: "What AI does well, what it misses, and who is accountable",
      duration: "25 min",
      difficulty: "intro",
      objectives: [
        "Place the spectrum from autocomplete to autonomous agents",
        "Identify typical failures in generated code",
        "Own final responsibility: the developer signs off",
      ],
      lessons: [
        lesson({
          id: "svc-fondations-m01-l1",
          title: "The AI tools spectrum",
          objective: "Distinguish autocomplete, chat, IDE assistants, and agents.",
          concepts: ["autocomplete", "IDE assistants", "agents"],
        }),
        lesson({
          id: "svc-fondations-m01-l2",
          title: "Strengths and blind spots",
          objective: "Know what AI does well and what it systematically misses.",
          concepts: ["plausible but wrong code", "subtle flaws", "over-engineering"],
          pitfalls: ["blind trust", "unread code", "vague prompts"],
        }),
        lesson({
          id: "svc-fondations-m01-l3",
          title: "The developer signs off",
          objective: "Understand professional accountability for shipped code.",
          concepts: ["accountability", "mandatory review", "documented real failures"],
        }),
      ],
      exercises: [
        {
          title: "Post-mortem of an AI incident",
          kind: "audit",
          brief:
            "Analyze a real incident caused by unaudited AI code: root cause, missed signals, prevention.",
        },
      ],
    }),
    module({
      id: "svc-fondations-m02",
      index: "02",
      title: "The Prompt → Audit → Ship cycle",
      subtitle: "The thread running through the entire course",
      duration: "30 min",
      difficulty: "intro",
      objectives: [
        "Explain why there are three distinct stages",
        "Describe deliverables for each stage",
        "Prefer short loops over tunneling",
      ],
      lessons: [
        lesson({
          id: "svc-fondations-m02-l1",
          title: "Why three stages",
          objective: "Understand the specify / verify / ship separation.",
          concepts: ["Prompt = specify + generate", "Audit = checklists + evidence", "Ship = deliver with proof"],
        }),
        lesson({
          id: "svc-fondations-m02-l2",
          title: "Short loop vs tunnel",
          objective: "Iterate in small auditable loops rather than in a tunnel.",
          concepts: ["short iterations", "incremental review"],
          pitfalls: ["generating 2000 lines at once", "auditing only at the end"],
        }),
      ],
      exercises: [
        {
          title: "Full cycle on a micro-feature",
          kind: "guided",
          brief:
            "Run Prompt → Audit → Ship on a contact form: brief, generation, checklist, delivery.",
        },
      ],
    }),
    module({
      id: "svc-fondations-m03",
      index: "03",
      title: "The vibe coder's toolkit",
      subtitle: "Assistants, project rules, and deterministic scanners",
      duration: "35 min",
      difficulty: "beginner",
      objectives: [
        "Pick the right AI tool for the task",
        "Configure project rules and scanners",
        "Know when NOT to use AI",
      ],
      lessons: [
        lesson({
          id: "svc-fondations-m03-l1",
          title: "Assistants, agents, assisted review",
          objective: "Map tools to their use cases.",
          concepts: ["IDE assistants", "agents", "assisted review"],
        }),
        lesson({
          id: "svc-fondations-m03-l2",
          title: "Project rules and scanners",
          objective: "Constrain generation with rules and deterministic checks.",
          concepts: ["project rules", "lint", "secret scanning", "dependency audit", "Lighthouse"],
        }),
        lesson({
          id: "svc-fondations-m03-l3",
          title: "When not to use AI",
          objective: "Identify areas where generation is a bad bet.",
          concepts: ["crypto/fine-grained security", "critical business logic", "legal code"],
        }),
      ],
      exercises: [
        {
          title: "Minimal project tooling",
          kind: "guided",
          brief:
            "Configure project rules + lint + secret scanning on a starter repo.",
        },
      ],
    }),
  ],
  project: {
    title: "P1 project: Audit of an AI-generated repo",
    deliverable:
      "An audit report of an AI-generated repo: findings, severity, prioritized recommendations.",
    assessment: [
      "Fact-based findings with evidence (file, line)",
      "Severity justified and consistent",
      "Actionable, prioritized recommendations",
    ],
  },
});

/* ── P2: Prompt & product framing ──────────────────────────────── */

export const promptPhase: ProgramPhase = phase({
  slug: "prompt",
  title: "Prompt & product framing",
  objective:
    "Get good code more often—and frame a shippable MVP before generating anything.",
  modules: [
    module({
      id: "svc-prompt-m01",
      index: "01",
      title: "From need to shippable MVP",
      subtitle: "User stories, acceptance criteria, non-goals",
      duration: "40 min",
      difficulty: "beginner",
      objectives: [
        "Write user stories and acceptance criteria",
        "Make non-functional constraints explicit",
        "Break work into auditable tasks",
      ],
      lessons: [
        lesson({
          id: "svc-prompt-m01-l1",
          title: "User story and acceptance criteria",
          objective: "Write a testable need before any prompt.",
          concepts: ["user story", "acceptance criteria", "non-goals"],
        }),
        lesson({
          id: "svc-prompt-m01-l2",
          title: "Non-functional constraints",
          objective: "Bake in security, performance, and a11y from the start.",
          concepts: ["security", "performance", "accessibility"],
        }),
        lesson({
          id: "svc-prompt-m01-l3",
          title: "Break into auditable tasks",
          objective: "Produce work units you can verify one at a time.",
          concepts: ["breakdown", "task size", "definition of done"],
        }),
      ],
      exercises: [
        {
          title: "Prompt-ready brief",
          kind: "synthesis",
          brief:
            "Turn a vague client request into a prompt-ready brief: stories, criteria, non-goals, constraints.",
        },
      ],
    }),
    module({
      id: "svc-prompt-m02",
      index: "02",
      title: "Prompt techniques for product code",
      subtitle: "Minimal sufficient context, constrained output, iteration",
      duration: "45 min",
      difficulty: "beginner",
      objectives: [
        "Provide minimal sufficient context",
        "Constrain output (stack, style, tests)",
        "Iterate without drift and have AI critique the code",
      ],
      lessons: [
        lesson({
          id: "svc-prompt-m02-l1",
          title: "Minimal sufficient context",
          objective: "Give enough context—no more.",
          concepts: ["context", "relevant files", "noise"],
        }),
        lesson({
          id: "svc-prompt-m02-l2",
          title: "Constrain the output",
          objective: "Enforce stack, conventions, and tests in the prompt.",
          concepts: ["stack constraints", "conventions", "requested tests"],
        }),
        lesson({
          id: "svc-prompt-m02-l3",
          title: "Iterate and critique",
          objective: "Fix with targeted iterations; use AI as a reviewer.",
          concepts: ["targeted iteration", "AI self-review", "scope drift"],
          pitfalls: ["full reprompt on every error", "accepting the first answer"],
        }),
      ],
      exercises: [
        {
          title: "Same feature, three prompts",
          kind: "synthesis",
          brief:
            "Generate the same feature with three prompts of increasing quality and compare outputs.",
        },
        {
          title: "Fix a vulnerable prompt",
          kind: "audit",
          brief:
            "Analyze a prompt that produces vulnerable code and fix it to get safe code.",
        },
      ],
    }),
    module({
      id: "svc-prompt-m03",
      index: "03",
      title: "Business constraints from the prompt",
      subtitle: "Anticipate auth, payments, notifications, and hosting in the brief",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Integrate third-party services from the framing stage",
        "Use a « product-ready » checklist",
        "Avoid throwaway prototypes",
      ],
      lessons: [
        lesson({
          id: "svc-prompt-m03-l1",
          title: "Anticipate third-party services",
          objective: "Plan auth, payments, notifications, and hosting in the initial brief.",
          concepts: ["auth", "payments", "notifications", "hosting"],
        }),
        lesson({
          id: "svc-prompt-m03-l2",
          title: "« Product-ready » checklist",
          objective: "Verify a brief covers what makes the product sellable.",
          concepts: ["product checklist", "go-to-market criteria"],
          pitfalls: ["throwaway prototype", "demo with no path to prod"],
        }),
      ],
      exercises: [
        {
          title: "Enrich a CRUD prompt",
          kind: "synthesis",
          brief:
            "Enrich a basic CRUD prompt with business constraints (auth, payments, notifications, environments).",
        },
      ],
    }),
  ],
  project: {
    title: "P2 project: CRUD feature generated from documented prompts",
    deliverable:
      "A CRUD feature + UI generated from prompts, with a prompt log and justification for each iteration.",
    assessment: [
      "Complete, honest prompt log",
      "Each iteration is justified",
      "Final code meets the brief and constraints",
    ],
  },
});

/* ── P3: Architecture of a vibe product ────────────────────────── */

export const architecturePhase: ProgramPhase = phase({
  slug: "architecture",
  title: "Architecture of a vibe product",
  objective: "Break down a shippable system before generating anything.",
  modules: [
    module({
      id: "svc-architecture-m01",
      index: "01",
      title: "Break down the system",
      subtitle: "Front, API, DB, jobs, third-party services, and trust boundaries",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Identify building blocks of a full web product",
        "Trace trust boundaries",
        "Decide what AI must not invent on its own",
      ],
      lessons: [
        lesson({
          id: "svc-architecture-m01-l1",
          title: "System building blocks",
          objective: "Map front, API, DB, jobs, and third-party services.",
          concepts: ["front end", "API", "database", "jobs", "third-party services"],
        }),
        lesson({
          id: "svc-architecture-m01-l2",
          title: "Trust boundaries",
          objective: "Know where validation and authorization are mandatory.",
          concepts: ["trust boundaries", "validation at boundaries"],
        }),
        lesson({
          id: "svc-architecture-m01-l3",
          title: "What AI does not invent alone",
          objective: "Keep architecture and contracts under human control.",
          concepts: ["architecture decisions", "API contracts", "data schema"],
        }),
      ],
      exercises: [
        {
          title: "Architecture diagram of a minimal SaaS",
          kind: "synthesis",
          brief:
            "Produce the architecture diagram of a minimal SaaS: blocks, flows, trust boundaries.",
        },
      ],
    }),
    module({
      id: "svc-architecture-m02",
      index: "02",
      title: "Secrets & config per environment",
      subtitle: "Local, preview, prod: who sees what",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Distinguish runtime and build-time variables",
        "Organize local / preview / prod config",
        "Prevent leaks via Docker and CI",
      ],
      lessons: [
        lesson({
          id: "svc-architecture-m02-l1",
          title: "Runtime vs build-time",
          objective: "Understand when a variable is baked into the build.",
          concepts: ["build-time variables", "runtime variables", "Vite/env"],
          pitfalls: ["secret exposed in the front-end bundle"],
        }),
        lesson({
          id: "svc-architecture-m02-l2",
          title: "Environments and leaks",
          objective: "Structure local/preview/prod and block Docker/CI leaks.",
          concepts: ["environments", "Docker leaks", "CI leaks"],
        }),
      ],
      exercises: [
        {
          title: "Env var matrix",
          kind: "synthesis",
          brief:
            "Build the environment matrix (local/preview/prod) for a product with auth + payments.",
        },
      ],
    }),
    module({
      id: "svc-architecture-m03",
      index: "03",
      title: "Contracts & boundaries",
      subtitle: "Webhooks, idempotence, timeouts, retries",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Specify stable API contracts",
        "Design idempotent webhooks",
        "Handle timeouts and retries",
      ],
      lessons: [
        lesson({
          id: "svc-architecture-m03-l1",
          title: "Stable API contracts",
          objective: "Define contracts both sides can honor.",
          concepts: ["API contract", "versioning", "compatibility"],
        }),
        lesson({
          id: "svc-architecture-m03-l2",
          title: "Webhooks and idempotence",
          objective: "Handle a duplicate webhook without side effects.",
          concepts: ["webhooks", "idempotence", "timeouts", "retries"],
          pitfalls: ["processing the same event twice", "trusting payload without signature"],
        }),
      ],
      exercises: [
        {
          title: "Specify a payment webhook",
          kind: "synthesis",
          brief:
            "Specify a payment webhook: signature, idempotence, states, errors, and retries.",
        },
      ],
    }),
  ],
  project: {
    title: "P3 project: Target architecture for the capstone",
    deliverable:
      "The architecture dossier for the upcoming capstone: diagram, decisions, identified risks.",
    assessment: [
      "Readable diagram with trust boundaries",
      "Justified decisions (explicit trade-offs)",
      "Identified risks with mitigation",
    ],
  },
});
