import type { ProgramPhase } from "@/types";
import { lesson, module, phase } from "./helpers";

/* ── P0 — Bases web (optionnelle, product builders) ─────────────── */

export const basesPhase: ProgramPhase = phase({
  slug: "bases",
  title: "Bases web (optionnelle)",
  objective:
    "Donner aux product builders (no-code → code) le vocabulaire et les réflexes web nécessaires pour suivre le tronc commun. Skip libre si bases OK.",
  modules: [
    module({
      id: "svc-bases-m01",
      index: "01",
      title: "HTTP, HTML, JS utiles",
      subtitle: "Le strict nécessaire pour comprendre ce que l'IA génère",
      duration: "30 min",
      difficulty: "intro",
      objectives: [
        "Lire un échange requête/réponse HTTP",
        "Reconnaître un HTML sémantique minimal",
        "Comprendre fetch et async en JavaScript moderne",
      ],
      lessons: [
        lesson({
          id: "svc-bases-m01-l1",
          title: "Requête / réponse HTTP",
          objective: "Comprendre le cycle requête/réponse et les codes de statut.",
          concepts: ["méthodes HTTP", "codes de statut", "headers"],
        }),
        lesson({
          id: "svc-bases-m01-l2",
          title: "HTML sémantique minimal",
          objective: "Identifier les balises structurantes et leur rôle.",
          concepts: ["balises sémantiques", "structure de page", "formulaires"],
        }),
        lesson({
          id: "svc-bases-m01-l3",
          title: "JS moderne utile",
          objective: "Lire du JS asynchrone : fetch, async/await, JSON.",
          concepts: ["fetch", "async/await", "JSON"],
        }),
      ],
      exercises: [
        {
          title: "Inspecter un flux réseau",
          kind: "guided",
          brief:
            "Ouvrir les DevTools sur une page réelle, inspecter un flux réseau et expliquer chaque étape (requête, statut, réponse).",
        },
      ],
    }),
    module({
      id: "svc-bases-m02",
      index: "02",
      title: "Git & projet local",
      subtitle: "Versionner proprement dès le premier commit",
      duration: "35 min",
      difficulty: "intro",
      objectives: [
        "Utiliser repo, commits et branches au quotidien",
        "Séparer `.env` du code versionné",
        "Lancer les scripts npm d'un projet",
      ],
      lessons: [
        lesson({
          id: "svc-bases-m02-l1",
          title: "Repo, commits, branches",
          objective: "Maîtriser le cycle de base de Git sur un projet solo.",
          concepts: ["init/clone", "commit", "branches"],
        }),
        lesson({
          id: "svc-bases-m02-l2",
          title: ".env vs code",
          objective: "Comprendre pourquoi les secrets ne vont jamais dans le repo.",
          concepts: ["variables d'environnement", ".gitignore", ".env.example"],
          pitfalls: ["committer un .env", "secrets en dur dans le code"],
        }),
        lesson({
          id: "svc-bases-m02-l3",
          title: "Scripts npm",
          objective: "Lire package.json et lancer dev/build/test.",
          concepts: ["package.json", "scripts npm", "node_modules"],
        }),
      ],
      exercises: [
        {
          title: "Initialiser un projet propre",
          kind: "guided",
          brief:
            "Initialiser un projet avec .gitignore et .env.example corrects, premier commit lisible.",
        },
      ],
    }),
    module({
      id: "svc-bases-m03",
      index: "03",
      title: "Front ↔ API",
      subtitle: "Comprendre le dialogue entre interface et serveur",
      duration: "40 min",
      difficulty: "beginner",
      objectives: [
        "Consommer une API JSON depuis le front",
        "Gérer les erreurs HTTP et le CORS basique",
        "Modéliser les états loading / error / success",
      ],
      lessons: [
        lesson({
          id: "svc-bases-m03-l1",
          title: "JSON et erreurs HTTP",
          objective: "Lire une réponse JSON et réagir aux codes d'erreur.",
          concepts: ["JSON", "4xx vs 5xx", "gestion d'erreurs"],
        }),
        lesson({
          id: "svc-bases-m03-l2",
          title: "CORS basique",
          objective: "Comprendre pourquoi le navigateur bloque certaines requêtes.",
          concepts: ["same-origin", "CORS", "preflight"],
        }),
        lesson({
          id: "svc-bases-m03-l3",
          title: "États loading / error / success",
          objective: "Structurer une UI autour des trois états d'une requête.",
          concepts: ["états de requête", "feedback utilisateur"],
        }),
      ],
      exercises: [
        {
          title: "Consommer une API publique",
          kind: "guided",
          brief:
            "Appeler une API publique avec gestion d'erreurs et affichage des trois états.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P0 — Page connectée à une API",
    deliverable:
      "Une page qui appelle une API publique et affiche correctement loading / erreur / succès.",
    assessment: [
      "Les trois états sont visibles et corrects",
      "Les erreurs HTTP sont gérées explicitement",
      "Le projet est versionné proprement (.gitignore, .env.example)",
    ],
  },
});

/* ── P1 — Fondations vibe coding ─────────────────────────────────── */

export const fondationsPhase: ProgramPhase = phase({
  slug: "fondations",
  title: "Fondations vibe coding",
  objective:
    "Comprendre le vibe coding, ses risques réels, et le cycle Prompt → Audit → Ship qui le rend fiable.",
  modules: [
    module({
      id: "svc-fondations-m01",
      index: "01",
      title: "Le vibe coding : promesses et pièges",
      subtitle: "Ce que l'IA fait bien, ce qu'elle rate, et qui est responsable",
      duration: "25 min",
      difficulty: "intro",
      objectives: [
        "Situer le spectre autocomplete → agents autonomes",
        "Identifier les échecs typiques du code généré",
        "Assumer la responsabilité finale : le développeur signe",
      ],
      lessons: [
        lesson({
          id: "svc-fondations-m01-l1",
          title: "Le spectre des outils IA",
          objective: "Distinguer autocomplete, chat, assistants IDE et agents.",
          concepts: ["autocomplete", "assistants IDE", "agents"],
        }),
        lesson({
          id: "svc-fondations-m01-l2",
          title: "Forces et angles morts",
          objective: "Savoir ce que l'IA fait bien et ce qu'elle rate systématiquement.",
          concepts: ["code plausible mais faux", "failles subtiles", "sur-ingénierie"],
          pitfalls: ["confiance aveugle", "code non lu", "prompt vague"],
        }),
        lesson({
          id: "svc-fondations-m01-l3",
          title: "Le développeur signe",
          objective: "Comprendre la responsabilité professionnelle sur le code livré.",
          concepts: ["responsabilité", "revue obligatoire", "échecs réels documentés"],
        }),
      ],
      exercises: [
        {
          title: "Autopsie d'un incident IA",
          kind: "audit",
          brief:
            "Analyser un incident réel causé par du code IA non audité : cause racine, signaux manqués, prévention.",
        },
      ],
    }),
    module({
      id: "svc-fondations-m02",
      index: "02",
      title: "Le cycle Prompt → Audit → Ship",
      subtitle: "Le fil rouge de toute la formation",
      duration: "30 min",
      difficulty: "intro",
      objectives: [
        "Expliquer pourquoi trois temps distincts",
        "Décrire les livrables de chaque temps",
        "Préférer les boucles courtes au tunnel",
      ],
      lessons: [
        lesson({
          id: "svc-fondations-m02-l1",
          title: "Pourquoi trois temps",
          objective: "Comprendre la séparation spécifier / vérifier / livrer.",
          concepts: ["Prompt = spécifier + générer", "Audit = checklists + preuves", "Ship = livrer avec preuves"],
        }),
        lesson({
          id: "svc-fondations-m02-l2",
          title: "Boucle courte vs tunnel",
          objective: "Itérer par petites boucles auditables plutôt qu'en tunnel.",
          concepts: ["itérations courtes", "revue incrémentale"],
          pitfalls: ["générer 2000 lignes d'un coup", "auditer à la fin seulement"],
        }),
      ],
      exercises: [
        {
          title: "Cycle complet sur une micro-feature",
          kind: "guided",
          brief:
            "Dérouler Prompt → Audit → Ship sur un formulaire de contact : brief, génération, checklist, livraison.",
        },
      ],
    }),
    module({
      id: "svc-fondations-m03",
      index: "03",
      title: "La boîte à outils du vibe coder",
      subtitle: "Assistants, règles projet et scanners déterministes",
      duration: "35 min",
      difficulty: "beginner",
      objectives: [
        "Choisir le bon outil IA selon la tâche",
        "Configurer des règles projet et des scanners",
        "Savoir quand NE PAS utiliser l'IA",
      ],
      lessons: [
        lesson({
          id: "svc-fondations-m03-l1",
          title: "Assistants, agents, revue assistée",
          objective: "Cartographier les outils et leurs cas d'usage.",
          concepts: ["assistants IDE", "agents", "revue assistée"],
        }),
        lesson({
          id: "svc-fondations-m03-l2",
          title: "Règles projet et scanners",
          objective: "Encadrer la génération avec des règles et des checks déterministes.",
          concepts: ["règles projet", "lint", "scan de secrets", "audit deps", "Lighthouse"],
        }),
        lesson({
          id: "svc-fondations-m03-l3",
          title: "Quand ne pas utiliser l'IA",
          objective: "Identifier les zones où la génération est un mauvais pari.",
          concepts: ["crypto/sécurité fine", "logique métier critique", "code légal"],
        }),
      ],
      exercises: [
        {
          title: "Outillage minimal d'un projet",
          kind: "guided",
          brief:
            "Configurer règles projet + lint + scan de secrets sur un dépôt starter.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P1 — Audit d'un dépôt généré par IA",
    deliverable:
      "Un rapport d'audit d'un dépôt généré par IA : constats, gravité, recommandations priorisées.",
    assessment: [
      "Constats factuels avec preuves (fichier, ligne)",
      "Gravité justifiée et cohérente",
      "Recommandations actionnables et priorisées",
    ],
  },
});

/* ── P2 — Prompt & cadrage produit ──────────────────────────────── */

export const promptPhase: ProgramPhase = phase({
  slug: "prompt",
  title: "Prompt & cadrage produit",
  objective:
    "Obtenir du bon code plus souvent — et cadrer un MVP commercialisable avant de générer.",
  modules: [
    module({
      id: "svc-prompt-m01",
      index: "01",
      title: "Du besoin au MVP shippable",
      subtitle: "User stories, critères d'acceptation, non-goals",
      duration: "40 min",
      difficulty: "beginner",
      objectives: [
        "Formuler user stories et critères d'acceptation",
        "Expliciter les contraintes non fonctionnelles",
        "Découper en tâches auditables",
      ],
      lessons: [
        lesson({
          id: "svc-prompt-m01-l1",
          title: "User story et critères d'acceptation",
          objective: "Écrire un besoin testable avant tout prompt.",
          concepts: ["user story", "critères d'acceptation", "non-goals"],
        }),
        lesson({
          id: "svc-prompt-m01-l2",
          title: "Contraintes non fonctionnelles",
          objective: "Intégrer sécu, perf et a11y dès le cadrage.",
          concepts: ["sécurité", "performance", "accessibilité"],
        }),
        lesson({
          id: "svc-prompt-m01-l3",
          title: "Découper en tâches auditables",
          objective: "Produire des unités de travail qu'on peut vérifier une à une.",
          concepts: ["découpage", "taille de tâche", "critère de done"],
        }),
      ],
      exercises: [
        {
          title: "Brief prompt-ready",
          kind: "synthesis",
          brief:
            "Transformer une demande client floue en brief prompt-ready : stories, critères, non-goals, contraintes.",
        },
      ],
    }),
    module({
      id: "svc-prompt-m02",
      index: "02",
      title: "Techniques de prompt pour le code produit",
      subtitle: "Contexte minimal suffisant, sortie contrainte, itération",
      duration: "45 min",
      difficulty: "beginner",
      objectives: [
        "Fournir le contexte minimal suffisant",
        "Contraindre la sortie (stack, style, tests)",
        "Itérer sans dériver et faire critiquer le code par l'IA",
      ],
      lessons: [
        lesson({
          id: "svc-prompt-m02-l1",
          title: "Contexte minimal suffisant",
          objective: "Donner assez de contexte, pas plus.",
          concepts: ["contexte", "fichiers pertinents", "bruit"],
        }),
        lesson({
          id: "svc-prompt-m02-l2",
          title: "Contraindre la sortie",
          objective: "Imposer stack, conventions et tests dans le prompt.",
          concepts: ["contraintes de stack", "conventions", "tests demandés"],
        }),
        lesson({
          id: "svc-prompt-m02-l3",
          title: "Itérer et faire critiquer",
          objective: "Corriger par itérations ciblées, utiliser l'IA comme reviewer.",
          concepts: ["itération ciblée", "self-review IA", "dérive de scope"],
          pitfalls: ["reprompt complet à chaque erreur", "accepter la première réponse"],
        }),
      ],
      exercises: [
        {
          title: "Même feature, trois prompts",
          kind: "synthesis",
          brief:
            "Générer la même feature avec trois prompts de qualité croissante et comparer les sorties.",
        },
        {
          title: "Corriger un prompt vulnérable",
          kind: "audit",
          brief:
            "Analyser un prompt qui produit du code vulnérable et le corriger pour obtenir du code sûr.",
        },
      ],
    }),
    module({
      id: "svc-prompt-m03",
      index: "03",
      title: "Contraintes business dès le prompt",
      subtitle: "Anticiper auth, paiement, notifs et hébergement dans le brief",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Intégrer les services tiers dès le cadrage",
        "Utiliser une checklist « prêt produit »",
        "Éviter les prototypes jetables",
      ],
      lessons: [
        lesson({
          id: "svc-prompt-m03-l1",
          title: "Anticiper les services tiers",
          objective: "Prévoir auth, paiement, notifs, hébergement dans le brief initial.",
          concepts: ["auth", "paiement", "notifications", "hébergement"],
        }),
        lesson({
          id: "svc-prompt-m03-l2",
          title: "Checklist « prêt produit »",
          objective: "Vérifier qu'un brief couvre ce qui rend le produit vendable.",
          concepts: ["checklist produit", "critères de commercialisation"],
          pitfalls: ["prototype jetable", "démo sans chemin vers la prod"],
        }),
      ],
      exercises: [
        {
          title: "Enrichir un prompt CRUD",
          kind: "synthesis",
          brief:
            "Enrichir un prompt CRUD basique avec les contraintes business (auth, paiement, notifs, environnements).",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P2 — Feature CRUD générée par prompts documentés",
    deliverable:
      "Une feature CRUD + UI générée par prompts, avec journal de prompts et justification des itérations.",
    assessment: [
      "Journal de prompts complet et honnête",
      "Chaque itération est justifiée",
      "Le code final respecte le brief et les contraintes",
    ],
  },
});

/* ── P3 — Architecture d'un produit vibe ────────────────────────── */

export const architecturePhase: ProgramPhase = phase({
  slug: "architecture",
  title: "Architecture d'un produit vibe",
  objective: "Découper un système shippable avant de générer quoi que ce soit.",
  modules: [
    module({
      id: "svc-architecture-m01",
      index: "01",
      title: "Découper le système",
      subtitle: "Front, API, DB, jobs, services tiers et frontières de confiance",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Identifier les briques d'un produit web complet",
        "Tracer les frontières de confiance",
        "Décider ce que l'IA ne doit pas inventer seule",
      ],
      lessons: [
        lesson({
          id: "svc-architecture-m01-l1",
          title: "Les briques du système",
          objective: "Cartographier front, API, DB, jobs et services tiers.",
          concepts: ["front", "API", "base de données", "jobs", "services tiers"],
        }),
        lesson({
          id: "svc-architecture-m01-l2",
          title: "Frontières de confiance",
          objective: "Savoir où la validation et l'autorisation sont obligatoires.",
          concepts: ["trust boundaries", "validation aux frontières"],
        }),
        lesson({
          id: "svc-architecture-m01-l3",
          title: "Ce que l'IA n'invente pas seule",
          objective: "Garder architecture et contrats sous contrôle humain.",
          concepts: ["décisions d'architecture", "contrats d'API", "schéma de données"],
        }),
      ],
      exercises: [
        {
          title: "Schéma d'architecture d'un SaaS minimal",
          kind: "synthesis",
          brief:
            "Produire le schéma d'architecture d'un SaaS minimal : briques, flux, frontières de confiance.",
        },
      ],
    }),
    module({
      id: "svc-architecture-m02",
      index: "02",
      title: "Secrets & config par environnement",
      subtitle: "Local, preview, prod : qui voit quoi",
      duration: "35 min",
      difficulty: "intermediate",
      objectives: [
        "Distinguer variables runtime et build-time",
        "Organiser la config local / preview / prod",
        "Prévenir les fuites via Docker et CI",
      ],
      lessons: [
        lesson({
          id: "svc-architecture-m02-l1",
          title: "Runtime vs build-time",
          objective: "Comprendre quand une variable est figée dans le build.",
          concepts: ["variables build-time", "variables runtime", "Vite/env"],
          pitfalls: ["secret exposé dans le bundle front"],
        }),
        lesson({
          id: "svc-architecture-m02-l2",
          title: "Environnements et fuites",
          objective: "Structurer local/preview/prod et bloquer les fuites Docker/CI.",
          concepts: ["environnements", "fuites Docker", "fuites CI"],
        }),
      ],
      exercises: [
        {
          title: "Matrice d'env vars",
          kind: "synthesis",
          brief:
            "Construire la matrice d'environnements (local/preview/prod) pour un produit avec auth + paiement.",
        },
      ],
    }),
    module({
      id: "svc-architecture-m03",
      index: "03",
      title: "Contrats & frontières",
      subtitle: "Webhooks, idempotence, timeouts, retries",
      duration: "40 min",
      difficulty: "intermediate",
      objectives: [
        "Spécifier des contrats d'API stables",
        "Concevoir des webhooks idempotents",
        "Gérer timeouts et retries",
      ],
      lessons: [
        lesson({
          id: "svc-architecture-m03-l1",
          title: "Contrats d'API stables",
          objective: "Définir des contrats que les deux côtés peuvent respecter.",
          concepts: ["contrat d'API", "versionnement", "compatibilité"],
        }),
        lesson({
          id: "svc-architecture-m03-l2",
          title: "Webhooks et idempotence",
          objective: "Traiter un webhook dupliqué sans effet de bord.",
          concepts: ["webhooks", "idempotence", "timeouts", "retries"],
          pitfalls: ["traiter deux fois le même événement", "trust du payload sans signature"],
        }),
      ],
      exercises: [
        {
          title: "Spécifier un webhook de paiement",
          kind: "synthesis",
          brief:
            "Spécifier un webhook de paiement : signature, idempotence, états, erreurs et retries.",
        },
      ],
    }),
  ],
  project: {
    title: "Projet P3 — Architecture cible du capstone",
    deliverable:
      "Le dossier d'architecture du futur capstone : diagramme, décisions, risques identifiés.",
    assessment: [
      "Diagramme lisible avec frontières de confiance",
      "Décisions justifiées (trade-offs explicites)",
      "Risques identifiés avec mitigation",
    ],
  },
});
