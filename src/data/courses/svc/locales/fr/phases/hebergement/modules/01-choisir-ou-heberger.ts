import type { Module } from "@/types";
import { hebergementQuizzes } from "../quizzes";
import { hebergementExercises } from "../exercises";

export const hebergementModule01: Module = {
  id: "svc-hebergement-m01",
  index: "01",
  title: "Choisir où héberger",
  subtitle: "Vercel, Fly, Railway, VPS : critères réels",
  duration: "30 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Comparer les plateformes selon coût, ops et démarrage à froid",
    "Choisir selon le produit plutôt que selon la mode",
  ],
  content: [
    { kind: "title", text: "Panorama hébergement" },
    {
      kind: "paragraph",
      html: "Mettre en ligne, ce n'est pas « coller le nom de la plateforme du dernier tutoriel ». <strong>Vercel</strong>, <strong>Fly</strong>, <strong>Railway</strong> et un <strong>VPS</strong> sont des <strong>options de marché</strong>, que ce soit PaaS ou serveur. Compare-les sur des critères concrets : <strong>coût</strong>, <strong>charge ops</strong> (qui patche, qui monitore), <strong>démarrage à froid</strong>, adéquation avec ta stack.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-cloud'></i> PaaS vs VPS",
        body: "PaaS = moins d'ops, contraintes d'exécution. VPS = contrôle et responsabilité. Ni l'un ni l'autre n'est « toujours mieux ».",
      },
    },
    {
      kind: "paragraph",
      html: "Une page d'accueil statique peu fréquentée n'a pas les mêmes besoins qu'une API sensible au SLA ou qu'un travailleur long. Le <strong>démarrage à froid</strong> (réveil d'instance / fonction) peut tuer le ressenti sur un free tier qui s'éteint à zéro.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Mode ≠ adéquation",
        body: "L'IA cite souvent une plateforme par défaut. Tu justifies le choix pour <em>ce</em> produit : trafic, budget, compétences ops.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-scale-balanced'></i> <strong>Règle</strong> : critères (coût, ops, démarrage à froid, stack) avant le logo. Reste indépendant du fournisseur.",
    },
  ],
  quiz: hebergementQuizzes.m01,
  exercises: [hebergementExercises.m01_1],
};
