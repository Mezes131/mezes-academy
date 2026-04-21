import { Link, NavLink } from "react-router-dom";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

/**
 * Mezes Academy landing navigation.
 * Clean and brand-centered, distinct from the course TopNav.
 */
export function LandingNav() {
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
          <Link to="/react">
            <Button size="sm">
              Accéder au parcours
              <ArrowRight size={14} />
            </Button>
          </Link>
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
