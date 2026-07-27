import type { Phase } from "@/types";
import { authModule01 } from "./modules/01-modeles-auth";
import { authModule02 } from "./modules/02-brancher-provider";
import { authModule03 } from "./modules/03-autorisation";
import { authModule04 } from "./modules/04-parcours-sensibles";

/** Phase 4 : authored content (replaces the program-derived scaffold). */
export const authPhase: Phase = {
  id: "svc-auth",
  slug: "auth",
  courseId: "svc",
  color: "eco",
  icon: "fa-user-lock",
  label: "Phase 4",
  title: "Connexion & identité",
  summary:
    "Brancher un vrai service de connexion : ne jamais réinventer l'authentification. À partir d'ici, les projets de phase alimentent le produit final.",
  metaTags: ["produit", "lecture ~3h", "audits interactifs", "connexion"],
  modules: [authModule01, authModule02, authModule03, authModule04],
  project: {
    title: "Projet P4 : Connexion tiers + espace admin",
    deliverable:
      "Liste de contrôle connexion + espace admin validée (exercice Projet P4 du module 04) : service tiers, protections serveur, règles d'accès. L'intégration réelle se fait sur le dépôt du projet final.",
    assessment: [
      "Service de connexion de bout en bout (hors plateforme : sur ton dépôt)",
      "Espace admin réellement protégé côté serveur",
      "Règles d'accès écrites et cohérentes",
    ],
  },
};
