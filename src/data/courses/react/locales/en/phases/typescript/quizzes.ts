import type { Quiz } from "@/types";

export const typescriptQuizzes = {
  m19: {
    id: "react-typescript-quiz-m19",
    title: "Quiz: TypeScript Basics",
    questions: [
      {
        id: "q1",
        question: "What is the main difference between `unknown` and `any`?",
        options: [
          { id: "a", label: "None — they are aliases of each other" },
          { id: "b", label: "`unknown` requires narrowing (typeof, instanceof) before use; `any` disables all checking" },
          { id: "c", label: "`unknown` compiles faster" },
        ],
        correct: ["b"],
        explanation:
          "`unknown` is the type-safe version of `any`: you must prove the type before using the value. Always prefer `unknown` over `any`.",
      },
      {
        id: "q2",
        question: "When should you prefer `interface` over `type`?",
        options: [
          { id: "a", label: "To describe the shape of an object, especially if you want to extend or merge it" },
          { id: "b", label: "To define a union of types" },
          { id: "c", label: "For primitive types" },
        ],
        correct: ["a"],
        explanation:
          "Pragmatic rule: `interface` for objects (supports declaration merging), `type` for unions, intersections, and utility types.",
      },
      {
        id: "q3",
        question: "What does `function identity<T>(x: T): T { return x }` do?",
        options: [
          { id: "a", label: "Always returns an `any`" },
          { id: "b", label: "Preserves the argument's type on output thanks to generic T" },
          { id: "c", label: "Won't compile unless T is specified explicitly at the call site" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question: "What's the difference between `string | number` and `string & number`?",
        options: [
          { id: "a", label: "Both accept any string or any number" },
          { id: "b", label: "The union accepts one OR the other; the intersection requires both at once (impossible here, resolves to `never`)" },
          { id: "c", label: "The intersection accepts more values than the union" },
        ],
        correct: ["b"],
      },
    ],
  },

  m20: {
    id: "react-typescript-quiz-m20",
    title: "Quiz: Advanced TypeScript",
    questions: [
      {
        id: "q1",
        question: "What does `Pick<User, 'id' | 'email'>` do?",
        options: [
          { id: "a", label: "Removes the `id` and `email` keys from User" },
          { id: "b", label: "Creates a new type containing only the `id` and `email` keys from User" },
          { id: "c", label: "Makes `id` and `email` optional" },
        ],
        correct: ["b"],
      },
      {
        id: "q2",
        question: "Which utility type would transform `{ a: string; b: number }` into `{ a?: string; b?: number }`?",
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
        question: "What is a custom type guard?",
        options: [
          { id: "a", label: "A function whose return type is `x is T`, which narrows a type in the following block" },
          { id: "b", label: "An Angular-style `@Guard` decorator" },
          { id: "c", label: "A class that implements the Guard interface" },
        ],
        correct: ["a"],
        explanation:
          "Example: `function isUser(x: unknown): x is User { return typeof x === 'object' && x !== null && 'id' in x }`. Inside `if (isUser(x))`, TypeScript knows `x` is a `User`.",
      },
      {
        id: "q4",
        question: "In a conditional type `T extends U ? A : B`, what is `infer` for?",
        options: [
          { id: "a", label: "To capture a subtype in the true branch, so it can be reused in A or B" },
          { id: "b", label: "To force inference on the client side without typing by hand" },
          { id: "c", label: "To disable type checking in branch B" },
        ],
        correct: ["a"],
        explanation:
          "This keyword is what makes conditional types powerful: it lets you extract nested types (ReturnType, Parameters, etc.).",
      },
    ],
  },

  m21: {
    id: "react-typescript-quiz-m21",
    title: "Quiz: React + TypeScript",
    questions: [
      {
        id: "q1",
        question: "To type a functional component's props, which approach is recommended in 2026?",
        options: [
          { id: "a", label: "`const Button: React.FC<Props> = ...` with FC" },
          { id: "b", label: "`function Button(props: Props) {...}` without FC" },
          { id: "c", label: "Don't type — TypeScript infers everything" },
        ],
        correct: ["b"],
        explanation:
          "React.FC has several drawbacks (implicit children, ambiguous return typing). The official recommendation is now to explicitly type props on a regular function.",
      },
      {
        id: "q2",
        question: "How do you type `useState` for an optional value initially set to `null`?",
        options: [
          { id: "a", label: "`useState(null)`: inference is enough" },
          { id: "b", label: "`useState<User | null>(null)`: explicit because inference would give `null`" },
          { id: "c", label: "`useState<User>(null!)`" },
        ],
        correct: ["b"],
      },
      {
        id: "q3",
        question: "Which type should you use for a text <input>'s `onChange` handler?",
        options: [
          { id: "a", label: "React.FormEvent<HTMLInputElement>" },
          { id: "b", label: "React.ChangeEvent<HTMLInputElement>" },
          { id: "c", label: "Event" },
        ],
        correct: ["b"],
      },
      {
        id: "q4",
        question: "True or false: you should enable `strict: true` in tsconfig.json on every modern React project.",
        options: [
          { id: "a", label: "True: strict mode catches the vast majority of type bugs" },
          { id: "b", label: "False: it's too verbose, avoid it in 2026" },
        ],
        correct: ["a"],
      },
    ],
  },
} satisfies Record<string, Quiz>;
