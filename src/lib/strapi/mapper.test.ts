import { describe, expect, it } from "vitest";
import { mapCourse, mapExercise, mapModule, mapQuiz } from "./mapper";
import type { StrapiCourseAttrs, StrapiModuleAttrs } from "./types";

const sampleModule: StrapiModuleAttrs = {
  legacyId: "react-core-m06",
  index: "06",
  title: "JSX",
  subtitle: "Bases",
  duration: "20 min",
  order: 0,
  contentBlocks: [
    { kind: "title", text: "JSX" },
    { kind: "paragraph", html: "<p>Hello</p>" },
  ],
  quiz: {
    legacyId: "react-core-quiz-m06",
    title: "Quiz JSX",
    questions: [
      {
        legacyId: "q1",
        prompt: "JSX est…",
        type: "single",
        answers: [
          { legacyId: "a", label: "HTML" },
          { legacyId: "b", label: "Une syntaxe JS" },
        ],
      },
    ],
  },
  exercises: [
    {
      legacyId: "react-core-ex-m06-1",
      title: "Premier JSX",
      instructions: "Écris un composant",
      starterFiles: { "/App.js": "export default function App(){ return null }" },
      // solutionFiles intentionally omitted (private)
    },
  ],
  lessons: [],
};

const sampleCourse: StrapiCourseAttrs = {
  legacyId: "react",
  title: "React",
  slug: "react",
  tagline: "tag",
  description: "desc",
  icon: "fa-atom",
  accentText: "text-brand-core",
  accentBg: "bg-brand-core/10",
  accentBorder: "border-brand-core/30",
  phases: [
    {
      legacyId: "react-core",
      slug: "core",
      title: "Core",
      label: "Core",
      summary: "Fondations",
      order: 1,
      color: "core",
      icon: "fa-code",
      metaTags: ["hooks"],
      modules: [sampleModule],
    },
  ],
};

describe("mapCourse", () => {
  it("maps nested course → phase → module → quiz → exercises", () => {
    const course = mapCourse(sampleCourse);
    expect(course.id).toBe("react");
    expect(course.phases).toHaveLength(1);
    expect(course.phases[0].id).toBe("react-core");
    const mod = course.phases[0].modules[0];
    expect(mod.id).toBe("react-core-m06");
    expect(mod.quiz?.id).toBe("react-core-quiz-m06");
    expect(mod.exercises?.[0].id).toBe("react-core-ex-m06-1");
    const first = mod.exercises?.[0];
    expect(first && first.format !== "audit" && first.starterFiles["/App.js"]).toContain(
      "App",
    );
    expect(first && first.format !== "audit" && first.solutionFiles).toEqual({});
  });

  it("tolerates missing optional quiz and media", () => {
    const bare: StrapiModuleAttrs = {
      legacyId: "react-intro-m01",
      title: "Def",
      index: "01",
      subtitle: "",
      duration: "3 min",
      order: 0,
      lessons: [],
    };
    const mod = mapModule(bare);
    expect(mod.quiz).toBeUndefined();
    expect(mod.exercises).toBeUndefined();
    expect(mod.content).toEqual([]);
  });
});

describe("mapExercise audit", () => {
  it("rebuilds AuditExercise from kind audit + starterFiles payload", () => {
    const ex = mapExercise({
      legacyId: "svc-fondations-ex-m01-1",
      title: "Audit",
      instructions: "Trouve les défauts",
      kind: "audit",
      starterFiles: {
        __format: "audit",
        scenario: "Snippet douteux",
        findings: [
          {
            id: "f1",
            label: "Secret en dur",
            severity: "high",
            isReal: true,
            evidenceHint: "API_KEY",
          },
        ],
        requireEvidence: true,
        passingScore: 0.7,
      },
      solutionFiles: { __solution: "Le secret ne doit pas être en clair." },
    });
    expect(ex.format).toBe("audit");
    if (ex.format === "audit") {
      expect(ex.scenario).toBe("Snippet douteux");
      expect(ex.findings).toHaveLength(1);
      expect(ex.requireEvidence).toBe(true);
      expect(ex.solution).toContain("clair");
    }
  });
});

describe("mapQuiz", () => {
  it("keeps correct answers empty when isCorrect is stripped", () => {
    const quiz = mapQuiz({
      legacyId: "q",
      title: "t",
      questions: [
        {
          legacyId: "q1",
          prompt: "p",
          answers: [{ legacyId: "a", label: "A" }],
        },
      ],
    });
    expect(quiz?.questions[0].correct).toEqual([]);
  });
});
