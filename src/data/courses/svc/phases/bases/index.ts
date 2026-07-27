import type { Phase } from "@/types";
import { basesModule01 } from "./modules/01-http-html-js";
import { basesModule02 } from "./modules/02-git-projet-local";
import { basesModule03 } from "./modules/03-front-api";

/** Phase 0 — authored content (replaces the program-derived scaffold). */
export const basesPhase: Phase = {
  id: "svc-bases",
  slug: "bases",
  courseId: "svc",
  color: "intro",
  icon: "fa-globe",
  label: "Phase 0",
  title: "Bases web (optionnelle)",
  summary:
    "Pour les product builders qui viennent du no-code : le vocabulaire et les réflexes web nécessaires pour suivre le tronc commun. Skip libre si tes bases sont là.",
  metaTags: ["optionnelle", "lecture ~1h45", "aucun prérequis", "hors chemin critique"],
  modules: [basesModule01, basesModule02, basesModule03],
  project: {
    title: "Projet P0 — Page connectée à une API",
    deliverable:
      "Une page qui appelle une API publique et affiche correctement loading / erreur / succès.",
    assessment: [
      "Les trois états sont visibles et corrects",
      "Les erreurs HTTP sont gérées explicitement",
      "Le projet est versionné proprement (.gitignore, .env.example)",
    ],
  },
};
