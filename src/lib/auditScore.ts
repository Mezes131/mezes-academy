import type { AuditFinding, AuditSeverity } from "@/types";

const SEVERITY_RANK: Record<AuditSeverity, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

export interface AuditSubmission {
  /** Finding ids the learner checked. */
  selectedIds: string[];
  /** Severity chosen per selected finding id. */
  severities: Record<string, AuditSeverity | undefined>;
  /** Free-text evidence per selected finding id. */
  evidence: Record<string, string | undefined>;
}

export interface AuditScoreResult {
  score: number;
  passed: boolean;
  tp: number;
  fp: number;
  fn: number;
  failures: string[];
}

/**
 * Score an audit checklist submission against authoring keys.
 * score = TP / (TP + FP + FN); evidence and minSeverity can add failures
 * and force a fail even when the ratio would pass.
 */
export function scoreAuditReport(
  findings: AuditFinding[],
  submission: AuditSubmission,
  passingScore = 0.7,
  requireEvidence = false,
): AuditScoreResult {
  const correctIds = new Set(findings.filter((f) => f.correct).map((f) => f.id));
  const selected = new Set(submission.selectedIds);
  const failures: string[] = [];

  let tp = 0;
  let fp = 0;
  let fn = 0;

  for (const id of correctIds) {
    if (selected.has(id)) tp += 1;
    else fn += 1;
  }
  for (const id of selected) {
    if (!correctIds.has(id)) fp += 1;
  }

  const denom = tp + fp + fn;
  const score = denom === 0 ? 0 : tp / denom;

  for (const finding of findings) {
    if (!finding.correct || !selected.has(finding.id)) continue;

    if (requireEvidence) {
      const note = (submission.evidence[finding.id] ?? "").trim();
      if (!note) {
        failures.push(`Preuve manquante : ${finding.label}`);
      }
    }

    if (finding.minSeverity) {
      const chosen = submission.severities[finding.id];
      if (!chosen) {
        failures.push(`Gravité manquante : ${finding.label}`);
      } else if (SEVERITY_RANK[chosen] < SEVERITY_RANK[finding.minSeverity]) {
        failures.push(
          `Gravité trop basse pour « ${finding.label} » (min. ${finding.minSeverity})`,
        );
      }
    }
  }

  const passed = score >= passingScore && failures.length === 0;
  return { score, passed, tp, fp, fn, failures };
}
