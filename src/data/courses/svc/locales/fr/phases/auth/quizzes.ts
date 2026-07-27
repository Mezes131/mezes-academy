import type { Quiz } from "@/types";

export const authQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-auth-quiz-m01",
    title: "Modèles d'auth : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Pourquoi éviter de réinventer l'authentification maison en production ?",
        options: [
          { id: "a", label: "Parce que c'est interdit par la loi partout" },
          { id: "b", label: "Les détails (hash, sessions, reset…) sont faciles à rater ; un provider éprouvé réduit le risque" },
          { id: "c", label: "Parce que React l'interdit" },
          { id: "d", label: "Parce que Git refuse les mots de passe" },
        ],
        correct: ["b"],
        explanation:
          "L'IA génère souvent une auth « plausible » mais fragile. Un service tiers mature + ton audit = mieux.",
      },
      {
        id: "q2",
        question: "Un JWT, c'est surtout…",
        options: [
          { id: "a", label: "Un jeton signé qu'on peut vérifier ; son stockage et son expiration comptent beaucoup" },
          { id: "b", label: "Un fichier CSS" },
          { id: "c", label: "Une base de données" },
          { id: "d", label: "Un hébergeur" },
        ],
        correct: ["a"],
        explanation:
          "Le danger n'est pas le JWT en soi : c'est le mettre n'importe où sans expiration ni réflexion.",
      },
      {
        id: "q3",
        question: "Un lien magique, c'est…",
        options: [
          { id: "a", label: "Se connecter via un lien envoyé par email, souvent sans mot de passe" },
          { id: "b", label: "Un sortilège CSS" },
          { id: "c", label: "Une clé Stripe" },
          { id: "d", label: "Un commit Git" },
        ],
        correct: ["a"],
        explanation:
          "Pratique pour réduire la friction. Le lien doit être à usage limité et à durée courte.",
      },
      {
        id: "q4",
        question: "OAuth / connexion via compte existant sert surtout à…",
        options: [
          { id: "a", label: "Laisser l'utilisateur se connecter avec Google, Microsoft, etc." },
          { id: "b", label: "Remplacer HTTPS" },
          { id: "c", label: "Supprimer la base de données" },
          { id: "d", label: "Désactiver les tests" },
        ],
        correct: ["a"],
        explanation:
          "Courant en B2B (comptes entreprise) et en grand public.",
      },
      {
        id: "q5",
        question: "Quel piège classique du code d'auth généré par IA ?",
        options: [
          { id: "a", label: "JWT en localStorage sans réflexion, ou auth maison fragile" },
          { id: "b", label: "Utiliser HTTPS" },
          { id: "c", label: "Vérifier la session côté serveur" },
          { id: "d", label: "Choisir un provider tiers" },
        ],
        correct: ["a"],
        explanation:
          "L'IA propose souvent le chemin le plus court, pas le plus sûr.",
      },
    ],
  },

  m02: {
    id: "svc-auth-quiz-m02",
    title: "Brancher un provider : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Dans inscription → session, qui a le dernier mot sur « est-il connecté ? » pour une action sensible ?",
        options: [
          { id: "a", label: "Le serveur (vérification de session / jeton)" },
          { id: "b", label: "Uniquement le CSS" },
          { id: "c", label: "Uniquement localStorage" },
          { id: "d", label: "Le README" },
        ],
        correct: ["a"],
        explanation:
          "Le client affiche. Le serveur autorise.",
      },
      {
        id: "q2",
        question: "À quoi sert surtout le SDK client du provider ?",
        options: [
          { id: "a", label: "Faciliter formulaires et état d'UI de connexion" },
          { id: "b", label: "Remplacer toute vérification serveur" },
          { id: "c", label: "Stocker les clés secrètes dans le navigateur" },
          { id: "d", label: "Désactiver HTTPS" },
        ],
        correct: ["a"],
        explanation:
          "Confort UI. Les secrets et les droits restent serveur.",
      },
      {
        id: "q3",
        question: "Masquer le menu Admin si !user…",
        options: [
          { id: "a", label: "Suffit à protéger /api/admin" },
          { id: "b", label: "N'empêche pas d'appeler l'API directement si elle n'est pas protégée" },
          { id: "c", label: "Remplace les rôles" },
          { id: "d", label: "Est interdit en React" },
        ],
        correct: ["b"],
        explanation:
          "L'UI n'est pas une frontière de confiance.",
      },
      {
        id: "q4",
        question: "Où mettent-on les clés secrètes du provider ?",
        options: [
          { id: "a", label: "Variables d'environnement côté serveur / hébergeur" },
          { id: "b", label: "Dans le CSS" },
          { id: "c", label: "En dur dans un composant React public" },
          { id: "d", label: "Dans l'URL du site" },
        ],
        correct: ["a"],
        explanation:
          "Comme en phase architecture : rien de secret dans le paquet navigateur.",
      },
      {
        id: "q5",
        question: "Clerk, Auth.js, Supabase Auth…",
        options: [
          { id: "a", label: "Sont des exemples de providers / stacks d'auth tiers à préférer à une auth maison" },
          { id: "b", label: "Sont des bases de données SQL" },
          { id: "c", label: "Remplacent le besoin d'audit" },
          { id: "d", label: "Interdisent les rôles" },
        ],
        correct: ["a"],
        explanation:
          "Tu choisis un provider, tu cadres, tu audites l'intégration.",
      },
    ],
  },

  m03: {
    id: "svc-auth-quiz-m03",
    title: "Autorisation : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Authentification vs autorisation ?",
        options: [
          { id: "a", label: "Qui es-tu ? vs qu'as-tu le droit de faire / voir ?" },
          { id: "b", label: "CSS vs HTML" },
          { id: "c", label: "Build vs preview" },
          { id: "d", label: "Git vs npm" },
        ],
        correct: ["a"],
        explanation:
          "Être connecté ne donne pas tous les droits.",
      },
      {
        id: "q2",
        question: "Un IDOR, c'est…",
        options: [
          { id: "a", label: "Accéder à la ressource d'un autre en changeant l'identifiant (URL / API) sans contrôle" },
          { id: "b", label: "Un type de police d'écriture" },
          { id: "c", label: "Un hébergeur" },
          { id: "d", label: "Un test unitaire" },
        ],
        correct: ["a"],
        explanation:
          "Classique dès qu'on a des ids numériques ou prévisibles sans vérif de propriété.",
      },
      {
        id: "q3",
        question: "Les règles d'accès en base (RLS / policies) servent à…",
        options: [
          { id: "a", label: "Limiter quelles lignes un rôle / utilisateur peut lire ou écrire" },
          { id: "b", label: "Choisir les couleurs du thème" },
          { id: "c", label: "Remplacer HTTPS" },
          { id: "d", label: "Générer des JWT magiques" },
        ],
        correct: ["a"],
        explanation:
          "Filet utile en plus des contrôles dans l'API.",
      },
      {
        id: "q4",
        question: "Pourquoi le contrôle d'accès côté client ne suffit jamais ?",
        options: [
          { id: "a", label: "Parce que le client peut être modifié ou contourné" },
          { id: "b", label: "Parce que TypeScript l'interdit" },
          { id: "c", label: "Parce que Git force le serveur" },
          { id: "d", label: "Parce que les providers le refusent" },
        ],
        correct: ["a"],
        explanation:
          "Frontière de confiance = serveur (et base).",
      },
      {
        id: "q5",
        question: "Ids « difficiles à deviner » sans contrôle d'accès…",
        options: [
          { id: "a", label: "Remplacent une vraie autorisation" },
          { id: "b", label: "Ne suffisent pas : sécurité par l'obscurité" },
          { id: "c", label: "Sont exigés par OAuth" },
          { id: "d", label: "Corrigent l'IDOR automatiquement" },
        ],
        correct: ["b"],
        explanation:
          "Toujours vérifier le droit sur l'objet.",
      },
    ],
  },

  m04: {
    id: "svc-auth-quiz-m04",
    title: "Parcours sensibles : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Un jeton de reset password devrait être…",
        options: [
          { id: "a", label: "À usage unique (ou très limité) et à durée de vie courte" },
          { id: "b", label: "Réutilisable des semaines" },
          { id: "c", label: "Publié dans le README" },
          { id: "d", label: "Stocké en clair dans le front" },
        ],
        correct: ["a"],
        explanation:
          "Sinon quelqu'un qui intercepte le lien garde un accès durable.",
      },
      {
        id: "q2",
        question: "Vérifier l'email sert surtout à…",
        options: [
          { id: "a", label: "S'assurer que la boîte existe / appartient à l'utilisateur avant des actions sensibles" },
          { id: "b", label: "Remplacer le mot de passe à jamais" },
          { id: "c", label: "Désactiver HTTPS" },
          { id: "d", label: "Colorier le logo" },
        ],
        correct: ["a"],
        explanation:
          "Réduit les comptes fictifs et certaines prises de contrôle.",
      },
      {
        id: "q3",
        question: "Révocation de session multi-appareil, c'est…",
        options: [
          { id: "a", label: "Pouvoir déconnecter un appareil / toutes les sessions (ex. téléphone perdu)" },
          { id: "b", label: "Supprimer la base" },
          { id: "c", label: "Changer le thème" },
          { id: "d", label: "Désactiver les tests" },
        ],
        correct: ["a"],
        explanation:
          "Sans révocation, une session volée vit trop longtemps.",
      },
      {
        id: "q4",
        question: "Une checklist auth prod doit inclure…",
        options: [
          { id: "a", label: "Provider, protections serveur, parcours sensibles, politique d'accès" },
          { id: "b", label: "Uniquement le choix de police" },
          { id: "c", label: "Uniquement des animations" },
          { id: "d", label: "Uniquement CORS *" },
        ],
        correct: ["a"],
        explanation:
          "C'est le filet avant la Livraison.",
      },
      {
        id: "q5",
        question: "Se fier à localStorage.role === 'admin'…",
        options: [
          { id: "a", label: "Est une protection serveur solide" },
          { id: "b", label: "Est contournable : ce n'est pas une autorisation réelle" },
          { id: "c", label: "Est exigé par tous les providers" },
          { id: "d", label: "Remplace RLS" },
        ],
        correct: ["b"],
        explanation:
          "Tout le monde peut modifier localStorage. Le serveur décide.",
      },
    ],
  },
};
