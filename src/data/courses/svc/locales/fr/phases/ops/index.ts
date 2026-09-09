import type { Phase } from "@/types";
import { opsModule01 } from "./modules/01-logs-utiles";
import { opsModule02 } from "./modules/02-monitoring-alertes";
import { opsModule03 } from "./modules/03-backups-incident";

/** Phase 11 : authored content (replaces the program-derived scaffold). */
export const opsPhase: Phase = {
  id: "svc-ops",
  slug: "ops",
  courseId: "svc",
  color: "expert",
  icon: "fa-heart-pulse",
  label: "Phase 11",
  title: "Observabilité & exploitation légère",
  summary: "Savoir que ça casse : et quoi faire quand ça casse.",
  metaTags: ["observabilité", "lecture ~1,5h", "audits interactifs", "logs", "alertes"],
  modules: [opsModule01, opsModule02, opsModule03],
  project: {
    title: "Projet P11 : Fiche d'incident + alerte active",
    deliverable:
      "La fiche d'incident du produit + au moins une alerte réellement active sur l'environnement de production.",
    assessment: [
      "Fiche d'incident d'une page actionnable",
      "Alerte déclenchable et testée",
      "Sauvegarde restaurable démontrée",
    ],
  },
};
