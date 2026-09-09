import type { Phase } from "@/types";
import { auditQualiteModule01 } from "./modules/01-performance-produit";
import { auditQualiteModule02 } from "./modules/02-design-shippable";
import { auditQualiteModule03 } from "./modules/03-accessibilite";
import { auditQualiteModule04 } from "./modules/04-ux-parcours-argent";

/** Phase 9: authored content (replaces the program-derived scaffold). */
export const auditQualitePhase: Phase = {
  id: "svc-audit-qualite",
  slug: "audit-qualite",
  courseId: "svc",
  color: "expert",
  icon: "fa-gauge-high",
  label: "Phase 9",
  title: "Quality Audit",
  summary:
    "Apply the Performance, Design, and Accessibility checklists to the product.",
  metaTags: ["quality", "~2.5h read", "interactive audits", "perf", "a11y"],
  modules: [
    auditQualiteModule01,
    auditQualiteModule02,
    auditQualiteModule03,
    auditQualiteModule04,
  ],
  project: {
    title: "Project P9: Before/after scores",
    deliverable:
      "Perf / Design / A11y checklists passed on the capstone, with documented before/after scores.",
    assessment: [
      "Scores measured before and after, improvement demonstrated",
      "Perf/design/a11y checklists passed per published thresholds",
      "Fixes tracked (commit or diff)",
    ],
  },
};
