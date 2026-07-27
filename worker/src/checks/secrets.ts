import fs from "node:fs";
import path from "node:path";
import type { AuditFinding } from "../types.js";

const SECRET_PATTERNS: Array<{ name: string; re: RegExp }> = [
  { name: "AWS access key", re: /AKIA[0-9A-Z]{16}/ },
  { name: "Generic API key assignment", re: /(?:api[_-]?key|secret|token)\s*[:=]\s*['\"][A-Za-z0-9_\-]{16,}['\"]/i },
  { name: "Private key block", re: /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/ },
];

const MAX_FILE_BYTES = 256_000;
const MAX_FILES = 200;

function walk(dir: string, files: string[] = []): string[] {
  if (files.length >= MAX_FILES) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (files.length >= MAX_FILES) break;
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

/** Pure check: no network. Scans text files for common secret patterns. */
export function checkSecrets(workspacePath: string): AuditFinding[] {
  const findings: AuditFinding[] = [];
  const root = path.resolve(workspacePath);
  if (!fs.existsSync(root)) {
    return [
      {
        domain: "security",
        severity: "high",
        title: "Workspace missing",
        evidence: root,
        recommendation: "Provide a valid project workspace path.",
      },
    ];
  }

  for (const file of walk(root)) {
    const stat = fs.statSync(file);
    if (stat.size > MAX_FILE_BYTES) continue;
    const text = fs.readFileSync(file, "utf8");
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.re.test(text)) {
        findings.push({
          domain: "security",
          severity: "critical",
          title: `Possible secret: ${pattern.name}`,
          evidence: path.relative(root, file),
          recommendation: "Remove secrets from the repository and rotate credentials.",
        });
      }
    }
  }
  return findings;
}
