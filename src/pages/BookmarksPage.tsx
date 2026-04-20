import { Link } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { findModule } from "@/data/phases";
import { phaseAccent, cn } from "@/lib/utils";
import { BookmarkCheck, Bookmark, ArrowRight } from "lucide-react";

export function BookmarksPage() {
  const { progress, toggleBookmark } = useProgress();

  const bookmarked = progress.bookmarks
    .map((id) => findModule(id))
    .filter((x): x is NonNullable<ReturnType<typeof findModule>> =>
      Boolean(x),
    );

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10 animate-fade-in">
      <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-accent-2 mb-3">
        <BookmarkCheck size={14} /> Favoris
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">
        Tes modules favoris
      </h1>
      <p className="text-fg-2 font-serif mb-8">
        Les modules marqués comme favoris pour y revenir facilement.
      </p>

      {bookmarked.length === 0 ? (
        <div className="rounded-xl border-base bg-bg-2 p-10 text-center">
          <div className="text-4xl mb-3 text-fg-3">
            <i className="fa-solid fa-bookmark" />
          </div>
          <div className="text-sm font-semibold mb-1">
            Aucun module en favori
          </div>
          <p className="text-[13px] text-fg-2">
            Clique sur l'icône de signet en haut d'un module pour l'ajouter ici.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarked.map(({ phase, module }) => {
            const accent = phaseAccent(phase.color);
            return (
              <div
                key={module.id}
                className="flex items-start gap-4 rounded-xl border-base bg-bg-2 p-5"
              >
                <div
                  className={cn(
                    "w-11 h-11 rounded-lg flex items-center justify-center border flex-shrink-0 font-mono text-xs font-bold",
                    accent.bg,
                    accent.border,
                    accent.text,
                  )}
                >
                  {module.index}
                </div>
                <Link
                  to={`/react/module/${module.id}`}
                  className="flex-1 min-w-0 group"
                >
                  <div className={cn("text-[11px] font-mono uppercase tracking-wider", accent.text)}>
                    {phase.label}
                  </div>
                  <div className="font-bold mt-0.5 group-hover:text-accent-2 transition">
                    {module.title}
                  </div>
                  <p className="text-[13px] text-fg-2 leading-relaxed mt-1">
                    {module.subtitle}
                  </p>
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(module.id)}
                    className="p-2 rounded-lg hover:bg-bg-3 text-fg-2 transition"
                    aria-label="Retirer des favoris"
                  >
                    <Bookmark size={16} />
                  </button>
                  <Link
                    to={`/react/module/${module.id}`}
                    className="p-2 rounded-lg hover:bg-bg-3 text-fg-2 hover:text-fg transition"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
