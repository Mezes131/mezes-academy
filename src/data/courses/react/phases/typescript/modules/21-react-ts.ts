import type { Module } from "@/types";
import { typescriptQuizzes } from "../quizzes";
import { typescriptExercises } from "../exercises";

export const module21: Module = {
  id: "react-typescript-m21",
  index: "03",
  title: "React + TypeScript",
  subtitle: "Typer les composants, props, state, events, hooks et contexts",
  duration: "2 semaines",
  content: [
    {
      kind: "paragraph",
      html: "Typer correctement une application React, c'est <strong>multiplier par 10 la productivité</strong> : l'autocomplétion devient précise, les refactorings sont sûrs, les erreurs remontent dans l'éditeur avant même de lancer l'app. Ce module est le pont entre les chapitres précédents et la vie réelle.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "21.1",
          title: "21.1 : Typer les composants et leurs props",
          desc: "Règle 2026 : <strong>oublier <code>React.FC</code></strong>. Préférer `function Component(props: Props) {...}` pour un typage plus prévisible (notamment pour `children`). Penser à typer explicitement les composants exposés en librairie.",
          tags: ["Props", "children?: ReactNode", "éviter React.FC"],
        },
        {
          id: "21.2",
          title: "21.2 : Typer useState, useReducer, useRef",
          desc: "Inférence automatique quand c'est possible, type explicite sinon (notamment pour <code>null</code> initial). Typer l'action d'un reducer avec une discriminated union.",
          tags: ["useState<T | null>", "Action discriminated union"],
        },
        {
          id: "21.3",
          title: "21.3 : Événements DOM typés",
          desc: "<code>ChangeEvent&lt;HTMLInputElement&gt;</code>, <code>FormEvent&lt;HTMLFormElement&gt;</code>, <code>MouseEvent&lt;HTMLButtonElement&gt;</code>. Savoir les trouver à l'autocomplétion plutôt que de les apprendre par cœur.",
          tags: ["ChangeEvent", "FormEvent", "MouseEvent"],
        },
        {
          id: "21.4",
          title: "21.4 : Typer les custom hooks et les contexts",
          desc: "Exposer une API claire et auto-documentée. Le pattern classique : un <code>Context</code> initialement à <code>null</code> + un hook <code>useFoo()</code> qui lève si utilisé hors provider, pour un type de retour <strong>non-nullable</strong> dans les composants.",
          tags: ["createContext", "custom hook", "non-null assertion"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Context + custom hook typé",
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
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Piège : `as` vs narrowing",
        body: "Résiste à la tentation de <code>as SomeType</code> pour taire le compilateur. C'est un <em>aveu d'échec</em> : tu affirmes un type sans le prouver. Préfère toujours un type guard, une vérification <code>if</code> ou un <code>Zod.parse()</code> côté runtime.",
      },
    },
  ],
  quiz: typescriptQuizzes.m21,
  exercises: [typescriptExercises.m21_1],
};
