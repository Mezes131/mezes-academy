import type { Module, Phase, ContentBlock } from "@/types";
import { useProgress } from "@/hooks/useProgress";
import { useT } from "@/i18n/useT";
import { useCourseArea } from "@/components/layout/courseArea";
import { InfoBox } from "@/components/ui/InfoBox";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Quiz } from "./Quiz";
import { CodeExercise } from "./CodeExercise";
import { AuditExercise } from "./AuditExercise";
import { isAuditExercise } from "@/types";
import { cn, phaseAccent } from "@/lib/utils";
import { Bookmark, BookmarkCheck, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleViewProps {
  phase: Phase;
  module: Module;
}

export function ModuleView({ phase, module }: ModuleViewProps) {
  const t = useT();
  const { progress, markModuleRead, canMarkModuleRead, toggleBookmark } = useProgress();
  const { basePath } = useCourseArea();
  const accent = phaseAccent(phase.color);
  const isRead = progress.readModules.includes(module.id);
  const isBookmarked = progress.bookmarks.includes(module.id);

  const quizScore = module.quiz
    ? progress.quizScores[module.quiz.id]
    : undefined;
  const quizPassed =
    quizScore && quizScore.total > 0
      ? quizScore.correct / quizScore.total >= 0.7
      : false;
  const canMarkRead = canMarkModuleRead(module.id);
  const solvedExercises = (module.exercises ?? []).filter((ex) => {
    const status = progress.exerciseProgress[ex.id]?.status;
    return status === "solved" || status === "revealed";
  }).length;
  const totalExercises = module.exercises?.length ?? 0;
  const exercisesValidated =
    totalExercises === 0 ? true : solvedExercises === totalExercises;

  return (
    <article>
      {/* ─── Module header ─────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-2">
          <Link
            to={`${basePath}/phase/${phase.id}`}
            className={cn("hover:underline", accent.text)}
          >
            <i className={`fa-solid ${phase.icon} mr-1.5`} /> {phase.label}
          </Link>
          <span>/</span>
          <span>{module.index}</span>
          <span className="flex items-center gap-1 ml-auto">
            <Clock size={12} /> {module.duration}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <h1 className="flex-1 text-3xl font-extrabold tracking-tight leading-tight">
            {module.title}
          </h1>
          <button
            onClick={() => toggleBookmark(module.id)}
            aria-label={
              isBookmarked ? t("learn.removeBookmark") : t("learn.addBookmark")
            }
            className="p-2 rounded-lg hover:bg-bg-3 text-fg-2 hover:text-fg transition"
          >
            {isBookmarked ? (
              <BookmarkCheck size={18} className={accent.text} />
            ) : (
              <Bookmark size={18} />
            )}
          </button>
        </div>
        <p className="text-fg-2 mt-2 text-[17px] leading-relaxed max-w-[72ch]">{module.subtitle}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {isRead && (
            <Badge variant="success">
              <CheckCircle2 size={12} className="mr-1" /> {t("learn.read")}
            </Badge>
          )}
          {quizScore && (
            <Badge variant={quizPassed ? "success" : "warn"}>
              {t("learn.quizScore", {
                score: `${quizScore.correct}/${quizScore.total}`,
              })}
            </Badge>
          )}
          {module.exercises && module.exercises.length > 0 && (
            <Badge variant={exercisesValidated ? "success" : "default"}>
              {t("learn.exercisesDone", {
                done: solvedExercises,
                total: module.exercises.length,
              })}
            </Badge>
          )}
        </div>
      </div>

      {/* ─── Contenu ───────────────────────────────── */}
      <div className="space-y-8">
        {module.content.map((block, i) => (
          <ContentRenderer key={i} block={block} t={t} />
        ))}
      </div>

      {/* ─── Quiz ──────────────────────────────────── */}
      {module.quiz && (
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
            <i className="fa-solid fa-bullseye text-accent-2" />
            {t("learn.endQuiz")}
          </h2>
          <p className="text-sm text-fg-2 mb-2">{t("learn.quizRule")}</p>
          <Quiz quiz={module.quiz} />
        </div>
      )}

      {/* ─── Exercices ─────────────────────────────── */}
      {module.exercises && module.exercises.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <i className="fa-solid fa-laptop-code text-accent-2" />
            {t("learn.practiceExercises")}
          </h2>
          {module.exercises.map((ex) =>
            isAuditExercise(ex) ? (
              <AuditExercise key={ex.id} exercise={ex} />
            ) : (
              <CodeExercise key={ex.id} exercise={ex} />
            ),
          )}
        </div>
      )}

      {/* ─── Footer : marquer comme lu ─────────────── */}
      <div className="mt-10 pt-6 flex items-center gap-3">
        {isRead ? (
          <div className="text-sm text-emerald-400 font-medium flex items-center gap-2">
            <CheckCircle2 size={16} /> {t("learn.markedRead")}
          </div>
        ) : (
          <Button onClick={() => markModuleRead(module.id)} disabled={!canMarkRead}>
            {t("learn.markRead")}
          </Button>
        )}
        {!isRead && module.quiz && !canMarkRead && (
          <p className="text-sm text-amber-400">
            {!quizPassed && !exercisesValidated
              ? t("course.gateBoth")
              : !quizPassed
                ? t("learn.gateQuiz")
                : t("learn.gateExercise")}
          </p>
        )}
        {!isRead && !module.quiz && !canMarkRead && (
          <p className="text-sm text-amber-400">{t("learn.gateExercise")}</p>
        )}
      </div>
    </article>
  );
}

