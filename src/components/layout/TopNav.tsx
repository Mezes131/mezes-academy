import { Link, NavLink, useLocation } from "react-router-dom";
import { Bookmark, Home, TrendingUp, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchBar } from "@/components/ui/SearchBar";
import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function TopNav() {
  const { stats } = useProgress();
  const location = useLocation();
  const [query, setQuery] = useState("");

  function onSubmitSearch() {
    if (query.trim().length >= 2) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <nav className="sticky top-0 z-50 h-14 bg-bg/90 backdrop-blur-md border-b border-base flex items-center px-6 gap-5">
      <Link to="/" className="flex items-center gap-2 font-bold">
        <span className="text-accent-2">React Masterclass</span>
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent-2 border border-accent/20 uppercase tracking-wider">
          v1
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-0.5 ml-6">
        <NavItem to="/" icon={<Home size={14} />} label="Accueil" exact />
        <NavItem to="/progress" icon={<TrendingUp size={14} />} label="Progression" />
        <NavItem to="/bookmarks" icon={<Bookmark size={14} />} label="Favoris" />
      </div>

      <form
        className="hidden md:flex flex-1 max-w-sm ml-auto"
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
        to="/search"
        className={cn(
          "md:hidden w-9 h-9 rounded-lg flex items-center justify-center border-base hover:bg-bg-3",
          location.pathname === "/search" && "bg-bg-3",
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
