import type { Phase } from "@/types";
import { architectureModule01 } from "./modules/01-decouper-systeme";
import { architectureModule02 } from "./modules/02-secrets-environnements";
import { architectureModule03 } from "./modules/03-contrats-frontieres";

/** Phase 3 : authored content (replaces the program-derived scaffold). */
export const architecturePhase: Phase = {
  id: "svc-architecture",
  slug: "architecture",
  courseId: "svc",
  color: "core",
  icon: "fa-diagram-project",
  label: "Phase 3",
  title: "Architecture d'un produit vibe",
  summary:
    "Découper un système livrable avant de générer : briques, frontières de confiance, secrets par environnement, contrats et webhooks.",
  metaTags: ["tronc commun", "lecture ~2h", "audits interactifs", "architecture"],
  modules: [architectureModule01, architectureModule02, architectureModule03],
  project: {
    title: "Projet P3 : Architecture cible du capstone",
    deliverable:
      "Un dossier d'architecture pour le futur capstone : schéma des briques, décisions, risques (travail hors plateforme pour l'instant ; les audits m02/m03 entraînent les réflexes clés).",
    assessment: [
      "Schéma lisible avec frontières de confiance",
      "Décisions justifiées (compromis explicites)",
      "Risques identifiés avec pistes de mitigation",
    ],
  },
};
