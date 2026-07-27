import { describe, expect, it } from "vitest";
import { svcCourse, buildSvcCourse } from "./index";
import { svcProgram } from "./program";

describe("svcProgram", () => {
  it("covers P0-P12 + capstone (14 phases)", () => {
    expect(svcProgram.phases).toHaveLength(14);
    expect(svcProgram.phases[0].slug).toBe("bases");
    expect(svcProgram.phases.at(-1)?.slug).toBe("capstone");
  });

  it("respects id conventions from the syllabus", () => {
    for (const phase of svcProgram.phases) {
      expect(phase.phaseId).toBe(`svc-${phase.slug}`);
      for (const mod of phase.modules) {
        expect(mod.id).toMatch(new RegExp(`^svc-${phase.slug}-m\\d{2}$`));
        for (const lessonItem of mod.lessons) {
          expect(lessonItem.id).toMatch(new RegExp(`^${mod.id}-l\\d$`));
        }
      }
    }
  });

  it("has globally unique module and lesson ids", () => {
    const ids = svcProgram.phases.flatMap((phase) =>
      phase.modules.flatMap((mod) => [mod.id, ...mod.lessons.map((l) => l.id)]),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every module a 5-question quiz and at least one exercise", () => {
    for (const phase of svcProgram.phases) {
      for (const mod of phase.modules) {
        expect(mod.assessment.quiz.questionCount).toBe(5);
        expect(mod.assessment.exercises.length).toBeGreaterThan(0);
        expect(mod.lessons.length).toBeGreaterThan(0);
      }
    }
  });

  it("gives every phase a project and the capstone its three briefs", () => {
    for (const phase of svcProgram.phases) {
      expect(phase.project, `phase ${phase.slug} has a project`).toBeDefined();
    }
    const capstone = svcProgram.phases.at(-1);
    expect(capstone?.project?.options).toHaveLength(3);
  });
});

const AUTHORED_PHASE_IDS = ["svc-bases", "svc-fondations"];

describe("svcCourse phases", () => {
  it("mirrors the program structure", () => {
    expect(svcCourse.phases).toHaveLength(svcProgram.phases.length);
    svcCourse.phases.forEach((phase, i) => {
      expect(phase.scaffoldOnly ?? false).toBe(!AUTHORED_PHASE_IDS.includes(phase.id));
      expect(phase.id).toBe(svcProgram.phases[i].phaseId);
      expect(phase.modules).toHaveLength(svcProgram.phases[i].modules.length);
    });
  });

  it("authored bases phase follows the syllabus conventions", () => {
    const bases = svcCourse.phases.find((phase) => phase.id === "svc-bases");
    expect(bases).toBeDefined();
    for (const mod of bases!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.id).toBe(`svc-bases-quiz-${mod.id.slice(-3)}`);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.id).toMatch(new RegExp(`^svc-bases-ex-${mod.id.slice(-3)}-\\d$`));
      }
    }
  });

  it("authored fondations phase uses audit exercises and 5-question quizzes", () => {
    const fondations = svcCourse.phases.find((phase) => phase.id === "svc-fondations");
    expect(fondations).toBeDefined();
    expect(fondations!.scaffoldOnly).toBeFalsy();
    for (const mod of fondations!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      expect(mod.exercises?.length).toBeGreaterThan(0);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
        expect(exercise.id.startsWith("svc-fondations-ex-")).toBe(true);
      }
    }
  });

  it("EN authored phases share the same ids as FR", () => {
    const fr = buildSvcCourse("fr");
    const en = buildSvcCourse("en");
    for (const id of ["svc-bases", "svc-fondations"]) {
      const frPhase = fr.phases.find((p) => p.id === id)!;
      const enPhase = en.phases.find((p) => p.id === id)!;
      expect(enPhase.title).not.toBe(frPhase.title);
      expect(enPhase.modules.map((m) => m.id)).toEqual(
        frPhase.modules.map((m) => m.id),
      );
    }
  });
});
