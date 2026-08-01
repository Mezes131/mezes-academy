import type { CodeExercise } from "@/types";

export const typescriptExercises = {
  m19_1: {
    id: "react-typescript-ex-m19-1",
    title: "Type a utility function",
    instructions:
      "Define a <code>User</code> type (<code>id: number</code>, <code>name: string</code>, <code>email: string</code>, <code>role: 'admin' | 'user'</code>) and a generic function <code>filterBy&lt;T, K extends keyof T&gt;(items: T[], key: K, value: T[K]): T[]</code> that returns items where <code>item[key] === value</code>.",
    hints: [
      "Use `keyof T` so `key` must be a real key of T.",
      "`T[K]` is the type of the value for that key: it guarantees consistency.",
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
          <li key={u.id}>{u.name}: {u.email}</li>
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
      "From the provided <code>Article</code> type, create: (1) <code>ArticlePreview</code> = only <code>id</code> and <code>title</code>; (2) <code>DraftArticle</code> = all fields optional except <code>id</code>; (3) a type guard <code>isPublished(a: Article): a is Article &amp; { publishedAt: string }</code>.",
    hints: [
      "`Pick<Article, 'id' | 'title'>` for the preview.",
      "`Partial<Article> & { id: number }` for the draft.",
      "The type guard checks that `a.publishedAt` is not null.",
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
    title: "Generic List<T> component",
    instructions:
      "Implement a generic <code>&lt;List items renderItem /&gt;</code> component over <code>T</code> that takes a list of items and a render function. Use it to display two lists of different types (strings and <code>{id, name}</code> objects) on the same page.",
    hints: [
      "The signature: `function List<T>({ items, renderItem }: { items: T[]; renderItem: (item: T) => ReactNode }) {...}`",
      "Don't forget the `key`: you can accept a `getKey` prop or fall back to the index.",
    ],
    template: "react-ts",
    starterFiles: {
      "/App.tsx": `import { ReactNode } from "react";

// TODO: implement List<T>

export default function App() {
  const fruits = ["Mango", "Papaya"];
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
  const fruits = ["Mango", "Papaya", "Avocado"];
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
    tests: {
      "/App.test.tsx": `import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders both sections", () => {
  render(<App />);
  expect(screen.getByText("Fruits")).toBeTruthy();
  expect(screen.getByText("Users")).toBeTruthy();
});

test("renders all 3 fruits", () => {
  render(<App />);
  expect(screen.getByText("Mango")).toBeTruthy();
  expect(screen.getByText("Papaya")).toBeTruthy();
  expect(screen.getByText("Avocado")).toBeTruthy();
});

test("renders the users", () => {
  render(<App />);
  expect(screen.getByText("Ada")).toBeTruthy();
  expect(screen.getByText("Linus")).toBeTruthy();
});
`,
    },
    validator: `const code = files["/App.tsx"] ?? "";
const checks = [
  { name: "generic List<T> component", pass: /function\\s+List\\s*<\\s*T\\s*>/.test(code) },
  { name: "items prop typed as T[]", pass: /items\\s*:\\s*T\\[\\]/.test(code) },
  { name: "renderItem prop typed", pass: /renderItem\\s*:\\s*\\(item\\s*:\\s*T\\)\\s*=>/.test(code) },
  { name: "uses map on items", pass: /items\\.map\\s*\\(/.test(code) },
];
const failures = checks.filter((c) => !c.pass).map((c) => c.name);
return { passed: checks.length - failures.length, total: checks.length, failures };`,
  },
} satisfies Record<string, CodeExercise>;
