import type { Phase } from "@/types";
import { auditQualiteModule01 } from "./modules/01-performance-produit";
import { auditQualiteModule02 } from "./modules/02-design-shippable";
import { auditQualiteModule03 } from "./modules/03-accessibilite";
import { auditQualiteModule04 } from "./modules/04-ux-parcours-argent";

/** Phase 9 : authored content (replaces the program-derived scaffold). */
export const auditQualitePhase: Phase = {
  id: "svc-audit-qualite",
  slug: "audit-qualite",
  courseId: "svc",
  color: "expert",
  icon: "fa-gauge-high",
  label: "Phase 9",
  title: "Audit Qualité",
  summary:
    "Appliquer les listes de contrôle Performance, Design et Accessibility au produit.",
  metaTags: ["qualité", "lecture ~2,5h", "audits interactifs", "perf", "a11y"],
  modules: [
    auditQualiteModule01,
    auditQualiteModule02,
    auditQualiteModule03,
    auditQualiteModule04,
  ],
  project: {
    title: "Projet P9 : Scores avant/après",
    deliverable:
      "Les listes de contrôle Perf / Design / A11y passées sur le capstone, avec scores avant/après documentés.",
    assessment: [
      "Scores mesurés avant et après, amélioration démontrée",
      "Listes de contrôle perf/design/a11y passées selon seuils",
      "Corrections tracées (commit ou diff)",
    ],
  },
};
