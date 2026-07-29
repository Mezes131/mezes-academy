import type { Quiz } from "@/types";

export const architectureQuizzes: Record<"m01" | "m02" | "m03", Quiz> = {
  m01: {
    id: "svc-architecture-quiz-m01",
    title: "Découper le système : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Dans un produit web typique, que fait surtout l'API ?",
        options: [
          { id: "a", label: "Afficher les boutons et le CSS" },
          { id: "b", label: "Exposer des opérations côté serveur (données, droits, règles métier)" },
          { id: "c", label: "Remplacer la base de données" },
          { id: "d", label: "Générer les clés Stripe" },
        ],
        correct: ["b"],
        explanation:
          "L'interface parle à l'API. L'API applique les règles et parle à la base / aux services externes.",
      },
      {
        id: "q2",
        question: "Qu'est-ce qu'une frontière de confiance ?",
        options: [
          { id: "a", label: "La ligne entre ton code et ce qui vient de l'extérieur (navigateur, notification d'un prestataire…) : là où tu dois vérifier" },
          { id: "b", label: "Un fichier CSS" },
          { id: "c", label: "Le nom du dépôt Git" },
          { id: "d", label: "Un thème sombre" },
        ],
        correct: ["a"],
        explanation:
          "Dès qu'une donnée traverse une frontière, tu vérifies saisies et droits. Le navigateur n'est jamais « de confiance ».",
      },
      {
        id: "q3",
        question: "Que sont les tâches différées ?",
        options: [
          { id: "a", label: "Du travail en arrière-plan (emails, imports) hors de la requête utilisateur immédiate" },
          { id: "b", label: "Des boutons désactivés" },
          { id: "c", label: "Des commits Git" },
          { id: "d", label: "Des polices web" },
        ],
        correct: ["a"],
        explanation:
          "Les tâches différées évitent de faire attendre l'utilisateur pour des traitements longs.",
      },
      {
        id: "q4",
        question: "Que l'IA ne doit pas inventer seule ?",
        options: [
          { id: "a", label: "La couleur d'un bouton secondaire" },
          { id: "b", label: "L'architecture, les contrats d'API et le schéma de données critiques" },
          { id: "c", label: "Un commentaire TODO" },
          { id: "d", label: "Le texte d'aide d'un champ" },
        ],
        correct: ["b"],
        explanation:
          "Tu cadres les décisions structurantes. L'IA propose du code à l'intérieur de ce cadre.",
      },
      {
        id: "q5",
        question: "Pourquoi dessiner les briques avant de générer ?",
        options: [
          { id: "a", label: "Pour remplir le README uniquement" },
          { id: "b", label: "Pour savoir où valider, où mettre les secrets, et ce que l'IA peut toucher" },
          { id: "c", label: "Parce que TypeScript l'exige" },
          { id: "d", label: "Pour bloquer Git" },
        ],
        correct: ["b"],
        explanation:
          "Sans carte, l'IA invente des frontières floues. Avec carte, tu audites et tu livres (Livraison) proprement.",
      },
    ],
  },

  m02: {
    id: "svc-architecture-quiz-m02",
    title: "Secrets et environnements : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Une variable « figée au build », c'est…",
        options: [
          { id: "a", label: "Une valeur collée dans le paquet au moment de la construction, souvent lisible ensuite" },
          { id: "b", label: "Une valeur qui change à chaque clic" },
          { id: "c", label: "Un secret impossible à voler" },
          { id: "d", label: "Un fichier .gitignore" },
        ],
        correct: ["a"],
        explanation:
          "Si tu mets un secret dans une variable de build front, il part souvent dans le navigateur. Catastrophe.",
      },
      {
        id: "q2",
        question: "Où doivent vivre les secrets de production ?",
        options: [
          { id: "a", label: "Dans le dépôt Git" },
          { id: "b", label: "Dans des variables d'environnement côté serveur / hébergeur, par environnement" },
          { id: "c", label: "Dans le CSS" },
          { id: "d", label: "Dans un commentaire du README" },
        ],
        correct: ["b"],
        explanation:
          "Local, aperçu en ligne et production ont leurs propres secrets. Jamais en dur dans le code.",
      },
      {
        id: "q3",
        question: "Pourquoi séparer local / aperçu en ligne / production ?",
        options: [
          { id: "a", label: "Pour multiplier les licences" },
          { id: "b", label: "Pour tester sans brûler la prod et limiter qui voit quels secrets" },
          { id: "c", label: "Parce que React l'impose" },
          { id: "d", label: "Uniquement pour le SEO" },
        ],
        correct: ["b"],
        explanation:
          "Tu expérimentes en local et en aperçu. La prod reste protégée.",
      },
      {
        id: "q4",
        question: "Quel piège Docker / CI faut-il éviter ?",
        options: [
          { id: "a", label: "Logger ou graver des secrets dans les images et les journaux de build" },
          { id: "b", label: "Utiliser un fichier .env local non versionné" },
          { id: "c", label: "Lire les secrets depuis l'hébergeur au démarrage" },
          { id: "d", label: "Avoir trois environnements nommés" },
        ],
        correct: ["a"],
        explanation:
          "Une image ou un journal qui contient un secret = fuite durable. Les secrets s'injectent au démarrage / à l'exécution.",
      },
      {
        id: "q5",
        question: "Mettre une clé Stripe live dans l'interface…",
        options: [
          { id: "a", label: "Est une bonne pratique de rapidité" },
          { id: "b", label: "Expose le secret à quiconque ouvre les outils du navigateur" },
          { id: "c", label: "Est exigé par Stripe" },
          { id: "d", label: "Protège automatiquement la production" },
        ],
        correct: ["b"],
        explanation:
          "Tout ce qui est dans le paquet navigateur est public. Les clés secrètes restent serveur.",
      },
    ],
  },

  m03: {
    id: "svc-architecture-quiz-m03",
    title: "Contrats et notifications : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Un contrat d'API, c'est surtout…",
        options: [
          { id: "a", label: "Un accord clair sur les entrées, sorties, erreurs et versions que les deux côtés respectent" },
          { id: "b", label: "Un fichier CSS partagé" },
          { id: "c", label: "Un tweet de release" },
          { id: "d", label: "Un thème sombre" },
        ],
        correct: ["a"],
        explanation:
          "Sans contrat stable, l'IA (et les équipes) cassent l'autre côté à chaque changement.",
      },
      {
        id: "q2",
        question: "Pourquoi vérifier la signature d'une notification automatique ?",
        options: [
          { id: "a", label: "Pour décorer les journaux" },
          { id: "b", label: "Pour s'assurer que le message vient bien du prestataire, pas d'un imposteur" },
          { id: "c", label: "Parce que JSON l'exige" },
          { id: "d", label: "Pour accélérer le paiement" },
        ],
        correct: ["b"],
        explanation:
          "Sans signature, n'importe qui peut annoncer un faux « paiement réussi ».",
      },
      {
        id: "q3",
        question: "« Ne pas traiter deux fois le même événement », c'est…",
        options: [
          { id: "a", label: "Un doublon ne doit pas double-créditer ou double-envoyer" },
          { id: "b", label: "Supprimer la base de données" },
          { id: "c", label: "Désactiver HTTPS" },
          { id: "d", label: "Ignorer toutes les erreurs" },
        ],
        correct: ["a"],
        explanation:
          "Les réseaux renvoient parfois la même notification deux fois. Ton système doit rester correct.",
      },
      {
        id: "q4",
        question: "Pourquoi borner délais et nouvelles tentatives ?",
        options: [
          { id: "a", label: "Pour éviter des boucles qui martèlent un service déjà en panne" },
          { id: "b", label: "Pour remplir le README" },
          { id: "c", label: "Parce que Git l'impose" },
          { id: "d", label: "Uniquement pour le CSS" },
        ],
        correct: ["a"],
        explanation:
          "Sans borne, un incident devient une avalanche d'appels.",
      },
      {
        id: "q5",
        question: "Faire confiance au corps JSON d'une notification sans signature…",
        options: [
          { id: "a", label: "Est acceptable en production" },
          { id: "b", label: "Est une mauvaise pratique dangereuse" },
          { id: "c", label: "Est exigé par tous les prestataires" },
          { id: "d", label: "Remplace les tests" },
        ],
        correct: ["b"],
        explanation:
          "Le corps est facile à fabriquer. La signature (ou équivalent) prouve l'origine.",
      },
    ],
  },
};
