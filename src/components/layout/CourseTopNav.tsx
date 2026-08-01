import { Link, useLocation } from "react-router-dom";
import { ChevronRight, LogIn } from "lucide-react";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { UserMenu } from "@/components/auth/UserMenu";
import { SyncStatusBadge } from "@/components/auth/SyncStatusBadge";
import { useAuth } from "@/hooks/useAuth";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import { LanguageMenu } from "@/i18n/LanguageMenu";
import { useCourseArea } from "./courseArea";
import { cn } from "@/lib/utils";

/**
 * Slim top navigation for a course area.
 * Guests: language menu in the bar. Signed-in: language in account prefs.
 */
export function CourseTopNav() {
  const { basePath, navTitle, navIcon, navAccent } = useCourseArea();
  const { user } = useAuth();
  const location = useLocation();
  const t = useT();
  const lp = useLocalePath();

  return (
    <nav className="mx-auto grid h-14 w-full min-w-0 max-w-6xl grid-cols-[1fr_auto_1fr] sm:grid-cols-3 items-center gap-2 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3 justify-self-start">
        <Link
          to={lp("/")}
          aria-label="Mezes Academy"
          className="flex items-center gap-2 flex-shrink-0"
        >
          <MezesLogo size={26} />
        </Link>
        <ChevronRight size={14} className="text-fg-3 flex-shrink-0 hidden sm:block" aria-hidden="true" />
      </div>

      <Link
        to={basePath}
        className="flex min-w-0 max-w-[40vw] sm:max-w-none items-center justify-center gap-2 font-bold text-[13px] sm:text-[14px] hover:text-accent-2 transition"
      >
        <i className={cn("fa-solid flex-shrink-0", navIcon, navAccent.text)} aria-hidden="true" />
        <span className="truncate">{navTitle}</span>
        <span
          className={cn(
            "font-mono text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider hidden md:inline flex-shrink-0",
            navAccent.chip,
          )}
        >
          {t("nav.pathBadge")}
        </span>
      </Link>

      <div className="flex items-center justify-self-end gap-2">
        {user ? (
          <>
            <SyncStatusBadge variant="pill" className="hidden sm:inline-flex" />
            <UserMenu size={30} />
          </>
        ) : (
          <>
            <LanguageMenu />
            <Link
              to={lp(
                `/auth?next=${encodeURIComponent(`${location.pathname}${location.search}`)}`,
              )}
              className="flex items-center gap-1.5 rounded-lg border-base min-h-11 px-3 text-[13px] font-semibold hover:bg-bg-3 transition"
            >
              <LogIn size={14} aria-hidden="true" />
              <span className="hidden sm:inline">{t("nav.signInShort")}</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
