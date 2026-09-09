import type { Quiz } from "@/types";

export const auditQualiteQuizzes: Record<"m01" | "m02" | "m03" | "m04", Quiz> = {
  m01: {
    id: "svc-audit-qualite-quiz-m01",
    title: "Performance produit : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Le LCP (Largest Contentful Paint — quand le plus grand contenu visible apparaît) mesure surtout…",
        options: [
          {
            id: "a",
            label: "Quand le plus grand élément visible de la page devient utile à l'écran",
          },
          { id: "b", label: "Le temps total de compilation TypeScript" },
          { id: "c", label: "Le nombre de lignes de CSS" },
          { id: "d", label: "La latence DNS uniquement" },
        ],
        correct: ["a"],
        explanation:
          "LCP = perception de « la page est là ». Images hero, blocs texte lourds : cibles classiques d'optimisation.",
      },
      {
        id: "q2",
        question: "Le TBT (Total Blocking Time — temps où le fil principal est bloqué) indique…",
        options: [
          {
            id: "a",
            label: "Combien le fil principal est bloqué et empêche l'interaction",
          },
          { id: "b", label: "La taille du lockfile npm" },
          { id: "c", label: "Le nombre de tests unitaires" },
          { id: "d", label: "Le délai avant le premier email marketing" },
        ],
        correct: ["a"],
        explanation:
          "JS trop lourd ou tâches longues → TBT élevé. Budgéter le JS et découper le travail critique.",
      },
      {
        id: "q3",
        question: "Un budget de performance sert à…",
        options: [
          {
            id: "a",
            label: "Fixer des seuils mesurables (LCP, poids, JS) et les faire respecter",
          },
          { id: "b", label: "Remplacer Lighthouse par un ressenti subjectif" },
          { id: "c", label: "Autoriser n'importe quelle image 4K non compressée" },
          { id: "d", label: "Désactiver les Core Web Vitals en prod" },
        ],
        correct: ["a"],
        explanation:
          "Sans budget, chaque prompt « ajoute une lib » fait dériver. Seuils + contrôle CI / revue.",
      },
      {
        id: "q4",
        question: "Lire une cascade réseau (waterfall) permet surtout de…",
        options: [
          {
            id: "a",
            label: "Voir l'ordre, la taille et le blocage des ressources (images, JS, CSS)",
          },
          { id: "b", label: "Chiffrer automatiquement les assets" },
          { id: "c", label: "Remplacer les tests d'accessibilité" },
          { id: "d", label: "Générer la grille tarifaire" },
        ],
        correct: ["a"],
        explanation:
          "Cascade réseau = diagnostic : requête bloquante, image trop lourde, chaîne de dépendances JS.",
      },
      {
        id: "q5",
        question: "Pour les images, une pratique livrable minimale inclut…",
        options: [
          {
            id: "a",
            label: "Format adapté, dimensions justes, chargement différé hors LCP, compression",
          },
          { id: "b", label: "PNG 4000px pour chaque icône" },
          { id: "c", label: "Charger toutes les images au-dessus de la ligne de flottaison sans priorité" },
          { id: "d", label: "Ignorer le poids tant que le design « fait luxe »" },
        ],
        correct: ["a"],
        explanation:
          "Images = souvent le LCP. WebP/AVIF, srcset, chargement différé hors critique, poids budgété.",
      },
    ],
  },

  m02: {
    id: "svc-audit-qualite-quiz-m02",
    title: "Design livrable : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "La hiérarchie visuelle, c'est…",
        options: [
          {
            id: "a",
            label: "Guider l'œil : titre → message → action, sans concurrence de poids",
          },
          { id: "b", label: "Mettre huit couleurs primaires sur chaque écran" },
          { id: "c", label: "Cacher l'appel à l'action (CTA) principal" },
          { id: "d", label: "Utiliser uniquement du texte en 10px" },
        ],
        correct: ["a"],
        explanation:
          "Un écran livrable a une lecture claire. Trop de blocs « importants » = aucune priorité.",
      },
      {
        id: "q2",
        question: "Un appel à l'action (CTA) unique sur un écran critique sert à…",
        options: [
          {
            id: "a",
            label: "Éviter la concurrence d'actions et clarifier la prochaine étape",
          },
          { id: "b", label: "Multiplier les boutons « pour le choix »" },
          { id: "c", label: "Remplacer les états d'erreur" },
          { id: "d", label: "Désactiver le clavier" },
        ],
        correct: ["a"],
        explanation:
          "Trois appels à l'action (CTA) en concurrence diluent la conversion. Une action primaire, le reste secondaire.",
      },
      {
        id: "q3",
        question: "Les états vides, erreur et chargement…",
        options: [
          {
            id: "a",
            label: "Doivent être conçus : message, action possible, et surtout pas d'écran mort",
          },
          { id: "b", label: "Peuvent rester blancs « on verra plus tard »" },
          { id: "c", label: "Sont uniquement pour les apps desktop natives" },
          { id: "d", label: "Remplacent la hiérarchie visuelle" },
        ],
        correct: ["a"],
        explanation:
          "L'IA livre souvent le parcours nominal seul. Vide / erreur / chargement = liste de contrôle design-baseline.",
      },
      {
        id: "q4",
        question: "Un piège classique du design généré par IA…",
        options: [
          {
            id: "a",
            label: "Écran sans état vide et plusieurs appels à l'action (CTA) de même poids",
          },
          { id: "b", label: "Un seul appel à l'action (CTA) clair et des états couverts" },
          { id: "c", label: "Contraste WCAG respecté partout" },
          { id: "d", label: "Focus clavier visible sur tous les contrôles" },
        ],
        correct: ["a"],
        explanation:
          "Syllabus : écran sans état vide, trois appels à l'action (CTA) en concurrence : à corriger avant de mettre en production.",
      },
      {
        id: "q5",
        question: "La liste de contrôle design-baseline sur un écran critique…",
        options: [
          {
            id: "a",
            label: "Structure la revue : hiérarchie, appel à l'action (CTA), états, puis correctifs tracés",
          },
          { id: "b", label: "Se limite à changer une couleur au hasard" },
          { id: "c", label: "Remplace Lighthouse et l'a11y" },
          { id: "d", label: "Est optionnelle si le code compile" },
        ],
        correct: ["a"],
        explanation:
          "Revue structurée > avis subjectif. Passer la liste de contrôle, corriger, documenter.",
      },
    ],
  },

  m03: {
    id: "svc-audit-qualite-quiz-m03",
    title: "Accessibilité : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Le contraste insuffisant…",
        options: [
          {
            id: "a",
            label: "Rend le texte illisible pour une partie des utilisateurs (WCAG)",
          },
          { id: "b", label: "Améliore toujours le look « premium »" },
          { id: "c", label: "N'impacte que les robots SEO" },
          { id: "d", label: "Est corrigé automatiquement par React" },
        ],
        correct: ["a"],
        explanation:
          "Texte gris pâle sur fond clair = échec a11y fréquent dans le design généré.",
      },
      {
        id: "q2",
        question: "La navigation clavier doit permettre de…",
        options: [
          {
            id: "a",
            label: "Atteindre et activer tous les contrôles interactifs sans souris",
          },
          { id: "b", label: "Ignorer les menus et modales" },
          { id: "c", label: "Utiliser uniquement le trackpad" },
          { id: "d", label: "Désactiver Tab « pour le style »" },
        ],
        correct: ["a"],
        explanation:
          "Tab / Enter / Escape sur parcours critique. Pièges : divs cliquables sans rôle ni focus clavier.",
      },
      {
        id: "q3",
        question: "Libeller correctement un contrôle, c'est…",
        options: [
          {
            id: "a",
            label: "Associer un nom accessible (libellé, aria-label…) au champ ou bouton",
          },
          { id: "b", label: "Mettre un placeholder comme seul « libellé »" },
          { id: "c", label: "Compter sur l'icône seule sans texte alternatif" },
          { id: "d", label: "Laisser le lecteur d'écran inventer le nom" },
        ],
        correct: ["a"],
        explanation:
          "Placeholder ≠ libellé. Un bouton icône sans nom accessible bloque les lecteurs d'écran.",
      },
      {
        id: "q4",
        question: "La gestion du focus clavier est critique surtout…",
        options: [
          {
            id: "a",
            label: "À l'ouverture/fermeture de modales, panneaux latéraux, étapes de parcours",
          },
          { id: "b", label: "Uniquement sur les pages d'erreur 404" },
          { id: "c", label: "Quand on désactive outline:none partout" },
          { id: "d", label: "Si on n'utilise jamais le clavier" },
        ],
        correct: ["a"],
        explanation:
          "Focus clavier piégé ou perdu = parcours cassé. Restaurer le focus clavier, le rendre visible, piège de focus en modal.",
      },
      {
        id: "q5",
        question: "Un audit a11y ciblé sur un parcours…",
        options: [
          {
            id: "a",
            label: "Combine liste de contrôle, clavier et idéalement lecteur d'écran, puis correctifs",
          },
          { id: "b", label: "Se limite à lancer Lighthouse une fois sans corriger" },
          { id: "c", label: "Ignore le contraste si le guide de marque le demande" },
          { id: "d", label: "Remplace les tests de performance" },
        ],
        correct: ["a"],
        explanation:
          "Outils + parcours réel. Corriger les blocages avant de déclarer la baseline passée.",
      },
    ],
  },

  m04: {
    id: "svc-audit-qualite-quiz-m04",
    title: "UX des parcours argent : valide ta lecture",
    questions: [
      {
        id: "q1",
        question: "Sur une page de paiement, la friction inutile…",
        options: [
          {
            id: "a",
            label: "Ce sont les étapes, champs ou doutes qui n'aident pas à payer en confiance",
          },
          { id: "b", label: "Les preuves de sécurité et le récap clair" },
          { id: "c", label: "Un seul appel à l'action (CTA) « Payer » bien libellé" },
          { id: "d", label: "Les emails de confirmation utiles" },
        ],
        correct: ["a"],
        explanation:
          "Compte forcé trop tôt, champs redondants, ambiguïté de prix = abandon. Audite chaque étape.",
      },
      {
        id: "q2",
        question: "Les emails de confiance autour du paiement…",
        options: [
          {
            id: "a",
            label: "Confirment l'achat, rassurent et donnent une suite claire (accès, assistance)",
          },
          { id: "b", label: "Peuvent être absents si le webhook « a l'air OK »" },
          { id: "c", label: "Doivent contenir la clé API secrète" },
          { id: "d", label: "Remplacent le reçu dans l'app" },
        ],
        correct: ["a"],
        explanation:
          "Après paiement : confirmation, accès produit, contact d'assistance. Pas de silence radio.",
      },
      {
        id: "q3",
        question: "Fluidifier le parcours payant veut dire…",
        options: [
          {
            id: "a",
            label: "Réduire les frictions tout en gardant clarté, confiance et conformité minimale",
          },
          { id: "b", label: "Supprimer toute confirmation « pour aller plus vite »" },
          { id: "c", label: "Cacher le prix jusqu'à la dernière seconde sans récap" },
          { id: "d", label: "Forcer dix champs marketing avant le paiement" },
        ],
        correct: ["a"],
        explanation:
          "Moins de friction ≠ moins de confiance. Prix clair, erreurs récupérables, étapes justifiées.",
      },
      {
        id: "q4",
        question: "Le livrable P9 « scores avant/après » exige…",
        options: [
          {
            id: "a",
            label: "Mesurer, corriger, re-mesurer perf/design/a11y avec preuves tracées",
          },
          { id: "b", label: "Affirmer « c'est mieux » sans chiffre" },
          { id: "c", label: "Passer uniquement le paiement sans listes de contrôle" },
          { id: "d", label: "Ignorer l'a11y si Lighthouse perf est vert" },
        ],
        correct: ["a"],
        explanation:
          "Projet P9 : listes de contrôle passées, scores avant/après, correctifs en commit/diff.",
      },
      {
        id: "q5",
        question: "Auditer le parcours qui rapporte…",
        options: [
          {
            id: "a",
            label: "Dérouler paiement + emails sous l'angle conversion et confiance, puis corriger",
          },
          { id: "b", label: "Se fier au parcours nominal généré par l'IA sans le rejouer" },
          { id: "c", label: "Optimiser seulement la page d'accueil commerciale" },
          { id: "d", label: "Désactiver les états d'erreur de paiement" },
        ],
        correct: ["a"],
        explanation:
          "Le parcours argent est le cœur business. Chaque friction identifiée doit disparaître ou être justifiée.",
      },
    ],
  },
};
