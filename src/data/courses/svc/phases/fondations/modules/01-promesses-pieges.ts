import type { Module } from "@/types";
import { fondationsQuizzes } from "../quizzes";
import { fondationsExercises } from "../exercises";

export const fondationsModule01: Module = {
  id: "svc-fondations-m01",
  index: "01",
  title: "Le vibe coding : promesses et pièges",
  subtitle: "Ce que l'IA fait bien, ce qu'elle rate, et qui est responsable",
  duration: "25 min",
  difficulty: "intro",
  openByDefault: true,
  objectives: [
    "Situer le spectre autocomplete → agents autonomes",
    "Identifier les échecs typiques du code généré",
    "Assumer la responsabilité finale : le développeur signe",
  ],
  content: [
    { kind: "title", text: "Le spectre des outils IA" },
    {
      kind: "paragraph",
      html: "« Vibe coding », ici, ce n'est pas « laisser l'IA coder à ta place ». C'est <strong>générer vite, puis vérifier comme un professionnel</strong>. Les outils se placent sur un spectre : de l'<em>autocomplete</em> (une suggestion de token) au <em>chat</em>, aux <em>assistants IDE</em> (contexte multi-fichiers), jusqu'aux <em>agents</em> qui enchaînent lecture, écriture et commandes avec peu de supervision.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-gauge-high'></i> Plus l'autonomie monte, plus l'audit monte",
        body: "Un autocomplete malheureux coûte une ligne. Un agent mal cadré peut réécrire ton auth, committer un secret et ouvrir une PR de 2000 lignes. Le cycle Prompt → Audit → Ship s'impose d'autant plus.",
      },
    },

    { kind: "title", text: "Forces et angles morts" },
    {
      kind: "paragraph",
      html: "L'IA est forte pour le boilerplate, les API courantes, les refactors mécaniques, les explications de code. Elle rate souvent : les contraintes métier implicites, les failles subtiles (auth, CORS, secrets), la sur-ingénierie « enterprise » inutile, et le code <strong>plausible mais faux</strong> qui survit à un coup d'œil distrait.",
    },
    { kind: "highlight", html: "<i class='fa-solid fa-eye'></i> <strong>Réflexe</strong> : si tu n'as pas lu le diff, tu n'as pas livré. Tu as espéré." },

    { kind: "title", text: "Le développeur signe" },
    {
      kind: "paragraph",
      html: "En production, le fournisseur du modèle ne porte pas ton incident Stripe. <strong>Toi (ou ton équipe) signe le merge, le déploiement, la promesse client.</strong> Les échecs documentés du vibe coding sauvage se ressemblent : confiance aveugle, prompt vague, revue zappée. Cette formation existe pour casser ce schéma.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Pièges à nommer tout de suite",
        body: "Confiance aveugle · code non lu · prompt vague. Tu les retrouveras dans l'exercice d'autopsie ci-dessous.",
      },
    },
  ],
  quiz: fondationsQuizzes.m01,
  exercises: [fondationsExercises.m01_1],
};
