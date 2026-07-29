import type { Module } from "@/types";
import { basesQuizzes } from "../quizzes";

export const basesModule01: Module = {
  id: "svc-bases-m01",
  index: "01",
  title: "HTTP, HTML, useful JS",
  subtitle: "The bare minimum to understand what AI generates",
  duration: "30 min",
  difficulty: "intro",
  openByDefault: true,
  objectives: [
    "Read an HTTP request/response exchange",
    "Recognize minimal semantic HTML",
    "Understand fetch and async in modern JavaScript",
  ],
  content: [
    { kind: "title", text: "Why this module exists" },
    {
      kind: "paragraph",
      html: "In this course you will <strong>have AI generate code, then verify it</strong>. You cannot verify what you cannot read. This module does not turn you into a front-end developer. It gives you three essential readings (the HTTP dialogue, HTML structure, and async JavaScript) so you understand what AI produces and spot when it gets things wrong.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-forward'></i> Already know all this?",
        body: "Phase 0 is <strong>optional</strong>. If HTTP requests, semantic tags, and <code>async/await</code> are familiar, jump straight to phase 1: nothing on the core path depends on this.",
      },
    },

    { kind: "title", text: "HTTP: the request → response cycle" },
    {
      kind: "paragraph",
      html: "The whole web rests on a simple dialogue. Your browser (the <em>client</em>) sends a <strong>request</strong>: a method (<code>GET</code>, <code>POST</code>…), a URL, <em>headers</em> (metadata), and sometimes a body. The <em>server</em> sends back a <strong>response</strong>: a <strong>status code</strong>, headers, and a body (HTML, JSON, image…). That is it. Every page load, every « Pay » click, every like is a variation of this exchange.",
    },
    {
      kind: "code",
      sample: {
        label: "Un échange HTTP, à plat",
        html: `<span class="cm">// Requête envoyée par le navigateur</span>
<span class="kw">GET</span> /api/products/42 <span class="ty">HTTP/1.1</span>
<span class="prop">Host:</span> boutique.example
<span class="prop">Accept:</span> application/json

<span class="cm">// Réponse du serveur</span>
<span class="ty">HTTP/1.1</span> <span class="num">200</span> <span class="fn">OK</span>
<span class="prop">Content-Type:</span> application/json

{ <span class="str">"id"</span>: <span class="num">42</span>, <span class="str">"name"</span>: <span class="str">"Clavier mécanique"</span>, <span class="str">"price"</span>: <span class="num">89</span> }`,
      },
    },
    {
      kind: "paragraph",
      html: "Status codes group by family: <strong>2xx</strong> = success, <strong>3xx</strong> = redirect, <strong>4xx</strong> = client-side error (<code>404</code> not found, <code>401</code> not signed in, <code>403</code> forbidden), <strong>5xx</strong> = server-side error. This reading habit will serve you on every audit: an API that returns <code>200</code> with an error message in the body is already a defect to flag.",
    },
    { kind: "highlight", html: "<i class='fa-solid fa-magnifying-glass'></i> <strong>DevTools habit</strong>: open the Network tab (F12), reload a page, and inspect each request: method, status, headers, body. That is your X-ray of the web." },

    { kind: "title", text: "Semantic HTML: structure that means something" },
    {
      kind: "paragraph",
      html: "HTML describes the <em>nature</em> of content, not its appearance. A title is an <code>&lt;h1&gt;</code>, navigation is a <code>&lt;nav&gt;</code>, an action is a <code>&lt;button&gt;</code>. AI sometimes generates whole pages of clickable <code>&lt;div&gt;</code> elements: it <em>looks</em> like an interface, but it is invisible to keyboard users and screen readers, and search engines penalize it.",
    },
    {
      kind: "code",
      sample: {
        label: "Le squelette sémantique minimal",
        html: `<span class="jsx">&lt;<span class="ty">header</span>&gt;</span>
  <span class="jsx">&lt;<span class="ty">nav</span>&gt;</span>…liens principaux…<span class="jsx">&lt;/<span class="ty">nav</span>&gt;</span>
<span class="jsx">&lt;/<span class="ty">header</span>&gt;</span>
<span class="jsx">&lt;<span class="ty">main</span>&gt;</span>
  <span class="jsx">&lt;<span class="ty">h1</span>&gt;</span>Un seul h1 par page<span class="jsx">&lt;/<span class="ty">h1</span>&gt;</span>
  <span class="jsx">&lt;<span class="ty">form</span>&gt;</span>
    <span class="jsx">&lt;<span class="ty">label</span> <span class="prop">for</span>=<span class="str">"email"</span>&gt;</span>Email<span class="jsx">&lt;/<span class="ty">label</span>&gt;</span>
    <span class="jsx">&lt;<span class="ty">input</span> <span class="prop">id</span>=<span class="str">"email"</span> <span class="prop">type</span>=<span class="str">"email"</span> /&gt;</span>
    <span class="jsx">&lt;<span class="ty">button</span>&gt;</span>Envoyer<span class="jsx">&lt;/<span class="ty">button</span>&gt;</span>
  <span class="jsx">&lt;/<span class="ty">form</span>&gt;</span>
<span class="jsx">&lt;/<span class="ty">main</span>&gt;</span>
<span class="jsx">&lt;<span class="ty">footer</span>&gt;</span>…mentions…<span class="jsx">&lt;/<span class="ty">footer</span>&gt;</span>`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> The classic generated-code trap",
        body: "<code>&lt;div onclick=...&gt;</code> instead of <code>&lt;button&gt;</code>, inputs without <code>&lt;label&gt;</code>, five <code>&lt;h1&gt;</code> tags per page. From the Audit phase onward, you will learn to spot and fix these defects systematically.",
      },
    },

    { kind: "title", text: "Useful JavaScript: fetch and async" },
    {
      kind: "paragraph",
      html: "The modern JavaScript you will see most in generated code comes down to three ideas: <code>fetch</code> to call an API, <strong>promises</strong> to represent « a result that will arrive later », and <code>async/await</code> to write async code as if it were linear.",
    },
    {
      kind: "code",
      sample: {
        label: "Appeler une API, la version correcte",
        html: `<span class="kw">async function</span> <span class="fn">loadProduct</span>() {
  <span class="kw">const</span> response = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">"/api/products/42"</span>);
  <span class="kw">if</span> (!response.<span class="prop">ok</span>) {
    <span class="cm">// fetch ne rejette PAS sur un 404/500 : à vérifier soi-même</span>
    <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">\`HTTP \${response.status}\`</span>);
  }
  <span class="kw">const</span> product = <span class="kw">await</span> response.<span class="fn">json</span>();
  <span class="kw">return</span> product;
}`,
      },
    },
    {
      kind: "paragraph",
      html: "Remember the main trap: <strong><code>fetch</code> only rejects its promise on a network failure</strong>. A server that responds with <code>500</code> is, from <code>fetch</code>'s point of view, a « successful » request. AI-generated code very often forgets the <code>response.ok</code> check. You just learned your first audit check.",
    },

    { kind: "title", text: "Your turn: dissect a network flow" },
    {
      kind: "paragraph",
      html: "Hands-on exercise (outside the editor): open DevTools (F12) → <strong>Network</strong> tab on a site you use. Reload the page, pick a request to an API (type <code>fetch/XHR</code>), and note: the method, the URL, the status code, two response headers, and the shape of the body. Then explain in three sentences what this request does for the user. This guided dissection is exactly the move you will repeat in the security audit, phase 8.",
    },
  ],
  quiz: basesQuizzes.m01,
};
