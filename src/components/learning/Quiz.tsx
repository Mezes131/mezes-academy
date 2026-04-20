import { useState, useMemo } from "react";
import type { Quiz as QuizType } from "@/types";
import { useProgress } from "@/hooks/useProgress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

interface QuizProps {
  quiz: QuizType;
}

export function Quiz({ quiz }: QuizProps) {
  const { progress, saveQuizScore } = useProgress();
  const saved = progress.quizScores[quiz.id];

  const [answers, setAnswers] = useState<Record<string, string[]>>(
    saved?.answers ?? {},
  );
  const [submitted, setSubmitted] = useState<boolean>(Boolean(saved));

  const score = useMemo(() => {
    if (!submitted) return { correct: 0, total: quiz.questions.length };
    let correct = 0;
    for (const q of quiz.questions) {
      const userAnswer = (answers[q.id] ?? []).slice().sort();
      const goodAnswer = q.correct.slice().sort();
      if (
        userAnswer.length === goodAnswer.length &&
        userAnswer.every((a, i) => a === goodAnswer[i])
      ) {
        correct++;
      }
    }
    return { correct, total: quiz.questions.length };
  }, [answers, submitted, quiz.questions]);

  function toggleAnswer(qId: string, optionId: string, multi: boolean) {
    if (submitted) return;
    setAnswers((prev) => {
      const current = prev[qId] ?? [];
      if (multi) {
        return {
          ...prev,
          [qId]: current.includes(optionId)
            ? current.filter((o) => o !== optionId)
            : [...current, optionId],
        };
      }
      return { ...prev, [qId]: [optionId] };
    });
  }

  function submit() {
    let correct = 0;
    for (const q of quiz.questions) {
      const u = (answers[q.id] ?? []).slice().sort();
      const g = q.correct.slice().sort();
      if (u.length === g.length && u.every((a, i) => a === g[i])) correct++;
    }
    setSubmitted(true);
    saveQuizScore(quiz.id, correct, quiz.questions.length, answers);
  }

  function retake() {
    setAnswers({});
    setSubmitted(false);
  }

  const allAnswered = quiz.questions.every(
    (q) => (answers[q.id] ?? []).length > 0,
  );

  const passed = submitted && score.correct / score.total >= 0.7;

  return (
    <div className="rounded-xl border-base bg-bg-2 p-6 my-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold tracking-wide uppercase text-fg-3">
          {quiz.title}
        </h3>
        {submitted && (
          <div
            className={cn(
              "text-sm font-bold font-mono",
              passed ? "text-emerald-400" : "text-amber-400",
            )}
          >
            {score.correct} / {score.total}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {quiz.questions.map((q, idx) => {
          const isMulti = q.correct.length > 1;
          const userAnswer = answers[q.id] ?? [];
          const goodAnswer = q.correct;
          const isQuestionCorrect =
            submitted &&
            userAnswer.length === goodAnswer.length &&
            userAnswer.every((a) => goodAnswer.includes(a));

          return (
            <div key={q.id} className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="text-fg-3 font-mono text-xs mt-1 flex-shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-relaxed">{q.question}</p>
                  {isMulti && !submitted && (
                    <p className="text-xs text-fg-3 mt-1">
                      (plusieurs réponses possibles)
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 pl-6">
                {q.options.map((opt) => {
                  const selected = userAnswer.includes(opt.id);
                  const isCorrectOpt = goodAnswer.includes(opt.id);
                  const showState = submitted;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleAnswer(q.id, opt.id, isMulti)}
                      disabled={submitted}
                      className={cn(
                        "w-full text-left rounded-lg px-3.5 py-2.5 text-[13px] border transition",
                        "flex items-center gap-2.5",
                        !selected &&
                          !showState &&
                          "border-base hover:border-accent/40 hover:bg-bg-3",
                        selected &&
                          !showState &&
                          "border-accent/60 bg-accent/10 text-fg",
                        showState &&
                          isCorrectOpt &&
                          "border-emerald-500/60 bg-emerald-500/10",
                        showState &&
                          selected &&
                          !isCorrectOpt &&
                          "border-red-500/60 bg-red-500/10",
                        showState &&
                          !selected &&
                          !isCorrectOpt &&
                          "border-base opacity-60",
                      )}
                    >
                      <span
                        className={cn(
                          "w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-full border",
                          isMulti ? "rounded" : "rounded-full",
                          selected ? "border-accent" : "border-fg-3/40",
                          showState && isCorrectOpt && "border-emerald-500",
                          showState && selected && !isCorrectOpt && "border-red-500",
                        )}
                      >
                        {selected && (
                          <span
                            className={cn(
                              "w-2 h-2",
                              isMulti ? "rounded-sm" : "rounded-full",
                              showState && !isCorrectOpt
                                ? "bg-red-500"
                                : showState
                                  ? "bg-emerald-500"
                                  : "bg-accent",
                            )}
                          />
                        )}
                      </span>
                      <span className="flex-1">{opt.label}</span>
                      {showState && isCorrectOpt && (
                        <CheckCircle2 size={16} className="text-emerald-400" />
                      )}
                      {showState && selected && !isCorrectOpt && (
                        <XCircle size={16} className="text-red-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && q.explanation && (
                <div
                  className={cn(
                    "ml-6 text-[12.5px] rounded-md px-3 py-2 border-l-2",
                    isQuestionCorrect
                      ? "bg-emerald-500/5 border-emerald-500/60 text-fg-2"
                      : "bg-amber-500/5 border-amber-500/60 text-fg-2",
                  )}
                >
                  <i className="fa-solid fa-lightbulb mr-1.5" />
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-base">
        {!submitted ? (
          <Button onClick={submit} disabled={!allAnswered}>
            Valider mes réponses
          </Button>
        ) : (
          <>
            <div
              className={cn(
                "flex-1 text-sm font-medium",
                passed ? "text-emerald-400" : "text-amber-400",
              )}
            >
              {passed ? (
                <span className="inline-flex items-center gap-2">
                  <i className="fa-solid fa-award" />
                  Bravo ! Tu as {score.correct}/{score.total}, ce quiz est validé.
                </span>
              ) : (
                `Il te faut au moins 70% pour valider. Tu as ${score.correct}/${score.total}. Retente quand tu veux.`
              )}
            </div>
            <Button
              variant="ghost"
              leftIcon={<RefreshCw size={14} />}
              onClick={retake}
            >
              Refaire le quiz
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
