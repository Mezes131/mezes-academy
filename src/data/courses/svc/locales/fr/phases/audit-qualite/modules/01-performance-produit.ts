import type { Module } from "@/types";
import { auditQualiteQuizzes } from "../quizzes";
import { auditQualiteExercises } from "../exercises";

export const auditQualiteModule01: Module = {
  id: "svc-audit-qualite-m01",
  index: "01",
  title: "Performance produit",
  subtitle: "LCP, TBT, budgets, images, cascades réseau",
  duration: "40 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Mesurer LCP/TBT et lire une cascade réseau (waterfall)",
    "Poser des budgets de performance",
    "Optimiser les images",
  ],
  content: [
    { kind: "title", text: "Mesurer et budgéter" },
    {
      kind: "paragraph",
      html: "Sans mesure, la perf est une opinion. <strong>Lighthouse</strong> (et les outils équivalents) te donnent le <strong>LCP</strong> (Largest Contentful Paint : quand le plus grand contenu visible apparaît) et le <strong>TBT</strong> (Total Blocking Time : temps où le fil principal est bloqué), plus une piste. La <strong>cascade réseau</strong> (waterfall) montre quoi charge, dans quel ordre, et ce qui bloque. Pose ensuite des <strong>budgets</strong> tenables : LCP, poids page, JS, et fais-les respecter après chaque prompt « ajoute une lib ».",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-gauge-high'></i> Images et LCP",
        body: "Le hero non compressé est le classique du code généré. Format moderne, dimensions justes, priorité sur le LCP, chargement différé (lazy-load) pour le reste.",
      },
    },
    {
      kind: "paragraph",
      html: "Un audit perf livrable = score + diagnostic + <strong>plan d'action priorisé</strong> (impact × effort). Autrement dit, ce n'est pas une capture Lighthouse sans suite.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-list-check'></i> Liste de contrôle perf",
        body: "Mesure mobile réaliste, cascade réseau lue, budgets écrits, images et JS traités en premier si LCP/TBT souffrent.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-stopwatch'></i> <strong>Règle</strong> : mesurer → budgéter → corriger le top du plan. Autrement dit, pas « optimiser au feeling ».",
    },
  ],
  quiz: auditQualiteQuizzes.m01,
  exercises: [auditQualiteExercises.m01_1],
};
