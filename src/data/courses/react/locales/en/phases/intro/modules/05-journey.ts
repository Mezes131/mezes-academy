import type { Module } from "@/types";

export const module05: Module = {
  id: "react-intro-m05",
  index: "05",
  title: "How this track takes you to expertise",
  subtitle: "The teaching method and what to expect",
  duration: "2 min",
  content: [
    {
      kind: "paragraph",
      html: "This track is organized into <strong>progressive phases</strong>, designed so each idea builds on the previous one.",
    },
    { kind: "highlight", html: "<strong>Phase: React Core</strong>, Foundations: JSX, components, props, state, hooks, routing, styling" },
    { kind: "highlight", html: "<strong>Phase: TypeScript</strong>, Add typing to write robust code" },
    { kind: "highlight", html: "<strong>Phase: Ecosystem</strong>, Next.js, auth, databases, tests, performance" },
    { kind: "highlight", html: "<strong>Phase: Expert</strong>, Architecture, DevOps, React internals, open source, AI" },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-lightbulb'></i> The right learning posture",
        body: "React is learned <strong>by doing</strong>. After each module, do the exercises, break them, change them. The jump from « I understand the code » to « I write the code » is the biggest leap in this course.",
      },
    },
  ],
};
