import type { Module } from "@/types";
import { authQuizzes } from "../quizzes";
import { authExercises } from "../exercises";

export const authModule01: Module = {
  id: "svc-auth-m01",
  index: "01",
  title: "Modèles de connexion modernes",
  subtitle: "Sessions, jetons signés, lien magique, compte existant : choisir en connaissance",
  duration: "35 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Comparer sessions, jetons signés, lien magique et connexion via un compte existant",
    "Choisir un modèle selon le cas produit",
    "Repérer les erreurs classiques du code de connexion généré",
  ],
  content: [
    { kind: "title", text: "Panorama des modèles" },
    {
      kind: "paragraph",
      html: "<strong>Authentification</strong> = prouver qui tu es (on dit aussi « se connecter »). Quatre familles courantes : <strong>session</strong> (le serveur se souvient de toi), <strong>jeton signé</strong> (preuve transportée à chaque requête), <strong>lien magique</strong> (connexion par email), <strong>compte existant</strong> (entrer avec Google, Microsoft…).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-scale-balanced'></i> Pas de gagnant unique",
        body: "Logiciel pour entreprises → souvent compte Google / Microsoft. Appli grand public → peu d'obstacles (lien magique / service tiers). Outil interne → s'appuyer sur l'annuaire déjà là. Le produit dicte le choix.",
      },
    },

    { kind: "title", text: "Erreurs du code généré" },
    {
      kind: "paragraph",
      html: "L'IA propose souvent une <strong>connexion maison</strong> « rapide » : mots de passe mal protégés, jeton collé dans le <strong>stockage du navigateur</strong> sans expiration claire, réinitialisation fragile. En production, préfère un <strong>service de connexion tiers</strong> éprouvé, puis audite l'intégration.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-ban'></i> <strong>Règle de phase</strong> : ne jamais réinventer la connexion. Brancher un service tiers, cadrer, vérifier, Livraison.",
    },
  ],
  quiz: authQuizzes.m01,
  exercises: [authExercises.m01_1],
};
