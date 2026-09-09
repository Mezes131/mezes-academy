import type { AuditExercise } from "@/types";

export const auditQualiteExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-audit-qualite-ex-m01-1",
    format: "audit",
    title: "Lighthouse + plan d'action",
    instructions:
      "Coche les constats justes pour un audit Lighthouse et un plan d'action priorisé.",
    hints: [
      "LCP / TBT / cascade réseau / images = leviers classiques.",
      "Un score sans plan d'action priorisé laisse l'audit incomplet.",
    ],
    scenario: `<p>Produit capstone : Lighthouse mobile donne LCP 4,8 s (hero PNG 3,2 Mo), TBT 650 ms (bundle JS monolithique), cascade réseau avec CSS bloquant et trois polices non subset. L'équipe veut « un score vert » sans budget ni priorisation.</p>
<p>Objectif : identifier ce qui est vrai pour mesurer, budgéter et planifier les correctifs.</p>`,
    findings: [
      {
        id: "f1",
        label: "LCP élevé + image hero non optimisée = priorité perf typique",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "TBT élevé signale un fil principal bloqué (JS trop lourd / tâches longues)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Un plan d'action priorisé (impact × effort) est le livrable après Lighthouse",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Poser des budgets (LCP, poids, JS) évite la dérive après chaque prompt",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Un score Lighthouse « au feeling » sans cascade réseau ni métriques suffit",
        correct: false,
      },
      {
        id: "f6",
        label: "Ignorer les images et le JS tant que le design plaît est une stratégie valide",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Mesure (Lighthouse + cascade réseau), budgets, puis plan priorisé : images/LCP, JS/TBT, CSS/fonts. Autrement dit, pas de « score magique » sans actions.</p>`,
  },

  m02_1: {
    id: "svc-audit-qualite-ex-m02-1",
    format: "audit",
    title: "Revue design d'un écran critique",
    instructions:
      "Audite l'écran critique. Coche les constats justes de la liste de contrôle design-baseline.",
    hints: [
      "Hiérarchie + appel à l'action (CTA) unique + états vides/erreur/chargement.",
      "Trois appels à l'action (CTA) du même poids = échec.",
    ],
    scenario: `<p>Écran tableau de bord capstone généré : trois boutons primaires (« Upgrade », « Inviter », « Explorer ») même style. Liste vide = zone blanche sans message. Erreur API = notification technique illisible. Chargement = rien (saut de mise en page). Hiérarchie : six H1 concurrentes.</p>`,
    findings: [
      {
        id: "f1",
        label: "Plusieurs appels à l'action (CTA) primaires en concurrence diluent l'action attendue",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Un état vide doit expliquer et proposer une action, sinon l'écran reste mort",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "États erreur et chargement font partie de la liste de contrôle design-baseline",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "La hiérarchie visuelle (un titre dominant, message, action) doit être claire",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Livrer uniquement le parcours nominal sans vide/erreur/chargement est acceptable",
        correct: false,
      },
      {
        id: "f6",
        label: "Six H1 et trois appels à l'action (CTA) primaires renforcent la clarté",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Corrige : un appel à l'action (CTA) primaire, états vide/erreur/chargement conçus, hiérarchie resserrée. Puis re-passe la liste de contrôle design.</p>`,
  },

  m03_1: {
    id: "svc-audit-qualite-ex-m03-1",
    format: "audit",
    title: "Audit a11y ciblé",
    instructions:
      "Coche ce qui est vrai pour un audit clavier + lecteur d'écran sur un parcours.",
    hints: [
      "Contraste, libellés, focus clavier, ordre Tab.",
      "outline:none partout = signal rouge.",
    ],
    scenario: `<p>Parcours « créer une facture » : texte gris #AAA sur fond #F5F5F5. Boutons icône sans nom accessible. Modale de confirmation vole le focus clavier puis le perd à la fermeture. <code>outline: none</code> global. Un <code>div</code> « bouton » n'est pas focusable. Lighthouse a11y à 92 mais le parcours clavier casse à l'étape 2.</p>`,
    findings: [
      {
        id: "f1",
        label: "Contraste insuffisant texte/fond = échec WCAG à corriger",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Contrôles sans libellé / nom accessible bloquent les lecteurs d'écran",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Le focus clavier doit être géré à l'ouverture/fermeture des modales",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Un score auto élevé ne remplace pas un parcours clavier + lecteur d'écran",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Supprimer tout outline au focus clavier est une bonne pratique visuelle",
        correct: false,
      },
      {
        id: "f6",
        label: "Un div cliquable sans rôle ni tabindex suffit pour l'a11y",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Corrige contraste, noms accessibles, focus clavier modal, focus clavier visible, éléments natifs ou ARIA correct. Rejoue le parcours clavier jusqu'à zéro bloqueur.</p>`,
  },

  m04_projet: {
    id: "svc-audit-qualite-ex-m04-projet",
    format: "audit",
    title: "Projet P9 : Scores avant/après",
    instructions:
      "Avant de clôturer P9, coche ce qui doit être vrai pour les scores avant/après et le parcours payant.",
    hints: [
      "Listes de contrôle Perf / Design / A11y + mesures avant/après.",
      "Friction paiement éliminée ; correctifs tracés.",
    ],
    scenario: `<p>Objectif P9 : listes de contrôle Perf / Design / A11y passées sur le capstone, scores avant/après documentés. État actuel : Lighthouse non rejoué après « quelques correctifs », paiement avec compte forcé + 12 champs, email de reçu absent, états vides toujours blancs, un bloqueur clavier ouvert « pour plus tard », aucun commit listé dans le rapport.</p>`,
    findings: [
      {
        id: "f1",
        label: "Scores mesurés avant et après avec amélioration démontrée",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Listes de contrôle perf/design/a11y passées selon les seuils du cours",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Corrections tracées (commit ou diff) dans le livrable",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Parcours payant déroulé : frictions inutiles éliminées, emails de confiance en place",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Affirmer « c'est mieux » sans re-mesure ni liste de contrôle suffit",
        correct: false,
      },
      {
        id: "f6",
        label: "Laisser un bloqueur clavier et des états vides blancs est OK pour clôturer P9",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>P9 = mesure → correctifs (perf, design, a11y, paiement) → re-mesure + preuves. Autrement dit, on ne clôture pas sur une intention.</p>`,
  },
};
