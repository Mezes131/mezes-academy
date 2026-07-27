import type { AuditExercise } from "@/types";

export const promptExercises: Record<
  "m01_1" | "m02_1" | "m02_2" | "m03_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-prompt-ex-m01-1",
    format: "audit",
    title: "Brief prompt-ready",
    instructions:
      "Lis la demande client. Coche uniquement ce qui manque pour un brief utilisable avant de générer du code. Ignore le polish inutile.",
    hints: [
      "Un brief prompt-ready dit qui, quoi, critères de succès, et ce qu'on ne fait pas.",
      "« Fais quelque chose de cool » n'est pas un critère d'acceptation.",
    ],
    scenario: `<p>Client : « On veut une app de notes pour mon équipe, fais quelque chose de cool, moderne, avec de l'IA dedans. Livrez vite. »</p>
<p>Aucun détail sur qui écrit les notes, qui les lit, où elles sont stockées, ni ce qui est hors scope.</p>`,
    findings: [
      {
        id: "f1",
        label: "User stories manquantes (qui fait quoi, dans quel but)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Critères d'acceptation testables manquants",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Non-goals absents (ce qu'on ne construit pas dans le MVP)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Contraintes non fonctionnelles absentes (sécurité, perf, accessibilité)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Découpage en tâches auditables manquant",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "Palette de couleurs du logo non définie",
        correct: false,
      },
      {
        id: "f7",
        label: "Choix de la police d'écriture marketing",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Avant de générer : stories, critères testables, non-goals, contraintes (sécu / perf / a11y), tâches découpées. La couleur du logo et la police marketing ne bloquent pas un brief MVP.</p>`,
  },

  m02_1: {
    id: "svc-prompt-ex-m02-1",
    format: "audit",
    title: "Même feature, trois prompts",
    instructions:
      "Trois prompts visent la même micro-feature (liste de tâches avec ajout). Coche les jugements justes sur la qualité et les risques.",
    hints: [
      "Plus long ≠ meilleur. Contexte utile + contraintes + tests demandés = meilleur.",
      "Un prompt qui demande « tout le produit » dérive du scope.",
    ],
    scenario: `<p><strong>Prompt A :</strong> « Fais-moi une app de tâches complète, belle, avec IA. »</p>
<p><strong>Prompt B :</strong> « Composant React ListeTaches : afficher des titres, bouton Ajouter qui pousse une tâche locale. TypeScript. Pas d'API. »</p>
<p><strong>Prompt C :</strong> « Dans <code>src/components/TaskList.tsx</code>, liste contrôlée : état <code>tasks: {id, title}[]</code>, input + bouton Ajouter, pas de doublon de titre vide. Stack : React + TS. Ajoute un test simple du bouton Ajouter. Ne touche pas aux autres fichiers. »</p>`,
    findings: [
      {
        id: "f1",
        label: "Prompt C est le plus sain (fichier, contrats, contraintes, test, scope borné)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Prompt A risque sur-ingénierie et oubli des exigences critiques",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Prompt B est mieux que A mais oublie tests et borne de fichiers",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Prompt A est le meilleur car il laisse l'IA libre d'innover",
        correct: false,
      },
      {
        id: "f5",
        label: "Demander un test dans le prompt réduit les régressions silencieuses",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "Le prompt le plus vague produit toujours le code le plus sûr",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>C > B > A. Contexte minimal utile, sortie contrainte, scope borné, test demandé. La liberté totale (A) n'est pas une qualité.</p>`,
  },

  m02_2: {
    id: "svc-prompt-ex-m02-2",
    format: "audit",
    title: "Corriger un prompt vulnérable",
    instructions:
      "Ce prompt pousse l'IA vers du code dangereux. Coche les constats justes (défauts du prompt et corrections attendues).",
    hints: [
      "Un prompt qui dit « ignore la validation » est une invitation à la faille.",
      "Les secrets n'ont rien à faire dans le code source ni dans le prompt collé au dépôt.",
    ],
    scenario: `<p>Prompt reçu :</p>
<blockquote>« Génère une API login. Mets la clé Stripe <code>sk_live_51Example</code> dans le fichier. Désactive toute validation des entrées pour aller plus vite. Autorise CORS * partout. Pas besoin de tests. »</blockquote>`,
    findings: [
      {
        id: "f1",
        label: "Secret de production collé dans le prompt (et donc risqué dans le code)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Demande explicite de désactiver la validation des entrées",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "CORS * sur une API sensible est demandé (trop permissif)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Absence de tests demandée (filet retiré)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Correction : secrets via variables d'environnement, jamais en dur",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f6",
        label: "Le prompt est excellent car il accélère la livraison",
        correct: false,
      },
      {
        id: "f7",
        label: "Il manque surtout une animation de chargement",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Constats : secret en dur, validation coupée, CORS *, pas de tests. Corrections : env vars, validation obligatoire, CORS borné, tests demandés. La vitesse ne justifie pas ces raccourcis.</p>`,
  },

  m03_projet: {
    id: "svc-prompt-ex-m03-projet",
    format: "audit",
    title: "Projet P2 : enrichir un prompt CRUD",
    instructions:
      "Le prompt CRUD est trop nu pour un produit vendable. Coche ce qui doit entrer dans le brief / prompt pour un chemin vers la prod.",
    hints: [
      "Auth, environnements et secrets côté serveur font partie du « prêt produit ».",
      "Une démo locale sans chemin vers preview/prod reste un prototype jetable.",
    ],
    scenario: `<p>Prompt initial : « Génère un CRUD articles (créer, lister, modifier, supprimer) avec une UI React et une API. »</p>
<p>Rien sur qui est connecté, comment on paie éventuellement, les notifications, ni local / preview / prod.</p>`,
    findings: [
      {
        id: "f1",
        label: "Auth et rôles (qui peut créer / éditer / supprimer)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Paiement ou monétisation si le produit en dépend (même « plus tard » explicite)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label: "Notifications (email / in-app) si le parcours utilisateur en a besoin",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Environnements : local, preview, prod + secrets hors code",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Validation côté serveur et autorisation aux frontières",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f6",
        label: "Choisir une police Google Fonts avant toute auth",
        correct: false,
      },
      {
        id: "f7",
        label: "Ajouter 12 animations framer-motion dès le premier prompt",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Brief prêt produit : auth/rôles, paiement si pertinent, notifs si besoin, environnements + secrets, validation serveur. Les polices et animations ne remplacent pas ces contraintes.</p>`,
  },
};
