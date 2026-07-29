import type { AuditExercise } from "@/types";

export const fondationsExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m03_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-fondations-ex-m01-1",
    format: "audit",
    title: "Autopsy of an AI incident",
    instructions:
      "Read the scenario. Check only findings that hold up. Assign consistent severity. Submit your report.",
    hints: [
      "A secret key hard-coded in the repo is almost always critical or high severity.",
      "A TODO comment is not a security flaw on its own.",
    ],
    scenario: `<p>A startup let an AI agent « finish » user sign-in. Two days after go-live, a bot crawls the public mirror repo and finds a Stripe key <code>sk_live_…</code> saved in Git history in <code>src/lib/payments.ts</code>. Fraudulent charges appear. Nobody had read the 1800-line change preview.</p>
<p>Identify root causes and missed signals (not marketing symptoms).</p>`,
    findings: [
      {
        id: "f1",
        label: "Production secret saved in source code",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Large batch of changes accepted with no human line-by-line review",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "No automatic secret scan before integrating code",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "The React framework is outdated",
        correct: false,
      },
      {
        id: "f5",
        label: "The README uses too many emojis",
        correct: false,
      },
      {
        id: "f6",
        label: "Responsibility delegated to the agent (« AI generated it, so it is not on us »)",
        correct: true,
        minSeverity: "medium",
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Expected findings: hard-coded secret (critical), unread changes (high), no secret scan before integration (high), denial of responsibility (medium). UI/README distractors are not causes of this incident.</p>`,
  },

  m02_1: {
    id: "svc-fondations-ex-m02-1",
    format: "audit",
    title: "Prompt → Audit → Ship cycle on a contact form",
    instructions:
      "You must deliver a contact form. Check steps that are actually present in a healthy loop. Ignore what belongs to the tunnel.",
    hints: [
      "Delivering with no audit evidence is not « Ship » in this course.",
      "Generating 2000 lines at once before any checklist = tunnel.",
    ],
    scenario: `<p>Brief: contact page with name, email, message, send to API address <code>POST /api/contact</code>, loading / error / success screen states, no open spam.</p>
<p>A junior asked AI: « build my whole site ». It produced 12 files at once, published an online preview, then « we will audit later ».</p>`,
    findings: [
      {
        id: "f1",
        label: "Written brief (fields, API address, screen states, anti-spam) before generation",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Generation limited to the form (not the whole site)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label: "Audit checklist: field validation, network error handling, no secret in the browser",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Publish preview only after audit evidence on this increment",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Generate the whole product at once then audit at the end",
        correct: false,
      },
      {
        id: "f6",
        label: "Go to production with no checklist at all",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Healthy loop: brief → targeted generation → checklist with evidence → published preview. The tunnel « generate everything then see » and go-live without audit are anti-patterns.</p>`,
  },

  m03_1: {
    id: "svc-fondations-ex-m03-1",
    format: "audit",
    title: "Minimal tooling for a vibe project",
    instructions:
      "For a starter repo meant for vibe coding, check what must be in place from day 1.",
    hints: [
      "Project rules guide AI; automatic checks verify without opinion.",
      "A home-grown « quick » sign-in is not recommended tooling here.",
    ],
    scenario: `<p>You initialize the repo that will be the thread through to the final project. The team will use an in-editor assistant daily.</p>`,
    findings: [
      {
        id: "f1",
        label: "Project rules file (stack, conventions, forbidden patterns) readable by the assistant",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Automated code quality check, runnable locally and on the integration server",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label: "Secret scan (before each Git save or on the integration server)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Home-grown sign-in with SHA1 passwords « to go fast »",
        correct: false,
      },
      {
        id: "f5",
        label: ".gitignore covering node_modules and .env",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f6",
        label: "Open CORS with * on a private API « so it works »",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Day 1: project rules, quality check, secret scan, clean gitignore. No fragile home-grown sign-in nor CORS * on private APIs.</p>`,
  },

  m03_projet: {
    id: "svc-fondations-ex-m03-projet",
    format: "audit",
    title: "Project P1: audit report of an AI-generated repo",
    instructions:
      "From the fictional repo described below, produce a report: check real findings, set a credible minimum severity, and add short evidence (file or pattern).",
    hints: [
      "Each correct finding requires evidence (path or pattern).",
      "Prioritize security and secrets before UI polish.",
    ],
    scenario: `<p><strong>Repo « vibe-crm-starter »</strong> (generated by agent, single 95-file proposal):</p>
<ul>
<li><code>src/server/db.ts</code> contains <code>DATABASE_URL=postgres://admin:admin@prod/db</code></li>
<li><code>src/pages/Login.tsx</code> compares the password in plain text in the browser</li>
<li><code>package.json</code> has neither a quality check script nor tests</li>
<li><code>.gitignore</code> ignores <code>node_modules</code> but not <code>.env</code></li>
<li>The README promises « production ready » with no checklist</li>
<li>Theme colors are inconsistent (cosmetic)</li>
</ul>`,
    findings: [
      {
        id: "f1",
        label: "Database credentials (or full URL) hard-coded in code",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Password check in the browser / in plain text",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "No quality check or tests in npm scripts",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: ".env not ignored by Git",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "« Production ready » promise with no audit evidence",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "Cosmetic theme color inconsistency",
        correct: false,
      },
    ],
    requireEvidence: true,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Priority: database secrets (critical), browser-side sign-in (critical), .env not ignored (high), missing checks/tests and prod promise without evidence (medium). Inconsistent theme is not a security finding for this project.</p>`,
  },
};
