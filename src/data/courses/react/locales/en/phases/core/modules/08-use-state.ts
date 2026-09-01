import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";
import { coreExercises } from "../exercises";

export const module13: Module = {
  id: "react-core-m08",
  index: "08",
  title: "useState & state management",
  subtitle: "Make your components interactive and dynamic",
  duration: "1 week",
  video: {
    status: "ready",
    teaser: {
      provider: "youtube",
      providerId: "Tn6EPEsYE9I",
      title: "Preview — useState",
      durationSeconds: 120,
    },
    full: {
      provider: "minio",
      providerId: "courses/react/phase-core/modules/react-core-m08.mp4",
      title: "useState & state management",
      durationSeconds: 900,
      mimeType: "video/mp4",
    },
  },
  content: [
    {
      kind: "paragraph",
      html: "State is a component's memory. Where props come from the parent, state is private and owned by the component itself. Every time state changes, React re-renders the component automatically.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-lightbulb'></i> Fundamental rule: immutability",
        body: "Never mutate state directly. <code>state.push(item)</code> is forbidden: React will not detect the change. Always create a new value: <code>setState([...state, item])</code>.",
      },
    },
    {
      kind: "lessons",
      items: [
        {
          id: "13.1",
          title: "3.1: useState, declare and update state",
          desc: "useState returns a two-element array: the current value and a function to update it. Convention: <code>[value, setValue]</code>.",
          tags: ["useState", "setState", "setter", "re-render"],
        },
        {
          id: "13.2",
          title: "3.2: Controlled forms",
          desc: "In React, inputs are bound to state (controlled components). That is the single source of truth. onChange + value = full control.",
        },
        {
          id: "13.3",
          title: "3.3: Sharing state, lifting state up",
          desc: "When two components need the same state, lift it to their common ancestor and pass it down via props.",
        },
        {
          id: "13.4",
          title: "3.4: State with objects and arrays",
          desc: "Update nested structures immutably. The spread operator and functional methods are your friends.",
          tags: ["spread ...", "filter", "map for updates", "immer"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "useState: mini Todo",
        html: `<span class="kw">import</span> { useState } <span class="kw">from</span> <span class="str">'react'</span>

<span class="kw">const</span> <span class="fn">TodoApp</span> = () => {
  <span class="kw">const</span> [todos, setTodos] = <span class="fn">useState</span>([])
  <span class="kw">const</span> [input, setInput] = <span class="fn">useState</span>(<span class="str">''</span>)

  <span class="kw">const</span> <span class="fn">addTodo</span> = () => {
    <span class="kw">if</span> (!input.trim()) <span class="kw">return</span>
    <span class="fn">setTodos</span>([...todos, { id: Date.<span class="fn">now</span>(), text: input }])
    <span class="fn">setInput</span>(<span class="str">''</span>)
  }

  <span class="kw">return</span> (
    <span class="jsx">&lt;div&gt;</span>
      <span class="jsx">&lt;input</span> <span class="prop">value</span>={input} <span class="prop">onChange</span>={e => <span class="fn">setInput</span>(e.target.value)} <span class="jsx">/&gt;</span>
      <span class="jsx">&lt;button</span> <span class="prop">onClick</span>={addTodo}<span class="jsx">&gt;</span>Add<span class="jsx">&lt;/button&gt;</span>
      {todos.<span class="fn">map</span>(t =&gt; <span class="jsx">&lt;p</span> <span class="prop">key</span>={t.id}<span class="jsx">&gt;</span>{t.text}<span class="jsx">&lt;/p&gt;</span>)}
    <span class="jsx">&lt;/div&gt;</span>
  )
}`,
      },
    },
  ],
  quiz: coreQuizzes.m13,
  exercises: [coreExercises.m13_1],
};
