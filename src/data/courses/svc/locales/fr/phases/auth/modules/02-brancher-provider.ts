import type { Module } from "@/types";
import { authQuizzes } from "../quizzes";
import { authExercises } from "../exercises";

export const authModule02: Module = {
  id: "svc-auth-m02",
  index: "02",
  title: "Brancher un service de connexion",
  subtitle: "Exemples du marché : parcours guidé + variantes",
  duration: "50 min",
  difficulty: "intermediate",
  objectives: [
    "Comprendre un parcours de connexion tiers de bout en bout",
    "Suivre inscription → rester reconnu",
    "Distinguer bibliothèque navigateur et vérification serveur",
  ],
  content: [
    { kind: "title", text: "Parcours guidé" },
    {
      kind: "paragraph",
      html: "Un <strong>service de connexion</strong> (prestataire tiers ; exemples du marché : Supabase Auth, Clerk, Auth.js) gère inscription, connexion, sessions. Tu configures le projet chez eux, tu branches leur <strong>bibliothèque</strong> dans ton appli, tu testes le flux : créer un compte → se connecter → rester reconnu.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-route'></i> Sur cette plateforme",
        body: "Tu n'installes pas le service ici. Tu apprends le schéma mental et tu valides les réflexes par audit. L'intégration réelle se fait sur ton dépôt du projet final.",
      },
    },

    { kind: "title", text: "Bibliothèque navigateur vs serveur" },
    {
      kind: "paragraph",
      html: "La bibliothèque côté navigateur aide l'interface (formulaires, état « connecté »). Pour toute action sensible (données, administration, paiement), le <strong>serveur</strong> doit vérifier la connexion ou le jeton. Masquer un bouton n'est pas une protection.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-server'></i> <strong>Réflexe</strong> : secrets du service hors navigateur ; chaque API sensible revalide l'identité.",
    },
  ],
  quiz: authQuizzes.m02,
  exercises: [authExercises.m02_1],
};
