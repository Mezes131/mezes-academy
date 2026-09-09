import type { AuditExercise } from "@/types";

export const hebergementExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-hebergement-ex-m01-1",
    format: "audit",
    title: "Choose for three products",
    instructions:
      "Check the correct findings for choosing hosting by product rather than by trend.",
    hints: [
      "PaaS vs VPS = cost, ops, cold start.",
      "Vercel / Fly / Railway / VPS are market options rather than a religion.",
    ],
    scenario: `<p>Three products: (A) marketing landing + mostly static React app, low traffic; (B) long-running API + workers where scale-to-zero risks the SLA; (C) custom stack (long processes, reverse proxy, cron) where the team owns ops.</p>
<p>An AI proposes « everything on the same free tutorial platform » with no cost / cold start / ops criteria.</p>`,
    findings: [
      {
        id: "f1",
        label:
          "Compare PaaS and VPS on cost, ops burden, and cold start before choosing",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label:
          "Vercel, Fly, Railway, VPS are market options: product fit comes first",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label:
          "A low-traffic landing and an SLA-sensitive API do not necessarily share the same host",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "Justify the choice by constraints (ops, cost, stack) for each product",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label:
          "Dumping everything on the latest AI tutorial platform with no criteria is best practice",
        correct: false,
      },
      {
        id: "f6",
        label: "Cold start and ops burden can be ignored « to ship »",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>A → simple PaaS often OK; B → watch cold start / always-on; C → VPS or more ops-heavy PaaS by skill. Three distinct justifications.</p>`,
  },

  m02_1: {
    id: "svc-hebergement-ex-m02-1",
    format: "audit",
    title: "Environment matrix",
    instructions:
      "Audit the multi-environment setup. Check what must be true.",
    hints: [
      "Local / preview / prod separated.",
      "VITE_* = client build, no secrets.",
    ],
    scenario: `<p>Capstone: a single committed <code>.env</code> with live Stripe key, prod Supabase URL, and <code>VITE_STRIPE_SECRET</code>. Preview and local point at the same prod DB. Preview payment webhooks hit the prod endpoint. No variables × env matrix.</p>`,
    findings: [
      {
        id: "f1",
        label: "Local, preview, and prod must have distinct configs and secrets",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Runtime secrets must not be committed or exposed to the client",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "VITE_* variables ship in the browser bundle: no secrets in them",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "A variables × environment matrix (local/preview/prod) is the expected deliverable",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Sharing prod DB and webhooks with preview is acceptable",
        correct: false,
      },
      {
        id: "f6",
        label: "One committed .env with live keys correctly simplifies deployment",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Separate the three envs, remove secrets from the repo and client, document the matrix. Preview is not prod.</p>`,
  },

  m03_1: {
    id: "svc-hebergement-ex-m03-1",
    format: "audit",
    title: "Pipeline that refuses",
    instructions:
      "Check what is true for a build/test/deploy pipeline with gates and rollback.",
    hints: [
      "Lint / audit / secret scan = blocking gates.",
      "Do not deploy until you have a rollback net.",
    ],
    scenario: `<p>Current CI: on push to main, build then immediate prod deploy. Lint runs as ignored warnings. No secret scanning. A <code>.env</code> with a key already leaked into an artifact. No documented rollback: « we manually redeploy the last good branch if it breaks ».</p>`,
    findings: [
      {
        id: "f1",
        label:
          "The pipeline must chain build, tests, and deploy with guardrails before prod",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label:
          "A gate must refuse deployment if lint/audit is red or a secret is detected",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "A rollback strategy (previous release / revert) must exist",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Deploying with no gates is a classic pitfall to fix",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Ignoring lint and secrets « to ship faster » is best practice",
        correct: false,
      },
      {
        id: "f6",
        label: "No planned rollback is fine as long as the build passes",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Add lint/audit/secret gates, block red deploys, document rollback. A pipeline that refuses beats a blind deploy.</p>`,
  },

  m04_projet: {
    id: "svc-hebergement-ex-m04-projet",
    format: "audit",
    title: "Project P10: Preview + prod deployment",
    instructions:
      "Before closing P10, check what must be true for go-live DNS and preview + prod deployment.",
    hints: [
      "Public HTTPS, preview distinct from prod, documented procedure.",
      "Domain, redirects, basic SPF/DKIM if email.",
    ],
    scenario: `<p>P10 goal: capstone on preview + prod, public HTTPS URL, documented pipeline or procedure. Current state: only an HTTP preview URL, no custom domain, no HTTP→HTTPS redirect, transactional email with no SPF/DKIM, preview and « prod » share secrets, no deployment notes. The team says « it's almost live ».</p>`,
    findings: [
      {
        id: "f1",
        label: "Prod accessible over HTTPS on a public URL",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Preview environment distinct from prod (config / secrets / URL)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Pipeline or deployment procedure documented",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "Go-live DNS checklist: domain/TLS, redirects, basic SPF/DKIM if sending email",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "A single HTTP preview with no HTTPS or docs is enough to close P10",
        correct: false,
      },
      {
        id: "f6",
        label: "Sharing preview/prod secrets and ignoring email DNS is OK",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>P10 = separated preview + prod, public HTTPS, DNS/TLS/redirects (+ email DNS if needed), documented deployment. « Almost live » is not enough.</p>`,
  },
};
