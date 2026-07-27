/** Chrome UI strings (FR). Keep keys stable; add EN twin in en.ts. */
export const messagesFr = {
  nav: {
    home: "Accueil",
    catalog: "Catalogue",
    howItWorks: "Comment ça marche",
    continue: "Continuer",
    signIn: "Connexion",
    signInShort: "Se connecter",
    pathBadge: "parcours",
  },
  courseBar: {
    search: "Rechercher…",
    openSidebar: "Ouvrir le menu latéral",
    closeSidebar: "Fermer le menu latéral",
  },
  language: {
    label: "Langue",
    fr: "FR",
    en: "EN",
  },
  translation: {
    inProgress: "Traduction en cours",
  },
} as const;

export type MessageTree = typeof messagesFr;
