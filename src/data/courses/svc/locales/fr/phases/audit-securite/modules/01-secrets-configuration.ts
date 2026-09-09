import type { Module } from "@/types";
import { auditSecuriteQuizzes } from "../quizzes";
import { auditSecuriteExercises } from "../exercises";

export const auditSecuriteModule01: Module = {
  id: "svc-audit-securite-m01",
  index: "01",
  title: "Secrets et configuration",
  subtitle: "Les secrets en dur que l'IA colle sans prévenir",
  duration: "40 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Détecter les secrets en dur dans un dépôt",
    "Organiser coffres et rotation",
    "Verrouiller .gitignore et .dockerignore",
  ],
  content: [
    { kind: "title", text: "Secrets en dur" },
    {
      kind: "paragraph",
      html: "Un <strong>secret en dur</strong>, c'est une clé API, un jeton ou un mot de passe collé dans le code, un fichier de config, un Dockerfile ou un README « d'exemple ». L'IA le fait souvent : elle copie un extrait et laisse une clé qui <em>ressemble</em> à du vrai. Dès qu'un secret live est versionné, traite-le comme <strong>compromis</strong>.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Historique git",
        body: "Effacer la ligne dans le commit suivant ne suffit pas : le blob reste dans l'historique. Rotation (révocation) obligatoire. Ensuite ignore + coffre.",
      },
    },
    { kind: "title", text: "Coffres et rotation" },
    {
      kind: "paragraph",
      html: "Stocke les secrets dans un <strong>coffre</strong> ou les variables d'environnement de la plateforme (lues <strong>à l'exécution</strong>), autrement dit jamais dans le dépôt. <strong>Moindre accès</strong> : chaque secret n'est lisible que par le service qui en a besoin. Sépare local / environnement d'aperçu / production. Quand une fuite est suspectée : <strong>tourne</strong> immédiatement.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-shield'></i> Fichiers d'exclusion",
        body: ".gitignore pour .env et dérivés. .dockerignore pour ne pas COPY les secrets dans l'image. Scanne le dépôt (gitleaks, etc.) avant de mettre en production.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-key'></i> <strong>Règle</strong> : placeholders dans le code, secrets à l'exécution, rotation si exposition. Autrement dit, jamais de clé live dans git.",
    },
  ],
  quiz: auditSecuriteQuizzes.m01,
  exercises: [auditSecuriteExercises.m01_1],
};
