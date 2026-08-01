import type { CodeExercise } from "@/types";

export const ecosystemExercises = {
  m23_1: {
    id: "react-ecosystem-ex-m23-1",
    title: "Mini Zustand store: a shopping cart",
    instructions:
      "Implement a mini <code>useCart</code> store <strong>Zustand-style</strong> (we simulate it with <code>useState</code> + a homemade <code>subscribe</code> to stay within Sandpack). Expose <code>items</code>, <code>add(item)</code>, and <code>remove(id)</code>. Display the cart total in a component and add/remove items via two buttons.",
    hints: [
      "For this offline exercise, simply use `useReducer` or `useState` in a parent component that passes functions as props: the goal is to understand the shape of a store.",
      "In a real project, you would write: `const useCart = create((set) => ({ items: [], add: (i) => set((s) => ({ items: [...s.items, i] })) }))`.",
    ],
    template: "react",
    starterFiles: {
      "/App.js": `import { useState } from "react";

const CATALOG = [
  { id: "a", name: "Mug", price: 12 },
  { id: "b", name: "T-shirt", price: 25 },
  { id: "c", name: "Stickers", price: 5 },
];

export default function App() {
  // TODO: state for cart items
  // TODO: add(item) and remove(id)

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Catalog</h2>
      <ul>
        {CATALOG.map((p) => (
          <li key={p.id}>
            {p.name} : {p.price}€
            <button style={{ marginLeft: 8 }}>Add</button>
          </li>
        ))}
      </ul>

      <h2>Cart</h2>
      {/* TODO: list cart items with a "remove" button and show total */}
    </div>
  );
}
`,
    },
    solutionFiles: {
      "/App.js": `import { useState } from "react";

const CATALOG = [
  { id: "a", name: "Mug", price: 12 },
  { id: "b", name: "T-shirt", price: 25 },
  { id: "c", name: "Stickers", price: 5 },
];

export default function App() {
  const [items, setItems] = useState([]);
  const add = (item) => setItems((s) => [...s, { ...item, lineId: Date.now() }]);
  const remove = (lineId) => setItems((s) => s.filter((it) => it.lineId !== lineId));
  const total = items.reduce((acc, it) => acc + it.price, 0);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Catalog</h2>
      <ul>
        {CATALOG.map((p) => (
          <li key={p.id}>
            {p.name} : {p.price}€
            <button style={{ marginLeft: 8 }} onClick={() => add(p)}>Add</button>
          </li>
        ))}
      </ul>

      <h2>Cart ({items.length})</h2>
      <ul>
        {items.map((it) => (
          <li key={it.lineId}>
            {it.name} : {it.price}€
            <button style={{ marginLeft: 8 }} onClick={() => remove(it.lineId)}>Remove</button>
          </li>
        ))}
      </ul>
      <strong>Total: {total}€</strong>
    </div>
  );
}
`,
    },
  },

  m26_1: {
    id: "react-ecosystem-ex-m26-1",
    title: "Your first RTL test",
    instructions:
      "Test the <code>Counter</code> component: it should start at 0, display the value, and increment on click. Write a test that renders the component, checks the initial value, clicks the button, then verifies the new value is displayed.",
    hints: [
      "Get the button via `screen.getByRole('button', { name: /increment/i })`.",
      "Use `fireEvent.click(button)` or `userEvent.click(button)`.",
      "Check the text with `expect(screen.getByText(/1/)).toBeInTheDocument()`.",
    ],
    template: "react-ts",
    starterFiles: {
      "/Counter.tsx": `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Value: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
`,
      "/Counter.test.tsx": `import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("starts at 0 and increments on click", () => {
    // TODO: render the Counter
    // TODO: assert initial value is 0
    // TODO: click the increment button
    // TODO: assert value is now 1
  });
});
`,
      "/App.tsx": `import { Counter } from "./Counter";

export default function App() {
  return <Counter />;
}
`,
    },
    solutionFiles: {
      "/Counter.tsx": `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Value: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
`,
      "/Counter.test.tsx": `import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("starts at 0 and increments on click", () => {
    render(<Counter />);

    expect(screen.getByText(/value\\s*:\\s*0/i)).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: /increment/i });
    fireEvent.click(btn);

    expect(screen.getByText(/value\\s*:\\s*1/i)).toBeInTheDocument();
  });
});
`,
      "/App.tsx": `import { Counter } from "./Counter";

export default function App() {
  return <Counter />;
}
`,
    },
  },
} satisfies Record<string, CodeExercise>;
