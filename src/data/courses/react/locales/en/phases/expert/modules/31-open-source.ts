import type { Module } from "@/types";
import { expertQuizzes } from "../quizzes";

export const module31: Module = {
  id: "react-expert-m31",
  index: "31",
  title: "Open Source contribution",
  subtitle: "Publish an npm library, find your first contribution",
  duration: "1 week",
  content: [
    {
      kind: "paragraph",
      html: "Contributing to open source is one of the best career boosters. You learn to read code you did not write, communicate asynchronously, and build a portfolio visible worldwide.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "31.1",
          title: "31.1: Publish a typed npm library",
          desc: "Recommended stack in 2026: <strong>tsup</strong> (CJS + ESM + d.ts bundling) + <strong>changesets</strong> (semantic versioning + automated changelog) + local <strong>playground</strong> with Vite. Publish with provenance (<code>npm publish --provenance</code>) to sign the origin.",
          tags: ["tsup", "changesets", "exports field", "provenance"],
        },
        {
          id: "31.2",
          title: "31.2: Contribute to React / Next.js / Tailwind",
          desc: "Golden rules: (1) find a <code>good first issue</code>; (2) comment first to say you're taking it; (3) read CONTRIBUTING.md; (4) add a regression test; (5) open a small, well-titled PR.",
          tags: ["good first issue", "CONTRIBUTING.md", "DCO", "CI"],
        },
      ],
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-pen-ruler'></i> Writing exercise",
        body: "Pick a React library you use daily. Open its GitHub repo, read 3 open issues, and draft (for yourself) a small PR plan: <strong>problem → root cause → proposed fix → tests to write</strong>. That is the exercise that takes you from \"user\" to \"contributor\". No code to deliver — clarity of analysis is the product.",
      },
    },
    {
      kind: "code",
      sample: {
        label: "package.json for a modern library",
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
