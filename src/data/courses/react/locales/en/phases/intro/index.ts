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
  title: "What is React, really?",
  summary:
    "Before writing a single line of code, let's take a moment to understand what React actually is, why it was created, and why it became essential.",
  metaTags: ["reading ~15 min", "no prerequisites", "plain-language", "foundations"],
  modules: [module01, module02, module03, module04, module05],
};
