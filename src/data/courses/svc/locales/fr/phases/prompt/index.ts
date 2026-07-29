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
    "Obtenir du bon code plus souvent : cadrer un premier livrable vendable avant de générer, avec cahiers des charges et demandes à l'IA vérifiables.",
  metaTags: ["tronc commun", "lecture ~2h", "audits interactifs", "demandes à l'IA"],
  modules: [promptModule01, promptModule02, promptModule03],
  project: {
    title: "Projet P2 : CRUD via demandes documentées",
    deliverable:
      "Un cahier des charges / demande CRUD enrichi (connexion, business, environnements) validé via l'audit « Projet P2 » du module 03.",
    assessment: [
      "Liste prêt produit complète (pas un CRUD nu)",
      "Contraintes business et secrets hors code explicites",
      "Périmètre limité et vérifiable",
    ],
  },
};
