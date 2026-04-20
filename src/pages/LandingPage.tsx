import { useProgress } from "@/hooks/useProgress";
import { Hero, Catalog, HowItWorks, Stats } from "@/components/landing";

/**
 * Page d'accueil de Mezes Academy.
 * Orchestrateur minimal : chaque section est un composant d\u00e9di\u00e9
 * dans src/components/landing/.
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
