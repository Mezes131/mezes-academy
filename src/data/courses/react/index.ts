import type { Course } from "@/types";
import { reactMeta } from "./meta";
import { introPhase } from "./phases/intro";
import { corePhase } from "./phases/core";
import { typescriptPhase } from "./phases/typescript";
import { ecosystemPhase } from "./phases/ecosystem";
import { expertPhase } from "./phases/expert";
import { toolingPhase } from "./phases/tooling";

export const reactCourse: Course = {
  id: "react",
  slug: "react",
  meta: reactMeta,
  phases: [
    introPhase,
    corePhase,
    typescriptPhase,
    ecosystemPhase,
    expertPhase,
    toolingPhase,
  ],
};
