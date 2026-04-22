import type { CodeExercise } from "@/types";

/** Code exercises for the `react › core` phase. */
export const coreExercises = {
  m11_1: {
    id: "react-core-ex-m11-1",
    title: "Ta première liste JSX",
    instructions:
      "Crée un composant <code>FruitList</code> qui affiche la liste des fruits passée en props sous forme de <code>&lt;ul&gt;</code>. Pense à fournir une <code>key</code> unique à chaque <code>&lt;li&gt;</code>.",
    hints: [
      "Utilise fruits.map(...) pour générer les <li>.",
      "La prop key doit être unique. Utilise le fruit lui-même ou un id si tu en as.",
    ],
    template: "react",
    starterFiles: {
      "/App.js": `export default function App() {
  const fruits = ["Mangue", "Papaye", "Avocat"];
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Mes fruits préférés</h2>
      {/* TODO: render a <ul> with one <li> per fruit */}
    </div>
  );
}
`,
    },
    solutionFiles: {
      "/App.js": `export default function App() {
  const fruits = ["Mangue", "Papaye", "Avocat"];
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Mes fruits préférés</h2>
      <ul>
        {fruits.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  );
}
`,
    },
    tests: {
      "/App.test.js": `import { render, screen } from "@testing-library/react";
import App from "./App";

test("un <ul> est présent", () => {
  const { container } = render(<App />);
  expect(container.querySelector("ul")).not.toBeNull();
});

test("il y a exactement 3 <li>", () => {
  const { container } = render(<App />);
  expect(container.querySelectorAll("li").length).toBe(3);
});

test("chaque fruit est visible", () => {
  render(<App />);
  expect(screen.getByText("Mangue")).toBeTruthy();
  expect(screen.getByText("Papaye")).toBeTruthy();
  expect(screen.getByText("Avocat")).toBeTruthy();
});
`,
    },
    validator: `const code = files["/App.js"] ?? "";
const checks = [
  { name: "présence d'une liste <ul>", pass: /<ul>/i.test(code) },
  { name: "itération avec map", pass: /\\.map\\s*\\(/.test(code) },
  { name: "key sur les <li>", pass: /<li[^>]*key\\s*=/.test(code) },
];
const failures = checks.filter((c) => !c.pass).map((c) => c.name);
return { passed: checks.length - failures.length, total: checks.length, failures };`,
  },

  m12_1: {
    id: "react-core-ex-m12-1",
    title: "Composant Button réutilisable",
    instructions:
      "Crée un composant <code>Button</code> qui accepte les props <code>label</code>, <code>variant</code> (« primary » ou « ghost ») et <code>onClick</code>. Utilise-le 2 fois dans <code>App</code> avec des variants différents.",
    hints: [
      "Déstructure les props : `function Button({ label, variant, onClick }) {...}`",
      "Applique un style différent selon la valeur de `variant`.",
    ],
    template: "react",
    starterFiles: {
      "/App.js": `// TODO: define the Button component
// It should accept { label, variant, onClick }

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui", display: "flex", gap: 12 }}>
      {/* TODO: use your Button with variant="primary" and variant="ghost" */}
    </div>
  );
}
`,
    },
    solutionFiles: {
      "/App.js": `function Button({ label, variant = "primary", onClick }) {
  const styles = {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid",
    cursor: "pointer",
    fontWeight: 600,
    ...(variant === "primary"
      ? { background: "#6c63ff", color: "white", borderColor: "#6c63ff" }
      : { background: "transparent", color: "#6c63ff", borderColor: "#6c63ff" }),
  };
  return (
    <button style={styles} onClick={onClick}>
      {label}
    </button>
  );
}

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui", display: "flex", gap: 12 }}>
      <Button label="Valider" variant="primary" onClick={() => alert("OK")} />
      <Button label="Annuler" variant="ghost" onClick={() => alert("Annulé")} />
    </div>
  );
}
`,
    },
  },

  m13_1: {
    id: "react-core-ex-m13-1",
    title: "Todo list minimaliste",
    attemptsBeforeSolution: 5,
    instructions:
      "Complète la todo list : l'utilisateur doit pouvoir taper un texte, cliquer sur « Ajouter » pour l'ajouter à la liste, et voir tous les items affichés. Chaque item doit avoir un bouton « Supprimer » qui le retire.",
    hints: [
      "Stocke les todos dans un tableau d'objets { id, text }.",
      "Pour supprimer : setTodos(todos.filter(t => t.id !== id)).",
      "Pense à vider l'input après ajout.",
    ],
    template: "react",
    starterFiles: {
      "/App.js": `import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  function addTodo() {
    // TODO: add a new todo { id, text } to the list
    // and clear the input
  }

  function removeTodo(id) {
    // TODO: remove the todo with this id
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 400 }}>
      <h2>Ma todo list</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nouvelle tâche..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTodo}>Ajouter</button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => removeTodo(t.id)} style={{ marginLeft: 8 }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
    },
    solutionFiles: {
      "/App.js": `import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  function addTodo() {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput("");
  }

  function removeTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 400 }}>
      <h2>Ma todo list</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nouvelle tâche..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTodo}>Ajouter</button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => removeTodo(t.id)} style={{ marginLeft: 8 }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
    },
    tests: {
      "/App.test.js": `import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("ajoute une todo", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/nouvelle tâche/i);
  fireEvent.change(input, { target: { value: "Apprendre React" } });
  fireEvent.click(screen.getByRole("button", { name: /ajouter/i }));
  expect(screen.getByText("Apprendre React")).toBeTruthy();
});

test("supprime une todo", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/nouvelle tâche/i);
  fireEvent.change(input, { target: { value: "Apprendre React" } });
  fireEvent.click(screen.getByRole("button", { name: /ajouter/i }));
  fireEvent.click(screen.getByRole("button", { name: /supprimer/i }));
  expect(screen.queryByText("Apprendre React")).toBeNull();
});
`,
    },
    validator: `const code = files["/App.js"] ?? "";
const checks = [
  { name: "state todos déclaré", pass: /const\\s*\\[\\s*todos\\s*,\\s*setTodos\\s*\\]\\s*=\\s*useState\\s*\\(/.test(code) },
  { name: "addTodo utilise setTodos", pass: /function\\s+addTodo[\\s\\S]*setTodos\\s*\\(/.test(code) },
  { name: "removeTodo utilise filter", pass: /function\\s+removeTodo[\\s\\S]*\\.filter\\s*\\(/.test(code) },
  { name: "bouton Supprimer présent", pass: /Supprimer/.test(code) },
];
const failures = checks.filter((c) => !c.pass).map((c) => c.name);
return { passed: checks.length - failures.length, total: checks.length, failures };`,
  },

  m15_1: {
    id: "react-core-ex-m15-1",
    title: "Crée un custom hook useToggle",
    instructions:
      "Crée un custom hook <code>useToggle</code> qui gère une valeur booléenne et retourne <code>[value, toggle]</code>. Utilise-le dans le composant pour afficher/masquer un message.",
    hints: [
      "Le hook doit utiliser useState en interne.",
      "`toggle` est une fonction qui inverse la valeur.",
    ],
    template: "react",
    starterFiles: {
      "/App.js": `import { useState } from "react";

// TODO: create a useToggle(initial = false) hook
// that returns [value, toggle]

export default function App() {
  // TODO: use useToggle here
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <button>Basculer</button>
      {/* show a message when value is true */}
    </div>
  );
}
`,
    },
    solutionFiles: {
      "/App.js": `import { useState, useCallback } from "react";

function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}

export default function App() {
  const [visible, toggle] = useToggle(false);
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <button onClick={toggle}>Basculer</button>
      {visible && <p style={{ marginTop: 12 }}>Coucou, je suis là !</p>}
    </div>
  );
}
`,
    },
  },

  m17_1: {
    id: "react-core-ex-m17-1",
    title: "Formulaire contrôlé",
    instructions:
      "Crée un formulaire d'inscription avec les champs email et mot de passe (sans React Hook Form pour cet exercice, juste avec useState). Valide que l'email contient @ et que le mot de passe fait au moins 6 caractères. Affiche les erreurs sous chaque champ.",
    hints: [
      "Utilise un state pour chaque champ et un state d'erreurs.",
      "Valide dans le onSubmit et empêche le submit par défaut avec e.preventDefault().",
    ],
    template: "react",
    starterFiles: {
      "/App.js": `import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: validate fields and either fill 'errors' or submit (setSubmitted({email, password}))
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 24, fontFamily: "system-ui", maxWidth: 320 }}>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%" }} />
      </label>
      {/* TODO: email error message */}
      <label style={{ display: "block", marginTop: 12 }}>
        Mot de passe
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%" }} />
      </label>
      {/* TODO: password error message */}
      <button type="submit" style={{ marginTop: 12 }}>S'inscrire</button>
      {submitted && <p style={{ color: "green" }}>Inscrit : {submitted.email}</p>}
    </form>
  );
}
`,
    },
    solutionFiles: {
      "/App.js": `import { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!email.includes("@")) next.email = "Email invalide";
    if (password.length < 6) next.password = "6 caractères minimum";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted({ email, password });
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 24, fontFamily: "system-ui", maxWidth: 320 }}>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%" }} />
      </label>
      {errors.email && <p style={{ color: "crimson" }}>{errors.email}</p>}
      <label style={{ display: "block", marginTop: 12 }}>
        Mot de passe
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%" }} />
      </label>
      {errors.password && <p style={{ color: "crimson" }}>{errors.password}</p>}
      <button type="submit" style={{ marginTop: 12 }}>S'inscrire</button>
      {submitted && <p style={{ color: "green" }}>Inscrit : {submitted.email}</p>}
    </form>
  );
}
`,
    },
  },
} satisfies Record<string, CodeExercise>;
