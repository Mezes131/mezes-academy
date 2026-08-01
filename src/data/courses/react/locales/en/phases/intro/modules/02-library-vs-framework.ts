import type { Module } from "@/types";
import { introQuizzes } from "../quizzes";

export const module02: Module = {
  id: "react-intro-m02",
  index: "02",
  title: "Library or framework? The nuance that changes everything",
  subtitle: "Why React is deliberately minimal: and what that implies",
  duration: "2 min",
  content: [
    {
      kind: "paragraph",
      html: "A vocabulary detail that matters: React is a <strong>library</strong>, not a framework. The difference is philosophical: a framework imposes a structure and calls <em>your</em> code. A library waits for <em>you</em> to call it when you need it.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-lightbulb'></i> Practical consequence",
        body: "React only handles <strong>the view</strong>. For everything else (routing, HTTP requests, global state, complex forms, tests…), you pick the complementary tools yourself. That is both React's greatest strength and its greatest difficulty.",
      },
    },
    {
      kind: "paragraph",
      html: "In practice, a modern React stack often looks like: <strong>React</strong> (view) + <strong>React Router</strong> (navigation) + <strong>TanStack Query</strong> (server data) + <strong>Zustand</strong> (global state) + <strong>Tailwind CSS</strong> (styles).",
    },
  ],
  quiz: introQuizzes.m02,
};
