import type { Module } from "@/types";
import { expertQuizzes } from "../quizzes";
import { expertExercises } from "../exercises";

export const module30: Module = {
  id: "react-expert-m30",
  index: "30",
  title: "React Internals",
  subtitle: "Reconciliation, Fiber, concurrent features",
  duration: "1 week",
  content: [
    {
      kind: "paragraph",
      html: "At this stage, understanding what happens <em>under the hood</em> becomes a real advantage: relevant optimizations, advanced debugging, and better intuition about React's behavior in pathological cases.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "30.1",
          title: "30.1: The reconciler & Fiber algorithm",
          desc: "Fiber splits rendering into <strong>interruptible work units</strong>. Each component → a Fiber node → attached in a tree. React can pause an in-progress render to handle an urgent interaction, then resume.",
          tags: ["Fiber", "reconciliation", "work loop", "priority"],
        },
        {
          id: "30.2",
          title: "30.2: Concurrent features",
          desc: "<code>startTransition</code> / <code>useTransition</code> to mark an update as non-urgent. <code>useDeferredValue</code> to derive a value that can be « deferred ». <code>Suspense</code> for unified loading.",
          tags: ["useTransition", "useDeferredValue", "Suspense"],
        },
        {
          id: "30.3",
          title: "30.3: Hydration & Server Components",
          desc: "What happens between server HTML and the hydrated DOM. Server Components send an <em>RSC payload</em> (not just HTML), deserialized on the client. Understanding this clarifies EVERYTHING about the Next.js App Router.",
          tags: ["hydration mismatch", "RSC payload", "suspense boundary"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "useTransition: prioritize interactions",
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
