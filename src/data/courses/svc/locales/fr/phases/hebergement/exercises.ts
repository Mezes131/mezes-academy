import type { AuditExercise } from "@/types";

export const hebergementExercises: Record<
  "m01_1" | "m02_1" | "m03_1" | "m04_projet",
  AuditExercise
> = {
  m01_1: {
    id: "svc-hebergement-ex-m01-1",
    format: "audit",
    title: "Choisir pour trois produits",
    instructions:
      "Coche les constats justes pour choisir un hébergement selon le produit plutôt que selon la mode.",
    hints: [
      "PaaS vs VPS = coût, ops, démarrage à froid.",
      "Vercel / Fly / Railway / VPS restent des options de marché : ce n'est pas une religion à suivre aveuglément.",
    ],
    scenario: `<p>Trois produits : (A) page d'accueil commerciale + app React statique peu de trafic ; (B) API longue durée + travailleurs (workers) avec extinction à zéro risquée pour le SLA ; (C) stack custom (process longs, reverse proxy, cron) où l'équipe assume l'ops.</p>
<p>Une IA propose « tout sur la même plateforme gratuite du tutoriel » sans critère coût / démarrage à froid / charge ops.</p>`,
    findings: [
      {
        id: "f1",
        label:
          "Comparer PaaS et VPS sur coût, charge ops et démarrage à froid avant de choisir",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label:
          "Vercel, Fly, Railway, VPS sont des options de marché : l'adéquation produit prime",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f3",
        label:
          "Une page d'accueil peu sollicitée et une API sensible au SLA n'ont pas forcément le même hébergeur",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "Justifier le choix par contraintes (ops, coût, stack) pour chaque produit",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label:
          "Tout coller sur la plateforme du dernier tutoriel IA sans critère est une bonne pratique",
        correct: false,
      },
      {
        id: "f6",
        label: "Le démarrage à froid et la charge ops peuvent être ignorés « pour livrer »",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>A → PaaS simple souvent OK ; B → attention démarrage à froid / instance toujours active ; C → VPS ou PaaS plus ops selon compétences. Trois justifications distinctes.</p>`,
  },

  m02_1: {
    id: "svc-hebergement-ex-m02-1",
    format: "audit",
    title: "Matrice d'environnements",
    instructions:
      "Audite la config multi-environnements. Coche ce qui doit être vrai.",
    hints: [
      "Local / aperçu / prod séparés.",
      "VITE_* = build client : donc pas de secrets dedans.",
    ],
    scenario: `<p>Capstone : <code>.env</code> unique commitée avec clé Stripe live, URL Supabase prod, et <code>VITE_STRIPE_SECRET</code>. Aperçu et local pointent sur la même DB prod. Les webhooks paiement d'aperçu frappent la route API de prod. Aucune matrice variables × env.</p>`,
    findings: [
      {
        id: "f1",
        label: "Local, aperçu et prod doivent avoir configs et secrets distincts",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Les secrets lus à l'exécution ne doivent pas être commités ni exposés au client",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label:
          "Les variables VITE_* partent dans le bundle navigateur : donc aucun secret dedans",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "Une matrice variables × environnement (local/aperçu/prod) est le livrable attendu",
        correct: true,
        minSeverity: "medium",
      },
      {
        id: "f5",
        label: "Partager la DB et les webhooks prod avec l'aperçu est acceptable",
        correct: false,
      },
      {
        id: "f6",
        label: "Une seule .env commitée avec clés live simplifie correctement le déploiement",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Sépare les trois envs, retire les secrets du dépôt et du client, documente la matrice. Aperçu ≠ prod.</p>`,
  },

  m03_1: {
    id: "svc-hebergement-ex-m03-1",
    format: "audit",
    title: "Chaîne qui refuse",
    instructions:
      "Coche ce qui est vrai pour une chaîne build/test/déploiement avec contrôles et retour en arrière.",
    hints: [
      "Lint / audit / scan secrets = contrôles bloquants.",
      "Ne déploie pas sans filet de retour en arrière.",
    ],
    scenario: `<p>CI actuelle : sur push main, build puis déploiement prod immédiat. Lint en warning ignoré. Pas de scan de secrets. Un <code>.env</code> avec clé a déjà fuité dans un artefact. Aucune procédure de retour en arrière documentée : « on redéploie la dernière bonne branche à la main si ça casse ».</p>`,
    findings: [
      {
        id: "f1",
        label:
          "La chaîne doit enchaîner build, tests et déploiement avec garde-fous avant la prod",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f2",
        label:
          "Un contrôle doit refuser le déploiement si lint/audit rouge ou secret détecté",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Une stratégie de retour en arrière (version précédente / revert) doit exister",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label: "Déployer sans contrôle avant déploiement est un piège classique à corriger",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Ignorer lint et secrets « pour livrer plus vite » est une bonne pratique",
        correct: false,
      },
      {
        id: "f6",
        label: "L'absence de retour en arrière planifié est acceptable tant que le build passe",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 2,
    challengeEligible: false,
    solution: `<p>Ajoute des contrôles lint/audit/secrets, bloque le déploiement rouge, documente le retour en arrière. Chaîne qui refuse > déploiement aveugle.</p>`,
  },

  m04_projet: {
    id: "svc-hebergement-ex-m04-projet",
    format: "audit",
    title: "Projet P10 : Déploiement aperçu + prod",
    instructions:
      "Avant de clôturer P10, coche ce qui doit être vrai pour la mise en ligne DNS et le déploiement aperçu + prod.",
    hints: [
      "HTTPS public, aperçu ≠ prod, procédure documentée.",
      "Domaine, redirections, SPF/DKIM basiques si email.",
    ],
    scenario: `<p>Objectif P10 : capstone en aperçu + prod, URL publique HTTPS, procédure ou chaîne de déploiement documentée. État actuel : seule une URL d'aperçu HTTP, pas de domaine personnalisé, pas de redirection HTTP→HTTPS, emails transactionnels sans SPF/DKIM, aperçu et « prod » partagent les mêmes secrets, aucune note de déploiement. L'équipe dit « c'est presque en ligne ».</p>`,
    findings: [
      {
        id: "f1",
        label: "Prod accessible en HTTPS sur une URL publique",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f2",
        label: "Environnement d'aperçu distinct de la prod (config / secrets / URL)",
        correct: true,
        minSeverity: "critical",
      },
      {
        id: "f3",
        label: "Chaîne de déploiement ou procédure documentée",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f4",
        label:
          "Liste de contrôle de mise en ligne DNS : domaine/TLS, redirections, SPF/DKIM basique si envoi d'emails",
        correct: true,
        minSeverity: "high",
      },
      {
        id: "f5",
        label: "Un seul aperçu HTTP sans HTTPS ni doc suffit pour clôturer P10",
        correct: false,
      },
      {
        id: "f6",
        label: "Partager les secrets aperçu/prod et ignorer le DNS email est OK",
        correct: false,
      },
    ],
    requireEvidence: false,
    passingScore: 0.7,
    attemptsBeforeSolution: 3,
    challengeEligible: false,
    solution: `<p>P10 = aperçu + prod séparés, HTTPS public, DNS/TLS/redirections (+ email DNS si besoin), déploiement documenté. Pas de « presque en ligne ».</p>`,
  },
};
