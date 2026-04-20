import type { Phase } from "@/types";

/**
 * Scaffolds des phases 4, 5 et 6.
 * Contenu minimal (titres, résumés, listes de leçons) : les quiz et exercices
 * interactifs seront ajoutés dans une itération ultérieure.
 */

export const phase4: Phase = {
  id: "phase4",
  color: "ts",
  icon: "fa-gem",
  label: "TypeScript",
  title: "TypeScript avec React",
  summary:
    "TypeScript est devenu incontournable en production. Cette phase apprend à typer progressivement le code React pour des applications robustes, maintenables et documentées.",
  metaTags: ["3 modules", "~4 semaines", "2 projets portfolio", "TypeScript 5", "strict mode"],
  scaffoldOnly: true,
  modules: [
    {
      id: "m19",
      index: "M19",
      title: "Bases de TypeScript",
      subtitle: "Types primitifs, interfaces, génériques et unions",
      duration: "1 semaine",
      content: [
        {
          kind: "paragraph",
          html: "TypeScript ajoute une couche de typage statique à JavaScript. Le compilateur vérifie la cohérence des types à la compilation, ce qui évite toute une classe de bugs en production.",
        },
        {
          kind: "lessons",
          items: [
            { id: "19.1", title: "Types primitifs & annotations", desc: "string, number, boolean, null, undefined, any, unknown, never, void." },
            { id: "19.2", title: "Interfaces vs type aliases", desc: "Quand utiliser l'un ou l'autre. Règle pragmatique : interface pour les objets, type pour les unions et les utilitaires." },
            { id: "19.3", title: "Unions, intersections, literal types", desc: "Combiner les types pour exprimer des variations fines." },
            { id: "19.4", title: "Génériques", desc: "Créer des types paramétrés réutilisables. La base des bibliothèques modernes." },
          ],
        },
      ],
    },
    {
      id: "m20",
      index: "M20",
      title: "TypeScript avancé",
      subtitle: "Utility types, type guards, conditional types",
      duration: "1 semaine",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "20.1", title: "Utility types", desc: "Partial, Required, Pick, Omit, Record, ReturnType : les plus utilisés au quotidien." },
            { id: "20.2", title: "Type guards & narrowing", desc: "typeof, instanceof, in, et custom type guards pour affiner les unions." },
            { id: "20.3", title: "Conditional types & inférence", desc: "T extends U ? A : B, infer. Les bases de la programmation au niveau des types." },
          ],
        },
      ],
    },
    {
      id: "m21",
      index: "M21",
      title: "React + TypeScript",
      subtitle: "Typer les composants, props, state, events, hooks et contexts",
      duration: "2 semaines",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "21.1", title: "Typer les composants et leurs props", desc: "React.FC ? ou pas ? Bonnes pratiques et pièges." },
            { id: "21.2", title: "Typer useState, useReducer, useRef", desc: "Inférence automatique vs types explicites." },
            { id: "21.3", title: "Événements DOM typés", desc: "ChangeEvent<HTMLInputElement>, FormEvent, MouseEvent et compagnie." },
            { id: "21.4", title: "Typer les custom hooks et les contexts", desc: "Exposer une API claire et auto-documentée." },
          ],
        },
      ],
    },
  ],
};

export const phase5: Phase = {
  id: "phase5",
  color: "eco",
  icon: "fa-rocket",
  label: "Écosystème",
  title: "Écosystème & Fullstack",
  summary:
    "Dépasser le client pour construire des applications complètes : Next.js, authentification, bases de données, tests et performance.",
  metaTags: ["6 modules", "~8 semaines", "2 projets portfolio", "Next.js 14", "Fullstack"],
  scaffoldOnly: true,
  modules: [
    {
      id: "m22",
      index: "M22",
      title: "Next.js 14 (App Router)",
      subtitle: "Server Components, Server Actions, routing par fichiers",
      duration: "2 semaines",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "22.1", title: "App Router & layouts imbriqués", desc: "La nouvelle architecture de Next.js 14 basée sur les dossiers." },
            { id: "22.2", title: "Server Components vs Client Components", desc: "La directive 'use client' et quand l'utiliser." },
            { id: "22.3", title: "Server Actions", desc: "Muter des données côté serveur directement depuis les composants." },
            { id: "22.4", title: "Streaming, Suspense & loading.tsx", desc: "Afficher l'UI progressivement pendant le chargement." },
          ],
        },
      ],
    },
    {
      id: "m23",
      index: "M23",
      title: "State global : Zustand, Redux, Jotai",
      subtitle: "Partager du state entre composants lointains",
      duration: "1 semaine",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "23.1", title: "Zustand : la simplicité moderne", desc: "Pourquoi Zustand est devenu le choix par défaut en 2026." },
            { id: "23.2", title: "Redux Toolkit", desc: "Le standard historique, toujours pertinent pour les grosses applications." },
            { id: "23.3", title: "TanStack Query pour le state serveur", desc: "Séparer état client et état serveur : l'un des meilleurs choix architecturaux." },
          ],
        },
      ],
    },
    {
      id: "m24",
      index: "M24",
      title: "Authentification",
      subtitle: "NextAuth / Auth.js, sessions, JWT, OAuth",
      duration: "1 semaine",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "24.1", title: "Les modèles d'auth modernes", desc: "Session vs JWT vs OAuth : comprendre les trade-offs." },
            { id: "24.2", title: "NextAuth.js (Auth.js)", desc: "La solution intégrée la plus populaire pour Next.js." },
            { id: "24.3", title: "Routes protégées & middleware", desc: "Sécuriser l'accès côté serveur." },
          ],
        },
      ],
    },
    {
      id: "m25",
      index: "M25",
      title: "Bases de données & ORM",
      subtitle: "Prisma, Drizzle, PostgreSQL",
      duration: "1.5 semaines",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "25.1", title: "PostgreSQL pour les développeurs front-end", desc: "Les notions essentielles à maîtriser." },
            { id: "25.2", title: "Prisma : l'ORM moderne", desc: "Schéma déclaratif, migrations, client typé." },
            { id: "25.3", title: "Drizzle : l'alternative type-safe", desc: "Pour ceux qui veulent rester proches du SQL." },
          ],
        },
      ],
    },
    {
      id: "m26",
      index: "M26",
      title: "Tests : Vitest, Testing Library, Playwright",
      subtitle: "Tests unitaires, d'intégration et e2e",
      duration: "1 semaine",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "26.1", title: "Pyramide des tests", desc: "Unit / integration / e2e : combien et quand ?" },
            { id: "26.2", title: "Vitest + React Testing Library", desc: "Tester un composant comme un utilisateur l'utiliserait." },
            { id: "26.3", title: "Playwright pour les tests e2e", desc: "Simuler des parcours complets dans un vrai navigateur." },
          ],
        },
      ],
    },
    {
      id: "m27",
      index: "M27",
      title: "Performance & SEO",
      subtitle: "Core Web Vitals, images, lazy loading, metadata",
      duration: "1 semaine",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "27.1", title: "Core Web Vitals", desc: "LCP, FID/INP, CLS : les métriques qui comptent pour Google et vos utilisateurs." },
            { id: "27.2", title: "next/image & lazy loading", desc: "Optimisation automatique des images en production." },
            { id: "27.3", title: "Metadata API et SEO technique", desc: "Titres, OpenGraph, sitemap, robots.txt en Next.js 14." },
          ],
        },
      ],
    },
  ],
};

