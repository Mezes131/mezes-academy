import type { AuditExercise } from "@/types";

export const authExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-auth-ex-m01-1",
    format: "audit",
    title: "Pick a model for three cases",
    instructions:
      "Check only fair statements. Ignore dangerous shortcuts the AI might suggest.",
    hints: [
      "An internal team tool does not need the same model as a consumer app.",
      "Homegrown auth is almost always a trap.",
    ],
    scenario: `<p><strong>Case A:</strong> B2B SaaS: many accounts per org, often Google Workspace.</p>
<p><strong>Case B:</strong> Consumer mobile-first app: fast sign-up, low friction.</p>
<p><strong>Case C:</strong> Internal tool for a 20-person SME already on Microsoft 365.</p>
<p>An AI prompt suggests for all three: « Homegrown auth with JWT in localStorage is simpler. »</p>`,
    findings: [
      {
        id: "f1",
        label: "Case A: OAuth / sign-in with an existing account (Google, etc.) + org roles is a good fit",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Case B: magic link (email) or a third-party provider can reduce friction",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label: "Case C: lean on the identity provider already in use (e.g. Microsoft) instead of homegrown auth",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Homegrown auth + JWT in browser storage for all three cases = anti-pattern",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Putting JWT in localStorage without thought is always best",
        correct: false,
      },
      {
        id: "f6",
        label: "Reinventing password hashing « to learn » in production is fine",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Match the model to the case (OAuth for B2B, magic link / provider for consumer, existing IdP internally). Homegrown + browser JWT for everything = no.</p>`,
  },

  m02_1: {
    id: "svc-auth-ex-m02-1",
    format: "audit",
    title: "Client SDK vs server checks",
    instructions:
      "You are wiring a sign-in provider. Check what is true for a healthy integration.",
    hints: [
      "The browser can lie. The server decides who is signed in for sensitive actions.",
      "The client SDK helps the UI; it does not replace server checks.",
    ],
    scenario: `<p>Flow: sign-up → sign-in → session. Provider: Supabase Auth (Clerk / Auth.js variants are similar).</p>
<p>A junior shipped: « if (user) showAdmin » only in React, with no check on <code>GET /api/admin/users</code>.</p>`,
    findings: [
      {
        id: "f1",
        label: "The client SDK may handle forms and display state",
        correct: true,
        minSeverity: "low",
      },
      {
        id: "f2",
        label: "Every sensitive API route must verify the session / token on the server",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Hiding an admin button in the UI does not protect the API",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Provider secrets stay out of the browser package",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f5",
        label: "If the SDK says the user is signed in, the API can trust that without checking",
        correct: false,
      },
      {
        id: "f6",
        label: "Paste the provider secret key into the front « to go faster »",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>SDK = UI comfort. Server = truth for rights. Secrets out of the browser. Hiding a button ≠ securing a route.</p>`,
  },

  m03_1: {
    id: "svc-auth-ex-m03-1",
    format: "audit",
    title: "Break then fix an IDOR",
    instructions:
      "Read the scenario. Check fair findings about the flaw and the fixes.",
    hints: [
      "IDOR: by changing the id in the URL / API, you reach someone else's resource.",
      "The fix is server-side (and maybe database rules), not UI-only.",
    ],
    scenario: `<p>Notes app. Signed in as Alice. <code>GET /api/notes/101</code> returns note 101. Alice tries <code>GET /api/notes/102</code> (Bob's note): the server returns Bob's note without checking ownership.</p>
<p>The UI hides the link to 102, but the API still answers.</p>`,
    findings: [
      {
        id: "f1",
        label: "This is an IDOR: access to someone else's resource via a manipulated id",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "The server must verify the signed-in user is allowed to access that note",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Hiding the link in the UI is not enough",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Database access rules (RLS / policies) or an equivalent check help block the leak",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "The issue is only a font size that is too small",
        correct: false,
      },
      {
        id: "f6",
        label: "If ids are « hard to guess », you can skip access control",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>IDOR = missing object-level authorization. Fix on the server (and policies if needed). UI and obscure ids do not protect you.</p>`,
  },

  m04_projet: {
    id: "svc-auth-ex-m04-projet",
    format: "audit",
    title: "P4 project: auth checklist + admin zone",
    instructions:
      "Before calling auth « production-ready » on the capstone product, check what must be true.",
    hints: [
      "Third-party provider > fragile homegrown auth.",
      "Admin zone = server-protected routes and data, not just a hidden page.",
    ],
    scenario: `<p>P4 project goal: auth via a third-party provider, protected admin zone, written access policy.</p>
<p>An agent « finished »: /admin shows if <code>localStorage.role === 'admin'</code>, password reset with the same link reusable for 30 days, no session revocation.</p>`,
    findings: [
      {
        id: "f1",
        label: "Sign-in via a third-party provider (not fragile homegrown auth)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Admin zone protected on the server (session / role checked on APIs)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Reset / email verification: single-use (or tightly limited) short-lived tokens",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Sessions: sign-out and revocation possible (multi-device)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Written access policy (who can do what) aligned with the code",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "Trusting localStorage.role for admin is enough",
        correct: false,
      },
      {
        id: "f7",
        label: "A reset link reusable for weeks is a good idea",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Checklist: third-party provider, server-side admin, short-lived single-use sensitive tokens, session revocation, written policy. localStorage.role and long-lived reset links = no.</p>`,
  },
};
