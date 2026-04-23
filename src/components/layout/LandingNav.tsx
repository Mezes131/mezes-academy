import { Link, NavLink } from "react-router-dom";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

/**
 * Mezes Academy landing navigation.
 * Clean and brand-centered, distinct from the course TopNav.
 */
export function LandingNav() {
  const { user, profile, signOut } = useAuth();

  const label =
    profile?.fullName?.trim() ||
    user?.email?.split("@")[0] ||
    "Mon compte";

  async function onSignOut() {
    try {
      await signOut();
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <nav className="sticky top-0 z-50 h-16 bg-bg/80 backdrop-blur-xl border-b border-base">
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center gap-6">
        <Link to="/" aria-label="Mezes Academy" className="flex items-center gap-2 flex-shrink-0">
          <MezesLogo size={28} showText showMark={false} />
        </Link>

        <div className="hidden md:flex items-center gap-1 ml-6">
          <NavLink to="/" end className={navLinkClass}>
            Accueil
          </NavLink>
          <a href="#catalog" className={staticLinkClass}>
            Catalogue
          </a>
          <a href="#how-it-works" className={staticLinkClass}>
            Comment ça marche
          </a>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          {user ? (
            <>
              <span className="hidden sm:inline text-xs text-fg-3 font-mono">
                {label}
              </span>
              <Link to="/react">
                <Button size="sm">
                  Continuer le parcours
                  <ArrowRight size={14} />
                </Button>
              </Link>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => void onSignOut()}
                title="Se déconnecter"
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button size="sm">
                  Connexion
                  <ArrowRight size={14} />
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
    "px-3 h-9 flex items-center rounded-lg text-[13px] font-medium transition",
    isActive ? "text-fg bg-bg-3" : "text-fg-2 hover:text-fg hover:bg-bg-3/60",
  );

const staticLinkClass = cn(
  "px-3 h-9 flex items-center rounded-lg text-[13px] font-medium transition",
  "text-fg-2 hover:text-fg hover:bg-bg-3/60",
);
