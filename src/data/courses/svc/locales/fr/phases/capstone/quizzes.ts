import type { Quiz } from "@/types";

export const capstoneQuizzes: Record<"m01", Quiz> = {
  m01: {
    id: "svc-capstone-quiz-m01",
    title: "Capstone : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Les trois briefs du capstone sont…",
        options: [
          {
            id: "a",
            label:
              "SaaS B2B (auth + abonnement + tableau de bord), e-commerce léger, produit service (réservation / prospect)",
          },
          { id: "b", label: "Uniquement un clone Twitter sans paiement" },
          { id: "c", label: "Trois stacks différentes avec la même UI" },
          { id: "d", label: "Des exercices optionnels hors rubrique" },
        ],
        correct: ["a"],
        explanation:
          "svc-capstone-saas / commerce / service : même rubrique, terrains différents.",
      },
      {
        id: "q2",
        question: "Le cycle imposé Prompt → Audit → Livraison exige notamment…",
        options: [
          {
            id: "a",
            label:
              "Brief + journal de prompts + architecture, puis audits Security + Qualité avec preuves, puis prod publique + dossier de livraison",
          },
          { id: "b", label: "Uniquement un déploiement local « ça marche chez moi »" },
          { id: "c", label: "Un audit oral sans preuves ni dossier" },
          { id: "d", label: "Sauter Prompt si l'IA a déjà généré le code" },
        ],
        correct: ["a"],
        explanation:
          "Chaque temps du cycle a des livrables : tu ne peux pas court-circuiter le chemin vers la prod.",
      },
      {
        id: "q3",
        question: "Parmi les échecs automatiques de la rubrique…",
        options: [
          {
            id: "a",
            label:
              "Secrets en clair, paiement sans webhook, prod sans HTTPS, autorisation uniquement côté client",
          },
          { id: "b", label: "Oublier une couleur dans le design system" },
          { id: "c", label: "Choisir le brief service plutôt que SaaS" },
          { id: "d", label: "Utiliser un fournisseur tiers pour l'auth" },
        ],
        correct: ["a"],
        explanation:
          "Ces quatre pièges éliminent d'office, quel que soit le brief choisi.",
      },
      {
        id: "q4",
        question: "Pour valider le certificat, le produit doit notamment…",
        options: [
          {
            id: "a",
            label:
              "Être en HTTPS public, monétisable, audité (Security + Qualité) avec dossier de livraison",
          },
          { id: "b", label: "Rester en HTTP sur un tunnel privé" },
          { id: "c", label: "Ignorer les checklists Perf / Design / A11y" },
          { id: "d", label: "Réinventer une auth maison « pour apprendre »" },
        ],
        correct: ["a"],
        explanation:
          "Rubrique : HTTPS, auth tiers, audits pass, dossier complet. Le certificat suit si la rubrique est validée.",
      },
      {
        id: "q5",
        question: "Le plan de capstone (exercice) doit…",
        options: [
          {
            id: "a",
            label:
              "Choisir un brief et jalonner livrables, risques et checklist des critères par temps du cycle",
          },
          { id: "b", label: "Coder toute la prod avant de lire la rubrique" },
          { id: "c", label: "Ignorer les échecs automatiques « on verra »" },
          { id: "d", label: "Remplacer le dossier de livraison final" },
        ],
        correct: ["a"],
        explanation:
          "Exercice m01-projet : cadrer avant de construire, avec brief, jalons, risques et checklist.",
      },
    ],
  },
};
