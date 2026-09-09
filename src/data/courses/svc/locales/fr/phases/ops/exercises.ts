import type { AuditExercise } from "@/types";

export const opsExercises: Record<"m01_1" | "m02_1" | "m03_projet", AuditExercise> =
  {
    m01_1: {
      id: "svc-ops-ex-m01-1",
      format: "audit",
      title: "Instrumenter un flux critique",
      instructions:
        "Coche ce qui est vrai pour des logs corrélés exploitables sur un flux auth ou paiement.",
      hints: [
        "Corrélation requête / utilisateur, logs structurés.",
        "Jamais de jeton, mot de passe ou clé dans les logs.",
      ],
      scenario: `<p>Flux paiement : l'IA a ajouté des <code>console.log(req.body)</code>, le cookie de session et la clé secrète du fournisseur « pour déboguer ». Aucun <code>requestId</code>. Les messages disent juste « erreur » sans étape ni userId. L'équipe ne peut pas relier un échec de paiement aux logs serveur.</p>`,
      findings: [
        {
          id: "f1",
          label:
            "Structurer des logs avec champs (niveau, événement, requestId, userId) pour corréler",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f2",
          label: "Zéro secret dans les logs : pas de jeton, mot de passe, clé API, corps sensible",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f3",
          label:
            "Logger les étapes du flux critique (ex. checkout.started, webhook.received) avec résultat",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f4",
          label:
            "Des logs illisibles (« erreur ») sans contexte ne suffisent pas à déboguer",
          correct: true,
          minSeverity: "medium",
        },
        {
          id: "f5",
          label: "Dumper le corps entier et le cookie de session est une bonne pratique d'exploitation",
          correct: false,
        },
        {
          id: "f6",
          label: "La corrélation requête / utilisateur est optionnelle sur un flux paiement",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 2,
      challengeEligible: false,
      solution: `<p>Instrumente auth/paiement avec événements nommés + ids de corrélation ; masque les secrets. Indépendant du fournisseur : le principe vaut pour tout agrégateur de logs.</p>`,
    },

    m02_1: {
      id: "svc-ops-ex-m02-1",
      format: "audit",
      title: "Alerte « paiement cassé »",
      instructions:
        "Coche ce qui doit être vrai pour surveiller la disponibilité, les 5xx et une alerte webhook paiement.",
      hints: [
        "La disponibilité seule ne garantit pas l'absence de 5xx.",
        "Webhook en panne = panne qui coûte.",
      ],
      scenario: `<p>Prod en ligne : aucun contrôle de disponibilité. Les 5xx ne sont pas suivis. Le webhook paiement échoue depuis 6 h (nouvelles tentatives épuisées) et personne n'est alerté ; seule la page d'accueil a un ping manuel occasionnel. Aucune alerte testée. L'équipe découvre les échecs via les tickets clients.</p>`,
      findings: [
        {
          id: "f1",
          label: "Mettre en place un contrôle de disponibilité (URL / santé) sur la prod",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f2",
          label: "Suivre les erreurs 5xx comme signal de panne applicative",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f3",
          label:
            "Alerter quand le webhook de paiement échoue (panne qui coûte de l'argent)",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f4",
          label: "Tester le déclenchement de l'alerte et documenter le canal de réponse",
          correct: true,
          minSeverity: "medium",
        },
        {
          id: "f5",
          label: "Un ping page d'accueil occasionnel remplace l'alerte webhook paiement",
          correct: false,
        },
        {
          id: "f6",
          label: "Découvrir les pannes uniquement via les tickets clients est acceptable",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 2,
      challengeEligible: false,
      solution: `<p>Disponibilité + 5xx + alerte ciblée webhook paiement, testée. L'outil de surveillance est au choix : ce qui compte, c'est le signal et le test.</p>`,
    },

    m03_projet: {
      id: "svc-ops-ex-m03-projet",
      format: "audit",
      title: "Projet P11 : Fiche d'incident + alerte active",
      instructions:
        "Avant de clôturer P11, coche ce qui doit être vrai pour fiche d'incident, alerte active et sauvegarde restaurable.",
      hints: [
        "Fiche d'incident 1 page actionnable + simulation courte.",
        "Alerte active testée ; sauvegarde avec restauration démontrée.",
      ],
      scenario: `<p>Objectif P11 : fiche d'incident produit + au moins une alerte active en prod + sauvegarde BDD restaurable. État actuel : notes éparses dans un chat, aucune alerte active, export BDD jamais restauré, pas de simulation (détection → action → communication → bilan). L'équipe dit « on verra si ça casse ».</p>`,
      findings: [
        {
          id: "f1",
          label: "Fiche d'incident d'une page actionnable (détection, actions, contacts, com)",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f2",
          label: "Au moins une alerte réellement active, déclenchable et testée en prod",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f3",
          label: "Sauvegarde BDD avec restauration testée / démontrée",
          correct: true,
          minSeverity: "critical",
        },
        {
          id: "f4",
          label:
            "Simulation d'incident : détection, action, communication, bilan court",
          correct: true,
          minSeverity: "high",
        },
        {
          id: "f5",
          label: "Notes dans un chat et « on verra » suffisent pour clôturer P11",
          correct: false,
        },
        {
          id: "f6",
          label: "Un export jamais restauré et aucune alerte active sont acceptables",
          correct: false,
        },
      ],
      requireEvidence: false,
      passingScore: 0.7,
      attemptsBeforeSolution: 3,
      challengeEligible: false,
      solution: `<p>P11 = fiche d'incident 1 page + alerte active testée + restauration prouvée + simulation courte. L'exploitation « au feeling » ne tient pas la route.</p>`,
    },
  };
