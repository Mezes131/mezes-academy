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
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-route'></i> Prérequis — Ce module suppose que tu sais",
        body: "HTML/CSS de base (balises, attributs), JavaScript ES6+ (fonctions fléchées, destructuration, <code>const</code>/<code>let</code>, modules <code>import/export</code>). Si l'une de ces bases te semble floue, reviens-y avant de continuer — React amplifie les lacunes JS, il ne les cache pas.",
      },
    },
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
        body: "<strong>Analogie :</strong> imagine un architecte qui dessine un plan de modification <em>avant</em> d'envoyer des ouvriers sur le chantier. Le Virtual DOM est ce plan : React y calcule les changements, puis n'envoie au vrai DOM que les instructions strictement nécessaires.<br/><br/>Techniquement, React maintient une copie légère du DOM en mémoire. Quand l'état change, il compare l'ancien et le nouveau Virtual DOM (<strong>diffing</strong>), puis applique uniquement les différences au vrai DOM (<strong>réconciliation</strong>).<br/><br/><strong>Erreur classique :</strong> croire que le Virtual DOM est <em>toujours</em> plus rapide que la manipulation directe. Sur des interfaces très simples, le surcoût de React est inutile — il brille sur les UIs complexes et fortement dynamiques.",
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
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-clipboard-check'></i> Checkpoint — Leçons 11.1 & 11.2",
        body: "<strong>Q1 :</strong> Pourquoi Vite est-il préféré à Create React App ?<br/><em>→ Vite exploite les modules ESM natifs du navigateur : le serveur démarre instantanément et ne regroupe que les modules modifiés. CRA regroupe tout le projet avant de servir, ce qui ralentit à mesure que la codebase grossit.</em><br/><br/><strong>Q2 :</strong> Dans quel fichier monte-t-on React sur le DOM, et avec quelle méthode ?<br/><em>→ Dans <code>main.jsx</code>, via <code>ReactDOM.createRoot(document.getElementById('root')).render(&lt;App /&gt;)</code>.</em>",
      },
    },
    {
      kind: "code",
      sample: {
        label: "JSX — impératif vs déclaratif",
        html: `<span class="cm">// ❌ AVANT React — DOM impératif (Vanilla JS)</span>
<span class="kw">const</span> div = document.<span class="fn">createElement</span>(<span class="str">'div'</span>)
div.className = <span class="str">'card'</span>
div.innerHTML = <span class="str">\`&lt;h1&gt;Bonjour Ada !&lt;/h1&gt;&lt;p&gt;2 + 2 = 4&lt;/p&gt;\`</span>
document.body.<span class="fn">appendChild</span>(div) <span class="cm">// on décrit COMMENT faire</span>

<span class="cm">// ✅ APRÈS React — JSX déclaratif</span>
<span class="kw">const</span> <span class="fn">Salutation</span> = () => {
  <span class="kw">const</span> prenom = <span class="str">"Ada"</span>
  <span class="kw">return</span> (
    <span class="jsx">&lt;div</span> <span class="prop">className</span>=<span class="str">"card"</span><span class="jsx">&gt;</span>           <span class="cm">{/* className, jamais class */}</span>
      <span class="jsx">&lt;h1&gt;</span>Bonjour, {prenom} !<span class="jsx">&lt;/h1&gt;</span>   <span class="cm">{/* expression JS entre {} */}</span>
      <span class="jsx">&lt;p&gt;</span>2 + 2 = {2 + 2}<span class="jsx">&lt;/p&gt;</span>        <span class="cm">{/* calcul évalué au rendu */}</span>
      {prenom === <span class="str">"Ada"</span> &amp;&amp; <span class="jsx">&lt;span&gt;</span>Légende du code<span class="jsx">&lt;/span&gt;</span>}
    <span class="jsx">&lt;/div&gt;</span>
  ) <span class="cm">// on décrit CE QU'ON VEUT, React s'occupe du reste</span>
}`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-code'></i> Concept clé — Ce que JSX devient vraiment",
        body: "JSX n'est pas de la magie : Babel/Vite le transforme en <code>React.createElement()</code> avant d'atteindre le navigateur.<br/><br/><code>&lt;h1 className=\"title\"&gt;Bonjour&lt;/h1&gt;</code><br/>devient :<br/><code>React.createElement('h1', { className: 'title' }, 'Bonjour')</code><br/><br/>Comprendre cette transformation t'aide à déchiffrer les erreurs de compilation JSX et à savoir pourquoi <code>if</code> ou <code>for</code> ne peuvent pas être utilisés <em>directement</em> dans le JSX — ce sont des <strong>instructions</strong>, pas des <strong>expressions</strong> retournant une valeur.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Pièges JSX les plus fréquents",
        body: "<strong>1. <code>class</code> → <code>className</code> :</strong> <code>class</code> est un mot réservé JavaScript. L'utiliser en JSX provoque une erreur (ou un warning silencieux selon la version).<br/><strong>2. Toutes les balises doivent être fermées :</strong> <code>&lt;img /&gt;</code>, <code>&lt;br /&gt;</code>, <code>&lt;input /&gt;</code> — JSX applique les règles XML strictes, contrairement au HTML du navigateur.<br/><strong>3. Un seul élément racine :</strong> un composant ne peut retourner qu'un seul nœud racine. Utilise <code>&lt;&gt;...&lt;/&gt;</code> (Fragment) pour éviter une <code>&lt;div&gt;</code> inutile dans le DOM.<br/><strong>4. <code>false</code>, <code>null</code>, <code>undefined</code> ne s'affichent pas :</strong> c'est voulu, et c'est ce qui rend <code>{condition &amp;&amp; &lt;El/&gt;}</code> sûr.",
      },
    },
    {
      kind: "code",
      sample: {
        label: "Anti-pattern — key={index} sur liste dynamique",
        html: `<span class="cm">// ❌ Anti-pattern : index du tableau comme key</span>
items.<span class="fn">map</span>((name, <span class="prop">index</span>) =>
  <span class="jsx">&lt;li</span> <span class="prop">key</span>={index}<span class="jsx">&gt;</span>{name}<span class="jsx">&lt;/li&gt;</span>
  <span class="cm">// ⚠ Si la liste est triée, React réutilise les mauvais</span>
  <span class="cm">// nœuds DOM → inputs décalés, états qui sautent</span>
)

<span class="cm">// ✅ Bonne pratique : identifiant métier stable</span>
users.<span class="fn">map</span>(user =>
  <span class="jsx">&lt;li</span> <span class="prop">key</span>={user.id}<span class="jsx">&gt;</span>{user.name}<span class="jsx">&lt;/li&gt;</span>
  <span class="cm">// ✅ L'id reste le même même si l'ordre change</span>
)`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-skull-crossbones'></i> Bug silencieux — key={index} sur liste dynamique",
        body: "Utiliser l'index comme <code>key</code> fonctionne <em>seulement</em> si la liste est statique et ne change jamais d'ordre. Dès qu'on <strong>ajoute, supprime ou trie</strong> des éléments, React réutilise les mauvais nœuds DOM : tu obtiens des <strong>inputs dont le contenu ne correspond plus à la donnée</strong>, des animations sur le mauvais élément, ou des états qui « sautent » d'un item à l'autre. Ce bug est souvent silencieux — aucune erreur console, juste un comportement inexplicable. Règle absolue : toujours utiliser un <code>id</code> métier stable.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-clipboard-check'></i> Checkpoint — Leçons 11.3 & 11.4",
        body: "<strong>Q1 :</strong> Pourquoi écrit-on <code>className</code> et non <code>class</code> en JSX ?<br/><em>→ <code>class</code> est un mot réservé JavaScript (syntaxe des classes ES6). JSX compile en JS pur, donc <code>className</code> est obligatoire pour éviter le conflit syntaxique.</em><br/><br/><strong>Q2 :</strong> Quelle différence concrète entre <code>{condition &amp;&amp; &lt;El/&gt;}</code> et <code>{condition ? &lt;A/&gt; : &lt;B/&gt;}</code> ?<br/><em>→ Le premier n'affiche <strong>rien</strong> si la condition est fausse (masquer/afficher). Le second choisit toujours entre deux alternatives — si <code>condition</code> est <code>false</code>, il affiche <code>&lt;B/&gt;</code>.</em>",
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
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-diagram-project'></i> Connexions — Ce module dans le grand tableau",
        body: "<strong>Prérequis mobilisés ici :</strong> fonctions fléchées, destructuration, modules ES6 — tu les as utilisés dans chaque composant JSX que tu as écrit.<br/><br/><strong>Ce que tu approfondiras ensuite :</strong><br/>→ <strong>M12</strong> : la notion de composant devient paramétrable avec les <em>props</em> et la communication parent→enfant.<br/>→ <strong>M13</strong> : ton premier composant interactif avec <code>useState</code>.<br/>→ <strong>M16</strong> : Vite que tu as configuré ici sera le même outil de base sous <em>React Router</em>.<br/><br/><strong>Dans l'écosystème React réel :</strong> les fragments <code>&lt;&gt;</code> se retrouvent dans chaque projet Next.js ou Remix. La prop <code>key</code> que tu maîtrises ici est aussi critique dans les animations (Framer Motion) et les listes virtualisées (react-window).",
      },
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-flag-checkered'></i> Synthèse — Module M11",
        body: "<strong>Après ce module, tu sais :</strong><br/>✓ Expliquer pourquoi React existe et quel problème concret il résout<br/>✓ Créer un projet React avec Vite et naviguer dans sa structure<br/>✓ Écrire du JSX valide : expressions, conditions, listes, fragments<br/>✓ Identifier et corriger les pièges JSX classiques (<code>className</code>, balises fermantes, élément racine unique)<br/>✓ Choisir une <code>key</code> stable pour les listes et comprendre pourquoi c'est critique<br/>✓ Utiliser React DevTools pour inspecter un arbre de composants<br/><br/><strong>3 mots-clés absolus :</strong> <code>Virtual DOM</code> · <code>JSX</code> · <code>Composant</code><br/><br/><em>Maintenant que tu sais <strong>afficher</strong> une UI statique avec React, M12 t'apprend à la rendre <strong>paramétrable</strong> — c'est l'entrée dans le vrai pouvoir de React.</em>",
      },
    },
  ],
  quiz: coreQuizzes.m11,
  exercises: [coreExercises.m11_1],
};
