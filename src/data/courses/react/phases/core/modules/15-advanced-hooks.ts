import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";
import { coreExercises } from "../exercises";

export const module15: Module = {
  id: "react-core-m15",
  index: "05",
  title: "Hooks avancés & Custom Hooks",
  subtitle: "useContext, useReducer, useRef, useMemo, useCallback et créer ses propres hooks",
  duration: "1.5 semaines",
  content: [
    {
      kind: "lessons",
      items: [
        {
          id: "15.1",
          title: "5.1 : useContext : partage de données global",
          desc: "Évite le prop drilling (passer des props sur 5 niveaux). Parfait pour le thème, la langue, l'utilisateur connecté.",
          tags: ["createContext", "Provider", "useContext"],
        },
        {
          id: "15.2",
          title: "5.2 : useReducer : state complexe",
          desc: "Alternative à useState pour les logiques complexes. Inspiré de Redux. Idéal quand plusieurs actions modifient le state de différentes façons.",
          tags: ["useReducer", "reducer", "dispatch", "action"],
        },
        {
          id: "15.3",
          title: "5.3 : useRef : valeurs persistantes sans re-render",
          desc: "useRef a deux cas d'usage : accéder à un élément DOM, et stocker une valeur mutable qui ne doit pas déclencher de re-render.",
          tags: ["useRef", "ref.current", "DOM access"],
        },
        {
          id: "15.4",
          title: "5.4 : useMemo & useCallback : optimisation",
          desc: "Mémoriser des valeurs calculées coûteuses (useMemo) et des fonctions (useCallback). Attention : à utiliser avec parcimonie.",
        },
        {
          id: "15.5",
          title: "5.5 : Custom Hooks : votre superpouvoir",
          desc: "Créer ses propres hooks pour extraire et réutiliser de la logique. La règle : le nom doit commencer par <code>use</code>.",
          tags: ["useLocalStorage", "useFetch", "useDebounce"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Custom Hook : useLocalStorage",
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
