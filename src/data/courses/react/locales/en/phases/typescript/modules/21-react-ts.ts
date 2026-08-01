import type { Module } from "@/types";
import { typescriptQuizzes } from "../quizzes";
import { typescriptExercises } from "../exercises";

export const module21: Module = {
  id: "react-typescript-m21",
  index: "21",
  title: "React + TypeScript",
  subtitle: "Typing components, props, state, events, hooks, and contexts",
  duration: "2 weeks",
  content: [
    {
      kind: "paragraph",
      html: "Typing a React application correctly <strong>multiplies productivity by 10</strong>: autocomplete becomes precise, refactors are safe, and errors show up in the editor before you even run the app. This module is the bridge between the previous chapters and real-world work.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "21.1",
          title: "21.1: Typing components and their props",
          desc: "2026 rule: <strong>forget <code>React.FC</code></strong>. Prefer `function Component(props: Props) {...}` for more predictable typing (especially for `children`). Remember to explicitly type components exposed as a library.",
          tags: ["Props", "children?: ReactNode", "avoid React.FC"],
        },
        {
          id: "21.2",
          title: "21.2: Typing useState, useReducer, useRef",
          desc: "Automatic inference when possible, explicit type otherwise (especially for an initial <code>null</code>). Type a reducer's action with a discriminated union.",
          tags: ["useState<T | null>", "Action discriminated union"],
        },
        {
          id: "21.3",
          title: "21.3: Typed DOM events",
          desc: "<code>ChangeEvent&lt;HTMLInputElement&gt;</code>, <code>FormEvent&lt;HTMLFormElement&gt;</code>, <code>MouseEvent&lt;HTMLButtonElement&gt;</code>. Learn to find them via autocomplete rather than memorizing them.",
          tags: ["ChangeEvent", "FormEvent", "MouseEvent"],
        },
        {
          id: "21.4",
          title: "21.4: Typing custom hooks and contexts",
          desc: "Expose a clear, self-documenting API. The classic pattern: a <code>Context</code> initially set to <code>null</code> plus a <code>useFoo()</code> hook that throws if used outside the provider, for a <strong>non-nullable</strong> return type in components.",
          tags: ["createContext", "custom hook", "non-null assertion"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Typed context + custom hook",
        html: `<span class="kw">type</span> <span class="ty">Theme</span> = <span class="str">"dark"</span> | <span class="str">"light"</span>

<span class="kw">type</span> <span class="ty">ThemeCtx</span> = { theme: <span class="ty">Theme</span>; toggle: () =&gt; <span class="ty">void</span> }

<span class="kw">const</span> <span class="fn">Ctx</span> = <span class="fn">createContext</span>&lt;<span class="ty">ThemeCtx</span> | <span class="kw">null</span>&gt;(<span class="kw">null</span>)

<span class="kw">export function</span> <span class="fn">useTheme</span>() {
  <span class="kw">const</span> ctx = <span class="fn">useContext</span>(<span class="fn">Ctx</span>)
  <span class="kw">if</span> (!ctx) <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">"useTheme must be used inside &lt;ThemeProvider&gt;"</span>)
  <span class="kw">return</span> ctx  <span class="cm">// ← type is ThemeCtx (non-null) here</span>
}`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Pitfall: `as` vs narrowing",
        body: "Resist the temptation to use <code>as SomeType</code> to silence the compiler. It's an <em>admission of defeat</em>: you assert a type without proving it. Always prefer a type guard, an <code>if</code> check, or a runtime <code>Zod.parse()</code> instead.",
      },
    },
  ],
  quiz: typescriptQuizzes.m21,
  exercises: [typescriptExercises.m21_1],
};
