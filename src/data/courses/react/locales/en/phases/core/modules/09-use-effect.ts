import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";

export const module14: Module = {
  id: "react-core-m09",
  index: "09",
  title: "useEffect & lifecycle",
  subtitle: "Sync your component with the outside world",
  duration: "1 week",
  content: [
    {
      kind: "paragraph",
      html: "<code>useEffect</code> lets you run side effects (API calls, subscriptions, DOM work) after React has painted the component. Understanding the dependency array is essential to avoid bugs and infinite loops.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "14.1",
          title: "4.1: The structure of useEffect",
          desc: "3 behaviors depending on the dependency array: no array (every render), <code>[]</code> (mount only), <code>[dep]</code> (when the dependency changes).",
          tags: ["useEffect", "deps array", "[]", "[dep1, dep2]"],
        },
        {
          id: "14.2",
          title: "4.2: Fetching data",
          desc: "Standard pattern for loading API data on mount, with loading and error handling.",
        },
        {
          id: "14.3",
          title: "4.3: The cleanup function",
          desc: "Essential to avoid memory leaks. Cleans up subscriptions, timers, and requests when the component unmounts.",
          tags: ["return () =>", "AbortController", "clearTimeout"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "useEffect: fetch with cleanup",
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

  <span class="kw">if</span> (loading) <span class="kw">return</span> <span class="jsx">&lt;p&gt;</span>Loading...<span class="jsx">&lt;/p&gt;</span>
  <span class="kw">return</span> <span class="jsx">&lt;h2&gt;</span>{user?.name}<span class="jsx">&lt;/h2&gt;</span>
}`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Classic trap: infinite loop",
        body: "If you put an object or array in the dependency array and recreate it every render, useEffect loops forever. Use <code>useMemo</code> or <code>useCallback</code> to stabilize references.",
      },
    },
  ],
  quiz: coreQuizzes.m14,
};
