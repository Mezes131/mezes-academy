import type { Quiz } from "@/types";

export const typescriptQuizzes = {
  m19: {
    id: "react-typescript-quiz-m19",
    title: "Quiz : Bases TypeScript",
    questions: [
      {
        id: "q1",
        question: "Quelle est la différence principale entre `unknown` et `any` ?",
        options: [
          { id: "a", label: "Aucune, ce sont des alias l'un de l'autre" },
          { id: "b", label: "`unknown` force un narrowing (typeof, instanceof) avant utilisation ; `any` désactive toute vérification" },
          { id: "c", label: "`unknown` est plus rapide à compiler" },
        ],
        correct: ["b"],
        explanation:
          "`unknown` est la version type-safe d'`any` : on doit prouver le type avant d'utiliser la valeur. Toujours préférer `unknown` à `any`.",
      },
      {
        id: "q2",
        question: "Quand préférer `interface` à `type` ?",
        options: [
          { id: "a", label: "Pour décrire la forme d'un objet, surtout si on veut l'étendre/le merger" },
          { id: "b", label: "Pour définir une union de types" },
          { id: "c", label: "Pour les types primitifs" },
        ],
        correct: ["a"],
        explanation:
          "Règle pragmatique : `interface` pour les objets (supporte la déclaration-merging), `type` pour les unions, intersections, utilitaires.",
      },
      {
        id: "q3",
        question: "Que fait `function identity<T>(x: T): T { return x }` ?",
        options: [
          { id: "a", label: "Retourne toujours un `any`" },
          { id: "b", label: "Préserve le type de l'argument en sortie grâce au générique T" },
          { id: "c", label: "Ne compile pas sans spécifier T explicitement à l'appel" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question: "Quelle différence entre `string | number` et `string & number` ?",
        options: [
          { id: "a", label: "Les deux acceptent n'importe quelle string ou n'importe quel number" },
          { id: "b", label: "L'union accepte l'un OU l'autre ; l'intersection exige les deux à la fois (impossible ici, résout en `never`)" },
          { id: "c", label: "L'intersection accepte plus de valeurs que l'union" },
        ],
        correct: ["b"],
      },
    ],
  },

  m20: {
    id: "react-typescript-quiz-m20",
    title: "Quiz : TypeScript avancé",
    questions: [
      {
        id: "q1",
        question: "Que fait `Pick<User, 'id' | 'email'>` ?",
        options: [
          { id: "a", label: "Supprime les clés `id` et `email` de User" },
          { id: "b", label: "Crée un nouveau type ne contenant que les clés `id` et `email` de User" },
          { id: "c", label: "Rend `id` et `email` optionnels" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "Quel utility type transformerait `{ a: string; b: number }` en `{ a?: string; b?: number }` ?",
        options: [
          { id: "a", label: "Required" },
          { id: "b", label: "Partial" },
          { id: "c", label: "Omit" },
          { id: "d", label: "Readonly" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "Qu'est-ce qu'un type guard personnalisé ?",
        options: [
          { id: "a", label: "Une fonction dont le type de retour est `x is T`, qui narrow un type dans le bloc qui suit" },
          { id: "b", label: "Un décorateur `@Guard` à la Angular" },
          { id: "c", label: "Une classe qui implémente l'interface Guard" },
        ],
        correct: ["a"],
        explanation:
          "Exemple : `function isUser(x: unknown): x is User { return typeof x === 'object' && x !== null && 'id' in x }`. Dans un `if (isUser(x))`, TypeScript sait que `x` est un `User`.",
      },
      {
        id: "q4",
        question: "Dans un conditional type `T extends U ? A : B`, à quoi sert `infer` ?",
        options: [
          { id: "a", label: "À capturer un sous-type dans la branche vraie, pour le réutiliser dans A ou B" },
          { id: "b", label: "À forcer l'inférence côté client, sans avoir à typer à la main" },
          { id: "c", label: "À désactiver la vérification de type dans la branche B" },
        ],
        correct: ["a"],
        explanation:
          "C'est le mot-clé qui rend les conditional types puissants : il permet d'extraire des types imbriqués (ReturnType, Parameters, etc.).",
      },
    ],
  },

  m21: {
    id: "react-typescript-quiz-m21",
    title: "Quiz : React + TypeScript",
    questions: [
      {
        id: "q1",
        question: "Pour typer les props d'un composant fonctionnel, quelle approche est recommandée en 2026 ?",
        options: [
          { id: "a", label: "`const Button: React.FC<Props> = ...` avec FC" },
          { id: "b", label: "`function Button(props: Props) {...}` sans FC" },
          { id: "c", label: "Ne pas typer, TypeScript infère tout" },
        ],
        correct: ["b"],
        explanation:
          "React.FC a plusieurs inconvénients (children implicite, typage du return ambigu). La recommandation officielle est maintenant de typer explicitement les props sur une fonction normale.",
      },
      {
        id: "q2",
        question: "Comment typer `useState` pour une valeur optionnelle initialement à `null` ?",
        options: [
          { id: "a", label: "`useState(null)` — l'inférence suffit" },
          { id: "b", label: "`useState<User | null>(null)` — explicite car l'inférence donnerait `null`" },
          { id: "c", label: "`useState<User>(null!)`" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "Quel type utiliser pour un handler `onChange` d'un <input> texte ?",
        options: [
          { id: "a", label: "React.FormEvent<HTMLInputElement>" },
          { id: "b", label: "React.ChangeEvent<HTMLInputElement>" },
          { id: "c", label: "Event" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question: "Vrai ou faux : il faut activer `strict: true` dans tsconfig.json sur tout projet React moderne.",
        options: [
          { id: "a", label: "Vrai — strict mode attrape la grande majorité des bugs de type" },
          { id: "b", label: "Faux — c'est trop verbose, à éviter en 2026" },
        ],
        correct: ["a"],
      },
    ],
  },
} satisfies Record<string, Quiz>;
