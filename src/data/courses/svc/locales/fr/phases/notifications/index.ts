import type { Phase } from "@/types";
import { notificationsModule01 } from "./modules/01-canaux-moments";
import { notificationsModule02 } from "./modules/02-provider-email";
import { notificationsModule03 } from "./modules/03-opt-in-preferences-abuse";
import { notificationsModule04 } from "./modules/04-orchestration";

/** Phase 7 : authored content (replaces the program-derived scaffold). */
export const notificationsPhase: Phase = {
  id: "svc-notifications",
  slug: "notifications",
  courseId: "svc",
  color: "eco",
  icon: "fa-envelope",
  label: "Phase 7",
  title: "Notifications",
  summary: "Faire de l'email (et des canaux associés) une partie du produit.",
  metaTags: ["produit", "lecture ~2h30", "audits interactifs", "notifications"],
  modules: [
    notificationsModule01,
    notificationsModule02,
    notificationsModule03,
    notificationsModule04,
  ],
  project: {
    title: "Projet P7 : Emails transactionnels + préférences",
    deliverable:
      "Le produit final avec trois emails transactionnels (connexion + paiement) et des préférences utilisateur respectées.",
    assessment: [
      "Trois emails branchés sur de vrais événements",
      "Préférences et désinscription respectées",
      "Envoi découplé (file d'attente / tâche), plutôt que dans la requête HTTP",
    ],
  },
};
