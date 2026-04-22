import type { Module } from "@/types";
import { introQuizzes } from "../quizzes";

export const module01: Module = {
  id: "react-intro-m01",
  index: "01",
  title: "Une définition simple, sans jargon",
  subtitle: "Comprendre React en une phrase : puis vraiment le comprendre",
  duration: "3 min",
  openByDefault: true,
  content: [
    { kind: "title", text: "La définition officielle" },
    {
      kind: "paragraph",
      html: "<strong>React est une bibliothèque JavaScript créée par Facebook (aujourd'hui Meta) en 2013, qui sert à construire des interfaces utilisateur.</strong> C'est tout. Pas de magie, pas de mystère : React est un <em>outil</em> qui vous aide à afficher des boutons, des formulaires, des listes, des pages entières : bref, tout ce que l'utilisateur voit et manipule dans un navigateur.",
    },
    {
      kind: "paragraph",
      html: "Mais cette définition, bien qu'exacte, ne dit pas <em>pourquoi</em> React est devenu le standard mondial du développement web moderne. Pour le comprendre, il faut remonter au problème qu'il résout.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-puzzle-piece'></i> Une analogie pour démarrer",
        body: "Imaginez que vous construisez une maison. Sans React, vous fabriquez chaque brique, chaque fenêtre et chaque porte à la main, une par une. Avec React, vous concevez une fois un <strong>modèle de fenêtre</strong>, un <strong>modèle de porte</strong>, et vous les réutilisez autant de fois que nécessaire. Mieux : quand vous changez la peinture, React repeint <em>uniquement</em> les murs concernés.",
      },
    },
    { kind: "title", text: "Le vrai problème que React résout" },
    {
      kind: "paragraph",
      html: "Avant React, construire une interface interactive avec JavaScript \"vanilla\" ou jQuery était épuisant. À chaque clic, à chaque saisie, il fallait manuellement :",
    },
    { kind: "highlight", html: "<i class='fa-solid fa-magnifying-glass'></i> Retrouver le bon élément HTML dans la page (<code>document.querySelector</code>)" },
    { kind: "highlight", html: "<i class='fa-solid fa-pen-to-square'></i> Modifier son contenu ou son style à la main" },
    { kind: "highlight", html: "<i class='fa-solid fa-arrows-rotate'></i> Synchroniser toutes les parties de l'UI qui dépendent de ce changement" },
    { kind: "highlight", html: "<i class='fa-solid fa-bug'></i> Déboguer pendant des heures quand un état n'était pas à jour quelque part" },
    {
      kind: "paragraph",
      html: "Plus l'application grossissait, plus le code ressemblait à un plat de spaghettis. React propose une idée radicalement différente : <strong>décrivez à quoi doit ressembler l'interface pour un état donné, et laissez React s'occuper de mettre le DOM à jour.</strong> Vous passez d'une logique <em>impérative</em> (\"fais ceci, puis cela\") à une logique <em>déclarative</em> (\"voici ce que je veux voir\").",
    },
  ],
  quiz: introQuizzes.m01,
};
