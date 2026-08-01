import type { Phase } from "@/types";
import { module11 } from "./modules/06-jsx-basics";
import { module12 } from "./modules/07-components-props";
import { module13 } from "./modules/08-use-state";
import { module14 } from "./modules/09-use-effect";
import { module15 } from "./modules/10-advanced-hooks";
import { module16 } from "./modules/11-react-router";
import { module17 } from "./modules/12-forms";
import { module18 } from "./modules/13-styling";

export const corePhase: Phase = {
  id: "react-core",
  slug: "core",
  courseId: "react",
  color: "core",
  icon: "fa-atom",
  label: "React Core",
  title: "React Core (JavaScript)",
  summary:
    "Master React from scratch: components, state, hooks, routing, and styling. The most important phase of the track: the foundations everything else rests on.",
  metaTags: ["8 modules", "~10 weeks", "2 portfolio projects", "React 18", "Vite"],
  modules: [
    module11,
    module12,
    module13,
    module14,
    module15,
    module16,
    module17,
    module18,
  ],
};
