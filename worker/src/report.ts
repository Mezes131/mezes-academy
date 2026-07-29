import fs from "node:fs";
import path from "node:path";
import type { AuditJob, AuditReport } from "./types.js";
import { checkSecrets } from "./checks/secrets.js";
import { checkDependencies } from "./checks/dependencies.js";
import { checkLighthouseSummary } from "./checks/lighthouse.js";

const MAX_WORKSPACE_BYTES = 50 * 1024 * 1024;

function directorySize(dir: string): number {
  // ponytail: O(n) recursive walk — fine for submission caps; upgrade to quota at upload time
  let total = 0;
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop()!;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".git") continue;
        stack.push(full);
      } else {
        total += fs.statSync(full).size;
        if (total > MAX_WORKSPACE_BYTES) return total;
      }
    }
  }
  return total;
}

export function runAudit(job: AuditJob): AuditReport {
  try {
    const size = directorySize(job.workspacePath);
    if (size > MAX_WORKSPACE_BYTES) {
      return {
        status: "failed",
        findings: [
          {
            domain: "security",
            severity: "high",
            title: "Workspace too large",
            evidence: `${size} bytes`,
            recommendation: "Reduce submission size under 50MB.",
          },
        ],
        projectId: job.projectId,
        submissionId: job.submissionId,
        checklistVersion: job.checklistVersion,
        checkedAt: new Date().toISOString(),
      };
    }

    const findings = [
      ...checkSecrets(job.workspacePath),
      ...checkDependencies(job.workspacePath),
      ...checkLighthouseSummary(job.workspacePath),
    ];

    return {
      status: "completed",
      findings,
      projectId: job.projectId,
      submissionId: job.submissionId,
      checklistVersion: job.checklistVersion,
      checkedAt: new Date().toISOString(),
    };
  } catch (err) {
    return {
      status: "failed",
      findings: [
        {
          domain: "security",
          severity: "high",
          title: "Audit crashed",
          evidence: err instanceof Error ? err.message : String(err),
          recommendation: "Fix workspace packaging and retry.",
        },
      ],
      projectId: job.projectId,
      submissionId: job.submissionId,
      checklistVersion: job.checklistVersion,
      checkedAt: new Date().toISOString(),
    };
  }
}

/** Persist report via Supabase REST when service role is configured. */
export async function persistReport(report: AuditReport): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn("SUPABASE_SERVICE_ROLE_KEY not set — report not persisted");
    return;
  }

  const response = await fetch(`${url}/rest/v1/audit_reports`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(report),
  });

  if (!response.ok) {
    throw new Error(`Failed to persist audit report: ${response.status}`);
  }
}
