import { useLocale } from "./LocaleProvider";
import type { MessageTree } from "./messages/fr";

type Leaves<T> = T extends string
  ? []
  : {
      [K in keyof T]: [K, ...Leaves<T[K]>];
    }[keyof T];

type Join<T extends string[], D extends string = "."> = T extends []
  ? never
  : T extends [infer F]
    ? F & string
    : T extends [infer F, ...infer R]
      ? `${F & string}${D}${Join<Extract<R, string[]>, D>}`
      : string;

export type MessageKey = Join<Leaves<MessageTree>>;

function lookup(tree: MessageTree, key: string): string {
  const parts = key.split(".");
  let cur: unknown = tree;
  for (const part of parts) {
    if (cur == null || typeof cur !== "object") return key;
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === "string" ? cur : key;
}

function applyVars(
  text: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return text;
  let out = text;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{${k}}`, String(v));
  }
  return out;
}

/** Translate a dotted key from the chrome UI message tree. */
export function useT() {
  const { messages } = useLocale();
  return (key: MessageKey, vars?: Record<string, string | number>) =>
    applyVars(lookup(messages, key), vars);
}

/** Non-React lookup (auth error helpers, etc.). */
export function translate(
  messages: MessageTree,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  return applyVars(lookup(messages, key), vars);
}
