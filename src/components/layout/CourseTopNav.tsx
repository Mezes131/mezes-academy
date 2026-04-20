import { Link, NavLink, useLocation } from "react-router-dom";
import { Bookmark, Home, TrendingUp, Search, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchBar } from "@/components/ui/SearchBar";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Nav de la zone parcours (/react/*).
 * Affiche le "fil d'Ariane" Mezes \u203A React, les liens scoping-course,
 * la progression globale et le th\u00e8me.
 */
export function CourseTopNav() {
  const { stats } = useProgress();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function onSubmitSearch() {
    if (query.trim().length >= 2) {
      navigate(`/react/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  }

  return (
    <nav className="sticky top-0 z-50 h-14 bg-bg/90 backdrop-blur-md border-b border-base flex items-center px-6 gap-5">
      {/* Breadcrumb Mezes \u203A React */}
      <Link to="/" aria-label="Mezes Academy" className="flex items-center gap-2">
        <MezesLogo size={26} />
      </Link>
      <ChevronRight size={14} className="text-fg-3 -mx-2" />
      <Link
        to="/react"
        className="flex items-center gap-2 font-bold text-[14px] hover:text-accent-2 transition"
      >
        <i className="fa-solid fa-atom text-brand-core" />
        <span>React</span>
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-brand-core/10 text-brand-core border border-brand-core/20 uppercase tracking-wider">
          parcours
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-0.5 ml-4">
        <NavItem to="/react" icon={<Home size={14} />} label="Aperçu" exact />
        <NavItem to="/react/progress" icon={<TrendingUp size={14} />} label="Progression" />
        <NavItem to="/react/bookmarks" icon={<Bookmark size={14} />} label="Favoris" />
      </div>

      <form
        className="hidden md:flex flex-1 max-w-xs ml-auto"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitSearch();
        }}
      >
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Rechercher…"
          className="w-full"
        />
      </form>

      <div className="flex items-center gap-3 ml-auto md:ml-0">
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
            {stats.percent}%
          </span>
          <div className="w-24">
            <ProgressBar value={stats.done} max={stats.total} size="sm" />
          </div>
        </div>
        <ThemeToggle />
      </div>

      <Link
        to="/react/search"
        className={cn(
          "md:hidden w-9 h-9 rounded-lg flex items-center justify-center border-base hover:bg-bg-3",
          location.pathname === "/react/search" && "bg-bg-3",
        )}
      >
        <Search size={16} />
      </Link>
    </nav>
  );
}

function NavItem({
  to,
  icon,
  label,
  exact,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-1.5 px-3 h-9 rounded-lg text-[13px] font-medium transition",
          isActive
            ? "text-fg bg-bg-3"
            : "text-fg-2 hover:text-fg hover:bg-bg-3/60",
        )
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
