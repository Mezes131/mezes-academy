import type { Module } from "@/types";
import { introQuizzes } from "../quizzes";
import { introExercises } from "../exercises";

export const module03: Module = {
  id: "react-intro-m03",
  index: "03",
  title: "The 3 fundamental ideas of React",
  subtitle: "If you remember only one thing from this intro, remember these three concepts",
  duration: "5 min",
  content: [
    {
      kind: "paragraph",
      html: "All of React's magic rests on three pillars. Everything else: hooks, state, props, effects: is just a set of <em>tools</em> to put those three ideas into practice.",
    },
    { kind: "title", text: "1. Components: divide and conquer" },
    {
      kind: "paragraph",
      html: "A component is a <strong>reusable piece of UI</strong>, wrapped in a JavaScript function. A button, a navbar, a page: everything is a component. Like LEGO bricks, components nest to form complex interfaces from simple pieces.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-circle-check'></i> The promise of components",
        body: "You write a <code>Button</code> component once and reuse it in 50 places. The day you change its design, <strong>every button updates automatically</strong>. No more copy-paste.",
      },
    },
    { kind: "title", text: "2. State: interfaces that live" },
    {
      kind: "paragraph",
      html: "As soon as you need to react to an action (a click, a keystroke, a network request), you need <strong>memory</strong> to track what changes: <em>state</em>. When state changes, React automatically re-draws the affected parts.",
    },
    { kind: "highlight", html: "<i class='fa-solid fa-computer-mouse'></i> The user clicks « Like » → the <code>likes</code> state goes from 3 to 4" },
    { kind: "highlight", html: "<i class='fa-solid fa-bolt'></i> React detects the change → recalculates the affected part" },
    { kind: "highlight", html: "<i class='fa-solid fa-palette'></i> The browser shows « 4 likes »: you didn't have to do anything" },
    { kind: "title", text: "3. The Virtual DOM: performance through cleverness" },
    {
      kind: "paragraph",
      html: "Updating the DOM is slow. React keeps a <strong>lightweight copy of the DOM</strong> in memory (the Virtual DOM). On every change, it compares the old and new versions, then applies to the real DOM <em>only</em> the differences.",
    },
    {
      kind: "code",
      sample: {
        label: "A minimal React component",
        html: `<span class="cm">// This is the simplest React component.</span>

<span class="kw">function</span> <span class="fn">Counter</span>() {
  <span class="kw">const</span> [count, setCount] = <span class="fn">useState</span>(<span class="num">0</span>)  <span class="cm">// ← state</span>

  <span class="kw">return</span> (
    <span class="jsx">&lt;div&gt;</span>
      <span class="jsx">&lt;p&gt;</span>You clicked {count} times<span class="jsx">&lt;/p&gt;</span>
      <span class="jsx">&lt;button</span> <span class="prop">onClick</span>={() =&gt; <span class="fn">setCount</span>(count + <span class="num">1</span>)}<span class="jsx">&gt;</span>
        Click
      <span class="jsx">&lt;/button&gt;</span>
    <span class="jsx">&lt;/div&gt;</span>
  )
}`,
      },
    },
  ],
  quiz: introQuizzes.m03,
  exercises: [introExercises.m03_1],
};
