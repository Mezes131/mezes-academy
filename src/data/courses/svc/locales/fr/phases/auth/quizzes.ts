import type { Quiz } from "@/types";

export const authQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-auth-quiz-m01",
    title: "Modèles de connexion : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Pourquoi éviter de réinventer la connexion soi-même en production ?",
        options: [
          { id: "a", label: "Parce que c'est interdit par la loi partout" },
          { id: "b", label: "Les détails (mots de passe, sessions, réinitialisation…) sont faciles à rater ; un service éprouvé réduit le risque" },
          { id: "c", label: "Parce que React l'interdit" },
          { id: "d", label: "Parce que Git refuse les mots de passe" },
        ],
        correct: ["b"],
        explanation:
          "L'IA génère souvent une connexion « plausible » mais fragile. Un service tiers mature + ton audit = mieux.",
      },
      {
        id: "q2",
        question: "Un jeton signé, c'est surtout…",
        options: [
          { id: "a", label: "Une preuve signée qu'on peut vérifier ; où on le range et quand il expire comptent beaucoup" },
          { id: "b", label: "Un fichier de style" },
          { id: "c", label: "Une base de données" },
          { id: "d", label: "Un hébergeur" },
        ],
        correct: ["a"],
        explanation:
          "Le danger n'est pas le jeton en soi : c'est le mettre n'importe où sans expiration ni réflexion.",
      },
      {
        id: "q3",
        question: "Un lien magique, c'est…",
        options: [
          { id: "a", label: "Se connecter via un lien envoyé par email, souvent sans mot de passe" },
          { id: "b", label: "Un effet de style" },
          { id: "c", label: "Une clé de paiement" },
          { id: "d", label: "Un enregistrement Git" },
        ],
        correct: ["a"],
        explanation:
          "Pratique pour réduire les obstacles. Le lien doit être à usage limité et à durée courte.",
      },
      {
        id: "q4",
        question: "La connexion via un compte existant (Google, Microsoft…) sert surtout à…",
        options: [
          { id: "a", label: "Laisser l'utilisateur entrer avec un compte qu'il a déjà" },
          { id: "b", label: "Remplacer le HTTPS" },
          { id: "c", label: "Supprimer la base de données" },
          { id: "d", label: "Désactiver les tests" },
        ],
        correct: ["a"],
        explanation:
          "Courant pour les entreprises et le grand public.",
      },
      {
        id: "q5",
        question: "Quel piège classique du code de connexion généré par IA ?",
        options: [
          { id: "a", label: "Jeton dans le stockage du navigateur sans réflexion, ou connexion maison fragile" },
          { id: "b", label: "Utiliser le HTTPS" },
          { id: "c", label: "Vérifier la connexion côté serveur" },
          { id: "d", label: "Choisir un service tiers" },
        ],
        correct: ["a"],
        explanation:
          "L'IA propose souvent le chemin le plus court, pas le plus sûr.",
      },
    ],
  },

  m02: {
    id: "svc-auth-quiz-m02",
    title: "Brancher un service de connexion : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Dans inscription → rester reconnu, qui a le dernier mot sur « est-il connecté ? » pour une action sensible ?",
        options: [
          { id: "a", label: "Le serveur (vérification de connexion / jeton)" },
          { id: "b", label: "Uniquement le style CSS" },
          { id: "c", label: "Uniquement le stockage du navigateur" },
          { id: "d", label: "Le fichier README" },
        ],
        correct: ["a"],
        explanation:
          "L'écran affiche. Le serveur autorise.",
      },
      {
        id: "q2",
        question: "À quoi sert surtout la bibliothèque côté navigateur du service de connexion ?",
        options: [
          { id: "a", label: "Faciliter formulaires et état d'affichage de connexion" },
          { id: "b", label: "Remplacer toute vérification serveur" },
          { id: "c", label: "Stocker les clés secrètes dans le navigateur" },
          { id: "d", label: "Désactiver le HTTPS" },
        ],
        correct: ["a"],
        explanation:
          "Confort d'écran. Les secrets et les droits restent serveur.",
      },
      {
        id: "q3",
        question: "Masquer le menu Administration si personne n'est connecté…",
        options: [
          { id: "a", label: "Suffit à protéger l'API d'administration" },
          { id: "b", label: "N'empêche pas d'appeler l'API directement si elle n'est pas protégée" },
          { id: "c", label: "Remplace les rôles" },
          { id: "d", label: "Est interdit en React" },
        ],
        correct: ["b"],
        explanation:
          "L'interface n'est pas une frontière de confiance.",
      },
      {
        id: "q4",
        question: "Où met-on les clés secrètes du service de connexion ?",
        options: [
          { id: "a", label: "Variables d'environnement côté serveur / hébergeur" },
          { id: "b", label: "Dans le CSS" },
          { id: "c", label: "En dur dans un composant React public" },
          { id: "d", label: "Dans l'adresse du site" },
        ],
        correct: ["a"],
        explanation:
          "Comme en phase architecture : rien de secret dans le paquet navigateur.",
      },
      {
        id: "q5",
        question: "Supabase Auth, Clerk, Auth.js…",
        options: [
          { id: "a", label: "Sont des exemples de services de connexion tiers à préférer à une connexion maison" },
          { id: "b", label: "Sont des bases de données SQL" },
          { id: "c", label: "Remplacent le besoin d'audit" },
          { id: "d", label: "Interdisent les rôles" },
        ],
        correct: ["a"],
        explanation:
          "Tu choisis un service, tu cadres, tu audites l'intégration.",
      },
    ],
  },

  m03: {
    id: "svc-auth-quiz-m03",
    title: "Autorisation : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Prouver qui tu es vs décider ce que tu as le droit de faire ?",
        options: [
          { id: "a", label: "Authentification (connexion) vs autorisation (droits)" },
          { id: "b", label: "CSS vs HTML" },
          { id: "c", label: "Build vs aperçu en ligne" },
          { id: "d", label: "Git vs npm" },
        ],
        correct: ["a"],
        explanation:
          "Être connecté ne donne pas tous les droits.",
      },
      {
        id: "q2",
        question: "Accéder à la note d'un autre en changeant le numéro dans l'adresse, sans contrôle, c'est…",
        options: [
          { id: "a", label: "Une faille d'accès (ressource d'autrui via un identifiant manipulé)" },
          { id: "b", label: "Un type de police d'écriture" },
          { id: "c", label: "Un hébergeur" },
          { id: "d", label: "Un test unitaire" },
        ],
        correct: ["a"],
        explanation:
          "Classique dès qu'on a des numéros prévisibles sans vérif de propriétaire.",
      },
      {
        id: "q3",
        question: "Les règles d'accès en base servent à…",
        options: [
          { id: "a", label: "Limiter quelles lignes un rôle / utilisateur peut lire ou écrire" },
          { id: "b", label: "Choisir les couleurs du thème" },
          { id: "c", label: "Remplacer le HTTPS" },
          { id: "d", label: "Générer des jetons magiques" },
        ],
        correct: ["a"],
        explanation:
          "Filet utile en plus des contrôles dans l'API.",
      },
      {
        id: "q4",
        question: "Pourquoi le contrôle d'accès côté navigateur ne suffit jamais ?",
        options: [
          { id: "a", label: "Parce que le navigateur peut être modifié ou contourné" },
          { id: "b", label: "Parce que TypeScript l'interdit" },
          { id: "c", label: "Parce que Git force le serveur" },
          { id: "d", label: "Parce que les services de connexion le refusent" },
        ],
        correct: ["a"],
        explanation:
          "Frontière de confiance = serveur (et base).",
      },
      {
        id: "q5",
        question: "Numéros « difficiles à deviner » sans contrôle d'accès…",
        options: [
          { id: "a", label: "Remplacent une vraie autorisation" },
          { id: "b", label: "Ne suffisent pas : ce n'est pas une vraie protection" },
          { id: "c", label: "Sont exigés pour se connecter avec Google" },
          { id: "d", label: "Corrigent automatiquement l'accès illégitime" },
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
        question: "Un jeton de réinitialisation de mot de passe devrait être…",
        options: [
          { id: "a", label: "À usage unique (ou très limité) et à durée de vie courte" },
          { id: "b", label: "Réutilisable des semaines" },
          { id: "c", label: "Publié dans le README" },
          { id: "d", label: "Stocké en clair dans l'interface" },
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
          { id: "c", label: "Désactiver le HTTPS" },
          { id: "d", label: "Colorier le logo" },
        ],
        correct: ["a"],
        explanation:
          "Réduit les comptes fictifs et certaines prises de contrôle.",
      },
      {
        id: "q3",
        question: "Couper une connexion sur un autre appareil, c'est…",
        options: [
          { id: "a", label: "Pouvoir déconnecter un appareil / toutes les sessions (ex. téléphone perdu)" },
          { id: "b", label: "Supprimer la base" },
          { id: "c", label: "Changer le thème" },
          { id: "d", label: "Désactiver les tests" },
        ],
        correct: ["a"],
        explanation:
          "Sans coupure, une session volée vit trop longtemps.",
      },
      {
        id: "q4",
        question: "Une liste de contrôle connexion avant production doit inclure…",
        options: [
          { id: "a", label: "Service tiers, protections serveur, parcours sensibles, règles d'accès" },
          { id: "b", label: "Uniquement le choix de police" },
          { id: "c", label: "Uniquement des animations" },
          { id: "d", label: "Uniquement autoriser tous les sites (CORS *)" },
        ],
        correct: ["a"],
        explanation:
          "C'est le filet avant la Livraison.",
      },
      {
        id: "q5",
        question: "Se fier à un rôle stocké dans le navigateur pour l'administration…",
        options: [
          { id: "a", label: "Est une protection serveur solide" },
          { id: "b", label: "Est contournable : ce n'est pas une autorisation réelle" },
          { id: "c", label: "Est exigé par tous les services de connexion" },
          { id: "d", label: "Remplace les règles d'accès en base" },
        ],
        correct: ["b"],
        explanation:
          "Tout le monde peut modifier le stockage du navigateur. Le serveur décide.",
      },
    ],
  },
};
