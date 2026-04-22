import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";
import { coreExercises } from "../exercises";

export const module11: Module = {
  id: "react-core-m11",
  index: "M11",
  title: "Introduction à React & JSX",
  subtitle: "Comprendre pourquoi React existe et écrire ses premiers composants",
  duration: "1 semaine",
  openByDefault: true,
  content: [
    { kind: "title", text: "Pourquoi React ?" },
    {
      kind: "paragraph",
      html: "Avant React, manipuler le DOM manuellement avec jQuery ou Vanilla JS devenait vite du code spaghetti dès que l'interface devenait complexe. React résout ce problème avec deux idées brillantes : la <strong>composabilité</strong> (découper l'UI en petits morceaux réutilisables) et le <strong>Virtual DOM</strong> (React calcule les changements minimaux à apporter au vrai DOM).",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-lightbulb'></i> Concept clé — Virtual DOM",
        body: "React maintient une copie légère du DOM en mémoire. Quand l'état change, React compare l'ancien et le nouveau Virtual DOM (diffing), puis applique seulement les changements nécessaires au vrai DOM.",
      },
    },
    {
      kind: "lessons",
      items: [
        {
          id: "11.1",
          title: "1.1 : Créer un projet React avec Vite",
          desc: "Vite est l'outil recommandé pour démarrer un projet React. Il offre un démarrage quasi-instantané grâce à son build natif ESM.",
          tags: ["npm create vite@latest", "--template react", "npm run dev"],
        },
        {
          id: "11.2",
          title: "1.2 : Structure d'un projet React",
          desc: "Comprendre le rôle de <code>index.html</code>, <code>main.jsx</code>, <code>App.jsx</code>. Pourquoi <code>ReactDOM.createRoot()</code> ? Qu'est-ce que le point d'entrée ?",
          tags: ["src/", "main.jsx", "App.jsx", "public/"],
        },
        {
          id: "11.3",
          title: "1.3 : JSX : JavaScript + HTML marié",
          desc: "JSX est du sucre syntaxique. Le compilateur Babel le transforme en <code>React.createElement()</code>. Ce n'est pas du HTML : c'est du JS qui ressemble à du HTML.",
          tags: ["className", "htmlFor", "camelCase events", "{expressions}"],
        },
        {
          id: "11.4",
          title: "1.4 : Rendu conditionnel & listes",
          desc: "Comment afficher des éléments conditionnellement et itérer sur un tableau. La prop <code>key</code> est obligatoire et critique pour les performances.",
          tags: ["&&", "ternaire ?:", ".map()", "key prop"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "JSX : main.jsx",
        html: `<span class="cm">// JSX compile vers React.createElement</span>
<span class="kw">const</span> <span class="fn">Salutation</span> = () => {
  <span class="kw">const</span> prenom = <span class="str">"Ada"</span>
  <span class="kw">return</span> (
    <span class="jsx">&lt;div</span> <span class="prop">className</span>=<span class="str">"card"</span><span class="jsx">&gt;</span>
      <span class="jsx">&lt;h1&gt;</span>Bonjour, {prenom} !<span class="jsx">&lt;/h1&gt;</span>
      <span class="jsx">&lt;p&gt;</span>2 + 2 = {2 + 2}<span class="jsx">&lt;/p&gt;</span>
      {prenom === <span class="str">"Ada"</span> &amp;&amp; <span class="jsx">&lt;span&gt;</span>Légende du code<span class="jsx">&lt;/span&gt;</span>}
    <span class="jsx">&lt;/div&gt;</span>
  )
}`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-circle-check'></i> Bonne pratique",
        body: "Installez <strong>React Developer Tools</strong> dans votre navigateur (Chrome/Firefox). C'est l'outil n°1 pour déboguer vos composants, inspecter les props et voir le state en temps réel.",
      },
    },
  ],
  quiz: coreQuizzes.m11,
  exercises: [coreExercises.m11_1],
};
