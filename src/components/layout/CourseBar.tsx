import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
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
import { computeCourseStats } from "@/lib/courseProgress";
import { useCourseArea } from "./courseArea";
import { useT } from "@/i18n/useT";
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
  const { progress } = useProgress();
  const { basePath, learnerTools, phases, showFinalProject } = useCourseArea();
  const stats = useMemo(
    () => computeCourseStats(phases, progress),
    [phases, progress],
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const t = useT();

  function onSubmitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length >= 2) {
      navigate(`${basePath}/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  }

  return (
    <div className="w-full border-t-base bg-bg">
      <div className="mx-auto flex min-h-14 w-full justify-between items-center gap-12 px-4 sm:px-6">
        <div className="flex justify-start pr-1 sm:pr-2">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={
              isSidebarOpen ? t("courseBar.closeSidebar") : t("courseBar.openSidebar")
            }
            className="min-w-11 min-h-11 rounded-lg flex items-center justify-center border-base hover:bg-bg-3 transition text-fg-2 hover:text-fg"
          >
            {isSidebarOpen ? (
              <PanelLeftClose size={16} />
            ) : (
              <PanelLeft size={16} />
            )}
          </button>
        </div>

        <div className="flex min-w-0 justify-center px-1">
          {learnerTools && (
            <form
              onSubmit={onSubmitSearch}
              className="w-full max-w-xl min-w-0"
            >
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder={t("courseBar.search")}
                className="w-full"
              />
            </form>
          )}
        </div>

        {learnerTools ? (
          <div className="flex min-w-0 flex-nowrap items-center justify-end gap-1.5 pl-1 sm:gap-2 sm:pl-2">
            <Link
              to={`${basePath}/progress`}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 rounded-lg border-base px-1.5 sm:px-2.5 min-h-11 hover:bg-bg-3 transition text-fg-2 hover:text-fg flex-shrink-0",
                location.pathname === `${basePath}/progress` && "bg-bg-3 text-fg",
              )}
              title={t("courseBar.progress")}
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
              to={`${basePath}/bookmarks`}
              className={({ isActive }) =>
                cn(
                  "min-w-11 min-h-11 rounded-lg flex items-center justify-center border-base hover:bg-bg-3 transition flex-shrink-0",
                  isActive ? "bg-bg-3 text-fg" : "text-fg-2 hover:text-fg",
                )
              }
              title={t("courseBar.bookmarks")}
            >
              <Bookmark size={16} />
            </NavLink>

            {showFinalProject !== false && (
              <NavLink
                to={`${basePath}/final-project`}
                className={({ isActive }) =>
                  cn(
                    "min-w-11 min-h-11 rounded-lg flex items-center justify-center border-base hover:bg-bg-3 transition flex-shrink-0",
                    isActive ? "bg-bg-3 text-fg" : "text-fg-2 hover:text-fg",
                  )
                }
                title={t("courseBar.finalProject")}
              >
                <Trophy size={16} />
              </NavLink>
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
