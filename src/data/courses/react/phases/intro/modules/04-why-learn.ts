import type { Module } from "@/types";
import { introQuizzes } from "../quizzes";

export const module04: Module = {
  id: "react-intro-m04",
  index: "04",
  title: "Pourquoi apprendre React en 2026 ?",
  subtitle: "Les raisons objectives qui en font un choix stratégique",
  duration: "3 min",
  content: [
    {
      kind: "paragraph",
      html: "On pourrait se contenter de dire « parce que tout le monde l'utilise », mais ce serait réducteur. Voici les vraies raisons qui font de React un investissement solide.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-globe'></i> L'écosystème le plus riche",
        body: "Plus de 220 000 packages npm liés à React. Pour quasiment tout problème rencontré, une solution éprouvée existe déjà.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-briefcase'></i> Le marché de l'emploi n°1",
        body: "React domine les offres front-end. En 2026, c'est encore la compétence la plus demandée en développement web côté client.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-building'></i> Utilisé par les géants",
        body: "Meta, Netflix, Airbnb, Uber, Shopify, Discord, WhatsApp Web, Instagram, Twitch…",
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Ce que React n'est PAS",
        body: "React n'est pas un langage (c'est du JavaScript), pas une base de données, pas un serveur. Il ne remplace pas une bonne connaissance de HTML, CSS et JavaScript.",
      },
    },
  ],
  quiz: introQuizzes.m04,
};
