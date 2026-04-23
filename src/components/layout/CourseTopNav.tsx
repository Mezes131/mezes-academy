import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { UserMenu } from "@/components/auth/UserMenu";
import { SyncStatusBadge } from "@/components/auth/SyncStatusBadge";

/**
 * Slim top navigation for the course area (/react/*).
 * Breadcrumb and theme; search, sidebar, progress, and bookmarks live in CourseBar.
 */
export function CourseTopNav() {
  return (
    <nav className="mx-auto grid h-14 w-full min-w-0 max-w-6xl grid-cols-3 items-center gap-2 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3 justify-self-start">
        <Link
          to="/"
          aria-label="Mezes Academy"
          className="flex items-center gap-2 flex-shrink-0"
        >
          <MezesLogo size={26} />
        </Link>
        <ChevronRight size={14} className="text-fg-3 flex-shrink-0" />
      </div>

      <Link
        to="/react"
        className="flex min-w-0 items-center justify-center gap-2 font-bold text-[14px] hover:text-accent-2 transition"
      >
        <i className="fa-solid fa-atom text-brand-core flex-shrink-0" />
        <span className="truncate">React de zéro à expert</span>
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-brand-core/10 text-brand-core border border-brand-core/20 uppercase tracking-wider hidden sm:inline flex-shrink-0">
          parcours
        </span>
      </Link>

      <div className="flex items-center justify-self-end gap-2">
        <SyncStatusBadge variant="pill" className="hidden sm:inline-flex" />
        <ThemeToggle />
        <UserMenu size={30} />
      </div>
    </nav>
  );
}
