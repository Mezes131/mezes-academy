import { describe, expect, it } from "vitest";
import { computeCourseStats, computePhaseStats } from "./courseProgress";
import type { LessonProgress, Phase } from "@/types";

const progress: LessonProgress = {
  readModules: ["m1"],
  quizScores: {
    q1: { correct: 4, total: 5, updatedAt: 1 },
  },
  completedExercises: ["e1"],
  exerciseProgress: {},
  challengeScores: {},
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
        exercises: [{ id: "e1", format: "audit", title: "e", instructions: "", scenario: "", findings: [] }],
      },
      { id: "m2" },
    ],
  },
] as unknown as Phase[];

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
