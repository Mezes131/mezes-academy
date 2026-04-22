import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";

export const module18: Module = {
  id: "react-core-m18",
  index: "M18",
  title: "Styling en React",
  subtitle: "CSS Modules, Tailwind CSS, styled-components et animations Framer Motion",
  duration: "1 semaine",
  content: [
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-box'></i> CSS Modules",
        body: "Scoping automatique des classes CSS. Zéro conflit de noms. Idéal pour les projets sans framework CSS.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-water'></i> Tailwind CSS",
        body: "Utility-first CSS. Écrire le style directement dans le JSX avec des classes pré-définies. Énorme productivité.",
      },
    },
    {
      kind: "lessons",
      items: [
        {
          id: "18.1",
          title: "8.1 : Tailwind CSS avec React",
          desc: "Installation, configuration, classes responsives, dark mode, et librairies de composants basées sur Tailwind (shadcn/ui, DaisyUI).",
          tags: ["cn()", "clsx", "tailwind-merge", "shadcn/ui"],
        },
        {
          id: "18.2",
          title: "8.2 : Framer Motion : animations avancées",
          desc: "La librairie d'animation la plus puissante pour React. Motion Components, variants, transitions, layout animations, drag & drop.",
          tags: ["motion.div", "variants", "AnimatePresence"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Framer Motion : animation d'entrée",
        html: `<span class="kw">import</span> { motion, AnimatePresence } <span class="kw">from</span> <span class="str">'framer-motion'</span>

<span class="kw">const</span> <span class="fn">Modal</span> = ({ <span class="prop">isOpen</span>, <span class="prop">children</span> }) =&gt; (
  <span class="jsx">&lt;AnimatePresence&gt;</span>
    {isOpen &amp;&amp; (
      <span class="jsx">&lt;motion.div</span>
        <span class="prop">initial</span>={{ opacity: <span class="num">0</span>, scale: <span class="num">0.9</span> }}
        <span class="prop">animate</span>={{ opacity: <span class="num">1</span>, scale: <span class="num">1</span> }}
        <span class="prop">exit</span>={{ opacity: <span class="num">0</span>, scale: <span class="num">0.9</span> }}
        <span class="prop">transition</span>={{ duration: <span class="num">0.2</span> }}
      <span class="jsx">&gt;</span>
        {children}
      <span class="jsx">&lt;/motion.div&gt;</span>
    )}
  <span class="jsx">&lt;/AnimatePresence&gt;</span>
)`,
      },
    },
  ],
  quiz: coreQuizzes.m18,
};
