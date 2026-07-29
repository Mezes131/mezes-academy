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
  title: "Fondations vibe coding",
  summary:
    "Comprendre le vibe coding, ses risques réels, et le cycle Prompt → Audit → Livraison qui le rend fiable.",
  metaTags: ["tronc commun", "lecture ~1h30"],
  modules: [fondationsModule01, fondationsModule02, fondationsModule03],
  project: {
    title: "Projet P1 : Audit d'un dépôt généré par IA",
    deliverable:
      "Un rapport d'audit : constats, gravité, recommandations priorisées (exercice « Projet P1 » du module 03).",
    assessment: [
      "Constats factuels avec preuves (fichier, ligne)",
      "Gravité justifiée et cohérente",
      "Recommandations actionnables et priorisées",
    ],
  },
};
