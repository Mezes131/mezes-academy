import type { CodeExercise } from "@/types";

export const ecosystemExercises = {
  m23_1: {
    id: "react-ecosystem-ex-m23-1",
    title: "Mini-store Zustand : un panier",
    instructions:
      "Implémente un mini-store <code>useCart</code> <strong>à la Zustand</strong> (on simule avec <code>useState</code> + un <code>subscribe</code> maison pour rester dans Sandpack). Expose <code>items</code>, <code>add(item)</code> et <code>remove(id)</code>. Affiche le total du panier dans un composant et ajoute/enlève des items via deux boutons.",
    hints: [
      "Pour cet exercice offline, utilise simplement `useReducer` ou `useState` dans un composant parent qui passe les fonctions en props — l'objectif est de comprendre le shape d'un store.",
      "En vrai projet, tu écrirais : `const useCart = create((set) => ({ items: [], add: (i) => set((s) => ({ items: [...s.items, i] })) }))`.",
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
      <h2>Catalogue</h2>
      <ul>
        {CATALOG.map((p) => (
          <li key={p.id}>
            {p.name} — {p.price}€
            <button style={{ marginLeft: 8 }}>Ajouter</button>
          </li>
        ))}
      </ul>

      <h2>Panier</h2>
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
      <h2>Catalogue</h2>
      <ul>
        {CATALOG.map((p) => (
          <li key={p.id}>
            {p.name} — {p.price}€
            <button style={{ marginLeft: 8 }} onClick={() => add(p)}>Ajouter</button>
          </li>
        ))}
      </ul>

      <h2>Panier ({items.length})</h2>
      <ul>
        {items.map((it) => (
          <li key={it.lineId}>
            {it.name} — {it.price}€
            <button style={{ marginLeft: 8 }} onClick={() => remove(it.lineId)}>Retirer</button>
          </li>
        ))}
      </ul>
      <strong>Total : {total}€</strong>
    </div>
  );
}
`,
    },
  },

  m26_1: {
    id: "react-ecosystem-ex-m26-1",
    title: "Ton premier test RTL",
    instructions:
      "Teste le composant <code>Counter</code> : il doit démarrer à 0, afficher la valeur, et incrémenter au clic. Écris un test qui rend le composant, vérifie la valeur initiale, clique sur le bouton, puis vérifie que la nouvelle valeur est affichée.",
    hints: [
      "Récupère le bouton via `screen.getByRole('button', { name: /incrémenter/i })`.",
      "Utilise `fireEvent.click(button)` ou `userEvent.click(button)`.",
      "Vérifie le texte avec `expect(screen.getByText(/1/)).toBeInTheDocument()`.",
    ],
    template: "react-ts",
    starterFiles: {
      "/Counter.tsx": `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Valeur : {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Incrémenter</button>
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
      <p>Valeur : {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Incrémenter</button>
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

    expect(screen.getByText(/valeur\\s*:\\s*0/i)).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: /incrémenter/i });
    fireEvent.click(btn);

    expect(screen.getByText(/valeur\\s*:\\s*1/i)).toBeInTheDocument();
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
