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
    "Décrire ce que tu produis à chaque temps",
    "Préférer les petites boucles au grand tunnel",
  ],
  content: [
    { kind: "title", text: "Pourquoi trois temps" },
    {
      kind: "paragraph",
      html: "Mélanger spécification, génération, vérification et mise en ligne dans un seul élan, c'est le tunnel. On sépare volontairement :",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-pen'></i> <strong>Prompt</strong> : écrire clairement le besoin, puis générer une proposition limitée.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-shield-halved'></i> <strong>Audit</strong> : vérifier avec listes de contrôle et preuves (pas « ça a l'air ok »).",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-rocket'></i> <strong>Ship</strong> : livrer une version (aperçu ou production) en emportant ces preuves.",
    },
    {
      kind: "paragraph",
      html: "Chaque phase du cours (connexion, paiements, hébergement…) rejoue ce rythme. Tu n'apprends pas seulement des briques techniques : tu apprends une <strong>discipline de livraison</strong>.",
    },

    { kind: "title", text: "Petite boucle vs tunnel" },
    {
      kind: "paragraph",
      html: "Une petite boucle : une micro-fonctionnalité, un aperçu des changements lisible, un audit, une livraison partielle. Un tunnel : 95 fichiers d'un coup, « on vérifiera lundi ». Le tunnel rend la vérification humaine impossible et multiplie les secrets oubliés.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-rotate'></i> Règle pratique",
        body: "Si tu ne peux pas résumer les changements en trois phrases, le lot est trop gros. Re-découpe avant d'auditer.",
      },
    },
    {
      kind: "paragraph",
      html: "L'exercice ci-dessous te fait distinguer les étapes saines d'un formulaire de contact des réflexes tunnel. Plus loin, les preuves d'audit deviennent plus formelles (outils automatiques, scores, procédures).",
    },
  ],
  quiz: fondationsQuizzes.m02,
  exercises: [fondationsExercises.m02_1],
};
