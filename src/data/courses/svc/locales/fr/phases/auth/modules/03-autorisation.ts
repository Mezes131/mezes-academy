import type { Module } from "@/types";
import { authQuizzes } from "../quizzes";
import { authExercises } from "../exercises";

export const authModule03: Module = {
  id: "svc-auth-m03",
  index: "03",
  title: "Autorisation réelle",
  subtitle: "Rôles, règles en base, accès illégitime : protéger côté serveur",
  duration: "50 min",
  difficulty: "intermediate",
  objectives: [
    "Modéliser rôles et permissions",
    "Comprendre les règles d'accès en base",
    "Détecter et corriger un accès illégitime via un identifiant",
  ],
  content: [
    { kind: "title", text: "Rôles et règles" },
    {
      kind: "paragraph",
      html: "Être connecté ≠ tout pouvoir. L'<strong>autorisation</strong> dit qui peut lire / écrire quoi. On modèle souvent des <strong>rôles</strong> (membre, administrateur…). Des <strong>règles d'accès en base</strong> limitent les lignes visibles selon l'utilisateur.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-user-shield'></i> Couches",
        body: "API qui vérifie le droit + règles en base = double filet. L'IA oublie souvent l'un des deux.",
      },
    },

    { kind: "title", text: "Accès illégitime en changeant l'identifiant" },
    {
      kind: "paragraph",
      html: "C'est accéder à la ressource d'un autre en changeant le numéro dans l'adresse ou l'API (<code>/notes/101</code> → <code>/notes/102</code>) sans que le serveur vérifie le propriétaire. Classique, grave, souvent présent dans le code généré « qui marche ».",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-bug'></i> <strong>Correctif</strong> : contrôle d'accès serveur (et règles en base). Masquer un lien ou rendre le numéro « difficile » ne suffit pas.",
    },
  ],
  quiz: authQuizzes.m03,
  exercises: [authExercises.m03_1],
};
