import type { Module } from "@/types";
import { expertQuizzes } from "../quizzes";

export const module28: Module = {
  id: "react-expert-m28",
  index: "M28",
  title: "Architecture avancée",
  subtitle: "Monorepos, DDD, Clean Architecture en React",
  duration: "1.5 semaines",
  content: [
    {
      kind: "paragraph",
      html: "À partir d'une certaine taille (10+ développeurs, 100 000+ lignes, plusieurs apps), <strong>l'architecture devient le facteur n°1</strong> de productivité. Un bon découpage réduit les conflits, accélère les revues de code et limite la dette technique.",
    },
    {
      kind: "lessons",
      items: [
        {
          id: "28.1",
          title: "28.1 : Monorepos avec Turborepo / Nx",
          desc: "Gérer plusieurs apps (web, admin, mobile…) et packages internes (ui, auth-core, config-eslint) dans un seul dépôt. Cache de build partagé, pipelines incrémentaux, versioning coordonné.",
          tags: ["Turborepo", "Nx", "pnpm workspaces"],
        },
        {
          id: "28.2",
          title: "28.2 : Domain-Driven Design appliqué au front",
          desc: "Organiser son code par domaine métier (<code>features/checkout</code>, <code>features/billing</code>…) plutôt que par type technique (<code>components/</code>, <code>hooks/</code>, <code>services/</code>). Couplage local, cohésion par feature.",
          tags: ["DDD", "bounded context", "feature-folders"],
        },
        {
          id: "28.3",
          title: "28.3 : Clean Architecture front-end",
          desc: "Séparer en 3 couches : <strong>domaine</strong> (pure JS/TS, zéro dépendance), <strong>application</strong> (use cases), <strong>infrastructure</strong> (React, HTTP, UI). Règle : les couches externes connaissent les internes, jamais l'inverse.",
          tags: ["layers", "dependency rule", "hexagonal"],
        },
      ],
    },
    {
      kind: "code",
      sample: {
        label: "Structure de dossiers feature-first",
        html: `<span class="cm">// ❌ Par type : difficile à faire évoluer</span>
src/
├─ components/
├─ hooks/
├─ services/
└─ utils/

<span class="cm">// ✅ Par feature : un dossier = un vertical complet</span>
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
        title: "<i class='fa-solid fa-circle-check'></i> Exercice de réflexion",
        body: "Prends un projet existant. Demande-toi : <strong>\"si je devais supprimer la feature X, combien de fichiers devrais-je toucher ?\"</strong>. Si la réponse dépasse 10 fichiers éparpillés, tu as un problème d'architecture. L'idéal est de supprimer un dossier et c'est fini.",
      },
    },
  ],
  quiz: expertQuizzes.m28,
};
