import type { Phase } from "@/types";
import { module01 } from "./modules/01-definition";
import { module02 } from "./modules/02-library-vs-framework";
import { module03 } from "./modules/03-three-pillars";
import { module04 } from "./modules/04-why-learn";
import { module05 } from "./modules/05-journey";

export const introPhase: Phase = {
  id: "react-intro",
  slug: "intro",
  courseId: "react",
  color: "intro",
  icon: "fa-book-open",
  label: "Introduction",
  title: "C'est quoi React, au juste ?",
  summary:
    "Avant d'écrire la moindre ligne de code, prenons un moment pour comprendre ce qu'est vraiment React, pourquoi il a été créé, et pourquoi il est devenu incontournable.",
  metaTags: ["lecture ~15 min", "aucun prérequis", "vulgarisation", "fondations"],
  modules: [module01, module02, module03, module04, module05],
};
