import type { AuditExercise } from "@/types";

export const opsExercises: Record<"m01_1" | "m02_1" | "m03_projet", AuditExercise> =
  {
    m01_1: {
      id: "svc-ops-ex-m01-1",
      format: "audit",
      title: "Instrument a critical flow",
      instructions:
        "Check what is true for actionable correlated logs on an auth or payment flow.",
      hints: [
        "Request/user correlation, structured logs.",
        "Never log tokens, passwords, or keys.",
      ],
      scenario: `<p>Payment flow: AI added <code>console.log(req.body)</code>, the session cookie, and the provider secret key « for debugging ». No <code>requestId</code>. Messages just say « error » with no step or userId. The team cannot tie a checkout failure to server logs.</p>`,
      findings: [
        {
          id: "f1",
          label:
            "Structure logs with fields (level, event, requestId, userId) for correlation",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f2",
          label: "Zero secrets in logs: no token, password, API key, or sensitive body",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f3",
          label:
            "Log critical-flow steps (e.g. checkout.started, webhook.received) with outcome",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f4",
          label:
            "Unreadable logs (« error ») that lack context are not enough to debug",
          correct: true,
          minSeverity: "medium",
        },
        {
          id: "f5",
          label: "Dumping the full body and session cookie is good ops practice",
          correct: false,
        },
        {
          id: "f6",
          label: "Request/user correlation is optional on a payment flow",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 2,
      challengeEligible: false,
      solution: `<p>Instrument auth/payment with named events + correlation ids; redact secrets. Provider-agnostic: the principle holds for any log aggregator.</p>`,
    },

    m02_1: {
      id: "svc-ops-ex-m02-1",
      format: "audit",
      title: "'Payment broken' alert",
      instructions:
        "Check what must be true for uptime, 5xx, and a payment webhook alert.",
      hints: [
        "Uptime is not the same as « no 5xx ».",
        "Webhook down = a costly outage.",
      ],
      scenario: `<p>Prod is « live »: no uptime check. 5xx are untracked. The payment webhook has been failing for 6 hours (retries exhausted) and nobody is alerted; only an occasional manual homepage ping. No alert has been tested. The team learns about failures from customer tickets.</p>`,
      findings: [
        {
          id: "f1",
          label: "Set up an uptime check (URL / health) on prod",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f2",
          label: "Track 5xx errors as an application failure signal",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f3",
          label:
            "Alert when the payment webhook fails (an outage that costs money)",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f4",
          label: "Test the alert trigger and document the response channel",
          correct: true,
          minSeverity: "medium",
        },
        {
          id: "f5",
          label: "An occasional homepage ping replaces the payment webhook alert",
          correct: false,
        },
        {
          id: "f6",
          label: "Discovering outages only via customer tickets is acceptable",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 2,
      challengeEligible: false,
      solution: `<p>Uptime + 5xx + targeted payment webhook alert, tested. Monitoring tool of your choice: the signal and the test matter.</p>`,
    },

    m03_projet: {
      id: "svc-ops-ex-m03-projet",
      format: "audit",
      title: "Project P11: Runbook + live alert",
      instructions:
        "Before closing P11, check what must be true for runbook, live alert, and restorable backup.",
      hints: [
        "Actionable 1-page runbook + short simulation.",
        "Active tested alert; backup with demonstrated restore.",
      ],
      scenario: `<p>P11 goal: product runbook + at least one live prod alert + restorable DB backup. Current state: scattered chat notes, no live alert, DB dump never restored, no simulation (detection → action → communication → post-mortem). The team says « we'll see if it breaks ».</p>`,
      findings: [
        {
          id: "f1",
          label: "Actionable one-page runbook (detection, actions, contacts, coms)",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f2",
          label: "At least one actually active, triggerable, and tested prod alert",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f3",
          label: "DB backup with tested / demonstrated restore",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f4",
          label:
            "Incident simulation: detection, action, communication, short post-mortem",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f5",
          label: "Chat notes and « we'll see » are enough to close P11",
          correct: false,
        },
        {
          id: "f6",
          label: "A never-restored dump and no live alert are acceptable",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 3,
      challengeEligible: false,
      solution: `<p>P11 = 1-page runbook + tested live alert + proven restore + short drill. Avoid ops « by vibes ».</p>`,
    },
  };
