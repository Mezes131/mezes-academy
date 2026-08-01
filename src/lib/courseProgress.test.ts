import { describe, expect, it } from "vitest";
import {
  activeCourses,
  aggregateCourseStats,
  computeCourseDetailStats,
  computeCourseStats,
  computePhaseStats,
} from "./courseProgress";
import type { Course, LessonProgress, Phase } from "@/types";

const progress: LessonProgress = {
  readModules: ["m1"],
  quizScores: {
    q1: { correct: 4, total: 5, answers: {}, updatedAt: 1 },
  },
  completedExercises: ["e1"],
  exerciseProgress: {
    e1: {
      status: "solved",
      attempts: 1,
      hintsUsed: 0,
      revealedSolution: false,
      updatedAt: 1,
    },
  },
  challengeScores: {
    p1: {
      phaseId: "p1",
      exerciseIds: ["c1"],
      passedIds: ["c1"],
      total: 1,
      at: 1,
    },
  },
  bookmarks: [],
  theme: "dark",
};

const phases = [
  {
    id: "p1",
    label: "P1",
    color: "intro",
    modules: [
      {
        id: "m1",
        quiz: { id: "q1", title: "q", questions: [] },
        exercises: [
          {
            id: "e1",
            format: "audit",
            title: "e",
            instructions: "",
            scenario: "",
            findings: [],
          },
        ],
      },
      { id: "m2" },
    ],
  },
] as unknown as Phase[];

const emptyProgress: LessonProgress = {
  readModules: [],
  quizScores: {},
  completedExercises: [],
  exerciseProgress: {},
  challengeScores: {},
  bookmarks: [],
  theme: "dark",
};

function fakeCourse(
  id: string,
  coursePhases: Phase[],
  status: Course["meta"]["status"] = "active",
): Course {
  return {
    id,
    slug: id,
    meta: {
      title: id,
      tagline: "",
      description: "",
      icon: "fa-atom",
      accent: { text: "", bg: "", border: "" },
      tags: [],
      level: "Débutant",
      duration: "",
      status,
    },
    phases: coursePhases,
  } as Course;
}

describe("computePhaseStats", () => {
  it("counts read + quiz + exercise for a phase", () => {
    const [st] = computePhaseStats(phases, progress);
    expect(st.total).toBe(4); // m1, quiz, exercise, m2
    expect(st.done).toBe(3); // m1 read, quiz passed, e1 done
    expect(st.percent).toBe(75);
  });
});

describe("computeCourseStats", () => {
  it("aggregates phases", () => {
    const stats = computeCourseStats(phases, progress);
    expect(stats.total).toBe(4);
    expect(stats.done).toBe(3);
    expect(stats.quizPassed).toBe(1);
  });
});

describe("computeCourseDetailStats", () => {
  it("scopes counters to the course phases", () => {
    const detail = computeCourseDetailStats(phases, progress);
    expect(detail.read).toBe(1);
    expect(detail.quizzesTaken).toBe(1);
    expect(detail.exercisesSolved).toBe(1);
    expect(detail.challenges).toBe(1);
  });
});

describe("activeCourses", () => {
  it("lists every active course, ignoring soon/planned", () => {
    const react = fakeCourse("react", phases);
    const svc = fakeCourse("svc", [
      {
        id: "svc-p",
        label: "S",
        color: "intro",
        modules: [{ id: "svc-m1" }],
      },
    ] as unknown as Phase[]);
    const soon = fakeCourse("soon", phases, "soon");

    expect(activeCourses([react, svc, soon]).map((c) => c.id)).toEqual([
      "react",
      "svc",
    ]);
    expect(activeCourses([react, svc]).map((c) => c.id)).toEqual([
      "react",
      "svc",
    ]);
  });
});

describe("aggregateCourseStats", () => {
  it("sums totals across courses", () => {
    const a = computeCourseStats(phases, progress);
    const b = computeCourseStats(phases, emptyProgress);
    const sum = aggregateCourseStats([a, b]);
    expect(sum.total).toBe(8);
    expect(sum.done).toBe(3);
    expect(sum.quizPassed).toBe(1);
  });
});
