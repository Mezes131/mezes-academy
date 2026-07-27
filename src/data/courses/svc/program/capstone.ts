import type { ProgramPhase } from "@/types";
import { lesson, module, phase } from "./helpers";

/**
 * Capstone + certificat. Trois briefs au choix, même rubrique.
 * Identifiant certificat : svc-cert-<learnerId>-<yyyy-mm>.
 */
export const capstonePhase: ProgramPhase = phase({
  slug: "capstone",
  title: "Capstone + certificat",
  objective:
    "Livrer un produit commercialisable de bout en bout avec le cycle imposé Prompt → Audit → Ship, validé par la rubrique de certification.",
  modules: [
    module({
      id: "svc-capstone-m01",
      index: "01",
      title: "Cadrage et jalons du capstone",
      subtitle: "Choisir son brief, comprendre la rubrique, planifier le cycle",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Choisir un brief parmi les trois proposés",
        "Comprendre chaque critère de la rubrique et les échecs automatiques",
        "Planifier les jalons Prompt → Audit → Ship",
      ],
      lessons: [
        lesson({
          id: "svc-capstone-m01-l1",
          title: "Les trois briefs",
          objective:
            "Comparer SaaS B2B, e-commerce léger et produit service pour choisir son terrain.",
          concepts: [
            "svc-capstone-saas : auth + abonnement + dashboard",
            "svc-capstone-commerce : catalogue + paiement + notifs commande",
            "svc-capstone-service : booking/lead + paiement + emails transactionnels",
          ],
        }),
        lesson({
          id: "svc-capstone-m01-l2",
          title: "Cycle imposé et rubrique",
          objective:
            "S'approprier les livrables exigés et les critères éliminatoires.",
          concepts: [
            "Prompt : brief + journal de prompts + architecture",
            "Audit : Security + Qualité avec preuves",
            "Ship : prod publique + dossier de release",
          ],
          pitfalls: [
            "Secrets en clair dans le repo ou les logs (échec automatique)",
            "Checkout sans activation via webhook (échec automatique)",
            "Prod sans HTTPS (échec automatique)",
            "Autorisation uniquement côté client (échec automatique)",
          ],
        }),
      ],
      exercises: [
        {
          title: "Plan de capstone",
          kind: "project",
          brief:
            "Choisir un brief et produire le plan jalonné : livrables par temps du cycle, risques, checklist des critères.",
        },
      ],
    }),
  ],
  project: {
    title: "Capstone — Produit commercialisable en prod",
    deliverable:
      "Un produit déployé publiquement en HTTPS, monétisable, audité (Security + Qualité) et livré avec son dossier Ship. Certificat délivré si la rubrique est validée (revue formateur ou grille automatisée + spot-check).",
    options: [
      "svc-capstone-saas — SaaS B2B : auth + abonnement + dashboard",
      "svc-capstone-commerce — E-commerce léger : catalogue + paiement + notifs commande",
      "svc-capstone-service — Produit service : booking/lead + paiement + emails transactionnels",
    ],
    assessment: [
      "Produit déployé accessible en HTTPS (obligatoire)",
      "Auth via provider — pas d'auth maison fragile (obligatoire)",
      "Au moins un service tiers paiement ou notification, idéalement les deux (obligatoire)",
      "Checklist Security baseline : pass, aucune critique ouverte",
      "Checklists Perf / Design / A11y : pass selon seuils publiés",
      "Webhooks + idempotence si le brief inclut le paiement (obligatoire)",
      "Déploiement documenté : CI ou procédure (obligatoire)",
      "Dossier Ship complet (obligatoire)",
      "Échecs automatiques : secrets en clair, checkout redirect-only, prod sans HTTPS, autorisation client-only",
    ],
  },
});
