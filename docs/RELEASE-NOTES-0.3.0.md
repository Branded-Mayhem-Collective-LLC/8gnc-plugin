# 8gnc 0.3.0 Release Notes

## Working Diagnosis interface

Version 0.3.0 keeps the same 37-skill Brand Growth Diagnostic and adds an optional way to present its result in compatible Codex and ChatGPT hosts.

After the host has produced an evidence-backed working diagnosis, one read-only tool can render the result as a focused inline card. It leads with one primary constraint and one first move; evidence, inference, uncertainty, and an optional caller-supplied specialist output remain available through progressive disclosure. The user can ask the host conversation to use or challenge the route, while the renderer remains unable to execute the recommendation or change an external system. A complete Markdown version is always returned for hosts that do not render the interface.

The renderer does not diagnose the business, perform research, create the specialist artifact, decide how long evidence remains useful, or verify that a claim is true. It schema-validates, normalizes, serializes, and presents the structured diagnosis it is given. The primary constraint, every inference, and every artifact item must cite known evidence IDs. If required evidence, provenance, or a valid non-future as-of date is missing, the result must be blocked or rejected instead of filled with invented support.

## Platform behavior

- **Claude Code:** the same 37 skills, skills-only. No 8gnc MCP server is declared.
- **Codex:** 37 skills plus the live read-only renderer connection.
- **ChatGPT:** the same renderer and interface are ready for directory review; availability remains subject to OpenAI review.

## Privacy and safety

The renderer is stateless and authentication-free. It has no storage, analytics, telemetry, cookies, outbound fetches, CRM, email, sending, publishing, deployment, or private-system access. It cannot execute a recommendation or treat conversational approval as action authority.

## Release status

Version 0.3.0 is the current public beta. The production endpoint is live at <https://mcp.8gnc.io/mcp>. Directory approval and discoverability remain separate platform-controlled states.
