import type { Phase } from "@/types";
import { hebergementModule01 } from "./modules/01-choisir-ou-heberger";
import { hebergementModule02 } from "./modules/02-environnements";
import { hebergementModule03 } from "./modules/03-ci-cd-minimal";
import { hebergementModule04 } from "./modules/04-domaines-tls-dns";

/** Phase 10 : authored content (replaces the program-derived scaffold). */
export const hebergementPhase: Phase = {
  id: "svc-hebergement",
  slug: "hebergement",
  courseId: "svc",
  color: "eco",
  icon: "fa-cloud-arrow-up",
  label: "Phase 10",
  title: "Hébergement & déploiement",
  summary: "Mettre le produit en ligne pour de vrai.",
  metaTags: ["hébergement", "lecture ~2,5h", "audits interactifs", "CI/CD", "DNS"],
  modules: [
    hebergementModule01,
    hebergementModule02,
    hebergementModule03,
    hebergementModule04,
  ],
  project: {
    title: "Projet P10 : Déploiement aperçu + prod",
    deliverable:
      "Le produit capstone déployé : environnement d'aperçu + prod avec URL publique HTTPS.",
    assessment: [
      "Prod accessible en HTTPS sur URL publique",
      "Aperçu distinct de la prod",
      "Chaîne de déploiement ou procédure documentée",
    ],
  },
};
