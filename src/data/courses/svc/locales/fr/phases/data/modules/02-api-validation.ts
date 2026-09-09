import type { Module } from "@/types";
import { dataQuizzes } from "../quizzes";
import { dataExercises } from "../exercises";

export const dataModule02: Module = {
  id: "svc-data-m02",
  index: "02",
  title: "API et validation aux frontières",
  subtitle: "Ne jamais faire confiance au client",
  duration: "45 min",
  difficulty: "intermediate",
  objectives: [
    "Valider toutes les entrées côté serveur",
    "Retourner des erreurs typées",
    "Paginer les listes",
  ],
  content: [
    { kind: "title", text: "Validation des entrées" },
    {
      kind: "paragraph",
      html: "La <strong>frontière</strong> de ton système, c'est chaque point d'entrée HTTP (ou RPC). <strong>Ne jamais faire confiance au client</strong> : un contrôle de formulaire, c'est de l'expérience utilisateur ; le serveur doit re-valider types, champs obligatoires, longueurs et listes de valeurs avec un <strong>schéma de validation</strong> clair avant que la logique métier tourne.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-shield-halved'></i> Piège classique",
        body: "Les routes d'API générées par l'IA acceptent souvent <code>req.body</code> tel quel, ou s'appuient sur « l'interface a déjà validé ». Les attaquants appellent l'API directement.",
      },
    },

    { kind: "title", text: "Erreurs typées et pagination" },
    {
      kind: "paragraph",
      html: "Les <strong>erreurs typées</strong> donnent aux clients une forme stable (statut + code / champs). Autrement dit, évite une chaîne au hasard ou un 500 opaque. Associe-les aux bons codes HTTP. Pour les collections, <strong>pagine</strong> (limite + curseur ou décalage) : des traitements « tout renvoyer » sans borne brûlent mémoire, temps et argent.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-list-ol'></i> Listes",
        body: "Par défaut, une taille de page sensée. Plafonne le maximum. Autorise toujours quelles lignes l'appelant peut voir : la validation seule ne corrige pas l'accès par ID volé (IDOR).",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-server'></i> <strong>Réflexe</strong> : valider, puis autoriser, puis agir, puis répondre avec succès ou erreur typée ; paginer chaque liste.",
    },
  ],
  quiz: dataQuizzes.m02,
  exercises: [dataExercises.m02_1],
};
