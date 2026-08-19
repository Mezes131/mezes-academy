import { Hero, Catalog, HowItWorks, ClosingCtaSection } from "@/components/landing";
import { useProgress } from "@/hooks/useProgress";
import {
  FLAGSHIP_SLUG,
  REACT_SLUG,
  courseHasProgress,
} from "@/lib/flagshipContinue";

/**
 * Mezes Academy landing page.
 * Minimal orchestrator: each section is a dedicated component
 * in src/components/landing/.
 */
export function LandingPage() {
  const { progress } = useProgress();
  const hasSvcProgress = courseHasProgress(FLAGSHIP_SLUG, progress);
  const hasReactProgress = courseHasProgress(REACT_SLUG, progress);

  return (
    <div className="overflow-hidden">
      <Hero
        hasSvcProgress={hasSvcProgress}
        hasReactProgress={hasReactProgress}
      />
      <Catalog />
      <HowItWorks />
      <ClosingCtaSection />
    </div>
  );
}
