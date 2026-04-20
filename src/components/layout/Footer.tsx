import { Link } from "react-router-dom";
import { MezesLogo } from "@/components/ui/MezesLogo";

/**
 * Footer global de la landing Mezes Academy.
 * Quatre colonnes : marque, parcours, ressources, légal.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-base bg-bg-2/30">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* ─── Marque ───────────────────────────── */}
          <div>
            <MezesLogo size={34} showText />
            <p className="mt-4 text-[13px] text-fg-2 leading-relaxed max-w-xs">
              Des parcours sérieux pour apprendre le développement web en
              autonomie, avec exercices interactifs et suivi de progression.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialLink href="https://twitter.com" icon="fa-brands fa-x-twitter" label="X / Twitter" />
              <SocialLink href="https://github.com" icon="fa-brands fa-github" label="GitHub" />
              <SocialLink href="https://linkedin.com" icon="fa-brands fa-linkedin-in" label="LinkedIn" />
              <SocialLink href="https://youtube.com" icon="fa-brands fa-youtube" label="YouTube" />
            </div>
          </div>

          {/* ─── Parcours ─────────────────────────── */}
          <FooterCol title="Parcours">
            <FooterLink to="/react">React — de zéro à expert</FooterLink>
            <span className="text-[13px] text-fg-3">TypeScript · Bientôt</span>
            <span className="text-[13px] text-fg-3">Next.js · Bientôt</span>
            <span className="text-[13px] text-fg-3">Node.js · Bientôt</span>
            <span className="text-[13px] text-fg-3">DevOps · Prévu</span>
          </FooterCol>

          {/* ─── Ressources ───────────────────────── */}
          <FooterCol title="Ressources">
            <FooterLink to="/#how-it-works">Comment ça marche</FooterLink>
            <FooterLink to="/react/progress">Ma progression</FooterLink>
            <FooterLink to="/react/bookmarks">Mes favoris</FooterLink>
            <FooterLink to="/react/search">Recherche</FooterLink>
          </FooterCol>

          {/* ─── Légal ────────────────────────────── */}
          <FooterCol title="Académie">
            <FooterLink to="#">À propos</FooterLink>
            <FooterLink to="#">Contact</FooterLink>
            <FooterLink to="#">Conditions</FooterLink>
            <FooterLink to="#">Confidentialité</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 pt-6 border-t border-base flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-[12px] text-fg-3 font-mono">
            © {year} Mezes Academy — Tous droits réservés.
          </div>
          <div className="text-[12px] text-fg-3">
            Fait avec <i className="fa-solid fa-heart text-red-400" /> et un peu
            de JSX.
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-3">
        {title}
      </div>
      <ul className="space-y-2 flex flex-col">{children}</ul>
    </div>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="text-[13px] text-fg-2 hover:text-fg transition w-fit"
    >
      {children}
    </Link>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-lg border-base flex items-center justify-center text-fg-2 hover:text-fg hover:bg-bg-3 transition"
    >
      <i className={icon} />
    </a>
  );
}
