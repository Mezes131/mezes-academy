import type { Module, Phase, ContentBlock } from "@/types";
import { useProgress } from "@/hooks/useProgress";
import { InfoBox } from "@/components/ui/InfoBox";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Quiz } from "./Quiz";
import { CodeExercise } from "./CodeExercise";
import { cn, phaseAccent } from "@/lib/utils";
import { Bookmark, BookmarkCheck, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleViewProps {
  phase: Phase;
  module: Module;
}

export function ModuleView({ phase, module }: ModuleViewProps) {
  const { progress, markModuleRead, toggleBookmark } = useProgress();
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

  const completedExercises = (module.exercises ?? []).filter((ex) =>
    progress.completedExercises.includes(ex.id),
  ).length;

  return (
    <article className="animate-fade-in">
      {/* ─── Module header ─────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-2">
          <Link
            to={`/react/phase/${phase.id}`}
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
              isBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"
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
        <p className="text-fg-2 mt-2 font-serif text-[17px]">{module.subtitle}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {isRead && (
            <Badge variant="success">
              <CheckCircle2 size={12} className="mr-1" /> Lu
            </Badge>
          )}
          {quizScore && (
            <Badge variant={quizPassed ? "success" : "warn"}>
              Quiz : {quizScore.correct}/{quizScore.total}
            </Badge>
          )}
          {module.exercises && module.exercises.length > 0 && (
            <Badge variant={completedExercises === module.exercises.length ? "success" : "default"}>
              Exercices : {completedExercises}/{module.exercises.length}
            </Badge>
          )}
        </div>
      </div>

      {/* ─── Contenu ───────────────────────────────── */}
      <div className="space-y-2">
        {module.content.map((block, i) => (
          <ContentRenderer key={i} block={block} />
        ))}
      </div>

      {/* ─── Quiz ──────────────────────────────────── */}
      {module.quiz && (
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
            <i className="fa-solid fa-bullseye text-accent-2" />
            Quiz de fin de module
          </h2>
          <p className="text-sm text-fg-2 mb-2">
            Validation : 70% de bonnes réponses minimum pour marquer ce quiz comme réussi.
          </p>
          <Quiz quiz={module.quiz} />
        </div>
      )}

      {/* ─── Exercices ─────────────────────────────── */}
      {module.exercises && module.exercises.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <i className="fa-solid fa-laptop-code text-accent-2" />
            Exercice{module.exercises.length > 1 ? "s" : ""} pratique{module.exercises.length > 1 ? "s" : ""}
          </h2>
          {module.exercises.map((ex) => (
            <CodeExercise key={ex.id} exercise={ex} />
          ))}
        </div>
      )}

      {/* ─── Footer : marquer comme lu ─────────────── */}
      <div className="mt-10 pt-6 border-t border-base flex items-center gap-3">
        {isRead ? (
          <div className="text-sm text-emerald-400 font-medium flex items-center gap-2">
            <CheckCircle2 size={16} /> Module marqué comme lu
          </div>
        ) : (
          <Button onClick={() => markModuleRead(module.id)}>
            J'ai lu ce module
          </Button>
        )}
      </div>
    </article>
  );
}

function ContentRenderer({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "title":
      return (
        <h2 className="relative text-xl font-bold mt-10 mb-3 pl-4 before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-accent">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          className="text-[15px] leading-[1.75] text-fg-2 font-serif [&_strong]:text-fg [&_em]:text-fg-2 [&_code]:font-mono [&_code]:text-[13px] [&_code]:bg-bg-3 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-sans"
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
  }
}
