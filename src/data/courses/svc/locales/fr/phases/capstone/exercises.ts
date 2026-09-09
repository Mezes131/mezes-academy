import type { AuditExercise } from "@/types";

export const capstoneExercises: Record<"m01_projet", AuditExercise> = {
  m01_projet: {
    id: "svc-capstone-ex-m01-projet",
    format: "audit",
    title: "Plan de capstone",
    instructions:
      "Coche ce qui doit être vrai pour un plan de capstone jalonné et conforme à la rubrique.",
    hints: [
      "Un brief (énoncé du projet) choisi parmi saas / commerce / service.",
      "Livrables Prompt → Audit → Livraison + risques + checklist (échecs auto inclus).",
    ],
    scenario: `<p>Capstone à cadrer. L'apprenant n'a pas choisi de brief. Aucun journal de prompts prévu. Les audits Security / Qualité sont « pour plus tard ». La prod HTTPS, les webhooks et le dossier de livraison ne sont pas planifiés. Les échecs automatiques (secrets, paiement activé sur redirection seule, pas d'HTTPS, auth client-only) ne figurent pas dans la checklist. L'équipe dit « on code d'abord, on verra la rubrique ».</p>`,
    findings: [
      {
        id: "f1",
        label:
          "Choisir explicitement un brief (saas, commerce ou service) et en lister le périmètre",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label:
          "Jaloner Prompt (brief + journal + architecture), Audit (Security + Qualité + preuves), Livraison (prod HTTPS + dossier)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "Inclure une checklist des critères de rubrique et des échecs automatiques",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label: "Identifier les risques (paiement, auth, déploiement) par jalon",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Coder sans brief ni plan de cycle suffit pour démarrer le capstone",
        correct: false,
      },
      {
        id: "f6",
        label:
          "Les échecs automatiques peuvent rester hors checklist jusqu'à la revue finale",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Plan = brief choisi + jalons Prompt → Audit → Livraison + risques + checklist rubrique (échecs auto inclus). Sans ça, le capstone part dans le mur.</p>`,
  },
};
