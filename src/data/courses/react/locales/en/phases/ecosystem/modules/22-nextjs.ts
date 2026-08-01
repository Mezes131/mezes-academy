import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";

export const module22: Module = {
  id: "react-ecosystem-m22",
  index: "22",
  title: "Next.js 14 (App Router)",
  subtitle: "Server Components, Server Actions, file-based routing",
  duration: "2 weeks",
  content: [
    {
      kind: "paragraph",
      html: "Next.js is <strong>THE</strong> React framework for production. App Router (v13+) is a deep overhaul: you no longer build « React + pages » but <em>extended React</em>, with components that run <strong>on the server by default</strong>, native streaming via Suspense, and mutations with Server Actions.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "22.1",
          title: "22.1: App Router & nested layouts",
          desc: "Folder-based routing. Each folder in <code>app/</code> = a segment. <code>page.tsx</code>, <code>layout.tsx</code>, <code>loading.tsx</code>, and <code>error.tsx</code> have conventional roles. Layouts nest and are <strong>persistent</strong> across navigations.",
          tags: ["app/", "page.tsx", "layout.tsx", "nested layouts"],
        },
        {
          id: "22.2",
          title: "22.2: Server Components vs Client Components",
          desc: "By default: Server Component (zero JS on the client, direct database access). <code>'use client'</code> to switch to a Client Component (hooks, listeners, state).",
          tags: ["'use client'", "RSC", "hydration"],
        },
        {
          id: "22.3",
          title: "22.3: Server Actions",
          desc: "Mutate data on the server directly from a form or handler, without creating an API route. Transparent, progressively enhanced, type-safe.",
          tags: ["'use server'", "<form action={...}>", "revalidatePath"],
        },
        {
          id: "22.4",
          title: "22.4: Streaming, Suspense & loading.tsx",
          desc: "Show the UI progressively while Server Components load. <code>loading.tsx</code> provides the automatic Suspense fallback for a segment.",
          tags: ["Suspense", "streaming", "loading.tsx"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Server Component + Server Action",
        html: `<span class="cm">// app/posts/page.tsx : Server Component</span>
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
        <span class="jsx">&lt;button&gt;</span>Publish<span class="jsx">&lt;/button&gt;</span>
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
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Common pitfall",
        body: "A Server Component cannot import a file marked <code>'use client'</code> and <strong>vice versa without rules</strong>. Rule to remember: a Server Component can render a Client Component <em>as a child</em>, but a Client Component cannot import a Server Component directly (it must receive it via <code>children</code>).",
      },
    },
  ],
  quiz: ecosystemQuizzes.m22,
};
