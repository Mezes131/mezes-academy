import type { Module } from "@/types";
import { auditQualiteQuizzes } from "../quizzes";
import { auditQualiteExercises } from "../exercises";

export const auditQualiteModule03: Module = {
  id: "svc-audit-qualite-m03",
  index: "03",
  title: "Accessibilité",
  subtitle: "Contraste, clavier, libellés, focus clavier",
  duration: "40 min",
  difficulty: "intermediate",
  objectives: [
    "Vérifier contraste et navigation clavier",
    "Libeller correctement les contrôles",
    "Gérer le focus clavier",
  ],
  content: [
    { kind: "title", text: "Audit a11y de base" },
    {
      kind: "paragraph",
      html: "L'accessibilité n'est pas un bonus cosmétique : c'est un critère de qualité produit. Passe la liste de contrôle <strong>accessibility-baseline</strong> sur un parcours réel : <strong>contraste</strong>, <strong>navigation clavier</strong>, <strong>libellés</strong> (noms accessibles), <strong>gestion du focus clavier</strong> (surtout modales et multi-étapes).",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-keyboard'></i> Score ≠ parcours",
        body: "Un Lighthouse a11y vert peut cacher un ordre Tab cassé. Rejoue le flux au clavier et, si possible, avec un lecteur d'écran.",
      },
    },
    {
      kind: "paragraph",
      html: "Pièges générés par IA : <code>outline: none</code> global, boutons-icônes sans nom, <code>div</code> cliquables non focusables, focus clavier perdu après fermeture de modal. Corrige les <strong>bloqueurs</strong> avant de mettre en production.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-universal-access'></i> Minimum livrable",
        body: "Contraste OK, Tab jusqu'au bout, libellés présents, focus clavier visible et restauré. Ensuite, documente les écarts non bloquants.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-person-walking-with-cane'></i> <strong>Règle</strong> : liste de contrôle + clavier (+ lecteur d'écran) sur un parcours. Corrige les bloqueurs, sinon tu te contentes seulement du score.",
    },
  ],
  quiz: auditQualiteQuizzes.m03,
  exercises: [auditQualiteExercises.m03_1],
};
