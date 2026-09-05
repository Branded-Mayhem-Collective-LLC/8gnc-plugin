import type { BlockedDiagnosis, WorkingDiagnosis, WorkingDiagnosisV1 } from "./schema";

const BOUNDARY =
  "Presents evidence supplied by the host, which may include lawful public sources. The renderer does not fetch sources or access CRM, email, publishing, or private systems.";

function escapeMarkdown(value: string): string {
  return value.replace(/([\\`*_{}\[\]()<>#+!|])/g, "\\$1");
}

function renderList(items: readonly string[]): string {
  return items.map((item) => `- ${escapeMarkdown(item)}`).join("\n");
}

function renderWorking(diagnosis: WorkingDiagnosis): string {
  const evidence = diagnosis.evidence
    .map(
      (item) =>
        `- **${item.kind === "observed" ? "Observed" : "Reported"} — ${escapeMarkdown(item.id)}:** ${escapeMarkdown(item.statement)}\n  - Provenance: ${escapeMarkdown(item.provenance)}\n  - As of: ${item.asOf}`
    )
    .join("\n");

  const inferences = diagnosis.inferences.length
    ? diagnosis.inferences
        .map(
          (item) =>
            `- ${escapeMarkdown(item.statement)} _(based on: ${item.basedOnEvidenceIds.map(escapeMarkdown).join(", ")})_`
        )
        .join("\n")
    : "- No inference was added beyond the supplied evidence.";

  const route = diagnosis.route.steps
    .map(
      (step, index) =>
        `${index + 1}. \`${step.method}\` — ${escapeMarkdown(step.purpose)}`
    )
    .join("\n");

  const artifact = diagnosis.artifact
    ? [
        "## Specialist artifact",
        "",
        `### ${escapeMarkdown(diagnosis.artifact.title)}`,
        "",
        `**Method:** \`${diagnosis.artifact.method}\``,
        "",
        escapeMarkdown(diagnosis.artifact.summary),
        "",
        ...diagnosis.artifact.items.map(
          (item) =>
            `- **${escapeMarkdown(item.label)}:** ${escapeMarkdown(item.detail)} _(based on: ${item.basedOnEvidenceIds.map(escapeMarkdown).join(", ")})_`
        ),
        ""
      ]
    : [];

  return [
    "# Working Diagnosis",
    "",
    "> Evidence-backed. Read-only. Nothing changes until you decide.",
    "",
    "## Input",
    "",
    escapeMarkdown(diagnosis.input.summary),
    "",
    "## Primary constraint",
    "",
    escapeMarkdown(diagnosis.primaryConstraint),
    "",
    `**Constraint evidence:** ${diagnosis.primaryConstraintEvidenceIds.map(escapeMarkdown).join(", ")}`,
    "",
    `**Confidence:** ${diagnosis.confidence}`,
    "",
    "## Evidence",
    "",
    evidence,
    "",
    "## Inferences",
    "",
    inferences,
    "",
    "## Open questions",
    "",
    renderList(diagnosis.unknowns),
    "",
    "## Smallest useful route",
    "",
    route,
    "",
    `**First move:** ${escapeMarkdown(diagnosis.route.firstMove)}`,
    "",
    ...artifact,
    "## Decision gate",
    "",
    escapeMarkdown(diagnosis.decisionGate.question),
    "",
    `_${BOUNDARY}_`
  ].join("\n");
}

function renderBlocked(diagnosis: BlockedDiagnosis): string {
  return [
    "# Working Diagnosis — Blocked",
    "",
    "> Evidence threshold not met. Read-only. Nothing changes until you decide.",
    "",
    "## Input",
    "",
    escapeMarkdown(diagnosis.input.summary),
    "",
    "## Why this is blocked",
    "",
    escapeMarkdown(diagnosis.reason),
    "",
    "## Evidence still needed",
    "",
    renderList(diagnosis.missingEvidence),
    "",
    "## Decision gate",
    "",
    escapeMarkdown(diagnosis.decisionGate.question),
    "",
    `_${BOUNDARY}_`
  ].join("\n");
}

export function renderWorkingDiagnosisMarkdown(diagnosis: WorkingDiagnosisV1): string {
  return diagnosis.status === "working" ? renderWorking(diagnosis) : renderBlocked(diagnosis);
}
