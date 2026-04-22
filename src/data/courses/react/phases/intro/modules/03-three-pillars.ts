import type { Module } from "@/types";
import { introQuizzes } from "../quizzes";
import { introExercises } from "../exercises";

export const module03: Module = {
  id: "react-intro-m03",
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
  quiz: introQuizzes.m03,
  exercises: [introExercises.m03_1],
};
