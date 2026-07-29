import type { Module } from "@/types";
import { promptQuizzes } from "../quizzes";
import { promptExercises } from "../exercises";

export const promptModule03: Module = {
  id: "svc-prompt-m03",
  index: "03",
  title: "Contraintes business dès la demande",
  subtitle: "Prévoir connexion, paiement, notifications et hébergement dans le cahier des charges",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Intégrer les services externes dès le cadrage",
    "Utiliser une liste « prêt produit »",
    "Éviter les prototypes jetables",
  ],
  content: [
    { kind: "title", text: "Prévoir les services externes" },
    {
      kind: "paragraph",
      html: "Connexion utilisateur, paiement, notifications, hébergement : ce n'est pas de la décoration. Ça change où on vérifie les droits, où vivent les secrets, et souvent la forme des données. Un CRUD (créer / lister / modifier / supprimer) généré sans ces lignes devient un prototype jetable.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-puzzle-piece'></i> Dans le cahier des charges",
        body: "Même un « plus tard » écrit aide : « Paiement hors premier livrable, mais comptes utilisateurs dès la v1 ». L'IA arrête d'inventer un panier fantôme.",
      },
    },

    { kind: "title", text: "Liste « prêt produit »" },
    {
      kind: "paragraph",
      html: "Avant de lancer une grosse demande CRUD, vérifie : qui est connecté ? quels rôles ? quels environnements (local, aperçu en ligne, production) ? où vivent les secrets ? vérification côté serveur ? notifications nécessaires au parcours ?",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-store'></i> <strong>Prêt produit</strong> : le cahier des charges couvre ce qui rend le produit vendable et opérable, pas seulement la démo sur ton ordinateur.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-trash'></i> Prototype jetable",
        body: "Démo sans chemin vers la production (pas de connexion, secrets en dur, un seul environnement) : tu reconstruiras. Mieux vaut enrichir la demande maintenant.",
      },
    },
  ],
  quiz: promptQuizzes.m03,
  exercises: [promptExercises.m03_projet],
};
