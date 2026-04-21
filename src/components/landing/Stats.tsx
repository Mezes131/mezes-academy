import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { academyStats } from "@/data/catalog";

/**
 * Landing "Stats & final CTA" section.
 * Shows 4 key academy metrics, then a reminder block
 * pointing to the active track.
 */
export function Stats() {
  return (
    <section className="relative py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-px md:grid-cols-4 rounded-2xl overflow-hidden border-base bg-bg-2">
          <StatCard
            icon={<BookOpen size={20} />}
            value={academyStats.lessonsCount}
            suffix="+"
            label="Leçons structurées"
          />
          <StatCard
            icon={<Code2 size={20} />}
            value={academyStats.exercisesCount}
            label="Exercices live"
          />
          <StatCard
            icon={<i className="fa-solid fa-bullseye text-[20px]" />}
            value={academyStats.quizzesCount}
            label="Quiz interactifs"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            value={academyStats.coursesActive + academyStats.coursesPlanned}
            label="Parcours (actifs & à venir)"
          />
        </div>

        {/* CTA final */}
        <FinalCta />
      </div>
    </section>
  );
}

/* ─── Private subcomponents ─────────────────────────────────── */

function StatCard({
  icon,
  value,
  suffix,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="bg-bg p-6 flex flex-col gap-2">
      <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent-2 flex items-center justify-center">
        {icon}
      </div>
      <div className="mt-1 text-3xl font-extrabold font-mono tracking-tight text-fg">
        {value}
        {suffix}
      </div>
      <div className="text-[12px] text-fg-2">{label}</div>
    </div>
  );
}

function FinalCta() {
  return (
    <div className="mt-20 rounded-2xl border-base bg-gradient-to-br from-bg-2 via-bg-2 to-bg-3 p-10 md:p-14 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px circle at 50% 100%, rgb(108 99 255 / 0.35), transparent 60%)",
        }}
      />
      <div className="relative">
        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Prêt à commencer ?
        </h3>
        <p className="mt-3 text-fg-2 max-w-xl mx-auto">
          Le parcours React est disponible dès maintenant. Aucune inscription,
          ta progression est conservée dans ton navigateur.
        </p>
        <div className="mt-7 inline-flex items-center gap-2">
          <Link to="/react">
            <Button>
              <i className="fa-solid fa-atom" />
              Ouvrir le parcours React
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
