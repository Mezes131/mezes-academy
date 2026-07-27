import type { Module } from "@/types";
import { fondationsQuizzes } from "../quizzes";
import { fondationsExercises } from "../exercises";

export const fondationsModule02: Module = {
  id: "svc-fondations-m02",
  index: "02",
  title: "Le cycle Prompt → Audit → Ship",
  subtitle: "Le fil rouge de toute la formation",
  duration: "30 min",
  difficulty: "intro",
  objectives: [
    "Expliquer pourquoi trois temps distincts",
    "Décrire les livrables de chaque temps",
    "Préférer les boucles courtes au tunnel",
  ],
  content: [
    { kind: "title", text: "Pourquoi trois temps" },
    {
      kind: "paragraph",
      html: "Mélanger spécification, génération, vérification et mise en ligne dans un seul élan, c'est le tunnel. On sépare volontairement :",
    },
    { kind: "highlight", html: "<i class='fa-solid fa-pen'></i> <strong>Prompt</strong> : spécifier le besoin, puis générer une proposition bornée." },
    { kind: "highlight", html: "<i class='fa-solid fa-shield-halved'></i> <strong>Audit</strong> : vérifier avec checklists et preuves (pas « ça a l'air ok »)." },
    { kind: "highlight", html: "<i class='fa-solid fa-rocket'></i> <strong>Ship</strong> : livrer (preview/prod) en emportant ces preuves." },
    {
      kind: "paragraph",
      html: "Chaque phase du cours (auth, paiements, hébergement…) rejoue ce rythme. Tu n'apprends pas seulement des briques techniques : tu apprends une <strong>discipline de livraison</strong>.",
    },

    { kind: "title", text: "Boucle courte vs tunnel" },
    {
      kind: "paragraph",
      html: "Une boucle courte : une micro-feature, un diff lisible, un audit, un ship partiel. Un tunnel : 95 fichiers d'un coup, « on auditera lundi ». Le tunnel rend l'audit humainement impossible et multiplie les secrets oubliés.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-rotate'></i> Règle opérationnelle",
        body: "Si tu ne peux pas résumer le diff en trois phrases, il est trop gros. Re-découpe avant d'auditer.",
      },
    },
    {
      kind: "paragraph",
      html: "L'exercice ci-dessous te fait distinguer les étapes saines d'un formulaire de contact des réflexes tunnel. Plus loin (P8 a P12), les preuves d'audit deviennent formelles (scanners, scores, runbook).",
    },
  ],
  quiz: fondationsQuizzes.m02,
  exercises: [fondationsExercises.m02_1],
};
