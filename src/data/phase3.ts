import type { Phase } from "@/types";

/* ═══════════════════════════════════════════════════════════════════
   PHASE 3 : REACT CORE (JavaScript)
   8 modules (M11 → M18), quiz sur chaque module, exercices Sandpack
   sur les modules où ça a du sens.
   ═══════════════════════════════════════════════════════════════════ */

export const phase3: Phase = {
  id: "phase3",
  color: "core",
  icon: "⚛️",
  label: "React Core",
  title: "React Core (JavaScript)",
  summary:
    "Maîtriser React de zéro : composants, state, hooks, routing et styling. La phase la plus importante du parcours : les fondations sur lesquelles tout repose.",
  metaTags: ["8 modules", "~10 semaines", "2 projets portfolio", "React 18", "Vite"],
  modules: [
    /* ─── M11 ───────────────────────────────────────────────────── */
    {
      id: "m11",
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
            title: "💡 Concept clé : Virtual DOM",
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
      <span class="jsx">&lt;h1&gt;</span>Bonjour, {prenom} ! 👋<span class="jsx">&lt;/h1&gt;</span>
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
            title: "✅ Bonne pratique",
            body: "Installez <strong>React Developer Tools</strong> dans votre navigateur (Chrome/Firefox). C'est l'outil n°1 pour déboguer vos composants, inspecter les props et voir le state en temps réel.",
          },
        },
      ],
      quiz: {
        id: "quiz-m11",
        title: "Quiz : JSX & bases",
        questions: [
          {
            id: "q1",
            question: "En JSX, quel attribut utilise-t-on pour appliquer une classe CSS ?",
            options: [
              { id: "a", label: "class" },
              { id: "b", label: "className" },
              { id: "c", label: "css" },
              { id: "d", label: "styleClass" },
            ],
            correct: ["b"],
            explanation:
              "En JSX, class est un mot réservé JavaScript. On utilise className à la place. De même, for devient htmlFor.",
          },
          {
            id: "q2",
            question: "Pourquoi la prop `key` est-elle obligatoire dans une liste ?",
            options: [
              { id: "a", label: "Pour sécuriser l'application contre les injections" },
              { id: "b", label: "Pour permettre à React d'identifier chaque élément et optimiser le re-render" },
              { id: "c", label: "Par obligation légale du W3C" },
            ],
            correct: ["b"],
          },
          {
            id: "q3",
            question: "JSX est…",
            options: [
              { id: "a", label: "Du HTML interprété directement par le navigateur" },
              { id: "b", label: "Du sucre syntaxique compilé en React.createElement()" },
              { id: "c", label: "Un langage à part entière inventé par Facebook" },
            ],
            correct: ["b"],
          },
          {
            id: "q4",
            question: "Quelles expressions peut-on mettre entre accolades {} en JSX ?",
            options: [
              { id: "a", label: "Uniquement des variables" },
              { id: "b", label: "Toute expression JavaScript (variables, calculs, appels de fonction, ternaires)" },
              { id: "c", label: "Des instructions (if, for, while)" },
            ],
            correct: ["b"],
            explanation:
              "On met des expressions (qui produisent une valeur), pas des instructions. Un if/else ne fonctionnera pas, il faut utiliser un ternaire ou &&.",
          },
        ],
      },
      exercises: [
        {
          id: "ex-m11-1",
          title: "Ta première liste JSX",
          instructions:
            "Crée un composant <code>FruitList</code> qui affiche la liste des fruits passée en props sous forme de <code>&lt;ul&gt;</code>. Pense à fournir une <code>key</code> unique à chaque <code>&lt;li&gt;</code>.",
          hints: [
            "Utilise fruits.map(...) pour générer les <li>.",
            "La prop key doit être unique. Utilise le fruit lui-même ou un id si tu en as.",
          ],
          template: "react",
          starterFiles: {
            "/App.js": `export default function App() {
  const fruits = ["Mangue", "Papaye", "Avocat"];
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Mes fruits préférés</h2>
      {/* TODO : affiche une <ul> contenant un <li> par fruit */}
    </div>
  );
}
`,
          },
          solutionFiles: {
            "/App.js": `export default function App() {
  const fruits = ["Mangue", "Papaye", "Avocat"];
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Mes fruits préférés</h2>
      <ul>
        {fruits.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  );
}
`,
          },
        },
      ],
    },

    /* ─── M12 ───────────────────────────────────────────────────── */
    {
      id: "m12",
      index: "M12",
      title: "Composants & Props",
      subtitle: "L'art de décomposer une UI en pièces réutilisables et de les faire communiquer",
      duration: "1 semaine",
      content: [
        {
          kind: "paragraph",
          html: "Les composants sont les LEGO de React. Chaque composant est une fonction JavaScript qui retourne du JSX. Les <strong>props</strong> sont les données qu'un parent transmet à son enfant : elles circulent toujours du parent vers l'enfant (flux unidirectionnel).",
        },
        {
          kind: "lessons",
          items: [
            {
              id: "12.1",
              title: "2.1 : Créer et nommer des composants",
              desc: "Convention : toujours commencer par une majuscule (<code>Button</code> et non <code>button</code>). Chaque composant dans son propre fichier.",
            },
            {
              id: "12.2",
              title: "2.2 : Props : passer des données",
              desc: "Les props sont en lecture seule. Un composant ne peut jamais modifier ses propres props. On peut passer n'importe quel type : string, number, objet, tableau, fonction, composant JSX.",
              tags: ["props", "defaultProps", "PropTypes", "destructuring"],
            },
            {
              id: "12.3",
              title: "2.3 : La prop children",
              desc: "Permet de créer des composants conteneurs flexibles comme des Layouts, Cards, Modals. L'un des patterns les plus puissants de React.",
            },
            {
              id: "12.4",
              title: "2.4 : Composition vs Héritage",
              desc: "React favorise fortement la composition. On ne fait jamais d'héritage de composants. La composition est plus flexible et lisible.",
            },
          ],
        },
        {
          kind: "code",
          sample: {
            label: "Props & Children",
            html: `<span class="cm">// Composant Card réutilisable avec children</span>
<span class="kw">const</span> <span class="fn">Card</span> = ({ <span class="prop">title</span>, <span class="prop">badge</span>, <span class="prop">children</span>, <span class="prop">onClick</span> }) => (
  <span class="jsx">&lt;div</span> <span class="prop">className</span>=<span class="str">"card"</span> <span class="prop">onClick</span>={onClick}<span class="jsx">&gt;</span>
    <span class="jsx">&lt;div</span> <span class="prop">className</span>=<span class="str">"card-header"</span><span class="jsx">&gt;</span>
      <span class="jsx">&lt;h3&gt;</span>{title}<span class="jsx">&lt;/h3&gt;</span>
      {badge &amp;&amp; <span class="jsx">&lt;span</span> <span class="prop">className</span>=<span class="str">"badge"</span><span class="jsx">&gt;</span>{badge}<span class="jsx">&lt;/span&gt;</span>}
    <span class="jsx">&lt;/div&gt;</span>
    <span class="jsx">&lt;div</span> <span class="prop">className</span>=<span class="str">"card-body"</span><span class="jsx">&gt;</span>{children}<span class="jsx">&lt;/div&gt;</span>
  <span class="jsx">&lt;/div&gt;</span>
)

<span class="cm">// Utilisation</span>
<span class="jsx">&lt;Card</span> <span class="prop">title</span>=<span class="str">"Profil"</span> <span class="prop">badge</span>=<span class="str">"Admin"</span><span class="jsx">&gt;</span>
  <span class="jsx">&lt;p&gt;</span>Contenu quelconque ici<span class="jsx">&lt;/p&gt;</span>
<span class="jsx">&lt;/Card&gt;</span>`,
          },
        },
      ],
      quiz: {
        id: "quiz-m12",
        title: "Quiz : Composants & Props",
        questions: [
          {
            id: "q1",
            question: "Dans quel sens circulent les props ?",
            options: [
              { id: "a", label: "Du parent vers l'enfant (top-down, unidirectionnel)" },
              { id: "b", label: "De l'enfant vers le parent" },
              { id: "c", label: "Dans les deux sens (two-way binding)" },
            ],
            correct: ["a"],
          },
          {
            id: "q2",
            question: "Un composant peut-il modifier ses propres props ?",
            options: [
              { id: "a", label: "Oui, librement" },
              { id: "b", label: "Oui, mais seulement dans useEffect" },
              { id: "c", label: "Non, les props sont en lecture seule (immutables)" },
            ],
            correct: ["c"],
            explanation: "Les props sont immutables par design. Si un enfant doit communiquer vers un parent, c'est via un callback passé en prop.",
          },
          {
            id: "q3",
            question: "À quoi sert la prop spéciale `children` ?",
            options: [
              { id: "a", label: "À lister les composants enfants qu'un composant doit rendre obligatoirement" },
              { id: "b", label: "À recevoir tout ce qui est placé entre les balises d'ouverture et de fermeture d'un composant" },
              { id: "c", label: "À transmettre le state aux sous-composants" },
            ],
            correct: ["b"],
          },
          {
            id: "q4",
            question: "Quelle convention de nommage respecter pour un composant ?",
            options: [
              { id: "a", label: "Toujours commencer par une minuscule" },
              { id: "b", label: "Toujours commencer par une majuscule (PascalCase)" },
              { id: "c", label: "Utiliser kebab-case comme en HTML" },
            ],
            correct: ["b"],
            explanation: "React distingue les composants des éléments HTML via la casse. <button> est un élément HTML, <Button> est un composant.",
          },
        ],
      },
      exercises: [
        {
          id: "ex-m12-1",
          title: "Composant Button réutilisable",
          instructions:
            "Crée un composant <code>Button</code> qui accepte les props <code>label</code>, <code>variant</code> (« primary » ou « ghost ») et <code>onClick</code>. Utilise-le 2 fois dans <code>App</code> avec des variants différents.",
          hints: [
            "Déstructure les props : `function Button({ label, variant, onClick }) {...}`",
            "Applique un style différent selon la valeur de `variant`.",
          ],
          template: "react",
          starterFiles: {
            "/App.js": `// TODO : définis le composant Button
// Il doit accepter { label, variant, onClick }

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui", display: "flex", gap: 12 }}>
      {/* TODO : utilise ton Button avec variant="primary" et variant="ghost" */}
    </div>
  );
}
`,
          },
          solutionFiles: {
            "/App.js": `function Button({ label, variant = "primary", onClick }) {
  const styles = {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid",
    cursor: "pointer",
    fontWeight: 600,
    ...(variant === "primary"
      ? { background: "#6c63ff", color: "white", borderColor: "#6c63ff" }
      : { background: "transparent", color: "#6c63ff", borderColor: "#6c63ff" }),
  };
  return (
    <button style={styles} onClick={onClick}>
      {label}
    </button>
  );
}

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui", display: "flex", gap: 12 }}>
      <Button label="Valider" variant="primary" onClick={() => alert("OK")} />
      <Button label="Annuler" variant="ghost" onClick={() => alert("Annulé")} />
    </div>
  );
}
`,
          },
        },
      ],
    },

    /* ─── M13 ───────────────────────────────────────────────────── */
    {
      id: "m13",
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
            title: "💡 Règle fondamentale : Immutabilité",
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
      quiz: {
        id: "quiz-m13",
        title: "Quiz : useState & immutabilité",
        questions: [
          {
            id: "q1",
            question: "Que retourne useState ?",
            options: [
              { id: "a", label: "Un objet { value, setValue }" },
              { id: "b", label: "Un tableau [valeur, setter]" },
              { id: "c", label: "La valeur directement" },
            ],
            correct: ["b"],
          },
          {
            id: "q2",
            question: "Pour ajouter un élément à un state tableau `items`, quelle est la bonne approche ?",
            options: [
              { id: "a", label: "items.push(newItem) puis setItems(items)" },
              { id: "b", label: "setItems([...items, newItem])" },
              { id: "c", label: "items = [...items, newItem]" },
            ],
            correct: ["b"],
            explanation: "items.push mute le tableau existant : React ne détectera aucun changement de référence et ne re-rendera pas. Il faut créer un nouveau tableau.",
          },
          {
            id: "q3",
            question: "Qu'est-ce qu'un composant contrôlé ?",
            options: [
              { id: "a", label: "Un composant qui utilise un ref pour lire la valeur de l'input" },
              { id: "b", label: "Un input dont la valeur est dictée par le state React via value + onChange" },
              { id: "c", label: "Un composant protégé par un système d'authentification" },
            ],
            correct: ["b"],
          },
          {
            id: "q4",
            question: "Que fait `setCount(c => c + 1)` par rapport à `setCount(count + 1)` ?",
            options: [
              { id: "a", label: "C'est strictement identique" },
              { id: "b", label: "La version fonctionnelle est plus sûre quand on met à jour plusieurs fois de suite, car elle utilise la valeur la plus récente" },
              { id: "c", label: "La version fonctionnelle est plus lente" },
            ],
            correct: ["b"],
          },
        ],
      },
      exercises: [
        {
          id: "ex-m13-1",
          title: "Todo list minimaliste",
          instructions:
            "Complète la todo list : l'utilisateur doit pouvoir taper un texte, cliquer sur « Ajouter » pour l'ajouter à la liste, et voir tous les items affichés. Chaque item doit avoir un bouton « Supprimer » qui le retire.",
          hints: [
            "Stocke les todos dans un tableau d'objets { id, text }.",
            "Pour supprimer : setTodos(todos.filter(t => t.id !== id)).",
            "Pense à vider l'input après ajout.",
          ],
          template: "react",
          starterFiles: {
            "/App.js": `import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  function addTodo() {
    // TODO : ajoute un nouveau todo { id, text } à la liste
    // et vide l'input
  }

  function removeTodo(id) {
    // TODO : retire le todo ayant cet id
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 400 }}>
      <h2>Ma todo list</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nouvelle tâche..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTodo}>Ajouter</button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => removeTodo(t.id)} style={{ marginLeft: 8 }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
          },
          solutionFiles: {
            "/App.js": `import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  function addTodo() {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput("");
  }

  function removeTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 400 }}>
      <h2>Ma todo list</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nouvelle tâche..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTodo}>Ajouter</button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => removeTodo(t.id)} style={{ marginLeft: 8 }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
          },
        },
      ],
    },

    /* ─── M14 ───────────────────────────────────────────────────── */
    {
      id: "m14",
      index: "M14",
      title: "useEffect & Cycle de vie",
      subtitle: "Synchroniser votre composant avec le monde extérieur",
      duration: "1 semaine",
      content: [
        {
          kind: "paragraph",
          html: "<code>useEffect</code> permet de déclencher des effets secondaires (appels API, abonnements, manipulations du DOM) après que React ait affiché le composant. Comprendre le tableau de dépendances est essentiel pour éviter les bugs et les boucles infinies.",
        },
        {
          kind: "lessons",
          items: [
            {
              id: "14.1",
              title: "4.1 : La structure de useEffect",
              desc: "3 comportements selon le tableau de dépendances : sans tableau (chaque render), <code>[]</code> (mount seulement), <code>[dep]</code> (quand la dépendance change).",
              tags: ["useEffect", "deps array", "[]", "[dep1, dep2]"],
            },
            {
              id: "14.2",
              title: "4.2 : Fetch de données",
              desc: "Pattern standard pour charger des données depuis une API au montage, avec gestion du loading et des erreurs.",
            },
            {
              id: "14.3",
              title: "4.3 : La fonction de cleanup",
              desc: "Essentielle pour éviter les memory leaks. Permet de nettoyer les abonnements, timers et requêtes quand le composant se démonte.",
              tags: ["return () =>", "AbortController", "clearTimeout"],
            },
          ],
        },
        {
          kind: "code",
          sample: {
            label: "useEffect : fetch avec cleanup",
            html: `<span class="kw">import</span> { useState, useEffect } <span class="kw">from</span> <span class="str">'react'</span>

<span class="kw">const</span> <span class="fn">UserProfile</span> = ({ <span class="prop">userId</span> }) => {
  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>(<span class="kw">null</span>)
  <span class="kw">const</span> [loading, setLoading] = <span class="fn">useState</span>(<span class="kw">true</span>)

  <span class="fn">useEffect</span>(() => {
    <span class="kw">const</span> controller = <span class="kw">new</span> <span class="fn">AbortController</span>()
    <span class="fn">fetch</span>(<span class="str">\`/api/users/\${userId}\`</span>, { signal: controller.signal })
      .<span class="fn">then</span>(r =&gt; r.<span class="fn">json</span>())
      .<span class="fn">then</span>(data =&gt; { <span class="fn">setUser</span>(data); <span class="fn">setLoading</span>(<span class="kw">false</span>) })

    <span class="cm">// 🧹 Cleanup : annule si le composant se démonte</span>
    <span class="kw">return</span> () =&gt; controller.<span class="fn">abort</span>()
  }, [userId])

  <span class="kw">if</span> (loading) <span class="kw">return</span> <span class="jsx">&lt;p&gt;</span>Chargement...<span class="jsx">&lt;/p&gt;</span>
  <span class="kw">return</span> <span class="jsx">&lt;h2&gt;</span>{user?.name}<span class="jsx">&lt;/h2&gt;</span>
}`,
          },
        },
        {
          kind: "info",
          box: {
            variant: "warn",
            title: "⚠️ Piège classique : Boucle infinie",
            body: "Si vous mettez un objet ou un tableau dans le tableau de dépendances et le recréez à chaque render, useEffect boucle à l'infini. Utilisez <code>useMemo</code> ou <code>useCallback</code> pour stabiliser les références.",
          },
        },
      ],
      quiz: {
        id: "quiz-m14",
        title: "Quiz : useEffect",
        questions: [
          {
            id: "q1",
            question: "Que se passe-t-il si on passe `[]` en deuxième argument de useEffect ?",
            options: [
              { id: "a", label: "L'effet ne s'exécute jamais" },
              { id: "b", label: "L'effet s'exécute à chaque render" },
              { id: "c", label: "L'effet s'exécute une seule fois, au montage du composant" },
            ],
            correct: ["c"],
          },
          {
            id: "q2",
            question: "À quoi sert la fonction retournée depuis useEffect ?",
            options: [
              { id: "a", label: "À fournir la valeur de sortie de l'effet" },
              { id: "b", label: "C'est le cleanup : il s'exécute avant le prochain effet ou au démontage" },
              { id: "c", label: "Elle n'a aucun effet, c'est optionnel et inutile" },
            ],
            correct: ["b"],
          },
          {
            id: "q3",
            question: "Quelle erreur provoque typiquement une boucle infinie dans useEffect ?",
            options: [
              { id: "a", label: "Appeler setState à l'intérieur sans tableau de dépendances" },
              { id: "b", label: "Utiliser fetch à l'intérieur" },
              { id: "c", label: "Retourner une fonction de cleanup" },
            ],
            correct: ["a"],
            explanation: "Sans tableau de deps, useEffect s'exécute à chaque render. Si on fait setState, cela déclenche un nouveau render, qui re-déclenche l'effet, etc.",
          },
        ],
      },
    },

    /* ─── M15 ───────────────────────────────────────────────────── */
    {
      id: "m15",
      index: "M15",
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
      quiz: {
        id: "quiz-m15",
        title: "Quiz : Hooks avancés",
        questions: [
          {
            id: "q1",
            question: "Quel hook utiliser pour partager des données à tous les sous-composants sans passer par des props ?",
            options: [
              { id: "a", label: "useRef" },
              { id: "b", label: "useContext" },
              { id: "c", label: "useMemo" },
            ],
            correct: ["b"],
          },
          {
            id: "q2",
            question: "Quelle règle encadre le nom d'un custom hook ?",
            options: [
              { id: "a", label: "Il doit commencer par `use`" },
              { id: "b", label: "Il doit finir par `Hook`" },
              { id: "c", label: "Il doit être en UPPER_CASE" },
            ],
            correct: ["a"],
            explanation:
              "La convention (et la règle d'ESLint) : un hook s'appelle useQuelquechose. C'est ce qui permet à React de détecter qu'on respecte les règles des hooks.",
          },
          {
            id: "q3",
            question: "À quoi sert useRef ?",
            options: [
              { id: "a", label: "À accéder au DOM ou à stocker une valeur mutable sans provoquer de re-render" },
              { id: "b", label: "À référencer des composants enfants pour les supprimer" },
              { id: "c", label: "À mémoriser des fonctions lourdes" },
            ],
            correct: ["a"],
          },
          {
            id: "q4",
            question: "Vrai ou faux : il faut utiliser useMemo/useCallback partout par défaut.",
            options: [
              { id: "a", label: "Vrai, c'est toujours plus rapide" },
              { id: "b", label: "Faux : l'optimisation prématurée coûte en complexité et n'apporte rien la plupart du temps" },
            ],
            correct: ["b"],
          },
        ],
      },
      exercises: [
        {
          id: "ex-m15-1",
          title: "Crée un custom hook useToggle",
          instructions:
            "Crée un custom hook <code>useToggle</code> qui gère une valeur booléenne et retourne <code>[value, toggle]</code>. Utilise-le dans le composant pour afficher/masquer un message.",
          hints: [
            "Le hook doit utiliser useState en interne.",
            "`toggle` est une fonction qui inverse la valeur.",
          ],
          template: "react",
          starterFiles: {
            "/App.js": `import { useState } from "react";

// TODO : crée un hook useToggle(initial = false)
// qui retourne [value, toggle]

export default function App() {
  // TODO : utilise useToggle ici
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <button>Basculer</button>
      {/* afficher un message si value est vrai */}
    </div>
  );
}
`,
          },
          solutionFiles: {
            "/App.js": `import { useState, useCallback } from "react";

function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}

export default function App() {
  const [visible, toggle] = useToggle(false);
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <button onClick={toggle}>Basculer</button>
      {visible && <p style={{ marginTop: 12 }}>✨ Coucou, je suis là !</p>}
    </div>
  );
}
`,
          },
        },
      ],
    },

    /* ─── M16 ───────────────────────────────────────────────────── */
    {
      id: "m16",
      index: "M16",
      title: "React Router v6",
      subtitle: "Navigation multi-pages, routes dynamiques et routes protégées",
      duration: "1 semaine",
      content: [
        {
          kind: "lessons",
          items: [
            {
              id: "16.1",
              title: "6.1 : Setup et structure de base",
              desc: "BrowserRouter, Routes, Route. Comprendre comment React Router intercepte la navigation sans recharger la page (SPA).",
              tags: ["BrowserRouter", "Routes", "Route", "Link", "NavLink"],
            },
            {
              id: "16.2",
              title: "6.2 : Routes dynamiques & paramètres",
              desc: "Créer des routes avec paramètres (<code>/users/:id</code>) et les récupérer avec useParams. useSearchParams pour les query strings.",
              tags: ["useParams", "useSearchParams", "useLocation"],
            },
            {
              id: "16.3",
              title: "6.3 : Routes protégées (auth)",
              desc: "Rediriger un utilisateur non connecté vers la page de login. Pattern fondamental pour les applications avec authentification.",
              tags: ["Navigate", "useNavigate", "Outlet"],
            },
            {
              id: "16.4",
              title: "6.4 : Lazy Loading des routes",
              desc: "Charger les pages à la demande avec <code>React.lazy</code> et <code>Suspense</code>.",
            },
          ],
        },
        {
          kind: "code",
          sample: {
            label: "Routes avec lazy loading",
            html: `<span class="kw">import</span> { lazy, Suspense } <span class="kw">from</span> <span class="str">'react'</span>
<span class="kw">import</span> { Routes, Route, Navigate } <span class="kw">from</span> <span class="str">'react-router-dom'</span>

<span class="kw">const</span> Dashboard = <span class="fn">lazy</span>(() =&gt; <span class="kw">import</span>(<span class="str">'./pages/Dashboard'</span>))

<span class="kw">const</span> <span class="fn">PrivateRoute</span> = ({ <span class="prop">children</span> }) =&gt; {
  <span class="kw">const</span> { isAuth } = <span class="fn">useAuth</span>()
  <span class="kw">return</span> isAuth ? children : <span class="jsx">&lt;Navigate</span> <span class="prop">to</span>=<span class="str">"/login"</span> <span class="jsx">/&gt;</span>
}

<span class="jsx">&lt;Routes&gt;</span>
  <span class="jsx">&lt;Route</span> <span class="prop">path</span>=<span class="str">"/"</span> <span class="prop">element</span>={<span class="jsx">&lt;Home /&gt;</span>} <span class="jsx">/&gt;</span>
  <span class="jsx">&lt;Route</span> <span class="prop">path</span>=<span class="str">"/users/:id"</span> <span class="prop">element</span>={<span class="jsx">&lt;Profile /&gt;</span>} <span class="jsx">/&gt;</span>
  <span class="jsx">&lt;Route</span> <span class="prop">path</span>=<span class="str">"*"</span> <span class="prop">element</span>={<span class="jsx">&lt;NotFound /&gt;</span>} <span class="jsx">/&gt;</span>
<span class="jsx">&lt;/Routes&gt;</span>`,
          },
        },
      ],
      quiz: {
        id: "quiz-m16",
        title: "Quiz : React Router",
        questions: [
          {
            id: "q1",
            question: "Pourquoi utilise-t-on <Link> plutôt qu'une balise <a> classique ?",
            options: [
              { id: "a", label: "<Link> ne recharge pas la page ; il utilise l'API History pour garder la SPA réactive" },
              { id: "b", label: "<a> ne fonctionne pas dans React" },
              { id: "c", label: "<Link> est obligatoire légalement" },
            ],
            correct: ["a"],
          },
          {
            id: "q2",
            question: "Comment récupère-t-on le paramètre :id d'une route /users/:id ?",
            options: [
              { id: "a", label: "useLocation().id" },
              { id: "b", label: "const { id } = useParams()" },
              { id: "c", label: "window.location.params.id" },
            ],
            correct: ["b"],
          },
          {
            id: "q3",
            question: "À quoi sert <Navigate to=\"/login\" /> ?",
            options: [
              { id: "a", label: "À afficher un lien cliquable vers /login" },
              { id: "b", label: "À rediriger immédiatement vers /login quand le composant est rendu" },
              { id: "c", label: "À enregistrer la route dans l'historique sans naviguer" },
            ],
            correct: ["b"],
          },
        ],
      },
    },

    /* ─── M17 ───────────────────────────────────────────────────── */
    {
      id: "m17",
      index: "M17",
      title: "Gestion des formulaires",
      subtitle: "React Hook Form + validation Zod pour des formulaires robustes",
      duration: "0.5 semaine",
      content: [
        {
          kind: "paragraph",
          html: "React Hook Form est la bibliothèque standard pour gérer les formulaires en React. Elle est performante (peu de re-renders), facile à utiliser et s'intègre parfaitement avec <strong>Zod</strong> pour la validation.",
        },
        {
          kind: "code",
          sample: {
            label: "React Hook Form + Zod",
            html: `<span class="kw">import</span> { useForm } <span class="kw">from</span> <span class="str">'react-hook-form'</span>
<span class="kw">import</span> { zodResolver } <span class="kw">from</span> <span class="str">'@hookform/resolvers/zod'</span>
<span class="kw">import</span> { z } <span class="kw">from</span> <span class="str">'zod'</span>

<span class="kw">const</span> schema = z.<span class="fn">object</span>({
  email: z.<span class="fn">string</span>().<span class="fn">email</span>(<span class="str">'Email invalide'</span>),
  password: z.<span class="fn">string</span>().<span class="fn">min</span>(<span class="num">8</span>, <span class="str">'8 caractères minimum'</span>),
})

<span class="kw">const</span> <span class="fn">LoginForm</span> = () =&gt; {
  <span class="kw">const</span> { register, handleSubmit, formState: { errors } } =
    <span class="fn">useForm</span>({ resolver: <span class="fn">zodResolver</span>(schema) })

  <span class="kw">return</span> (
    <span class="jsx">&lt;form</span> <span class="prop">onSubmit</span>={<span class="fn">handleSubmit</span>(data =&gt; console.log(data))}<span class="jsx">&gt;</span>
      <span class="jsx">&lt;input</span> {...<span class="fn">register</span>(<span class="str">'email'</span>)} <span class="jsx">/&gt;</span>
      {errors.email &amp;&amp; <span class="jsx">&lt;span&gt;</span>{errors.email.message}<span class="jsx">&lt;/span&gt;</span>}
      <span class="jsx">&lt;button</span> <span class="prop">type</span>=<span class="str">"submit"</span><span class="jsx">&gt;</span>Se connecter<span class="jsx">&lt;/button&gt;</span>
    <span class="jsx">&lt;/form&gt;</span>
  )
}`,
          },
        },
      ],
      quiz: {
        id: "quiz-m17",
        title: "Quiz : Formulaires",
        questions: [
          {
            id: "q1",
            question: "Pourquoi React Hook Form est-il généralement préféré à une gestion manuelle via useState sur chaque champ ?",
            options: [
              { id: "a", label: "Il évite les re-renders inutiles à chaque frappe sur un champ" },
              { id: "b", label: "Il est obligatoire pour utiliser Zod" },
              { id: "c", label: "Il remplace automatiquement TypeScript" },
            ],
            correct: ["a"],
          },
          {
            id: "q2",
            question: "Que fait `zodResolver(schema)` dans React Hook Form ?",
            options: [
              { id: "a", label: "Il connecte le schéma de validation Zod au formulaire pour valider les données avant submit" },
              { id: "b", label: "Il envoie les données au serveur" },
              { id: "c", label: "Il convertit les données en JSON" },
            ],
            correct: ["a"],
          },
        ],
      },
      exercises: [
        {
          id: "ex-m17-1",
          title: "Formulaire contrôlé",
          instructions:
            "Crée un formulaire d'inscription avec les champs email et mot de passe (sans React Hook Form pour cet exercice, juste avec useState). Valide que l'email contient @ et que le mot de passe fait au moins 6 caractères. Affiche les erreurs sous chaque champ.",
          hints: [
            "Utilise un state pour chaque champ et un state d'erreurs.",
            "Valide dans le onSubmit et empêche le submit par défaut avec e.preventDefault().",
          ],
          template: "react",
          starterFiles: {
            "/App.js": `import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO : valide les champs et soit remplis 'errors', soit soumet (setSubmitted({email, password}))
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 24, fontFamily: "system-ui", maxWidth: 320 }}>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%" }} />
      </label>
      {/* TODO : message d'erreur email */}
      <label style={{ display: "block", marginTop: 12 }}>
        Mot de passe
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%" }} />
      </label>
      {/* TODO : message d'erreur mot de passe */}
      <button type="submit" style={{ marginTop: 12 }}>S'inscrire</button>
      {submitted && <p>✅ Inscrit : {submitted.email}</p>}
    </form>
  );
}
`,
          },
          solutionFiles: {
            "/App.js": `import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!email.includes("@")) next.email = "Email invalide";
    if (password.length < 6) next.password = "6 caractères minimum";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted({ email, password });
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 24, fontFamily: "system-ui", maxWidth: 320 }}>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%" }} />
      </label>
      {errors.email && <p style={{ color: "crimson" }}>{errors.email}</p>}
      <label style={{ display: "block", marginTop: 12 }}>
        Mot de passe
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%" }} />
      </label>
      {errors.password && <p style={{ color: "crimson" }}>{errors.password}</p>}
      <button type="submit" style={{ marginTop: 12 }}>S'inscrire</button>
      {submitted && <p>✅ Inscrit : {submitted.email}</p>}
    </form>
  );
}
`,
          },
        },
      ],
    },

    /* ─── M18 ───────────────────────────────────────────────────── */
    {
      id: "m18",
      index: "M18",
      title: "Styling en React",
      subtitle: "CSS Modules, Tailwind CSS, styled-components et animations Framer Motion",
      duration: "1 semaine",
      content: [
        {
          kind: "info",
          box: {
            variant: "note",
            title: "📦 CSS Modules",
            body: "Scoping automatique des classes CSS. Zéro conflit de noms. Idéal pour les projets sans framework CSS.",
          },
        },
        {
          kind: "info",
          box: {
            variant: "note",
            title: "🌊 Tailwind CSS",
            body: "Utility-first CSS. Écrire le style directement dans le JSX avec des classes pré-définies. Énorme productivité.",
          },
        },
        {
          kind: "lessons",
          items: [
            {
              id: "18.1",
              title: "8.1 : Tailwind CSS avec React",
              desc: "Installation, configuration, classes responsives, dark mode, et librairies de composants basées sur Tailwind (shadcn/ui, DaisyUI).",
              tags: ["cn()", "clsx", "tailwind-merge", "shadcn/ui"],
            },
            {
              id: "18.2",
              title: "8.2 : Framer Motion : animations avancées",
              desc: "La librairie d'animation la plus puissante pour React. Motion Components, variants, transitions, layout animations, drag & drop.",
              tags: ["motion.div", "variants", "AnimatePresence"],
            },
          ],
        },
        {
          kind: "code",
          sample: {
            label: "Framer Motion : animation d'entrée",
            html: `<span class="kw">import</span> { motion, AnimatePresence } <span class="kw">from</span> <span class="str">'framer-motion'</span>

<span class="kw">const</span> <span class="fn">Modal</span> = ({ <span class="prop">isOpen</span>, <span class="prop">children</span> }) =&gt; (
  <span class="jsx">&lt;AnimatePresence&gt;</span>
    {isOpen &amp;&amp; (
      <span class="jsx">&lt;motion.div</span>
        <span class="prop">initial</span>={{ opacity: <span class="num">0</span>, scale: <span class="num">0.9</span> }}
        <span class="prop">animate</span>={{ opacity: <span class="num">1</span>, scale: <span class="num">1</span> }}
        <span class="prop">exit</span>={{ opacity: <span class="num">0</span>, scale: <span class="num">0.9</span> }}
        <span class="prop">transition</span>={{ duration: <span class="num">0.2</span> }}
      <span class="jsx">&gt;</span>
        {children}
      <span class="jsx">&lt;/motion.div&gt;</span>
    )}
  <span class="jsx">&lt;/AnimatePresence&gt;</span>
)`,
          },
        },
      ],
      quiz: {
        id: "quiz-m18",
        title: "Quiz : Styling",
        questions: [
          {
            id: "q1",
            question: "Quel est l'avantage principal des CSS Modules ?",
            options: [
              { id: "a", label: "Ils sont plus rapides que le CSS classique" },
              { id: "b", label: "Le scoping automatique des classes évite les conflits de noms" },
              { id: "c", label: "Ils remplacent JavaScript" },
            ],
            correct: ["b"],
          },
          {
            id: "q2",
            question: "Que signifie « utility-first » dans Tailwind CSS ?",
            options: [
              { id: "a", label: "On compose des classes utilitaires (p-4, flex, text-blue-500) directement dans le JSX" },
              { id: "b", label: "On doit toujours commencer par écrire des utilitaires personnalisés" },
              { id: "c", label: "Tailwind remplace Bootstrap" },
            ],
            correct: ["a"],
          },
          {
            id: "q3",
            question: "À quoi sert <AnimatePresence> de Framer Motion ?",
            options: [
              { id: "a", label: "À animer les composants qui se démontent (exit animation)" },
              { id: "b", label: "À détecter si l'utilisateur est en ligne" },
              { id: "c", label: "À lister toutes les animations en cours" },
            ],
            correct: ["a"],
            explanation:
              "Sans AnimatePresence, les composants qui sortent du DOM disparaissent instantanément. Avec, l'animation `exit` peut se jouer avant le démontage.",
          },
        ],
      },
    },
  ],
};
