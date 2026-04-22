import type { CodeExercise } from "@/types";

export const expertExercises = {
  m30_1: {
    id: "react-expert-ex-m30-1",
    title: "Un mini-reconciler « jouet »",
    instructions:
      "Implémente une fonction <code>diff(prev, next)</code> ultra-simplifiée qui compare deux arbres de nœuds <code>{ type, props, children }</code> et retourne une liste d'opérations (<code>ADD</code>, <code>REMOVE</code>, <code>UPDATE_TEXT</code>). L'objectif n'est PAS de reproduire React Fiber (!) mais de comprendre <strong>concrètement</strong> comment un Virtual DOM peut produire un plan de mise à jour minimal.",
    hints: [
      "Compare type et children par index. Pour un nœud texte, renvoie UPDATE_TEXT si le contenu diffère.",
      "Retourne simplement un tableau d'objets { op, path, value }.",
      "On ignore volontairement la gestion des `key` — c'est précisément ce qui rend l'algo de React complexe.",
    ],
    template: "react-ts",
    starterFiles: {
      "/App.tsx": `type VNode =
  | { type: "text"; value: string }
  | { type: string; children: VNode[] };

type Op =
  | { op: "ADD"; path: number[]; node: VNode }
  | { op: "REMOVE"; path: number[] }
  | { op: "UPDATE_TEXT"; path: number[]; value: string };

// TODO: implement diff(prev, next, path = []) that returns Op[]

const prev: VNode = {
  type: "div",
  children: [{ type: "text", value: "Hello" }, { type: "text", value: "World" }],
};
const next: VNode = {
  type: "div",
  children: [{ type: "text", value: "Hello" }, { type: "text", value: "Sandpack" }],
};

export default function App() {
  return (
    <pre style={{ padding: 24, fontFamily: "monospace" }}>
      {/* JSON.stringify(diff(prev, next), null, 2) */}
    </pre>
  );
}
`,
    },
    solutionFiles: {
      "/App.tsx": `type VNode =
  | { type: "text"; value: string }
  | { type: string; children: VNode[] };

type Op =
  | { op: "ADD"; path: number[]; node: VNode }
  | { op: "REMOVE"; path: number[] }
  | { op: "UPDATE_TEXT"; path: number[]; value: string };

function diff(prev: VNode, next: VNode, path: number[] = []): Op[] {
  if (prev.type === "text" && next.type === "text") {
    return prev.value !== next.value
      ? [{ op: "UPDATE_TEXT", path, value: next.value }]
      : [];
  }
  if (prev.type !== next.type || "value" in prev || "value" in next) {
    return [
      { op: "REMOVE", path },
      { op: "ADD", path, node: next },
    ];
  }
  const ops: Op[] = [];
  const max = Math.max(prev.children.length, next.children.length);
  for (let i = 0; i < max; i++) {
    const p = prev.children[i];
    const n = next.children[i];
    if (!p && n) ops.push({ op: "ADD", path: [...path, i], node: n });
    else if (p && !n) ops.push({ op: "REMOVE", path: [...path, i] });
    else if (p && n) ops.push(...diff(p, n, [...path, i]));
  }
  return ops;
}

const prev: VNode = {
  type: "div",
  children: [
    { type: "text", value: "Hello" },
    { type: "text", value: "World" },
  ],
};
const next: VNode = {
  type: "div",
  children: [
    { type: "text", value: "Hello" },
    { type: "text", value: "Sandpack" },
  ],
};

export default function App() {
  return (
    <pre style={{ padding: 24, fontFamily: "monospace" }}>
      {JSON.stringify(diff(prev, next), null, 2)}
    </pre>
  );
}
`,
    },
  },

  m32_1: {
    id: "react-expert-ex-m32-1",
    title: "Streaming UI : token par token",
    instructions:
      "Simule un streaming de tokens côté UI. Crée un composant <code>&lt;StreamedMessage text=\"…\" delay={40} /&gt;</code> qui affiche progressivement le texte, caractère par caractère, et fournit un bouton <code>Stop</code> pour interrompre. L'objectif : comprendre la boucle d'animation qui sous-tend toutes les interfaces LLM.",
    hints: [
      "Utilise `useEffect` + `setInterval` (ou `setTimeout` récursif) pour ajouter un caractère à chaque tick.",
      "Pense au cleanup : si le composant démonte ou si on clique Stop, il faut annuler l'intervalle.",
      "Stocke le texte affiché dans un state string cumulatif.",
    ],
    template: "react",
    starterFiles: {
      "/App.js": `import { useEffect, useState } from "react";

function StreamedMessage({ text, delay = 40 }) {
  // TODO: progressively display text, char by char
  // TODO: expose a way to stop
  return <p>{/* rendered text */}</p>;
}

export default function App() {
  const [running, setRunning] = useState(false);
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <button onClick={() => setRunning(true)}>Lancer</button>
      <button onClick={() => setRunning(false)}>Stop</button>
      {running && <StreamedMessage text="React is declarative, component-based, and now AI-native." delay={30} />}
    </div>
  );
}
`,
    },
    solutionFiles: {
      "/App.js": `import { useEffect, useRef, useState } from "react";

function StreamedMessage({ text, delay = 40 }) {
  const [shown, setShown] = useState("");
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      if (cancelled.current || i >= text.length) {
        clearInterval(id);
        return;
      }
      i++;
      setShown(text.slice(0, i));
    }, delay);
    return () => {
      cancelled.current = true;
      clearInterval(id);
    };
  }, [text, delay]);

  return <p style={{ minHeight: 24 }}>{shown}<span style={{ opacity: 0.5 }}>▍</span></p>;
}

export default function App() {
  const [running, setRunning] = useState(false);
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <button onClick={() => setRunning(true)}>Lancer</button>
      <button onClick={() => setRunning(false)} style={{ marginLeft: 8 }}>Stop</button>
      {running && <StreamedMessage text="React is declarative, component-based, and now AI-native." delay={30} />}
    </div>
  );
}
`,
    },
  },
} satisfies Record<string, CodeExercise>;