export const phase6: Phase = {
  id: "phase6",
  color: "expert",
  icon: "fa-trophy",
  label: "Expert",
  title: "Expert & Légendaire",
  summary:
    "Le niveau senior : architecture, DevOps, internals de React, contribution open source et intégration de l'IA dans les applications.",
  metaTags: ["5 modules", "~8 semaines", "3 projets portfolio", "Architecture", "Open Source", "IA"],
  scaffoldOnly: true,
  modules: [
    {
      id: "m28",
      index: "M28",
      title: "Architecture avancée",
      subtitle: "Monorepos, DDD, Clean Architecture en React",
      duration: "1.5 semaines",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "28.1", title: "Monorepos avec Turborepo ou Nx", desc: "Gérer plusieurs apps et packages dans un seul dépôt." },
            { id: "28.2", title: "Domain-Driven Design appliqué au front-end", desc: "Organiser son code par domaine métier plutôt que par type de fichier." },
            { id: "28.3", title: "Clean Architecture & feature-based folder structure", desc: "Des applications qui scalent à 100 000 lignes de code sans s'écrouler." },
          ],
        },
      ],
    },
    {
      id: "m29",
      index: "M29",
      title: "DevOps & CI/CD",
      subtitle: "GitHub Actions, Docker, déploiements",
      duration: "1.5 semaines",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "29.1", title: "GitHub Actions pour les projets React", desc: "Lint, tests, build, deploy automatisés sur chaque PR." },
            { id: "29.2", title: "Docker pour les apps Next.js", desc: "Dockerfile multi-stage optimisé." },
            { id: "29.3", title: "Déploiement : Vercel, Fly.io, self-hosted", desc: "Comparaison honnête des options." },
          ],
        },
      ],
    },
    {
      id: "m30",
      index: "M30",
      title: "React Internals",
      subtitle: "Reconciliation, Fiber, concurrent features",
      duration: "1 semaine",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "30.1", title: "Le reconciler et l'algorithme Fiber", desc: "Comprendre comment React décide de ce qui doit être re-rendu." },
            { id: "30.2", title: "Concurrent features : startTransition, useTransition", desc: "Des UIs qui restent réactives même sous charge." },
            { id: "30.3", title: "Hydration & Server Components", desc: "Ce qui se passe vraiment entre serveur et client." },
          ],
        },
      ],
    },
    {
      id: "m31",
      index: "M31",
      title: "Contribution Open Source",
      subtitle: "Publier une librairie npm, trouver sa première contribution",
      duration: "1 semaine",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "31.1", title: "Publier une librairie npm typée", desc: "tsup, changesets, semver." },
            { id: "31.2", title: "Contribuer à React / Next.js / Tailwind", desc: "Trouver un bon first-issue et proposer une PR professionnelle." },
          ],
        },
      ],
    },
    {
      id: "m32",
      index: "M32",
      title: "React & IA",
      subtitle: "Intégrer LLM, RAG et fonctionnalités IA dans une app React",
      duration: "2 semaines",
      content: [
        {
          kind: "lessons",
          items: [
            { id: "32.1", title: "Vercel AI SDK", desc: "Streaming d'une complétion LLM dans un composant React." },
            { id: "32.2", title: "RAG : Retrieval-Augmented Generation", desc: "Embeddings, vector DB, réponses basées sur vos données." },
            { id: "32.3", title: "UX des interfaces IA", desc: "Loading states, streaming, gestion des erreurs de modèle." },
          ],
        },
      ],
    },
  ],
};
