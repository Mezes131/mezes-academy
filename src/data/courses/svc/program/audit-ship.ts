import type { ProgramPhase } from "@/types";
import { lesson, module, phase } from "./helpers";

/* ── P8 : Audit Sécurité (checklist security-baseline) ──────────── */

export const auditSecuritePhase: ProgramPhase = phase({
  slug: "audit-securite",
  title: "Audit Sécurité",
  objective:
    "Appliquer la checklist Security baseline au produit. Cœur « Secure » du positionnement.",
  modules: [
    module({
      id: "svc-audit-securite-m01",
      index: "01",
      title: "Secrets et configuration",
      subtitle: "Les secrets en dur que l'IA colle sans prévenir",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Détecter les secrets en dur dans un dépôt",
        "Organiser coffres et rotation",
        "Verrouiller .gitignore et .dockerignore",
      ],
      lessons: [
        lesson({
          id: "svc-audit-securite-m01-l1",
          title: "Secrets en dur",
          objective: "Repérer les secrets collés par l'IA dans code, config et Docker.",
          concepts: ["secrets en dur", "scan de secrets", ".gitignore/.dockerignore"],
          pitfalls: ["clé API dans le code d'exemple copié", "secret dans l'historique git"],
        }),
        lesson({
          id: "svc-audit-securite-m01-l2",
          title: "Coffres et rotation",
          objective: "Stocker et faire tourner les secrets proprement.",
          concepts: ["coffres de secrets", "rotation", "principe du moindre accès"],
        }),
      ],
      exercises: [
        {
          title: "Trouver et corriger cinq fuites",
          kind: "audit",
          brief:
            "Auditer un dépôt piégé : trouver cinq fuites de secrets et les corriger (code + historique + rotation).",
        },
      ],
    }),
    module({
      id: "svc-audit-securite-m02",
      index: "02",
      title: "Entrées utilisateur et injections",
      subtitle: "SQL, NoSQL, commandes, XSS, uploads",
      duration: "50 min",
      difficulty: "intermediate",
      objectives: [
        "Valider aux frontières systématiquement",
        "Détecter injections SQL/NoSQL/commande",
        "Auditer les XSS côté front",
      ],
      lessons: [
        lesson({
          id: "svc-audit-securite-m02-l1",
          title: "Injections",
          objective: "Comprendre et bloquer SQL/NoSQL/commande.",
          concepts: ["injection SQL", "injection NoSQL", "injection de commande", "requêtes paramétrées"],
        }),
        lesson({
          id: "svc-audit-securite-m02-l2",
          title: "XSS et uploads",
          objective: "Auditer les sorties HTML et les fichiers entrants.",
          concepts: ["XSS", "dangerouslySetInnerHTML", "validation d'uploads"],
          pitfalls: ["HTML non échappé rendu tel quel", "upload sans contrôle de type"],
        }),
      ],
      exercises: [
        {
          title: "Exploiter et corriger une injection",
          kind: "audit",
          brief:
            "Exploiter une injection sur une app d'entraînement puis la corriger avec preuve.",
        },
        {
          title: "Auditer un composant XSS",
          kind: "audit",
          brief:
            "Auditer un composant React utilisant dangerouslySetInnerHTML et le sécuriser.",
        },
      ],
    }),
    module({
      id: "svc-audit-securite-m03",
      index: "03",
      title: "AuthZ et surfaces API",
      subtitle: "IDOR, routes non protégées, webhooks exposés, RLS",
      duration: "50 min",
      difficulty: "intermediate",
      objectives: [
        "Cartographier les surfaces exposées",
        "Vérifier chaque route contre l'IDOR",
        "Auditer RLS et webhooks",
      ],
      lessons: [
        lesson({
          id: "svc-audit-securite-m03-l1",
          title: "Surfaces et routes",
          objective: "Lister tout ce qui est accessible et vérifier sa protection.",
          concepts: ["cartographie des routes", "IDOR", "routes non protégées"],
        }),
        lesson({
          id: "svc-audit-securite-m03-l2",
          title: "Webhooks et RLS",
          objective: "Auditer les endpoints publics par construction et les policies.",
          concepts: ["webhooks exposés", "RLS", "policies"],
        }),
      ],
      exercises: [
        {
          title: "Audit d'accès de l'app en cours",
          kind: "audit",
          brief:
            "Auditer les accès du produit capstone : matrice route × rôle avec verdict et correctifs.",
        },
      ],
    }),
    module({
      id: "svc-audit-securite-m04",
      index: "04",
      title: "Dépendances et supply chain",
      subtitle: "Deps inutiles ou hallucinées, pin, npm audit",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Détecter les dépendances inutiles ou hallucinées",
        "Pinner les versions et auditer régulièrement",
      ],
      lessons: [
        lesson({
          id: "svc-audit-securite-m04-l1",
          title: "Supply chain du code généré",
          objective: "Assainir les dépendances qu'un prompt a fait entrer.",
          concepts: ["deps hallucinées", "pin de versions", "npm audit", "typosquatting"],
          pitfalls: ["installer une lib inventée par l'IA", "ranges trop larges"],
        }),
      ],
      exercises: [
        {
          title: "Assainir package.json",
          kind: "audit",
          brief:
            "Auditer et assainir le package.json d'un projet généré : supprimer, pinner, corriger.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P8 : Rapport Security baseline",
    deliverable:
      "Le rapport Security baseline du produit capstone : preuves, correctifs appliqués, points restants.",
    assessment: [
      "Checklist security-baseline entièrement passée",
      "Chaque constat a une preuve et un correctif",
      "Aucune faille critique ouverte",
    ],
  },
});

/* ── P9 : Audit Qualité (perf / design / a11y) ──────────────────── */

export const auditQualitePhase: ProgramPhase = phase({
  slug: "audit-qualite",
  title: "Audit Qualité",
  objective:
    "Appliquer les checklists Performance, Design et Accessibility au produit.",
  modules: [
    module({
      id: "svc-audit-qualite-m01",
      index: "01",
      title: "Performance produit",
      subtitle: "LCP, TBT, budgets, images, waterfalls",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Mesurer LCP/TBT et lire un waterfall",
        "Poser des budgets de performance",
        "Optimiser les images",
      ],
      lessons: [
        lesson({
          id: "svc-audit-qualite-m01-l1",
          title: "Mesurer et budgéter",
          objective: "Utiliser Lighthouse et poser des budgets tenables.",
          concepts: ["LCP", "TBT", "budgets perf", "waterfalls", "images"],
        }),
      ],
      exercises: [
        {
          title: "Lighthouse + plan d'action",
          kind: "audit",
          brief:
            "Lancer Lighthouse sur le produit et produire un plan d'action priorisé.",
        },
      ],
    }),
    module({
      id: "svc-audit-qualite-m02",
      index: "02",
      title: "Design shippable",
      subtitle: "Hiérarchie, CTA unique, états vides/erreur/loading",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Vérifier la hiérarchie visuelle",
        "Garantir les états vides, erreur et loading",
      ],
      lessons: [
        lesson({
          id: "svc-audit-qualite-m02-l1",
          title: "Revue design structurée",
          objective: "Auditer un écran avec la checklist design-baseline.",
          concepts: ["hiérarchie visuelle", "CTA unique", "états vides/erreur/loading"],
          pitfalls: ["écran sans état vide", "trois CTA en concurrence"],
        }),
      ],
      exercises: [
        {
          title: "Revue design d'un écran critique",
          kind: "audit",
          brief:
            "Auditer l'écran le plus critique du produit avec la checklist design et corriger.",
        },
      ],
    }),
    module({
      id: "svc-audit-qualite-m03",
      index: "03",
      title: "Accessibilité",
      subtitle: "Contraste, clavier, labels, focus",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Vérifier contraste et navigation clavier",
        "Labelliser correctement les contrôles",
        "Gérer le focus",
      ],
      lessons: [
        lesson({
          id: "svc-audit-qualite-m03-l1",
          title: "Audit a11y de base",
          objective: "Passer la checklist accessibility-baseline sur un parcours.",
          concepts: ["contraste", "navigation clavier", "labels", "gestion du focus"],
        }),
      ],
      exercises: [
        {
          title: "Audit a11y ciblé",
          kind: "audit",
          brief:
            "Auditer un parcours complet au clavier + lecteur d'écran et corriger les blocages.",
        },
      ],
    }),
    module({
      id: "svc-audit-qualite-m04",
      index: "04",
      title: "UX des parcours argent",
      subtitle: "Checkout, emails de confiance, friction inutile",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Fluidifier le parcours de paiement",
        "Inspirer confiance aux moments critiques",
      ],
      lessons: [
        lesson({
          id: "svc-audit-qualite-m04-l1",
          title: "Le parcours qui rapporte",
          objective: "Auditer le checkout et les emails sous l'angle conversion + confiance.",
          concepts: ["checkout", "emails de confiance", "friction inutile"],
        }),
      ],
      exercises: [
        {
          title: "Parcours payant sans friction",
          kind: "audit",
          brief:
            "Dérouler le parcours payant complet et éliminer chaque friction identifiée.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P9 : Scores avant/après",
    deliverable:
      "Les checklists Perf / Design / A11y passées sur le capstone, avec scores avant/après documentés.",
    assessment: [
      "Scores mesurés avant et après, amélioration démontrée",
      "Checklists perf/design/a11y passées selon seuils",
      "Corrections tracées (commit ou diff)",
    ],
  },
});

/* ── P10 : Hébergement & déploiement ────────────────────────────── */

export const hebergementPhase: ProgramPhase = phase({
  slug: "hebergement",
  title: "Hébergement & déploiement",
  objective: "Mettre le produit en ligne pour de vrai.",
  modules: [
    module({
      id: "svc-hebergement-m01",
      index: "01",
      title: "Choisir où héberger",
      subtitle: "Vercel, Fly, Railway, VPS : critères réels",
      duration: "30 min",
      difficulty: "intermediate",
      objectives: [
        "Comparer les plateformes selon coût, ops et cold start",
        "Choisir selon le produit, pas la mode",
      ],
      lessons: [
        lesson({
          id: "svc-hebergement-m01-l1",
          title: "Panorama hébergement",
          objective: "Évaluer Vercel / Fly / Railway / VPS sur des critères concrets.",
          concepts: ["PaaS vs VPS", "coût", "charge ops", "cold start"],
        }),
      ],
      exercises: [
        {
          title: "Choisir pour trois produits",
          kind: "synthesis",
          brief:
            "Choisir et justifier un hébergement pour trois produits différents.",
        },
      ],
    }),
    module({
      id: "svc-hebergement-m02",
      index: "02",
      title: "Environnements",
      subtitle: "Local, preview, prod et secrets runtime",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Séparer local / preview / prod",
        "Gérer secrets runtime et config build",
      ],
      lessons: [
        lesson({
          id: "svc-hebergement-m02-l1",
          title: "Trois environnements",
          objective: "Configurer local/preview/prod sans fuite entre eux.",
          concepts: ["environnements", "secrets runtime", "config Vite build vs runtime"],
        }),
      ],
      exercises: [
        {
          title: "Matrice d'environnements",
          kind: "synthesis",
          brief:
            "Construire la matrice complète des variables du produit par environnement.",
        },
      ],
    }),
    module({
      id: "svc-hebergement-m03",
      index: "03",
      title: "CI/CD minimal",
      subtitle: "Build, test, deploy, rollback : et bloquer sur audit",
      duration: "45 min",
      difficulty: "intermediate",
      objectives: [
        "Mettre en place un pipeline build/test/deploy",
        "Bloquer le déploiement sur lint ou audit rouge",
        "Savoir revenir en arrière",
      ],
      lessons: [
        lesson({
          id: "svc-hebergement-m03-l1",
          title: "Pipeline minimal",
          objective: "Automatiser build, tests et déploiement avec garde-fous.",
          concepts: ["CI/CD", "gates lint/audit", "rollback"],
          pitfalls: ["déployer sans gate", "pas de stratégie de rollback"],
        }),
      ],
      exercises: [
        {
          title: "Pipeline qui refuse",
          kind: "guided",
          brief:
            "Configurer un pipeline qui refuse de déployer si un secret ou un lint rouge est détecté.",
        },
      ],
    }),
    module({
      id: "svc-hebergement-m04",
      index: "04",
      title: "Domaines, TLS, DNS",
      subtitle: "Custom domain, HTTPS, redirects, DNS email",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Brancher un domaine custom en HTTPS",
        "Configurer redirects et DNS email",
      ],
      lessons: [
        lesson({
          id: "svc-hebergement-m04-l1",
          title: "Go-live DNS",
          objective: "Configurer domaine, TLS, redirects et SPF/DKIM basique.",
          concepts: ["custom domain", "HTTPS/TLS", "redirects", "SPF/DKIM"],
        }),
      ],
      exercises: [
        {
          title: "Checklist go-live DNS",
          kind: "synthesis",
          brief:
            "Dérouler la checklist go-live DNS complète sur le domaine du produit.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P10 : Déploiement preview + prod",
    deliverable:
      "Le produit capstone déployé : environnement preview + prod avec URL publique HTTPS.",
    assessment: [
      "Prod accessible en HTTPS sur URL publique",
      "Preview distinct de la prod",
      "Pipeline ou procédure de déploiement documentée",
    ],
  },
});

/* ── P11 : Observabilité & ops légers ───────────────────────────── */

export const opsPhase: ProgramPhase = phase({
  slug: "ops",
  title: "Observabilité & ops légers",
  objective: "Savoir que ça casse : et quoi faire quand ça casse.",
  modules: [
    module({
      id: "svc-ops-m01",
      index: "01",
      title: "Logs utiles",
      subtitle: "Corrélation request/user, jamais de secrets",
      duration: "30 min",
      difficulty: "intermediate",
      objectives: [
        "Structurer des logs corrélés",
        "Garantir zéro secret dans les logs",
      ],
      lessons: [
        lesson({
          id: "svc-ops-m01-l1",
          title: "Logs qui servent",
          objective: "Logger ce qui aide à débugger, corrélé, sans données sensibles.",
          concepts: ["corrélation request/user", "logs structurés", "pas de secrets"],
          pitfalls: ["logger un token ou un mot de passe", "logs illisibles sans contexte"],
        }),
      ],
      exercises: [
        {
          title: "Instrumenter un flux critique",
          kind: "guided",
          brief:
            "Instrumenter le flux paiement ou auth avec des logs corrélés exploitables.",
        },
      ],
    }),
    module({
      id: "svc-ops-m02",
      index: "02",
      title: "Monitoring & alertes",
      subtitle: "Uptime, 5xx, webhook down",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Surveiller uptime et erreurs 5xx",
        "Alerter sur les pannes qui coûtent (webhook down)",
      ],
      lessons: [
        lesson({
          id: "svc-ops-m02-l1",
          title: "Surveiller ce qui compte",
          objective: "Mettre en place uptime check, suivi 5xx et alertes ciblées.",
          concepts: ["uptime", "erreurs 5xx", "alerte webhook down"],
        }),
      ],
      exercises: [
        {
          title: "Alerte « paiement cassé »",
          kind: "guided",
          brief:
            "Configurer une alerte qui se déclenche quand le webhook de paiement échoue.",
        },
      ],
    }),
    module({
      id: "svc-ops-m03",
      index: "03",
      title: "Backups & incident minimal",
      subtitle: "Backup DB, runbook 1 page, communication",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Mettre en place un backup DB restaurable",
        "Écrire un runbook d'incident d'une page",
      ],
      lessons: [
        lesson({
          id: "svc-ops-m03-l1",
          title: "Backups et runbook",
          objective: "Se préparer à l'incident : backup testé + runbook + communication minimale.",
          concepts: ["backup DB", "restauration testée", "runbook 1 page", "communication d'incident"],
        }),
      ],
      exercises: [
        {
          title: "Simulation d'incident",
          kind: "synthesis",
          brief:
            "Dérouler une simulation d'incident avec le runbook : détection, action, communication, post-mortem court.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P11 : Runbook + alerte live",
    deliverable:
      "Le runbook du produit + au moins une alerte réellement active sur l'environnement de prod.",
    assessment: [
      "Runbook d'une page actionnable",
      "Alerte déclenchable et testée",
      "Backup restaurable démontré",
    ],
  },
});

/* ── P12 : Livraison commerciale ────────────────────────────────── */

export const shipPhase: ProgramPhase = phase({
  slug: "ship",
  title: "Livraison commerciale",
  objective: "Transformer un déploiement en offre commercialisable.",
  modules: [
    module({
      id: "svc-ship-m01",
      index: "01",
      title: "Offre & pricing page",
      subtitle: "Proposition de valeur, Free/Pro, CTA clair",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Formuler la proposition de valeur",
        "Construire une pricing page qui convertit",
      ],
      lessons: [
        lesson({
          id: "svc-ship-m01-l1",
          title: "De la feature à l'offre",
          objective: "Traduire le produit en proposition de valeur et plans clairs.",
          concepts: ["proposition de valeur", "plans Free/Pro", "CTA clair"],
        }),
      ],
      exercises: [
        {
          title: "Landing « pourquoi payer »",
          kind: "synthesis",
          brief:
            "Rédiger la landing du produit centrée sur la raison de payer, avec un CTA unique.",
        },
      ],
    }),
    module({
      id: "svc-ship-m02",
      index: "02",
      title: "Confiance & légal minimal",
      subtitle: "CGU/privacy légères, mentions, support",
      duration: "30 min",
      difficulty: "intermediate",
      objectives: [
        "Couvrir CGU, privacy et mentions minimales",
        "Ouvrir un canal support crédible",
      ],
      lessons: [
        lesson({
          id: "svc-ship-m02-l1",
          title: "Le minimum qui inspire confiance",
          objective: "Mettre en place le socle légal et support d'un produit payant.",
          concepts: ["CGU/privacy légères", "mentions", "canal support"],
        }),
      ],
      exercises: [
        {
          title: "Checklist conformité mini",
          kind: "synthesis",
          brief:
            "Passer la checklist conformité minimale sur le produit et combler les manques.",
        },
      ],
    }),
    module({
      id: "svc-ship-m03",
      index: "03",
      title: "Preuves de livraison",
      subtitle: "Changelog, smoke tests, dossier de release",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Tenir un changelog",
        "Automatiser des smoke tests",
        "Assembler le dossier de release",
      ],
      lessons: [
        lesson({
          id: "svc-ship-m03-l1",
          title: "Livrer avec preuves",
          objective: "Produire les artefacts qui prouvent que le produit est livré.",
          concepts: ["changelog", "smoke tests", "dossier de release"],
        }),
      ],
      exercises: [
        {
          title: "Assembler le dossier de livraison",
          kind: "synthesis",
          brief:
            "Assembler le dossier de livraison du produit : URL, plans, preuves d'audit, runbook.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P12 : Dossier de livraison",
    deliverable:
      "Le dossier de livraison complet : URL publique, plans et pricing, preuves d'audit, runbook.",
    assessment: [
      "Dossier complet et vérifiable",
      "Pricing page en ligne avec CTA",
      "Socle légal et support en place",
    ],
  },
});
