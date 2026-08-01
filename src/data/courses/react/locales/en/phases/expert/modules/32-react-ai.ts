import type { Module } from "@/types";
import { expertQuizzes } from "../quizzes";
import { expertExercises } from "../exercises";

export const module32: Module = {
  id: "react-expert-m32",
  index: "32",
  title: "React & AI",
  subtitle: "Integrate LLMs, RAG, and AI features into a React app",
  duration: "2 weeks",
  content: [
    {
      kind: "paragraph",
      html: "Since 2023, AI has become a pillar of most new products. Knowing how to cleanly integrate an LLM into a React app — with <strong>good streaming</strong>, <strong>robust error handling</strong>, and <strong>thoughtful UX</strong> — is a skill that pays off enormously.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "32.1",
          title: "32.1: Vercel AI SDK",
          desc: "The reference tool for LLM interfaces in React/Next.js. <code>useChat</code> hook, automatic token streaming, Server Actions integration, adapters for OpenAI, Anthropic, Groq, Mistral…",
          tags: ["ai/react", "useChat", "streamText", "tool calling"],
        },
        {
          id: "32.2",
          title: "32.2: RAG — Retrieval-Augmented Generation",
          desc: "The pattern for making an LLM answer from <em>your data</em>. (1) split documents into chunks, (2) generate embeddings, (3) store in a vector DB (pgvector, Qdrant…), (4) at prompt time, retrieve relevant chunks and inject them into context.",
          tags: ["embeddings", "vector DB", "pgvector", "chunking"],
        },
        {
          id: "32.3",
          title: "32.3: AI interface UX",
          desc: "Key points: visible token streaming, clear status indicator (<em>thinking / tool call / done</em>), interrupt button, explicit handling of model errors (rate limit, refusal, hallucinations).",
          tags: ["streaming UX", "cancel", "retry", "guardrails"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Vercel AI SDK: streamed chat",
        html: `<span class="cm">// app/chat/page.tsx : client component</span>
<span class="str">"use client"</span>
<span class="kw">import</span> { useChat } <span class="kw">from</span> <span class="str">"ai/react"</span>

<span class="kw">export default function</span> <span class="fn">Chat</span>() {
  <span class="kw">const</span> { messages, input, handleInputChange, handleSubmit, isLoading } =
    <span class="fn">useChat</span>()

  <span class="kw">return</span> (
    <span class="jsx">&lt;&gt;</span>
      {messages.<span class="fn">map</span>(m =&gt; (
        <span class="jsx">&lt;div</span> <span class="prop">key</span>={m.id}<span class="jsx">&gt;</span>
          <span class="jsx">&lt;strong&gt;</span>{m.role}<span class="jsx">&lt;/strong&gt;</span>: {m.content}
        <span class="jsx">&lt;/div&gt;</span>
      ))}
      <span class="jsx">&lt;form</span> <span class="prop">onSubmit</span>={handleSubmit}<span class="jsx">&gt;</span>
        <span class="jsx">&lt;input</span> <span class="prop">value</span>={input} <span class="prop">onChange</span>={handleInputChange} <span class="jsx">/&gt;</span>
        <span class="jsx">&lt;button</span> <span class="prop">disabled</span>={isLoading}<span class="jsx">&gt;</span>Send<span class="jsx">&lt;/button&gt;</span>
      <span class="jsx">&lt;/form&gt;</span>
    <span class="jsx">&lt;/&gt;</span>
  )
}`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Classic trap: API keys",
        body: "<strong>Never</strong> call OpenAI/Anthropic directly from a Client Component with your API key. Any secret that reaches the browser is compromised within minutes. Always go through a Server Action or server-side API route that holds the key.",
      },
    },
  ],
  quiz: expertQuizzes.m32,
  exercises: [expertExercises.m32_1],
};
