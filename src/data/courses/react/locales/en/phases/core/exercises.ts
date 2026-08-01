import type { CodeExercise } from "@/types";

/** Code exercises for the `react › core` phase. */
export const coreExercises = {
  m11_1: {
    id: "react-core-ex-m11-1",
    title: "Your first JSX list",
    instructions:
      "Create a <code>FruitList</code> component that renders the list of fruits passed as props inside a <code>&lt;ul&gt;</code>. Remember to give each <code>&lt;li&gt;</code> a unique <code>key</code>.",
    hints: [
      "Use fruits.map(...) to generate the <li> elements.",
      "The key prop must be unique. Use the fruit itself or an id if you have one.",
    ],
    template: "react",
    starterFiles: {
      "/App.js": `export default function App() {
  const fruits = ["Mango", "Papaya", "Avocado"];
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>My favorite fruits</h2>
      {/* TODO: render a <ul> with one <li> per fruit */}
    </div>
  );
}
`,
    },
    solutionFiles: {
      "/App.js": `export default function App() {
  const fruits = ["Mango", "Papaya", "Avocado"];
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>My favorite fruits</h2>
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

test("a <ul> is present", () => {
  const { container } = render(<App />);
  expect(container.querySelector("ul")).not.toBeNull();
});

test("there are exactly 3 <li> elements", () => {
  const { container } = render(<App />);
  expect(container.querySelectorAll("li").length).toBe(3);
});

test("each fruit is visible", () => {
  render(<App />);
  expect(screen.getByText("Mango")).toBeTruthy();
  expect(screen.getByText("Papaya")).toBeTruthy();
  expect(screen.getByText("Avocado")).toBeTruthy();
});
`,
    },
    validator: `const code = files["/App.js"] ?? "";
const checks = [
  { name: "a <ul> list is present", pass: /<ul>/i.test(code) },
  { name: "iteration with map", pass: /\\.map\\s*\\(/.test(code) },
  { name: "key on <li> elements", pass: /<li[^>]*key\\s*=/.test(code) },
];
const failures = checks.filter((c) => !c.pass).map((c) => c.name);
return { passed: checks.length - failures.length, total: checks.length, failures };`,
  },

  m12_1: {
    id: "react-core-ex-m12-1",
    title: "Reusable Button component",
    instructions:
      "Create a <code>Button</code> component that accepts the props <code>label</code>, <code>variant</code> (\"primary\" or \"ghost\"), and <code>onClick</code>. Use it twice in <code>App</code> with different variants.",
    hints: [
      "Destructure the props: `function Button({ label, variant, onClick }) {...}`",
      "Apply a different style depending on the `variant` value.",
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
      <Button label="Submit" variant="primary" onClick={() => alert("OK")} />
      <Button label="Cancel" variant="ghost" onClick={() => alert("Cancelled")} />
    </div>
  );
}
`,
    },
  },

  m13_1: {
    id: "react-core-ex-m13-1",
    title: "Minimalist todo list",
    attemptsBeforeSolution: 5,
    instructions:
      "Complete the todo list: the user should be able to type text, click \"Add\" to add it to the list, and see all items displayed. Each item should have a \"Remove\" button that deletes it.",
    hints: [
      "Store todos in an array of { id, text } objects.",
      "To remove: setTodos(todos.filter(t => t.id !== id)).",
      "Remember to clear the input after adding.",
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
      <h2>My todo list</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => removeTodo(t.id)} style={{ marginLeft: 8 }}>
              Remove
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
      <h2>My todo list</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => removeTodo(t.id)} style={{ marginLeft: 8 }}>
              Remove
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

test("adds a todo", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/new task/i);
  fireEvent.change(input, { target: { value: "Learn React" } });
  fireEvent.click(screen.getByRole("button", { name: /add/i }));
  expect(screen.getByText("Learn React")).toBeTruthy();
});

test("removes a todo", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/new task/i);
  fireEvent.change(input, { target: { value: "Learn React" } });
  fireEvent.click(screen.getByRole("button", { name: /add/i }));
  fireEvent.click(screen.getByRole("button", { name: /remove/i }));
  expect(screen.queryByText("Learn React")).toBeNull();
});
`,
    },
    validator: `const code = files["/App.js"] ?? "";
const checks = [
  { name: "todos state declared", pass: /const\\s*\\[\\s*todos\\s*,\\s*setTodos\\s*\\]\\s*=\\s*useState\\s*\\(/.test(code) },
  { name: "addTodo uses setTodos", pass: /function\\s+addTodo[\\s\\S]*setTodos\\s*\\(/.test(code) },
  { name: "removeTodo uses filter", pass: /function\\s+removeTodo[\\s\\S]*\\.filter\\s*\\(/.test(code) },
  { name: "Remove button present", pass: /Remove/.test(code) },
];
const failures = checks.filter((c) => !c.pass).map((c) => c.name);
return { passed: checks.length - failures.length, total: checks.length, failures };`,
  },

  m15_1: {
    id: "react-core-ex-m15-1",
    title: "Create a custom useToggle hook",
    instructions:
      "Create a custom hook <code>useToggle</code> that manages a boolean value and returns <code>[value, toggle]</code>. Use it in the component to show/hide a message.",
    hints: [
      "The hook should use useState internally.",
      "`toggle` is a function that flips the value.",
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
      <button>Toggle</button>
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
      <button onClick={toggle}>Toggle</button>
      {visible && <p style={{ marginTop: 12 }}>Hey, I'm here!</p>}
    </div>
  );
}
`,
    },
  },

  m17_1: {
    id: "react-core-ex-m17-1",
    title: "Controlled form",
    instructions:
      "Create a sign-up form with email and password fields (no React Hook Form for this exercise — just useState). Validate that the email contains @ and the password is at least 6 characters. Display errors below each field.",
    hints: [
      "Use state for each field and a separate errors state.",
      "Validate in onSubmit and prevent the default submit with e.preventDefault().",
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
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%" }} />
      </label>
      {/* TODO: password error message */}
      <button type="submit" style={{ marginTop: 12 }}>Sign up</button>
      {submitted && <p style={{ color: "green" }}>Signed up: {submitted.email}</p>}
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
    if (!email.includes("@")) next.email = "Invalid email";
    if (password.length < 6) next.password = "At least 6 characters";
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
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%" }} />
      </label>
      {errors.password && <p style={{ color: "crimson" }}>{errors.password}</p>}
      <button type="submit" style={{ marginTop: 12 }}>Sign up</button>
      {submitted && <p style={{ color: "green" }}>Signed up: {submitted.email}</p>}
    </form>
  );
}
`,
    },
  },
} satisfies Record<string, CodeExercise>;
