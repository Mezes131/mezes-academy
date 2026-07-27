import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { svcCourse } from "@/data/courses/svc";
import { CourseSyllabus } from "@/components/course/CourseSyllabus";
import { Button } from "@/components/ui/Button";

/**
 * Secure Vibe Coding course page: presents the full program (syllabus,
 * projects, capstone and certification rubric). Modules link into the
 * learning area; lesson routes are auth-gated.
 */
export function SvcCoursePage() {
  const { meta, program, phases } = svcCourse;
  const moduleCount = phases.reduce((sum, phase) => sum + phase.modules.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 animate-fade-in">
      <section className="relative mb-10">
        <div
          className="absolute -top-12 -left-20 right-0 h-72 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(600px circle at 30% 40%, rgb(139 92 246 / 0.18), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-violet-400 mb-3">
            <i className={`fa-solid ${meta.icon}`} />
            Parcours Secure Vibe Coding
            <span className="text-fg-2"> Mezes Academy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.98]">
            Du prompt au{" "}
            <em className="not-italic bg-gradient-to-r from-violet-400 to-brand-eco bg-clip-text text-transparent">
              produit en prod
            </em>
            ,
            <br />
            sans la dette ni les failles.
          </h1>
          <p className="mt-5 text-[16px] text-fg-2 font-serif leading-relaxed max-w-2xl">
            {meta.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[12px] font-mono text-fg-2">
            <MetaChip icon="fa-signal" text={meta.level} />
            <MetaChip icon="fa-clock" text={meta.duration} />
            <MetaChip icon="fa-layer-group" text={`${phases.length} phases · ${moduleCount} modules`} />
            <MetaChip icon="fa-award" text="Capstone + certificat" />
          </div>
          {/* The lesson routes are auth-gated: RequireAuth redirects to
              /auth?next=… when the visitor is not signed in. */}
          <div className="mt-7">
            <Link to="/secure-vibe-coding/phase/svc-bases">
              <Button size="md">
                Commencer le cours
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="mb-10 rounded-xl border border-violet-500/30 bg-violet-500/5 p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center flex-shrink-0">
          <i className="fa-solid fa-pen-ruler" />
        </div>
        <div>
          <div className="font-bold">Programme complet, leçons en cours de rédaction</div>
          <p className="text-[13px] text-fg-2 mt-1 leading-relaxed">
            Le syllabus ci-dessous est définitif : phases, modules, projets,
            capstone et rubrique de certification. Le contenu détaillé des
            leçons est publié progressivement, dans l'ordre des priorités de
            rédaction.
          </p>
        </div>
      </div>

      {program && (
        <CourseSyllabus
          program={program}
          livePhases={phases}
          moduleHref={(moduleId) => `/secure-vibe-coding/module/${moduleId}`}
          description="Cycle Prompt → Audit → Ship appliqué de bout en bout : dès la phase 4, les projets alimentent le même produit qui devient le capstone certifiant."
        />
      )}
    </div>
  );
}

function MetaChip({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border-base bg-bg-2 px-3 py-1">
      <i className={`fa-solid ${icon} text-violet-400`} />
      {text}
    </span>
  );
}
