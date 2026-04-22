import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";

export const module14: Module = {
  id: "react-core-m14",
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

    <span class="cm">// Cleanup: cancel if the component unmounts</span>
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
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Piège classique — Boucle infinie",
        body: "Si vous mettez un objet ou un tableau dans le tableau de dépendances et le recréez à chaque render, useEffect boucle à l'infini. Utilisez <code>useMemo</code> ou <code>useCallback</code> pour stabiliser les références.",
      },
    },
  ],
  quiz: coreQuizzes.m14,
};
