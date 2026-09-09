import type { Phase } from "@/types";
import { capstoneModule01 } from "./modules/01-cadrage-jalons";

/** Capstone : authored content (replaces the program-derived scaffold). */
export const capstonePhase: Phase = {
  id: "svc-capstone",
  slug: "capstone",
  courseId: "svc",
  color: "expert",
  icon: "fa-award",
  label: "Capstone",
  title: "Capstone + certificat",
  summary:
    "Livrer un produit commercialisable de bout en bout avec le cycle imposé Prompt → Audit → Livraison, validé par la rubrique de certification.",
  metaTags: [
    "capstone",
    "lecture ~40 min",
    "audits interactifs",
    "certificat",
    "briefs",
  ],
  modules: [capstoneModule01],
  project: {
    title: "Capstone : Produit commercialisable en prod",
    deliverable:
      "Un produit déployé publiquement en HTTPS, monétisable, audité (Security + Qualité) et livré avec son dossier de livraison. Certificat délivré si la rubrique est validée (revue formateur ou grille automatisée + contrôle ponctuel).",
    options: [
      "svc-capstone-saas : SaaS B2B : auth + abonnement + tableau de bord",
      "svc-capstone-commerce : E-commerce léger : catalogue + paiement + notifications de commande",
      "svc-capstone-service : Produit service : réservation / prospect + paiement + emails transactionnels",
    ],
    assessment: [
      "Produit déployé accessible en HTTPS (obligatoire)",
      "Connexion via un service tiers : évite une connexion maison fragile (obligatoire)",
      "Au moins un service tiers paiement ou notification, idéalement les deux (obligatoire)",
      "Checklist Security baseline : pass, aucune critique ouverte",
      "Checklists Perf / Design / A11y : pass selon seuils publiés",
      "Webhooks + idempotence si le brief (énoncé du projet) inclut le paiement (obligatoire)",
      "Déploiement documenté : CI ou procédure (obligatoire)",
      "Dossier de livraison complet (obligatoire)",
      "Échecs automatiques : secrets en clair, paiement activé sur redirection seule, prod sans HTTPS, autorisation client-only",
    ],
  },
};
