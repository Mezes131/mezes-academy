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
  title: "TypeScript with React",
  summary:
    "TypeScript has become essential in production. This phase teaches you to gradually type React code for robust, maintainable, documented apps.",
  metaTags: [
    "3 modules",
    "~4 weeks",
    "2 portfolio projects",
    "TypeScript 5",
    "strict mode",
  ],
  modules: [module19, module20, module21],
};
