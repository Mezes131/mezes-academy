import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";
import { coreExercises } from "../exercises";

export const module15: Module = {
  id: "react-core-m10",
  index: "10",
  title: "Advanced hooks & custom hooks",
  subtitle: "useContext, useReducer, useRef, useMemo, useCallback, and building your own hooks",
  duration: "1.5 weeks",
  content: [
    {
      kind: "lessons",
      items: [
        {
          id: "15.1",
          title: "5.1: useContext, global data sharing",
          desc: "Avoids prop drilling (passing props through 5 levels). Perfect for theme, language, and the signed-in user.",
          tags: ["createContext", "Provider", "useContext"],
        },
        {
          id: "15.2",
          title: "5.2: useReducer, complex state",
          desc: "An alternative to useState for complex logic. Inspired by Redux. Ideal when several actions update state in different ways.",
          tags: ["useReducer", "reducer", "dispatch", "action"],
        },
        {
          id: "15.3",
          title: "5.3: useRef, persistent values without re-render",
          desc: "useRef has two use cases: accessing a DOM element, and storing a mutable value that must not trigger a re-render.",
          tags: ["useRef", "ref.current", "DOM access"],
        },
        {
          id: "15.4",
          title: "5.4: useMemo & useCallback, optimization",
          desc: "Memoize expensive computed values (useMemo) and functions (useCallback). Caution: use sparingly.",
        },
        {
          id: "15.5",
          title: "5.5: Custom hooks, your superpower",
          desc: "Build your own hooks to extract and reuse logic. Rule: the name must start with <code>use</code>.",
          tags: ["useLocalStorage", "useFetch", "useDebounce"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Custom hook: useLocalStorage",
        html: `<span class="kw">import</span> { useState, useEffect } <span class="kw">from</span> <span class="str">'react'</span>

<span class="kw">export function</span> <span class="fn">useLocalStorage</span>(key, initialValue) {
  <span class="kw">const</span> [value, setValue] = <span class="fn">useState</span>(() =&gt; {
    <span class="kw">const</span> stored = localStorage.<span class="fn">getItem</span>(key)
    <span class="kw">return</span> stored ? JSON.<span class="fn">parse</span>(stored) : initialValue
  })

  <span class="fn">useEffect</span>(() =&gt; {
    localStorage.<span class="fn">setItem</span>(key, JSON.<span class="fn">stringify</span>(value))
  }, [key, value])

  <span class="kw">return</span> [value, setValue]
}`,
      },
    },
  ],
  quiz: coreQuizzes.m15,
  exercises: [coreExercises.m15_1],
};
