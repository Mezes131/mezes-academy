import type { AuditExercise } from "@/types";

export const dataExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-data-ex-m01-1",
    format: "audit",
    title: "Schéma d'un logiciel en ligne simple",
    instructions:
      "Coche seulement les affirmations justes sur un modèle minimal utilisateurs / organisations / ressources. Repère la sur-ingénierie de l'IA.",
    hints: [
      "Pars du produit : qui possède quoi, qui appartient où.",
      "Les tables en trop sans besoin dans le brief sont souvent inventées.",
    ],
    scenario: `<p><strong>Brief :</strong> logiciel en ligne (SaaS) B2B simple. Les utilisateurs appartiennent à des organisations. Chaque organisation possède des ressources métier (ex. projets ou documents).</p>
<p>Une IA propose : 18 tables dont <code>legacy_sync_mirror</code>, des colonnes <code>user_email</code> dupliquées partout, et pas de <code>org_id</code> clair sur les ressources.</p>
<p>Tu dois garder un modèle relationnel minimal avec des relations justifiées.</p>`,
    findings: [
      {
        id: "f1",
        label:
          "utilisateurs, organisations, et un lien membre–organisation (appartenance) forment un noyau solide pour un logiciel multi-clients",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f2",
        label:
          "Les ressources doivent référencer leur organisation propriétaire (clé étrangère / org_id) pour que l'isolation entre organisations soit claire",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f3",
        label:
          "Les migrations doivent versionner les changements de schéma plutôt que d'éditer la production à la main",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label:
          "Les tables sans besoin produit (ex. « sync mirrors » inutilisés) doivent être contestées avant livraison",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label:
          "Dupliquer la même colonne email sur chaque table « au cas où » est une bonne conception",
        correct: false,
      },
      {
        id: "f6",
        label:
          "Sauter la propriété organisation sur les ressources va bien si les ids sont difficiles à deviner",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Noyau minimal d'un logiciel en ligne : utilisateurs ↔ organisations (appartenance) + ressources appartenant à l'organisation. Justifie chaque relation. Écarte tables inventées et champs redondants. Versionne les changements avec des migrations.</p>`,
  },

  m02_1: {
    id: "svc-data-ex-m02-1",
    format: "audit",
    title: "Sécuriser une route d'API générée",
    instructions:
      "Audite la route d'API générée par l'IA. Coche ce qui doit être vrai pour une frontière sûre.",
    hints: [
      "Ne fais jamais confiance au corps de la requête client, même si le formulaire l'a validé.",
      "L'autorisation, ce n'est pas « la requête avait l'air typée ».",
    ],
    scenario: `<p>Route générée par IA : <code>POST /api/resources</code> crée une ressource depuis <code>req.body</code> sans contrôle de schéma, renvoie une chaîne brute en cas d'échec, et liste toutes les ressources avec <code>GET /api/resources</code> sans borne.</p>
<p>L'interface cache le bouton de création pour les invités, mais l'API ne vérifie ni la session ni l'appartenance à l'organisation.</p>`,
    findings: [
      {
        id: "f1",
        label:
          "La validation serveur des champs du corps (types, obligatoires, longueurs) est obligatoire",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label:
          "La route d'API doit autoriser l'utilisateur connecté pour cette organisation / action",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "Des erreurs typées / structurées (statut + code/forme stables) valent mieux que des échecs en texte opaque",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f4",
        label:
          "Les routes de liste doivent paginer (limite + curseur ou décalage)",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label:
          "Cacher le bouton dans l'interface suffit à protéger POST /api/resources",
        correct: false,
      },
      {
        id: "f6",
        label:
          "Faire confiance au corps de la requête client sans re-validation, ça va",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Frontière sûre : valider les entrées, autoriser côté serveur, renvoyer des erreurs typées, paginer les listes. Cacher un bouton dans l'interface ne remplace pas la sécurité API.</p>`,
  },

  m03_1: {
    id: "svc-data-ex-m03-1",
    format: "audit",
    title: "Envoi de fichier avec contrôle d'accès",
    instructions:
      "Coche les constats justes sur envois sûrs, URLs signées, contrôle d'accès et quotas.",
    hints: [
      "Un espace de stockage (bucket) public sans contrôles n'est pas « plus simple » : c'est une fuite.",
      "Les URLs signées sont limitées dans le temps ; le contrôle d'accès décide encore qui peut les demander.",
    ],
    scenario: `<p>Fonctionnalité : les utilisateurs envoient des factures pour leur organisation. L'IA livre : URLs d'objets publiques, pas de contrôle taille/type, pas de quota par organisation, et <code>GET /files/:key</code> renvoie n'importe quel objet si tu connais la clé.</p>
<p>Exemples du marché dans les notes de stack : stockage objet (style S3) + base applicative pour les métadonnées.</p>`,
    findings: [
      {
        id: "f1",
        label:
          "Valider la taille et les types autorisés avant d'accepter l'envoi de fichier",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label:
          "Servir les fichiers privés via des URLs signées à courte durée (ou équivalent), pas des liens publics permanents",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "Avant d'émettre une URL de téléchargement, vérifier que l'utilisateur peut accéder à l'objet de cette organisation (contrôle d'accès)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f4",
        label:
          "Les quotas (par utilisateur / organisation) limitent les abus de stockage et les mauvaises surprises de facture",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label:
          "Connaître la clé d'objet seul doit donner l'accès sans contrôle d'accès",
        correct: false,
      },
      {
        id: "f6",
        label:
          "Un espace de stockage entièrement public convient pour des factures privées",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Chemin d'envoi sûr : valider taille/type, stocker en privé, autoriser avant URL signée, appliquer des quotas. L'obscurité de la clé ne remplace pas un contrôle d'accès.</p>`,
  },

  m04_projet: {
    id: "svc-data-ex-m04-projet",
    format: "audit",
    title: "Projet P5 : opérations métier + envoi + tâche asynchrone",
    instructions:
      "Avant de déclarer l'incrément données « prêt pour la production » sur le projet final, coche ce qui doit être vrai.",
    hints: [
      "Des opérations de base (CRUD) sans validation serveur ne sont pas terminées.",
      "Les tâches asynchrones doivent être sûres à rejouer (idempotentes).",
    ],
    scenario: `<p>Objectif du projet P5 : opérations métier (créer, lire, modifier, supprimer), envoi de fichiers avec contrôle d'accès, et une tâche en arrière-plan (ex. envoyer un email via un prestataire tiers comme Resend, exemple du marché), générés puis audités.</p>
<p>Un agent a « terminé » : la route de création fait confiance au corps de la requête, les fichiers vont dans un dossier public, l'email est envoyé dans le traitement HTTP sans clé d'idempotence (double soumission = double email).</p>`,
    findings: [
      {
        id: "f1",
        label:
          "Les opérations métier valident les entrées côté serveur et autorisent par ressource / organisation",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label:
          "Chemin d'envoi : contrôles taille/type, stockage privé, contrôle d'accès avant lecture / URL signée",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "Le travail lent (email, etc.) est mis en file d'attente / exécuté par un processus de fond, pas bloqué indéfiniment dans la réponse HTTP",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "La tâche asynchrone est idempotente : les nouvelles tentatives ne dupliquent pas les effets de bord",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f5",
        label:
          "Les nouvelles tentatives utilisent un délai croissant / un maximum ; les échecs permanents sont visibles (pas de boucles silencieuses infinies)",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f6",
        label:
          "Faire confiance au corps client et à un dossier d'envoi public suffit",
        correct: false,
      },
      {
        id: "f7",
        label:
          "Envoyer l'email deux fois sur double soumission sans clé d'idempotence est acceptable",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>Liste de contrôle P5 : opérations validées + autorisées, envoi de fichier sûr avec contrôle d'accès, tâche asynchrone avec nouvelles tentatives et idempotence. Espaces de stockage publics et effets de bord non idempotents = non.</p>`,
  },
};
