import type { Module } from "@/types";
import { coreQuizzes } from "../quizzes";
import { coreExercises } from "../exercises";

export const module11: Module = {
  id: "react-core-m06",
  index: "06",
  title: "Introduction to React & JSX",
  subtitle: "Understand why React exists and write your first components",
  duration: "1 week",
  openByDefault: true,
  content: [
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-route'></i> Prerequisites: This module assumes you know",
        body: "Basic HTML/CSS (tags, attributes), JavaScript ES6+ (arrow functions, destructuring, <code>const</code>/<code>let</code>, <code>import/export</code> modules). If any of these foundations feel shaky, revisit them before continuing: React amplifies JS gaps; it does not hide them.",
      },
    },
    { kind: "title", text: "Why React?" },
    {
      kind: "paragraph",
      html: "Before React, manually manipulating the DOM with jQuery or Vanilla JS quickly turned into spaghetti code as soon as the interface grew complex. React solves this with two brilliant ideas: <strong>composability</strong> (breaking the UI into small reusable pieces) and the <strong>Virtual DOM</strong> (React calculates the minimal changes to apply to the real DOM).",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-lightbulb'></i> Key concept: Virtual DOM",
        body: "<strong>Analogy:</strong> imagine an architect drawing a modification plan <em>before</em> sending workers to the job site. The Virtual DOM is that plan: React calculates the changes there, then sends only the strictly necessary instructions to the real DOM.<br/><br/>Technically, React keeps a lightweight copy of the DOM in memory. When state changes, it compares the old and new Virtual DOM (<strong>diffing</strong>), then applies only the differences to the real DOM (<strong>reconciliation</strong>).<br/><br/><strong>Common mistake:</strong> believing the Virtual DOM is <em>always</em> faster than direct manipulation. On very simple interfaces, React's overhead is unnecessary: it shines on complex, highly dynamic UIs.",
      },
    },
    {
      kind: "lessons",
      items: [
        {
          id: "11.1",
          title: "1.1: Create a React project with Vite",
          desc: "Vite is the recommended modern starter for React because it starts in milliseconds (native ESM dev server) and rebuilds very quickly. Typical workflow: <code>npm create vite@latest my-app -- --template react</code>, then <code>cd my-app</code>, <code>npm install</code>, <code>npm run dev</code>. The local server (often <code>http://localhost:5173</code>) supports <strong>HMR</strong>: when you edit a component, the UI updates without reloading the entire page.",
          tags: ["npm create vite@latest", "--template react", "npm run dev"],
        },
        {
          id: "11.2",
          title: "1.2: Structure of a React project",
          desc: "Three files structure the startup: <code>index.html</code> contains the root element (<code>&lt;div id=\"root\"&gt;</code>), <code>main.jsx</code> mounts React with <code>ReactDOM.createRoot(...).render(...)</code>, and <code>App.jsx</code> holds the first UI component. The <code>src/</code> folder hosts application code, <code>public/</code> static assets, and <code>package.json</code> scripts and dependencies. Understanding this flow helps you know <em>where</em> to plug in routing, providers (auth/theme), global styles, and global state.",
          tags: ["src/", "main.jsx", "App.jsx", "public/"],
        },
        {
          id: "11.3",
          title: "1.3: JSX: JavaScript + HTML combined",
          desc: "JSX is a declarative syntax that looks like HTML but compiles to JavaScript calls (<code>React.createElement</code>). You can inject expressions with <code>{...}</code>, call functions, format data, and compose multiple components. Key rules: use <code>className</code> (not <code>class</code>), <code>htmlFor</code> (not <code>for</code>), camelCase props (<code>onClick</code>, <code>tabIndex</code>), and return a single parent (or a fragment <code>&lt;&gt;...&lt;/&gt;</code>).",
          tags: ["className", "htmlFor", "camelCase events", "{expressions}"],
        },
        {
          id: "11.4",
          title: "1.4: Conditional rendering & lists",
          desc: "Conditional rendering uses JS expressions: <code>condition && &lt;Block /&gt;</code> to show only when true, or a ternary <code>condition ? A : B</code> to choose between two branches. For lists, iterate over an array with <code>.map()</code> and return one component per item. Each element needs a stable, unique <code>key</code> (preferably a business id) so React correctly identifies elements between renders and avoids visual/perf bugs (lost focus, inconsistent order, unnecessary re-renders).",
          tags: ["&&", "ternary ?:", ".map()", "key prop"],
        },
      ],
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-clipboard-check'></i> Checkpoint: Lessons 11.1 & 11.2",
        body: "<strong>Q1:</strong> Why is Vite preferred over Create React App?<br/><em>→ Vite uses the browser's native ESM modules: the server starts instantly and only bundles modified modules. CRA bundles the entire project before serving, which slows down as the codebase grows.</em><br/><br/><strong>Q2:</strong> In which file do we mount React on the DOM, and with which method?<br/><em>→ In <code>main.jsx</code>, via <code>ReactDOM.createRoot(document.getElementById('root')).render(&lt;App /&gt;)</code>.</em>",
      },
    },
    {
      kind: "code",
      sample: {
        label: "JSX: imperative vs declarative",
        html: `<span class="cm">// ❌ BEFORE React: imperative DOM (Vanilla JS)</span>
<span class="kw">const</span> div = document.<span class="fn">createElement</span>(<span class="str">'div'</span>)
div.className = <span class="str">'card'</span>
div.innerHTML = <span class="str">\`&lt;h1&gt;Hello Ada!&lt;/h1&gt;&lt;p&gt;2 + 2 = 4&lt;/p&gt;\`</span>
document.body.<span class="fn">appendChild</span>(div) <span class="cm">// we describe HOW to do it</span>

<span class="cm">// ✅ AFTER React: declarative JSX</span>
<span class="kw">const</span> <span class="fn">Greeting</span> = () => {
  <span class="kw">const</span> firstName = <span class="str">"Ada"</span>
  <span class="kw">return</span> (
    <span class="jsx">&lt;div</span> <span class="prop">className</span>=<span class="str">"card"</span><span class="jsx">&gt;</span>           <span class="cm">{/* className, never class */}</span>
      <span class="jsx">&lt;h1&gt;</span>Hello, {firstName}!<span class="jsx">&lt;/h1&gt;</span>   <span class="cm">{/* JS expression inside {} */}</span>
      <span class="jsx">&lt;p&gt;</span>2 + 2 = {2 + 2}<span class="jsx">&lt;/p&gt;</span>        <span class="cm">{/* expression evaluated at render time */}</span>
      {firstName === <span class="str">"Ada"</span> &amp;&amp; <span class="jsx">&lt;span&gt;</span>Code legend<span class="jsx">&lt;/span&gt;</span>}
    <span class="jsx">&lt;/div&gt;</span>
  ) <span class="cm">// we describe WHAT WE WANT, React handles the rest</span>
}`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-code'></i> Key concept: What JSX really becomes",
        body: "JSX is not magic: Babel/Vite transforms it into <code>React.createElement()</code> before it reaches the browser.<br/><br/><code>&lt;h1 className=\"title\"&gt;Hello&lt;/h1&gt;</code><br/>becomes:<br/><code>React.createElement('h1', { className: 'title' }, 'Hello')</code><br/><br/>Understanding this transformation helps you decode JSX compilation errors and know why <code>if</code> or <code>for</code> cannot be used <em>directly</em> in JSX: they are <strong>statements</strong>, not <strong>expressions</strong> that return a value.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Most common JSX pitfalls",
        body: "<strong>1. <code>class</code> → <code>className</code>:</strong> <code>class</code> is a reserved JavaScript keyword. Using it in JSX causes an error (or a silent warning depending on the version).<br/><strong>2. All tags must be closed:</strong> <code>&lt;img /&gt;</code>, <code>&lt;br /&gt;</code>, <code>&lt;input /&gt;</code>: JSX follows strict XML rules, unlike browser HTML.<br/><strong>3. Single root element:</strong> a component can return only one root node. Use <code>&lt;&gt;...&lt;/&gt;</code> (Fragment) to avoid an unnecessary <code>&lt;div&gt;</code> in the DOM.<br/><strong>4. <code>false</code>, <code>null</code>, <code>undefined</code> render nothing:</strong> this is intentional, and it is what makes <code>{condition &amp;&amp; &lt;El/&gt;}</code> safe.",
      },
    },
    {
      kind: "code",
      sample: {
        label: "Anti-pattern: key={index} on a dynamic list",
        html: `<span class="cm">// ❌ Anti-pattern: array index as key</span>
items.<span class="fn">map</span>((name, <span class="prop">index</span>) =>
  <span class="jsx">&lt;li</span> <span class="prop">key</span>={index}<span class="jsx">&gt;</span>{name}<span class="jsx">&lt;/li&gt;</span>
  <span class="cm">// ⚠ If the list is sorted, React reuses the wrong</span>
  <span class="cm">// DOM nodes → misaligned inputs, jumping state</span>
)

<span class="cm">// ✅ Best practice: stable business identifier</span>
users.<span class="fn">map</span>(user =>
  <span class="jsx">&lt;li</span> <span class="prop">key</span>={user.id}<span class="jsx">&gt;</span>{user.name}<span class="jsx">&lt;/li&gt;</span>
  <span class="cm">// ✅ The id stays the same even if order changes</span>
)`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-skull-crossbones'></i> Silent bug: key={index} on a dynamic list",
        body: "Using the index as <code>key</code> works <em>only</em> if the list is static and never changes order. As soon as you <strong>add, remove, or sort</strong> items, React reuses the wrong DOM nodes: you get <strong>inputs whose content no longer matches the data</strong>, animations on the wrong element, or state that \"jumps\" from one item to another. This bug is often silent: no console error, just inexplicable behavior. Absolute rule: always use a stable business <code>id</code>.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-clipboard-check'></i> Checkpoint: Lessons 11.3 & 11.4",
        body: "<strong>Q1:</strong> Why do we write <code>className</code> instead of <code>class</code> in JSX?<br/><em>→ <code>class</code> is a reserved JavaScript keyword (ES6 class syntax). JSX compiles to plain JS, so <code>className</code> is required to avoid the syntax conflict.</em><br/><br/><strong>Q2:</strong> What is the practical difference between <code>{condition &amp;&amp; &lt;El/&gt;}</code> and <code>{condition ? &lt;A/&gt; : &lt;B/&gt;}</code>?<br/><em>→ The first renders <strong>nothing</strong> when the condition is false (show/hide). The second always picks between two alternatives: if <code>condition</code> is <code>false</code>, it renders <code>&lt;B/&gt;</code>.</em>",
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-circle-check'></i> Best practice",
        body: "Install <strong>React Developer Tools</strong> in your browser (Chrome/Firefox). It is the #1 tool for debugging your components, inspecting props, and viewing state in real time.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-diagram-project'></i> Up next: core phase roadmap",
        body: "<strong>Prerequisites used in this module:</strong> arrow functions, destructuring, ES6 modules: you will reuse them throughout the path below.<br/><br/><strong>Core program next steps:</strong><br/>→ <strong>01</strong> <code>components-props</code>: reusable components, <em>props</em>, parent → child communication<br/>→ <strong>02</strong> <code>use-state</code>: local state and interactivity with <code>useState</code><br/>→ <strong>03</strong> <code>use-effect</code>: side effects, async data, lifecycle<br/>→ <strong>04</strong> <code>advanced-hooks</code>: advanced hooks and common patterns<br/>→ <strong>05</strong> <code>react-router</code>: navigation, routes, and pages<br/>→ <strong>06</strong> <code>forms</code>: controlled forms, validation, and UX<br/>→ <strong>07</strong> <code>styling</code>: styles, themes, and visual consistency<br/><br/><strong>Ecosystem:</strong> the basics covered here (JSX, fragments, <code>key</code>) remain the foundation of every React project: Next.js, Remix, animations (Framer Motion), virtualized lists (react-window), etc.",
      },
    },
  ],
  quiz: coreQuizzes.m11,
  exercises: [coreExercises.m11_1],
};
