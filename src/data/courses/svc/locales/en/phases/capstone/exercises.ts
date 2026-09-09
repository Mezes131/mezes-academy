import type { AuditExercise } from "@/types";

export const capstoneExercises: Record<"m01_projet", AuditExercise> = {
  m01_projet: {
    id: "svc-capstone-ex-m01-projet",
    format: "audit",
    title: "Capstone plan",
    instructions:
      "Check what must be true for a milestone capstone plan that matches the rubric.",
    hints: [
      "One brief chosen among saas / commerce / service.",
      "Prompt → Audit → Delivery deliverables + risks + checklist (auto-fails included).",
    ],
    scenario: `<p>Capstone to scope. The learner has not chosen a brief. No prompt journal planned. Security / Quality audits are « for later ». HTTPS prod, webhooks, and the release package are not scheduled. Automatic failures (secrets, redirect-only checkout, no HTTPS, client-only auth) are missing from the checklist. The team says « we'll code first, rubric later ».</p>`,
    findings: [
      {
        id: "f1",
        label:
          "Explicitly choose one brief (saas, commerce, or service) and list its scope",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label:
          "Milestone Prompt (brief + journal + architecture), Audit (Security + Quality + evidence), Delivery (HTTPS prod + package)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "Include a checklist of rubric criteria and automatic failures",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "Identify risks (payment, auth, deployment) per milestone",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Coding with no brief or cycle plan is enough to start the capstone",
        correct: false,
      },
      {
        id: "f6",
        label:
          "Automatic failures can stay off the checklist until final review",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Plan = chosen brief + Prompt → Audit → Delivery milestones + risks + rubric checklist (auto-fails included). Without that, the capstone hits a wall.</p>`,
  },
};
