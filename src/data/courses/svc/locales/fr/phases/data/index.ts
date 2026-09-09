import type { Phase } from "@/types";
import { dataModule01 } from "./modules/01-modele-donnees";
import { dataModule02 } from "./modules/02-api-validation";
import { dataModule03 } from "./modules/03-storage-fichiers";
import { dataModule04 } from "./modules/04-jobs-async";

/** Phase 5 : authored content (replaces the program-derived scaffold). */
export const dataPhase: Phase = {
  id: "svc-data",
  slug: "data",
  courseId: "svc",
  color: "eco",
  icon: "fa-database",
  label: "Phase 5",
  title: "Données & serveur",
  summary: "Persistance, API et traitements asynchrones fiables pour le produit.",
  metaTags: ["produit", "lecture ~3h", "audits interactifs", "données"],
  modules: [dataModule01, dataModule02, dataModule03, dataModule04],
  project: {
    title:
      "Projet P5 : opérations métier + envoi de fichiers + tâche asynchrone",
    deliverable:
      "Le produit final enrichi : opérations de base métier (CRUD), envoi de fichiers et une tâche en arrière-plan, générés puis audités.",
    assessment: [
      "Validation serveur systématique",
      "Envoi de fichier avec contrôle d'accès prouvé",
      "Tâche asynchrone idempotente et rejouable",
    ],
  },
};
