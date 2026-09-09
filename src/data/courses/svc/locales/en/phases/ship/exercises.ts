import type { AuditExercise } from "@/types";

export const shipExercises: Record<"m01_1" | "m02_1" | "m03_projet", AuditExercise> =
  {
    m01_1: {
      id: "svc-ship-ex-m01-1",
      format: "audit",
      title: "'Why pay' landing",
      instructions:
        "Check what must be true for a landing / pricing page centered on the reason to pay.",
      hints: [
        "Value proposition + readable Free/Pro plans.",
        "One clear CTA rather than a feature inventory.",
      ],
      scenario: `<p>Product is deployed: the « landing » is a technical README (stack, libs, architecture). No value proposition. Free/Pro plans missing or fuzzy. Three competing buttons (« Docs », « GitHub », « Try ») with no single commercial CTA. The team says « the features speak for themselves ».</p>`,
      findings: [
        {
          id: "f1",
          label:
            "State a clear value proposition (benefit for a target audience)",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f2",
          label: "Clearly distinguish Free and Pro plans (why upgrade)",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f3",
          label: "A single conversion-oriented CTA (trial / upgrade / purchase)",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f4",
          label:
            "Center the page on the reason to pay rather than a dump of technical features",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f5",
          label: "A technical README is enough as a commercial landing",
          correct: false,
        },
        {
          id: "f6",
          label: "Several competing CTAs with no hierarchy is best practice",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 2,
      challengeEligible: false,
      solution: `<p>« Why pay » landing: value + Free/Pro + single CTA. Provider-agnostic: the message matters more than the page builder.</p>`,
    },

    m02_1: {
      id: "svc-ship-ex-m02-1",
      format: "audit",
      title: "Mini compliance checklist",
      instructions:
        "Check what must be true for the legal and support foundation of a paid product.",
      hints: [
        "Reachable ToS, privacy, legal notices.",
        "Announced and reachable support channel.",
      ],
      scenario: `<p>Paid offer live: no ToS, privacy returns 404, no legal notices. « Support » is an unannounced DM. AI pasted generic unread legal text, or nothing at all. The mini compliance checklist was never run. Customers pay and do not know who to contact or how data is handled.</p>`,
      findings: [
        {
          id: "f1",
          label: "Reachable, credible ToS / terms of use pages",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f2",
          label: "Reachable privacy policy",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f3",
          label: "Minimal legal notices (publisher / contact) present",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f4",
          label: "Reachable support channel announced on the product",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f5",
          label: "A 404 « coming soon » link is enough for privacy and ToS",
          correct: false,
        },
        {
          id: "f6",
          label: "Support can stay an unannounced DM",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 2,
      challengeEligible: false,
      solution: `<p>Mini compliance checklist: ToS + privacy + notices + visible support. Fill gaps before claiming a commercial ship.</p>`,
    },

    m03_projet: {
      id: "svc-ship-ex-m03-projet",
      format: "audit",
      title: "Project P12: Delivery package",
      instructions:
        "Before closing P12, check what must be true for a complete delivery package.",
      hints: [
        "URL, plans/pricing, audit evidence, runbook.",
        "Live pricing with CTA; legal + support in place.",
      ],
      scenario: `<p>P12 goal: delivery package (public URL, plans and pricing, audit evidence, runbook). Current state: URL « works on my machine », no live pricing, no attached audit evidence, P11 runbook forgotten, empty changelog, no post-deploy smoke tests. The team says « deployed = delivered ».</p>`,
      findings: [
        {
          id: "f1",
          label: "Complete, verifiable package (URL, plans, audits, runbook)",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f2",
          label: "Pricing page live with CTA",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f3",
          label: "Legal foundation and support channel in place",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f4",
          label:
            "Delivery proof: changelog and/or documented smoke tests",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f5",
          label: "« It's deployed » with no package or pricing is enough for P12",
          correct: false,
        },
        {
          id: "f6",
          label: "Omitting runbook and audit evidence is acceptable",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 3,
      challengeEligible: false,
      solution: `<p>P12 = verifiable package + live pricing CTA + legal/support + proof (changelog / smoke). Deployed is not the same as commercially delivered.</p>`,
    },
  };
