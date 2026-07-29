export type AuditDomain = "security" | "performance" | "design";
export type AuditSeverity = "info" | "low" | "medium" | "high" | "critical";

export interface AuditJob {
  projectId: string;
  submissionId: string;
  checklistVersion: string;
  /** Absolute path inside the worker container (bounded workspace). */
  workspacePath: string;
}

export interface AuditFinding {
  domain: AuditDomain;
  severity: AuditSeverity;
  title: string;
  evidence: string;
  recommendation: string;
}

export interface AuditReport {
  status: "completed" | "failed";
  findings: AuditFinding[];
  projectId: string;
  submissionId: string;
  checklistVersion: string;
  checkedAt: string;
}