function ContentRenderer({
  block,
  t,
}: {
  block: ContentBlock;
  t: ReturnType<typeof useT>;
}) {
  switch (block.kind) {
    case "title":
      return (
        <h2 className="text-xl font-bold mt-10 mb-3 tracking-tight">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          className="prose-lesson text-[15px] md:text-[17px] leading-[1.75] text-fg-2 [&_strong]:text-fg [&_em]:text-fg-2 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:bg-bg-3 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "info":
      return (
        <InfoBox
          variant={block.box.variant}
          title={block.box.title}
          body={block.box.body}
        />
      );
    case "highlight":
      return (
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-bg-3 border-base text-[13px] text-fg-2 my-1.5 [&_code]:font-mono [&_code]:text-[12px] [&_code]:bg-bg-4 [&_code]:px-1.5 [&_code]:rounded [&_strong]:text-fg"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "lessons":
      return (
        <div className="my-5 divide-y divide-white/5 border-base rounded-lg bg-bg-2">
          {block.items.map((lesson) => (
            <div key={lesson.id} className="flex gap-3 p-4">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{lesson.title}</div>
                <div
                  className="text-[13px] text-fg-2 leading-relaxed mt-1 [&_code]:font-mono [&_code]:text-[12px] [&_code]:bg-bg-3 [&_code]:px-1 [&_code]:rounded"
                  dangerouslySetInnerHTML={{ __html: lesson.desc }}
                />
                {lesson.tags && lesson.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {lesson.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2 py-0.5 rounded bg-bg-4 text-fg-3 border-base"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    case "code":
      return <CodeBlock label={block.sample.label} html={block.sample.html} />;
    case "video": {
      const { video } = block;
      if (!video.providerId?.trim()) return null;
      // Stub player: YouTube embed when provider is youtube; otherwise a titled link.
      if (video.provider === "youtube") {
        return (
          <div className="my-6 aspect-video w-full max-w-3xl overflow-hidden rounded-xl border-base bg-bg-2">
            <iframe
              title={video.title ?? t("learn.courseVideo")}
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.providerId)}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      return (
        <a
          href={video.providerId}
          target="_blank"
          rel="noreferrer"
          className="my-6 flex items-center gap-3 rounded-xl border-base bg-bg-2 p-4 text-sm font-semibold hover:bg-bg-3 transition"
        >
          <i className="fa-solid fa-play text-accent-2" />
          {video.title ?? t("learn.openVideo")}
          {video.durationSeconds != null && (
            <span className="ml-auto font-mono text-[11px] text-fg-3">
              {Math.round(video.durationSeconds / 60)} min
            </span>
          )}
        </a>
      );
    }
    default:
      return null;
  }
}
