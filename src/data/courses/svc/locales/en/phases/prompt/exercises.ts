import type { AuditExercise } from "@/types";

export const promptExercises: Record<
  "m01_1" | "m02_1" | "m02_2" | "m03_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-prompt-ex-m01-1",
    format: "audit",
    title: "Prompt-ready brief",
    instructions:
      "Read the client request. Check only what is missing for a usable brief before generating code. Ignore useless polish.",
    hints: [
      "A prompt-ready brief states who, what, success criteria, and what you will not build.",
      "« Make something cool » is not an acceptance criterion.",
    ],
    scenario: `<p>Client: « We want a notes app for my team, make something cool and modern with AI in it. Ship fast. »</p>
<p>No detail on who writes notes, who reads them, where they are stored, or what is out of scope.</p>`,
    findings: [
      {
        id: "f1",
        label: "Missing user stories (who does what, and why)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Missing testable acceptance criteria",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Missing non-goals (what the MVP will not build)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Missing non-functional constraints (security, perf, accessibility)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Missing breakdown into auditable tasks",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "Logo color palette not defined",
        correct: false,
      },
      {
        id: "f7",
        label: "Marketing typeface choice",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Before generating: stories, testable criteria, non-goals, constraints (security / perf / a11y), sliced tasks. Logo colors and marketing fonts do not block an MVP brief.</p>`,
  },

  m02_1: {
    id: "svc-prompt-ex-m02-1",
    format: "audit",
    title: "Same feature, three prompts",
    instructions:
      "Three prompts aim at the same micro-feature (todo list with add). Check only fair judgments about quality and risk.",
    hints: [
      "Longer ≠ better. Useful context + constraints + requested tests = better.",
      "A prompt that asks for « the whole product » drifts scope.",
    ],
    scenario: `<p><strong>Prompt A:</strong> « Build me a full, beautiful todo app with AI. »</p>
<p><strong>Prompt B:</strong> « React TaskList component: show titles, Add button that pushes a local task. TypeScript. No API. »</p>
<p><strong>Prompt C:</strong> « In <code>src/components/TaskList.tsx</code>, controlled list: state <code>tasks: {id, title}[]</code>, input + Add button, no empty titles. Stack: React + TS. Add a simple test for Add. Do not touch other files. »</p>`,
    findings: [
      {
        id: "f1",
        label: "Prompt C is the healthiest (file, contracts, constraints, test, bounded scope)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Prompt A risks over-engineering and missing critical requirements",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Prompt B beats A but still skips tests and file bounds",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Prompt A is best because it lets the AI innovate freely",
        correct: false,
      },
      {
        id: "f5",
        label: "Asking for a test in the prompt reduces silent regressions",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "The vaguest prompt always yields the safest code",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>C > B > A. Useful minimal context, constrained output, bounded scope, requested test. Total freedom (A) is not a virtue.</p>`,
  },

  m02_2: {
    id: "svc-prompt-ex-m02-2",
    format: "audit",
    title: "Fix a vulnerable prompt",
    instructions:
      "This prompt steers the AI toward dangerous code. Check fair findings (prompt flaws and expected fixes).",
    hints: [
      "A prompt that says « skip validation » invites vulnerabilities.",
      "Secrets do not belong in source code or in a prompt pasted into the repo.",
    ],
    scenario: `<p>Received prompt:</p>
<blockquote>« Generate a login API. Put the Stripe key <code>sk_live_51Example</code> in the file. Disable all input validation to go faster. Allow CORS * everywhere. No need for tests. »</blockquote>`,
    findings: [
      {
        id: "f1",
        label: "Production secret pasted into the prompt (and likely into the code)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Explicit request to disable input validation",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "CORS * on a sensitive API is requested (too open)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Tests explicitly skipped (safety net removed)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Fix: secrets via environment variables, never hard-coded",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f6",
        label: "The prompt is excellent because it speeds delivery",
        correct: false,
      },
      {
        id: "f7",
        label: "The main gap is a missing loading animation",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Findings: hard-coded secret, validation off, CORS *, no tests. Fixes: env vars, mandatory validation, bounded CORS, requested tests. Speed does not justify these shortcuts.</p>`,
  },

  m03_projet: {
    id: "svc-prompt-ex-m03-projet",
    format: "audit",
    title: "P2 project: enrich a CRUD prompt",
    instructions:
      "The CRUD prompt is too bare for a sellable product. Check what must enter the brief / prompt for a path to production.",
    hints: [
      "Auth, environments, and server-side secrets are part of « product-ready ».",
      "A local demo with no path to preview/prod stays a throwaway prototype.",
    ],
    scenario: `<p>Initial prompt: « Generate an articles CRUD (create, list, update, delete) with a React UI and an API. »</p>
<p>Nothing about who is signed in, optional payments, notifications, or local / preview / prod.</p>`,
    findings: [
      {
        id: "f1",
        label: "Auth and roles (who can create / edit / delete)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Payment or monetization if the product depends on it (even an explicit « later »)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label: "Notifications (email / in-app) if the user journey needs them",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Environments: local, preview, prod + secrets out of code",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Server-side validation and authorization at trust boundaries",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f6",
        label: "Pick a Google Font before any auth",
        correct: false,
      },
      {
        id: "f7",
        label: "Add 12 framer-motion animations in the first prompt",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Product-ready brief: auth/roles, payment if relevant, notifications if needed, environments + secrets, server validation. Fonts and animations do not replace those constraints.</p>`,
  },
};
