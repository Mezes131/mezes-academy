import type { Phase } from "@/types";
import { paiementsModule01 } from "./modules/01-modeles-economiques";
import { paiementsModule02 } from "./modules/02-stripe-bout-en-bout";
import { paiementsModule03 } from "./modules/03-webhooks-idempotence";
import { paiementsModule04 } from "./modules/04-echecs-conformite";

/** Phase 6 : authored content (replaces the program-derived scaffold). */
export const paiementsPhase: Phase = {
  id: "svc-paiements",
  slug: "paiements",
  courseId: "svc",
  color: "eco",
  icon: "fa-credit-card",
  label: "Phase 6",
  title: "Paiements & services tiers",
  summary:
    "Rendre le produit monétisable correctement, webhook (notification HTTP du prestataire) compris.",
  metaTags: ["produit", "lecture ~3h", "audits interactifs", "paiements"],
  modules: [
    paiementsModule01,
    paiementsModule02,
    paiementsModule03,
    paiementsModule04,
  ],
  project: {
    title: "Projet P6 : Plan Free/Pro avec webhook",
    deliverable:
      "Le produit final monétisé : plan Free/Pro, page de paiement Stripe (Checkout) et webhook qui active réellement l'accès.",
    assessment: [
      "Activation via webhook signé, jamais via la redirection seule",
      "Idempotence prouvée (webhook dupliqué)",
      "Parcours d'échec géré et visible",
    ],
  },
};
