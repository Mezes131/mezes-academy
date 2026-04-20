import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { useSearch } from "@/hooks/useSearch";
import { Search as SearchIcon, FileText, BookOpen } from "lucide-react";

const MATCH_LABELS: Record<string, string> = {
  title: "Titre du module",
  subtitle: "Sous-titre",
  lesson: "Leçon",
  paragraph: "Contenu",
};

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const results = useSearch(query);

  useEffect(() => {
    if (query.trim().length >= 2) {
      setParams({ q: query.trim() }, { replace: true });
    } else if (params.get("q")) {
      setParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10 animate-fade-in">
      <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-accent-2 mb-3">
        <SearchIcon size={14} /> Recherche
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-6">
        Trouve un concept précis
      </h1>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Ex : useState, Virtual DOM, JSX…"
        autoFocus
      />

      {query.trim().length < 2 && (
        <p className="text-[13px] text-fg-3 mt-3">
          Tape au moins 2 caractères pour lancer la recherche.
        </p>
      )}

      {query.trim().length >= 2 && results.length === 0 && (
        <div className="mt-10 text-center text-fg-2">
          <div className="text-4xl mb-3 text-fg-3">
            <i className="fa-solid fa-magnifying-glass" />
          </div>
          Aucun résultat pour « <strong>{query}</strong> ».
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className="mt-6 text-[12px] font-mono uppercase tracking-wider text-fg-3">
            {results.length} résultat{results.length > 1 ? "s" : ""}
          </div>
          <div className="mt-3 space-y-2">
            {results.map((r) => (
              <Link
                key={`${r.moduleId}-${r.matchedIn}`}
                to={`/react/module/${r.moduleId}`}
                className="block rounded-lg border-base bg-bg-2 p-4 hover:border-accent/30 transition group"
              >
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-1">
                  {r.matchedIn === "lesson" ? (
                    <FileText size={12} />
                  ) : (
                    <BookOpen size={12} />
                  )}
                  <span>{r.phaseLabel}</span>
                  <span>·</span>
                  <span>{MATCH_LABELS[r.matchedIn]}</span>
                </div>
                <div className="text-sm font-bold group-hover:text-accent-2 transition">
                  {r.moduleTitle}
                </div>
                <div className="text-[13px] text-fg-2 mt-0.5">
                  {r.snippet || r.moduleSubtitle}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
