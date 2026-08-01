import { Link, NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { Button } from "@/components/ui/Button";
import { UserMenu } from "@/components/auth/UserMenu";
import { useAuth } from "@/hooks/useAuth";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import { LanguageMenu } from "@/i18n/LanguageMenu";
import { cn } from "@/lib/utils";

/**
 * Mezes Academy landing navigation.
 * Guests: language menu in the bar. Signed-in: language in account prefs.
 */
export function LandingNav() {
  const { user } = useAuth();
  const t = useT();
  const lp = useLocalePath();

  return (
    <nav className="sticky top-0 z-50 min-h-16 bg-bg border-b-base py-2">
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center gap-3 sm:gap-6">
        <Link
          to={lp("/")}
          aria-label="Mezes Academy"
          className="flex items-center gap-2 flex-shrink-0"
        >
          <MezesLogo size={28} showText showMark={false} />
        </Link>

        <div className="hidden md:flex items-center gap-1 ml-2 lg:ml-6 min-w-0">
          <NavLink to={lp("/")} end className={navLinkClass}>
            {t("nav.home")}
          </NavLink>
          <Link to={lp("/#catalog")} className={staticLinkClass}>
            {t("nav.catalog")}
          </Link>
          <Link to={lp("/#how-it-works")} className={staticLinkClass}>
            {t("nav.howItWorks")}
          </Link>
        </div>

        <div className="flex items-center gap-2 ml-auto min-w-0">
          {user ? (
            <>
              <Link to={lp("/react")} className="hidden sm:inline-flex">
                <Button size="sm">
                  {t("nav.continue")}
                  <ArrowRight size={14} aria-hidden="true" />
                </Button>
              </Link>
              <UserMenu showName size={32} />
            </>
          ) : (
            <>
              <LanguageMenu />
              <Link to={lp("/auth")}>
                <Button size="sm">
                  {t("nav.signIn")}
                  <ArrowRight size={14} aria-hidden="true" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "px-3 min-h-11 flex items-center rounded-lg text-[13px] font-medium transition",
    isActive ? "text-fg bg-bg-3" : "text-fg-2 hover:text-fg hover:bg-bg-3/60",
  );

const staticLinkClass = cn(
  "px-3 min-h-11 inline-flex items-center rounded-lg text-[13px] font-medium transition",
  "text-fg-2 hover:text-fg hover:bg-bg-3/60",
);
