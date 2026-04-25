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
          desc: "Vite est le starter moderne recommandé pour React car il démarre en quelques millisecondes (dev server natif ESM) et rebuild très vite. Workflow type : <code>npm create vite@latest mon-app -- --template react</code>, puis <code>cd mon-app</code>, <code>npm install</code>, <code>npm run dev</code>. Le serveur local (souvent <code>http://localhost:5173</code>) supporte le <strong>HMR</strong> : quand tu modifies un composant, l'UI se met à jour sans recharger toute la page.",
          tags: ["npm create vite@latest", "--template react", "npm run dev"],
        },
        {
          id: "11.2",
          title: "1.2 : Structure d'un projet React",
          desc: "Trois fichiers structurent le démarrage : <code>index.html</code> contient la balise racine (<code>&lt;div id=\"root\"&gt;</code>), <code>main.jsx</code> monte React avec <code>ReactDOM.createRoot(...).render(...)</code>, et <code>App.jsx</code> contient le premier composant d'interface. Le dossier <code>src/</code> héberge le code applicatif, <code>public/</code> les assets statiques, et <code>package.json</code> les scripts / dépendances. Comprendre ce flux t'aide à savoir <em>où</em> brancher routing, providers (auth/theme), styles globaux et état global.",
          tags: ["src/", "main.jsx", "App.jsx", "public/"],
        },
        {
          id: "11.3",
          title: "1.3 : JSX : JavaScript + HTML marié",
          desc: "JSX est une syntaxe déclarative qui ressemble à du HTML mais compile en appels JavaScript (<code>React.createElement</code>). Tu peux injecter des expressions avec <code>{...}</code>, appeler des fonctions, formater des données, et composer plusieurs composants. Règles clés : utiliser <code>className</code> (pas <code>class</code>), <code>htmlFor</code> (pas <code>for</code>), props en camelCase (<code>onClick</code>, <code>tabIndex</code>) et retourner un seul parent (ou un fragment <code>&lt;&gt;...&lt;/&gt;</code>).",
          tags: ["className", "htmlFor", "camelCase events", "{expressions}"],
        },
        {
          id: "11.4",
          title: "1.4 : Rendu conditionnel & listes",
          desc: "Le rendu conditionnel se fait avec des expressions JS : <code>condition && &lt;Bloc /&gt;</code> pour afficher seulement si vrai, ou ternaire <code>condition ? A : B</code> pour choisir entre deux branches. Pour les listes, on parcourt un tableau avec <code>.map()</code> et on retourne un composant par item. Chaque élément doit avoir une <code>key</code> stable et unique (id métier de préférence) pour que React identifie correctement les éléments entre deux rendus et évite bugs visuels/perfs (focus perdu, ordre incohérent, re-renders inutiles).",
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
