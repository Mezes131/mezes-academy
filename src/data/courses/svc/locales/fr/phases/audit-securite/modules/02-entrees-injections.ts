import type { Module } from "@/types";
import { auditSecuriteQuizzes } from "../quizzes";
import { auditSecuriteExercises } from "../exercises";

export const auditSecuriteModule02: Module = {
  id: "svc-audit-securite-m02",
  index: "02",
  title: "Entrées utilisateur et injections",
  subtitle: "SQL, NoSQL, commandes, XSS, envois de fichiers",
  duration: "50 min",
  difficulty: "intermediate",
  objectives: [
    "Valider aux frontières systématiquement",
    "Détecter injections SQL/NoSQL/commande",
    "Auditer les XSS côté interface",
  ],
  content: [
    { kind: "title", text: "Injections" },
    {
      kind: "paragraph",
      html: "Toute entrée (query, body, header, fichier) est <strong>hostile</strong> jusqu'à preuve du contraire. Valide aux <strong>frontières</strong> côté serveur : schémas, types, listes d'autorisation. L'injection <strong>SQL/NoSQL</strong> naît de la concaténation ; le correctif de base = <strong>requêtes paramétrées</strong> (ou ORM utilisé correctement). L'injection de <strong>commande</strong> naît d'un <code>exec</code> / shell avec entrée utilisateur : préfère donc des APIs qui n'ouvrent pas de shell.",
    },
    {
      kind: "info",
      box: {
        variant: "warn",
        title: "<i class='fa-solid fa-robot'></i> Piège IA",
        body: "L'IA génère volontiers `WHERE id = ${id}` ou `exec(\`ping ${host}\`)` « pour aller vite ». Refuse la concaténation. L'interface n'est pas une frontière de confiance.",
      },
    },
    { kind: "title", text: "XSS et envois de fichiers" },
    {
      kind: "paragraph",
      html: "<strong>XSS</strong> : du HTML ou script non contrôlé rendu dans le DOM. En React, <code>dangerouslySetInnerHTML</code> avec du contenu utilisateur non sanitisé ouvre une porte. Pour les <strong>envois de fichiers</strong> : ne fais pas confiance au MIME client ; limite taille/type, noms non fiables, stockage hors exécution.",
    },
    {
      kind: "info",
      box: {
        variant: "tip",
        title: "<i class='fa-solid fa-broom'></i> Sorties HTML",
        body: "Texte échappé par défaut. Si tu dois rendre du HTML riche : sanitize strict, CSP en défense en profondeur.",
      },
    },
    {
      kind: "highlight",
      html: "<i class='fa-solid fa-syringe'></i> <strong>Règle</strong> : valider à l'entrée, paramétrer les requêtes, ne jamais injecter de HTML brut non fiable.",
    },
  ],
  quiz: auditSecuriteQuizzes.m02,
  exercises: [auditSecuriteExercises.m02_1, auditSecuriteExercises.m02_2],
};
