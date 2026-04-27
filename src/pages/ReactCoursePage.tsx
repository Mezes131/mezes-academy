import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  TrendingUp,
  Bookmark,
  PlayCircle,
  Clock,
  CheckCircle2,
  Code2,
  Target,
  Trophy,
} from "lucide-react";
import type { CourseProgram, ProgramModule, ProgramPhase } from "@/types";
import { findCourseProgram } from "@/data";
import { phases, findModule } from "@/data/phases";
import { useProgress } from "@/hooks/useProgress";
import { cn, phaseAccent } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";

/**
 * React track dashboard (formerly HomePage).
 * True LMS "course" screen: quick resume, next step, progress
 * by phase, and shortcuts to cross-cutting pages.
 */
export function ReactCoursePage() {
  const { progress, stats, phaseStats } = useProgress();
  const phaseCount = phases.length;
  const moduleCount = phases.reduce((sum, phase) => sum + phase.modules.length, 0);
  const program = findCourseProgram("react");

  // ─── Compute the "next module to do" ──────────────────────
  const nextModule = (() => {
    for (const phase of phases) {
      for (const mod of phase.modules) {
        const read = progress.readModules.includes(mod.id);
        const quizScore = mod.quiz ? progress.quizScores[mod.quiz.id] : null;
        const quizDone =
          !mod.quiz ||
          (quizScore && quizScore.total > 0 && quizScore.correct / quizScore.total >= 0.7);
        const exercisesDone =
          !mod.exercises ||
          mod.exercises.every((e) => progress.completedExercises.includes(e.id));
        if (!read || !quizDone || !exercisesDone) {
          return { phase, module: mod };
        }
      }
    }
    return null;
  })();

  // ─── "Where you left off" (latest touched quiz/module) ────────
  const lastActivity = (() => {
    const allScores = Object.entries(progress.quizScores)
      .map(([quizId, score]) => ({ quizId, ...score }))
      .sort((a, b) => b.updatedAt - a.updatedAt);
    if (allScores.length === 0) return null;
    const latest = allScores[0];
    // Find the module that owns this quiz
    for (const phase of phases) {
      for (const mod of phase.modules) {
        if (mod.quiz?.id === latest.quizId) {
          return { phase, module: mod, score: latest };
        }
      }
    }
    return null;
  })();

  const hasStarted = stats.done > 0;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 animate-fade-in">
      {/* ─── Course hero ────────────────────────── */}
      <section className="relative mb-10">
        <div
          className="absolute -top-12 -left-20 right-0 h-72 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(600px circle at 30% 40%, rgb(108 99 255 / 0.18), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-brand-core mb-3">
            <i className="fa-solid fa-atom" />
            Parcours React
            <span className="text-fg-2"> Mezes Academy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.98]">
            Ton parcours <em className="not-italic bg-gradient-to-r from-brand-core to-brand-intro bg-clip-text text-transparent">React</em>,
            <br />
            du premier JSX à l'architecture expert.
          </h1>
          <p className="mt-5 text-[16px] text-fg-2 font-serif leading-relaxed max-w-2xl">
            {phaseCount} phases progressives, {moduleCount} modules, des dizaines
            d'exercices live.
            Ta progression est sauvegardée automatiquement, reprends à tout
            moment là où tu t'es arrêté.
          </p>
        </div>
      </section>

      {/* ─── Row: Resume + stats ─────────────── */}
      <section className="grid lg:grid-cols-3 gap-4 mb-10">
        {/* Card reprise (2/3) */}
        <ContinueCard nextModule={nextModule} hasStarted={hasStarted} />

        {/* Stats rapides (1/3) */}
        <div className="grid gap-3">
          <MiniStat
            icon={<TrendingUp size={16} />}
            label="Progression globale"
            value={`${stats.percent}%`}
            accent="text-accent-2"
          />
          <MiniStat
            icon={<BookOpen size={16} />}
            label="Modules lus"
            value={String(progress.readModules.length)}
          />
          <MiniStat
            icon={<Code2 size={16} />}
            label="Exercices faits"
            value={String(progress.completedExercises.length)}
          />
        </div>
      </section>

      {/* ─── Last activity ────────────────────── */}
      {lastActivity && (
        <section className="mb-10">
          <SectionTitle icon="fa-clock-rotate-left" text="Dernière activité" />
          <LastActivityCard activity={lastActivity} />
        </section>
      )}

      {/* ─── Phase track ─────────────────── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <SectionTitle
            icon="fa-layer-group"
            text={`Le parcours en ${phaseCount} phases`}
            noMargin
          />
          <Link to="/react/progress" className="text-[13px] text-accent-2 hover:underline inline-flex items-center gap-1">
            Voir tous les détails
            <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {phases.map((phase, i) => {
            const accent = phaseAccent(phase.color);
            const st = phaseStats[i];
            return (
              <Link
                key={phase.id}
                to={`/react/phase/${phase.id}`}
                className={cn(
                  "group relative rounded-xl border-base bg-bg-2 p-5 transition",
                  "hover:border-accent/30 hover:-translate-y-0.5 duration-200",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border",
                      accent.bg,
                      accent.border,
                      accent.text,
                    )}
                  >
                    <i className={`fa-solid ${phase.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className={cn("font-bold truncate", accent.text)}>
                        {phase.title}
                      </h3>
                      {phase.scaffoldOnly && (
                        <span className="text-[9px] font-mono uppercase tracking-wider bg-bg-4 text-fg-3 px-1.5 py-0.5 rounded">
                          wip
                        </span>
                      )}
                    </div>
                    <p className="text-[12.5px] text-fg-2 leading-snug line-clamp-2">
                      {phase.summary}
                    </p>
                    <div className="mt-3">
                      <ProgressBar
                        value={st.done}
                        max={st.total}
                        color={phase.color}
                        size="sm"
                      />
                      <div className="mt-1.5 flex justify-between text-[11px] font-mono text-fg-3">
                        <span>{phase.modules.length} modules</span>
                        <span className={accent.text}>{st.percent}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {program && <SyllabusSection program={program} />}

      {/* ─── Shortcuts ───────────────────────────── */}
      <section>
        <SectionTitle icon="fa-bolt" text="Raccourcis" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <ShortcutCard
            to="/react/progress"
            icon={<TrendingUp size={16} />}
            title="Progression"
            desc="Stats détaillées, export / import JSON"
          />
          <ShortcutCard
            to="/react/bookmarks"
            icon={<Bookmark size={16} />}
            title="Favoris"
            desc={`${progress.bookmarks.length} module${progress.bookmarks.length > 1 ? "s" : ""} en favori`}
          />
          <ShortcutCard
            to="/react/search"
            icon={<i className="fa-solid fa-magnifying-glass text-[14px]" />}
            title="Recherche"
            desc="Trouve un concept précis"
          />
          <ShortcutCard
            to="/react/final-project"
            icon={<Trophy size={16} />}
            title="Projet final"
            desc="Gate capstone + phase tutorielle"
          />
        </div>
      </section>
    </div>
  );
}

