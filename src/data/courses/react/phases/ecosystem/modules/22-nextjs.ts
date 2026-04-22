import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";

export const module22: Module = {
  id: "react-ecosystem-m22",
  index: "M22",
  title: "Next.js 14 (App Router)",
  subtitle: "Server Components, Server Actions, routing par fichiers",
  duration: "2 semaines",
  content: [
    {
      kind: "paragraph",
      html: "Next.js est <strong>LE</strong> framework React pour la production. App Router (v13+) représente une refonte profonde : on ne fait plus du « React + pages » mais du <em>React étendu</em>, avec des composants qui s'exécutent <strong>sur le serveur par défaut</strong>, un streaming natif via Suspense, et des mutations avec les Server Actions.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "22.1",
          title: "22.1 : App Router & layouts imbriqués",
          desc: "Routing par dossiers. Chaque dossier dans <code>app/</code> = un segment. <code>page.tsx</code>, <code>layout.tsx</code>, <code>loading.tsx</code>, <code>error.tsx</code> ont des rôles conventionnels. Les layouts s'imbriquent et sont <strong>persistants</strong> à travers les navigations.",
          tags: ["app/", "page.tsx", "layout.tsx", "nested layouts"],
        },
        {
          id: "22.2",
          title: "22.2 : Server Components vs Client Components",
          desc: "Par défaut : Server Component (zéro JS au client, accès direct à la base de données). <code>'use client'</code> pour passer en Client Component (hooks, listeners, state).",
          tags: ["'use client'", "RSC", "hydration"],
        },
        {
          id: "22.3",
          title: "22.3 : Server Actions",
          desc: "Muter des données côté serveur directement depuis un formulaire ou un handler, sans créer de route API. Transparent, progressivement amélioré, type-safe.",
          tags: ["'use server'", "<form action={...}>", "revalidatePath"],
        },
        {
          id: "22.4",
          title: "22.4 : Streaming, Suspense & loading.tsx",
          desc: "Afficher l'UI progressivement pendant le chargement des Server Components. <code>loading.tsx</code> fournit le fallback Suspense automatique d'un segment.",
          tags: ["Suspense", "streaming", "loading.tsx"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Server Component + Server Action",
        html: `<span class="cm">// app/posts/page.tsx — Server Component</span>
<span class="kw">import</span> { db } <span class="kw">from</span> <span class="str">"@/lib/db"</span>

<span class="kw">async function</span> <span class="fn">createPost</span>(formData: <span class="ty">FormData</span>) {
  <span class="str">"use server"</span>
  <span class="kw">await</span> db.post.<span class="fn">create</span>({
    data: { title: formData.<span class="fn">get</span>(<span class="str">"title"</span>) <span class="kw">as</span> <span class="ty">string</span> },
  })
}

<span class="kw">export default async function</span> <span class="fn">Page</span>() {
  <span class="kw">const</span> posts = <span class="kw">await</span> db.post.<span class="fn">findMany</span>()  <span class="cm">// ← direct DB access</span>
  <span class="kw">return</span> (
    <span class="jsx">&lt;&gt;</span>
      <span class="jsx">&lt;form</span> <span class="prop">action</span>={createPost}<span class="jsx">&gt;</span>
        <span class="jsx">&lt;input</span> <span class="prop">name</span>=<span class="str">"title"</span> <span class="jsx">/&gt;</span>
        <span class="jsx">&lt;button&gt;</span>Publier<span class="jsx">&lt;/button&gt;</span>
      <span class="jsx">&lt;/form&gt;</span>
      <span class="jsx">&lt;ul&gt;</span>{posts.<span class="fn">map</span>(p =&gt; <span class="jsx">&lt;li</span> <span class="prop">key</span>={p.id}<span class="jsx">&gt;</span>{p.title}<span class="jsx">&lt;/li&gt;</span>)}<span class="jsx">&lt;/ul&gt;</span>
    <span class="jsx">&lt;/&gt;</span>
  )
}`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Piège courant",
        body: "Un Server Component ne peut pas importer un fichier marqué <code>'use client'</code> et <strong>vice-versa sans règles</strong>. Règle à retenir : un Server Component peut rendre un Client Component <em>en enfant</em>, mais un Client Component ne peut pas importer un Server Component directement (il doit le recevoir via <code>children</code>).",
      },
    },
  ],
  quiz: ecosystemQuizzes.m22,
};
