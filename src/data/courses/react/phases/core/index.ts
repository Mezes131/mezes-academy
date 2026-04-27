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
    "Maîtriser React de zéro : composants, state, hooks, routing et styling. La phase la plus importante du parcours : les fondations sur lesquelles tout repose.",
  metaTags: ["8 modules", "~10 semaines", "2 projets portfolio", "React 18", "Vite"],
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
