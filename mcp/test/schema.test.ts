import { describe, expect, it } from "vitest";

import {
  normalizeWorkingDiagnosis,
  ROUTE_METHODS,
  WorkingDiagnosisV1Schema
} from "../src/schema";

const workingDiagnosis = () => ({
  schemaVersion: "1.0" as const,
  status: "working" as const,
  input: { summary: "Traffic is growing, but qualified consultations are flat." },
  primaryConstraint: "The offer page does not make the next decision legible.",
  primaryConstraintEvidenceIds: ["analytics-aug", "owner-report"],
  confidence: "medium" as const,
  evidence: [
    {
      id: "analytics-aug",
      kind: "observed" as const,
      statement: "Qualified organic sessions rose while consultation starts stayed flat.",
      provenance: "Owner-supplied analytics export, acquisition and conversion report.",
      asOf: "2026-08-31"
    },
    {
      id: "owner-report",
      kind: "reported" as const,
      statement: "Prospects ask what happens after the initial call.",
      provenance: "Owner interview notes.",
      asOf: "2026-09-01"
    }
  ],
  inferences: [
    {
      statement: "Visibility is less likely to be the primary constraint than offer clarity.",
      basedOnEvidenceIds: ["analytics-aug", "owner-report"]
    }
  ],
  unknowns: ["Do visitors understand the deliverable before reaching the call to action?"],
  route: {
    steps: [
      { method: "competitive-positioning-audit" as const, purpose: "Check whether competitors explain the decision more clearly." },
      { method: "ux-ui-psych" as const, purpose: "Make the next decision and its stakes legible." }
    ],
    firstMove: "Review the offer page against three recent qualified prospect questions."
  },
  decisionGate: {
    required: true as const,
    question: "Do you want to test offer clarity before buying more traffic?"
  }
});

describe("WorkingDiagnosisV1Schema", () => {
  it("normalizes a complete evidence-backed working diagnosis", () => {
    const diagnosis = workingDiagnosis();
    diagnosis.input.summary = `  ${diagnosis.input.summary}  `;

    expect(normalizeWorkingDiagnosis(diagnosis).input.summary).toBe(
      "Traffic is growing, but qualified consultations are flat."
    );
  });

  it("accepts an explicit blocked result when required evidence is unavailable", () => {
    const result = WorkingDiagnosisV1Schema.safeParse({
      schemaVersion: "1.0",
      status: "blocked",
      input: { summary: "We think search visibility is weak." },
      reason: "No dated search evidence or source provenance was supplied.",
      missingEvidence: ["A dated search performance export with its source."],
      decisionGate: {
        required: true,
        question: "Can you provide dated search evidence before we name the constraint?"
      }
    });

    expect(result.success).toBe(true);
  });

  it("rejects missing provenance and invalid or future as-of dates", () => {
    const missingProvenance = workingDiagnosis();
    missingProvenance.evidence[0]!.provenance = "";
    expect(WorkingDiagnosisV1Schema.safeParse(missingProvenance).success).toBe(false);

    const invalidDate = workingDiagnosis();
    invalidDate.evidence[0]!.asOf = "2026-02-30";
    expect(WorkingDiagnosisV1Schema.safeParse(invalidDate).success).toBe(false);

    const futureDate = workingDiagnosis();
    futureDate.evidence[0]!.asOf = "2099-12-31";
    expect(WorkingDiagnosisV1Schema.safeParse(futureDate).success).toBe(false);
  });

  it("rejects duplicate and unknown evidence references", () => {
    const duplicate = workingDiagnosis();
    duplicate.evidence[1]!.id = "analytics-aug";
    const duplicateResult = WorkingDiagnosisV1Schema.safeParse(duplicate);
    expect(duplicateResult.success).toBe(false);

    const unknown = workingDiagnosis();
    unknown.inferences[0]!.basedOnEvidenceIds = ["not-supplied"];
    const unknownResult = WorkingDiagnosisV1Schema.safeParse(unknown);
    expect(unknownResult.success).toBe(false);

    const duplicateConstraintReference = workingDiagnosis();
    duplicateConstraintReference.primaryConstraintEvidenceIds = ["analytics-aug", "analytics-aug"];
    expect(WorkingDiagnosisV1Schema.safeParse(duplicateConstraintReference).success).toBe(false);

    const unknownConstraintReference = workingDiagnosis();
    unknownConstraintReference.primaryConstraintEvidenceIds = ["not-supplied"];
    expect(WorkingDiagnosisV1Schema.safeParse(unknownConstraintReference).success).toBe(false);
  });

  it("allows only the exact 37 installed methods", () => {
    expect(ROUTE_METHODS).toHaveLength(37);

    const valid = workingDiagnosis();
    const invented: unknown = {
      ...valid,
      route: {
        ...valid.route,
        steps: [{ method: "guaranteed-growth-engine", purpose: "Promise an unsupported result." }]
      }
    };
    expect(WorkingDiagnosisV1Schema.safeParse(invented).success).toBe(false);
  });
});
