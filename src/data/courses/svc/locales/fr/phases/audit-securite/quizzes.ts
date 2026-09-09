import type { Quiz } from "@/types";

export const auditSecuriteQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-audit-securite-quiz-m01",
    title: "Secrets et configuration : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Un secret « en dur », c'est surtout…",
        options: [
          {
            id: "a",
            label: "Une clé, un jeton ou un mot de passe collé dans le code, la config ou Docker",
          },
          { id: "b", label: "Une variable d'environnement injectée à l'exécution depuis un coffre" },
          { id: "c", label: "Un hash public de commit" },
          { id: "d", label: "Un commentaire TODO sans valeur sensible" },
        ],
        correct: ["a"],
        explanation:
          "L'IA colle souvent des clés d'exemple dans le code. Un secret live en dur = incident, même « temporaire ».",
      },
      {
        id: "q2",
        question: "Supprimer un secret du fichier actuel suffit-il si le commit est déjà poussé ?",
        options: [
          {
            id: "a",
            label: "Non : le secret reste dans l'historique git et doit être tourné (révoqué)",
          },
          { id: "b", label: "Oui : git ignore l'historique une fois le fichier modifié" },
          { id: "c", label: "Oui si le fichier s'appelle .env.local" },
          { id: "d", label: "Oui si personne n'a encore cloné le dépôt" },
        ],
        correct: ["a"],
        explanation:
          "L'historique conserve le blob. Rotation obligatoire + purge/historique si besoin, jamais « juste un nouveau commit ».",
      },
      {
        id: "q3",
        question: ".gitignore et .dockerignore servent notamment à…",
        options: [
          {
            id: "a",
            label: "Empêcher de versionner ou d'embarquer des fichiers de secrets / .env",
          },
          { id: "b", label: "Chiffrer automatiquement les clés API" },
          { id: "c", label: "Remplacer un coffre de secrets" },
          { id: "d", label: "Autoriser les secrets dans l'interface React" },
        ],
        correct: ["a"],
        explanation:
          "Sans ignore, l'IA (ou toi) committe .env. Dockerignore évite de copier les secrets dans l'image.",
      },
      {
        id: "q4",
        question: "Le principe du moindre accès pour les secrets veut dire…",
        options: [
          {
            id: "a",
            label: "Chaque secret n'est accessible qu'aux services / personnes qui en ont besoin",
          },
          { id: "b", label: "Une seule clé master pour tout le monorepo" },
          { id: "c", label: "Mettre toutes les clés dans le dépôt « pour simplifier »" },
          { id: "d", label: "Partager la clé de prod dans le canal Slack de l'équipe" },
        ],
        correct: ["a"],
        explanation:
          "Coffres, périmètres, environnements séparés. Une clé unique partagée = rayon d'impact maximal.",
      },
      {
        id: "q5",
        question: "Quand l'IA génère un exemple avec une « vraie-looking » API key…",
        options: [
          {
            id: "a",
            label: "Tu la traites comme suspecte : placeholders, scan, jamais committer une clé réelle",
          },
          { id: "b", label: "Tu la copies telle quelle en prod pour gagner du temps" },
          { id: "c", label: "Tu la mets dans l'interface avec VITE_ pour la partager" },
          { id: "d", label: "Tu la laisses : les scanners ne regardent jamais les exemples" },
        ],
        correct: ["a"],
        explanation:
          "Les extraits générés sont une source classique de fuites. Placeholders + coffre + scan de secrets.",
      },
    ],
  },

  m02: {
    id: "svc-audit-securite-quiz-m02",
    title: "Entrées et injections : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "La validation aux frontières, c'est…",
        options: [
          {
            id: "a",
            label: "Valider / typer les entrées là où elles entrent (API, formulaires, envois de fichiers) avant de les traiter",
          },
          { id: "b", label: "Faire confiance à l'interface uniquement" },
          { id: "c", label: "Concaténer la requête SQL avec l'entrée utilisateur" },
          { id: "d", label: "Désactiver le CORS pour simplifier" },
        ],
        correct: ["a"],
        explanation:
          "L'interface est contournable. Schémas, types, listes d'autorisation côté serveur (et DB paramétrée).",
      },
      {
        id: "q2",
        question: "Contre l'injection SQL, la défense de base est…",
        options: [
          {
            id: "a",
            label: "Requêtes paramétrées / ORM correctement utilisés, jamais de concaténation de SQL",
          },
          { id: "b", label: "Échapper manuellement avec replace(\"'\", \"\") seulement" },
          { id: "c", label: "Cacher le nom des tables" },
          { id: "d", label: "Mettre la base en lecture seule pour tout le monde" },
        ],
        correct: ["a"],
        explanation:
          "L'IA adore ``WHERE id = ${id}``. Paramètres liés (ou query builder sûr) = règle non négociable.",
      },
      {
        id: "q3",
        question: "dangerouslySetInnerHTML est risqué surtout si…",
        options: [
          {
            id: "a",
            label: "Le HTML vient d'une entrée utilisateur ou d'une source non contrôlée, sans sanitization",
          },
          { id: "b", label: "Tu l'utilises pour un fragment statique hardcodé et de confiance" },
          { id: "c", label: "Le composant a un className Tailwind" },
          { id: "d", label: "Le bundle est minifié" },
        ],
        correct: ["a"],
        explanation:
          "XSS stocké / réfléchi : script injecté dans le DOM. Sanitize ou n'utilise pas dangerouslySetInnerHTML.",
      },
      {
        id: "q4",
        question: "Une injection de commande apparaît typiquement quand…",
        options: [
          {
            id: "a",
            label: "On passe une entrée utilisateur à un shell (exec, spawn avec shell:true) sans contrôle",
          },
          { id: "b", label: "On utilise uniquement des APIs filesystem sans shell" },
          { id: "c", label: "On valide un enum côté serveur" },
          { id: "d", label: "On stocke un UUID en base" },
        ],
        correct: ["a"],
        explanation:
          "L'IA branche souvent `exec(\`convert ${filename}\`)`. Préfère des APIs sans shell + liste d'autorisation.",
      },
      {
        id: "q5",
        question: "Pour les envois de fichiers, un minimum sûr inclut…",
        options: [
          {
            id: "a",
            label: "Contrôle de type/taille, nom de fichier non fiable, stockage hors exécution",
          },
          { id: "b", label: "Accepter tout MIME déclaré par le client" },
          { id: "c", label: "Servir les fichiers envoyés depuis /public avec extension .php" },
          { id: "d", label: "Désactiver toute validation « pour l'UX »" },
        ],
        correct: ["a"],
        explanation:
          "MIME client = mensonge. Vérifie le contenu, limite la taille, utilise des noms aléatoires, et n'exécute rien côté serveur.",
      },
    ],
  },

  m03: {
    id: "svc-audit-securite-quiz-m03",
    title: "AuthZ et surfaces API : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Un IDOR, c'est…",
        options: [
          {
            id: "a",
            label: "Accéder à la ressource d'un autre utilisateur en changeant un id (sans contrôle de propriété)",
          },
          { id: "b", label: "Une erreur DNS" },
          { id: "c", label: "Un cookie HttpOnly bien configuré" },
          { id: "d", label: "Une limite de débit trop stricte" },
        ],
        correct: ["a"],
        explanation:
          "GET /orders/123 → 124 sans vérifier que la commande appartient à l'appelant. Classique du code généré.",
      },
      {
        id: "q2",
        question: "Cartographier les surfaces exposées sert à…",
        options: [
          {
            id: "a",
            label: "Lister routes / webhooks / tâches publiques et vérifier authn/authz pour chacun",
          },
          { id: "b", label: "Remplacer les tests unitaires" },
          { id: "c", label: "Éviter d'écrire des policies RLS" },
          { id: "d", label: "Publier toutes les routes sans middleware" },
        ],
        correct: ["a"],
        explanation:
          "Sans carte, l'IA laisse des /api/admin ouverts. Matrice route × rôle avant mise en production.",
      },
      {
        id: "q3",
        question: "Les webhooks sont « publics par construction », donc…",
        options: [
          {
            id: "a",
            label: "Ils doivent vérifier une signature (ou secret) et rester strictement limités en périmètre",
          },
          { id: "b", label: "Ils n'ont besoin d'aucune vérification" },
          { id: "c", label: "Ils peuvent exécuter n'importe quel SQL reçu" },
          { id: "d", label: "Ils doivent être appelables depuis le navigateur avec la clé secrète" },
        ],
        correct: ["a"],
        explanation:
          "Sans vérif de signature, n'importe qui forge des événements. Idempotence + auth du fournisseur.",
      },
      {
        id: "q4",
        question: "RLS (Row Level Security) bien utilisé…",
        options: [
          {
            id: "a",
            label: "Applique des policies en base pour limiter les lignes visibles / modifiables par rôle",
          },
          { id: "b", label: "Remplace complètement l'auth applicative sans policies" },
          { id: "c", label: "Désactive les indexes" },
          { id: "d", label: "Autorise SELECT * pour anon par défaut" },
        ],
        correct: ["a"],
        explanation:
          "RLS = filet côté DB. Policies explicites ; « RLS on » sans policy utile donne un faux sentiment de sécurité.",
      },
      {
        id: "q5",
        question: "Une route « protégée » uniquement dans l'interface React…",
        options: [
          {
            id: "a",
            label: "N'est pas protégée : l'API doit vérifier session/rôle serveur (ou équivalent)",
          },
          { id: "b", label: "Suffit si le bouton Admin est caché" },
          { id: "c", label: "Bloque curl et Postman automatiquement" },
          { id: "d", label: "Remplace les policies RLS" },
        ],
        correct: ["a"],
        explanation:
          "Masquer un lien ≠ AuthZ. Toute surface API doit enforce côté serveur.",
      },
    ],
  },

  m04: {
    id: "svc-audit-securite-quiz-m04",
    title: "Dépendances et chaîne d'approvisionnement : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Une dépendance « hallucinée » par l'IA, c'est…",
        options: [
          {
            id: "a",
            label: "Un package inventé ou mal orthographié que l'IA propose d'installer",
          },
          { id: "b", label: "Une dep listée sur npm avec des millions de téléchargements" },
          { id: "c", label: "Un types package officiel @types/*" },
          { id: "d", label: "L'environnement d'exécution Node lui-même" },
        ],
        correct: ["a"],
        explanation:
          "Usurpation de nom de paquet / noms inventés : quelqu'un peut publier le faux package. Vérifie avant npm install.",
      },
      {
        id: "q2",
        question: "Pinner les versions sert à…",
        options: [
          {
            id: "a",
            label: "Contrôler exactement ce qui est installé et limiter les surprises de plages trop larges",
          },
          { id: "b", label: "Accélérer npm en ignorant le lockfile" },
          { id: "c", label: "Installer automatiquement toute maj majeure" },
          { id: "d", label: "Désactiver npm audit" },
        ],
        correct: ["a"],
        explanation:
          "`^` / `*` larges + install sans lock = chaîne d'approvisionnement flottante. Préfère donc un lock et des pins raisonnables.",
      },
      {
        id: "q3",
        question: "npm audit (ou équivalent) dans un flux Secure Vibe Coding…",
        options: [
          {
            id: "a",
            label: "Est un garde-fou régulier : on lit, on corrige ou on justifie, on ne l'ignore pas aveuglément",
          },
          { id: "b", label: "Est inutile dès que le code compile" },
          { id: "c", label: "Remplace la revue des secrets" },
          { id: "d", label: "Doit être désactivé en CI pour livrer plus vite" },
        ],
        correct: ["a"],
        explanation:
          "Ce n'est pas magique, mais ça signale des CVE connues. Contrôle CI + triage : autrement dit, pas de « audit --force » aveugle.",
      },
      {
        id: "q4",
        question: "Face à un package.json généré avec 40 deps « au cas où »…",
        options: [
          {
            id: "a",
            label: "Tu assainis : retire l'inutile, vérifie l'existence, pin, audite",
          },
          { id: "b", label: "Tu installes tout sans lire" },
          { id: "c", label: "Tu ajoutes encore des deps pour « être moderne »" },
          { id: "d", label: "Tu commits node_modules pour figer" },
        ],
        correct: ["a"],
        explanation:
          "Surface d'attaque = chaque dep. Moins de deps = moins de risque et de maintenance.",
      },
      {
        id: "q5",
        question: "L'usurpation de nom de paquet dans la chaîne d'approvisionnement, c'est…",
        options: [
          {
            id: "a",
            label: "Publier un package au nom proche d'un vrai (ex. lodahs) pour piéger les installs",
          },
          { id: "b", label: "Utiliser uniquement des scopes @org vérifiés" },
          { id: "c", label: "Un type d'erreur TypeScript" },
          { id: "d", label: "Une bonne pratique de naming monorepo" },
        ],
        correct: ["a"],
        explanation:
          "L'IA qui « invente » un nom proche d'un package réel est un vecteur. Vérifie registry + mainteneurs.",
      },
    ],
  },
};
