import type { Module } from "@/types";
import { opsQuizzes } from "../quizzes";
import { opsExercises } from "../exercises";

export const opsModule01: Module = {
  id: "svc-ops-m01",
  index: "01",
  title: "Logs utiles",
  subtitle: "Corrélation requête / utilisateur, jamais de secrets",
  duration: "30 min",
  difficulty: "intermediate",
  openByDefault: true,
  objectives: [
    "Structurer des logs corrélés",
    "Garantir zéro secret dans les logs",
  ],
  content: [
    { kind: "title", text: "Logs qui servent" },
    {
      kind: "paragraph",
      html: "Quand ça casse, tu as besoin de <strong>traces exploitables</strong>, et non d'un mur de <code>console.log</code>. Des <strong>logs structurés</strong> (champs : niveau, événement, message, ids) se filtrent dans n'importe quel agrégateur. La <strong>corrélation requête / utilisateur</strong> relie les étapes d'un même parcours.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-key'></i> Zéro secret",
        body: "Jeton, mot de passe, clé API, corps de paiement brut : hors logs. Les plateformes de logs sont une surface d'attaque. Masque les données sensibles avant d'émettre.",
      },
    },
    {
      kind: "paragraph",
      html: "Sur un flux <strong>auth</strong> ou <strong>paiement</strong>, nomme les événements (<code>checkout.started</code>, <code>webhook.received</code>, <code>auth.failed</code>) avec résultat et ids, plutôt qu'un simple « erreur ». Indépendant du fournisseur : le format compte plus que l'outil.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-link'></i> Corrélation",
        body: "Propager un <code>requestId</code> (et un <code>userId</code> quand pertinent) du front au back et aux webhooks (notifications HTTP du prestataire). Sans ça, le débogage devient une chasse au hasard.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-clipboard-list'></i> <strong>Règle</strong> : logs structurés + corrélation + zéro secret ; sinon ce n'est pas de l'observabilité.",
    },
  ],
  quiz: opsQuizzes.m01,
  exercises: [opsExercises.m01_1],
};
