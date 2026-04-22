import type { Module } from "@/types";
import { expertQuizzes } from "../quizzes";

export const module29: Module = {
  id: "react-expert-m29",
  index: "M29",
  title: "DevOps & CI/CD",
  subtitle: "GitHub Actions, Docker, déploiements",
  duration: "1.5 semaines",
  content: [
    {
      kind: "paragraph",
      html: "Un développeur senior en 2026 ne se contente plus d'écrire du code : il sait le livrer en production. <strong>Lint, test, build, deploy automatisés</strong> sur chaque PR : c'est le strict minimum d'une équipe sérieuse.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "29.1",
          title: "29.1 : GitHub Actions pour un projet React",
          desc: "Pipeline type : <code>checkout → setup node + cache → install → lint → typecheck → test → build</code>. Ajouter un job de déploiement sur la branche principale. Séparer preview / prod.",
          tags: ["actions/checkout", "pnpm/action-setup", "matrix"],
        },
        {
          id: "29.2",
          title: "29.2 : Docker pour les apps Next.js",
          desc: "Dockerfile multi-stage optimisé : une image <em>builder</em> avec les devDependencies, une image <em>runtime</em> minimale (<code>node:alpine</code> ou <code>distroless</code>). Taille finale typique < 200 Mo.",
          tags: ["multi-stage", "standalone output", "distroless"],
        },
        {
          id: "29.3",
          title: "29.3 : Déploiement : Vercel, Fly.io, self-hosted",
          desc: "Vercel : DX extraordinaire, preview deployments gratuits, mais vendor lock-in et coûts à grande échelle. Fly.io : édition auto-hébergée avec un bon DX. Self-hosted : flexibilité mais ops à porter.",
          tags: ["Vercel", "Fly.io", "Kubernetes", "edge runtime"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "GitHub Actions : pipeline type",
        html: `<span class="cm"># .github/workflows/ci.yml</span>
<span class="prop">name</span>: CI
<span class="prop">on</span>: [push, pull_request]
<span class="prop">jobs</span>:
  <span class="prop">test</span>:
    <span class="prop">runs-on</span>: ubuntu-latest
    <span class="prop">steps</span>:
      - <span class="prop">uses</span>: actions/checkout@v4
      - <span class="prop">uses</span>: pnpm/action-setup@v3
        <span class="prop">with</span>: { version: 9 }
      - <span class="prop">uses</span>: actions/setup-node@v4
        <span class="prop">with</span>: { node-version: 20, cache: <span class="str">'pnpm'</span> }
      - <span class="prop">run</span>: pnpm install --frozen-lockfile
      - <span class="prop">run</span>: pnpm lint
      - <span class="prop">run</span>: pnpm typecheck
      - <span class="prop">run</span>: pnpm test
      - <span class="prop">run</span>: pnpm build`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-gauge-high'></i> Petit luxe à grand ROI",
        body: "Active les <strong>branch protection rules</strong> : une PR ne peut être mergée que si la CI est verte et qu'un reviewer a approuvé. Couplé à Dependabot et à un bot de labels, c'est la différence entre un dépôt qui dérive et un dépôt sous contrôle.",
      },
    },
  ],
  quiz: expertQuizzes.m29,
};
