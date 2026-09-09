import type { Phase } from "@/types";
import { shipModule01 } from "./modules/01-offre-pricing-page";
import { shipModule02 } from "./modules/02-confiance-legal-minimal";
import { shipModule03 } from "./modules/03-preuves-livraison";

/** Phase 12: authored content (replaces the program-derived scaffold). */
export const shipPhase: Phase = {
  id: "svc-ship",
  slug: "ship",
  courseId: "svc",
  color: "core",
  icon: "fa-rocket",
  label: "Phase 12",
  title: "Commercial delivery",
  summary: "Turn a deployment into a marketable offer.",
  metaTags: ["delivery", "~1.5h read", "interactive audits", "pricing", "release"],
  modules: [shipModule01, shipModule02, shipModule03],
  project: {
    title: "Project P12: Delivery package",
    deliverable:
      "Complete delivery package: public URL, plans and pricing, audit evidence, runbook.",
    assessment: [
      "Complete and verifiable package",
      "Pricing page live with CTA",
      "Legal foundation and support in place",
    ],
  },
};
