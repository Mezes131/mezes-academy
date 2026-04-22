import type { Quiz } from "@/types";

export const expertQuizzes = {
  m28: {
    id: "react-expert-quiz-m28",
    title: "Quiz : Architecture",
    questions: [
      {
        id: "q1",
        question: "Quel est l'argument principal pour organiser un projet React « par feature » plutôt que « par type » (components/, hooks/, services/) ?",
        options: [
          { id: "a", label: "Le code lié à un même cas d'usage reste colocalisé — modification et suppression d'une feature deviennent triviales" },
          { id: "b", label: "C'est plus rapide à exécuter au runtime" },
          { id: "c", label: "Les linters l'imposent" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Un monorepo avec Turborepo apporte surtout :",
        options: [
          { id: "a", label: "Cache partagé des builds/tests, partage de packages internes, outillage unifié" },
          { id: "b", label: "Des performances runtime supérieures au multi-repo" },
          { id: "c", label: "Une meilleure sécurité contre les attaques XSS" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "Dans une Clean Architecture côté front, les dépendances doivent pointer :",
        options: [
          { id: "a", label: "Du domaine vers l'infrastructure (UI dépend du domaine, domaine dépend de l'infra)" },
          { id: "b", label: "De l'extérieur vers l'intérieur : UI → application → domaine. Jamais l'inverse" },
          { id: "c", label: "Dans tous les sens, la règle n'existe pas" },
        ],
        correct: ["b"],
        explanation:
          "La règle de Clean Architecture : les couches externes connaissent les couches internes, pas l'inverse. Le domaine ne doit rien savoir de React ou HTTP.",
      },
    ],
  },

  m29: {
    id: "react-expert-quiz-m29",
    title: "Quiz : DevOps & CI/CD",
    questions: [
      {
        id: "q1",
        question: "À quoi sert un job de cache dans GitHub Actions pour un projet Node/React ?",
        options: [
          { id: "a", label: "À mettre en cache `node_modules` et le store du gestionnaire (pnpm/npm/yarn) pour accélérer les builds suivants" },
          { id: "b", label: "À sauvegarder les logs en cas d'échec" },
          { id: "c", label: "À chiffrer les secrets" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Pourquoi utiliser un Dockerfile multi-stage pour une app Next.js ?",
        options: [
          { id: "a", label: "Pour séparer l'étape de build (lourde, avec devDependencies) de l'image finale (minimale, runtime seulement)" },
          { id: "b", label: "Parce que c'est obligatoire" },
          { id: "c", label: "Pour doubler la vitesse du serveur" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "Vercel vs self-hosted (Node/Fly.io), quel est un trade-off important ?",
        options: [
          { id: "a", label: "Vercel = DX exceptionnelle et préview deployments, mais vendor lock-in et coûts qui grimpent à l'échelle. Self-hosted = flexibilité maximale mais charge opérationnelle" },
          { id: "b", label: "Vercel est gratuit en toutes circonstances" },
          { id: "c", label: "Self-hosted ne supporte pas Next.js" },
        ],
        correct: ["a"],
      },
    ],
  },

  m30: {
    id: "react-expert-quiz-m30",
    title: "Quiz : React Internals",
    questions: [
      {
        id: "q1",
        question: "Le reconciler Fiber a été introduit pour :",
        options: [
          { id: "a", label: "Diviser le rendu en unités de travail interruptibles, permettant de prioriser les mises à jour urgentes" },
          { id: "b", label: "Remplacer le Virtual DOM par un vrai DOM serveur" },
          { id: "c", label: "Réduire la taille du bundle de moitié" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Que fait `useTransition` ?",
        options: [
          { id: "a", label: "Il anime les transitions CSS" },
          { id: "b", label: "Il marque une mise à jour de state comme non-urgente, laissant les interactions plus prioritaires rester fluides" },
          { id: "c", label: "Il annule l'update précédent automatiquement" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "Hydration : qu'est-ce qui se passe entre le serveur et le client ?",
        options: [
          { id: "a", label: "Le serveur envoie du HTML statique. Le client attache les event listeners et « reconstruit » le Virtual DOM correspondant pour reprendre là où le serveur a laissé" },
          { id: "b", label: "Le client télécharge un fichier `.hydrate.js` qui remplace tout le HTML" },
          { id: "c", label: "Rien, l'hydration est un mythe" },
        ],
        correct: ["a"],
      },
      {
        id: "q4",
        question: "Qu'est-ce qu'une « hydration mismatch » et comment la résoudre ?",
        options: [
          { id: "a", label: "Le HTML serveur ≠ du HTML rendu par le client (ex. `Date.now()` utilisé directement). Solutions : rendre côté client uniquement, ou fournir une valeur stable côté serveur" },
          { id: "b", label: "C'est toujours un bug de Next.js qu'il faut ignorer" },
          { id: "c", label: "Ça ne peut pas arriver avec React 18" },
        ],
        correct: ["a"],
      },
    ],
  },

  m31: {
    id: "react-expert-quiz-m31",
    title: "Quiz : Open Source",
    questions: [
      {
        id: "q1",
        question: "Qu'apportent les `changesets` dans un projet de librairie ?",
        options: [
          { id: "a", label: "Un flow déclaratif pour versionner (semver) et générer un changelog à partir de PRs" },
          { id: "b", label: "Un moteur de tests end-to-end" },
          { id: "c", label: "Une alternative à Git" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Dans un `package.json` de librairie moderne, quelles clés indiquent que le package expose à la fois CJS, ESM et ses types ?",
        options: [
          { id: "a", label: "`main`, `module` et `types` (ou mieux : `exports` avec `require`/`import`/`types`)" },
          { id: "b", label: "`browser` uniquement" },
          { id: "c", label: "`bin`" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "Bonne première contribution open source :",
        options: [
          { id: "a", label: "Une PR qui refactore 40 fichiers pour \"améliorer le code\"" },
          { id: "b", label: "Un fix ciblé sur une issue marquée `good first issue`, avec test de régression et mention du maintainer avant de commencer" },
          { id: "c", label: "Ouvrir une PR sans ouvrir d'issue d'abord" },
        ],
        correct: ["b"],
      },
    ],
  },

  m32: {
    id: "react-expert-quiz-m32",
    title: "Quiz : React & IA",
    questions: [
      {
        id: "q1",
        question: "Que fait le hook `useChat` du Vercel AI SDK ?",
        options: [
          { id: "a", label: "Il gère l'état d'une conversation, l'envoi des messages et le streaming incrémental des tokens renvoyés par le LLM" },
          { id: "b", label: "Il envoie automatiquement les messages vers OpenAI sans configuration" },
          { id: "c", label: "Il remplace WebSocket" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Qu'est-ce que RAG (Retrieval-Augmented Generation) ?",
        options: [
          { id: "a", label: "Une technique où on récupère des documents pertinents via des embeddings + une base vectorielle, puis on les injecte dans le prompt pour que le LLM réponde à partir de tes données" },
          { id: "b", label: "Un nouveau modèle d'OpenAI" },
          { id: "c", label: "Une technique de compression des prompts" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "Bonne UX pour une interface IA :",
        options: [
          { id: "a", label: "Cacher le stream et attendre la réponse complète pour éviter la confusion" },
          { id: "b", label: "Streamer les tokens, afficher clairement le statut (thinking/tool call/done), et permettre d'interrompre la génération" },
          { id: "c", label: "Ne pas gérer les erreurs : le modèle ne se trompe jamais" },
        ],
        correct: ["b"],
      },
    ],
  },
} satisfies Record<string, Quiz>;
