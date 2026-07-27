import type { Phase } from "@/types";
import { promptModule01 } from "./modules/01-besoin-mvp";
import { promptModule02 } from "./modules/02-techniques-prompt";
import { promptModule03 } from "./modules/03-contraintes-business";

/** Phase 2 : authored content (replaces the program-derived scaffold). */
export const promptPhase: Phase = {
  id: "svc-prompt",
  slug: "prompt",
  courseId: "svc",
  color: "core",
  icon: "fa-pen-to-square",
  label: "Phase 2",
  title: "Prompt & cadrage produit",
  summary:
    "Obtenir du bon code plus souvent : cadrer un MVP commercialisable avant de générer, avec briefs et prompts auditables.",
  metaTags: ["tronc commun", "lecture ~2h", "audits interactifs", "prompts"],
  modules: [promptModule01, promptModule02, promptModule03],
  project: {
    title: "Projet P2 : Feature CRUD générée par prompts documentés",
    deliverable:
      "Un brief / prompt CRUD enrichi (auth, business, envs) validé via l'audit « Projet P2 » du module 03.",
    assessment: [
      "Checklist prêt produit complète (pas un CRUD nu)",
      "Contraintes business et secrets hors code explicites",
      "Scope borné et auditable",
    ],
  },
};
