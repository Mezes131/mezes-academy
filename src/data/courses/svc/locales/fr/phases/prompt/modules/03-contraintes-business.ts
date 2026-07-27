import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule03: Module = {
  id: "svc-prompt-m03",
  index: "03",
  title: "Contraintes business dès le prompt",
  subtitle: "Anticiper auth, paiement, notifs et hébergement dans le brief",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Intégrer les services tiers dès le cadrage",
    "Utiliser une checklist « prêt produit »",
    "Éviter les prototypes jetables",
  ],
  content: [
    { kind: "title", text: "Anticiper les services tiers" },
    {
      kind: "paragraph",
      html: "Auth, paiement, notifications, hébergement : ce n'est pas du « polish ». Ça change les frontières de confiance, les secrets, et souvent le schéma de données. Un CRUD généré sans ces lignes devient un prototype jetable.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-puzzle-piece'></i> Dans le brief",
        body: "Même un « plus tard » explicite aide : « Paiement hors MVP, mais comptes utilisateurs dès v1 ». L'IA arrête d'inventer un panier fantôme.",
      },
    },

    { kind: "title", text: "Checklist « prêt produit »" },
    {
      kind: "paragraph",
      html: "Avant de lancer un gros prompt CRUD, vérifie : qui est connecté ? quels rôles ? quels envs (local, preview, prod) ? où vivent les secrets ? validation côté serveur ? notifications nécessaires au parcours ?",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-store'></i> <strong>Prêt produit</strong> : le brief couvre ce qui rend le produit vendable et opérable, pas seulement la démo locale.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-trash'></i> Prototype jetable",
        body: "Démo sans chemin vers la prod (pas d'auth, secrets en dur, un seul env) : tu reconstruiras. Mieux vaut enrichir le prompt maintenant.",
      },
    },
  ],
  quiz: promptQuizzes.m03,
  exercises: [promptExercises.m03_projet],
};
