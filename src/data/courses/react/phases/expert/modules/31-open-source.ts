import type { Module } from "@/types";
import { expertQuizzes } from "../quizzes";

export const module31: Module = {
  id: "react-expert-m31",
  index: "M31",
  title: "Contribution Open Source",
  subtitle: "Publier une librairie npm, trouver sa première contribution",
  duration: "1 semaine",
  content: [
    {
      kind: "paragraph",
      html: "Contribuer à l'open source est l'un des meilleurs boosters de carrière. On apprend à lire du code que l'on n'a pas écrit, à communiquer de façon asynchrone, et on se construit un portefolio visible mondialement.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "31.1",
          title: "31.1 : Publier une librairie npm typée",
          desc: "Stack recommandée en 2026 : <strong>tsup</strong> (bundling CJS + ESM + d.ts) + <strong>changesets</strong> (versioning sémantique + changelog automatisé) + <strong>playground</strong> local avec Vite. Publication avec provenance (<code>npm publish --provenance</code>) pour signer l'origine.",
          tags: ["tsup", "changesets", "exports field", "provenance"],
        },
        {
          id: "31.2",
          title: "31.2 : Contribuer à React / Next.js / Tailwind",
          desc: "Règles d'or : (1) trouver une issue <code>good first issue</code> ; (2) commenter d'abord pour signaler qu'on s'en charge ; (3) lire les CONTRIBUTING.md ; (4) ajouter un test de régression ; (5) faire une PR petite et bien titrée.",
          tags: ["good first issue", "CONTRIBUTING.md", "DCO", "CI"],
        },
      ],
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-pen-ruler'></i> Exercice de rédaction",
        body: "Choisis une librairie React que tu utilises au quotidien. Ouvre son dépôt GitHub, lis 3 issues ouvertes, et rédige (pour toi) un petit plan de PR : <strong>problème → cause racine → solution proposée → tests à écrire</strong>. C'est l'exercice qui te fait passer de \"user\" à \"contributeur\". Aucune ligne de code à livrer : la clarté d'analyse est le produit.",
      },
    },
    {
      kind: "code",
      sample: {
        label: "package.json pour une lib moderne",
        html: `{
  <span class="str">"name"</span>: <span class="str">"@acme/react-kit"</span>,
  <span class="str">"version"</span>: <span class="str">"0.0.0"</span>,
  <span class="str">"type"</span>: <span class="str">"module"</span>,
  <span class="str">"files"</span>: [<span class="str">"dist"</span>],
  <span class="str">"exports"</span>: {
    <span class="str">"."</span>: {
      <span class="str">"types"</span>: <span class="str">"./dist/index.d.ts"</span>,
      <span class="str">"import"</span>: <span class="str">"./dist/index.js"</span>,
      <span class="str">"require"</span>: <span class="str">"./dist/index.cjs"</span>
    }
  },
  <span class="str">"peerDependencies"</span>: { <span class="str">"react"</span>: <span class="str">">=18"</span> },
  <span class="str">"scripts"</span>: {
    <span class="str">"build"</span>: <span class="str">"tsup src/index.ts --format esm,cjs --dts"</span>,
    <span class="str">"release"</span>: <span class="str">"changeset publish"</span>
  }
}`,
      },
    },
  ],
  quiz: expertQuizzes.m31,
};
