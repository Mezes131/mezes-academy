import type { Quiz } from "@/types";

export const ecosystemQuizzes = {
  m22: {
    id: "react-ecosystem-quiz-m22",
    title: "Quiz : Next.js App Router",
    questions: [
      {
        id: "q1",
        question: "Dans App Router (Next.js 14), par défaut un composant défini dans le dossier `app/` est :",
        options: [
          { id: "a", label: "Un Client Component" },
          { id: "b", label: "Un Server Component" },
          { id: "c", label: "Les deux à la fois" },
        ],
        correct: ["b"],
        explanation:
          "Tous les composants de `app/` sont des Server Components par défaut. Il faut ajouter `'use client'` en haut du fichier pour passer en Client Component.",
      },
      {
        id: "q2",
        question: "Que provoque l'ajout de la directive `'use client'` en haut d'un fichier ?",
        options: [
          { id: "a", label: "Le composant et ses descendants deviennent des Client Components (hydratation, hooks dispo)" },
          { id: "b", label: "Le composant est rendu uniquement sur le serveur" },
          { id: "c", label: "Le composant ne peut plus faire de fetch" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "À quoi servent les Server Actions ?",
        options: [
          { id: "a", label: "À appeler du code serveur (mutations BDD, envois d'emails…) directement depuis un formulaire ou un handler, sans créer de route API" },
          { id: "b", label: "À exécuter du JavaScript dans le navigateur plus vite" },
          { id: "c", label: "À remplacer Redux" },
        ],
        correct: ["a"],
      },
      {
        id: "q4",
        question: "À quoi sert le fichier `loading.tsx` dans un segment de route ?",
        options: [
          { id: "a", label: "À définir le favicon de la page" },
          { id: "b", label: "À afficher automatiquement un état de chargement pendant que le segment est streamé, via Suspense" },
          { id: "c", label: "À déclarer les métadonnées SEO" },
        ],
        correct: ["b"],
      },
    ],
  },

  m23: {
    id: "react-ecosystem-quiz-m23",
    title: "Quiz : State global",
    questions: [
      {
        id: "q1",
        question: "Pourquoi beaucoup d'équipes modernes choisissent Zustand plutôt que Redux ?",
        options: [
          { id: "a", label: "Zustand est plus rapide à exécuter au runtime" },
          { id: "b", label: "Zustand a une API minimaliste (1 hook), sans boilerplate, sans Provider obligatoire" },
          { id: "c", label: "Redux n'est plus maintenu" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "Quelle est la différence fondamentale entre Zustand et TanStack Query ?",
        options: [
          { id: "a", label: "Aucune, ce sont des alternatives équivalentes" },
          { id: "b", label: "Zustand gère le state CLIENT (UI) ; TanStack Query gère le state SERVEUR (cache, refetch, invalidation)" },
          { id: "c", label: "Zustand est pour les petits projets, TanStack pour les gros" },
        ],
        correct: ["b"],
        explanation:
          "Règle moderne : séparer état client et état serveur. Zustand/Jotai pour le state UI, TanStack Query pour les données distantes.",
      },
      {
        id: "q3",
        question: "Quelle bonne pratique éviter absolument avec un store global ?",
        options: [
          { id: "a", label: "Tout mettre dedans (formulaires, state de modals, tout)" },
          { id: "b", label: "Y mettre uniquement ce qui est vraiment partagé entre des composants lointains" },
          { id: "c", label: "Diviser le store en slices thématiques" },
        ],
        correct: ["a"],
        explanation:
          "Le state local reste le choix par défaut. Ne remontez au global que ce qui doit être partagé ou persisté.",
      },
    ],
  },

  m24: {
    id: "react-ecosystem-quiz-m24",
    title: "Quiz : Authentification",
    questions: [
      {
        id: "q1",
        question: "Différence essentielle entre une session (cookie) et un JWT stocké côté client ?",
        options: [
          { id: "a", label: "La session s'appuie sur un état côté serveur (révocable) ; un JWT est auto-porté (plus léger mais quasi-irrévocable avant expiration)" },
          { id: "b", label: "Le JWT est plus sûr dans tous les cas" },
          { id: "c", label: "Les sessions sont obsolètes" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Où stocker un token d'authentification côté navigateur ?",
        options: [
          { id: "a", label: "localStorage — pratique et partagé par tous les onglets" },
          { id: "b", label: "Cookie `httpOnly` + `Secure` + `SameSite=Lax` : non accessible en JS, donc protégé contre XSS" },
          { id: "c", label: "Dans une variable globale `window.token`" },
        ],
        correct: ["b"],
        explanation:
          "localStorage est lisible par n'importe quel script (risque XSS). Les cookies httpOnly sont le standard pour stocker des tokens de session.",
      },
      {
        id: "q3",
        question: "Que fait le middleware d'authentification Next.js typique ?",
        options: [
          { id: "a", label: "Il intercepte les requêtes, vérifie la session/cookie, et redirige vers /login si nécessaire" },
          { id: "b", label: "Il chiffre automatiquement les réponses" },
          { id: "c", label: "Il transforme automatiquement les mots de passe en hash bcrypt" },
        ],
        correct: ["a"],
      },
    ],
  },

  m25: {
    id: "react-ecosystem-quiz-m25",
    title: "Quiz : Bases de données & ORM",
    questions: [
      {
        id: "q1",
        question: "Qu'apporte un ORM comme Prisma par rapport à des requêtes SQL brutes ?",
        options: [
          { id: "a", label: "Un client typé auto-généré depuis le schéma, des migrations versionnées et une API ergonomique" },
          { id: "b", label: "Plus de performance que du SQL natif" },
          { id: "c", label: "Une sécurité absolue contre toutes les attaques" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Prisma vs Drizzle, quel est le grand trade-off ?",
        options: [
          { id: "a", label: "Prisma = DSL de haut niveau (schéma .prisma) ; Drizzle = proche du SQL, type-safe, sans runtime abstract" },
          { id: "b", label: "Aucune différence notable" },
          { id: "c", label: "Drizzle ne supporte pas PostgreSQL" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "Vrai ou faux : utiliser un ORM dispense complètement d'apprendre SQL.",
        options: [
          { id: "a", label: "Vrai" },
          { id: "b", label: "Faux : comprendre index, jointures et plans d'exécution reste indispensable pour diagnostiquer les lenteurs" },
        ],
        correct: ["b"],
      },
    ],
  },

  m26: {
    id: "react-ecosystem-quiz-m26",
    title: "Quiz : Tests",
    questions: [
      {
        id: "q1",
        question: "Quelle est la philosophie de React Testing Library ?",
        options: [
          { id: "a", label: "Tester l'implémentation interne (state, méthodes privées)" },
          { id: "b", label: "Tester du point de vue de l'utilisateur (ce qu'il voit, ce qu'il clique), via des queries par rôle ou texte" },
          { id: "c", label: "Générer des snapshots HTML sans assertion" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "Quelle pyramide des tests est généralement recommandée ?",
        options: [
          { id: "a", label: "Beaucoup d'e2e, peu de tests unitaires" },
          { id: "b", label: "Beaucoup de tests unitaires/intégration rapides, quelques e2e sur les parcours critiques" },
          { id: "c", label: "Uniquement des tests e2e" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "Dans un test Vitest + RTL, pour attendre qu'un élément apparaisse après un fetch asynchrone, on utilise :",
        options: [
          { id: "a", label: "getByText — il attend automatiquement" },
          { id: "b", label: "findByText — version async, retry jusqu'à trouver ou timeout" },
          { id: "c", label: "queryByText — uniquement pour confirmer une absence" },
        ],
        correct: ["b"],
      },
    ],
  },

  m27: {
    id: "react-ecosystem-quiz-m27",
    title: "Quiz : Performance & SEO",
    questions: [
      {
        id: "q1",
        question: "Parmi les Core Web Vitals, lequel mesure la stabilité visuelle (shift de layout) ?",
        options: [
          { id: "a", label: "LCP (Largest Contentful Paint)" },
          { id: "b", label: "INP (Interaction to Next Paint)" },
          { id: "c", label: "CLS (Cumulative Layout Shift)" },
        ],
        correct: ["c"],
      },
      {
        id: "q2",
        question: "Avantage principal de `next/image` ?",
        options: [
          { id: "a", label: "Optimisation automatique (formats modernes, responsive, lazy-loading, dimensions fixes contre CLS)" },
          { id: "b", label: "Il injecte automatiquement un watermark" },
          { id: "c", label: "Il remplace toutes les images en SVG" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "Quel fichier / API utilise-t-on dans App Router pour déclarer les métadonnées SEO d'une page ?",
        options: [
          { id: "a", label: "Un fichier `metadata.json` dans `public/`" },
          { id: "b", label: "L'export `metadata` (objet ou `generateMetadata` async) depuis `page.tsx` ou `layout.tsx`" },
          { id: "c", label: "Un composant `<Head>` importé de `next/head`" },
        ],
        correct: ["b"],
        explanation:
          "Dans App Router, on n'utilise plus `next/head`. On exporte un objet `metadata` (ou une fonction `generateMetadata`) depuis chaque segment.",
      },
    ],
  },
} satisfies Record<string, Quiz>;
