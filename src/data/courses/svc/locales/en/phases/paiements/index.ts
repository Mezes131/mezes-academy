import type { Phase } from "@/types";
import { paiementsModule01 } from "./modules/01-modeles-economiques";
import { paiementsModule02 } from "./modules/02-stripe-bout-en-bout";
import { paiementsModule03 } from "./modules/03-webhooks-idempotence";
import { paiementsModule04 } from "./modules/04-echecs-conformite";

/** Phase 6: authored content (replaces the program-derived scaffold). */
export const paiementsPhase: Phase = {
  id: "svc-paiements",
  slug: "paiements",
  courseId: "svc",
  color: "eco",
  icon: "fa-credit-card",
  label: "Phase 6",
  title: "Payments & third-party services",
  summary: "Monetize the product correctly: webhooks included.",
  metaTags: ["product", "~3h read", "interactive audits", "payments"],
  modules: [
    paiementsModule01,
    paiementsModule02,
    paiementsModule03,
    paiementsModule04,
  ],
  project: {
    title: "Project P6: Free/Pro plan with webhook",
    deliverable:
      "The monetized capstone product: Free/Pro plan, Stripe checkout, and a webhook that actually grants access.",
    assessment: [
      "Activation via signed webhook rather than redirect alone",
      "Proven idempotence (duplicate webhook)",
      "Failure flow handled and visible",
    ],
  },
};
