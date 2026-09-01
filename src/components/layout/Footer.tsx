import { Link } from "react-router-dom";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";

/**
 * Global footer for Mezes Academy landing.
 * Four columns: brand, tracks, resources, legal.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const t = useT();
  const lp = useLocalePath();

  return (
    <footer className="mt-24 border-t-base bg-bg-2/30">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <MezesLogo size={34} showText />
            <p className="mt-4 text-[13px] text-fg-2 leading-relaxed max-w-xs">
              {t("footer.blurb")}
            </p>
            <SocialLinks className="mt-5" />
          </div>

          <FooterCol title={t("footer.tracks")}>
            <FooterLink to={lp("/secure-vibe-coding")}>
              {t("footer.svcTrack")}
            </FooterLink>
            <FooterLink to={lp("/react")}>{t("footer.reactTrack")}</FooterLink>
            <FooterMuted>DevOps · {t("footer.planned")}</FooterMuted>
          </FooterCol>

          <FooterCol title={t("footer.resources")}>
            <FooterLink to={lp("/pricing")}>{t("footer.pricing")}</FooterLink>
            <FooterLink to={lp("/#how-it-works")}>{t("footer.howItWorks")}</FooterLink>
            <FooterLink to={lp("/react/progress")}>{t("footer.myProgress")}</FooterLink>
            <FooterLink to={lp("/react/bookmarks")}>{t("footer.myBookmarks")}</FooterLink>
            <FooterLink to={lp("/react/search")}>{t("footer.search")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("footer.academy")}>
            <FooterLink to={lp("/about")}>{t("footer.about")}</FooterLink>
            <FooterLink to={lp("/contact")}>{t("footer.contact")}</FooterLink>
            <FooterLink to={lp("/terms")}>{t("footer.terms")}</FooterLink>
            <FooterLink to={lp("/privacy")}>{t("footer.privacy")}</FooterLink>
            <FooterLink to={lp("/legal")}>{t("footer.legalNotice")}</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 p-4 border-t-base flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-[12px] text-fg-3 font-mono">
            © {year} Mezes Corporation {t("course.rightsReserved")}
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
