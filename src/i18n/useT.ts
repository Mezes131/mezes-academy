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

/** Translate a dotted key from the chrome UI message tree. */
export function useT() {
  const { messages } = useLocale();
  return (key: MessageKey) => lookup(messages, key);
}
