import type { Module } from "@/types";
import { introQuizzes } from "../quizzes";

export const module01: Module = {
  id: "react-intro-m01",
  index: "01",
  title: "A plain definition, no jargon",
  subtitle: "Understand React in one sentence — then really understand it",
  duration: "3 min",
  openByDefault: true,
  content: [
    { kind: "title", text: "The official definition" },
    {
      kind: "paragraph",
      html: "<strong>React is a JavaScript library created by Facebook (now Meta) in 2013 for building user interfaces.</strong> That's it. No magic, no mystery: React is a <em>tool</em> that helps you render buttons, forms, lists, whole pages — in short, everything the user sees and interacts with in a browser.",
    },
    {
      kind: "paragraph",
      html: "But that definition, while accurate, doesn't say <em>why</em> React became the worldwide standard for modern web development. To get that, you need to go back to the problem it solves.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-puzzle-piece'></i> An analogy to get started",
        body: "Imagine you're building a house. Without React, you make every brick, window, and door by hand, one by one. With React, you design a <strong>window model</strong> and a <strong>door model</strong> once, then reuse them as many times as you need. Better still: when you change the paint, React repaints <em>only</em> the walls that need it.",
      },
    },
    { kind: "title", text: "The real problem React solves" },
    {
      kind: "paragraph",
      html: "Before React, building an interactive UI with vanilla JavaScript or jQuery was exhausting. On every click, every keystroke, you had to manually:",
    },
    { kind: "highlight", html: "<i class='fa-solid fa-magnifying-glass'></i> Find the right HTML element on the page (<code>document.querySelector</code>)" },
    { kind: "highlight", html: "<i class='fa-solid fa-pen-to-square'></i> Change its content or style by hand" },
    { kind: "highlight", html: "<i class='fa-solid fa-arrows-rotate'></i> Sync every part of the UI that depends on that change" },
    { kind: "highlight", html: "<i class='fa-solid fa-bug'></i> Debug for hours when some state was stale somewhere" },
    {
      kind: "paragraph",
      html: "The bigger the app got, the more the code looked like spaghetti. React offers a radically different idea: <strong>describe what the UI should look like for a given state, and let React update the DOM.</strong> You move from <em>imperative</em> logic (\"do this, then that\") to <em>declarative</em> logic (\"here's what I want to see\").",
    },
  ],
  quiz: introQuizzes.m01,
};
