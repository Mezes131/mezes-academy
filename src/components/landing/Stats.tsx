import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
            Prêt à commencer ?
          </h2>
          <p className="mt-3 text-fg-2 max-w-xl mx-auto leading-relaxed">
            React et Secure Vibe Coding sont ouverts dès maintenant. Crée un
            compte pour synchroniser ta progression, ou commence en local : ton
            avance reste dans le navigateur.
          </p>
          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-2">
            <Link to="/react">
              <Button>
                <i className="fa-solid fa-atom" />
                Ouvrir le parcours React
                <ArrowRight size={14} />
              </Button>
            </Link>
            <Link to="/secure-vibe-coding">
              <Button variant="ghost" className="border border-violet-500/40">
                <i className="fa-solid fa-shield-halved text-violet-400" />
                Découvrir Secure Vibe Coding
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
