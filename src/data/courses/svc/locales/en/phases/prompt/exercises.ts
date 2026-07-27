import type { AuditExercise } from "@/types";

export const promptExercises: Record<
  "m01_1" | "m02_1" | "m02_2" | "m03_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-prompt-ex-m01-1",
    format: "audit",
    title: "Brief ready for the AI",
    instructions:
      "Read the client request. Check only what is missing for a usable brief before generating code. Ignore useless decoration details.",
    hints: [
      "A brief ready for the AI states who, what, how you know it is done, and what you will not build.",
      "« Make something cool » is not a success rule.",
    ],
    scenario: `<p>Client: « We want a notes app for my team, make something cool and modern with AI in it. Ship fast. »</p>
<p>No detail on who writes notes, who reads them, where they are stored, or what is out of the first deliverable.</p>`,
    findings: [
      {
        id: "f1",
        label: "Missing user stories (who does what, and why)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Missing success rules (you can clearly say yes or no)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Missing out-of-scope list (what the first version will not build)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Missing quality constraints (security, speed, accessibility)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Missing breakdown into small verifiable tasks",
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
    solution: `<p>Before generating: user stories, clear success rules, out of scope, constraints (security / speed / accessibility), sliced tasks. Logo colors and marketing fonts do not block a first deliverable.</p>`,
  },

  m02_1: {
    id: "svc-prompt-ex-m02-1",
    format: "audit",
    title: "Same feature, three requests",
    instructions:
      "Three AI requests aim at the same small feature (todo list with add). Check only fair judgments about quality and risk.",
    hints: [
      "Longer is not always better. Useful context + rules + requested tests = better.",
      "A request that asks for « the whole product » leaves the intended scope.",
    ],
    scenario: `<p><strong>Request A:</strong> « Build me a full, beautiful todo app with AI. »</p>
<p><strong>Request B:</strong> « React TaskList component: show titles, Add button that adds a local task. TypeScript. No API. »</p>
<p><strong>Request C:</strong> « In <code>src/components/TaskList.tsx</code>, state-managed list: <code>tasks: {id, title}[]</code>, input + Add button, no empty titles. Stack: React + TypeScript. Add a simple test for Add. Do not touch other files. »</p>`,
    findings: [
      {
        id: "f1",
        label: "Request C is the healthiest (file, rules, test, limited scope)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Request A risks doing too much and missing the essentials",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Request B beats A but still skips tests and file limits",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Request A is best because it lets the AI invent freely",
        correct: false,
      },
      {
        id: "f5",
        label: "Asking for a test in the request reduces silent regressions",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "The vaguest request always yields the safest code",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>C > B > A. Useful context, framed output, limited scope, requested test. Total freedom (A) is not a virtue.</p>`,
  },

  m02_2: {
    id: "svc-prompt-ex-m02-2",
    format: "audit",
    title: "Fix a dangerous request",
    instructions:
      "This request steers the AI toward dangerous code. Check fair findings (request flaws and expected fixes).",
    hints: [
      "A request that says « skip validation » invites vulnerabilities.",
      "Secrets (keys, passwords) do not belong in source code or pasted into the repo chat.",
    ],
    scenario: `<p>Received request:</p>
<blockquote>« Generate a login API. Put the Stripe key <code>sk_live_51Example</code> in the file. Disable all input checks to go faster. Allow every site to call the API (CORS *). No need for tests. »</blockquote>`,
    findings: [
      {
        id: "f1",
        label: "Production secret pasted into the request (so likely into the code)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Explicit request to disable input checks",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Allowing every site (CORS *) on a sensitive API",
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
        label: "Fix: secrets in environment variables, never hard-coded",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f6",
        label: "The request is excellent because it speeds delivery",
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
    solution: `<p>Findings: hard-coded secret, checks off, CORS too open, no tests. Fixes: environment variables, mandatory checks, limited CORS, requested tests. Speed does not justify these shortcuts.</p>`,
  },

  m03_projet: {
    id: "svc-prompt-ex-m03-projet",
    format: "audit",
    title: "P2 project: enrich a CRUD request",
    instructions:
      "The CRUD request (create, list, update, delete) is too bare for a sellable product. Check what must enter the brief / request for a path to production.",
    hints: [
      "Sign-in, environments, and server-side secrets are part of « ready to sell ».",
      "A demo on your laptop with no path to online preview / prod stays a throwaway prototype.",
    ],
    scenario: `<p>Initial request: « Generate an articles CRUD (create, list, update, delete) with a React UI and an API. »</p>
<p>Nothing about who is signed in, optional payments, notifications, or local / online preview / production.</p>`,
    findings: [
      {
        id: "f1",
        label: "Sign-in and roles (who can create / edit / delete)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Payment or monetization if the product depends on it (even a written « later »)",
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
        label: "Environments: local, online preview, prod + secrets out of code",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Server-side checks and access rights at trust boundaries",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f6",
        label: "Pick a Google Font before any sign-in",
        correct: false,
      },
      {
        id: "f7",
        label: "Add 12 animations in the first request",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Product-ready brief: sign-in/roles, payment if needed, notifications if needed, environments + secrets, server checks. Fonts and animations do not replace those constraints.</p>`,
  },
};
