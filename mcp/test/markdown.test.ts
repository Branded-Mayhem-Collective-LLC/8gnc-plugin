import { describe, expect, it } from "vitest";

import { renderWorkingDiagnosisMarkdown } from "../src/markdown";
import type { BlockedDiagnosis, WorkingDiagnosis } from "../src/schema";

describe("renderWorkingDiagnosisMarkdown", () => {
  it("returns a complete portable fallback for a working diagnosis", () => {
    const diagnosis: WorkingDiagnosis = {
      schemaVersion: "1.0",
      status: "working",
      input: { summary: "The pipeline is stalled." },
      primaryConstraint: "The offer is difficult to compare.",
      primaryConstraintEvidenceIds: ["page-review"],
      confidence: "medium",
      evidence: [
        {
          id: "page-review",
          kind: "observed",
          statement: "The offer page omits scope boundaries.",
          provenance: "Owner-supplied page capture.",
          asOf: "2026-09-02"
        }
      ],
      inferences: [
        {
          statement: "Prospects may delay because the decision feels open-ended.",
          basedOnEvidenceIds: ["page-review"]
        }
      ],
      unknowns: ["Which scope question appears most often on calls?"],
      route: {
        steps: [{ method: "ux-ui-psych", purpose: "Make the decision legible." }],
        firstMove: "Add the three scope boundaries prospects ask about most."
      },
      decisionGate: {
        required: true,
        question: "Do you want to test this before changing acquisition?"
      }
    };

    const markdown = renderWorkingDiagnosisMarkdown(diagnosis);
    expect(markdown).toContain("# Working Diagnosis");
    expect(markdown).toContain("## Evidence");
    expect(markdown).toContain("**Constraint evidence:** page-review");
    expect(markdown).toContain("Owner-supplied page capture.");
    expect(markdown).toContain("## Smallest useful route");
    expect(markdown).toContain("`ux-ui-psych`");
    expect(markdown).toContain("The renderer does not fetch sources or access CRM, email, publishing, or private systems.");
  });

  it("explains a blocked result without manufacturing a diagnosis", () => {
    const diagnosis: BlockedDiagnosis = {
      schemaVersion: "1.0",
      status: "blocked",
      input: { summary: "Conversion seems weak." },
      reason: "No dated conversion evidence was supplied.",
      missingEvidence: ["A dated funnel report with source provenance."],
      decisionGate: {
        required: true,
        question: "Can you provide the funnel report?"
      }
    };

    const markdown = renderWorkingDiagnosisMarkdown(diagnosis);
    expect(markdown).toContain("# Working Diagnosis — Blocked");
    expect(markdown).toContain("Evidence threshold not met.");
    expect(markdown).not.toContain("> Evidence-backed.");
    expect(markdown).toContain("## Evidence still needed");
    expect(markdown).not.toContain("## Primary constraint");
  });
});
