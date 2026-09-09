import type { Quiz } from "@/types";

export const capstoneQuizzes: Record<"m01", Quiz> = {
  m01: {
    id: "svc-capstone-quiz-m01",
    title: "Capstone: check your reading",
    questions: [
      {
        id: "q1",
        question: "The three capstone briefs are…",
        options: [
          {
            id: "a",
            label:
              "B2B SaaS (auth + subscription + dashboard), lightweight e-commerce, service product (booking/lead)",
          },
          { id: "b", label: "Only a Twitter clone with no payment" },
          { id: "c", label: "Three different stacks with the same UI" },
          { id: "d", label: "Optional exercises outside the rubric" },
        ],
        correct: ["a"],
        explanation:
          "svc-capstone-saas / commerce / service: same rubric, different terrains.",
      },
      {
        id: "q2",
        question: "The required Prompt → Audit → Delivery cycle notably requires…",
        options: [
          {
            id: "a",
            label:
              "Brief + prompt journal + architecture, then Security + Quality audits with evidence, then public prod + release package",
          },
          { id: "b", label: "Only a local deploy that « works on my machine »" },
          { id: "c", label: "An oral audit with no evidence or package" },
          { id: "d", label: "Skipping Prompt if the AI already generated the code" },
        ],
        correct: ["a"],
        explanation:
          "Each cycle phase has deliverables: no shortcut straight to prod.",
      },
      {
        id: "q3",
        question: "Among the rubric's automatic failures…",
        options: [
          {
            id: "a",
            label:
              "Plaintext secrets, checkout with no webhook, prod with no HTTPS, client-only authorization",
          },
          { id: "b", label: "Forgetting a color in the design system" },
          { id: "c", label: "Choosing the service brief instead of SaaS" },
          { id: "d", label: "Using a third-party provider for auth" },
        ],
        correct: ["a"],
        explanation:
          "Any one of these four pitfalls fails you outright, regardless of the chosen brief.",
      },
      {
        id: "q4",
        question: "To earn the certificate, the product must notably…",
        options: [
          {
            id: "a",
            label:
              "Be public HTTPS, monetizable, audited (Security + Quality) with a delivery package",
          },
          { id: "b", label: "Stay on HTTP over a private tunnel" },
          { id: "c", label: "Ignore Perf / Design / A11y checklists" },
          { id: "d", label: "Reinvent fragile homegrown auth « to learn »" },
        ],
        correct: ["a"],
        explanation:
          "Rubric: HTTPS, third-party auth, audits pass, complete package. Certificate if validated.",
      },
      {
        id: "q5",
        question: "The capstone plan (exercise) must…",
        options: [
          {
            id: "a",
            label:
              "Choose a brief and milestone deliverables, risks, and criteria checklist per cycle phase",
          },
          { id: "b", label: "Ship all of prod before reading the rubric" },
          { id: "c", label: "Ignore automatic failures « we'll see »" },
          { id: "d", label: "Replace the final delivery package" },
        ],
        correct: ["a"],
        explanation:
          "m01-projet exercise: scope before building. Cover brief, milestones, risks, and checklist.",
      },
    ],
  },
};
