import type { Module } from "@/types";
import { authQuizzes } from "../quizzes";
import { authExercises } from "../exercises";

export const authModule02: Module = {
  id: "svc-auth-m02",
  index: "02",
  title: "Brancher un provider",
  subtitle: "Clerk / Auth.js / Supabase Auth : parcours guidé + variantes",
  duration: "50 min",
  difficulty: "intermediate",
  objectives: [
    "Comprendre un parcours provider de bout en bout",
    "Suivre inscription → session",
    "Distinguer SDK client et vérification serveur",
  ],
  content: [
    { kind: "title", text: "Parcours guidé" },
    {
      kind: "paragraph",
      html: "Un <strong>provider</strong> (ex. Supabase Auth, Clerk, Auth.js) gère inscription, connexion, sessions. Tu configures le projet chez eux, tu branches le <strong>SDK</strong> (bibliothèque) dans ton app, tu testes le flux : créer un compte → se connecter → rester reconnu.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-route'></i> Sur cette plateforme",
        body: "Tu n'installes pas le provider ici. Tu apprends le schéma mental et tu valides les réflexes par audit. L'intégration réelle se fait sur ton dépôt capstone.",
      },
    },

    { kind: "title", text: "SDK vs serveur" },
    {
      kind: "paragraph",
      html: "Le SDK client aide l'interface (formulaires, état « connecté »). Pour toute action sensible (données, admin, paiement), le <strong>serveur</strong> doit vérifier la session ou le jeton. Masquer un bouton n'est pas une protection.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-server'></i> <strong>Réflexe</strong> : secrets du provider hors navigateur ; chaque API sensible revalide l'identité.",
    },
  ],
  quiz: authQuizzes.m02,
  exercises: [authExercises.m02_1],
};
