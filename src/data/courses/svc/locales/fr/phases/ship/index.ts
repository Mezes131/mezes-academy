import type { Phase } from "@/types";
import { shipModule01 } from "./modules/01-offre-pricing-page";
import { shipModule02 } from "./modules/02-confiance-legal-minimal";
import { shipModule03 } from "./modules/03-preuves-livraison";

/** Phase 12 : authored content (replaces the program-derived scaffold). */
export const shipPhase: Phase = {
  id: "svc-ship",
  slug: "ship",
  courseId: "svc",
  color: "core",
  icon: "fa-rocket",
  label: "Phase 12",
  title: "Livraison commerciale",
  summary: "Transformer un déploiement en offre commercialisable.",
  metaTags: ["livraison", "lecture ~1,5h", "audits interactifs", "tarifs", "version publiée"],
  modules: [shipModule01, shipModule02, shipModule03],
  project: {
    title: "Projet P12 : Dossier de livraison",
    deliverable:
      "Le dossier de livraison complet : URL publique, plans et offre tarifaire, preuves d'audit, fiche d'incident.",
    assessment: [
      "Dossier complet et vérifiable",
      "Page des tarifs en ligne avec appel à l'action",
      "Socle légal et support client en place",
    ],
  },
};
