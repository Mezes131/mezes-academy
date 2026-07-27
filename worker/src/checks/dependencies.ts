import fs from "node:fs";
import path from "node:path";
import type { AuditFinding } from "../types.js";

/** Pure check: flags known vulnerable / placeholder dependency ranges. No install, no network. */
export function checkDependencies(workspacePath: string): AuditFinding[] {
  const pkgPath = path.join(workspacePath, "package.json");
  if (!fs.existsSync(pkgPath)) return [];

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  const all = { ...pkg.dependencies, ...pkg.devDependencies };
  const findings: AuditFinding[] = [];

  for (const [name, version] of Object.entries(all)) {
    if (version.includes("*") || version.startsWith("file:")) {
      findings.push({
        domain: "security",
        severity: "medium",
        title: `Loose dependency range: ${name}`,
        evidence: `${name}@${version}`,
        recommendation: "Pin exact versions for reproducible, auditable installs.",
      });
    }
  }
  return findings;
}
