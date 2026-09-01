import type { Module } from "@/types";
import { fondationsQuizzes } from "../quizzes";
import { fondationsExercises } from "../exercises";

export const fondationsModule01: Module = {
  id: "svc-fondations-m01",
  index: "01",
  title: "Le vibe coding : promesses et pièges",
  subtitle: "Ce que l'IA fait bien, ce qu'elle rate, et qui est responsable",
  duration: "25 min",
  difficulty: "intro",
  openByDefault: true,
  video: {
    status: "ready",
    full: {
      provider: "minio",
      providerId: "courses/svc/phase-fondations/modules/svc-fondations-m01.mp4",
      title: "Le vibe coding : promesses et pièges",
      mimeType: "video/mp4",
    },
  },
  objectives: [
    "Situer les outils : de la suggestion d'une ligne jusqu'à l'agent autonome",
    "Repérer les échecs typiques du code généré",
    "Assumer la responsabilité finale : c'est toi qui signes",
  ],
  content: [
    { kind: "title", text: "Du plus guidé au plus autonome" },
    {
      kind: "paragraph",
      html: "« Vibe coding », ici, ce n'est pas « laisser l'IA coder à ta place ». C'est <strong>générer vite, puis vérifier comme un professionnel</strong>. Les outils vont du plus simple au plus autonome : suggestion d'une ligne pendant que tu tapes, chat pour poser une question, assistant dans l'éditeur (plusieurs fichiers), jusqu'aux <em>agents</em> qui lisent, écrivent et lancent des commandes avec peu de supervision.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-gauge-high'></i> Plus l'outil agit seul, plus tu dois vérifier",
        body: "Une mauvaise suggestion coûte une ligne. Un agent mal cadré peut réécrire ta connexion utilisateur, enregistrer un secret dans l'historique Git, et proposer des milliers de lignes d'un coup. D'où le cycle Prompt → Audit → Livraison (cadrer, vérifier, livrer).",
      },
    },

    { kind: "title", text: "Forces et angles morts" },
    {
      kind: "paragraph",
      html: "L'IA est forte pour le <strong>code de départ répétitif</strong>, les API courantes, les réécritures mécaniques, les explications. Elle rate souvent : les règles métier non écrites, les failles subtiles (connexion, CORS, secrets), la sur-ingénierie inutile, et le code <strong>plausible mais faux</strong> qui survit à un regard rapide.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-eye'></i> <strong>Réflexe</strong> : si tu n'as pas lu l'aperçu des changements, tu n'as pas livré. Tu as espéré.",
    },

    { kind: "title", text: "Le développeur signe" },
    {
      kind: "paragraph",
      html: "En production, le fournisseur du modèle ne porte pas ton incident Stripe. <strong>Toi (ou ton équipe) signes l'intégration, le déploiement, la promesse client.</strong> Les échecs du vibe coding sans filet se ressemblent : confiance aveugle, demande floue, revue zappée. Cette formation existe pour casser ce schéma.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-triangle-exclamation'></i> Pièges à nommer tout de suite",
        body: "Confiance aveugle · code non lu · demande floue. Tu les retrouveras dans l'exercice d'autopsie ci-dessous.",
      },
    },
  ],
  quiz: fondationsQuizzes.m01,
  exercises: [fondationsExercises.m01_1],
};
