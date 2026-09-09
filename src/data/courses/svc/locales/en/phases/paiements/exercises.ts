import type { AuditExercise } from "@/types";

export const paiementsExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-paiements-ex-m01-1",
    format: "audit",
    title: "Pick the model for three products",
    instructions:
      "Check only fair statements about one-shot, subscription, and usage. Flag bad offer → technical mappings.",
    hints: [
      "Start from the product case rather than from the provider logo.",
      "Each model has different technical objects (single payment vs subscription vs meters).",
    ],
    scenario: `<p><strong>Three products:</strong> (A) template pack sold once; (B) Free/Pro monthly SaaS; (C) API billed per million requests.</p>
<p>An AI proposes the same « one-shot Checkout » for all three, grants Pro on redirect, and invents 8 « Enterprise Platinum » plans with no brief.</p>
<p>You must link each offer to the right model and a minimal technical mapping.</p>`,
    findings: [
      {
        id: "f1",
        label: "The template pack (A) fits a one-shot model (single payment → entitlement / delivery)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Free/Pro SaaS (B) maps to subscription: customer + plan/price + access lifecycle",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Volume API (C) needs usage-based meters / counters rather than only a one-off payment",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Offer ↔ technical-object mapping should be documented before integrating the provider",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "The same one-shot Checkout is enough for A, B, and C with no other model",
        correct: false,
      },
      {
        id: "f6",
        label: "Inventing plans « just in case » with no product need is good practice",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>A → one-shot; B → subscription (customer + plan + states); C → usage (meters). Document the mapping. Reject hallucinated plans and grant-on-redirect.</p>`,
  },

  m02_1: {
    id: "svc-paiements-ex-m02-1",
    format: "audit",
    title: "Free → Pro flow",
    instructions:
      "Audit the generated upgrade flow. Check what must be true (provider = market example such as Stripe).",
    hints: [
      "Secrets and session creation = server.",
      "Creating a session ≠ successful payment.",
    ],
    scenario: `<p>Goal: Free → Pro upgrade in <strong>test mode</strong>, from the pricing page to checkout return, via a <strong>payment provider such as Stripe</strong> (market example).</p>
<p>AI ships: secret key in the front end, no user ↔ customer mapping, Pro granted on <code>createCheckoutSession</code>, and no customer portal link.</p>`,
    findings: [
      {
        id: "f1",
        label: "The checkout session is created server-side with the secret key (never in the browser)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Each paying user / org has a Customer (or equivalent) linked in the database",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "The flow is exercised in test mode before production (test cards / events)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "A customer portal (or equivalent) lets users manage subscription / payment method so you avoid custom PCI UI",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Putting the secret key in React is faster and still safe",
        correct: false,
      },
      {
        id: "f6",
        label: "Granting Pro as soon as the session is created (before webhook) is correct",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Server + secrets, customer mapping, test mode, portal for management. Session created ≠ Pro access: the signed webhook (next module) actually grants it.</p>`,
  },

  m03_1: {
    id: "svc-paiements-ex-m03-1",
    format: "audit",
    title: "Duplicate webhook",
    instructions:
      "Check fair findings: signature, never grant on redirect alone, idempotence on replay.",
    hints: [
      "The success redirect is not a source of truth.",
      "Providers replay events, so your handler must absorb duplicates.",
    ],
    scenario: `<p>Generated handler: grants Pro on <code>/success?session_id=…</code>, accepts webhooks and skips verifying the signature, and on every replay of <code>checkout.session.completed</code> increments a « bonus » credit.</p>
<p>You simulate a duplicate webhook (same <code>event_id</code>) and must prove consistency.</p>`,
    findings: [
      {
        id: "f1",
        label: "Verify the webhook signature before any business side effect",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Never grant paid access based only on the success redirect",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Processing the same event_id twice must not double-activate or double-credit (idempotence)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "Clear order states (pending / paid / failed) help reconcile product and provider",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Accepting an unsigned webhook « in dev » and leaving it in prod is fine",
        correct: false,
      },
      {
        id: "f6",
        label: "The redirect alone is sufficient proof of payment",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Mandatory signature, grant via signed event, idempotence on event_id, order states. Redirect = UX rather than proof.</p>`,
  },

  m04_projet: {
    id: "svc-paiements-ex-m04-projet",
    format: "audit",
    title: "P6 project: Free/Pro with webhook",
    instructions:
      "Before calling monetization « ready » on the capstone, check what must be true.",
    hints: [
      "Activation = signed + idempotent webhook.",
      "Visible failures + logs that omit card data.",
    ],
    scenario: `<p>P6 goal: Free/Pro plan, checkout via a <strong>provider such as Stripe</strong> (market example), webhook that actually grants access.</p>
<p>An agent « finished »: Pro activates on redirect, unsigned webhook, replay = double credit, declined card still shows UI « success », logs contain PAN fragments, no price/renewal disclosures.</p>`,
    findings: [
      {
        id: "f1",
        label: "Pro access is granted via signed webhook rather than via redirect alone",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Proven idempotence: a duplicate webhook does not double-activate",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Failure flow (declined card / past_due) handled with visible state and user message",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Minimal disclosures (price, renewal, cancellation / who processes payment) are present",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Logs expose neither PAN/CVV nor secrets: ids and statuses only",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f6",
        label: "Granting Pro on redirect and logging the PAN is acceptable to ship",
        correct: false,
      },
      {
        id: "f7",
        label: "An unsigned webhook that credits on every replay is valid design",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>P6 checklist: signed webhook, idempotence, visible failures, minimal disclosures, and logs that omit sensitive data. Redirect and PAN in logs = no.</p>`,
  },
};
