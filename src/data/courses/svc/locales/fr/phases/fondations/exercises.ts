import type { AuditExercise } from "@/types";

export const fondationsExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m03_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-fondations-ex-m01-1",
    format: "audit",
    title: "Autopsie d'un incident IA",
    instructions:
      "Lis le scénario. Coche uniquement les constats qui tiennent. Attribue une gravité cohérente. Soumets ton rapport.",
    hints: [
      "Une clé secrète écrite en dur dans le dépôt est presque toujours critique ou haute.",
      "Un commentaire TODO n'est pas une faille de sécurité à elle seule.",
    ],
    scenario: `<p>Une startup a laissé un agent IA « finir » la connexion utilisateur. Deux jours après la mise en ligne, un bot parcourt le dépôt public miroir et trouve une clé Stripe <code>sk_live_…</code> enregistrée dans l'historique Git, dans <code>src/lib/payments.ts</code>. Des paiements frauduleux apparaissent. Personne n'avait lu l'aperçu des 1800 lignes de changements.</p>
<p>Identifie les causes racines et signaux manqués (pas les symptômes marketing).</p>`,
    findings: [
      {
        id: "f1",
        label: "Secret de production enregistré dans le code source",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Gros lot de changements accepté sans revue humaine ligne à ligne",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label: "Pas de scan automatique de secrets avant d'intégrer le code",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Le framework React est obsolète",
        correct: false,
      },
      {
        id: "f5",
        label: "Le README utilise trop d'emojis",
        correct: false,
      },
      {
        id: "f6",
        label: "Responsabilité déléguée à l'agent (« l'IA a généré, donc ce n'est pas nous »)",
        correct: true,
        minSeverity: "medium",
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Constats attendus : secret en dur (critique), changements non relus (haute), pas de scan secrets avant intégration (haute), déni de responsabilité (moyenne). Les distracteurs UI/README ne sont pas des causes de cet incident.</p>`,
  },

  m02_1: {
    id: "svc-fondations-ex-m02-1",
    format: "audit",
    title: "Cycle Prompt → Audit → Livraison sur un formulaire contact",
    instructions:
      "Tu dois livrer un formulaire de contact. Coche les étapes réellement présentes dans une boucle saine. Ignore ce qui relève du tunnel.",
    hints: [
      "Livrer sans preuve d'audit, ce n'est pas une « Livraison » dans ce cours.",
      "Générer 2000 lignes d'un coup avant toute liste de contrôle = tunnel.",
    ],
    scenario: `<p>Brief : page contact avec nom, email, message, envoi vers une API <code>POST /api/contact</code>, états chargement / erreur / succès, pas de spam ouvert.</p>
<p>Un junior a demandé à l'IA : « fais-moi tout le site ». Elle a produit 12 fichiers d'un coup, publié un aperçu en ligne, puis « on verra l'audit plus tard ».</p>`,
    findings: [
      {
        id: "f1",
        label: "Brief écrit (champs, adresse d'API, états d'écran, anti-spam) avant génération",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Génération limitée au formulaire (pas tout le site)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label: "Liste d'audit : validation des champs, gestion d'erreur réseau, pas de secret côté navigateur",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Publier l'aperçu seulement après preuves d'audit sur cet incrément",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Générer tout le produit d'un coup puis auditer à la fin",
        correct: false,
      },
      {
        id: "f6",
        label: "Mettre en production sans aucune liste de contrôle",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>La boucle saine : brief → génération ciblée → liste avec preuves → aperçu publié. Le tunnel « tout générer puis voir » et la mise en ligne sans audit sont des anti-patterns.</p>`,
  },

  m03_1: {
    id: "svc-fondations-ex-m03-1",
    format: "audit",
    title: "Outillage minimal d'un projet vibe",
    instructions:
      "Pour un dépôt starter destiné au vibe coding, coche ce qui doit être en place dès le jour 1.",
    hints: [
      "Les règles projet guident l'IA ; les contrôles automatiques vérifient sans opinion.",
      "Une connexion utilisateur « maison » bricolée n'est pas un outillage recommandé ici.",
    ],
    scenario: `<p>Tu initialises le dépôt qui servira de fil rouge jusqu'au projet final. L'équipe utilisera un assistant dans l'éditeur au quotidien.</p>`,
    findings: [
      {
        id: "f1",
        label: "Fichier de règles projet (stack, conventions, interdits) lisible par l'assistant",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label: "Contrôle automatique de qualité du code, lançable en local et sur le serveur d'intégration",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label: "Scan de secrets (avant chaque enregistrement Git ou sur le serveur d'intégration)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Connexion maison avec mots de passe en SHA1 « pour aller vite »",
        correct: false,
      },
      {
        id: "f5",
        label: ".gitignore couvrant node_modules et .env",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f6",
        label: "Ouvrir CORS avec * sur une API privée « pour que ça marche »",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Jour 1 : règles projet, contrôle qualité, scan secrets, gitignore propre. Pas de connexion maison fragile ni de CORS * sur du privé.</p>`,
  },

  m03_projet: {
    id: "svc-fondations-ex-m03-projet",
    format: "audit",
    title: "Projet P1 : rapport d'audit d'un dépôt généré par IA",
    instructions:
      "À partir du dépôt fictif décrit ci-dessous, produis un rapport : coche les constats réels, fixe une gravité minimale crédible, et ajoute une preuve courte (fichier ou motif).",
    hints: [
      "Chaque constat correct exige une preuve (chemin ou motif).",
      "Priorise sécurité et secrets avant le polish d'interface.",
    ],
    scenario: `<p><strong>Dépôt « vibe-crm-starter »</strong> (généré par agent, une seule proposition de 95 fichiers) :</p>
<ul>
<li><code>src/server/db.ts</code> contient <code>DATABASE_URL=postgres://admin:admin@prod/db</code></li>
<li><code>src/pages/Login.tsx</code> compare le mot de passe en clair côté navigateur</li>
<li><code>package.json</code> n'a ni script de contrôle qualité ni de tests</li>
<li><code>.gitignore</code> ignore <code>node_modules</code> mais pas <code>.env</code></li>
<li>Le README promet « prêt pour la production » sans liste de contrôle</li>
<li>Les couleurs du thème sont incohérentes (cosmétique)</li>
</ul>`,
    findings: [
      {
        id: "f1",
        label: "Identifiants de base de données (ou URL complète) en dur dans le code",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Vérification de mot de passe côté navigateur / en clair",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Pas de contrôle qualité ni de tests dans les scripts npm",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label: ".env non ignoré par Git",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Promesse « prêt pour la production » sans preuves d'audit",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label: "Incohérence cosmétique du thème de couleurs",
        correct: false,
      },
    ],
    requireEvidence: true,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Priorité : secrets base de données (critique), connexion côté navigateur (critique), .env non ignoré (haute), absence de contrôles/tests et promesse prod sans preuves (moyenne). Le thème incohérent n'est pas un constat de sécurité pour ce projet.</p>`,
  },
};
