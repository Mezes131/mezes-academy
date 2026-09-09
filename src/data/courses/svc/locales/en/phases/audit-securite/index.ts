import type { Phase } from "@/types";
import { auditSecuriteModule01 } from "./modules/01-secrets-configuration";
import { auditSecuriteModule02 } from "./modules/02-entrees-injections";
import { auditSecuriteModule03 } from "./modules/03-authz-surfaces-api";
import { auditSecuriteModule04 } from "./modules/04-dependances-supply-chain";

/** Phase 8: authored content (replaces the program-derived scaffold). */
export const auditSecuritePhase: Phase = {
  id: "svc-audit-securite",
  slug: "audit-securite",
  courseId: "svc",
  color: "expert",
  icon: "fa-shield-halved",
  label: "Phase 8",
  title: "Security Audit",
  summary:
    "Apply the Security baseline checklist to the product. The 'Secure' core of the positioning.",
  metaTags: ["security", "~3h read", "interactive audits", "baseline"],
  modules: [
    auditSecuriteModule01,
    auditSecuriteModule02,
    auditSecuriteModule03,
    auditSecuriteModule04,
  ],
  project: {
    title: "Project P8: Security baseline report",
    deliverable:
      "The capstone product's Security baseline report: evidence, fixes applied, remaining items.",
    assessment: [
      "Full security-baseline checklist passed",
      "Every finding has evidence and a fix",
      "No open critical vulnerabilities",
    ],
  },
};
