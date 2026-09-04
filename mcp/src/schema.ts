import { z } from "zod";

export const WORKING_DIAGNOSIS_SCHEMA_VERSION = "1.0" as const;

export const ROUTE_METHODS = [
  "ai-agent-readiness",
  "ai-focus-group",
  "ai-visibility-tracking",
  "brand-revival",
  "brand-strategy-compiler",
  "brandprint-engine-guide",
  "brandprint-tier-a",
  "brandprint-tier-b",
  "brandprint-tier-c",
  "competitive-positioning-audit",
  "competitive-teardown",
  "core-human-truth",
  "core-strategic-truth",
  "creative-thinking-ai",
  "data-density-commerce",
  "dataforseo",
  "deep-research",
  "diagnose-brand-growth",
  "fairness-anchor-ladder",
  "humanize",
  "humanize-ig",
  "linkedin-authority",
  "local-services-seo",
  "mayhem-method-ai-use",
  "neuro-design",
  "outreach-diagnosis",
  "pitching-pivot",
  "productprint-engine-guide",
  "productprint-tier-a",
  "productprint-tier-b",
  "productprint-tier-c",
  "sales-simulator",
  "story-spine",
  "strategy-thesis-compiler",
  "thesis-stress-test",
  "ux-ui-psych",
  "voice-profiler"
] as const;

const text = (label: string, max: number) =>
  z.string().trim().min(1, `${label} is required`).max(max, `${label} is too long`);

const calendarDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "asOf must use YYYY-MM-DD")
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }, "asOf must be a real calendar date")
  .refine(
    (value) => value <= new Date().toISOString().slice(0, 10),
    "asOf must not be in the future"
  );

const DiagnosisInputSchema = z
  .object({
    summary: text("input.summary", 4_000)
  })
  .strict();

const DecisionGateSchema = z
  .object({
    required: z.literal(true),
    question: text("decisionGate.question", 1_200)
  })
  .strict();

export const EvidenceSchema = z
  .object({
    id: z
      .string()
      .trim()
      .regex(/^[a-z0-9][a-z0-9_-]{0,63}$/, "evidence.id must be a stable lowercase identifier"),
    kind: z.enum(["observed", "reported"]),
    statement: text("evidence.statement", 2_000),
    provenance: text("evidence.provenance", 1_200),
    asOf: calendarDate
  })
  .strict();

export const InferenceSchema = z
  .object({
    statement: text("inference.statement", 2_000),
    basedOnEvidenceIds: z
      .array(z.string().trim().min(1))
      .min(1, "each inference must cite at least one evidence id")
      .max(12)
  })
  .strict();

export const RouteStepSchema = z
  .object({
    method: z.enum(ROUTE_METHODS),
    purpose: text("route.steps[].purpose", 1_200)
  })
  .strict();

export const WorkingDiagnosisSchema = z
  .object({
    schemaVersion: z.literal(WORKING_DIAGNOSIS_SCHEMA_VERSION),
    status: z.literal("working"),
    input: DiagnosisInputSchema,
    primaryConstraint: text("primaryConstraint", 2_000),
    confidence: z.enum(["low", "medium", "high"]),
    evidence: z.array(EvidenceSchema).min(1, "a working diagnosis requires evidence").max(24),
    inferences: z.array(InferenceSchema).max(16),
    unknowns: z.array(text("unknown", 1_200)).min(1, "a working diagnosis requires an open question").max(12),
    route: z
      .object({
        steps: z.array(RouteStepSchema).min(1).max(3),
        firstMove: text("route.firstMove", 1_600)
      })
      .strict(),
    decisionGate: DecisionGateSchema
  })
  .strict()
  .superRefine((diagnosis, context) => {
    const evidenceIds = new Set<string>();

    for (const [index, item] of diagnosis.evidence.entries()) {
      if (evidenceIds.has(item.id)) {
        context.addIssue({
          code: "custom",
          message: `duplicate evidence id: ${item.id}`,
          path: ["evidence", index, "id"]
        });
      }
      evidenceIds.add(item.id);
    }

    for (const [inferenceIndex, inference] of diagnosis.inferences.entries()) {
      const referencedIds = new Set<string>();
      for (const [referenceIndex, evidenceId] of inference.basedOnEvidenceIds.entries()) {
        if (referencedIds.has(evidenceId)) {
          context.addIssue({
            code: "custom",
            message: `duplicate evidence reference: ${evidenceId}`,
            path: ["inferences", inferenceIndex, "basedOnEvidenceIds", referenceIndex]
          });
        }
        referencedIds.add(evidenceId);

        if (!evidenceIds.has(evidenceId)) {
          context.addIssue({
            code: "custom",
            message: `unknown evidence reference: ${evidenceId}`,
            path: ["inferences", inferenceIndex, "basedOnEvidenceIds", referenceIndex]
          });
        }
      }
    }
  });

export const BlockedDiagnosisSchema = z
  .object({
    schemaVersion: z.literal(WORKING_DIAGNOSIS_SCHEMA_VERSION),
    status: z.literal("blocked"),
    input: DiagnosisInputSchema,
    reason: text("reason", 2_000),
    missingEvidence: z.array(text("missingEvidence", 1_200)).min(1).max(12),
    decisionGate: DecisionGateSchema
  })
  .strict();

export const WorkingDiagnosisV1Schema = z.discriminatedUnion("status", [
  WorkingDiagnosisSchema,
  BlockedDiagnosisSchema
]);

export const WorkingDiagnosisResultV1Schema = z
  .object({
    diagnosis: WorkingDiagnosisV1Schema,
    markdown: z.string().min(1)
  })
  .strict();

export type WorkingDiagnosis = z.infer<typeof WorkingDiagnosisSchema>;
export type BlockedDiagnosis = z.infer<typeof BlockedDiagnosisSchema>;
export type WorkingDiagnosisV1 = z.infer<typeof WorkingDiagnosisV1Schema>;
export type WorkingDiagnosisResultV1 = z.infer<typeof WorkingDiagnosisResultV1Schema>;

export function normalizeWorkingDiagnosis(value: unknown): WorkingDiagnosisV1 {
  return WorkingDiagnosisV1Schema.parse(value);
}
