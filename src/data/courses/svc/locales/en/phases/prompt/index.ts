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
    "Get good code more often: frame a commercializable MVP before generating, with auditable briefs and prompts.",
  metaTags: ["core track", "~2h read", "interactive audits", "prompts"],
  modules: [promptModule01, promptModule02, promptModule03],
  project: {
    title: "P2 project: CRUD feature via documented prompts",
    deliverable:
      "An enriched CRUD brief / prompt (auth, business, envs) validated via the module 03 « P2 project » audit.",
    assessment: [
      "Complete product-ready checklist (not a bare CRUD)",
      "Explicit business constraints and secrets out of code",
      "Bounded, auditable scope",
    ],
  },
};
