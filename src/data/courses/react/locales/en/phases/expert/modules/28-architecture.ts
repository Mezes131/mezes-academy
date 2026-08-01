import type { Module } from "@/types";
import { expertQuizzes } from "../quizzes";

export const module28: Module = {
  id: "react-expert-m28",
  index: "28",
  title: "Advanced architecture",
  subtitle: "Monorepos, DDD, Clean Architecture in React",
  duration: "1.5 weeks",
  content: [
    {
      kind: "paragraph",
      html: "Past a certain size (10+ developers, 100,000+ lines, multiple apps), <strong>architecture becomes the #1 factor</strong> in productivity. Good boundaries reduce conflicts, speed up code review, and limit technical debt.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "28.1",
          title: "28.1: Monorepos with Turborepo / Nx",
          desc: "Manage multiple apps (web, admin, mobile…) and internal packages (ui, auth-core, config-eslint) in a single repo. Shared build cache, incremental pipelines, coordinated versioning.",
          tags: ["Turborepo", "Nx", "pnpm workspaces"],
        },
        {
          id: "28.2",
          title: "28.2: Domain-Driven Design applied to the front end",
          desc: "Organize code by business domain (<code>features/checkout</code>, <code>features/billing</code>…) rather than by technical type (<code>components/</code>, <code>hooks/</code>, <code>services/</code>). Local coupling, cohesion per feature.",
          tags: ["DDD", "bounded context", "feature-folders"],
        },
        {
          id: "28.3",
          title: "28.3: Front-end Clean Architecture",
          desc: "Split into 3 layers: <strong>domain</strong> (pure JS/TS, zero dependencies), <strong>application</strong> (use cases), <strong>infrastructure</strong> (React, HTTP, UI). Rule: outer layers know inner layers, never the reverse.",
          tags: ["layers", "dependency rule", "hexagonal"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Feature-first folder structure",
        html: `<span class="cm">// ❌ By type: hard to evolve</span>
src/
├─ components/
├─ hooks/
├─ services/
└─ utils/

<span class="cm">// ✅ By feature: one folder = one complete vertical</span>
src/
├─ features/
│  ├─ checkout/
│  │  ├─ ui/                  <span class="cm">// CheckoutButton, PaymentForm...</span>
│  │  ├─ hooks/               <span class="cm">// useCart, usePayment...</span>
│  │  ├─ domain/              <span class="cm">// price calculation (pure)</span>
│  │  └─ api/                 <span class="cm">// HTTP calls</span>
│  └─ auth/
│     ├─ ui/
│     ├─ hooks/
│     └─ api/
└─ shared/                    <span class="cm">// reusable primitives only</span>`,
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-circle-check'></i> Reflection exercise",
        body: "Take an existing project. Ask yourself: <strong>\"if I had to remove feature X, how many files would I touch?\"</strong>. If the answer is more than 10 scattered files, you have an architecture problem. The ideal is to delete one folder and you're done.",
      },
    },
  ],
  quiz: expertQuizzes.m28,
};
