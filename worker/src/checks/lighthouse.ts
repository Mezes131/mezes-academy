import fs from "node:fs";
import path from "node:path";
import type { AuditFinding } from "../types.js";

/**
 * Placeholder performance check without running Lighthouse (no network / browser).
 * Looks for an optional lighthouse summary JSON committed with the submission.
 */
export function checkLighthouseSummary(workspacePath: string): AuditFinding[] {
  const summaryPath = path.join(workspacePath, "audit", "lighthouse-summary.json");
  if (!fs.existsSync(summaryPath)) {
    return [
      {
        domain: "performance",
        severity: "info",
        title: "No Lighthouse summary provided",
        evidence: "audit/lighthouse-summary.json missing",
        recommendation: "Attach a CI-generated Lighthouse summary for automated scoring.",
      },
    ];
  }

  const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8")) as {
    performance?: number;
  };
  const score = summary.performance ?? 0;
  if (score < 0.5) {
    return [
      {
        domain: "performance",
        severity: "high",
        title: "Lighthouse performance below threshold",
        evidence: `performance=${score}`,
        recommendation: "Improve LCP/TBT and re-run the performance audit.",
      },
    ];
  }
  return [];
}
