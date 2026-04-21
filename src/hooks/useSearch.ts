import { useMemo } from "react";
import type { ContentBlock } from "@/types";
import { phases } from "@/data/phases";

/** Where in the module the query matched (for labels in the UI). */
export type SearchMatchKind =
  | "title"
  | "subtitle"
  | "lesson"
  | "paragraph"
  | "heading"
  | "callout"
  | "highlight"
  | "code"
  | "quiz"
  | "exercise";

export interface SearchResult {
  phaseId: string;
  phaseLabel: string;
  moduleId: string;
  moduleTitle: string;
  moduleSubtitle: string;
  matchedIn: SearchMatchKind;
  snippet?: string;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "");
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function previewText(raw: string, maxLen = 140): string {
  const t = stripHtml(raw).replace(/\s+/g, " ").trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen - 1).trimEnd()}…`;
}

function matchBlock(
  block: ContentBlock,
  q: string,
): { kind: SearchMatchKind; snippet?: string } | null {
  switch (block.kind) {
    case "title":
      if (normalize(block.text).includes(q)) {
        return { kind: "heading", snippet: block.text };
      }
      return null;
    case "paragraph": {
      const text = stripHtml(block.html);
      if (normalize(text).includes(q)) {
        return { kind: "paragraph", snippet: previewText(block.html) };
      }
      return null;
    }
    case "info": {
      const text = stripHtml(`${block.box.title} ${block.box.body}`);
      if (normalize(text).includes(q)) {
        return { kind: "callout", snippet: previewText(text) };
      }
      return null;
    }
    case "highlight": {
      const text = stripHtml(block.html);
      if (normalize(text).includes(q)) {
        return { kind: "highlight", snippet: previewText(block.html) };
      }
      return null;
    }
    case "lessons": {
      for (const lesson of block.items) {
        const tags = lesson.tags?.join(" ") ?? "";
        const haystack = normalize(
          `${lesson.title} ${stripHtml(lesson.desc)} ${tags}`,
        );
        if (haystack.includes(q)) {
          return { kind: "lesson", snippet: lesson.title };
        }
      }
      return null;
    }
    case "code": {
      const text = `${block.sample.label} ${stripHtml(block.sample.html)}`;
      if (normalize(text).includes(q)) {
        return {
          kind: "code",
          snippet: block.sample.label || previewText(block.sample.html, 80),
        };
      }
      return null;
    }
    default:
      return null;
  }
}

/**
 * Full-text search over module titles, subtitles, all content blocks,
 * quiz wording, and exercise titles/instructions.
 */
export function useSearch(query: string): SearchResult[] {
  return useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < 2) return [];

    const results: SearchResult[] = [];
    for (const phase of phases) {
      for (const mod of phase.modules) {
        const base = {
          phaseId: phase.id,
          phaseLabel: phase.label,
          moduleId: mod.id,
          moduleTitle: mod.title,
          moduleSubtitle: mod.subtitle,
        };

        if (normalize(mod.title).includes(q)) {
          results.push({ ...base, matchedIn: "title" });
          continue;
        }
        if (normalize(mod.subtitle).includes(q)) {
          results.push({ ...base, matchedIn: "subtitle" });
          continue;
        }

        let matched: SearchResult | null = null;
        for (const block of mod.content) {
          const hit = matchBlock(block, q);
          if (hit) {
            matched = { ...base, matchedIn: hit.kind, snippet: hit.snippet };
            break;
          }
        }

        if (!matched && mod.quiz) {
          for (const question of mod.quiz.questions) {
            const pool = [
              question.question,
              ...question.options.map((o) => o.label),
            ].join(" ");
            if (normalize(pool).includes(q)) {
              matched = {
                ...base,
                matchedIn: "quiz",
                snippet: previewText(question.question, 120),
              };
              break;
            }
          }
        }

        if (!matched && mod.exercises) {
          for (const ex of mod.exercises) {
            const pool = `${ex.title} ${stripHtml(ex.instructions)}`;
            if (normalize(pool).includes(q)) {
              matched = {
                ...base,
                matchedIn: "exercise",
                snippet: ex.title,
              };
              break;
            }
          }
        }

        if (matched) results.push(matched);
      }
    }
    return results.slice(0, 20);
  }, [query]);
}
