import type { Quiz } from "@/types";

/**
 * All quizzes of the `react › intro` phase, keyed by their module slug.
 * Imported by each module file. Centralising them makes the content
 * pedagogy easier to review without scrolling through module bodies.
 */
export const introQuizzes = {
  m01: {
    id: "react-intro-quiz-m01",
    title: "Valide ta compréhension",
    questions: [
      {
        id: "q1",
        question: "En une phrase, qu'est-ce que React ?",
        options: [
          { id: "a", label: "Un langage de programmation concurrent de JavaScript" },
          { id: "b", label: "Une bibliothèque JavaScript pour construire des interfaces utilisateur" },
          { id: "c", label: "Un serveur web spécialisé dans les applications modernes" },
          { id: "d", label: "Une base de données orientée documents" },
        ],
        correct: ["b"],
        explanation:
          "React est bien une bibliothèque JavaScript (pas un langage, pas un serveur, pas une base de données) dédiée à la construction d'interfaces utilisateur.",
      },
      {
        id: "q2",
        question: "Quelle approche adopte React ?",
        options: [
          { id: "a", label: "Impérative : on dit étape par étape comment modifier le DOM" },
          { id: "b", label: "Déclarative : on décrit l'UI pour un état donné, React s'occupe du reste" },
          { id: "c", label: "Fonctionnelle pure : aucun état, aucune mutation possible" },
        ],
        correct: ["b"],
        explanation:
          "React est déclaratif : vous décrivez à quoi doit ressembler l'interface pour un état donné, et c'est React qui calcule les mises à jour du DOM.",
      },
      {
        id: "q3",
        question: "Qui a créé React et en quelle année ?",
        options: [
          { id: "a", label: "Google, en 2010" },
          { id: "b", label: "Microsoft, en 2015" },
          { id: "c", label: "Facebook (Meta), en 2013" },
          { id: "d", label: "Vercel, en 2016" },
        ],
        correct: ["c"],
      },
    ],
  },

  m02: {
    id: "react-intro-quiz-m02",
    title: "Bibliothèque vs framework",
    questions: [
      {
        id: "q1",
        question: "React est…",
        options: [
          { id: "a", label: "Un framework complet avec tout inclus" },
          { id: "b", label: "Une bibliothèque qui ne gère que la vue" },
          { id: "c", label: "Un runtime JavaScript alternatif" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "Laquelle de ces responsabilités N'EST PAS gérée par React lui-même ?",
        options: [
          { id: "a", label: "Le rendu des composants" },
          { id: "b", label: "La gestion du state local d'un composant" },
          { id: "c", label: "Les requêtes HTTP vers une API" },
          { id: "d", label: "Le Virtual DOM" },
        ],
        correct: ["c"],
        explanation:
          "Les requêtes HTTP ne sont pas gérées par React. On utilise fetch, axios, ou des bibliothèques comme TanStack Query.",
      },
    ],
  },

  m03: {
    id: "react-intro-quiz-m03",
    title: "Les 3 piliers",
    questions: [
      {
        id: "q1",
        question: "Quels sont les 3 piliers de React ? (plusieurs réponses)",
        options: [
          { id: "a", label: "Les composants" },
          { id: "b", label: "Les bases de données" },
          { id: "c", label: "Le state" },
          { id: "d", label: "Le Virtual DOM" },
          { id: "e", label: "Le serveur Node.js" },
        ],
        correct: ["a", "c", "d"],
        explanation: "Composants + state + Virtual DOM. Le reste n'est pas propre à React.",
      },
      {
        id: "q2",
        question: "À quoi sert le Virtual DOM ?",
        options: [
          { id: "a", label: "À remplacer complètement le DOM du navigateur" },
          { id: "b", label: "À calculer les différences et n'appliquer au vrai DOM que le strict minimum" },
          { id: "c", label: "À stocker les données de l'utilisateur" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "Quand React re-dessine-t-il un composant ?",
        options: [
          { id: "a", label: "À chaque seconde par défaut" },
          { id: "b", label: "Quand son state ou ses props changent" },
          { id: "c", label: "Jamais automatiquement, il faut appeler render() soi-même" },
        ],
        correct: ["b"],
      },
    ],
  },

  m04: {
    id: "react-intro-quiz-m04",
    title: "Pourquoi React ?",
    questions: [
      {
        id: "q1",
        question: "Laquelle de ces entreprises utilise React ?",
        options: [
          { id: "a", label: "Meta / Facebook" },
          { id: "b", label: "Netflix" },
          { id: "c", label: "Airbnb" },
          { id: "d", label: "Toutes les propositions" },
        ],
        correct: ["d"],
      },
      {
        id: "q2",
        question: "Vrai ou faux : maîtriser React dispense d'apprendre HTML, CSS et JavaScript.",
        options: [
          { id: "a", label: "Vrai" },
          { id: "b", label: "Faux" },
        ],
        correct: ["b"],
        explanation: "React repose entièrement sur JavaScript, et s'interface avec HTML et CSS. Les bases restent indispensables.",
      },
    ],
  },
} satisfies Record<string, Quiz>;
