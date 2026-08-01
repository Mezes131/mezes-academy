export {
  module,
  phase,
  type SvcLessonSpec,
  type SvcModuleSpec,
  type SvcPhaseSpec,
} from "../program/helpers";
import { lesson as lessonFr, type SvcLessonSpec } from "../program/helpers";

/** EN wrapper: same shape, English boilerplate for outline fillers. */
export function lesson(spec: SvcLessonSpec) {
  const base = lessonFr(spec);
  return {
    ...base,
    courseOutline: {
      ...base.courseOutline,
      guidedExample: `Guided example around: ${spec.title}.`,
      recap: "Summary of decisions, common mistakes, and success criteria.",
    },
  };
}
