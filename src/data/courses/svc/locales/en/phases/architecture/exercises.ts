import type { AuditExercise } from "@/types";

export const architectureExercises: Record<"m02_1" | "m03_1", AuditExercise> = {
  m02_1: {
    id: "svc-architecture-ex-m02-1",
    format: "audit",
    title: "Environment matrix",
    instructions:
      "Product with sign-in and payments. Check only healthy rules for local, online preview, and production. Ignore dangerous shortcuts.",
    hints: [
      "Anything shipped to the browser can be read by anyone. Production secrets do not belong there.",
      "Local, online preview, and production use different secret sets.",
    ],
    scenario: `<p>You are preparing config for a small product: user accounts + Stripe payments. Three environments: local (your machine), online preview (temporary demo), production.</p>
<p>A teammate suggests: « Put the live Stripe key in the Vite front so it works everywhere. »</p>`,
    findings: [
      {
        id: "f1",
        label: "Production secrets only in server-side environment variables (never in code)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Distinct sets for local / online preview / production (not the same key everywhere)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "No payment secret key in the package sent to the browser",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "Build-time variables: only what can be public (e.g. public API URL)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Put the live Stripe key in the front « so it works everywhere »",
        correct: false,
      },
      {
        id: "f6",
        label: "Reuse production secrets on every developer laptop",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Healthy rules: server secrets in environment variables, separate sets per environment, nothing secret in the browser, build limited to public values. Live keys in the front and prod secrets on every laptop are anti-patterns.</p>`,
  },

  m03_1: {
    id: "svc-architecture-ex-m03-1",
    format: "audit",
    title: "Payment webhook",
    instructions:
      "You are specifying how to handle a payment webhook (notification from the provider). Check what must appear in a safe contract.",
    hints: [
      "Without signature checks, anyone can invent a « payment succeeded » event.",
      "The same event can arrive twice: your system must not credit twice.",
    ],
    scenario: `<p>Payment provider: sends an HTTP notification when a payment changes state. Your API must receive it, verify it, update the order, then respond.</p>
<p>An AI prompt suggested: « Accept the JSON body as-is and mark the order paid. No need for a signature. »</p>`,
    findings: [
      {
        id: "f1",
        label: "Verify the signature (or authenticity proof) before trusting the message",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Do not apply the same event twice (idempotency key / event id)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Define expected states (e.g. pending, paid, failed) and returned errors",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Bound retries and timeouts to avoid runaway loops",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Trust the JSON body without verifying the signature",
        correct: false,
      },
      {
        id: "f6",
        label: "Ignore duplicates and credit on every receipt",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Safe contract: signature, no double processing, clear states and errors, bounded retries / timeouts. Blindly accepting JSON or crediting every duplicate = incident.</p>`,
  },
};
