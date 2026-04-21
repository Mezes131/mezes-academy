import { useProgress } from "@/hooks/useProgress";
import { Hero, Catalog, HowItWorks, Stats } from "@/components/landing";

/**
 * Mezes Academy landing page.
 * Minimal orchestrator: each section is a dedicated component
 * in src/components/landing/.
 */
export function LandingPage() {
  const { stats } = useProgress();
  const hasProgress = stats.done > 0;

  return (
    <div className="overflow-hidden">
      <Hero hasProgress={hasProgress} />
      <Catalog />
      <HowItWorks />
      <Stats />
    </div>
  );
}
