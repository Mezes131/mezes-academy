import type { Phase } from "@/types";
import { fondationsModule01 } from "./modules/01-promesses-pieges";
import { fondationsModule02 } from "./modules/02-cycle-prompt-audit-ship";
import { fondationsModule03 } from "./modules/03-boite-a-outils";

/** Phase 1 : authored content (replaces the program-derived scaffold). */
export const fondationsPhase: Phase = {
  id: "svc-fondations",
  slug: "fondations",
  courseId: "svc",
  color: "intro",
  icon: "fa-wand-magic-sparkles",
  label: "Phase 1",
  title: "Vibe coding foundations",
  summary:
    "Understand vibe coding, its real risks, and the Prompt (specify and generate) → Audit (verify with proof) → Ship (deliver with evidence) cycle that makes it reliable.",
  metaTags: ["core path", "reading ~1h30", "interactive audits", "PAS cycle"],
  modules: [fondationsModule01, fondationsModule02, fondationsModule03],
  project: {
    title: "Project P1: Audit of an AI-generated repository",
    deliverable:
      "An audit report: findings, severity, prioritized recommendations (see the « Project P1 » exercise in module 03).",
    assessment: [
      "Factual findings with evidence (file, line)",
      "Severity justified and consistent",
      "Actionable, prioritized recommendations",
    ],
  },
};
