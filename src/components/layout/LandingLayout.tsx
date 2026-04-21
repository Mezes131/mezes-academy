import type { ReactNode } from "react";
import { LandingNav } from "./LandingNav";
import { Footer } from "./Footer";
import { BackToTopButton } from "./BackToTopButton";

/**
 * Mezes Academy landing layout: nav + content + footer.
 * No sidebar (outside the learning area).
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
