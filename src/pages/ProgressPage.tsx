import { useRef } from "react";
import { useProgress } from "@/hooks/useProgress";
import { phases } from "@/data/phases";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { cn, phaseAccent } from "@/lib/utils";
import { Download, Upload, RefreshCw, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function ProgressPage() {
  const { progress, stats, phaseStats, reset, exportJson, importJson } =
    useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    const json = exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `react-learn-progression-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        importJson(String(ev.target?.result ?? ""));
        alert("Progression importée avec succès !");
      } catch (err) {
        alert("Fichier invalide : " + (err as Error).message);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleReset() {
    if (
      window.confirm(
        "Réinitialiser toute la progression ? Cette action est irréversible (mais ton fichier exporté reste valable).",
      )
    ) {
      reset();
    }
  }

  const totalQuizzesTaken = Object.keys(progress.quizScores).length;

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10 animate-fade-in">
      <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-accent-2 mb-3">
        <TrendingUp size={14} /> Ma progression
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">
        Où en es-tu ?
      </h1>

      {/* ─── Stats globales ──────────────────────── */}
      <div className="grid sm:grid-cols-4 gap-3 mt-8">
        <StatCard
          label="Progression"
          value={`${stats.percent}%`}
          accent="text-accent-2"
        />
        <StatCard
          label="Modules lus"
          value={String(progress.readModules.length)}
        />
        <StatCard
          label="Quiz validés"
          value={`${stats.quizPassed}/${totalQuizzesTaken || 0}`}
        />
        <StatCard
          label="Exercices faits"
          value={String(progress.completedExercises.length)}
        />
      </div>

      <div className="mt-6 rounded-xl border-base bg-bg-2 p-5">
        <div className="text-sm font-semibold mb-3">Progression globale</div>
        <ProgressBar value={stats.done} max={stats.total} size="md" />
        <div className="mt-1.5 flex justify-between text-[12px] font-mono text-fg-3">
          <span>
            {stats.done} / {stats.total} étapes
          </span>
          <span className="text-accent-2">{stats.percent}%</span>
        </div>
      </div>

      {/* ─── By phase ───────────────────────────── */}
      <h2 className="text-lg font-bold mt-10 mb-4">Par phase</h2>
      <div className="space-y-3">
        {phases.map((phase, i) => {
          const accent = phaseAccent(phase.color);
          const st = phaseStats[i];
          return (
            <Link
              key={phase.id}
              to={`/react/phase/${phase.id}`}
              className="block rounded-xl border-base bg-bg-2 p-5 hover:border-accent/30 transition"
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-11 h-11 rounded-lg border flex items-center justify-center text-lg flex-shrink-0",
                    accent.bg,
                    accent.border,
                    accent.text,
                  )}
                >
                  <i className={`fa-solid ${phase.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className={cn("font-bold", accent.text)}>
                      {phase.title}
                    </div>
                    <span className={cn("text-xs font-mono", accent.text)}>
                      {st.percent}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar
                      value={st.done}
                      max={st.total}
                      color={phase.color}
                      size="sm"
                    />
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-fg-3">
                    {st.done} / {st.total}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ─── Sauvegarde / restauration ───────────── */}
      <h2 className="text-lg font-bold mt-10 mb-3">Sauvegarde</h2>
      <div className="rounded-xl border-base bg-bg-2 p-5">
        <p className="text-[13px] text-fg-2 mb-4 leading-relaxed">
          Ta progression est sauvegardée dans le navigateur. Exporte-la en JSON
          pour en faire une copie de sécurité ou la restaurer sur un autre
          appareil.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            leftIcon={<Download size={14} />}
            onClick={handleExport}
          >
            Exporter (JSON)
          </Button>
          <Button
            variant="ghost"
            leftIcon={<Upload size={14} />}
            onClick={() => fileInputRef.current?.click()}
          >
            Importer
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleImport}
            hidden
          />
          <div className="flex-1" />
          <Button
            variant="danger"
            leftIcon={<RefreshCw size={14} />}
            onClick={handleReset}
          >
            Tout réinitialiser
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = "text-fg",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border-base bg-bg-2 p-4">
      <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-1">
        {label}
      </div>
      <div className={cn("text-2xl font-extrabold font-mono", accent)}>
        {value}
      </div>
    </div>
  );
}
