import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";
import { coreExercises } from "../exercises";

export const module13: Module = {
  id: "react-core-m13",
  index: "M13",
  title: "useState & Gestion du state",
  subtitle: "Rendre vos composants interactifs et dynamiques",
  duration: "1 semaine",
  content: [
    {
      kind: "paragraph",
      html: "Le state est la mémoire d'un composant. Là où les props viennent du parent, le state est privé et géré par le composant lui-même. Chaque fois que le state change, React re-render le composant automatiquement.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-lightbulb'></i> Règle fondamentale — Immutabilité",
        body: "Ne jamais muter le state directement. <code>state.push(item)</code> est interdit : React ne détectera pas le changement. Toujours créer une nouvelle valeur : <code>setState([...state, item])</code>.",
      },
    },
    {
      kind: "lessons",
      items: [
        {
          id: "13.1",
          title: "3.1 : useState : déclarer et modifier le state",
          desc: "useState retourne un tableau de deux éléments : la valeur actuelle et une fonction pour la modifier. Convention : <code>[valeur, setValeur]</code>.",
          tags: ["useState", "setState", "setter", "re-render"],
        },
        {
          id: "13.2",
          title: "3.2 : Formulaires contrôlés",
          desc: "En React, les inputs sont liés au state (composants contrôlés). C'est la source de vérité unique. onChange + value = contrôle total.",
        },
        {
          id: "13.3",
          title: "3.3 : Partager le state : Lifting State Up",
          desc: "Quand deux composants ont besoin du même state, il faut le remonter vers leur ancêtre commun et le passer via props.",
        },
        {
          id: "13.4",
          title: "3.4 : State avec objets et tableaux",
          desc: "Mettre à jour des structures imbriquées de manière immutable. Spread operator et méthodes fonctionnelles sont vos amis.",
          tags: ["spread ...", "filter", "map pour update", "immer"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "useState : Todo mini",
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
      <span class="jsx">&lt;button</span> <span class="prop">onClick</span>={addTodo}<span class="jsx">&gt;</span>Ajouter<span class="jsx">&lt;/button&gt;</span>
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
