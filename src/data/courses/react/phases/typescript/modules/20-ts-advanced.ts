import type { Module } from "@/types";
import { typescriptQuizzes } from "../quizzes";
import { typescriptExercises } from "../exercises";

export const module20: Module = {
  id: "react-typescript-m20",
  index: "M20",
  title: "TypeScript avancé",
  subtitle: "Utility types, type guards, conditional types",
  duration: "1 semaine",
  content: [
    {
      kind: "paragraph",
      html: "Quand on maîtrise les bases, TypeScript devient un véritable <strong>langage dans le langage</strong>. On peut décrire des transformations de types complexes, extraire des sous-types, rendre l'API des composants auto-documentée.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "20.1",
          title: "20.1 : Utility types",
          desc: "<code>Partial</code>, <code>Required</code>, <code>Pick</code>, <code>Omit</code>, <code>Record</code>, <code>ReturnType</code>, <code>Parameters</code> : les plus utilisés au quotidien. Savoir les combiner vaut de l'or.",
          tags: ["Partial", "Required", "Pick", "Omit", "Record"],
        },
        {
          id: "20.2",
          title: "20.2 : Type guards & narrowing",
          desc: "<code>typeof</code>, <code>instanceof</code>, <code>in</code>, et custom type guards (<code>x is T</code>) pour affiner les unions. Essentiel pour manipuler proprement des données venant d'une API.",
          tags: ["typeof", "instanceof", "in", "x is T"],
        },
        {
          id: "20.3",
          title: "20.3 : Conditional types & inférence",
          desc: "<code>T extends U ? A : B</code>, <code>infer</code>. Les bases de la programmation au niveau des types. C'est ce qui rend <code>ReturnType</code>, <code>Awaited</code> et bien d'autres implémentables en 1 ligne.",
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
        title: "<i class='fa-solid fa-circle-check'></i> Bonne pratique",
        body: "Ne pars pas trop vite en type-level programming. Dans 95 % des cas, une bonne combinaison de <code>Pick/Omit/Partial</code> + un type guard bien placé suffit. Les conditional types avancés sont utiles pour les <em>librairies</em>, rarement pour le code applicatif.",
      },
    },
  ],
  quiz: typescriptQuizzes.m20,
  exercises: [typescriptExercises.m20_1],
};
