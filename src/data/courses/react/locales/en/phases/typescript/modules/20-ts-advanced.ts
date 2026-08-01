import type { Module } from "@/types";
import { typescriptQuizzes } from "../quizzes";
import { typescriptExercises } from "../exercises";

export const module20: Module = {
  id: "react-typescript-m20",
  index: "20",
  title: "Advanced TypeScript",
  subtitle: "Utility types, type guards, conditional types",
  duration: "1 week",
  content: [
    {
      kind: "paragraph",
      html: "Once you master the basics, TypeScript becomes a true <strong>language within the language</strong>. You can describe complex type transformations, extract subtypes, and make component APIs self-documenting.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "20.1",
          title: "20.1: Utility types",
          desc: "<code>Partial</code>, <code>Required</code>, <code>Pick</code>, <code>Omit</code>, <code>Record</code>, <code>ReturnType</code>, <code>Parameters</code>: the ones you use every day. Knowing how to combine them is worth its weight in gold.",
          tags: ["Partial", "Required", "Pick", "Omit", "Record"],
        },
        {
          id: "20.2",
          title: "20.2: Type guards & narrowing",
          desc: "<code>typeof</code>, <code>instanceof</code>, <code>in</code>, and custom type guards (<code>x is T</code>) to refine unions. Essential for working cleanly with data from an API.",
          tags: ["typeof", "instanceof", "in", "x is T"],
        },
        {
          id: "20.3",
          title: "20.3: Conditional types & inference",
          desc: "<code>T extends U ? A : B</code>, <code>infer</code>. The basics of type-level programming. This is what makes <code>ReturnType</code>, <code>Awaited</code>, and many others implementable in a single line.",
          tags: ["conditional types", "infer"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Conditional types + infer",
        html: `<span class="cm">// Extract the resolved type of a Promise</span>
<span class="kw">type</span> <span class="ty">MyAwaited</span>&lt;<span class="ty">T</span>&gt; = <span class="ty">T</span> <span class="kw">extends</span> <span class="ty">Promise</span>&lt;<span class="kw">infer</span> <span class="ty">U</span>&gt; ? <span class="ty">U</span> : <span class="ty">T</span>

<span class="kw">type</span> <span class="ty">A</span> = <span class="ty">MyAwaited</span>&lt;<span class="ty">Promise</span>&lt;<span class="ty">string</span>&gt;&gt;   <span class="cm">// string</span>
<span class="kw">type</span> <span class="ty">B</span> = <span class="ty">MyAwaited</span>&lt;<span class="ty">number</span>&gt;             <span class="cm">// number</span>

<span class="cm">// Same idea, built-in: ReturnType&lt;T&gt;</span>
<span class="kw">type</span> <span class="ty">R</span> = <span class="ty">ReturnType</span>&lt;<span class="kw">typeof</span> JSON.parse&gt; <span class="cm">// any</span>`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-circle-check'></i> Best practice",
        body: "Don't rush into type-level programming. In 95% of cases, a good combination of <code>Pick/Omit/Partial</code> plus a well-placed type guard is enough. Advanced conditional types are useful for <em>libraries</em>, rarely for application code.",
      },
    },
  ],
  quiz: typescriptQuizzes.m20,
  exercises: [typescriptExercises.m20_1],
};
