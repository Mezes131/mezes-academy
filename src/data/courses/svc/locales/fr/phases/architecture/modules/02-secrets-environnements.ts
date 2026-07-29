import type { Module } from "@/types";
import { architectureQuizzes } from "../quizzes";
import { architectureExercises } from "../exercises";

export const architectureModule02: Module = {
  id: "svc-architecture-m02",
  index: "02",
  title: "Secrets et config par environnement",
  subtitle: "Local, aperçu en ligne, production : qui voit quoi",
  duration: "35 min",
  difficulty: "intermediate",
  objectives: [
    "Distinguer variables figées au build et variables lues à l'exécution",
    "Organiser local / aperçu en ligne / production",
    "Éviter les fuites via images Docker et journaux de CI",
  ],
  content: [
    { kind: "title", text: "Figé au build vs lu à l'exécution" },
    {
      kind: "paragraph",
      html: "Certaines valeurs sont <strong>collées dans le paquet au moment du build</strong> (souvent visibles ensuite, surtout côté navigateur). D'autres sont <strong>lues au démarrage du serveur</strong> depuis l'environnement. Les secrets appartiennent à la deuxième famille.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-eye'></i> Piège côté interface",
        body: "Une clé collée dans une variable de construction de l'interface finit souvent dans le paquet navigateur. Quiconque ouvre les outils de développement peut la lire.",
      },
    },

    { kind: "title", text: "Environnements et fuites" },
    {
      kind: "paragraph",
      html: "Trois jeux minimum : <strong>local</strong> (ton ordinateur), <strong>aperçu en ligne</strong> (démo temporaire), <strong>production</strong>. Chacun a ses variables. Tu ne recycles pas la clé live de prod sur chaque laptop.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-key'></i> <strong>Règle</strong> : secrets injectés à l'exécution, jamais gravés dans l'image Docker ni imprimés dans les journaux de CI.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-table'></i> Matrice",
        body: "Pour chaque secret : dans quel environnement ? côté serveur ou public ? Qui a le droit de le lire ? L'exercice ci-dessous t'entraîne.",
      },
    },
  ],
  quiz: architectureQuizzes.m02,
  exercises: [architectureExercises.m02_1],
};
