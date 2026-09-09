import type { Module } from "@/types";
import { notificationsQuizzes } from "../quizzes";
import { notificationsExercises } from "../exercises";

export const notificationsModule04: Module = {
  id: "svc-notifications-m04",
  index: "04",
  title: "Orchestration",
  subtitle: "Déclencheurs métier → file d'attente → notification",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Chaîner événements métier, file d'attente et envoi",
    "Corréler notifications, paiement et connexion",
  ],
  content: [
    { kind: "title", text: "Du déclencheur à l'envoi" },
    {
      kind: "paragraph",
      html: "Le schéma fiable : <strong>événement métier</strong> (inscription, webhook de paiement signé, réinitialisation demandée) → <strong>file d'attente / tâche</strong> → appel au prestataire. Envoyer dans la requête HTTP bloque, dépasse le délai et double-clic. La tâche doit être <strong>idempotente</strong> (même clé / événement → pas de doublon indésirable) et relire les <strong>préférences</strong> avant l'envoi.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-link'></i> Corrélation",
        body: "Branche email de bienvenue / vérification sur la connexion, reçu sur le paiement confirmé. Pas sur la redirection d'expérience seule. Trois emails sur de vrais déclencheurs = cœur du projet P7.",
      },
    },
    {
      kind: "paragraph",
      html: "Nouvelles tentatives, file d'échecs et logs (sans secrets) complètent la chaîne. Si le processus de fond échoue après le webhook, le produit reste cohérent et la tâche peut rejouer sans déluge ni double effet métier.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-bolt'></i> Anti-pattern",
        body: "Email synchrone dans la route + reçu déclenché uniquement par <code>/success</code> + clé prestataire dans le navigateur. Audite et découple.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>Projet P7</strong> : 3 emails transactionnels (connexion + paiement) + préférences respectées + envoi découplé. Génère, puis audite sur le projet final.",
    },
  ],
  quiz: notificationsQuizzes.m04,
  exercises: [notificationsExercises.m04_projet],
};
