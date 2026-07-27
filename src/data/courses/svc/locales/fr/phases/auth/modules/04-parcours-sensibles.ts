import type { Module } from "@/types";
import { authQuizzes } from "../quizzes";
import { authExercises } from "../exercises";

export const authModule04: Module = {
  id: "svc-auth-m04",
  index: "04",
  title: "Parcours sensibles",
  subtitle: "Reset, vérification email, sessions multi-appareil, checklist prod",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Sécuriser reset et vérification email",
    "Gérer sessions multi-appareil et révocation",
    "Valider une checklist auth avant prod",
  ],
  content: [
    { kind: "title", text: "Reset et vérification email" },
    {
      kind: "paragraph",
      html: "Reset de mot de passe et vérification d'email utilisent des <strong>jetons à usage unique</strong> (ou très limité) et à <strong>durée de vie courte</strong>. Un lien valable des semaines = porte ouverte. Laisse le provider gérer ces parcours quand tu le peux ; sinon audite chaque détail.",
    },

    { kind: "title", text: "Sessions et révocation" },
    {
      kind: "paragraph",
      html: "Multi-appareil : téléphone, laptop, tablette. Tu dois pouvoir <strong>déconnecter</strong> et <strong>révoquer</strong> une session (appareil perdu, suspicion d'intrusion). Sans ça, un jeton volé survit trop longtemps.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Zone admin",
        body: "Ce n'est pas une page cachée. Ce sont des routes et des données protégées serveur, avec une politique d'accès écrite (qui peut quoi).",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>Projet P4</strong> : la checklist ci-dessous est ton filet avant la Livraison de l'incrément auth du capstone.",
    },
  ],
  quiz: authQuizzes.m04,
  exercises: [authExercises.m04_projet],
};
