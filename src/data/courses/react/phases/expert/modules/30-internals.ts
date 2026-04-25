import type { Module } from "@/types";
import { expertQuizzes } from "../quizzes";
import { expertExercises } from "../exercises";

export const module30: Module = {
  id: "react-expert-m30",
  index: "03",
  title: "React Internals",
  subtitle: "Reconciliation, Fiber, concurrent features",
  duration: "1 semaine",
  content: [
    {
      kind: "paragraph",
      html: "À ce stade, comprendre ce qui se passe <em>sous le capot</em> devient un vrai avantage : optimisations pertinentes, debug avancé, et une meilleure intuition sur le comportement de React face aux cas pathologiques.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "30.1",
          title: "30.1 : Le reconciler & l'algorithme Fiber",
          desc: "Fiber découpe le rendu en <strong>unités interruptibles</strong>. Chaque composant → un Fiber node → rattaché dans une arborescence. React peut suspendre un rendu en cours pour traiter une interaction urgente, puis le reprendre.",
          tags: ["Fiber", "reconciliation", "work loop", "priority"],
        },
        {
          id: "30.2",
          title: "30.2 : Concurrent features",
          desc: "<code>startTransition</code> / <code>useTransition</code> pour marquer une update comme non urgente. <code>useDeferredValue</code> pour dériver une valeur qui peut être « retardée ». <code>Suspense</code> pour le loading unifié.",
          tags: ["useTransition", "useDeferredValue", "Suspense"],
        },
        {
          id: "30.3",
          title: "30.3 : Hydration & Server Components",
          desc: "Ce qui se passe entre le HTML serveur et le DOM hydraté. Les Server Components envoient un <em>payload RSC</em> (pas juste du HTML), dé-sérialisé côté client. Comprendre ça clarifie TOUT sur Next.js App Router.",
          tags: ["hydration mismatch", "RSC payload", "suspense boundary"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "useTransition : prioriser les interactions",
        html: `<span class="kw">import</span> { useState, useTransition } <span class="kw">from</span> <span class="str">"react"</span>

<span class="kw">function</span> <span class="fn">SearchPage</span>() {
  <span class="kw">const</span> [query, setQuery] = <span class="fn">useState</span>(<span class="str">""</span>)
  <span class="kw">const</span> [isPending, startTransition] = <span class="fn">useTransition</span>()
  <span class="kw">const</span> [results, setResults] = <span class="fn">useState</span>([])

  <span class="kw">function</span> <span class="fn">onChange</span>(e) {
    <span class="kw">const</span> q = e.target.value
    <span class="fn">setQuery</span>(q)  <span class="cm">// urgent: keep the input reactive</span>
    <span class="fn">startTransition</span>(() =&gt; {
      <span class="fn">setResults</span>(<span class="fn">expensiveSearch</span>(q))  <span class="cm">// non-urgent</span>
    })
  }

  <span class="kw">return</span> (
    <span class="jsx">&lt;&gt;</span>
      <span class="jsx">&lt;input</span> <span class="prop">value</span>={query} <span class="prop">onChange</span>={onChange} <span class="jsx">/&gt;</span>
      {isPending &amp;&amp; <span class="jsx">&lt;span&gt;</span>...<span class="jsx">&lt;/span&gt;</span>}
      <span class="jsx">&lt;Results</span> <span class="prop">items</span>={results} <span class="jsx">/&gt;</span>
    <span class="jsx">&lt;/&gt;</span>
  )
}`,
      },
    },
  ],
  quiz: expertQuizzes.m30,
  exercises: [expertExercises.m30_1],
};
