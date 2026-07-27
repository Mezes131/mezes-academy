import type {
  CourseProgram,
  Lesson,
  Module,
  Phase,
  ProgramModule,
} from "@/types";

/** Per-phase presentation (not part of the blueprint data). */
export interface PhasePresentation {
  color: Phase["color"];
  icon: string;
  label: string;
}

function toScaffoldLesson(programLesson: ProgramModule["lessons"][number]): Lesson {
  return {
    id: programLesson.id,
    title: programLesson.title,
    desc: programLesson.objective,
    duration: programLesson.duration,
    tags: programLesson.tags,
    objectives: [programLesson.objective],
    outline: programLesson.courseOutline,
    quiz: programLesson.quiz,
    exercises: programLesson.exercises,
  };
}

function toScaffoldModule(programModule: ProgramModule): Module {
  return {
    id: programModule.id,
    index: programModule.index,
    title: programModule.title,
    subtitle: programModule.subtitle,
    duration: programModule.duration,
    difficulty: programModule.difficulty,
    status: "draft",
    objectives: programModule.objectives,
    content: [{ kind: "lessons", items: programModule.lessons.map(toScaffoldLesson) }],
    assessment: programModule.assessment,
  };
}

/**
 * Derive display/export-ready `Phase[]` from a blueprint `CourseProgram`,
 * so a course whose detailed content is not written yet still shows up in
 * the catalog (module counts) and can be exported to the Strapi seed.
 */
export function programToScaffoldPhases(
  program: CourseProgram,
  presentationBySlug: Record<string, PhasePresentation>,
): Phase[] {
  return program.phases.map((programPhase) => {
    const presentation = presentationBySlug[programPhase.slug];
    if (!presentation) {
      throw new Error(`Missing phase presentation for slug "${programPhase.slug}"`);
    }
    return {
      id: programPhase.phaseId ?? `${program.courseId}-${programPhase.slug}`,
      slug: programPhase.slug,
      courseId: program.courseId,
      color: presentation.color,
      icon: presentation.icon,
      label: presentation.label,
      title: programPhase.title,
      summary: programPhase.objective,
      metaTags: [`${programPhase.modules.length} modules`],
      modules: programPhase.modules.map(toScaffoldModule),
      project: programPhase.project,
      scaffoldOnly: true,
    };
  });
}
