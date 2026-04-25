import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";

export const module24: Module = {
  id: "react-ecosystem-m24",
  index: "03",
  title: "Authentification",
  subtitle: "NextAuth / Auth.js, sessions, JWT, OAuth",
  duration: "1 semaine",
  content: [
    {
      kind: "paragraph",
      html: "L'authentification n'est pas un sujet où l'on improvise : les erreurs de sécurité sont coûteuses. L'écosystème React moderne s'appuie sur des briques solides (Auth.js, Clerk, Lucia…) plutôt que de tout réinventer.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "24.1",
          title: "24.1 : Les modèles d'auth modernes",
          desc: "Session serveur (cookie + table sessions en BDD) vs JWT stateless (token auto-porté). Trade-offs : révocabilité vs scalabilité. OAuth 2.0 / OpenID Connect pour déléguer (« Sign in with Google »).",
          tags: ["session", "JWT", "OAuth 2.0", "OIDC"],
        },
        {
          id: "24.2",
          title: "24.2 : NextAuth.js (Auth.js)",
          desc: "La solution intégrée la plus populaire pour Next.js. Providers OAuth clés-en-main, gestion des sessions, callbacks personnalisables, intégration BDD via Prisma.",
          tags: ["providers", "callbacks", "adapter"],
        },
        {
          id: "24.3",
          title: "24.3 : Routes protégées & middleware",
          desc: "Vérifier l'authentification côté serveur (middleware Next.js) plutôt que côté client uniquement. Le middleware s'exécute en Edge, avant même que la page ne soit rendue.",
          tags: ["middleware.ts", "auth()", "redirect"],
        },
      ],
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-shield-halved'></i> Règles de sécurité à graver",
        body: "1) Ne jamais stocker un token sensible dans <code>localStorage</code> (XSS). 2) Toujours utiliser des cookies <code>httpOnly</code> + <code>Secure</code> + <code>SameSite=Lax</code>. 3) Les vérifications d'autorisation doivent <strong>toujours</strong> avoir lieu côté serveur : le client peut mentir.",
      },
    },
    {
      kind: "code",
      sample: {
        label: "NextAuth : page de connexion minimale",
        html: `<span class="cm">// app/auth/sign-in/page.tsx</span>
<span class="kw">import</span> { signIn } <span class="kw">from</span> <span class="str">"@/auth"</span>

<span class="kw">export default function</span> <span class="fn">SignIn</span>() {
  <span class="kw">return</span> (
    <span class="jsx">&lt;form</span>
      <span class="prop">action</span>={<span class="kw">async</span> (formData) =&gt; {
        <span class="str">"use server"</span>
        <span class="kw">await</span> <span class="fn">signIn</span>(<span class="str">"credentials"</span>, formData)
      }}
    <span class="jsx">&gt;</span>
      <span class="jsx">&lt;input</span> <span class="prop">name</span>=<span class="str">"email"</span> <span class="prop">type</span>=<span class="str">"email"</span> <span class="jsx">/&gt;</span>
      <span class="jsx">&lt;input</span> <span class="prop">name</span>=<span class="str">"password"</span> <span class="prop">type</span>=<span class="str">"password"</span> <span class="jsx">/&gt;</span>
      <span class="jsx">&lt;button&gt;</span>Connexion<span class="jsx">&lt;/button&gt;</span>
    <span class="jsx">&lt;/form&gt;</span>
  )
}`,
      },
    },
  ],
  quiz: ecosystemQuizzes.m24,
};
