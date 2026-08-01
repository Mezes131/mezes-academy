import type { Module } from "@/types";
import { introQuizzes } from "../quizzes";

export const module04: Module = {
  id: "react-intro-m04",
  index: "04",
  title: "Why learn React in 2026?",
  subtitle: "The objective reasons that make it a strategic choice",
  duration: "3 min",
  content: [
    {
      kind: "paragraph",
      html: "You could settle for « because everyone uses it », but that would be reductive. Here are the real reasons React is a solid investment.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-globe'></i> The richest ecosystem",
        body: "More than 220,000 npm packages related to React. For almost every problem you hit, a battle-tested solution already exists.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-briefcase'></i> The #1 job market",
        body: "React dominates front-end job listings. In 2026, it is still the most in-demand client-side web skill.",
      },
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-building'></i> Used by the giants",
        body: "Meta, Netflix, Airbnb, Uber, Shopify, Discord, WhatsApp Web, Instagram, Twitch…",
      },
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> What React is NOT",
        body: "React is not a language (it's JavaScript), not a database, not a server. It does not replace solid HTML, CSS, and JavaScript knowledge.",
      },
    },
  ],
  quiz: introQuizzes.m04,
};
