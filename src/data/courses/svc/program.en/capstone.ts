import type { ProgramPhase } from "@/types";
import { lesson, module, phase } from "./helpers";

/**
 * Capstone + certificate. Three briefs to choose from, same rubric.
 * Certificate ID: svc-cert-<learnerId>-<yyyy-mm>.
 */
export const capstonePhase: ProgramPhase = phase({
  slug: "capstone",
  title: "Capstone + certificate",
  objective:
    "Deliver an end-to-end marketable product using the required Prompt → Audit → Delivery cycle, validated by the certification rubric.",
  modules: [
    module({
      id: "svc-capstone-m01",
      index: "01",
      title: "Capstone scoping and milestones",
      subtitle: "Choose your brief, understand the rubric, plan the cycle",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Choose one of the three briefs",
        "Understand each rubric criterion and automatic failures",
        "Plan Prompt → Audit → Delivery milestones",
      ],
      lessons: [
        lesson({
          id: "svc-capstone-m01-l1",
          title: "The three briefs",
          objective:
            "Compare B2B SaaS, lightweight e-commerce, and service product to pick your path.",
          concepts: [
            "svc-capstone-saas: auth + subscription + dashboard",
            "svc-capstone-commerce: catalog + payment + order notifications",
            "svc-capstone-service: booking/lead + payment + transactional emails",
          ],
        }),
        lesson({
          id: "svc-capstone-m01-l2",
          title: "Required cycle and rubric",
          objective:
            "Internalize required deliverables and disqualifying criteria.",
          concepts: [
            "Prompt: brief + prompt journal + architecture",
            "Audit: Security + Quality with evidence",
            "Delivery: public prod + release package",
          ],
          pitfalls: [
            "Plaintext secrets in repo or logs (automatic failure)",
            "Checkout without webhook activation (automatic failure)",
            "Prod without HTTPS (automatic failure)",
            "Authorization only on the client (automatic failure)",
          ],
        }),
      ],
      exercises: [
        {
          title: "Capstone plan",
          kind: "project",
          brief:
            "Choose a brief and produce a milestone plan: deliverables per cycle phase, risks, criteria checklist.",
        },
      ],
    }),
  ],
  project: {
    title: "Capstone: Marketable product in prod",
    deliverable:
      "A publicly deployed HTTPS product, monetizable, audited (Security + Quality), and delivered with its delivery package. Certificate issued if the rubric is validated (instructor review or automated grid + spot-check).",
    options: [
      "svc-capstone-saas: B2B SaaS: auth + subscription + dashboard",
      "svc-capstone-commerce: Lightweight e-commerce: catalog + payment + order notifications",
      "svc-capstone-service: Service product: booking/lead + payment + transactional emails",
    ],
    assessment: [
      "Product deployed and accessible over HTTPS (required)",
      "Login via a third-party service: no fragile homegrown auth (required)",
      "At least one third-party payment or notification service, ideally both (required)",
      "Security baseline checklist: pass, no open criticals",
      "Perf / Design / A11y checklists: pass per published thresholds",
      "Webhooks + idempotency if the brief includes payment (required)",
      "Documented deployment: CI or procedure (required)",
      "Complete delivery package (required)",
      "Automatic failures: plaintext secrets, checkout redirect-only, prod without HTTPS, client-only authorization",
    ],
  },
});
