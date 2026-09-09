import type { Module } from "@/types";
import { dataQuizzes } from "../quizzes";
import { dataExercises } from "../exercises";

export const dataModule04: Module = {
  id: "svc-data-m04",
  index: "04",
  title: "Tâches & traitements asynchrones",
  subtitle: "Files légères, nouvelles tentatives, idempotence",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Découpler les traitements lents de la requête HTTP",
    "Concevoir des tâches idempotentes",
    "Gérer nouvelles tentatives et échecs",
  ],
  content: [
    { kind: "title", text: "Files légères" },
    {
      kind: "paragraph",
      html: "Emails, PDF, webhooks (notifications HTTP du prestataire) vers un <strong>prestataire tiers</strong> (Resend, Stripe… exemples du marché) : le travail lent ne doit pas bloquer la requête HTTP. Une <strong>file d'attente légère</strong> plus un <strong>processus de fond</strong> (worker) convient aux produits en début de vie : enfiler une tâche, répondre vite, traiter en asynchrone. Tu n'as pas besoin d'infra lourde dès le jour 1, en revanche tu as besoin d'un statut de tâche durable.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-bolt'></i> Découpler",
        body: "API = accepter et enregistrer l'intention. Processus de fond = parler aux services externes avec les secrets côté serveur. Même discipline indépendante du prestataire que pour la connexion et le stockage.",
      },
    },

    { kind: "title", text: "Idempotence et nouvelles tentatives" },
    {
      kind: "paragraph",
      html: "L'<strong>idempotence</strong>, c'est qu'un rejeu de tâche n'envoie pas deux emails ni ne facture deux fois (même entrée → même résultat, sans effet en double). Utilise des clés d'idempotence ou des contraintes d'unicité. Les <strong>nouvelles tentatives</strong> récupèrent les échecs passagers (délais dépassés, à-coups du prestataire) avec un délai croissant et un maximum de tentatives. Les échecs permanents doivent atterrir quelque part de visible (file d'échecs / état « failed »), autrement tu te retrouves dans une boucle silencieuse infinie.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-rotate'></i> Double soumission",
        body: "Sans idempotence, un rafraîchissement ou une nouvelle tentative devient deux effets de bord. L'IA « appelle juste send » dans le traitement de la requête, souvent sans clé.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-check'></i> <strong>Projet P5</strong> : opérations de base (CRUD) + envoi de fichier + une tâche asynchrone idempotente. Génère, puis audite avant Livraison sur le projet final.",
    },
  ],
  quiz: dataQuizzes.m04,
  exercises: [dataExercises.m04_projet],
};
