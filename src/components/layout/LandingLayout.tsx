import type { ReactNode } from "react";
import { LandingNav } from "./LandingNav";
import { LandingBottomBar } from "./LandingBottomBar";
import { Footer } from "./Footer";
import { BackToTopButton } from "./BackToTopButton";
import { DeferredFontAwesome } from "./DeferredFontAwesome";

/**
 * Mezes Academy landing layout: nav + content + footer.
 * Mobile: bottom bar for primary destinations.
 */
export function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <DeferredFontAwesome />
      <LandingNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
      <LandingBottomBar />
    </div>
  );
}
