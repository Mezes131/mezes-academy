import type { Module } from "@/types";
import { typescriptQuizzes } from "../quizzes";
import { typescriptExercises } from "../exercises";

export const module19: Module = {
  id: "react-typescript-m19",
  index: "M19",
  title: "Bases de TypeScript",
  subtitle: "Types primitifs, interfaces, génériques et unions",
  duration: "1 semaine",
  content: [
    {
      kind: "paragraph",
      html: "TypeScript ajoute une couche de typage statique à JavaScript. Le compilateur vérifie la cohérence des types <em>à la compilation</em>, ce qui évite toute une classe de bugs en production. <strong>Tout ce qui est valide en JS est valide en TS</strong> : on peut migrer progressivement un projet existant en ajoutant des types au fur et à mesure.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-lightbulb'></i> Pourquoi TypeScript en 2026 ?",
        body: "TypeScript est devenu le langage par défaut de l'écosystème React. La majorité des librairies modernes sont écrites en TS ou exposent des types. Maîtriser TS ce n'est plus optionnel pour un dev React qui veut travailler sur des projets sérieux.",
      },
    },
    {
      kind: "lessons",
      items: [
        {
          id: "19.1",
          title: "19.1 : Types primitifs & annotations",
          desc: "<code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, <code>any</code>, <code>unknown</code>, <code>never</code>, <code>void</code>. Comprendre la différence entre <code>any</code> (désactive tout) et <code>unknown</code> (type-safe).",
          tags: ["any", "unknown", "never", "void"],
        },
        {
          id: "19.2",
          title: "19.2 : Interfaces vs type aliases",
          desc: "Quand utiliser l'un ou l'autre. Règle pragmatique : <code>interface</code> pour les objets (extensible, supporte le declaration-merging), <code>type</code> pour les unions, intersections et les utilitaires.",
          tags: ["interface", "type", "extends"],
        },
        {
          id: "19.3",
          title: "19.3 : Unions, intersections, literal types",
          desc: "Combiner les types pour exprimer des variations fines. Les <em>literal types</em> (<code>'idle' | 'loading' | 'error'</code>) permettent de modéliser des machines à états simples et type-safe.",
          tags: ["|", "&", "literal types", "discriminated union"],
        },
        {
          id: "19.4",
          title: "19.4 : Génériques",
          desc: "Créer des types paramétrés réutilisables. La base des bibliothèques modernes (<code>Array&lt;T&gt;</code>, <code>Promise&lt;T&gt;</code>, <code>Map&lt;K, V&gt;</code>).",
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
