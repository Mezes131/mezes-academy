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

const AUTHORED_PHASE_IDS = [
  "svc-bases",
  "svc-fondations",
  "svc-prompt",
  "svc-architecture",
  "svc-auth",
  "svc-data",
  "svc-paiements",
  "svc-notifications",
  "svc-audit-securite",
  "svc-audit-qualite",
  "svc-hebergement",
  "svc-ops",
  "svc-ship",
  "svc-capstone",
];

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

  it("authored prompt phase uses audit exercises and 5-question quizzes", () => {
    const prompt = svcCourse.phases.find((phase) => phase.id === "svc-prompt");
    expect(prompt).toBeDefined();
    expect(prompt!.scaffoldOnly).toBeFalsy();
    expect(prompt!.modules).toHaveLength(3);
    const exerciseIds = prompt!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual([
      "svc-prompt-ex-m01-1",
      "svc-prompt-ex-m02-1",
      "svc-prompt-ex-m02-2",
      "svc-prompt-ex-m03-projet",
    ]);
    for (const mod of prompt!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("authored architecture phase: quizzes everywhere, audits only on m02/m03", () => {
    const architecture = svcCourse.phases.find(
      (phase) => phase.id === "svc-architecture",
    );
    expect(architecture).toBeDefined();
    expect(architecture!.scaffoldOnly).toBeFalsy();
    expect(architecture!.modules).toHaveLength(3);
    expect(architecture!.modules[0].exercises ?? []).toEqual([]);
    const exerciseIds = architecture!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual([
      "svc-architecture-ex-m02-1",
      "svc-architecture-ex-m03-1",
    ]);
    for (const mod of architecture!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("authored auth phase uses four audit exercises and 5-question quizzes", () => {
    const auth = svcCourse.phases.find((phase) => phase.id === "svc-auth");
    expect(auth).toBeDefined();
    expect(auth!.scaffoldOnly).toBeFalsy();
    expect(auth!.modules).toHaveLength(4);
    const exerciseIds = auth!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual([
      "svc-auth-ex-m01-1",
      "svc-auth-ex-m02-1",
      "svc-auth-ex-m03-1",
      "svc-auth-ex-m04-projet",
    ]);
    for (const mod of auth!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("authored data phase uses four audit exercises and 5-question quizzes", () => {
    const data = svcCourse.phases.find((phase) => phase.id === "svc-data");
    expect(data).toBeDefined();
    expect(data!.scaffoldOnly).toBeFalsy();
    expect(data!.modules).toHaveLength(4);
    const exerciseIds = data!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual([
      "svc-data-ex-m01-1",
      "svc-data-ex-m02-1",
      "svc-data-ex-m03-1",
      "svc-data-ex-m04-projet",
    ]);
    for (const mod of data!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("authored paiements phase uses four audit exercises and 5-question quizzes", () => {
    const paiements = svcCourse.phases.find((phase) => phase.id === "svc-paiements");
    expect(paiements).toBeDefined();
    expect(paiements!.scaffoldOnly).toBeFalsy();
    expect(paiements!.modules).toHaveLength(4);
    const exerciseIds = paiements!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual([
      "svc-paiements-ex-m01-1",
      "svc-paiements-ex-m02-1",
      "svc-paiements-ex-m03-1",
      "svc-paiements-ex-m04-projet",
    ]);
    for (const mod of paiements!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("authored notifications phase uses four audit exercises and 5-question quizzes", () => {
    const notifications = svcCourse.phases.find(
      (phase) => phase.id === "svc-notifications",
    );
    expect(notifications).toBeDefined();
    expect(notifications!.scaffoldOnly).toBeFalsy();
    expect(notifications!.modules).toHaveLength(4);
    const exerciseIds = notifications!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual([
      "svc-notifications-ex-m01-1",
      "svc-notifications-ex-m02-1",
      "svc-notifications-ex-m03-1",
      "svc-notifications-ex-m04-projet",
    ]);
    for (const mod of notifications!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("authored audit-securite phase uses five audit exercises and 5-question quizzes", () => {
    const auditSecurite = svcCourse.phases.find(
      (phase) => phase.id === "svc-audit-securite",
    );
    expect(auditSecurite).toBeDefined();
    expect(auditSecurite!.scaffoldOnly).toBeFalsy();
    expect(auditSecurite!.modules).toHaveLength(4);
    const exerciseIds = auditSecurite!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual([
      "svc-audit-securite-ex-m01-1",
      "svc-audit-securite-ex-m02-1",
      "svc-audit-securite-ex-m02-2",
      "svc-audit-securite-ex-m03-1",
      "svc-audit-securite-ex-m04-projet",
    ]);
    for (const mod of auditSecurite!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("authored audit-qualite phase uses four audit exercises and 5-question quizzes", () => {
    const auditQualite = svcCourse.phases.find(
      (phase) => phase.id === "svc-audit-qualite",
    );
    expect(auditQualite).toBeDefined();
    expect(auditQualite!.scaffoldOnly).toBeFalsy();
    expect(auditQualite!.modules).toHaveLength(4);
    const exerciseIds = auditQualite!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual([
      "svc-audit-qualite-ex-m01-1",
      "svc-audit-qualite-ex-m02-1",
      "svc-audit-qualite-ex-m03-1",
      "svc-audit-qualite-ex-m04-projet",
    ]);
    for (const mod of auditQualite!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("authored hebergement phase uses four audit exercises and 5-question quizzes", () => {
    const hebergement = svcCourse.phases.find(
      (phase) => phase.id === "svc-hebergement",
    );
    expect(hebergement).toBeDefined();
    expect(hebergement!.scaffoldOnly).toBeFalsy();
    expect(hebergement!.modules).toHaveLength(4);
    const exerciseIds = hebergement!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual([
      "svc-hebergement-ex-m01-1",
      "svc-hebergement-ex-m02-1",
      "svc-hebergement-ex-m03-1",
      "svc-hebergement-ex-m04-projet",
    ]);
    for (const mod of hebergement!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("authored ops phase uses three audit exercises and 5-question quizzes", () => {
    const ops = svcCourse.phases.find((phase) => phase.id === "svc-ops");
    expect(ops).toBeDefined();
    expect(ops!.scaffoldOnly).toBeFalsy();
    expect(ops!.modules).toHaveLength(3);
    const exerciseIds = ops!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual([
      "svc-ops-ex-m01-1",
      "svc-ops-ex-m02-1",
      "svc-ops-ex-m03-projet",
    ]);
    for (const mod of ops!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("authored ship phase uses three audit exercises and 5-question quizzes", () => {
    const ship = svcCourse.phases.find((phase) => phase.id === "svc-ship");
    expect(ship).toBeDefined();
    expect(ship!.scaffoldOnly).toBeFalsy();
    expect(ship!.modules).toHaveLength(3);
    const exerciseIds = ship!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual([
      "svc-ship-ex-m01-1",
      "svc-ship-ex-m02-1",
      "svc-ship-ex-m03-projet",
    ]);
    for (const mod of ship!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("authored capstone phase uses one audit exercise, 5-question quiz, and three briefs", () => {
    const capstone = svcCourse.phases.find((phase) => phase.id === "svc-capstone");
    expect(capstone).toBeDefined();
    expect(capstone!.scaffoldOnly).toBeFalsy();
    expect(capstone!.modules).toHaveLength(1);
    expect(capstone!.project?.options).toHaveLength(3);
    const exerciseIds = capstone!.modules.flatMap(
      (m) => m.exercises?.map((e) => e.id) ?? [],
    );
    expect(exerciseIds).toEqual(["svc-capstone-ex-m01-projet"]);
    for (const mod of capstone!.modules) {
      expect(mod.content.length).toBeGreaterThan(0);
      expect(mod.quiz?.id).toBe("svc-capstone-quiz-m01");
      expect(mod.quiz?.questions).toHaveLength(5);
      for (const exercise of mod.exercises ?? []) {
        expect(exercise.format).toBe("audit");
      }
    }
  });

  it("has no scaffold-only phases left (all 14 authored)", () => {
    expect(AUTHORED_PHASE_IDS).toHaveLength(14);
    expect(svcCourse.phases).toHaveLength(14);
    for (const phase of svcCourse.phases) {
      expect(phase.scaffoldOnly, `${phase.id} still scaffoldOnly`).toBeFalsy();
      expect(AUTHORED_PHASE_IDS).toContain(phase.id);
    }
  });

  it("EN authored phases share the same ids as FR", () => {
    const fr = buildSvcCourse("fr");
    const en = buildSvcCourse("en");
    for (const id of [
      "svc-bases",
      "svc-fondations",
      "svc-prompt",
      "svc-architecture",
      "svc-auth",
      "svc-data",
      "svc-paiements",
      "svc-notifications",
      "svc-audit-securite",
      "svc-audit-qualite",
      "svc-hebergement",
      "svc-ops",
      "svc-ship",
      "svc-capstone",
    ]) {
      const frPhase = fr.phases.find((p) => p.id === id)!;
      const enPhase = en.phases.find((p) => p.id === id)!;
      expect(enPhase.title).not.toBe(frPhase.title);
      expect(enPhase.modules.map((m) => m.id)).toEqual(
        frPhase.modules.map((m) => m.id),
      );
    }
  });
});
