import type { AuditExercise } from "@/types";

export const notificationsExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-notifications-ex-m01-1",
    format: "audit",
    title: "Event → channel matrix",
    instructions:
      "Check only fair statements about transactional vs marketing and channel choice.",
    hints: [
      "Start from the business moment rather than from the push tutorial.",
      "No default multi-channel spray.",
    ],
    scenario: `<p><strong>Events:</strong> (A) password reset; (B) payment receipt; (C) weekly promo newsletter; (D) « server down » alert for on-call admin.</p>
<p>An AI sends SMS + push + marketing email for every event, mixes promo with reset, and ignores consent.</p>
<p>You must link each case to the right type and a reasonable channel.</p>`,
    findings: [
      {
        id: "f1",
        label: "Password reset (A) is transactional: expected email (or secure channel) rather than a promo",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Payment receipt (B) is transactional: confirmation tied to a business event",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Promo newsletter (C) is marketing: opt-in / unsubscribe required",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "An event → channel (and type) matrix should exist before integrating the provider",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Sending SMS + push + marketing email on every event is good practice",
        correct: false,
      },
      {
        id: "f6",
        label: "Mixing payment receipt and newsletter has no consequences",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>A/B → transactional (typically email); C → marketing + consent; D → urgent channel only with opt-in/on-call. Matrix before code. No multi-channel spray.</p>`,
  },

  m02_1: {
    id: "svc-notifications-ex-m02-1",
    format: "audit",
    title: "Welcome + receipt emails",
    instructions:
      "Audit the provider integration. Check what must be true (Resend/Postmark = market examples).",
    hints: [
      "Secret key = server / worker.",
      "Domain + versioned templates > HTML pasted in the front end.",
    ],
    scenario: `<p>Goal: <strong>welcome</strong> and <strong>payment receipt</strong> emails via an <strong>email provider such as Resend or Postmark</strong> (market examples).</p>
<p>AI ships: API key in React, sending from <code>@gmail.com</code> with no SPF/DKIM, templates with unescaped variables, and « deliverability = ignore bounces ».</p>`,
    findings: [
      {
        id: "f1",
        label: "The send API is called server-side with the secret key (never in the browser)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "A configured sending domain (basic SPF/DKIM) improves deliverability",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Versioned templates with controlled / escaped variables for welcome and receipt",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Resend / Postmark are examples: the same concepts exist with other providers",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Putting the provider key in React is faster and still safe",
        correct: false,
      },
      {
        id: "f6",
        label: "Ignoring domain, bounces, and complaints does not affect the inbox",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Server + secret, authenticated domain, clean templates, provider = market example. No front-end key, no improvised « from gmail » sending.</p>`,
  },

  m03_1: {
    id: "svc-notifications-ex-m03-1",
    format: "audit",
    title: "User preferences",
    instructions:
      "Check fair findings: consent, unsubscribe enforced at send time, anti-abuse.",
    hints: [
      "Preferences UI with no server check = theater.",
      "Rate limits protect quota and reputation.",
    ],
    scenario: `<p>Generated preferences screen: decorative checkboxes. The worker still sends the weekly promo. No effective unsubscribe. Public <code>/api/send</code> with no rate limit, so a bot floods resets.</p>
<p>You audit before production.</p>`,
    findings: [
      {
        id: "f1",
        label: "Preferences / unsubscribe must be checked server-side before marketing sends",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Explicit opt-in required for marketing / non-essential messages",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Rate limits / quotas per user or email type limit abuse",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "A public send endpoint with no auth is an abuse vulnerability",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f5",
        label: "Ignoring unsubscribe to « engage » is acceptable",
        correct: false,
      },
      {
        id: "f6",
        label: "UI checkboxes with no enforcement are enough for compliance",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Prefs + unsubscribe enforced at send time, marketing opt-in, quotas/auth on send. UI alone = no.</p>`,
  },

  m04_projet: {
    id: "svc-notifications-ex-m04-projet",
    format: "audit",
    title: "Project P7: Transactional emails + preferences",
    instructions:
      "Before calling notifications « ready » on the capstone, check what must be true.",
    hints: [
      "Three emails on real events (auth + payment).",
      "Decoupled send (queue/job), prefs respected.",
    ],
    scenario: `<p>P7 goal: three transactional emails (auth + payment), respected preferences, send via queue. Email provider = <strong>market example</strong> (Resend/Postmark or equivalent).</p>
<p>An agent « finished »: sync email in the HTTP route, key in the front end, welcome never wired, receipt sent on redirect alone, promo despite unsubscribe, non-idempotent job (duplicates).</p>`,
    findings: [
      {
        id: "f1",
        label: "At least three transactional emails wired to real events (auth + payment)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Preferences and unsubscribe respected at send time (especially marketing)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Decoupled sending via queue/job rather than only inside the HTTP request",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Reliable chain: business event (e.g. signed webhook) → job → notification, with idempotence",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Provider key server-side only; domain / templates cared for",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f6",
        label: "Sync email + front-end key + ignore unsubscribe is a valid design to ship",
        correct: false,
      },
      {
        id: "f7",
        label: "Sending the receipt on redirect alone (no business event) is enough",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>P7 checklist: 3 emails on real events, prefs/unsubscribe, idempotent queue/job, server secret. Redirect alone and front-end key = no.</p>`,
  },
};
