import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";

export const module16: Module = {
  id: "react-core-m16",
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

    /* ─── Pedagogical warning: the `key` pitfall on param change ──── */
    { kind: "title", text: "Piège fréquent : l'état interne qui « fuit » entre routes" },
    {
      kind: "paragraph",
      html: "Quand React Router passe de <code>/users/1</code> à <code>/users/2</code>, il <strong>ne démonte pas</strong> le composant <code>&lt;Profile&gt;</code> : il lui change simplement son <code>useParams</code>. Résultat : tout le state interne (formulaire en cours de saisie, données d'un <code>fetch</code> précédent, onglet actif…) reste tel quel. C'est l'un des bugs les plus fréquents chez les débutants — et même chez les devs expérimentés.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Symptôme concret",
        body: "Tu valides un quiz sur /module/m11. Tu navigues vers /module/m12 : le quiz apparaît déjà soumis avec les anciennes réponses. Tu valides un formulaire sur /users/42 : en allant sur /users/43, le formulaire garde les données précédentes.",
      },
    },
    {
      kind: "paragraph",
      html: "La solution idiomatique : fournir une <strong>prop <code>key</code></strong> qui dépend de l'identifiant de la ressource. Quand la clé change, React démonte entièrement l'ancien sous-arbre et en monte un nouveau → tous les <code>useState</code>/<code>useRef</code> repartent à zéro proprement.",
    },
    {
      kind: "code",
      sample: {
        label: "Router pattern : key sur l'id de ressource",
        html: `<span class="cm">// ❌ Anti-pattern — le state interne survit entre /users/1 et /users/2</span>
<span class="kw">function</span> <span class="fn">UsersPage</span>() {
  <span class="kw">const</span> { id } = <span class="fn">useParams</span>()
  <span class="kw">return</span> <span class="jsx">&lt;Profile</span> <span class="prop">userId</span>={id} <span class="jsx">/&gt;</span>
}

<span class="cm">// ✅ Correct — \`key\` force un remount complet sur changement d'id</span>
<span class="kw">function</span> <span class="fn">UsersPage</span>() {
  <span class="kw">const</span> { id } = <span class="fn">useParams</span>()
  <span class="kw">return</span> <span class="jsx">&lt;Profile</span> <span class="prop">key</span>={id} <span class="prop">userId</span>={id} <span class="jsx">/&gt;</span>
}`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-circle-check'></i> Règle mnémotechnique",
        body: "Si un composant <strong>stateful</strong> dépend d'un identifiant passé en prop (ou lu via <code>useParams</code>), mets un <code>key</code> dessus. C'est presque toujours ce que tu veux : isolation claire, zéro fuite de state, zéro <code>useEffect</code> de « reset ».",
      },
    },
  ],
  quiz: coreQuizzes.m16,
};
