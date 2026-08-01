import type { Quiz } from "@/types";

/**
 * All quizzes of the `react › intro` phase, keyed by their module slug.
 * Imported by each module file. Centralising them makes the content
 * pedagogy easier to review without scrolling through module bodies.
 */
export const introQuizzes = {
  m01: {
    id: "react-intro-quiz-m01",
    title: "Check your understanding",
    questions: [
      {
        id: "q1",
        question: "In one sentence, what is React?",
        options: [
          { id: "a", label: "A programming language that competes with JavaScript" },
          { id: "b", label: "A JavaScript library for building user interfaces" },
          { id: "c", label: "A web server specialized in modern apps" },
          { id: "d", label: "A document-oriented database" },
        ],
        correct: ["b"],
        explanation:
          "React is a JavaScript library (not a language, not a server, not a database) dedicated to building user interfaces.",
      },
      {
        id: "q2",
        question: "Which approach does React take?",
        options: [
          { id: "a", label: "Imperative: you say step by step how to modify the DOM" },
          { id: "b", label: "Declarative: you describe the UI for a given state, React handles the rest" },
          { id: "c", label: "Pure functional: no state, no mutation possible" },
        ],
        correct: ["b"],
        explanation:
          "React is declarative: you describe what the UI should look like for a given state, and React computes the DOM updates.",
      },
      {
        id: "q3",
        question: "Who created React, and in which year?",
        options: [
          { id: "a", label: "Google, in 2010" },
          { id: "b", label: "Microsoft, in 2015" },
          { id: "c", label: "Facebook (Meta), in 2013" },
          { id: "d", label: "Vercel, in 2016" },
        ],
        correct: ["c"],
      },
    ],
  },

  m02: {
    id: "react-intro-quiz-m02",
    title: "Library vs framework",
    questions: [
      {
        id: "q1",
        question: "React is…",
        options: [
          { id: "a", label: "A full framework with everything included" },
          { id: "b", label: "A library that only handles the view" },
          { id: "c", label: "An alternative JavaScript runtime" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "Which of these responsibilities is NOT handled by React itself?",
        options: [
          { id: "a", label: "Rendering components" },
          { id: "b", label: "Managing a component's local state" },
          { id: "c", label: "HTTP requests to an API" },
          { id: "d", label: "The Virtual DOM" },
        ],
        correct: ["c"],
        explanation:
          "HTTP requests are not handled by React. You use fetch, axios, or libraries like TanStack Query.",
      },
    ],
  },

  m03: {
    id: "react-intro-quiz-m03",
    title: "The 3 pillars",
    questions: [
      {
        id: "q1",
        question: "What are React's 3 pillars? (multiple answers)",
        options: [
          { id: "a", label: "Components" },
          { id: "b", label: "Databases" },
          { id: "c", label: "State" },
          { id: "d", label: "The Virtual DOM" },
          { id: "e", label: "The Node.js server" },
        ],
        correct: ["a", "c", "d"],
        explanation: "Components + state + Virtual DOM. The rest is not specific to React.",
      },
      {
        id: "q2",
        question: "What is the Virtual DOM for?",
        options: [
          { id: "a", label: "To completely replace the browser DOM" },
          { id: "b", label: "To compute differences and apply only the minimum to the real DOM" },
          { id: "c", label: "To store user data" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "When does React re-render a component?",
        options: [
          { id: "a", label: "Every second by default" },
          { id: "b", label: "When its state or props change" },
          { id: "c", label: "Never automatically — you must call render() yourself" },
        ],
        correct: ["b"],
      },
    ],
  },

  m04: {
    id: "react-intro-quiz-m04",
    title: "Why React?",
    questions: [
      {
        id: "q1",
        question: "Which of these companies uses React?",
        options: [
          { id: "a", label: "Meta / Facebook" },
          { id: "b", label: "Netflix" },
          { id: "c", label: "Airbnb" },
          { id: "d", label: "All of the above" },
        ],
        correct: ["d"],
      },
      {
        id: "q2",
        question: "True or false: mastering React means you can skip learning HTML, CSS, and JavaScript.",
        options: [
          { id: "a", label: "True" },
          { id: "b", label: "False" },
        ],
        correct: ["b"],
        explanation:
          "React is entirely built on JavaScript and interfaces with HTML and CSS. The fundamentals remain essential.",
      },
    ],
  },
} satisfies Record<string, Quiz>;
