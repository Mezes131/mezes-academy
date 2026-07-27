import type { Module } from "@/types";
import { basesQuizzes } from "../quizzes";

export const basesModule01: Module = {
  id: "svc-bases-m01",
  index: "01",
  title: "HTTP, HTML, JS utiles",
  subtitle: "Le strict nécessaire pour comprendre ce que l'IA génère",
  duration: "30 min",
  difficulty: "intro",
  openByDefault: true,
  objectives: [
    "Lire un échange requête/réponse HTTP",
    "Reconnaître un HTML sémantique minimal",
    "Comprendre fetch et async en JavaScript moderne",
  ],
  content: [
    { kind: "title", text: "Pourquoi ce module existe" },
    {
      kind: "paragraph",
      html: "Tu vas passer cette formation à <strong>faire générer du code par une IA, puis à le vérifier</strong>. Impossible de vérifier ce qu'on ne sait pas lire. Ce module ne fait pas de toi un développeur front. Il te donne trois lectures indispensables (le dialogue HTTP, la structure HTML et le JavaScript asynchrone) pour comprendre ce que l'IA produit et repérer quand elle se trompe.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-forward'></i> Tu connais déjà tout ça ?",
        body: "Cette phase 0 est <strong>optionnelle</strong>. Si les mots requête HTTP, balise sémantique et <code>async/await</code> te sont familiers, passe directement à la phase 1 : rien du tronc commun n'en dépend.",
      },
    },

    { kind: "title", text: "HTTP : le cycle requête → réponse" },
    {
      kind: "paragraph",
      html: "Tout le web repose sur un dialogue simple. Ton navigateur (le <em>client</em>) envoie une <strong>requête</strong> : une méthode (<code>GET</code>, <code>POST</code>…), une URL, des <em>headers</em> (métadonnées) et parfois un corps. Le <em>serveur</em> renvoie une <strong>réponse</strong> : un <strong>code de statut</strong>, des headers et un corps (HTML, JSON, image…). C'est tout. Chaque page chargée, chaque clic sur « Payer », chaque like est une variation de cet échange.",
    },
    {
      kind: "code",
      sample: {
        label: "Un échange HTTP, à plat",
        html: `<span class="cm">// Requête envoyée par le navigateur</span>
<span class="kw">GET</span> /api/products/42 <span class="ty">HTTP/1.1</span>
<span class="prop">Host:</span> boutique.example
<span class="prop">Accept:</span> application/json

<span class="cm">// Réponse du serveur</span>
<span class="ty">HTTP/1.1</span> <span class="num">200</span> <span class="fn">OK</span>
<span class="prop">Content-Type:</span> application/json

{ <span class="str">"id"</span>: <span class="num">42</span>, <span class="str">"name"</span>: <span class="str">"Clavier mécanique"</span>, <span class="str">"price"</span>: <span class="num">89</span> }`,
      },
    },
    {
      kind: "paragraph",
      html: "Les codes de statut se lisent par famille : <strong>2xx</strong> = succès, <strong>3xx</strong> = redirection, <strong>4xx</strong> = erreur côté client (<code>404</code> introuvable, <code>401</code> non authentifié, <code>403</code> interdit), <strong>5xx</strong> = erreur côté serveur. Ce réflexe de lecture te servira à chaque audit : une API qui renvoie <code>200</code> avec un message d'erreur dans le corps, c'est déjà un défaut à signaler.",
    },
    { kind: "highlight", html: "<i class='fa-solid fa-magnifying-glass'></i> <strong>Réflexe DevTools</strong> : onglet Réseau (F12) ouvert, recharge une page et observe chaque requête : méthode, statut, headers, corps. C'est ta radiographie du web." },

    { kind: "title", text: "HTML sémantique : la structure qui a du sens" },
    {
      kind: "paragraph",
      html: "Le HTML décrit la <em>nature</em> du contenu, pas son apparence. Un titre est un <code>&lt;h1&gt;</code>, une navigation un <code>&lt;nav&gt;</code>, une action un <code>&lt;button&gt;</code>. Les IA génèrent parfois des pages entières en <code>&lt;div&gt;</code> cliquables : ça <em>ressemble</em> à une interface, mais c'est invisible pour un clavier ou un lecteur d'écran, et pénalisé par les moteurs de recherche.",
    },
    {
      kind: "code",
      sample: {
        label: "Le squelette sémantique minimal",
        html: `<span class="jsx">&lt;<span class="ty">header</span>&gt;</span>
  <span class="jsx">&lt;<span class="ty">nav</span>&gt;</span>…liens principaux…<span class="jsx">&lt;/<span class="ty">nav</span>&gt;</span>
<span class="jsx">&lt;/<span class="ty">header</span>&gt;</span>
<span class="jsx">&lt;<span class="ty">main</span>&gt;</span>
  <span class="jsx">&lt;<span class="ty">h1</span>&gt;</span>Un seul h1 par page<span class="jsx">&lt;/<span class="ty">h1</span>&gt;</span>
  <span class="jsx">&lt;<span class="ty">form</span>&gt;</span>
    <span class="jsx">&lt;<span class="ty">label</span> <span class="prop">for</span>=<span class="str">"email"</span>&gt;</span>Email<span class="jsx">&lt;/<span class="ty">label</span>&gt;</span>
    <span class="jsx">&lt;<span class="ty">input</span> <span class="prop">id</span>=<span class="str">"email"</span> <span class="prop">type</span>=<span class="str">"email"</span> /&gt;</span>
    <span class="jsx">&lt;<span class="ty">button</span>&gt;</span>Envoyer<span class="jsx">&lt;/<span class="ty">button</span>&gt;</span>
  <span class="jsx">&lt;/<span class="ty">form</span>&gt;</span>
<span class="jsx">&lt;/<span class="ty">main</span>&gt;</span>
<span class="jsx">&lt;<span class="ty">footer</span>&gt;</span>…mentions…<span class="jsx">&lt;/<span class="ty">footer</span>&gt;</span>`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Le piège classique du code généré",
        body: "<code>&lt;div onclick=...&gt;</code> au lieu de <code>&lt;button&gt;</code>, des inputs sans <code>&lt;label&gt;</code>, cinq <code>&lt;h1&gt;</code> par page. Dès la phase Audit, tu apprendras à repérer et corriger ces défauts systématiquement.",
      },
    },

    { kind: "title", text: "Le JavaScript utile : fetch et l'asynchrone" },
    {
      kind: "paragraph",
      html: "Le JavaScript moderne que tu croiseras le plus dans du code généré tient en trois notions : <code>fetch</code> pour appeler une API, les <strong>promesses</strong> pour représenter « un résultat qui arrivera plus tard », et <code>async/await</code> pour écrire ce code asynchrone comme s'il était linéaire.",
    },
    {
      kind: "code",
      sample: {
        label: "Appeler une API, la version correcte",
        html: `<span class="kw">async function</span> <span class="fn">loadProduct</span>() {
  <span class="kw">const</span> response = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">"/api/products/42"</span>);
  <span class="kw">if</span> (!response.<span class="prop">ok</span>) {
    <span class="cm">// fetch ne rejette PAS sur un 404/500 : à vérifier soi-même</span>
    <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">\`HTTP \${response.status}\`</span>);
  }
  <span class="kw">const</span> product = <span class="kw">await</span> response.<span class="fn">json</span>();
  <span class="kw">return</span> product;
}`,
      },
    },
    {
      kind: "paragraph",
      html: "Retiens surtout le piège : <strong><code>fetch</code> ne rejette sa promesse que sur une panne réseau</strong>. Un serveur qui répond <code>500</code> est, du point de vue de <code>fetch</code>, une requête « réussie ». Le code généré par IA oublie très souvent le test <code>response.ok</code>. Tu viens d'apprendre ta première vérification d'audit.",
    },

    { kind: "title", text: "À toi de jouer : autopsie d'un flux réseau" },
    {
      kind: "paragraph",
      html: "Exercice pratique (hors éditeur) : ouvre les DevTools (F12) → onglet <strong>Réseau</strong> sur un site que tu utilises. Recharge la page, choisis une requête vers une API (type <code>fetch/XHR</code>) et note : la méthode, l'URL, le code de statut, deux headers de la réponse et la forme du corps. Puis explique en trois phrases ce que cette requête accomplit pour l'utilisateur. Cette autopsie guidée est exactement le geste que tu referas en audit de sécurité, phase 8.",
    },
  ],
  quiz: basesQuizzes.m01,
};
