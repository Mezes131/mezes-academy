import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { runAudit } from "./report.js";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-"));
fs.writeFileSync(
  path.join(dir, "leak.js"),
  `const key = "AKIAIOSFODNN7EXAMPLE";\n`,
);
fs.writeFileSync(
  path.join(dir, "package.json"),
  JSON.stringify({ dependencies: { lodash: "*" } }),
);

const report = runAudit({
  projectId: "demo",
  submissionId: "sub-1",
  checklistVersion: "1.0.0",
  workspacePath: dir,
});

assert.equal(report.status, "completed");
assert.ok(report.findings.some((f) => f.title.includes("AWS")));
assert.ok(report.findings.some((f) => f.title.includes("Loose dependency")));
console.log("self-check ok", report.findings.length, "findings");
