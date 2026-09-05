# Working Diagnosis Data Flow

This document describes the exact v0.3 Codex/ChatGPT renderer path. Claude Code does not use this path. Its marketplace entry uses the repository as its source with `strict: false` and explicitly exposes only `./plugins/8gnc/skills/`; the nested Codex `.mcp.json` is not at repository root and is not declared as a Claude component.

## Flow

1. The user supplies evidence to the host application.
2. The installed 8gnc skills help the host produce a `WorkingDiagnosisV1` result.
3. The host may call `render_working_diagnosis` with that complete structured result.
4. The 8gnc MCP endpoint schema-validates and normalizes the supplied fields.
5. The endpoint returns the normalized result as structured content and a complete Markdown fallback.
6. A compatible host may render the same result with `ui://8gnc/working-diagnosis/v2.html`.
7. The renderer request ends. The renderer keeps no durable copy and makes no downstream call.
8. If the user explicitly selects **Use this route**, **Challenge it**, or **Add evidence in chat**, the component sends a fixed follow-up message to the host conversation through the MCP Apps `ui/message` bridge. This does not call the renderer again or execute an external action.

```text
user evidence
    |
    v
host + 8gnc skills
    |
    | WorkingDiagnosisV1 only
    v
render_working_diagnosis
    |
    +--> structured result
    +--> complete Markdown fallback
    +--> optional inline UI resource
             |
             +--> explicit user click --> host conversation only
```

## Data sent to the renderer

The renderer receives only the fields in the tool call. Depending on the result state, those fields may include the user's problem summary, evidence statements, provenance labels, as-of dates, a primary constraint tied to evidence IDs, inferences tied to evidence IDs, unknowns, confidence, the smallest useful route, an optional caller-supplied specialist artifact, and a human decision gate. Every artifact item must cite at least one evidence ID from the same working result. Blocked results cannot contain an artifact.

Users and hosts should not place credentials, secrets, raw private exports, or unnecessary personal data in a diagnosis. Evidence can be summarized and redacted before the tool call.

## Validation is not truth verification

The renderer checks the structure, real non-future as-of dates, and internal references of the supplied object. This includes validating artifact evidence references and rejecting duplicate artifact labels. It does not independently verify the accuracy of a statement, determine how long evidence remains useful, browse a cited URL, contact a source, create the artifact, generate research, or certify a recommendation. Missing provenance or a valid as-of date must be represented as blocked or rejected, not silently filled.

## No downstream systems

The renderer has no authentication, database, durable object, KV namespace, queue, analytics service, telemetry collector, CRM, email provider, approval system, publishing system, deployment system, or private client integration. It performs no outbound fetches.

The UI uses no form submission, cookie, local storage, session storage, tracking pixel, analytics script, external asset request, or `tools/call` request. Its only outbound UI action is an explicit user-initiated `ui/message` to the host conversation.

## Retention

The application code does not retain tool inputs or outputs after the request. Cloudflare Workers observability is explicitly disabled in every checked-in Wrangler configuration, and the Worker emits no application logs. Cloudflare may still process transient platform metadata under its own terms. Any future logging or retention change requires an updated privacy declaration, security review, and explicit release approval.
