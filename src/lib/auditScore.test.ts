import { describe, expect, it } from "vitest";
import { scoreAuditReport } from "./auditScore";
import type { AuditFinding } from "@/types";

const findings: AuditFinding[] = [
  { id: "a", label: "Secret en dur", correct: true, minSeverity: "high" },
  { id: "b", label: "CORS ouvert", correct: true, minSeverity: "medium" },
  { id: "c", label: "Commentaire TODO", correct: false },
];

describe("scoreAuditReport", () => {
  it("passes a perfect report with severities", () => {
    const result = scoreAuditReport(
      findings,
      {
        selectedIds: ["a", "b"],
        severities: { a: "critical", b: "high" },
        evidence: {},
      },
      0.7,
      false,
    );
    expect(result.passed).toBe(true);
    expect(result.score).toBe(1);
    expect(result.tp).toBe(2);
    expect(result.fp).toBe(0);
    expect(result.fn).toBe(0);
  });

  it("penalises false positives and negatives", () => {
    const result = scoreAuditReport(findings, {
      selectedIds: ["a", "c"],
      severities: { a: "high" },
      evidence: {},
    });
    // tp=1, fp=1, fn=1 → 1/3
    expect(result.score).toBeCloseTo(1 / 3);
    expect(result.passed).toBe(false);
  });

  it("fails when evidence is required but missing", () => {
    const result = scoreAuditReport(
      findings,
      {
        selectedIds: ["a", "b"],
        severities: { a: "high", b: "medium" },
        evidence: { a: "line 12", b: "" },
      },
      0.7,
      true,
    );
    expect(result.passed).toBe(false);
    expect(result.failures.some((f) => f.includes("Preuve"))).toBe(true);
  });

  it("fails when severity is below minimum", () => {
    const result = scoreAuditReport(findings, {
      selectedIds: ["a", "b"],
      severities: { a: "low", b: "medium" },
      evidence: {},
    });
    expect(result.passed).toBe(false);
    expect(result.failures.some((f) => f.includes("Gravité trop basse"))).toBe(
      true,
    );
  });
});
