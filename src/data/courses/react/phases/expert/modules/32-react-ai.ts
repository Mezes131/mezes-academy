import type { Module } from "@/types";
import { expertQuizzes } from "../quizzes";
import { expertExercises } from "../exercises";

export const module32: Module = {
  id: "react-expert-m32",
  index: "05",
  title: "React & IA",
  subtitle: "Intégrer LLM, RAG et fonctionnalités IA dans une app React",
  duration: "2 semaines",
  content: [
    {
      kind: "paragraph",
      html: "Depuis 2023, l'IA est devenue un pilier de la plupart des nouveaux produits. Savoir intégrer proprement un LLM dans une app React, avec un <strong>bon streaming</strong>, une <strong>gestion d'erreur robuste</strong> et une <strong>UX pensée</strong>, est une compétence qui se valorise énormément.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "32.1",
          title: "32.1 : Vercel AI SDK",
          desc: "L'outil de référence pour les interfaces LLM en React/Next.js. Hook <code>useChat</code>, streaming automatique des tokens, intégration Server Actions, adapters pour OpenAI, Anthropic, Groq, Mistral…",
          tags: ["ai/react", "useChat", "streamText", "tool calling"],
        },
        {
          id: "32.2",
          title: "32.2 : RAG : Retrieval-Augmented Generation",
          desc: "Le pattern pour faire répondre un LLM à partir de <em>vos données</em>. (1) découper les documents en chunks, (2) générer des embeddings, (3) stocker dans une vector DB (pgvector, Qdrant…), (4) au moment du prompt, retrouver les chunks pertinents et les injecter dans le contexte.",
          tags: ["embeddings", "vector DB", "pgvector", "chunking"],
        },
        {
          id: "32.3",
          title: "32.3 : UX des interfaces IA",
          desc: "Points clés : streaming visible des tokens, indicateur clair de statut (<em>thinking / tool call / done</em>), bouton d'interruption, gestion explicite des erreurs de modèle (rate limit, refus, hallucinations).",
          tags: ["streaming UX", "cancel", "retry", "guardrails"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Vercel AI SDK : chat streamé",
        html: `<span class="cm">// app/chat/page.tsx — client component</span>
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
        <span class="jsx">&lt;button</span> <span class="prop">disabled</span>={isLoading}<span class="jsx">&gt;</span>Envoyer<span class="jsx">&lt;/button&gt;</span>
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
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Piège classique : les clés API",
        body: "<strong>Jamais</strong> d'appel direct à OpenAI/Anthropic depuis un Client Component avec ta clé API. Toute clé secrète qui part côté navigateur est compromise en 5 minutes. Passe toujours par une Server Action ou une route API côté serveur qui détient la clé.",
      },
    },
  ],
  quiz: expertQuizzes.m32,
  exercises: [expertExercises.m32_1],
};
