import type { Module } from "@/types";
import { hebergementQuizzes } from "../quizzes";
import { hebergementExercises } from "../exercises";

export const hebergementModule02: Module = {
  id: "svc-hebergement-m02",
  index: "02",
  title: "Environnements",
  subtitle: "Local, aperçu, prod et secrets à l'exécution",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Séparer local / environnement d'aperçu / prod",
    "Gérer secrets à l'exécution et config build",
  ],
  content: [
    { kind: "title", text: "Trois environnements" },
    {
      kind: "paragraph",
      html: "<strong>Local</strong>, <strong>environnement d'aperçu</strong> (PR / staging) et <strong>prod</strong> ne partagent ni secrets ni bases « pour aller plus vite ». Chaque env a sa configuration. Les <strong>secrets lus à l'exécution</strong> sont injectés par la plateforme ou un coffre : jamais commités, jamais dans le bundle client.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-key'></i> Vite : build vs exécution",
        body: "Les variables <code>VITE_*</code> sont embarquées au <strong>build</strong> côté navigateur. URLs publiques OK. Clés secrètes (Stripe, service role…) = serveur / à l'exécution uniquement.",
      },
    },
    {
      kind: "paragraph",
      html: "Livrable pratique : une <strong>matrice</strong> variables × environnement (nom, secret oui/non, valeur ou emplacement). Ça évite l'aperçu qui tape la DB prod ou les webhooks paiement live.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-table'></i> Matrice",
        body: "Liste chaque variable du produit : local / aperçu / prod. Si tu ne sais pas où elle vit, tu as déjà une fuite potentielle.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shield-halved'></i> <strong>Règle</strong> : trois silos. Les secrets à l'exécution restent hors dépôt et hors client ; aperçu ≠ prod.",
    },
  ],
  quiz: hebergementQuizzes.m02,
  exercises: [hebergementExercises.m02_1],
};
