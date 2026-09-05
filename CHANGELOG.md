# Changelog

## 0.3.0 — Working Diagnosis interface

- Preserves the exact 37-skill implementation and pinned source provenance.
- Adds one Codex/ChatGPT MCP declaration for the public `https://mcp.8gnc.io/mcp` endpoint.
- Adds one read-only `render_working_diagnosis` tool and one MCP Apps resource for a focused inline Working Diagnosis.
- Adds an optional caller-supplied, evidence-linked specialist artifact and a four-frame gallery showing the diagnosis, supporting evidence, supplied output, and the evidence-required state.
- Uses the shared 8gnc React component library for the card, badges, buttons, separator, and disclosure controls, with only a thin token-driven brand layer.
- Keeps the text response complete when a host does not render the interface.
- Keeps Claude Code skills-only with no MCP declaration.
- Establishes a stateless boundary: no authentication, storage, analytics, telemetry, cookies, outbound fetches, CRM, email, sending, publishing, deployment, or private-system access.
- Adds v0.3 privacy, data-flow, review, submission, and release documentation.

The production endpoint and GitHub release are public. Directory availability remains controlled separately by each host platform.

## 0.2.1 — Directory asset compatibility

- Gives the icon and logo square SVG canvases required by the OpenAI plugin directory.
- Preserves the existing artwork, 37-skill implementation, permissions, and data-handling boundary.

## 0.2.0 — Public Beta

- Adds a Claude Code plugin manifest and public marketplace.
- Publishes matching Claude and Codex metadata under the `8gnc` identifier.
- Positions the bundle as **8gnc — Brand Growth Diagnostic**.
- Adds public support, security, submission, and reviewer documentation.
- Adds deterministic OpenAI archive packaging with manifest and checksum output.
- Reframes the humanize method around voice fidelity and generic-model pattern removal without detector-evasion claims.
- Preserves the same skills-only 37-folder implementation and pinned source provenance.

## 0.1.0 — Local Review

- Combined 36 unique specialist skills from the six public 8gnc packages.
- Added the `diagnose-brand-growth` router.
- Added provider-neutral validation and source provenance.
