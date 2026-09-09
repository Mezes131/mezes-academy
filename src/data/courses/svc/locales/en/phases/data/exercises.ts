import type { AuditExercise } from "@/types";

export const dataExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-data-ex-m01-1",
    format: "audit",
    title: "Schema for a simple SaaS",
    instructions:
      "Check only fair statements about a minimal users / orgs / resources model. Flag AI over-engineering.",
    hints: [
      "Start from the product: who owns what, who belongs where.",
      "Extra tables with no need in the brief are often hallucinated.",
    ],
    scenario: `<p><strong>Brief:</strong> simple B2B SaaS. Users belong to organizations. Each org owns business resources (e.g. projects or documents).</p>
<p>An AI proposes: 18 tables including <code>legacy_sync_mirror</code>, duplicate <code>user_email</code> columns on every table, and no clear <code>org_id</code> on resources.</p>
<p>You must keep a minimal relational model with justified relations.</p>`,
    findings: [
      {
        id: "f1",
        label: "users, orgs, and a membership / join between them is a solid core for multi-tenant SaaS",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Resources should reference their owning org (foreign key / org_id) so tenancy is clear",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Migrations should version schema changes instead of editing production by hand",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Tables with no product need (e.g. unused « sync mirrors ») should be challenged before shipping",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Duplicating the same email column on every table « just in case » is good design",
        correct: false,
      },
      {
        id: "f6",
        label: "Skipping org ownership on resources is fine if ids are hard to guess",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Minimal SaaS core: users ↔ orgs (membership) + resources owned by org. Justify every relation. Drop hallucinated tables and redundant fields. Version changes with migrations.</p>`,
  },

  m02_1: {
    id: "svc-data-ex-m02-1",
    format: "audit",
    title: "Secure a generated endpoint",
    instructions:
      "Audit the AI endpoint. Check what must be true for a safe boundary.",
    hints: [
      "Never trust the client payload, even if the form already validated it.",
      "Authorization is different from « the request looked typed ».",
    ],
    scenario: `<p>AI-generated route: <code>POST /api/resources</code> creates a resource from <code>req.body</code> with no schema check, returns a raw string on failure, and lists all resources with <code>GET /api/resources</code> unbounded.</p>
<p>The UI hides the create button for guests, but the API does not verify the session or org membership.</p>`,
    findings: [
      {
        id: "f1",
        label: "Server-side validation of body fields (types, required, lengths) is mandatory",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "The endpoint must authorize the signed-in user for that org / action",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Typed / structured errors (status + stable code/shape) beat opaque string failures",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "List endpoints should paginate (limit + cursor or offset)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Hiding the button in the UI is enough to protect POST /api/resources",
        correct: false,
      },
      {
        id: "f6",
        label: "Trusting the client payload and skipping re-validation is fine",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Secure boundary: validate inputs, authorize on the server, return typed errors, paginate lists. UI hiding ≠ API safety.</p>`,
  },

  m03_1: {
    id: "svc-data-ex-m03-1",
    format: "audit",
    title: "Upload with access control",
    instructions:
      "Check fair findings about safe uploads, signed URLs, ACL, and quotas.",
    hints: [
      "A public bucket with no checks is not « simpler »: it is a leak.",
      "Signed URLs are time-scoped; ACL still decides who may request them.",
    ],
    scenario: `<p>Feature: users upload invoices for their org. AI ships: public object URLs, no size/type check, no per-org quota, and <code>GET /files/:key</code> returns any object if you know the key.</p>
<p>Market examples in the stack notes: object storage (S3-style) + app DB for metadata.</p>`,
    findings: [
      {
        id: "f1",
        label: "Validate file size and allowed types before accepting the upload",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Serve private files via short-lived signed URLs (or equivalent) rather than permanent public links",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Before issuing a download URL, verify the user may access that org's object (ACL)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "Quotas (per user / org) limit storage abuse and surprise bills",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Knowing the object key alone should grant access with no auth check",
        correct: false,
      },
      {
        id: "f6",
        label: "A fully public bucket is fine for private invoices",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Safe upload path: validate size/type, store privately, authorize before signed URL, enforce quotas. Object-key obscurity ≠ ACL.</p>`,
  },

  m04_projet: {
    id: "svc-data-ex-m04-projet",
    format: "audit",
    title: "P5 project: CRUD + upload + async job",
    instructions:
      "Before calling the data increment « production-ready » on the capstone, check what must be true.",
    hints: [
      "If CRUD skips server validation, the work is not done.",
      "Async jobs must be safe to retry (idempotent).",
    ],
    scenario: `<p>P5 project goal: business CRUD, file upload with access control, and one async job (e.g. send email via a third-party provider such as Resend, a market example), generated then audited.</p>
<p>An agent « finished »: create endpoint trusts the body, uploads go to a public folder, email is sent inside the HTTP handler with no idempotency key (double submit = double email).</p>`,
    findings: [
      {
        id: "f1",
        label: "Business CRUD validates inputs on the server and authorizes per resource / org",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Upload path: size/type checks, private storage, ACL before read/signed URL",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Slow work (email, etc.) is queued / run by a worker so it does not block the HTTP response forever",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "The async job is idempotent: retries do not duplicate side effects",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f5",
        label: "Retries use backoff / max attempts; permanent failures are visible (not infinite silent loops)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "Trusting the client body and a public upload folder is enough",
        correct: false,
      },
      {
        id: "f7",
        label: "Sending email twice on double submit with no idempotency key is acceptable",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>P5 checklist: validated + authorized CRUD, ACL-safe upload, async job with retries and idempotence. Public buckets and non-idempotent side effects = no.</p>`,
  },
};
