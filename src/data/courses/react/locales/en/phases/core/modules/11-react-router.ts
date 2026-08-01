import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";

export const module16: Module = {
  id: "react-core-m11",
  index: "11",
  title: "React Router v6",
  subtitle: "Multi-page navigation, dynamic routes, and protected routes",
  duration: "1 week",
  content: [
    {
      kind: "lessons",
      items: [
        {
          id: "16.1",
          title: "6.1: Setup and basic structure",
          desc: "BrowserRouter, Routes, Route. How React Router intercepts navigation without a full page reload (SPA).",
          tags: ["BrowserRouter", "Routes", "Route", "Link", "NavLink"],
        },
        {
          id: "16.2",
          title: "6.2: Dynamic routes & params",
          desc: "Create routes with params (<code>/users/:id</code>) and read them with useParams. useSearchParams for query strings.",
          tags: ["useParams", "useSearchParams", "useLocation"],
        },
        {
          id: "16.3",
          title: "6.3: Protected routes (auth)",
          desc: "Redirect an unauthenticated user to the login page. Fundamental pattern for apps with authentication.",
          tags: ["Navigate", "useNavigate", "Outlet"],
        },
        {
          id: "16.4",
          title: "6.4: Lazy-loading routes",
          desc: "Load pages on demand with <code>React.lazy</code> and <code>Suspense</code>.",
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Routes with lazy loading",
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

    { kind: "title", text: "Common trap: internal state that « leaks » between routes" },
    {
      kind: "paragraph",
      html: "When React Router goes from <code>/users/1</code> to <code>/users/2</code>, it <strong>does not unmount</strong> the <code>&lt;Profile&gt;</code> component — it only changes its <code>useParams</code>. Result: all internal state (form in progress, previous <code>fetch</code> data, active tab…) stays as-is. One of the most common bugs for beginners — and experienced devs too.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Concrete symptom",
        body: "You submit a quiz on /module/m11. You navigate to /module/m12: the quiz already looks submitted with the old answers. You fill a form on /users/42: going to /users/43 keeps the previous data.",
      },
    },
    {
      kind: "paragraph",
      html: "The idiomatic fix: pass a <strong><code>key</code> prop</strong> that depends on the resource id. When the key changes, React fully unmounts the old subtree and mounts a new one → every <code>useState</code>/<code>useRef</code> resets cleanly.",
    },
    {
      kind: "code",
      sample: {
        label: "Router pattern: key on the resource id",
        html: `<span class="cm">// ❌ Anti-pattern: internal state survives between /users/1 and /users/2</span>
<span class="kw">function</span> <span class="fn">UsersPage</span>() {
  <span class="kw">const</span> { id } = <span class="fn">useParams</span>()
  <span class="kw">return</span> <span class="jsx">&lt;Profile</span> <span class="prop">userId</span>={id} <span class="jsx">/&gt;</span>
}

<span class="cm">// ✅ Correct: \`key\` forces a full remount when the id changes</span>
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
        title: "<i class='fa-solid fa-circle-check'></i> Mnemonic rule",
        body: "If a <strong>stateful</strong> component depends on an id passed as a prop (or read via <code>useParams</code>), put a <code>key</code> on it. That is almost always what you want: clear isolation, zero state leak, zero « reset » <code>useEffect</code>.",
      },
    },
  ],
  quiz: coreQuizzes.m16,
};
