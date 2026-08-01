import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";
import { ecosystemExercises } from "../exercises";

export const module23: Module = {
  id: "react-ecosystem-m23",
  index: "23",
  title: "Global state: Zustand, Redux, Jotai",
  subtitle: "Sharing state between distant components",
  duration: "1 week",
  content: [
    {
      kind: "paragraph",
      html: "As an application grows, you run into <em>prop drilling</em>: passing props through 5 levels so a deep component receives a piece of state. Global stores exist for that. But beware: the modern rule is to <strong>separate client state from server state</strong>.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "23.1",
          title: "23.1: Zustand, modern simplicity",
          desc: "Minimal API, no required Provider, granular selectors to avoid re-renders. Became the default choice in 2026 for shared UI state.",
          tags: ["create", "set", "get", "shallow"],
        },
        {
          id: "23.2",
          title: "23.2: Redux Toolkit",
          desc: "The historical standard. Verbose but traceable and well tooled (DevTools, middleware). Still relevant on large applications with multiple teams.",
          tags: ["createSlice", "configureStore", "RTK Query"],
        },
        {
          id: "23.3",
          title: "23.3: TanStack Query for server state",
          desc: "<strong>The most important architectural choice</strong>: do NOT put server data in Zustand/Redux. TanStack Query handles cache, refetch, invalidation, stale-while-revalidate. Your client store no longer has to orchestrate all of that.",
          tags: ["useQuery", "useMutation", "queryKey", "invalidateQueries"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Zustand: minimal store",
        html: `<span class="kw">import</span> { create } <span class="kw">from</span> <span class="str">"zustand"</span>

<span class="kw">type</span> <span class="ty">CartState</span> = {
  items: { id: <span class="ty">string</span>; name: <span class="ty">string</span>; price: <span class="ty">number</span> }[]
  add: (item: <span class="ty">CartState</span>[<span class="str">"items"</span>][<span class="num">0</span>]) =&gt; <span class="ty">void</span>
  remove: (id: <span class="ty">string</span>) =&gt; <span class="ty">void</span>
}

<span class="kw">export const</span> <span class="fn">useCart</span> = <span class="fn">create</span>&lt;<span class="ty">CartState</span>&gt;((set) =&gt; ({
  items: [],
  add: (item) =&gt; <span class="fn">set</span>((s) =&gt; ({ items: [...s.items, item] })),
  remove: (id) =&gt; <span class="fn">set</span>((s) =&gt; ({ items: s.items.<span class="fn">filter</span>((i) =&gt; i.id !== id) })),
}))

<span class="cm">// In a component</span>
<span class="kw">const</span> items = <span class="fn">useCart</span>((s) =&gt; s.items)   <span class="cm">// ← granular selector</span>
<span class="kw">const</span> add = <span class="fn">useCart</span>((s) =&gt; s.add)`,
      },
    },
  ],
  quiz: ecosystemQuizzes.m23,
  exercises: [ecosystemExercises.m23_1],
};