/* ─── Page subcomponents ─────────────────────────────────── */

function SectionTitle({
  icon,
  text,
  noMargin,
}: {
  icon: string;
  text: string;
  noMargin?: boolean;
}) {
  return (
    <h2
      className={cn(
        "text-[11px] font-mono uppercase tracking-[0.15em] text-fg-3 flex items-center gap-2",
        !noMargin && "mb-4",
      )}
    >
      <i className={`fa-solid ${icon}`} />
      {text}
    </h2>
  );
}

function MiniStat({
  icon,
  label,
  value,
  accent = "text-fg",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border-base bg-bg-2 p-4 flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-bg-3 text-fg-2 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
          {label}
        </div>
        <div className={cn("text-xl font-extrabold font-mono", accent)}>
          {value}
        </div>
      </div>
    </div>
  );
}

function ContinueCard({
  nextModule,
  hasStarted,
}: {
  nextModule: { phase: NonNullable<ReturnType<typeof findModule>>["phase"]; module: NonNullable<ReturnType<typeof findModule>>["module"] } | null;
  hasStarted: boolean;
}) {
  if (!nextModule) {
    return (
      <div className="lg:col-span-2 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-bg-2 p-6 md:p-8 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-2xl">
          <i className="fa-solid fa-trophy" />
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-emerald-400 mb-1">
            Parcours terminé
          </div>
          <div className="text-xl font-extrabold">
            Bravo, tu as complété tous les modules disponibles !
          </div>
          <p className="text-[13px] text-fg-2 mt-1">
            Le capstone React Pro Path est maintenant disponible : ouvre le gate
            du projet final pour passer en mode production.
          </p>
        </div>
      </div>
    );
  }

  const accent = phaseAccent(nextModule.phase.color);
  return (
    <Link
      to={`/react/module/${nextModule.module.id}`}
      className="lg:col-span-2 group relative rounded-2xl border-base bg-gradient-to-br from-bg-2 via-bg-2 to-bg-3 p-6 md:p-7 transition hover:border-accent/40 duration-200 overflow-hidden"
    >
      {/* Colored halo */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgb(108 99 255 / 0.25) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex items-start gap-5">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0",
            "bg-accent/15 text-accent-2 border border-accent/30",
          )}
        >
          <PlayCircle size={26} />
        </div>
        <div className="flex-1 min-w-0">
          <div className={cn("text-[11px] font-mono uppercase tracking-[0.15em] mb-1", accent.text)}>
            {hasStarted ? "Continuer là où tu t'es arrêté" : "Commencer le parcours"}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <i className={`fa-solid ${nextModule.phase.icon} ${accent.text}`} />
            <span className={cn("text-[12px] font-semibold", accent.text)}>
              {nextModule.phase.label}
            </span>
            <span className="text-fg-3 text-[12px] font-mono">·</span>
            <span className="text-[12px] font-mono text-fg-3">
              {nextModule.module.index}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight leading-tight">
            {nextModule.module.title}
          </h3>
          <p className="text-[13.5px] text-fg-2 mt-1.5 leading-relaxed">
            {nextModule.module.subtitle}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Button size="sm" className="pointer-events-none">
              {hasStarted ? "Reprendre ce module" : "Ouvrir le module"}
              <ArrowRight size={14} />
            </Button>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-fg-3 ml-1">
              <Clock size={11} /> {nextModule.module.duration}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function LastActivityCard({
  activity,
}: {
  activity: {
    phase: NonNullable<ReturnType<typeof findModule>>["phase"];
    module: NonNullable<ReturnType<typeof findModule>>["module"];
    score: { correct: number; total: number; updatedAt: number };
  };
}) {
  const accent = phaseAccent(activity.phase.color);
  const passed =
    activity.score.total > 0 &&
    activity.score.correct / activity.score.total >= 0.7;
  const when = formatRelativeTime(activity.score.updatedAt);

  return (
    <Link
      to={`/react/module/${activity.module.id}`}
      className="flex items-start gap-4 rounded-xl border-base bg-bg-2 p-5 hover:border-accent/30 transition group"
    >
      <div
        className={cn(
          "w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0",
          passed
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
            : cn(accent.bg, accent.text, "border", accent.border),
        )}
      >
        {passed ? <CheckCircle2 size={18} /> : <Target size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-0.5">
          <span className={accent.text}>{activity.phase.label}</span>
          <span>·</span>
          <span>{when}</span>
        </div>
        <div className="font-bold group-hover:text-accent-2 transition">
          {activity.module.title}
        </div>
        <div className="text-[13px] text-fg-2 mt-1">
          Quiz : <strong className={passed ? "text-emerald-400" : "text-amber-400"}>
            {activity.score.correct}/{activity.score.total}
          </strong>{" "}
          {passed ? "— validé" : "— à refaire pour valider"}
        </div>
      </div>
      <ArrowRight
        size={16}
        className="text-fg-3 mt-2 group-hover:text-fg group-hover:translate-x-0.5 transition flex-shrink-0"
      />
    </Link>
  );
}

function SyllabusSection({ program }: { program: CourseProgram }) {
  const lessonCount = program.phases.reduce(
    (sum, phase) =>
      sum +
      phase.modules.reduce(
        (moduleSum, module) => moduleSum + module.lessons.length,
        0,
      ),
    0,
  );

  return (
    <section className="mb-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
        <div>
          <SectionTitle icon="fa-list-check" text="Syllabus complet" noMargin />
          <p className="mt-2 text-[13px] text-fg-2 leading-relaxed max-w-2xl">
            Le programme complet détaillé: phases,
            modules, leçons, objectifs, quiz, exercices de synthèse et projets.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <SyllabusStat value={String(program.phases.length)} label="phases" />
          <SyllabusStat
            value={String(program.phases.reduce((sum, phase) => sum + phase.modules.length, 0))}
            label="modules"
          />
          <SyllabusStat value={String(lessonCount)} label="leçons" />
        </div>
      </div>

      <div className="space-y-3">
        {program.phases.map((phase, index) => (
          <SyllabusPhaseCard key={phase.id} phase={phase} fallbackIndex={index} />
        ))}
      </div>

      <div className="mt-5 rounded-xl border-base bg-bg-2 p-5">
        <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-fg-3 mb-3">
          Priorité de rédaction
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {program.authoringPriorities.map((priority) => (
            <div key={priority.target} className="rounded-lg bg-bg-3 p-3">
              <div className="text-sm font-bold">
                {priority.order}. {priority.target}
              </div>
              <p className="mt-1 text-[12px] text-fg-2 leading-relaxed">
                {priority.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SyllabusStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border-base bg-bg-2 px-3 py-2 min-w-[72px]">
      <div className="text-lg font-extrabold font-mono text-accent-2">{value}</div>
      <div className="text-[10px] font-mono uppercase tracking-wider text-fg-3">
        {label}
      </div>
    </div>
  );
}

function SyllabusPhaseCard({
  phase,
  fallbackIndex,
}: {
  phase: ProgramPhase;
  fallbackIndex: number;
}) {
  const livePhase = phases.find((item) => item.id === phase.phaseId);
  const accent = phaseAccent(livePhase?.color ?? "core");

  return (
    <details className="group rounded-2xl border-base bg-bg-2 overflow-hidden">
      <summary className="list-none cursor-pointer p-5 flex items-start gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border",
            accent.bg,
            accent.border,
            accent.text,
          )}
        >
          {livePhase ? (
            <i className={`fa-solid ${livePhase.icon}`} />
          ) : (
            <span className="font-mono text-sm">{fallbackIndex + 1}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className={cn("font-extrabold", accent.text)}>{phase.title}</h3>
            <span className="rounded-full bg-bg-3 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-fg-3">
              {phase.modules.length} modules
            </span>
            {phase.project && (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-accent-2">
                projet
              </span>
            )}
          </div>
          <p className="text-[13px] text-fg-2 leading-relaxed">
            {phase.objective}
          </p>
        </div>
        <i className="fa-solid fa-chevron-down text-fg-3 mt-1 transition group-open:rotate-180" />
      </summary>

      <div className="px-5 pb-5 space-y-3">
        {phase.modules.map((module) => (
          <SyllabusModuleCard key={module.id} module={module} />
        ))}

        {phase.project && (
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
            <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-accent-2 mb-1">
              Projet de phase
            </div>
            <h4 className="font-bold">{phase.project.title}</h4>
            <p className="mt-1 text-[13px] text-fg-2 leading-relaxed">
              {phase.project.deliverable}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {phase.project.assessment.map((criterion) => (
                <span
                  key={criterion}
                  className="rounded-full bg-bg-3 px-2 py-1 text-[11px] text-fg-2"
                >
                  {criterion}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </details>
  );
}

function SyllabusModuleCard({ module }: { module: ProgramModule }) {
  const liveModule = module.moduleId ? findModule(module.moduleId) : undefined;
  const content = (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-[11px] font-mono text-fg-3">{module.index}</span>
        <h4 className="font-bold group-hover:text-accent-2 transition">
          {module.title}
        </h4>
        <span className="rounded-full bg-bg-3 px-2 py-0.5 text-[10px] font-mono uppercase text-fg-3">
          {module.duration}
        </span>
        <span className="rounded-full bg-bg-3 px-2 py-0.5 text-[10px] font-mono uppercase text-fg-3">
          {module.difficulty}
        </span>
      </div>
      <p className="text-[12.5px] text-fg-2 leading-relaxed mb-3">
        {module.subtitle}
      </p>
      <div className="grid lg:grid-cols-[1fr_220px] gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-fg-3 mb-2">
            Leçons
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {module.lessons.map((lesson) => (
              <div key={lesson.id} className="rounded-lg bg-bg-3 p-3">
                <div className="text-[12px] font-bold">
                  {lesson.id} · {lesson.title}
                </div>
                <p className="mt-1 text-[11.5px] text-fg-2 leading-relaxed">
                  {lesson.objective}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-bg-3 p-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-fg-3 mb-2">
            Validation
          </div>
          <div className="text-[12px] text-fg-2">
            Quiz :{" "}
            <strong className="text-fg">
              {module.assessment.quiz.questionCount} questions
            </strong>
          </div>
          <div className="mt-1 text-[12px] text-fg-2">
            Exercices :{" "}
            <strong className="text-fg">
              {module.assessment.exercises.length}
            </strong>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {module.assessment.quiz.focus.slice(0, 5).map((focus) => (
              <span
                key={focus}
                className="rounded-full bg-bg-4 px-2 py-1 text-[10.5px] text-fg-2"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  if (!liveModule) {
    return <div className="rounded-xl bg-bg-1 p-4">{content}</div>;
  }

  return (
    <Link
      to={`/react/module/${module.moduleId}`}
      className="group block rounded-xl bg-bg-1 p-4 hover:bg-bg-3 transition"
    >
      {content}
    </Link>
  );
}

function ShortcutCard({
  to,
  icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-xl border-base bg-bg-2 p-5 hover:border-accent/30 transition flex items-start gap-3"
    >
      <div className="w-9 h-9 rounded-lg bg-bg-3 text-accent-2 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold">{title}</div>
        <div className="text-[12px] text-fg-2 mt-0.5">{desc}</div>
      </div>
      <ArrowRight
        size={14}
        className="text-fg-3 mt-2 group-hover:text-fg group-hover:translate-x-0.5 transition"
      />
    </Link>
  );
}

function formatRelativeTime(ts: number) {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `il y a ${days} j`;
  return new Date(ts).toLocaleDateString("fr-FR");
}
