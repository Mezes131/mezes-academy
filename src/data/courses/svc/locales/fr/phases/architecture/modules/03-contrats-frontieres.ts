import type { Module } from "@/types";
import { architectureQuizzes } from "../quizzes";
import { architectureExercises } from "../exercises";

export const architectureModule03: Module = {
  id: "svc-architecture-m03",
  index: "03",
  title: "Contrats et frontières",
  subtitle: "Webhooks, ne pas traiter deux fois, délais et nouvelles tentatives",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Écrire des contrats d'API stables",
    "Concevoir un webhook qui ne double pas les effets",
    "Borner délais (timeouts) et nouvelles tentatives (retries)",
  ],
  content: [
    { kind: "title", text: "Contrats d'API stables" },
    {
      kind: "paragraph",
      html: "Un <strong>contrat</strong>, c'est l'accord : quelles entrées, quelles sorties, quelles erreurs, quelle version. Les deux côtés (interface et serveur, ou toi et un prestataire) peuvent évoluer sans se casser si le contrat est clair.",
    },
    {
      kind: "info",
      box: {
        variant: "note",
        title: "<i class='fa-solid fa-file-signature'></i> Stable ≠ figé pour toujours",
        body: "Tu peux versionner (v1, v2). Tu évites de changer le sens d'un champ en silence. L'IA doit respecter le contrat que tu as écrit, pas en inventer un autre.",
      },
    },

    { kind: "title", text: "Webhooks et « une seule fois »" },
    {
      kind: "paragraph",
      html: "Un <strong>webhook</strong> est une notification HTTP envoyée par un service externe (ex. paiement réussi). Tu vérifies la <strong>signature</strong> (preuve d'origine). Tu traites chaque événement <strong>au plus une fois</strong> (idempotence) : un doublon ne doit pas double-créditer.",
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-rotate'></i> <strong>Timeouts et retries</strong> : borner les attentes et les nouvelles tentatives, sinon un incident devient une avalanche d'appels.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-ban'></i> Anti-pattern",
        body: "Accepter le JSON tel quel sans signature, ou créditer à chaque réception du même événement. L'exercice webhook ci-dessous attaque ces deux erreurs.",
      },
    },
  ],
  quiz: architectureQuizzes.m03,
  exercises: [architectureExercises.m03_1],
};
