import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";

export const module18: Module = {
  id: "react-core-m13",
  index: "13",
  title: "Styling in React",
  subtitle: "CSS Modules, Tailwind CSS, styled-components, and Framer Motion animations",
  duration: "1 week",
  content: [
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-box'></i> CSS Modules",
        body: "Automatic CSS class scoping. Zero name collisions. Ideal for projects without a CSS framework.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-water'></i> Tailwind CSS",
        body: "Utility-first CSS. Write styles directly in JSX with predefined classes. Huge productivity boost.",
      },
    },
    {
      kind: "lessons",
      items: [
        {
          id: "18.1",
          title: "8.1: Tailwind CSS with React",
          desc: "Install, configure, responsive classes, dark mode, and Tailwind-based component libraries (shadcn/ui, DaisyUI).",
          tags: ["cn()", "clsx", "tailwind-merge", "shadcn/ui"],
        },
        {
          id: "18.2",
          title: "8.2: Framer Motion, advanced animations",
          desc: "The most powerful animation library for React. Motion components, variants, transitions, layout animations, drag & drop.",
          tags: ["motion.div", "variants", "AnimatePresence"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Framer Motion: enter animation",
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
