import type { Module } from "@/types";
import { ecosystemQuizzes } from "../quizzes";

export const module24: Module = {
  id: "react-ecosystem-m24",
  index: "24",
  title: "Authentication",
  subtitle: "NextAuth / Auth.js, sessions, JWT, OAuth",
  duration: "1 week",
  content: [
    {
      kind: "paragraph",
      html: "Authentication is not something you improvise: security mistakes are costly. The modern React ecosystem relies on solid building blocks (Auth.js, Clerk, Lucia…) rather than reinventing everything.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "24.1",
          title: "24.1: Modern auth models",
          desc: "Server session (cookie + sessions table in DB) vs stateless JWT (self-contained token). Trade-offs: revocability vs scalability. OAuth 2.0 / OpenID Connect to delegate (« Sign in with Google »).",
          tags: ["session", "JWT", "OAuth 2.0", "OIDC"],
        },
        {
          id: "24.2",
          title: "24.2: NextAuth.js (Auth.js)",
          desc: "The most popular integrated solution for Next.js. Ready-made OAuth providers, session management, customizable callbacks, DB integration via Prisma.",
          tags: ["providers", "callbacks", "adapter"],
        },
        {
          id: "24.3",
          title: "24.3: Protected routes & middleware",
          desc: "Verify authentication on the server (Next.js middleware) rather than on the client only. Middleware runs on the Edge, before the page is even rendered.",
          tags: ["middleware.ts", "auth()", "redirect"],
        },
      ],
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-shield-halved'></i> Security rules to memorize",
        body: "1) Never store a sensitive token in <code>localStorage</code> (XSS). 2) Always use <code>httpOnly</code> + <code>Secure</code> + <code>SameSite=Lax</code> cookies. 3) Authorization checks must <strong>always</strong> happen on the server: the client can lie.",
      },
    },
    {
      kind: "code",
      sample: {
        label: "NextAuth: minimal sign-in page",
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
      <span class="jsx">&lt;button&gt;</span>Sign in<span class="jsx">&lt;/button&gt;</span>
    <span class="jsx">&lt;/form&gt;</span>
  )
}`,
      },
    },
  ],
  quiz: ecosystemQuizzes.m24,
};
