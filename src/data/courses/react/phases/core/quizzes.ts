import type { Quiz } from "@/types";

/** All quizzes of the `react › core` phase, keyed by module slug. */
export const coreQuizzes = {
  m11: {
    id: "react-core-quiz-m11",
    title: "Quiz : JSX & bases",
    questions: [
      {
        id: "q1",
        question: "En JSX, quel attribut utilise-t-on pour appliquer une classe CSS ?",
        options: [
          { id: "a", label: "class" },
          { id: "b", label: "className" },
          { id: "c", label: "css" },
          { id: "d", label: "styleClass" },
        ],
        correct: ["b"],
        explanation:
          "En JSX, class est un mot réservé JavaScript. On utilise className à la place. De même, for devient htmlFor.",
      },
      {
        id: "q2",
        question: "Pourquoi la prop `key` est-elle obligatoire dans une liste ?",
        options: [
          { id: "a", label: "Pour sécuriser l'application contre les injections" },
          { id: "b", label: "Pour permettre à React d'identifier chaque élément et optimiser le re-render" },
          { id: "c", label: "Par obligation légale du W3C" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "JSX est…",
        options: [
          { id: "a", label: "Du HTML interprété directement par le navigateur" },
          { id: "b", label: "Du sucre syntaxique compilé en React.createElement()" },
          { id: "c", label: "Un langage à part entière inventé par Facebook" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question: "Quelles expressions peut-on mettre entre accolades {} en JSX ?",
        options: [
          { id: "a", label: "Uniquement des variables" },
          { id: "b", label: "Toute expression JavaScript (variables, calculs, appels de fonction, ternaires)" },
          { id: "c", label: "Des instructions (if, for, while)" },
        ],
        correct: ["b"],
        explanation:
          "On met des expressions (qui produisent une valeur), pas des instructions. Un if/else ne fonctionnera pas, il faut utiliser un ternaire ou &&.",
      },
    ],
  },

  m12: {
    id: "react-core-quiz-m12",
    title: "Quiz : Composants & Props",
    questions: [
      {
        id: "q1",
        question: "Dans quel sens circulent les props ?",
        options: [
          { id: "a", label: "Du parent vers l'enfant (top-down, unidirectionnel)" },
          { id: "b", label: "De l'enfant vers le parent" },
          { id: "c", label: "Dans les deux sens (two-way binding)" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Un composant peut-il modifier ses propres props ?",
        options: [
          { id: "a", label: "Oui, librement" },
          { id: "b", label: "Oui, mais seulement dans useEffect" },
          { id: "c", label: "Non, les props sont en lecture seule (immutables)" },
        ],
        correct: ["c"],
        explanation:
          "Les props sont immutables par design. Si un enfant doit communiquer vers un parent, c'est via un callback passé en prop.",
      },
      {
        id: "q3",
        question: "À quoi sert la prop spéciale `children` ?",
        options: [
          { id: "a", label: "À lister les composants enfants qu'un composant doit rendre obligatoirement" },
          { id: "b", label: "À recevoir tout ce qui est placé entre les balises d'ouverture et de fermeture d'un composant" },
          { id: "c", label: "À transmettre le state aux sous-composants" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question: "Quelle convention de nommage respecter pour un composant ?",
        options: [
          { id: "a", label: "Toujours commencer par une minuscule" },
          { id: "b", label: "Toujours commencer par une majuscule (PascalCase)" },
          { id: "c", label: "Utiliser kebab-case comme en HTML" },
        ],
        correct: ["b"],
        explanation:
          "React distingue les composants des éléments HTML via la casse. <button> est un élément HTML, <Button> est un composant.",
      },
    ],
  },

  m13: {
    id: "react-core-quiz-m13",
    title: "Quiz : useState & immutabilité",
    questions: [
      {
        id: "q1",
        question: "Que retourne useState ?",
        options: [
          { id: "a", label: "Un objet { value, setValue }" },
          { id: "b", label: "Un tableau [valeur, setter]" },
          { id: "c", label: "La valeur directement" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "Pour ajouter un élément à un state tableau `items`, quelle est la bonne approche ?",
        options: [
          { id: "a", label: "items.push(newItem) puis setItems(items)" },
          { id: "b", label: "setItems([...items, newItem])" },
          { id: "c", label: "items = [...items, newItem]" },
        ],
        correct: ["b"],
        explanation:
          "items.push mute le tableau existant : React ne détectera aucun changement de référence et ne re-rendera pas. Il faut créer un nouveau tableau.",
      },
      {
        id: "q3",
        question: "Qu'est-ce qu'un composant contrôlé ?",
        options: [
          { id: "a", label: "Un composant qui utilise un ref pour lire la valeur de l'input" },
          { id: "b", label: "Un input dont la valeur est dictée par le state React via value + onChange" },
          { id: "c", label: "Un composant protégé par un système d'authentification" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question: "Que fait `setCount(c => c + 1)` par rapport à `setCount(count + 1)` ?",
        options: [
          { id: "a", label: "C'est strictement identique" },
          { id: "b", label: "La version fonctionnelle est plus sûre quand on met à jour plusieurs fois de suite, car elle utilise la valeur la plus récente" },
          { id: "c", label: "La version fonctionnelle est plus lente" },
        ],
        correct: ["b"],
      },
    ],
  },

  m14: {
    id: "react-core-quiz-m14",
    title: "Quiz : useEffect",
    questions: [
      {
        id: "q1",
        question: "Que se passe-t-il si on passe `[]` en deuxième argument de useEffect ?",
        options: [
          { id: "a", label: "L'effet ne s'exécute jamais" },
          { id: "b", label: "L'effet s'exécute à chaque render" },
          { id: "c", label: "L'effet s'exécute une seule fois, au montage du composant" },
        ],
        correct: ["c"],
      },
      {
        id: "q2",
        question: "À quoi sert la fonction retournée depuis useEffect ?",
        options: [
          { id: "a", label: "À fournir la valeur de sortie de l'effet" },
          { id: "b", label: "C'est le cleanup : il s'exécute avant le prochain effet ou au démontage" },
          { id: "c", label: "Elle n'a aucun effet, c'est optionnel et inutile" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "Quelle erreur provoque typiquement une boucle infinie dans useEffect ?",
        options: [
          { id: "a", label: "Appeler setState à l'intérieur sans tableau de dépendances" },
          { id: "b", label: "Utiliser fetch à l'intérieur" },
          { id: "c", label: "Retourner une fonction de cleanup" },
        ],
        correct: ["a"],
        explanation:
          "Sans tableau de deps, useEffect s'exécute à chaque render. Si on fait setState, cela déclenche un nouveau render, qui re-déclenche l'effet, etc.",
      },
    ],
  },

  m15: {
    id: "react-core-quiz-m15",
    title: "Quiz : Hooks avancés",
    questions: [
      {
        id: "q1",
        question: "Quel hook utiliser pour partager des données à tous les sous-composants sans passer par des props ?",
        options: [
          { id: "a", label: "useRef" },
          { id: "b", label: "useContext" },
          { id: "c", label: "useMemo" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "Quelle règle encadre le nom d'un custom hook ?",
        options: [
          { id: "a", label: "Il doit commencer par `use`" },
          { id: "b", label: "Il doit finir par `Hook`" },
          { id: "c", label: "Il doit être en UPPER_CASE" },
        ],
        correct: ["a"],
        explanation:
          "La convention (et la règle d'ESLint) : un hook s'appelle useQuelquechose. C'est ce qui permet à React de détecter qu'on respecte les règles des hooks.",
      },
      {
        id: "q3",
        question: "À quoi sert useRef ?",
        options: [
          { id: "a", label: "À accéder au DOM ou à stocker une valeur mutable sans provoquer de re-render" },
          { id: "b", label: "À référencer des composants enfants pour les supprimer" },
          { id: "c", label: "À mémoriser des fonctions lourdes" },
        ],
        correct: ["a"],
      },
      {
        id: "q4",
        question: "Vrai ou faux : il faut utiliser useMemo/useCallback partout par défaut.",
        options: [
          { id: "a", label: "Vrai, c'est toujours plus rapide" },
          { id: "b", label: "Faux : l'optimisation prématurée coûte en complexité et n'apporte rien la plupart du temps" },
        ],
        correct: ["b"],
      },
    ],
  },

  m16: {
    id: "react-core-quiz-m16",
    title: "Quiz : React Router",
    questions: [
      {
        id: "q1",
        question: "Pourquoi utilise-t-on <Link> plutôt qu'une balise <a> classique ?",
        options: [
          { id: "a", label: "<Link> ne recharge pas la page ; il utilise l'API History pour garder la SPA réactive" },
          { id: "b", label: "<a> ne fonctionne pas dans React" },
          { id: "c", label: "<Link> est obligatoire légalement" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Comment récupère-t-on le paramètre :id d'une route /users/:id ?",
        options: [
          { id: "a", label: "useLocation().id" },
          { id: "b", label: "const { id } = useParams()" },
          { id: "c", label: "window.location.params.id" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "À quoi sert <Navigate to=\"/login\" /> ?",
        options: [
          { id: "a", label: "À afficher un lien cliquable vers /login" },
          { id: "b", label: "À rediriger immédiatement vers /login quand le composant est rendu" },
          { id: "c", label: "À enregistrer la route dans l'historique sans naviguer" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question:
          "Piège classique : tu affiches <UserProfile /> sur /users/:id. Quand tu passes de /users/1 à /users/2, les données du profil précédent restent affichées. Quelle est la solution idiomatique ?",
        options: [
          { id: "a", label: "Ajouter un useEffect qui appelle window.location.reload()" },
          { id: "b", label: "Passer la prop `key={id}` au composant pour forcer un remount sur changement d'id" },
          { id: "c", label: "Encapsuler le composant dans React.memo" },
        ],
        correct: ["b"],
        explanation:
          "React Router ne démonte pas le composant quand seul un param d'URL change : le state interne persiste. Un `key` basé sur l'id force React à remonter l'arbre avec un state propre.",
      },
    ],
  },

  m17: {
    id: "react-core-quiz-m17",
    title: "Quiz : Formulaires",
    questions: [
      {
        id: "q1",
        question: "Pourquoi React Hook Form est-il généralement préféré à une gestion manuelle via useState sur chaque champ ?",
        options: [
          { id: "a", label: "Il évite les re-renders inutiles à chaque frappe sur un champ" },
          { id: "b", label: "Il est obligatoire pour utiliser Zod" },
          { id: "c", label: "Il remplace automatiquement TypeScript" },
        ],
        correct: ["a"],
      },
      {
        id: "q2",
        question: "Que fait `zodResolver(schema)` dans React Hook Form ?",
        options: [
          { id: "a", label: "Il connecte le schéma de validation Zod au formulaire pour valider les données avant submit" },
          { id: "b", label: "Il envoie les données au serveur" },
          { id: "c", label: "Il convertit les données en JSON" },
        ],
        correct: ["a"],
      },
    ],
  },

  m18: {
    id: "react-core-quiz-m18",
    title: "Quiz : Styling",
    questions: [
      {
        id: "q1",
        question: "Quel est l'avantage principal des CSS Modules ?",
        options: [
          { id: "a", label: "Ils sont plus rapides que le CSS classique" },
          { id: "b", label: "Le scoping automatique des classes évite les conflits de noms" },
          { id: "c", label: "Ils remplacent JavaScript" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "Que signifie « utility-first » dans Tailwind CSS ?",
        options: [
          { id: "a", label: "On compose des classes utilitaires (p-4, flex, text-blue-500) directement dans le JSX" },
          { id: "b", label: "On doit toujours commencer par écrire des utilitaires personnalisés" },
          { id: "c", label: "Tailwind remplace Bootstrap" },
        ],
        correct: ["a"],
      },
      {
        id: "q3",
        question: "À quoi sert <AnimatePresence> de Framer Motion ?",
        options: [
          { id: "a", label: "À animer les composants qui se démontent (exit animation)" },
          { id: "b", label: "À détecter si l'utilisateur est en ligne" },
          { id: "c", label: "À lister toutes les animations en cours" },
        ],
        correct: ["a"],
        explanation:
          "Sans AnimatePresence, les composants qui sortent du DOM disparaissent instantanément. Avec, l'animation `exit` peut se jouer avant le démontage.",
      },
    ],
  },
} satisfies Record<string, Quiz>;
