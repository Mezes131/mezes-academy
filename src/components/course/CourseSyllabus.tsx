import { Link } from "react-router-dom";
import type { CourseProgram, Phase, ProgramModule, ProgramPhase } from "@/types";
import { cn, phaseAccent } from "@/lib/utils";
import { useT } from "@/i18n/useT";

interface CourseSyllabusProps {
  program: CourseProgram;
  /** Live phases of the course, used to resolve icons and accent colors. */
  livePhases: Phase[];
  /** When provided, module cards link to the returned href. */
  moduleHref?: (moduleId: string) => string | undefined;
  description?: string;
}

/**
 * Full syllabus of a course, rendered from its back-office ready
 * `CourseProgram`: phases, modules, lessons, quiz/exercise blueprints,
 * projects and authoring priorities.
 */
export function CourseSyllabus({
  program,
  livePhases,
  moduleHref,
  description,
}: CourseSyllabusProps) {
  const t = useT();
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
          <h2 className="text-[11px] font-mono uppercase tracking-[0.15em] text-fg-3 flex items-center gap-2">
            <i className="fa-solid fa-list-check" />
            {t("course.syllabusTitle")}
          </h2>
          {description && (
            <p className="mt-2 text-[13px] text-fg-2 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <SyllabusStat value={String(program.phases.length)} label={t("common.phases")} />
          <SyllabusStat
            value={String(program.phases.reduce((sum, phase) => sum + phase.modules.length, 0))}
            label={t("common.modules")}
          />
          <SyllabusStat value={String(lessonCount)} label={t("common.lessons")} />
        </div>
      </div>

      <div className="space-y-3">
        {program.phases.map((phase, index) => (
          <SyllabusPhaseCard
            key={phase.id}
            phase={phase}
            fallbackIndex={index}
            livePhases={livePhases}
            moduleHref={moduleHref}
            t={t}
          />
        ))}
      </div>

      <div className="mt-5 rounded-xl border-base bg-bg-2 p-5">
        <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-fg-3 mb-3">
          {t("course.syllabusPriority")}
        </div>
        <div className="grid md:grid-cols-2 md:items-start gap-3">
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

/* ─── Private subcomponents ─────────────────────────────────── */

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
  livePhases,
  moduleHref,
  t,
}: {
  phase: ProgramPhase;
  fallbackIndex: number;
  livePhases: Phase[];
  moduleHref?: (moduleId: string) => string | undefined;
  t: ReturnType<typeof useT>;
}) {
  const livePhase = livePhases.find((item) => item.id === phase.phaseId);
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
              {phase.modules.length} {t("common.modules")}
            </span>
            {phase.project && (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-accent-2">
                {t("common.project")}
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
          <SyllabusModuleCard key={module.id} module={module} moduleHref={moduleHref} t={t} />
        ))}

        {phase.project && (
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
            <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-accent-2 mb-1">
              {t("course.syllabusPhaseProject")}
            </div>
            <h4 className="font-bold">{phase.project.title}</h4>
            <p className="mt-1 text-[13px] text-fg-2 leading-relaxed">
              {phase.project.deliverable}
            </p>
            {phase.project.options && (
              <ul className="mt-2 space-y-1 text-[12.5px] text-fg-2">
                {phase.project.options.map((option) => (
                  <li key={option} className="flex gap-2">
                    <i className="fa-solid fa-angle-right mt-1 text-accent-2 text-[10px]" />
                    {option}
                  </li>
                ))}
              </ul>
            )}
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

function SyllabusModuleCard({
  module,
  moduleHref,
  t,
}: {
  module: ProgramModule;
  moduleHref?: (moduleId: string) => string | undefined;
  t: ReturnType<typeof useT>;
}) {
  const href = module.moduleId ? moduleHref?.(module.moduleId) : undefined;
  const moduleNumber = syllabusModuleNumber(module);
  const content = (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-[11px] font-mono text-fg-3">Module {moduleNumber}</span>
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
            {t("common.lessons")}
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {module.lessons.map((lesson, lessonIndex) => (
              <div key={lesson.id} className="rounded-lg bg-bg-3 p-3">
                <div className="text-[12px] font-bold">
                  {t("course.syllabusLesson", { n: lessonIndex + 1 })} ·{" "}
                  {lesson.title}
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
            {t("course.syllabusValidation")}
          </div>
          <div className="text-[12px] text-fg-2">
            {t("course.syllabusQuizCount", {
              n: module.assessment.quiz.questionCount,
            })}
          </div>
          <div className="mt-1 text-[12px] text-fg-2">
            {t("course.syllabusExerciseCount", {
              n: module.assessment.exercises.length,
            })}
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

  if (!href) {
    return <div className="rounded-xl bg-bg-1 p-4">{content}</div>;
  }

  return (
    <Link to={href} className="group block rounded-xl bg-bg-1 p-4 hover:bg-bg-3 transition">
      {content}
    </Link>
  );
}

function syllabusModuleNumber(programModule: ProgramModule) {
  const source = programModule.moduleId ?? programModule.id;
  const match = /-m(\d+)$/.exec(source);
  return match ? match[1] : programModule.index;
}
