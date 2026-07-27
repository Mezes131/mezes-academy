import type { Module } from "@/types";
import { authQuizzes } from "../quizzes";
import { authExercises } from "../exercises";

export const authModule04: Module = {
  id: "svc-auth-m04",
  index: "04",
  title: "Parcours sensibles",
  subtitle: "Réinitialisation, vérification email, plusieurs appareils, liste avant production",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Sécuriser réinitialisation et vérification email",
    "Gérer plusieurs appareils et la coupure de connexion",
    "Valider une liste de contrôle avant production",
  ],
  content: [
    { kind: "title", text: "Réinitialisation et vérification email" },
    {
      kind: "paragraph",
      html: "Réinitialisation du mot de passe et vérification d'email utilisent des <strong>jetons à usage unique</strong> (ou très limité) et à <strong>durée de vie courte</strong>. Un lien valable des semaines = porte ouverte. Laisse le service de connexion gérer ces parcours quand tu le peux ; sinon audite chaque détail.",
    },

    { kind: "title", text: "Plusieurs appareils et coupure" },
    {
      kind: "paragraph",
      html: "Téléphone, ordinateur portable, tablette : tu dois pouvoir <strong>déconnecter</strong> et <strong>couper</strong> une connexion (appareil perdu, suspicion d'intrusion). Sans ça, un jeton volé survit trop longtemps.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Espace d'administration",
        body: "Ce n'est pas une page cachée. Ce sont des adresses d'API et des données protégées serveur, avec des règles d'accès écrites (qui peut quoi).",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>Projet P4</strong> : la liste de contrôle ci-dessous est ton filet avant la Livraison de l'incrément connexion du projet final.",
    },
  ],
  quiz: authQuizzes.m04,
  exercises: [authExercises.m04_projet],
};
