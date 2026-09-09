import type { Module } from "@/types";
import { hebergementQuizzes } from "../quizzes";
import { hebergementExercises } from "../exercises";

export const hebergementModule03: Module = {
  id: "svc-hebergement-m03",
  index: "03",
  title: "CI/CD minimal",
  subtitle: "Build, test, déploiement, retour en arrière : et bloquer sur audit",
  duration: "45 min",
  difficulty: "intermediate",
  objectives: [
    "Mettre en place une chaîne build/test/déploiement",
    "Bloquer le déploiement sur lint ou audit rouge",
    "Savoir revenir en arrière",
  ],
  content: [
    { kind: "title", text: "Chaîne de déploiement minimale" },
    {
      kind: "paragraph",
      html: "Automatise le chemin critique : <strong>build</strong> → <strong>tests</strong> → <strong>déploiement</strong>. Avant la prod, des <strong>contrôles (gates)</strong> — barrières avant déploiement : lint, audit deps, scan de secrets. Rouge = <strong>refus</strong> de déployer. Vert ≠ permission d'ignorer le reste : c'est seulement le filet minimal.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Pièges",
        body: "Déployer sans contrôle, sans stratégie de retour en arrière, ou en se disant « on verra si ça casse » : ce sont les classiques de la livraison précipitée.",
      },
    },
    {
      kind: "paragraph",
      html: "Le <strong>retour en arrière (rollback)</strong> fait partie du design : version précédente, artefact versionné, ou revert contrôlé, documenté et testable. Une chaîne qui refuse un secret ou un lint rouge vaut mieux qu'un déploiement « jaune » en prod.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-rotate-left'></i> Retour en arrière",
        body: "Écris en une page : comment revenir en arrière en &lt; 15 min. Si tu ne sais pas, tu n'es pas prêt à déployer.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-gears'></i> <strong>Règle</strong> : build/test/déploiement + contrôles bloquants + retour en arrière connu. Autrement dit, pas de push aveugle sur prod.",
    },
  ],
  quiz: hebergementQuizzes.m03,
  exercises: [hebergementExercises.m03_1],
};
