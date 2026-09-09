import type { Module } from "@/types";
import { auditSecuriteQuizzes } from "../quizzes";
import { auditSecuriteExercises } from "../exercises";

export const auditSecuriteModule04: Module = {
  id: "svc-audit-securite-m04",
  index: "04",
  title: "Dépendances et chaîne d'approvisionnement logicielle",
  subtitle: "Deps inutiles ou hallucinées, pin, npm audit",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Détecter les dépendances inutiles ou hallucinées",
    "Pinner les versions et auditer régulièrement",
  ],
  content: [
    { kind: "title", text: "Chaîne d'approvisionnement du code généré" },
    {
      kind: "paragraph",
      html: "Un prompt peut faire entrer des dizaines de packages « utiles ». Parmi eux : deps <strong>inutiles</strong>, noms <strong>hallucinés</strong> (usurpation de nom de paquet), plages trop larges (<code>*</code>, <code>^</code> sans lock). Chaque dépendance est une <strong>surface d'attaque</strong> et de maintenance.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ghost'></i> Packages inventés",
        body: "Vérifie sur le registry avant `npm install`. Un nom proche d'un package célèbre peut être un piège publié après l'hallucination de l'IA.",
      },
    },
    {
      kind: "paragraph",
      html: "<strong>Assainis</strong> le <code>package.json</code> : retire l'inutile, pin / lockfile, lance <strong>npm audit</strong> (ou équivalent) et trie. Ne désactive donc pas le contrôle en CI pour « livrer plus vite ». Le livrable de phase, c'est le <strong>rapport Security baseline</strong> du capstone : secrets, injections, AuthZ, deps, avec preuves et correctifs.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-clipboard-check'></i> Baseline",
        body: "Liste de contrôle security-baseline entière. Chaque constat : preuve + correctif. Aucune faille critique ouverte avant de déclarer P8 terminé.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-box'></i> <strong>Projet P8</strong> : rapport Security baseline du capstone, deps assainies incluses, zéro critique ouverte.",
    },
  ],
  quiz: auditSecuriteQuizzes.m04,
  exercises: [auditSecuriteExercises.m04_projet],
};
