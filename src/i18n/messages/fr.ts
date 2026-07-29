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
  bottomNav: {
    method: "Méthode",
    account: "Compte",
    course: "Parcours",
    myCourse: "Cours",
    modules: "Modules",
    progress: "Progrès",
    bookmarks: "Favoris",
    search: "Recherche",
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
};

type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};

export type MessageTree = DeepString<typeof messagesFr>;
