import type { Phase } from "@/types";
import { auditSecuriteModule01 } from "./modules/01-secrets-configuration";
import { auditSecuriteModule02 } from "./modules/02-entrees-injections";
import { auditSecuriteModule03 } from "./modules/03-authz-surfaces-api";
import { auditSecuriteModule04 } from "./modules/04-dependances-supply-chain";

/** Phase 8 : authored content (replaces the program-derived scaffold). */
export const auditSecuritePhase: Phase = {
  id: "svc-audit-securite",
  slug: "audit-securite",
  courseId: "svc",
  color: "expert",
  icon: "fa-shield-halved",
  label: "Phase 8",
  title: "Audit Sécurité",
  summary:
    "Appliquer la liste de contrôle Security baseline au produit. Cœur « Secure » du positionnement.",
  metaTags: ["sécurité", "lecture ~3h", "audits interactifs", "baseline"],
  modules: [
    auditSecuriteModule01,
    auditSecuriteModule02,
    auditSecuriteModule03,
    auditSecuriteModule04,
  ],
  project: {
    title: "Projet P8 : Rapport Security baseline",
    deliverable:
      "Le rapport Security baseline du produit capstone : preuves, correctifs appliqués, points restants.",
    assessment: [
      "Liste de contrôle security-baseline entièrement passée",
      "Chaque constat a une preuve et un correctif",
      "Aucune faille critique ouverte",
    ],
  },
};
