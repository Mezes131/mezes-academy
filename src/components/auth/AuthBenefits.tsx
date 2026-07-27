import { Link } from "react-router-dom";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import type { AuthMode } from "./AuthModeSwitcher";

interface AuthBenefitsProps {
  mode: AuthMode;
}

/**
 * Left column of the auth page: dynamic headline + value proposition bullets.
 * Pure presentation, safe to render anywhere.
 */
export function AuthBenefits({ mode }: AuthBenefitsProps) {
  return (
    <section className="max-w-xl md:max-w-none">
      <h1 className="text-center lg:text-left text-3xl lg:text-5xl font-extrabold tracking-tight leading-[1.05]">
        {mode === "login" ? (
          <>
            Ravi de te revoir
            <span className="block text-accent-2">sur ton parcours.</span>
          </>
        ) : (
          <>
            Crée ton compte
            <span className="block text-accent-2">
              et commence à apprendre.
            </span>
          </>
        )}
      </h1>
      <div className="hidden lg:block">
        <p className="mt-4 text-fg-2 text-[16px] leading-relaxed max-w-prose">
          Ton compte synchronise ta progression dans le cloud. Modules lus, quiz
          validés et exercices résolus te suivent sur n&apos;importe quel appareil.
        </p>

        <ul className="mt-8 space-y-3">
          <Benefit
            icon={<CheckCircle2 size={16} />}
            title="Progression sauvegardée"
            body="Reprends exactement où tu t'étais arrêté, sans perdre un quiz ni un exercice."
          />
          <Benefit
            icon={<ShieldCheck size={16} />}
            title="Données protégées"
            body="Authentification sécurisée : chaque apprenant ne voit que sa propre progression."
          />
          <Benefit
            icon={<Sparkles size={16} />}
            title="Multi-appareils"
            body="Laptop, tablette ou téléphone : une seule session, le même parcours."
          />
        </ul>

        <div className="mt-10 flex items-center gap-3 text-[13px] text-fg-3">
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-fg transition"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </section>
  );
}

function Benefit({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 w-6 h-6 rounded-md bg-accent/10 text-accent-2 inline-flex items-center justify-center flex-shrink-0">
        {icon}
      </span>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-[13px] text-fg-2 leading-relaxed">{body}</div>
      </div>
    </li>
  );
}
