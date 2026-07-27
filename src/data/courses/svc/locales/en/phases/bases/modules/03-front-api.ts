import type { Module } from "@/types";
import { basesQuizzes } from "../quizzes";
import { basesExercises } from "../exercises";

export const basesModule03: Module = {
  id: "svc-bases-m03",
  index: "03",
  title: "Front ↔ API",
  subtitle: "Understand the dialogue between interface and server",
  duration: "40 min",
  difficulty: "beginner",
  objectives: [
    "Consume a JSON API from the front end",
    "Handle HTTP errors and basic CORS",
    "Model loading / error / success states",
  ],
  content: [
    { kind: "title", text: "JSON: the common language" },
    {
      kind: "paragraph",
      html: "The front end and the server share neither language nor memory: they exchange <strong>structured text</strong>, almost always <strong>JSON</strong>. Objects in braces, arrays in brackets, strings, numbers, booleans, <code>null</code>: that is the whole vocabulary. In JavaScript, <code>response.json()</code> turns that text into a usable object, and <code>JSON.stringify()</code> does the reverse to send data.",
    },
    {
      kind: "code",
      sample: {
        label: "Une réponse d'API typique",
        html: `{
  <span class="str">"id"</span>: <span class="num">17</span>,
  <span class="str">"name"</span>: <span class="str">"Awa Diop"</span>,
  <span class="str">"email"</span>: <span class="str">"awa@example.com"</span>,
  <span class="str">"plan"</span>: <span class="str">"pro"</span>,
  <span class="str">"tags"</span>: [<span class="str">"beta"</span>, <span class="str">"newsletter"</span>],
  <span class="str">"deletedAt"</span>: <span class="kw">null</span>
}`,
      },
    },

    { kind: "title", text: "HTTP errors on the front end" },
    {
      kind: "paragraph",
      html: "An API call can fail in <strong>three different ways</strong>, and each is detected differently. 1) The server returns an error (<code>4xx</code>/<code>5xx</code>): <code>fetch</code> still « succeeds », you must test <code>response.ok</code>. 2) The network drops (no connection, DNS, timeout): then the promise <em>rejects</em>, hence <code>try/catch</code>. 3) The body is not the expected JSON: <code>response.json()</code> throws. Robust code covers all three. Rushed generated code often covers none.",
    },
    {
      kind: "code",
      sample: {
        label: "Les trois familles d'échec",
        html: `<span class="kw">try</span> {
  <span class="kw">const</span> response = <span class="kw">await</span> <span class="fn">fetch</span>(url);

  <span class="kw">if</span> (!response.<span class="prop">ok</span>) {
    <span class="cm">// ① le serveur a répondu, mais en erreur (404, 500…)</span>
    <span class="fn">showError</span>(<span class="str">\`Erreur \${response.status}\`</span>);
    <span class="kw">return</span>;
  }

  <span class="kw">const</span> data = <span class="kw">await</span> response.<span class="fn">json</span>(); <span class="cm">// ③ peut lever si corps invalide</span>
  <span class="fn">showData</span>(data);
} <span class="kw">catch</span> (error) {
  <span class="cm">// ② panne réseau, ou JSON invalide (③)</span>
  <span class="fn">showError</span>(<span class="str">"Impossible de joindre le serveur."</span>);
}`,
      },
    },

    { kind: "title", text: "CORS: why the browser blocks" },
    {
      kind: "paragraph",
      html: "Your front end runs on <code>localhost:5173</code>, the API on another domain. By default, the browser <strong>forbids</strong> a page from reading a response from another <em>origin</em> (domain + port + protocol): that is the <em>same-origin policy</em>, a fundamental protection. <strong>CORS</strong> is the mechanism by which the <em>server</em> declares « these origins may call me », via <code>Access-Control-Allow-*</code> headers. Remember the essentials: a CORS error is fixed <strong>on the server side</strong> (or via a proxy you control), never by hacking the request on the front end.",
    },
    {
      kind: "info",
      box: {
        variant: "concept",
        title: "<i class='fa-solid fa-shield-halved'></i> CORS is not your enemy",
        body: "When AI suggests « disabling CORS » with <code>Access-Control-Allow-Origin: *</code> on a private API, that is a red flag: it opens your API to the whole world to make an error disappear. The right answer is to list allowed origins explicitly.",
      },
    },

    { kind: "title", text: "Loading / error / success: the contract for every UI" },
    {
      kind: "paragraph",
      html: "Between the click and the response, time passes. An honest interface shows that time: <strong>loading</strong> (« working on it »), then <strong>success</strong> (the data) or <strong>error</strong> (an actionable message, not a frozen screen). These three states are not cosmetic detail: they are the first criterion on the Design checklist you will apply in phase 9, and the most common omission in generated code, which always assumes everything works on the first try.",
    },
    { kind: "highlight", html: "<i class='fa-solid fa-spinner'></i> <strong>Loading</strong>: visible as soon as the request starts, never a blank screen." },
    { kind: "highlight", html: "<i class='fa-solid fa-circle-xmark'></i> <strong>Error</strong>: a clear message + a way to try again." },
    { kind: "highlight", html: "<i class='fa-solid fa-circle-check'></i> <strong>Success</strong>: the data, and an « empty » state planned when the list has nothing." },
    {
      kind: "paragraph",
      html: "The exercise below has you implement this full contract against a real public API. It is exactly the skeleton you will find (generated then audited) in every network feature of the product you build from phase 4 onward.",
    },
  ],
  quiz: basesQuizzes.m03,
  exercises: [basesExercises.m03_1],
};
