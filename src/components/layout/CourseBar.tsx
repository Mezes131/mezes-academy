import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Bookmark,
  PanelLeft,
  PanelLeftClose,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

interface CourseBarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

/**
 * Secondary toolbar for course pages, below the main top nav.
 * Holds search, sidebar toggle, progress snapshot, and bookmarks.
 */
export function CourseBar({
  isSidebarOpen,
  onToggleSidebar,
}: CourseBarProps) {
  const { stats } = useProgress();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function onSubmitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length >= 2) {
      navigate(`/react/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  }

  return (
    <div className="w-full border-t border-base bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 w-full justify-between items-center gap-12 px-4 sm:px-6">
        <div className="flex justify-start pr-1 sm:pr-2">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={
              isSidebarOpen ? "Fermer le menu latéral" : "Ouvrir le menu latéral"
            }
            className="w-9 h-9 rounded-lg flex items-center justify-center border-base hover:bg-bg-3 transition text-fg-2 hover:text-fg"
          >
            {isSidebarOpen ? (
              <PanelLeftClose size={16} />
            ) : (
              <PanelLeft size={16} />
            )}
          </button>
        </div>

        <div className="flex min-w-0 justify-center px-1">
          <form
            onSubmit={onSubmitSearch}
            className="w-full max-w-xl min-w-0"
          >
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Rechercher…"
              className="w-full"
            />
          </form>
        </div>

        <div className="flex min-w-0 flex-nowrap items-center justify-end gap-1.5 pl-1 sm:gap-2 sm:pl-2">
          <Link
            to="/react/progress"
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 rounded-lg border-base px-1.5 sm:px-2.5 py-1.5 hover:bg-bg-3 transition text-fg-2 hover:text-fg flex-shrink-0",
              location.pathname === "/react/progress" && "bg-bg-3 text-fg",
            )}
            title="Progression"
          >
            <TrendingUp size={16} className="text-fg-3" />
            <span className="text-[11px] font-mono font-semibold tabular-nums">
              {stats.percent}%
            </span>
            <div className="w-20 hidden md:block">
              <ProgressBar value={stats.done} max={stats.total} size="sm" />
            </div>
          </Link>

          <NavLink
            to="/react/bookmarks"
            className={({ isActive }) =>
              cn(
                "w-9 h-9 rounded-lg flex items-center justify-center border-base hover:bg-bg-3 transition flex-shrink-0",
                isActive ? "bg-bg-3 text-fg" : "text-fg-2 hover:text-fg",
              )
            }
            title="Favoris"
          >
            <Bookmark size={16} />
          </NavLink>

          <NavLink
            to="/react/final-project"
            className={({ isActive }) =>
              cn(
                "w-9 h-9 rounded-lg flex items-center justify-center border-base hover:bg-bg-3 transition flex-shrink-0",
                isActive ? "bg-bg-3 text-fg" : "text-fg-2 hover:text-fg",
              )
            }
            title="Projet final"
          >
            <Trophy size={16} />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
