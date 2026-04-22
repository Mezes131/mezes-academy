import type { Module } from "@/types";
import { introQuizzes } from "../quizzes";

export const module02: Module = {
  id: "react-intro-m02",
  index: "02",
  title: "Bibliothèque ou framework ? La nuance qui change tout",
  subtitle: "Pourquoi React est volontairement minimaliste : et ce que cela implique",
  duration: "2 min",
  content: [
    {
      kind: "paragraph",
      html: "Un détail de vocabulaire qui a son importance : React est une <strong>bibliothèque</strong> (<em>library</em>), pas un framework. La différence est philosophique : un framework vous impose une structure et appelle <em>votre</em> code. Une bibliothèque, elle, attend que <em>vous</em> l'appeliez, quand vous en avez besoin.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-lightbulb'></i> Conséquence pratique",
        body: "React ne gère <strong>que la vue</strong>. Pour tout le reste (routing, requêtes HTTP, gestion du state global, formulaires complexes, tests…), vous choisissez vous-même les outils complémentaires. C'est à la fois la plus grande force et la plus grande difficulté de React.",
      },
    },
    {
      kind: "paragraph",
      html: "Concrètement, la stack React moderne ressemble souvent à : <strong>React</strong> (vue) + <strong>React Router</strong> (navigation) + <strong>TanStack Query</strong> (données serveur) + <strong>Zustand</strong> (state global) + <strong>Tailwind CSS</strong> (styles).",
    },
  ],
  quiz: introQuizzes.m02,
};
