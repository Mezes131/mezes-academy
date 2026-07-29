import http from "node:http";
import { runAudit, persistReport } from "./report.js";
import type { AuditJob } from "./types.js";

const PORT = Number(process.env.PORT ?? 8090);

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method === "POST" && req.url === "/audit") {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    let job: AuditJob;
    try {
      job = JSON.parse(Buffer.concat(chunks).toString("utf8")) as AuditJob;
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "invalid JSON" }));
      return;
    }

    if (!job.workspacePath || !job.projectId || !job.submissionId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "missing required fields" }));
      return;
    }

    const report = runAudit(job);
    try {
      await persistReport(report);
    } catch (err) {
      console.error(err);
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(report));
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`audit worker listening on :${PORT}`);
});
