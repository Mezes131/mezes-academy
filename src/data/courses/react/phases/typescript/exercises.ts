import type { CodeExercise } from "@/types";

export const typescriptExercises = {
  m19_1: {
    id: "react-typescript-ex-m19-1",
    title: "Typer une fonction utilitaire",
    instructions:
      "Définis un type <code>User</code> (<code>id: number</code>, <code>name: string</code>, <code>email: string</code>, <code>role: 'admin' | 'user'</code>) et une fonction générique <code>filterBy&lt;T, K extends keyof T&gt;(items: T[], key: K, value: T[K]): T[]</code> qui retourne les éléments dont <code>item[key] === value</code>.",
    hints: [
      "Utilise `keyof T` pour que `key` soit forcément une vraie clé de T.",
      "`T[K]` est le type de la valeur associée à cette clé — ça garantit la cohérence.",
    ],
    template: "react-ts",
    starterFiles: {
      "/App.tsx": `// TODO: define the User type

// TODO: implement filterBy<T, K extends keyof T>(items: T[], key: K, value: T[K]): T[]

const users /* : User[] */ = [
  { id: 1, name: "Ada", email: "ada@ex.com", role: "admin" as const },
  { id: 2, name: "Linus", email: "linus@ex.com", role: "user" as const },
  { id: 3, name: "Grace", email: "grace@ex.com", role: "admin" as const },
];

export default function App() {
  // TODO: filter admin users via filterBy(users, "role", "admin")
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Admins</h2>
      <ul>{/* render admins */}</ul>
    </div>
  );
}
`,
    },
    solutionFiles: {
      "/App.tsx": `type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
};

function filterBy<T, K extends keyof T>(items: T[], key: K, value: T[K]): T[] {
  return items.filter((item) => item[key] === value);
}

const users: User[] = [
  { id: 1, name: "Ada", email: "ada@ex.com", role: "admin" },
  { id: 2, name: "Linus", email: "linus@ex.com", role: "user" },
  { id: 3, name: "Grace", email: "grace@ex.com", role: "admin" },
];

export default function App() {
  const admins = filterBy(users, "role", "admin");
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Admins</h2>
      <ul>
        {admins.map((u) => (
          <li key={u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}
`,
    },
  },

  m20_1: {
    id: "react-typescript-ex-m20-1",
    title: "Utility types & type guard",
    instructions:
      "À partir du type <code>Article</code> fourni, crée : (1) <code>ArticlePreview</code> = seulement <code>id</code> et <code>title</code> ; (2) <code>DraftArticle</code> = tous les champs optionnels sauf <code>id</code> ; (3) un type guard <code>isPublished(a: Article): a is Article &amp; { publishedAt: string }</code>.",
    hints: [
      "`Pick<Article, 'id' | 'title'>` pour la preview.",
      "`Partial<Article> & { id: number }` pour la draft.",
      "Le type guard vérifie que `a.publishedAt` n'est pas null.",
    ],
    template: "react-ts",
    starterFiles: {
      "/App.tsx": `type Article = {
  id: number;
  title: string;
  body: string;
  authorId: number;
  publishedAt: string | null;
};

// TODO: type ArticlePreview
// TODO: type DraftArticle
// TODO: type guard isPublished

const sample: Article = { id: 1, title: "Hello", body: "...", authorId: 7, publishedAt: null };

export default function App() {
  return (
    <pre style={{ padding: 24, fontFamily: "monospace" }}>
      isPublished? {String(/* isPublished(sample) */ false)}
    </pre>
  );
}
`,
    },
    solutionFiles: {
      "/App.tsx": `type Article = {
  id: number;
  title: string;
  body: string;
  authorId: number;
  publishedAt: string | null;
};

type ArticlePreview = Pick<Article, "id" | "title">;
type DraftArticle = Partial<Article> & { id: number };

function isPublished(
  a: Article,
): a is Article & { publishedAt: string } {
  return a.publishedAt !== null;
}

const sample: Article = { id: 1, title: "Hello", body: "...", authorId: 7, publishedAt: null };

export default function App() {
  const preview: ArticlePreview = { id: sample.id, title: sample.title };
  const draft: DraftArticle = { id: sample.id };
  return (
    <pre style={{ padding: 24, fontFamily: "monospace" }}>
      preview: {JSON.stringify(preview)}{"\\n"}
      draft: {JSON.stringify(draft)}{"\\n"}
      isPublished? {String(isPublished(sample))}
    </pre>
  );
}
`,
    },
  },

  m21_1: {
    id: "react-typescript-ex-m21-1",
    title: "Composant générique List<T>",
    instructions:
      "Implémente un composant <code>&lt;List items renderItem /&gt;</code> générique sur <code>T</code>, qui prend une liste d'items et une fonction de rendu. Utilise-le pour afficher deux listes de types différents (strings et objets <code>{id, name}</code>) dans la même page.",
    hints: [
      "La signature : `function List<T>({ items, renderItem }: { items: T[]; renderItem: (item: T) => ReactNode }) {...}`",
      "N'oublie pas la `key` — tu peux demander une prop `getKey` ou utiliser l'index en fallback.",
    ],
    template: "react-ts",
    starterFiles: {
      "/App.tsx": `import { ReactNode } from "react";

// TODO: implement List<T>

export default function App() {
  const fruits = ["Mangue", "Papaye"];
  const users = [
    { id: 1, name: "Ada" },
    { id: 2, name: "Linus" },
  ];
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      {/* <List items={fruits} renderItem={(f) => <span>{f}</span>} /> */}
      {/* <List items={users} renderItem={(u) => <span>{u.name}</span>} /> */}
    </div>
  );
}
`,
    },
    solutionFiles: {
      "/App.tsx": `import { ReactNode } from "react";

function List<T>({
  items,
  renderItem,
  getKey,
}: {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getKey?: (item: T, index: number) => string | number;
}) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={getKey ? getKey(item, i) : i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export default function App() {
  const fruits = ["Mangue", "Papaye", "Avocat"];
  const users = [
    { id: 1, name: "Ada" },
    { id: 2, name: "Linus" },
  ];
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h3>Fruits</h3>
      <List items={fruits} renderItem={(f) => <span>{f}</span>} />
      <h3>Users</h3>
      <List
        items={users}
        getKey={(u) => u.id}
        renderItem={(u) => <strong>{u.name}</strong>}
      />
    </div>
  );
}
`,
    },
  },
} satisfies Record<string, CodeExercise>;
