import { Link } from "react-router-dom";
import { Github, Linkedin, Youtube } from "lucide-react";
import { MezesLogo } from "@/components/ui/MezesLogo";

/**
 * Global footer for Mezes Academy landing.
 * Four columns: brand, tracks, resources, legal.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-base bg-bg-2/30">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <MezesLogo size={34} showText />
            <p className="mt-4 text-[13px] text-fg-2 leading-relaxed max-w-xs">
              On t&apos;aide à construire des trucs qui tiennent : React solide,
              vibe coding sans mauvaises surprises, à ton rythme.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialLink href="https://twitter.com" label="X / Twitter">
                <XIcon />
              </SocialLink>
              <SocialLink href="https://github.com" label="GitHub">
                <Github size={16} aria-hidden="true" />
              </SocialLink>
              <SocialLink href="https://linkedin.com" label="LinkedIn">
                <Linkedin size={16} aria-hidden="true" />
              </SocialLink>
              <SocialLink href="https://youtube.com" label="YouTube">
                <Youtube size={16} aria-hidden="true" />
              </SocialLink>
            </div>
          </div>

          <FooterCol title="Parcours">
            <FooterLink to="/react">React de zéro à expert</FooterLink>
            <FooterLink to="/secure-vibe-coding">Secure Vibe Coding</FooterLink>
            <FooterMuted>DevOps · Prévu</FooterMuted>
          </FooterCol>

          <FooterCol title="Ressources">
            <FooterLink to="/#how-it-works">Comment ça marche</FooterLink>
            <FooterLink to="/react/progress">Ma progression</FooterLink>
            <FooterLink to="/react/bookmarks">Mes favoris</FooterLink>
            <FooterLink to="/react/search">Recherche</FooterLink>
          </FooterCol>

          <FooterCol title="Académie">
            <FooterLink to="#">À propos</FooterLink>
            <FooterLink to="#">Contact</FooterLink>
            <FooterLink to="#">Conditions</FooterLink>
            <FooterLink to="#">Confidentialité</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 p-4 border-t border-base flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-[12px] text-fg-3 font-mono">
            © {year} Mezes Corporation Tous droits réservés.
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
    <li>
      <Link
        to={to}
        className="text-[13px] text-fg-2 hover:text-fg transition w-fit inline-block"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterMuted({ children }: { children: React.ReactNode }) {
  return <li className="text-[13px] text-fg-3">{children}</li>;
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="min-w-11 min-h-11 rounded-lg border-base flex items-center justify-center text-fg-2 hover:text-fg hover:bg-bg-3 transition"
    >
      {children}
    </a>
  );
}

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.227-8.66L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}
