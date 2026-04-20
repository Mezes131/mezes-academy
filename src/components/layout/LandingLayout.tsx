import type { ReactNode } from "react";
import { LandingNav } from "./LandingNav";
import { Footer } from "./Footer";
import { BackToTopButton } from "./BackToTopButton";

/**
 * Layout de la landing Mezes Academy : nav + contenu + footer.
 * Pas de sidebar (on est hors zone d'apprentissage).
 */
export function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
