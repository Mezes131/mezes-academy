import type { Module } from "@/types";
import { shipQuizzes } from "../quizzes";
import { shipExercises } from "../exercises";

export const shipModule03: Module = {
  id: "svc-ship-m03",
  index: "03",
  title: "Preuves de livraison",
  subtitle: "Journal des changements, tests de santé, dossier de livraison",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Tenir un journal des changements",
    "Automatiser des tests rapides de santé",
    "Assembler le dossier de livraison",
  ],
  content: [
    { kind: "title", text: "Livrer avec preuves" },
    {
      kind: "paragraph",
      html: "« C'est déployé » ne veut pas dire « c'est livré commercialement ». Un <strong>journal des changements</strong> dit ce qui a changé pour les utilisateurs / l'exploitation. Des <strong>tests de fumée</strong> (<em>smoke tests</em> : tests rapides de santé) vérifient vite les parcours critiques après déploiement.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-folder-open'></i> Dossier de livraison",
        body: "Rassembler URL publique, plans et offre tarifaire, preuves d'audit (P8–P9), fiche d'incident (P11). Ce sont des artefacts vérifiables, et non une capture d'écran de la page d'accueil.",
      },
    },
    {
      kind: "paragraph",
      html: "Le <strong>dossier de livraison</strong> P12 prouve que l'offre est commercialisable : page des tarifs en ligne avec appel à l'action, socle légal/support, preuves techniques. Le format du dossier est libre (dépôt, Notion, PDF) : c'est le contenu qui compte.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-rocket'></i> Illusion « livré »",
        body: "Sans journal des changements, sans tests de santé et sans dossier, tu as un déploiement, mais pas encore une livraison commerciale.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>Règle</strong> : journal des changements + tests de santé + dossier vérifiable. Ce sont les preuves de la livraison.",
    },
  ],
  quiz: shipQuizzes.m03,
  exercises: [shipExercises.m03_projet],
};
