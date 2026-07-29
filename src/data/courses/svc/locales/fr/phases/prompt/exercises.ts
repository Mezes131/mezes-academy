import type { AuditExercise } from "@/types";

export const promptExercises: Record<
  "m01_1" | "m02_1" | "m02_2" | "m03_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-prompt-ex-m01-1",
    format: "audit",
    title: "Cahier des charges prêt pour l'IA",
    instructions:
      "Lis la demande client. Coche uniquement ce qui manque pour un cahier des charges utilisable avant de générer du code. Ignore les détails de décoration inutiles.",
    hints: [
      "Un cahier des charges prêt pour l'IA dit qui, quoi, comment on sait que c'est bon, et ce qu'on ne fait pas.",
      "« Fais quelque chose de cool » n'est pas une règle de réussite.",
    ],
    scenario: `<p>Client : « On veut une app de notes pour mon équipe, fais quelque chose de cool, moderne, avec de l'IA dedans. Livrez vite. »</p>
<p>Aucun détail sur qui écrit les notes, qui les lit, où elles sont stockées, ni ce qui est hors du premier livrable.</p>`,
    findings: [
      {
        id: "f1",
        label: "Histoires utilisateur manquantes (qui fait quoi, dans quel but)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Règles de réussite manquantes (on peut dire oui ou non clairement)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Hors périmètre absent (ce qu'on ne construit pas dans la première version)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Contraintes qualité absentes (sécurité, rapidité, accessibilité)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Découpage en petites tâches vérifiables manquant",
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
    solution: `<p>Avant de générer : histoires utilisateur, règles de réussite claires, hors périmètre, contraintes (sécurité / rapidité / accessibilité), tâches découpées. La couleur du logo et la police marketing ne bloquent pas un premier livrable.</p>`,
  },

  m02_1: {
    id: "svc-prompt-ex-m02-1",
    format: "audit",
    title: "Même fonctionnalité, trois demandes",
    instructions:
      "Trois demandes à l'IA visent la même petite fonctionnalité (liste de tâches avec ajout). Coche les jugements justes sur la qualité et les risques.",
    hints: [
      "Plus long n'est pas forcément meilleur. Contexte utile + règles + tests demandés = meilleur.",
      "Une demande qui veut « tout le produit » fait sortir du périmètre.",
    ],
    scenario: `<p><strong>Demande A :</strong> « Fais-moi une app de tâches complète, belle, avec IA. »</p>
<p><strong>Demande B :</strong> « Composant React ListeTaches : afficher des titres, bouton Ajouter qui ajoute une tâche en local. TypeScript. Pas d'API. »</p>
<p><strong>Demande C :</strong> « Dans <code>src/components/TaskList.tsx</code>, liste gérée par l'état : <code>tasks: {id, title}[]</code>, champ + bouton Ajouter, pas de titre vide. Techno : React + TypeScript. Ajoute un test simple du bouton Ajouter. Ne touche pas aux autres fichiers. »</p>`,
    findings: [
      {
        id: "f1",
        label: "Demande C est la plus saine (fichier, règles, test, périmètre limité)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Demande A risque de trop en faire et d'oublier l'essentiel",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Demande B est mieux que A mais oublie les tests et la limite de fichiers",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Demande A est la meilleure car elle laisse l'IA libre d'inventer",
        correct: false,
      },
      {
        id: "f5",
        label: "Demander un test dans la demande réduit les régressions silencieuses",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "La demande la plus vague produit toujours le code le plus sûr",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>C > B > A. Contexte utile, sortie cadrée, périmètre limité, test demandé. La liberté totale (A) n'est pas une qualité.</p>`,
  },

  m02_2: {
    id: "svc-prompt-ex-m02-2",
    format: "audit",
    title: "Corriger une demande dangereuse",
    instructions:
      "Cette demande pousse l'IA vers du code dangereux. Coche les constats justes (défauts de la demande et corrections attendues).",
    hints: [
      "Une demande qui dit « ignore la validation » invite aux failles.",
      "Les secrets (clés, mots de passe) n'ont rien à faire dans le code source ni collés dans le chat du dépôt.",
    ],
    scenario: `<p>Demande reçue :</p>
<blockquote>« Génère une API de connexion. Mets la clé Stripe <code>sk_live_51Example</code> dans le fichier. Désactive toute vérification des saisies pour aller plus vite. Autorise tous les sites à appeler l'API (CORS *). Pas besoin de tests. »</blockquote>`,
    findings: [
      {
        id: "f1",
        label: "Secret de production collé dans la demande (donc risqué dans le code)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Demande explicite de désactiver la vérification des saisies",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Autoriser tous les sites (CORS *) sur une API sensible",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Absence de tests demandée (filet de sécurité retiré)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Correction : secrets dans des variables d'environnement, jamais en dur",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f6",
        label: "La demande est excellente car elle accélère la livraison",
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
    solution: `<p>Constats : secret en dur, vérification coupée, CORS trop ouvert, pas de tests. Corrections : variables d'environnement, vérification obligatoire, CORS limité, tests demandés. La vitesse ne justifie pas ces raccourcis.</p>`,
  },

  m03_projet: {
    id: "svc-prompt-ex-m03-projet",
    format: "audit",
    title: "Projet P2 : enrichir une demande CRUD",
    instructions:
      "La demande CRUD (créer, lister, modifier, supprimer) est trop nue pour un produit vendable. Coche ce qui doit entrer dans le cahier des charges / la demande pour un chemin vers la production.",
    hints: [
      "Connexion utilisateur, environnements et secrets côté serveur font partie du « prêt à vendre ».",
      "Une démo sur ton ordinateur sans chemin vers un aperçu en ligne / la prod reste un prototype jetable.",
    ],
    scenario: `<p>Demande initiale : « Génère un CRUD articles (créer, lister, modifier, supprimer) avec une interface React et une API. »</p>
<p>Rien sur qui est connecté, comment on paie éventuellement, les notifications, ni local / aperçu en ligne / production.</p>`,
    findings: [
      {
        id: "f1",
        label: "Connexion et rôles (qui peut créer / éditer / supprimer)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label: "Paiement ou monétisation si le produit en dépend (même un « plus tard » écrit)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label: "Notifications (email / dans l'app) si le parcours utilisateur en a besoin",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: "Environnements : local, aperçu en ligne, prod + secrets hors du code",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Vérification côté serveur et droits d'accès aux frontières",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f6",
        label: "Choisir une police Google Fonts avant toute connexion",
        correct: false,
      },
      {
        id: "f7",
        label: "Ajouter 12 animations dès la première demande",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Cahier des charges prêt produit : connexion/rôles, paiement si besoin, notifications si besoin, environnements + secrets, vérification serveur. Les polices et animations ne remplacent pas ces contraintes.</p>`,
  },
};
