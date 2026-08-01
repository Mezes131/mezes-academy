import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { useSearch, type SearchMatchKind } from "@/hooks/useSearch";
import { useCourseArea } from "@/components/layout/courseArea";
import { useT } from "@/i18n/useT";
import type { MessageKey } from "@/i18n/useT";
import { Search as SearchIcon, FileText, BookOpen } from "lucide-react";

const MATCH_LABEL_KEYS: Record<SearchMatchKind, MessageKey> = {
  title: "search.matchModuleTitle",
  subtitle: "search.matchSubtitle",
  lesson: "search.matchLesson",
  paragraph: "search.matchContent",
  heading: "search.matchSection",
  callout: "search.matchCallout",
  highlight: "search.matchRemember",
  code: "search.matchCode",
  quiz: "search.matchQuiz",
  exercise: "search.matchExercise",
};

export function SearchPage() {
  const t = useT();
  const { basePath, phases } = useCourseArea();
  const [params, setParams] = useSearchParams();
  const qFromUrl = params.get("q") ?? "";
  const [query, setQuery] = useState(() => qFromUrl);

  const matchLabels = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(MATCH_LABEL_KEYS).map(([kind, key]) => [
          kind,
          t(key as MessageKey),
        ]),
      ) as Record<SearchMatchKind, string>,
    [t],
  );

  useEffect(() => {
    if (qFromUrl) setQuery(qFromUrl);
  }, [qFromUrl]);

  const results = useSearch(query, phases);

  useEffect(() => {
    if (query.trim().length >= 2) {
      setParams({ q: query.trim() }, { replace: true });
    } else if (params.get("q")) {
      setParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 animate-fade-in">
      <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-accent-2 mb-3">
        <SearchIcon size={14} /> {t("search.title")}
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-6">
        {t("search.subtitle")}
      </h1>

      <SearchBar value={query} onChange={setQuery} autoFocus />

      {query.trim().length < 2 && (
        <p className="text-[13px] text-fg-3 mt-3">{t("search.minChars")}</p>
      )}

      {query.trim().length >= 2 && results.length === 0 && (
        <div className="mt-10 text-center text-fg-2">
          <div className="text-4xl mb-3 text-fg-3">
            <i className="fa-solid fa-magnifying-glass" />
          </div>
          {t("search.emptyFor")}{" "}
          <strong>{query}</strong>
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className="mt-6 text-[12px] font-mono uppercase tracking-wider text-fg-3">
            {t("search.results", { n: results.length })}
          </div>
          <div className="mt-3 space-y-2">
            {results.map((r) => (
              <Link
                key={`${r.moduleId}-${r.matchedIn}`}
                to={`${basePath}/module/${r.moduleId}`}
                className="block rounded-lg border-base bg-bg-2 p-4 hover:border-accent/30 transition group"
              >
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-1">
                  {r.matchedIn === "lesson" || r.matchedIn === "exercise" ? (
                    <FileText size={12} />
                  ) : (
                    <BookOpen size={12} />
                  )}
                  <span>{r.phaseLabel}</span>
                  <span>·</span>
                  <span>{matchLabels[r.matchedIn]}</span>
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
