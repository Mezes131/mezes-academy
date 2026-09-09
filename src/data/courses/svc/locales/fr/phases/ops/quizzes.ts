import type { Quiz } from "@/types";

export const opsQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-ops-quiz-m01",
    title: "Logs utiles : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Des logs structurés, c'est surtout…",
        options: [
          {
            id: "a",
            label:
              "Des événements en champs (niveau, message, ids) exploitables par un outil de logs",
          },
          { id: "b", label: "Des console.log aléatoires sans format" },
          { id: "c", label: "Coller le corps entier des requêtes « pour être sûr »" },
          { id: "d", label: "Remplacer la surveillance de disponibilité" },
        ],
        correct: ["a"],
        explanation:
          "Avec du JSON et des champs nommés, tu filtres, tu corréles et tu alertes. Un mur de texte libre ne te donne pas ça.",
      },
      {
        id: "q2",
        question: "La corrélation requête / utilisateur sert à…",
        options: [
          {
            id: "a",
            label:
              "Relier les logs d'un même parcours (requestId, userId) pour déboguer vite",
          },
          { id: "b", label: "Logger le mot de passe à chaque connexion" },
          { id: "c", label: "Éviter toute alerte 5xx" },
          { id: "d", label: "Remplacer les sauvegardes BDD" },
        ],
        correct: ["a"],
        explanation:
          "Sans id de corrélation, un incident auth/paiement devient une chasse au hasard.",
      },
      {
        id: "q3",
        question: "Logger un jeton, une clé API ou un mot de passe…",
        options: [
          {
            id: "a",
            label: "Est un piège critique : zéro secret dans les logs",
          },
          { id: "b", label: "Aide l'équipe support « en prod »" },
          { id: "c", label: "Est OK si les logs sont « privés »" },
          { id: "d", label: "Remplace le coffre de secrets" },
        ],
        correct: ["a"],
        explanation:
          "Syllabus : logger un jeton ou un mot de passe. Les agrégateurs de logs = surface d'attaque.",
      },
      {
        id: "q4",
        question: "Des logs « illisibles sans contexte »…",
        options: [
          {
            id: "a",
            label:
              "N'aident pas : il faut un événement, un résultat et des ids, plutôt qu'un simple « erreur »",
          },
          { id: "b", label: "Sont suffisants pour une fiche d'incident" },
          { id: "c", label: "Remplacent l'alerte webhook en panne" },
          { id: "d", label: "Garantissent le SLA" },
        ],
        correct: ["a"],
        explanation:
          "Piège : logs sans contexte. Instrumente le flux critique avec des événements nommés.",
      },
      {
        id: "q5",
        question: "Sur un flux paiement ou auth, la bonne instrumentation…",
        options: [
          {
            id: "a",
            label:
              "Pose des logs corrélés aux étapes clés, sans données sensibles",
          },
          { id: "b", label: "Vide le corps Stripe / le cookie de session" },
          { id: "c", label: "N'utilise que des alertes email sans logs" },
          { id: "d", label: "Ignore les ids de requête" },
        ],
        correct: ["a"],
        explanation:
          "Exercice m01 : un flux critique instrumenté, corrélé et exploitable, quel que soit le fournisseur.",
      },
    ],
  },

  m02: {
    id: "svc-ops-quiz-m02",
    title: "Surveillance & alertes : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Un contrôle de disponibilité sert à…",
        options: [
          {
            id: "a",
            label:
              "Savoir si l'URL / le point de santé répond, avant que les clients le signalent",
          },
          { id: "b", label: "Remplacer les logs structurés" },
          { id: "c", label: "Chiffrer la base de données" },
          { id: "d", label: "Éviter tout contrôle CI" },
        ],
        correct: ["a"],
        explanation:
          "Disponibilité = signal « le service vit ». Indépendant du fournisseur de surveillance.",
      },
      {
        id: "q2",
        question: "Suivre les erreurs 5xx, c'est…",
        options: [
          {
            id: "a",
            label:
              "Détecter les pannes serveur / dépendances qui cassent l'expérience utilisateur",
          },
          { id: "b", label: "Ignorer les webhooks qui échouent" },
          { id: "c", label: "Logger les secrets des requêtes" },
          { id: "d", label: "Remplacer le retour en arrière" },
        ],
        correct: ["a"],
        explanation:
          "Pic de 5xx = alerte utile. Complète la disponibilité (un site « up » peut renvoyer 500).",
      },
      {
        id: "q3",
        question: "Une alerte « webhook de paiement en panne »…",
        options: [
          {
            id: "a",
            label:
              "Cible une panne qui coûte de l'argent : paiements / sync qui n'aboutissent plus",
          },
          { id: "b", label: "Est inutile si la disponibilité de la page d'accueil est verte" },
          { id: "c", label: "Doit envoyer le corps secret dans Slack" },
          { id: "d", label: "Remplace la fiche d'incident" },
        ],
        correct: ["a"],
        explanation:
          "Surveille ce qui compte : un webhook en panne, c'est de l'argent et de la confiance en jeu, pas seulement un site joignable.",
      },
      {
        id: "q4",
        question: "Des alertes utiles sont…",
        options: [
          {
            id: "a",
            label: "Ciblées, testables et actionnables, sans noyer l'équipe sous le bruit",
          },
          { id: "b", label: "Une notification pour chaque log de débogage" },
          { id: "c", label: "Jamais testées « pour ne pas déranger »" },
          { id: "d", label: "Uniquement sur l'environnement local" },
        ],
        correct: ["a"],
        explanation:
          "Alerte fatiguée = alerte ignorée. Teste le déclenchement, documente la réponse.",
      },
      {
        id: "q5",
        question: "Configurer une alerte « paiement cassé » implique…",
        options: [
          {
            id: "a",
            label:
              "Un signal (échecs webhook / 5xx sur un point d'accès) + canal d'alerte + preuve de test",
          },
          { id: "b", label: "Uniquement un tableau de bord sans notification" },
          { id: "c", label: "Logger la clé secrète du fournisseur" },
          { id: "d", label: "Surveiller seulement le CSS du parcours de paiement" },
        ],
        correct: ["a"],
        explanation:
          "Exercice m02 : une alerte réelle quand le webhook paiement échoue, quel que soit le fournisseur.",
      },
    ],
  },

  m03: {
    id: "svc-ops-quiz-m03",
    title: "Sauvegardes & incident : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Une sauvegarde BDD utile, c'est…",
        options: [
          {
            id: "a",
            label:
              "Une copie restaurable, et tu as déjà testé la restauration au moins une fois",
          },
          { id: "b", label: "Un export jamais essayé « au cas où »" },
          { id: "c", label: "Une capture d'écran du tableau de bord" },
          { id: "d", label: "Committer la BDD dans git" },
        ],
        correct: ["a"],
        explanation:
          "Une sauvegarde dont tu n'as jamais testé la restauration reste une illusion. Critère P11 : sauvegarde restaurable démontrée.",
      },
      {
        id: "q2",
        question: "Une fiche d'incident d'une page doit…",
        options: [
          {
            id: "a",
            label:
              "Être actionnable : détection, actions, contacts, communication minimale",
          },
          { id: "b", label: "Faire 40 pages de théorie SRE" },
          { id: "c", label: "Rester dans la tête du fondateur seulement" },
          { id: "d", label: "Remplacer les alertes actives" },
        ],
        correct: ["a"],
        explanation:
          "Sous stress, une page claire > wiki introuvable. Livrable P11.",
      },
      {
        id: "q3",
        question: "La communication d'incident minimale…",
        options: [
          {
            id: "a",
            label:
              "Informe les parties prenantes (statut, impact, prochaine MAJ) sans panique",
          },
          { id: "b", label: "Partage les secrets et exports BDD publiquement" },
          { id: "c", label: "Attend une semaine avant tout message" },
          { id: "d", label: "Est optionnelle si la disponibilité est « presque verte »" },
        ],
        correct: ["a"],
        explanation:
          "Confiance = transparence calibrée. La fiche d'incident prévoit qui dit quoi, où.",
      },
      {
        id: "q4",
        question: "Une simulation d'incident avec la fiche…",
        options: [
          {
            id: "a",
            label:
              "Enchaîne détection → action → communication → bilan court",
          },
          { id: "b", label: "Se limite à relire la fiche sans rien faire" },
          { id: "c", label: "Supprime la prod « pour apprendre »" },
          { id: "d", label: "Ignore la sauvegarde" },
        ],
        correct: ["a"],
        explanation:
          "Exercice / projet : dérouler la fiche d'incident pour valider qu'elle tient sous stress.",
      },
      {
        id: "q5",
        question: "Le projet P11 exige notamment…",
        options: [
          {
            id: "a",
            label:
              "Fiche d'incident actionnable, alerte testée en prod, sauvegarde restaurable démontrée",
          },
          { id: "b", label: "Uniquement des logs de débogage en local" },
          { id: "c", label: "Aucune alerte « pour ne pas stresser »" },
          { id: "d", label: "Une sauvegarde jamais restaurée" },
        ],
        correct: ["a"],
        explanation:
          "Livrable : fiche d'incident + alerte active + restauration prouvée.",
      },
    ],
  },
};
