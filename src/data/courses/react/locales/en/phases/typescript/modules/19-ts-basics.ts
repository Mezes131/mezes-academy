import type { Module } from "@/types";
import { typescriptQuizzes } from "../quizzes";
import { typescriptExercises } from "../exercises";

export const module19: Module = {
  id: "react-typescript-m19",
  index: "19",
  title: "TypeScript Basics",
  subtitle: "Primitive types, interfaces, generics, and unions",
  duration: "1 week",
  content: [
    {
      kind: "paragraph",
      html: "TypeScript adds a static typing layer to JavaScript. The compiler checks type consistency <em>at compile time</em>, which prevents a whole class of bugs in production. <strong>Everything valid in JS is valid in TS</strong>: you can gradually migrate an existing project by adding types over time.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-lightbulb'></i> Why TypeScript in 2026?",
        body: "TypeScript has become the default language of the React ecosystem. Most modern libraries are written in TS or ship types. Mastering TS is no longer optional for a React developer who wants to work on serious projects.",
      },
    },
    {
      kind: "lessons",
      items: [
        {
          id: "19.1",
          title: "19.1: Primitive types & annotations",
          desc: "<code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, <code>any</code>, <code>unknown</code>, <code>never</code>, <code>void</code>. Understand the difference between <code>any</code> (disables everything) and <code>unknown</code> (type-safe).",
          tags: ["any", "unknown", "never", "void"],
        },
        {
          id: "19.2",
          title: "19.2: Interfaces vs type aliases",
          desc: "When to use one or the other. Pragmatic rule: <code>interface</code> for objects (extensible, supports declaration merging), <code>type</code> for unions, intersections, and utility types.",
          tags: ["interface", "type", "extends"],
        },
        {
          id: "19.3",
          title: "19.3: Unions, intersections, literal types",
          desc: "Combine types to express fine-grained variations. <em>Literal types</em> (<code>'idle' | 'loading' | 'error'</code>) let you model simple, type-safe state machines.",
          tags: ["|", "&", "literal types", "discriminated union"],
        },
        {
          id: "19.4",
          title: "19.4: Generics",
          desc: "Create reusable parameterized types. The foundation of modern libraries (<code>Array&lt;T&gt;</code>, <code>Promise&lt;T&gt;</code>, <code>Map&lt;K, V&gt;</code>).",
          tags: ["<T>", "constraints", "extends"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Discriminated union & narrowing",
        html: `<span class="cm">// A classic pattern for async state</span>
<span class="kw">type</span> <span class="ty">State</span>&lt;<span class="ty">T</span>&gt; =
  | { status: <span class="str">"idle"</span> }
  | { status: <span class="str">"loading"</span> }
  | { status: <span class="str">"success"</span>, data: <span class="ty">T</span> }
  | { status: <span class="str">"error"</span>, error: <span class="ty">Error</span> }

<span class="kw">function</span> <span class="fn">render</span>&lt;<span class="ty">T</span>&gt;(state: <span class="ty">State</span>&lt;<span class="ty">T</span>&gt;) {
  <span class="kw">if</span> (state.status === <span class="str">"loading"</span>) <span class="kw">return</span> <span class="str">"Loading..."</span>
  <span class="kw">if</span> (state.status === <span class="str">"success"</span>) <span class="kw">return</span> state.data  <span class="cm">// ← narrowed</span>
  <span class="kw">if</span> (state.status === <span class="str">"error"</span>) <span class="kw">return</span> state.error.message
  <span class="kw">return</span> <span class="kw">null</span>
}`,
      },
    },
  ],
  quiz: typescriptQuizzes.m19,
  exercises: [typescriptExercises.m19_1],
};
