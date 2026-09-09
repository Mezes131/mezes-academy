import type { Phase } from "@/types";
import { capstoneModule01 } from "./modules/01-cadrage-jalons";

/** Capstone: authored content (replaces the program-derived scaffold). */
export const capstonePhase: Phase = {
  id: "svc-capstone",
  slug: "capstone",
  courseId: "svc",
  color: "expert",
  icon: "fa-award",
  label: "Capstone",
  title: "Capstone + certificate",
  summary:
    "Deliver an end-to-end marketable product using the required Prompt → Audit → Delivery cycle, validated by the certification rubric.",
  metaTags: [
    "capstone",
    "~40 min read",
    "interactive audits",
    "certificate",
    "briefs",
  ],
  modules: [capstoneModule01],
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
      "Automatic failures: plaintext secrets, checkout redirect-only, prod with no HTTPS, client-only authorization",
    ],
  },
};
