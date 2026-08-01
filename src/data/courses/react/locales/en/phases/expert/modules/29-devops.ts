import type { Module } from "@/types";
import { expertQuizzes } from "../quizzes";

export const module29: Module = {
  id: "react-expert-m29",
  index: "29",
  title: "DevOps & CI/CD",
  subtitle: "GitHub Actions, Docker, deployments",
  duration: "1.5 weeks",
  content: [
    {
      kind: "paragraph",
      html: "A senior developer in 2026 does more than write code: they know how to ship it to production. <strong>Lint, test, build, deploy automated</strong> on every PR — that is the bare minimum for a serious team.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "29.1",
          title: "29.1: GitHub Actions for a React project",
          desc: "Typical pipeline: <code>checkout → setup node + cache → install → lint → typecheck → test → build</code>. Add a deploy job on the main branch. Separate preview / prod.",
          tags: ["actions/checkout", "pnpm/action-setup", "matrix"],
        },
        {
          id: "29.2",
          title: "29.2: Docker for Next.js apps",
          desc: "Optimized multi-stage Dockerfile: a <em>builder</em> image with devDependencies, a minimal <em>runtime</em> image (<code>node:alpine</code> or <code>distroless</code>). Typical final size < 200 MB.",
          tags: ["multi-stage", "standalone output", "distroless"],
        },
        {
          id: "29.3",
          title: "29.3: Deployment: Vercel, Fly.io, self-hosted",
          desc: "Vercel: extraordinary DX, free preview deployments, but vendor lock-in and costs at scale. Fly.io: self-hosted option with good DX. Self-hosted: flexibility but ops to carry.",
          tags: ["Vercel", "Fly.io", "Kubernetes", "edge runtime"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "GitHub Actions: typical pipeline",
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
        title: "<i class='fa-solid fa-gauge-high'></i> Small luxury, big ROI",
        body: "Enable <strong>branch protection rules</strong>: a PR can only be merged if CI is green and a reviewer has approved. Combined with Dependabot and a label bot, that is the difference between a repo that drifts and a repo under control.",
      },
    },
  ],
  quiz: expertQuizzes.m29,
};
