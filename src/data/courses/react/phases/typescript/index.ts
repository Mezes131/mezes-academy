import type { Phase } from "@/types";
import { module19 } from "./modules/19-ts-basics";
import { module20 } from "./modules/20-ts-advanced";
import { module21 } from "./modules/21-react-ts";

export const typescriptPhase: Phase = {
  id: "react-typescript",
  slug: "typescript",
  courseId: "react",
  color: "ts",
  icon: "fa-gem",
  label: "TypeScript",
  title: "TypeScript avec React",
  summary:
    "TypeScript est devenu incontournable en production. Cette phase apprend à typer progressivement le code React pour des applications robustes, maintenables et documentées.",
  metaTags: [
    "3 modules",
    "~4 semaines",
    "2 projets portfolio",
    "TypeScript 5",
    "strict mode",
  ],
  modules: [module19, module20, module21],
};
