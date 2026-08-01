import type { CodeExercise } from "@/types";

/** Code exercises for the `react › intro` phase. */
export const introExercises = {
  m03_1: {
    id: "react-intro-ex-m03-1",
    title: "Your first counter",
    instructions:
      "Complete the <code>Counter</code> component so it shows a clickable counter. It must start at 0 and increment on every button click.",
    hints: [
      "Use the useState hook to store the counter value.",
      "In onClick, call setCount with count + 1.",
    ],
    template: "react",
    starterFiles: {
      "/App.js": `import { useState } from "react";

export default function Counter() {
  // TODO: declare a \`count\` state initialized to 0
  // TODO: complete the button to increment the counter

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>My first counter</h2>
      <p>Value: (show here)</p>
      <button>Click</button>
    </div>
  );
}
`,
    },
    solutionFiles: {
      "/App.js": `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>My first counter</h2>
      <p>Value: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}
`,
    },
    tests: {
      "/App.test.js": `import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./App";

test("the counter renders and starts at 0", () => {
  render(<Counter />);
  expect(screen.getByText(/0/)).toBeTruthy();
});

test("the counter increments on click", () => {
  render(<Counter />);
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  expect(screen.getByText(/1/)).toBeTruthy();
});

test("the counter keeps incrementing", () => {
  render(<Counter />);
  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  fireEvent.click(btn);
  fireEvent.click(btn);
  expect(screen.getByText(/3/)).toBeTruthy();
});
`,
    },
    validator: `const code = files["/App.js"] ?? "";
const hasInitialState = /useState\\s*\\(\\s*0\\s*\\)/.test(code);
const showsCount = /\\{\\s*count\\s*\\}/.test(code);

// Rejects immediate calls like onClick={setCount(count + 1)} which cause
// an infinite render loop, and expects a real click handler function.
const directSetCountInOnClick = /onClick\\s*=\\s*\\{\\s*setCount\\s*\\(/.test(code);
const inlineArrowHandler = /onClick\\s*=\\s*\\{\\s*(?:\\([^)]*\\)|[A-Za-z_$][\\w$]*)\\s*=>[\\s\\S]*?setCount\\s*\\(/.test(code);
const safeClickHandler = inlineArrowHandler && !directSetCountInOnClick;

const checks = [
  { name: "useState initialized to 0", pass: hasInitialState },
  { name: "setCount called inside a real onClick handler", pass: safeClickHandler },
  { name: "count displayed in JSX", pass: showsCount },
];
const failures = checks.filter((c) => !c.pass).map((c) => c.name);
return { passed: checks.length - failures.length, total: checks.length, failures };`,
  },
} satisfies Record<string, CodeExercise>;
