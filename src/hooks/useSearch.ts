import { useMemo } from "react";
import { phases } from "@/data/phases";

export interface SearchResult {
  phaseId: string;
  phaseLabel: string;
  moduleId: string;
  moduleTitle: string;
  moduleSubtitle: string;
  matchedIn: "title" | "subtitle" | "lesson" | "paragraph";
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

/**
 * Recherche plein-texte légère sur le contenu des modules.
 * On parcourt titres, sous-titres, leçons et paragraphes.
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
        let matched = false;
        for (const block of mod.content) {
          if (matched) break;
          if (block.kind === "lessons") {
            for (const lesson of block.items) {
              const haystack = normalize(lesson.title + " " + stripHtml(lesson.desc));
              if (haystack.includes(q)) {
                results.push({
                  ...base,
                  matchedIn: "lesson",
                  snippet: lesson.title,
                });
                matched = true;
                break;
              }
            }
          } else if (block.kind === "paragraph") {
            const text = stripHtml(block.html);
            if (normalize(text).includes(q)) {
              const idx = normalize(text).indexOf(q);
              const snippet = text.slice(
                Math.max(0, idx - 30),
                Math.min(text.length, idx + q.length + 60),
              );
              results.push({ ...base, matchedIn: "paragraph", snippet });
              matched = true;
            }
          }
        }
      }
    }
    return results.slice(0, 20);
  }, [query]);
}
