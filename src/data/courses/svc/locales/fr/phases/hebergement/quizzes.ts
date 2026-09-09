import type { Quiz } from "@/types";

export const hebergementQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-hebergement-quiz-m01",
    title: "Choisir où héberger : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "PaaS vs VPS, en une phrase…",
        options: [
          {
            id: "a",
            label:
              "PaaS gère plus l'infra pour toi ; VPS te donne le serveur et la charge ops",
          },
          { id: "b", label: "VPS = toujours gratuit ; PaaS = toujours payant" },
          { id: "c", label: "Ils sont identiques, seul le logo change" },
          { id: "d", label: "PaaS interdit HTTPS" },
        ],
        correct: ["a"],
        explanation:
          "Critère réel : qui porte le patch OS, le reverse proxy, les sauvegardes ? PaaS vs VPS = compromis coût / contrôle / ops.",
      },
      {
        id: "q2",
        question: "Vercel, Fly, Railway (exemples du marché) servent surtout à…",
        options: [
          {
            id: "a",
            label:
              "Illustrer des options PaaS/plateformes : comparer coût, ops et démarrage à froid selon le produit",
          },
          { id: "b", label: "Imposer une seule plateforme obligatoire du cours" },
          { id: "c", label: "Remplacer la notion d'environnements" },
          { id: "d", label: "Éviter toute configuration DNS" },
        ],
        correct: ["a"],
        explanation:
          "Indépendant du fournisseur : ce sont des options de marché. Tu choisis selon le produit, et non selon la mode du tutoriel.",
      },
      {
        id: "q3",
        question: "Le démarrage à froid impacte surtout…",
        options: [
          {
            id: "a",
            label:
              "La latence au premier accès quand l'instance / la fonction était endormie",
          },
          { id: "b", label: "La couleur du logo de la plateforme" },
          { id: "c", label: "Uniquement le prix du nom de domaine" },
          { id: "d", label: "Le contraste WCAG de la page de paiement" },
        ],
        correct: ["a"],
        explanation:
          "Apps peu sollicitées sur free tiers / extinction à zéro : le premier utilisateur paie le réveil. Critère produit.",
      },
      {
        id: "q4",
        question: "Choisir un hébergeur « parce que le tutoriel IA le cite »…",
        options: [
          {
            id: "a",
            label: "Est un mauvais critère : coût, ops, stack et trafic priment",
          },
          { id: "b", label: "Garantit le meilleur SLA du marché" },
          { id: "c", label: "Remplace la séparation aperçu / prod" },
          { id: "d", label: "Évite les secrets à l'exécution" },
        ],
        correct: ["a"],
        explanation:
          "Mode ≠ adéquation produit. Page d'accueil statique ≠ travailleur long ≠ DB collée au process.",
      },
      {
        id: "q5",
        question: "Pour trois produits différents, la bonne approche est…",
        options: [
          {
            id: "a",
            label:
              "Justifier un hébergement par produit (contraintes, coût, charge ops)",
          },
          { id: "b", label: "Tout mettre sur la même plateforme « par défaut »" },
          { id: "c", label: "Ignorer le démarrage à froid et le coût" },
          { id: "d", label: "Choisir uniquement au logo le plus connu" },
        ],
        correct: ["a"],
        explanation:
          "Exercice P10 m01 : trois justifications distinctes. Pas un copier-coller de plateforme.",
      },
    ],
  },

  m02: {
    id: "svc-hebergement-quiz-m02",
    title: "Environnements : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Local, aperçu et prod doivent…",
        options: [
          {
            id: "a",
            label:
              "Être séparés : configs et secrets distincts, sans fuite entre eux",
          },
          { id: "b", label: "Partager la même clé secrète « pour simplifier »" },
          { id: "c", label: "Pointer tous vers la base de prod" },
          { id: "d", label: "Être indistinguables dans les URLs" },
        ],
        correct: ["a"],
        explanation:
          "Fuite aperçu → prod (clés, webhooks, données) = incident classique. Trois environnements, trois silos.",
      },
      {
        id: "q2",
        question: "Les secrets lus à l'exécution…",
        options: [
          {
            id: "a",
            label:
              "Sont injectés à l'exécution (plateforme / coffre), jamais commités",
          },
          { id: "b", label: "Vivent dans le dépôt « pour que CI les voie »" },
          { id: "c", label: "Peuvent être collés dans l'interface Vite sans risque" },
          { id: "d", label: "Remplacent le TLS" },
        ],
        correct: ["a"],
        explanation:
          "Secrets = à l'exécution / coffre. Historique git = surface d'attaque.",
      },
      {
        id: "q3",
        question: "Avec Vite, une variable préfixée VITE_…",
        options: [
          {
            id: "a",
            label:
              "Est embarquée au build côté client : ne jamais y mettre de secret",
          },
          { id: "b", label: "Reste magiquement serveur-only" },
          { id: "c", label: "Chiffre automatiquement les clés API" },
          { id: "d", label: "Remplace .gitignore" },
        ],
        correct: ["a"],
        explanation:
          "Build vs exécution : ce qui part dans le bundle navigateur n'est pas un secret. URLs publiques OK ; clés secrètes non.",
      },
      {
        id: "q4",
        question: "Une matrice d'environnements documente…",
        options: [
          {
            id: "a",
            label:
              "Chaque variable : où elle vit (local/aperçu/prod) et si elle est secrète",
          },
          { id: "b", label: "Uniquement la couleur du thème" },
          { id: "c", label: "Le nombre de commits" },
          { id: "d", label: "La grille tarifaire marketing" },
        ],
        correct: ["a"],
        explanation:
          "Livrable m02 : matrice complète. Évite « ça marche chez moi » et les fuites de config.",
      },
      {
        id: "q5",
        question: "Pointer un aperçu sur la base / les webhooks de prod…",
        options: [
          {
            id: "a",
            label: "Est une fuite dangereuse : données et effets de bord réels",
          },
          { id: "b", label: "Est la meilleure pratique CI" },
          { id: "c", label: "Simplifie le retour en arrière" },
          { id: "d", label: "Remplace les contrôles lint" },
        ],
        correct: ["a"],
        explanation:
          "Aperçu = bac à sable. Prod = production. Mélanger = incident + factures surprises.",
      },
    ],
  },

  m03: {
    id: "svc-hebergement-quiz-m03",
    title: "CI/CD minimal : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Une chaîne CI/CD (pipeline) minimale inclut surtout…",
        options: [
          {
            id: "a",
            label: "Build, tests, déploiement, avec garde-fous avant la prod",
          },
          { id: "b", label: "Uniquement un git push --force sur main" },
          { id: "c", label: "Déployer sans jamais tester" },
          { id: "d", label: "Copier les secrets dans les journaux CI" },
        ],
        correct: ["a"],
        explanation:
          "Automatiser le chemin : build → test → déploiement. Autrement dit, pas « merge et espérer ».",
      },
      {
        id: "q2",
        question: "Un contrôle lint / audit rouge doit…",
        options: [
          {
            id: "a",
            label: "Bloquer le déploiement tant que le signal n'est pas vert",
          },
          { id: "b", label: "Être ignoré « pour livrer plus vite »" },
          { id: "c", label: "S'exécuter seulement après la prod" },
          { id: "d", label: "Remplacer le retour en arrière" },
        ],
        correct: ["a"],
        explanation:
          "Piège syllabus : déployer sans contrôle. Lint rouge ou secret détecté doit donc entraîner un refus.",
      },
      {
        id: "q3",
        question: "Le retour en arrière, c'est…",
        options: [
          {
            id: "a",
            label:
              "Savoir revenir à une version saine (version précédente / revert contrôlé)",
          },
          { id: "b", label: "Supprimer le dépôt pour repartir de zéro" },
          { id: "c", label: "Ignorer les erreurs 5xx jusqu'au lundi" },
          { id: "d", label: "Redéployer la même build cassée en boucle" },
        ],
        correct: ["a"],
        explanation:
          "Sans stratégie de retour en arrière, un déploiement raté devient un incident prolongé.",
      },
      {
        id: "q4",
        question: "Une chaîne qui « refuse » correctement…",
        options: [
          {
            id: "a",
            label:
              "Refuse de déployer si secret scanné ou lint/audit en échec",
          },
          { id: "b", label: "Déploie quand même avec un warning jaune" },
          { id: "c", label: "Saute les tests le vendredi" },
          { id: "d", label: "Commit les .env dans l'artefact" },
        ],
        correct: ["a"],
        explanation:
          "Exercice m03 : contrôles secrets + lint. Refuser > « on verra en prod ».",
      },
      {
        id: "q5",
        question: "Déployer sans contrôle ni retour en arrière planifié…",
        options: [
          {
            id: "a",
            label: "Est un piège classique : incident sans filet de sécurité",
          },
          { id: "b", label: "Est acceptable si l'interface compile" },
          { id: "c", label: "Remplace la séparation des environnements" },
          { id: "d", label: "Garantit le HTTPS automatiquement" },
        ],
        correct: ["a"],
        explanation:
          "Syllabus : déployer sans contrôle et sans stratégie de retour en arrière, c'est à éviter.",
      },
    ],
  },

  m04: {
    id: "svc-hebergement-quiz-m04",
    title: "Domaines, TLS, DNS : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Un domaine personnalisé en HTTPS, c'est…",
        options: [
          {
            id: "a",
            label:
              "Ton nom de domaine branché au service avec certificat TLS valide",
          },
          { id: "b", label: "Uniquement une URL *.vercel.app sans DNS" },
          { id: "c", label: "HTTP clair « pour aller plus vite »" },
          { id: "d", label: "Un enregistrement MX qui remplace A/CNAME" },
        ],
        correct: ["a"],
        explanation:
          "Mise en ligne : domaine → plateforme + TLS. URL publique HTTPS = critère P10.",
      },
      {
        id: "q2",
        question: "TLS / HTTPS sert à…",
        options: [
          {
            id: "a",
            label: "Chiffrer le trafic client ↔ serveur et inspirer confiance",
          },
          { id: "b", label: "Stocker les secrets dans le dépôt" },
          { id: "c", label: "Remplacer les contrôles CI" },
          { id: "d", label: "Éviter de configurer le DNS email" },
        ],
        correct: ["a"],
        explanation:
          "Sans HTTPS, formulaires auth/paiement et confiance utilisateur souffrent.",
      },
      {
        id: "q3",
        question: "Les redirections (www → apex, HTTP → HTTPS)…",
        options: [
          {
            id: "a",
            label:
              "Évitent le contenu dupliqué et forcent le chemin canonique sécurisé",
          },
          { id: "b", label: "Sont optionnelles même pour une page de paiement" },
          { id: "c", label: "Remplacent SPF/DKIM" },
          { id: "d", label: "Désactivent le domaine personnalisé" },
        ],
        correct: ["a"],
        explanation:
          "Liste de contrôle de mise en ligne : une URL canonique, HTTPS forcé, redirections cohérentes.",
      },
      {
        id: "q4",
        question: "SPF / DKIM basiques pour l'email…",
        options: [
          {
            id: "a",
            label:
              "Authentifient le domaine d'envoi et améliorent la délivrabilité",
          },
          { id: "b", label: "Chiffrent la base de données" },
          { id: "c", label: "Remplacent le certificat TLS du site" },
          { id: "d", label: "Sont inutiles si on utilise un fournisseur d'email" },
        ],
        correct: ["a"],
        explanation:
          "DNS email ≠ DNS web seul. Transactionnel (reçus, reset) dépend de SPF/DKIM.",
      },
      {
        id: "q5",
        question: "Le projet P10 exige notamment…",
        options: [
          {
            id: "a",
            label:
              "Prod HTTPS publique, aperçu distinct, procédure ou chaîne de déploiement documentée",
          },
          { id: "b", label: "Uniquement un build local sans URL" },
          { id: "c", label: "Aperçu = prod avec les mêmes secrets" },
          { id: "d", label: "HTTP sans domaine personnalisé" },
        ],
        correct: ["a"],
        explanation:
          "Livrable : aperçu + prod, URL HTTPS, déploiement documenté.",
      },
    ],
  },
};
