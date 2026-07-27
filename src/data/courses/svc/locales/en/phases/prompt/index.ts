import type { Phase } from "@/types";
import { promptModule01 } from "./modules/01-besoin-mvp";
import { promptModule02 } from "./modules/02-techniques-prompt";
import { promptModule03 } from "./modules/03-contraintes-business";

/** Phase 2: authored content (replaces the program-derived scaffold). */
export const promptPhase: Phase = {
  id: "svc-prompt",
  slug: "prompt",
  courseId: "svc",
  color: "core",
  icon: "fa-pen-to-square",
  label: "Phase 2",
  title: "Prompt & product framing",
  summary:
    "Get good code more often: frame a sellable first deliverable before generating, with verifiable briefs and AI requests.",
  metaTags: ["core track", "~2h read", "interactive audits", "AI requests"],
  modules: [promptModule01, promptModule02, promptModule03],
  project: {
    title: "P2 project: CRUD via documented requests",
    deliverable:
      "An enriched CRUD brief / request (sign-in, business, environments) validated via the module 03 « P2 project » audit.",
    assessment: [
      "Complete product-ready list (not a bare CRUD)",
      "Explicit business constraints and secrets out of code",
      "Limited, verifiable scope",
    ],
  },
};
