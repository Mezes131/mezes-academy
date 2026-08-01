import { Link } from "react-router-dom";
import { ArrowRight, Atom, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Landing closing CTA. One job: get the learner into a track.
 */
export function Stats() {
  return (
    <section className="relative py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl border-base bg-bg-2 p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            On y va ?
          </h2>
          <p className="mt-3 text-fg-2 max-w-xl mx-auto leading-relaxed">
            React et Secure Vibe Coding t&apos;attendent. Crée un compte si tu
            veux synchroniser ton avance, ou commence tout de suite en local :
            rien ne se perd dans le navigateur.
          </p>
          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-2">
            <Link to="/react">
              <Button>
                <Atom size={16} aria-hidden="true" />
                C&apos;est parti pour React
                <ArrowRight size={14} aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/secure-vibe-coding">
              <Button variant="ghost" className="border border-violet-500/40">
                <Shield
                  size={16}
                  className="text-violet-600 dark:text-violet-400"
                  aria-hidden="true"
                />
                Essayer Secure Vibe Coding
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
