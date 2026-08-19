import { describe, expect, it } from "vitest";
import { reactCourse, svcCourse } from "@/data/courses";
import type { LessonProgress } from "@/types";
import {
  FLAGSHIP_COURSE_PATH,
  REACT_COURSE_PATH,
  continuePathForProgress,
  courseHasProgress,
  isDefaultAuthNext,
} from "./flagshipContinue";

const emptyProgress: LessonProgress = {
  readModules: [],
  quizScores: {},
  completedExercises: [],
  exerciseProgress: {},
  challengeScores: {},
  bookmarks: [],
  theme: "dark",
};

function withRead(moduleId: string): LessonProgress {
  return { ...emptyProgress, readModules: [moduleId] };
}

const svcModuleId = svcCourse.phases[0].modules[0].id;
const reactModuleId = reactCourse.phases[0].modules[0].id;

describe("continuePathForProgress", () => {
  it("defaults to Secure Vibe Coding when there is no progress", () => {
    expect(continuePathForProgress(emptyProgress)).toBe(FLAGSHIP_COURSE_PATH);
  });

  it("stays on SVC when SVC has progress", () => {
    expect(continuePathForProgress(withRead(svcModuleId))).toBe(
      FLAGSHIP_COURSE_PATH,
    );
  });

  it("uses React when only React has progress", () => {
    expect(continuePathForProgress(withRead(reactModuleId))).toBe(
      REACT_COURSE_PATH,
    );
  });

  it("prefers SVC when both tracks have progress", () => {
    const both: LessonProgress = {
      ...emptyProgress,
      readModules: [svcModuleId, reactModuleId],
    };
    expect(continuePathForProgress(both)).toBe(FLAGSHIP_COURSE_PATH);
  });
});

describe("courseHasProgress", () => {
  it("is false on empty progress", () => {
    expect(courseHasProgress("secure-vibe-coding", emptyProgress)).toBe(false);
    expect(courseHasProgress("react", emptyProgress)).toBe(false);
  });

  it("detects the matching course only", () => {
    expect(courseHasProgress("secure-vibe-coding", withRead(svcModuleId))).toBe(
      true,
    );
    expect(courseHasProgress("react", withRead(svcModuleId))).toBe(false);
  });
});

describe("isDefaultAuthNext", () => {
  const lp = (path: string) => `/en${path}`;

  it("treats locale-prefixed flagship as default", () => {
    expect(isDefaultAuthNext("/en/secure-vibe-coding", lp)).toBe(true);
  });

  it("treats raw flagship as default", () => {
    expect(isDefaultAuthNext("/secure-vibe-coding", lp)).toBe(true);
  });

  it("keeps a custom next", () => {
    expect(isDefaultAuthNext("/en/react", lp)).toBe(false);
  });
});
