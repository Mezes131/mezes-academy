import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";
import { ecosystemExercises } from "../exercises";

export const module23: Module = {
  id: "react-ecosystem-m23",
  index: "M23",
  title: "State global : Zustand, Redux, Jotai",
  subtitle: "Partager du state entre composants lointains",
  duration: "1 semaine",
  content: [
    {
      kind: "paragraph",
      html: "Dès qu'une application grossit, on rencontre le <em>prop drilling</em> : passer des props sur 5 niveaux pour qu'un composant profond reçoive un morceau d'état. Les stores globaux existent pour ça. Mais attention : la règle moderne est de <strong>séparer le state client du state serveur</strong>.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "23.1",
          title: "23.1 : Zustand : la simplicité moderne",
          desc: "API minimaliste, pas de Provider obligatoire, sélecteurs granulaires pour éviter les re-renders. Devenu le choix par défaut en 2026 pour le state UI partagé.",
          tags: ["create", "set", "get", "shallow"],
        },
        {
          id: "23.2",
          title: "23.2 : Redux Toolkit",
          desc: "Le standard historique. Verbose mais traçable et outillé (DevTools, middleware). Toujours pertinent sur de grosses applications avec plusieurs équipes.",
          tags: ["createSlice", "configureStore", "RTK Query"],
        },
        {
          id: "23.3",
          title: "23.3 : TanStack Query pour le state serveur",
          desc: "<strong>Le choix architectural le plus important</strong> : ne PAS mettre les données serveur dans Zustand/Redux. TanStack Query gère cache, refetch, invalidation, stale-while-revalidate. Ton store client n'a plus à orchestrer tout ça.",
          tags: ["useQuery", "useMutation", "queryKey", "invalidateQueries"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Zustand : store minimal",
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

<span class="cm">// Dans un composant</span>
<span class="kw">const</span> items = <span class="fn">useCart</span>((s) =&gt; s.items)   <span class="cm">// ← sélecteur granulaire</span>
<span class="kw">const</span> add = <span class="fn">useCart</span>((s) =&gt; s.add)`,
      },
    },
  ],
  quiz: ecosystemQuizzes.m23,
  exercises: [ecosystemExercises.m23_1],
};
