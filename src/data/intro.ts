import type { Phase } from "@/types";

export const introPhase: Phase = {
  id: "intro",
  color: "intro",
  icon: "fa-book-open",
  label: "Introduction",
  title: "C'est quoi React, au juste ?",
  summary:
    "Avant d'écrire la moindre ligne de code, prenons un moment pour comprendre ce qu'est vraiment React, pourquoi il a été créé, et pourquoi il est devenu incontournable.",
  metaTags: ["lecture ~15 min", "aucun prérequis", "vulgarisation", "fondations"],
  modules: [
    {
      id: "intro-01",
      index: "01",
      title: "Une définition simple, sans jargon",
      subtitle: "Comprendre React en une phrase : puis vraiment le comprendre",
      duration: "3 min",
      openByDefault: true,
      content: [
        { kind: "title", text: "La définition officielle" },
        {
          kind: "paragraph",
          html: "<strong>React est une bibliothèque JavaScript créée par Facebook (aujourd'hui Meta) en 2013, qui sert à construire des interfaces utilisateur.</strong> C'est tout. Pas de magie, pas de mystère : React est un <em>outil</em> qui vous aide à afficher des boutons, des formulaires, des listes, des pages entières : bref, tout ce que l'utilisateur voit et manipule dans un navigateur.",
        },
        {
          kind: "paragraph",
          html: "Mais cette définition, bien qu'exacte, ne dit pas <em>pourquoi</em> React est devenu le standard mondial du développement web moderne. Pour le comprendre, il faut remonter au problème qu'il résout.",
        },
        {
          kind: "info",
          box: {
            variant: "note",
            title: "<i class='fa-solid fa-puzzle-piece'></i> Une analogie pour démarrer",
            body: "Imaginez que vous construisez une maison. Sans React, vous fabriquez chaque brique, chaque fenêtre et chaque porte à la main, une par une. Avec React, vous concevez une fois un <strong>modèle de fenêtre</strong>, un <strong>modèle de porte</strong>, et vous les réutilisez autant de fois que nécessaire. Mieux : quand vous changez la peinture, React repeint <em>uniquement</em> les murs concernés.",
          },
        },
        { kind: "title", text: "Le vrai problème que React résout" },
        {
          kind: "paragraph",
          html: "Avant React, construire une interface interactive avec JavaScript \"vanilla\" ou jQuery était épuisant. À chaque clic, à chaque saisie, il fallait manuellement :",
        },
        { kind: "highlight", html: "<i class='fa-solid fa-magnifying-glass'></i> Retrouver le bon élément HTML dans la page (<code>document.querySelector</code>)" },
        { kind: "highlight", html: "<i class='fa-solid fa-pen-to-square'></i> Modifier son contenu ou son style à la main" },
        { kind: "highlight", html: "<i class='fa-solid fa-arrows-rotate'></i> Synchroniser toutes les parties de l'UI qui dépendent de ce changement" },
        { kind: "highlight", html: "<i class='fa-solid fa-bug'></i> Déboguer pendant des heures quand un état n'était pas à jour quelque part" },
        {
          kind: "paragraph",
          html: "Plus l'application grossissait, plus le code ressemblait à un plat de spaghettis. React propose une idée radicalement différente : <strong>décrivez à quoi doit ressembler l'interface pour un état donné, et laissez React s'occuper de mettre le DOM à jour.</strong> Vous passez d'une logique <em>impérative</em> (\"fais ceci, puis cela\") à une logique <em>déclarative</em> (\"voici ce que je veux voir\").",
        },
      ],
      quiz: {
        id: "quiz-intro-01",
        title: "Valide ta compréhension",
        questions: [
          {
            id: "q1",
            question: "En une phrase, qu'est-ce que React ?",
            options: [
              { id: "a", label: "Un langage de programmation concurrent de JavaScript" },
              { id: "b", label: "Une bibliothèque JavaScript pour construire des interfaces utilisateur" },
              { id: "c", label: "Un serveur web spécialisé dans les applications modernes" },
              { id: "d", label: "Une base de données orientée documents" },
            ],
            correct: ["b"],
            explanation:
              "React est bien une bibliothèque JavaScript (pas un langage, pas un serveur, pas une base de données) dédiée à la construction d'interfaces utilisateur.",
          },
          {
            id: "q2",
            question: "Quelle approche adopte React ?",
            options: [
              { id: "a", label: "Impérative : on dit étape par étape comment modifier le DOM" },
              { id: "b", label: "Déclarative : on décrit l'UI pour un état donné, React s'occupe du reste" },
              { id: "c", label: "Fonctionnelle pure : aucun état, aucune mutation possible" },
            ],
            correct: ["b"],
            explanation:
              "React est déclaratif : vous décrivez à quoi doit ressembler l'interface pour un état donné, et c'est React qui calcule les mises à jour du DOM.",
          },
          {
            id: "q3",
            question: "Qui a créé React et en quelle année ?",
            options: [
              { id: "a", label: "Google, en 2010" },
              { id: "b", label: "Microsoft, en 2015" },
              { id: "c", label: "Facebook (Meta), en 2013" },
              { id: "d", label: "Vercel, en 2016" },
            ],
            correct: ["c"],
          },
        ],
      },
    },
    {
      id: "intro-02",
      index: "02",
      title: "Bibliothèque ou framework ? La nuance qui change tout",
      subtitle: "Pourquoi React est volontairement minimaliste : et ce que cela implique",
      duration: "2 min",
      content: [
        {
          kind: "paragraph",
          html: "Un détail de vocabulaire qui a son importance : React est une <strong>bibliothèque</strong> (<em>library</em>), pas un framework. La différence est philosophique : un framework vous impose une structure et appelle <em>votre</em> code. Une bibliothèque, elle, attend que <em>vous</em> l'appeliez, quand vous en avez besoin.",
        },
        {
          kind: "info",
          box: {
            variant: "concept",
            title: "<i class='fa-solid fa-lightbulb'></i> Conséquence pratique",
            body: "React ne gère <strong>que la vue</strong>. Pour tout le reste (routing, requêtes HTTP, gestion du state global, formulaires complexes, tests…), vous choisissez vous-même les outils complémentaires. C'est à la fois la plus grande force et la plus grande difficulté de React.",
          },
        },
        {
          kind: "paragraph",
          html: "Concrètement, la stack React moderne ressemble souvent à : <strong>React</strong> (vue) + <strong>React Router</strong> (navigation) + <strong>TanStack Query</strong> (données serveur) + <strong>Zustand</strong> (state global) + <strong>Tailwind CSS</strong> (styles).",
        },
      ],
      quiz: {
        id: "quiz-intro-02",
        title: "Bibliothèque vs framework",
        questions: [
          {
            id: "q1",
            question: "React est…",
            options: [
              { id: "a", label: "Un framework complet avec tout inclus" },
              { id: "b", label: "Une bibliothèque qui ne gère que la vue" },
              { id: "c", label: "Un runtime JavaScript alternatif" },
            ],
            correct: ["b"],
          },
          {
            id: "q2",
            question: "Laquelle de ces responsabilités N'EST PAS gérée par React lui-même ?",
            options: [
              { id: "a", label: "Le rendu des composants" },
              { id: "b", label: "La gestion du state local d'un composant" },
              { id: "c", label: "Les requêtes HTTP vers une API" },
              { id: "d", label: "Le Virtual DOM" },
            ],
            correct: ["c"],
            explanation:
              "Les requêtes HTTP ne sont pas gérées par React. On utilise fetch, axios, ou des bibliothèques comme TanStack Query.",
          },
        ],
      },
    },
    {
      id: "intro-03",
      index: "03",
      title: "Les 3 idées fondamentales de React",
      subtitle: "Si vous ne retenez que ça de cette introduction, retenez ces trois concepts",
      duration: "5 min",
      content: [
        {
          kind: "paragraph",
          html: "Toute la magie de React repose sur trois piliers. Tout le reste : hooks, state, props, effets : ne sont que des <em>outils</em> pour mettre en œuvre ces trois idées.",
        },
        { kind: "title", text: "1 : Les composants : découper pour mieux régner" },
        {
          kind: "paragraph",
          html: "Un composant est un <strong>morceau d'interface réutilisable</strong>, encapsulé dans une fonction JavaScript. Un bouton, une navbar, une page : tout est un composant. Comme les LEGO, les composants s'emboîtent pour former des interfaces complexes à partir de pièces simples.",
        },
        {
          kind: "info",
          box: {
            variant: "tip",
            title: "<i class='fa-solid fa-circle-check'></i> La promesse des composants",
            body: "Vous écrivez un composant <code>Bouton</code> une seule fois, et vous le réutilisez dans 50 endroits. Le jour où vous changez son design, <strong>tous les boutons se mettent à jour automatiquement</strong>. Fin du copier-coller.",
          },
        },
        { kind: "title", text: "2 : Le state : des interfaces qui vivent" },
        {
          kind: "paragraph",
          html: "Dès qu'il faut réagir à une action : un clic, une saisie, une requête réseau : il faut une <strong>mémoire</strong> pour suivre ce qui change : le <em>state</em>. Quand le state change, React re-dessine automatiquement les parties concernées.",
        },
        { kind: "highlight", html: "<i class='fa-solid fa-computer-mouse'></i> L'utilisateur clique sur « Like » → le state <code>likes</code> passe de 3 à 4" },
        { kind: "highlight", html: "<i class='fa-solid fa-bolt'></i> React détecte le changement → recalcule la partie affectée" },
        { kind: "highlight", html: "<i class='fa-solid fa-palette'></i> Le navigateur affiche « 4 likes » : vous n'avez rien eu à faire" },
        { kind: "title", text: "3 : Le Virtual DOM : la performance par la ruse" },
        {
          kind: "paragraph",
          html: "Modifier le DOM est lent. React garde en mémoire une <strong>copie allégée du DOM</strong> (Virtual DOM). À chaque changement, il compare l'ancienne et la nouvelle version, puis applique au vrai DOM <em>uniquement</em> les différences.",
        },
        {
          kind: "code",
          sample: {
            label: "Un composant React minimal",
            html: `<span class="cm">// This is the simplest React component.</span>

<span class="kw">function</span> <span class="fn">Compteur</span>() {
  <span class="kw">const</span> [count, setCount] = <span class="fn">useState</span>(<span class="num">0</span>)  <span class="cm">// ← state</span>

  <span class="kw">return</span> (
    <span class="jsx">&lt;div&gt;</span>
      <span class="jsx">&lt;p&gt;</span>Vous avez cliqué {count} fois<span class="jsx">&lt;/p&gt;</span>
      <span class="jsx">&lt;button</span> <span class="prop">onClick</span>={() =&gt; <span class="fn">setCount</span>(count + <span class="num">1</span>)}<span class="jsx">&gt;</span>
        Cliquer
      <span class="jsx">&lt;/button&gt;</span>
    <span class="jsx">&lt;/div&gt;</span>
  )
}`,
          },
        },
      ],
      quiz: {
        id: "quiz-intro-03",
        title: "Les 3 piliers",
        questions: [
          {
            id: "q1",
            question: "Quels sont les 3 piliers de React ? (plusieurs réponses)",
            options: [
              { id: "a", label: "Les composants" },
              { id: "b", label: "Les bases de données" },
              { id: "c", label: "Le state" },
              { id: "d", label: "Le Virtual DOM" },
              { id: "e", label: "Le serveur Node.js" },
            ],
            correct: ["a", "c", "d"],
            explanation: "Composants + state + Virtual DOM. Le reste n'est pas propre à React.",
          },
          {
            id: "q2",
            question: "À quoi sert le Virtual DOM ?",
            options: [
              { id: "a", label: "À remplacer complètement le DOM du navigateur" },
              { id: "b", label: "À calculer les différences et n'appliquer au vrai DOM que le strict minimum" },
              { id: "c", label: "À stocker les données de l'utilisateur" },
            ],
            correct: ["b"],
          },
          {
            id: "q3",
            question: "Quand React re-dessine-t-il un composant ?",
            options: [
              { id: "a", label: "À chaque seconde par défaut" },
              { id: "b", label: "Quand son state ou ses props changent" },
              { id: "c", label: "Jamais automatiquement, il faut appeler render() soi-même" },
            ],
            correct: ["b"],
          },
        ],
      },
      exercises: [
        {
          id: "ex-intro-03",
          title: "Ton premier compteur",
          instructions:
            "Complète le composant <code>Compteur</code> pour qu'il affiche un compteur cliquable. Il doit démarrer à 0 et s'incrémenter à chaque clic sur le bouton.",
          hints: [
            "Utilise le hook useState pour stocker la valeur du compteur.",
            "Dans onClick, appelle setCount avec count + 1.",
          ],
          template: "react",
          starterFiles: {
            "/App.js": `import { useState } from "react";

export default function Compteur() {
  // TODO: declare a \`count\` state initialized to 0
  // TODO: complete the button to increment the counter

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Mon premier compteur</h2>
      <p>Valeur : (à afficher)</p>
      <button>Cliquer</button>
    </div>
  );
}
`,
          },
          solutionFiles: {
            "/App.js": `import { useState } from "react";

export default function Compteur() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Mon premier compteur</h2>
      <p>Valeur : {count}</p>
      <button onClick={() => setCount(count + 1)}>Cliquer</button>
    </div>
  );
}
`,
          },
        },
      ],
    },
    {
      id: "intro-04",
      index: "04",
      title: "Pourquoi apprendre React en 2026 ?",
      subtitle: "Les raisons objectives qui en font un choix stratégique",
      duration: "3 min",
      content: [
        {
          kind: "paragraph",
          html: "On pourrait se contenter de dire « parce que tout le monde l'utilise », mais ce serait réducteur. Voici les vraies raisons qui font de React un investissement solide.",
        },
        {
          kind: "info",
          box: {
            variant: "tip",
            title: "<i class='fa-solid fa-globe'></i> L'écosystème le plus riche",
            body: "Plus de 220 000 packages npm liés à React. Pour quasiment tout problème rencontré, une solution éprouvée existe déjà.",
          },
        },
        {
          kind: "info",
          box: {
            variant: "tip",
            title: "<i class='fa-solid fa-briefcase'></i> Le marché de l'emploi n°1",
            body: "React domine les offres front-end. En 2026, c'est encore la compétence la plus demandée en développement web côté client.",
          },
        },
        {
          kind: "info",
          box: {
            variant: "tip",
            title: "<i class='fa-solid fa-building'></i> Utilisé par les géants",
            body: "Meta, Netflix, Airbnb, Uber, Shopify, Discord, WhatsApp Web, Instagram, Twitch…",
          },
        },
        {
          kind: "info",
          box: {
            variant: "warn",
            title: "<i class='fa-solid fa-triangle-exclamation'></i> Ce que React n'est PAS",
            body: "React n'est pas un langage (c'est du JavaScript), pas une base de données, pas un serveur. Il ne remplace pas une bonne connaissance de HTML, CSS et JavaScript.",
          },
        },
      ],
      quiz: {
        id: "quiz-intro-04",
        title: "Pourquoi React ?",
        questions: [
          {
            id: "q1",
            question: "Laquelle de ces entreprises utilise React ?",
            options: [
              { id: "a", label: "Meta / Facebook" },
              { id: "b", label: "Netflix" },
              { id: "c", label: "Airbnb" },
              { id: "d", label: "Toutes les propositions" },
            ],
            correct: ["d"],
          },
          {
            id: "q2",
            question: "Vrai ou faux : maîtriser React dispense d'apprendre HTML, CSS et JavaScript.",
            options: [
              { id: "a", label: "Vrai" },
              { id: "b", label: "Faux" },
            ],
            correct: ["b"],
            explanation: "React repose entièrement sur JavaScript, et s'interface avec HTML et CSS. Les bases restent indispensables.",
          },
        ],
      },
    },
    {
      id: "intro-05",
      index: "05",
      title: "Comment ce parcours va vous emmener jusqu'à l'expertise",
      subtitle: "La méthode pédagogique et ce à quoi vous attendre",
      duration: "2 min",
      content: [
        {
          kind: "paragraph",
          html: "Ce parcours est organisé en <strong>quatre phases progressives</strong>, conçues pour que chaque notion s'appuie sur la précédente.",
        },
        { kind: "highlight", html: "<strong>Phase 3 : React Core</strong> : Les fondations : JSX, composants, props, state, hooks, routing, styling" },
        { kind: "highlight", html: "<strong>Phase 4 : TypeScript</strong> : Ajouter le typage pour écrire du code robuste" },
        { kind: "highlight", html: "<strong>Phase 5 : Écosystème</strong> : Next.js, authentification, bases de données, tests, performance" },
        { kind: "highlight", html: "<strong>Phase 6 : Expert</strong> : Architecture, DevOps, internals de React, open source, IA" },
        {
          kind: "info",
          box: {
            variant: "concept",
            title: "<i class='fa-solid fa-lightbulb'></i> La bonne posture d'apprentissage",
            body: "React se comprend <strong>en faisant</strong>. Après chaque module, fais les exercices, casse-les, modifie-les. Le passage de « je comprends le code » à « j'écris le code » est le plus grand saut de cette formation.",
          },
        },
      ],
    },
  ],
};
