import type { AuditExercise } from "@/types";

export const auditSecuriteExercises: Record<
  "m01_1" | "m02_1" | "m02_2" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-audit-securite-ex-m01-1",
    format: "audit",
    title: "Find and fix five leaks",
    instructions:
      "Audit the rigged repo. Check the accurate findings about secrets, history, and rotation.",
    hints: [
      "Code + tracked .env + Docker + history = leak surfaces.",
      "Fixing the file and skipping rotation leaves the secret compromised.",
    ],
    scenario: `<p>« AI-generated » repo: Stripe key in <code>src/lib/stripe.ts</code>, committed <code>.env</code>, <code>Dockerfile</code> that <code>COPY .env</code>, GitHub token in a sample README, and the key was pushed three commits ago (even if the current file looks « cleaned »).</p>
<p>Goal: spot at least five leaks / bad practices and the right fix (ignore + vault + rotation).</p>`,
    findings: [
      {
        id: "f1",
        label: "API key / secret pasted in source code = critical leak to remove and rotate",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Tracked .env must be untracked and listed in .gitignore",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Copying .env into the Docker image exposes secrets at runtime / in the registry",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "A secret already pushed remains in git history: rotation is mandatory",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f5",
        label: "« Example » tokens in the README may be real scraped secrets",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f6",
        label: "Deleting the line in the current file is enough even if you skip rotation or ignore files",
        correct: false,
      },
      {
        id: "f7",
        label: "Putting the secret key in VITE_/NEXT_PUBLIC_ on the client is safe",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Five typical surfaces: code, tracked .env, Docker, README, history. Fixes: placeholders, gitignore/dockerignore, vault/runtime env, rotate exposed secrets.</p>`,
  },

  m02_1: {
    id: "svc-audit-securite-ex-m02-1",
    format: "audit",
    title: "Exploit and fix an injection",
    instructions:
      "Check what is true about the injection and the fix (SQL/NoSQL/command).",
    hints: [
      "Concatenation = red flag.",
      "Bound parameters / shell-free APIs = baseline defense.",
    ],
    scenario: `<p>Training app: search <code>GET /search?q=</code> builds <code>SELECT * FROM items WHERE name LIKE '%\${q}%'</code>. Another endpoint runs <code>exec(\`ping \${host}\`)</code> for a « health check ». AI claims « input comes from the front so it's safe ».</p>`,
    findings: [
      {
        id: "f1",
        label: "SQL concatenation with user input is an exploitable SQL injection",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Parameterized queries (or a safe ORM) are the baseline fix",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Passing a user-controlled host to a shell (exec) opens command injection",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "Server-side validation / allowlists remain required even with a « nice » front end",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "« It comes from the front » is enough as an input control",
        correct: false,
      },
      {
        id: "f6",
        label: "Manually escaping apostrophes replaces bound parameters",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Proof: SQL or command payload on the endpoints. Fix: bound parameters, no shell, boundary validation. The front end is not a trust boundary.</p>`,
  },

  m02_2: {
    id: "svc-audit-securite-ex-m02-2",
    format: "audit",
    title: "Audit an XSS component",
    instructions:
      "Audit the React component. Check accurate findings about XSS and related uploads.",
    hints: [
      "dangerouslySetInnerHTML + user content = XSS.",
      "Sanitize or do not inject raw HTML.",
    ],
    scenario: `<p><code>CommentBody</code> component: <code>dangerouslySetInnerHTML={{ __html: comment.html }}</code> with no sanitizer. Comments come from the API. Avatar upload accepts any extension based on the client <code>Content-Type</code> and serves files from the same executable origin.</p>`,
    findings: [
      {
        id: "f1",
        label: "Unsanitized user HTML via dangerouslySetInnerHTML = XSS",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "You must sanitize (or avoid innerHTML) before rendering third-party HTML",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Trusting the client Content-Type for uploads is insufficient",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Serving executable uploads from the app increases risk",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "dangerouslySetInnerHTML is always safe in React 18+",
        correct: false,
      },
      {
        id: "f6",
        label: "The user-chosen filename can be used as-is for storage",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Sanitize / escaped text, and no untrusted raw HTML. Uploads: real type, size, random names, non-executable storage.</p>`,
  },

  m03_1: {
    id: "svc-audit-securite-ex-m03-1",
    format: "audit",
    title: "Access audit of the current app",
    instructions:
      "Check accurate findings for a route × role matrix on the capstone.",
    hints: [
      "IDOR = id in the URL with no ownership check.",
      "Webhooks and RLS are part of the surface.",
    ],
    scenario: `<p>Capstone product: <code>GET /api/invoices/:id</code> returns any invoice if you are « logged in ». <code>/api/admin/users</code> only checks <code>if (!user)</code> and skips a role check. Payment webhook has no signature verification. RLS « enabled » but policy <code>USING (true)</code> for anon on a sensitive table.</p>`,
    findings: [
      {
        id: "f1",
        label: "GET invoice by id with no ownership check = IDOR to fix",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Admin routes must check role rather than only session",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Webhooks must verify the provider signature",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "RLS with a fully permissive policy does not protect rows",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f5",
        label: "A route × role matrix with verdict and fix is the audit deliverable",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "Hiding the Admin link in the React menu is enough AuthZ",
        correct: false,
      },
      {
        id: "f7",
        label: "« RLS on » while skipping a read of the policies = surface audited OK",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Matrix: every route + webhook + RLS table. Fix IDOR (ownership), server roles, webhook signature, real policies rather than UI hiding.</p>`,
  },

  m04_projet: {
    id: "svc-audit-securite-ex-m04-projet",
    format: "audit",
    title: "Project P8: Security baseline report",
    instructions:
      "Before closing P8, check what must be true in the capstone Security baseline report.",
    hints: [
      "Full checklist: secrets, injections, AuthZ, deps.",
      "Every finding = evidence + fix; zero open criticals.",
    ],
    scenario: `<p>P8 goal: Security baseline report on the capstone, with evidence, fixes, and remaining items. An agent « shipped »: secrets still in history and not rotated, an IDOR route « to fix later », <code>dangerouslySetInnerHTML</code> on bios, package.json with invented deps and <code>"*"</code>, red <code>npm audit</code> ignored in CI.</p>`,
    findings: [
      {
        id: "f1",
        label: "The security-baseline checklist must be fully passed (or non-critical gaps documented)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Every report finding has evidence and an applied or planned fix",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "No open critical vulnerabilities (live secrets, IDOR, injection, trivial XSS)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "package.json cleaned: no hallucinated deps, pins / lock, audit triaged",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Secrets: not hardcoded, ignores OK, rotation if historical exposure",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f6",
        label: "Leaving criticals « for after launch » is acceptable in the baseline",
        correct: false,
      },
      {
        id: "f7",
        label: "Ignoring red npm audit and invented deps does not affect the report",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>P8 report: full checklist, evidence + fixes, zero open criticals, cleaned supply chain. « We'll see after launch » = no.</p>`,
  },
};
