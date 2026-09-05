# 8gnc Working Diagnosis MCP

This package is the stateless presentation boundary for the 8gnc plugin. The
37 packaged skills perform the diagnosis. This server accepts a completed
`WorkingDiagnosisV1`, validates its shape and evidence references, and returns
the same result as structured data, complete Markdown, and an optional MCP Apps
interface. A working result may contain one caller-supplied specialist artifact;
each artifact item must refer to evidence in that same result.

It does not fetch data, decide whether a diagnosis is correct, access private
systems, identify a user, persist state, send email, write CRM records, publish,
or deploy anything.

The inline component can send a fixed, user-initiated follow-up prompt to the
host conversation through `ui/message` when the user chooses to use or challenge
the route. It does not call a server tool or execute the recommendation.

## Contract

- Streamable HTTP route: `/mcp`
- Tool: `render_working_diagnosis`
- UI resource: `ui://8gnc/working-diagnosis/v2.html`
- Input: `WorkingDiagnosisV1` with `working` and `blocked` variants and an optional artifact on working results only
- Output: `{ diagnosis, markdown }`
- Safety hints: read-only, non-destructive, closed-world

Every factual evidence item in a working result requires a human-readable
provenance label and an `asOf` date. The primary constraint, every inference,
and every artifact item must refer to existing evidence IDs. The renderer
presents but does not create or truth-verify the artifact. Missing evidence
should be represented by the `blocked` variant, not fabricated.

## Local checks

Run these commands on the registered remote development plane, never on DriveB:

```bash
npm ci
npm run check
npm run dev -- --ip 127.0.0.1 --port 4358
```

The private preview is then available to an SSH tunnel at
`http://127.0.0.1:4358/mcp`.

## Deployment boundary

The production target is `https://mcp.8gnc.io/mcp`, but adding that URL to the
plugin manifest does not make it live. Production deployment, DNS/custom-domain
changes, marketplace rescanning, plugin publication, and website promotion are
separate approval-gated steps.

## Privacy boundary

The server has no authentication, durable storage, analytics, cookies, local
storage, external API calls, or customer-system integrations. Tool input is
processed only to validate and serialize the response for the current request.
