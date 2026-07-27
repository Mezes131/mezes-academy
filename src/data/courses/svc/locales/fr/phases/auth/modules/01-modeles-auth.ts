import type { Module } from "@/types";
import { authQuizzes } from "../quizzes";
import { authExercises } from "../exercises";

export const authModule01: Module = {
  id: "svc-auth-m01",
  index: "01",
  title: "Modèles d'authentification modernes",
  subtitle: "Sessions, JWT, lien magique, OAuth : choisir en connaissance",
  duration: "35 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Comparer sessions, JWT, lien magique et OAuth",
    "Choisir un modèle selon le cas produit",
    "Repérer les erreurs classiques du code d'auth généré",
  ],
  content: [
    { kind: "title", text: "Panorama des modèles" },
    {
      kind: "paragraph",
      html: "<strong>Authentification</strong> (auth) = prouver qui tu es. Quatre familles courantes : <strong>session</strong> (le serveur se souvient de toi), <strong>JWT</strong> (jeton signé, souvent transporté à chaque requête), <strong>lien magique</strong> (connexion par email), <strong>OAuth</strong> (connexion via un compte existant : Google, Microsoft…).",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-scale-balanced'></i> Pas de gagnant unique",
        body: "SaaS B2B → souvent OAuth entreprise. App grand public → friction faible (lien magique / provider). Outil interne → s'appuyer sur l'annuaire déjà là. Le produit dicte le choix.",
      },
    },

    { kind: "title", text: "Erreurs du code généré" },
    {
      kind: "paragraph",
      html: "L'IA propose souvent une <strong>auth maison</strong> « rapide » : mots de passe mal hashés, JWT collé dans le <strong>stockage navigateur (localStorage)</strong> sans expiration claire, reset fragile. En production, préfère un <strong>provider tiers</strong> éprouvé, puis audite l'intégration.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-ban'></i> <strong>Règle de phase</strong> : ne jamais réinventer l'auth. Brancher un provider, cadrer, vérifier, Livraison.",
    },
  ],
  quiz: authQuizzes.m01,
  exercises: [authExercises.m01_1],
};
