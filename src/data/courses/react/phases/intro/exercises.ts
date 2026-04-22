import type { CodeExercise } from "@/types";

/** Code exercises for the `react › intro` phase. */
export const introExercises = {
  m03_1: {
    id: "react-intro-ex-m03-1",
    title: "Ton premier compteur",
    instructions:
      "Complète le composant <code>Compteur</code> pour qu'il affiche un compteur cliquable. Il doit démarrer à 0 et s'incrémenter à chaque clic sur le bouton.",
    hints: [
      "Utilise le hook useState pour stocker la valeur du compteur.",
      "Dans onClick, appelle setCount avec count + 1.",
    ],
    template: "react",
    starterFiles: {
      "/App.js": `import { useState } from "react";

export default function Compteur() {
  // TODO: declare a \`count\` state initialized to 0
  // TODO: complete the button to increment the counter

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Mon premier compteur</h2>
      <p>Valeur : (à afficher)</p>
      <button>Cliquer</button>
    </div>
  );
}
`,
    },
    solutionFiles: {
      "/App.js": `import { useState } from "react";

export default function Compteur() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Mon premier compteur</h2>
      <p>Valeur : {count}</p>
      <button onClick={() => setCount(count + 1)}>Cliquer</button>
    </div>
  );
}
`,
    },
    tests: {
      "/App.test.js": `import { render, screen, fireEvent } from "@testing-library/react";
import Compteur from "./App";

test("le compteur s'affiche et démarre à 0", () => {
  render(<Compteur />);
  expect(screen.getByText(/0/)).toBeTruthy();
});

test("le compteur s'incrémente au clic", () => {
  render(<Compteur />);
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  expect(screen.getByText(/1/)).toBeTruthy();
});

test("le compteur continue d'incrémenter", () => {
  render(<Compteur />);
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  fireEvent.click(btn);
  fireEvent.click(btn);
  expect(screen.getByText(/3/)).toBeTruthy();
});
`,
    },
    validator: `const code = files["/App.js"] ?? "";
const checks = [
  { name: "useState initialisé à 0", pass: /useState\\s*\\(\\s*0\\s*\\)/.test(code) },
  { name: "setCount appelé dans le bouton", pass: /onClick\\s*=\\s*\\{\\s*\\(?.*setCount\\s*\\(/s.test(code) },
  { name: "count affiché dans le JSX", pass: /\\{\\s*count\\s*\\}/.test(code) },
];
const failures = checks.filter((c) => !c.pass).map((c) => c.name);
return { passed: checks.length - failures.length, total: checks.length, failures };`,
  },
} satisfies Record<string, CodeExercise>;
