import { Link, useLocation } from "react-router-dom";
import { ChevronRight, LogIn } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { UserMenu } from "@/components/auth/UserMenu";
import { SyncStatusBadge } from "@/components/auth/SyncStatusBadge";
import { useAuth } from "@/hooks/useAuth";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";
import { useT } from "@/i18n/useT";
import { useCourseArea } from "./courseArea";
import { cn } from "@/lib/utils";

/**
 * Slim top navigation for a course area.
 * Breadcrumb and theme; search, sidebar, progress, and bookmarks live in CourseBar.
 */
export function CourseTopNav() {
  const { basePath, navTitle, navIcon, navAccent } = useCourseArea();
  const { user } = useAuth();
  const location = useLocation();
  const t = useT();

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
        to={basePath}
        className="flex min-w-0 items-center justify-center gap-2 font-bold text-[14px] hover:text-accent-2 transition"
      >
        <i className={cn("fa-solid flex-shrink-0", navIcon, navAccent.text)} />
        <span className="truncate">{navTitle}</span>
        <span
          className={cn(
            "font-mono text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider hidden sm:inline flex-shrink-0",
            navAccent.chip,
          )}
        >
          {t("nav.pathBadge")}
        </span>
      </Link>

      <div className="flex items-center justify-self-end gap-2">
        <LanguageSwitcher />
        {user ? (
          <>
            <SyncStatusBadge variant="pill" className="hidden sm:inline-flex" />
            <ThemeToggle />
            <UserMenu size={30} />
          </>
        ) : (
          <>
            <ThemeToggle />
            <Link
              to={`/auth?next=${encodeURIComponent(`${location.pathname}${location.search}`)}`}
              className="flex items-center gap-1.5 rounded-lg border-base px-3 py-1.5 text-[13px] font-semibold hover:bg-bg-3 transition"
            >
              <LogIn size={14} />
              {t("nav.signInShort")}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
