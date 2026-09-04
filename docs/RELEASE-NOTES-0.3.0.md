# 8gnc 0.3.0 Release Notes — Draft

## Working Diagnosis interface

Version 0.3.0 keeps the same 37-skill Brand Growth Diagnostic and adds an optional way to present its result in compatible Codex and ChatGPT hosts.

After the host has produced an evidence-backed working diagnosis, one read-only tool can render the result as a compact case file: the problem supplied, evidence and inferences, the primary constraint, the smallest useful route, and the decision that remains with the user. A complete Markdown version is always returned for hosts that do not render the interface.

The renderer does not diagnose the business, perform research, decide how long evidence remains useful, or verify that a claim is true. It validates and presents the structured diagnosis it is given. If provenance or a valid non-future as-of date is missing, the result must be blocked or rejected instead of filled with invented support.

## Platform behavior

- **Claude Code:** the same 37 skills, skills-only. No 8gnc MCP server is declared.
- **Codex:** 37 skills plus the staged read-only renderer connection.
- **ChatGPT:** directory submission may include the same renderer and interface after deployment and review.

## Privacy and safety

The renderer is stateless and authentication-free. It has no storage, analytics, telemetry, cookies, outbound fetches, CRM, email, sending, publishing, deployment, or private-system access. It cannot execute a recommendation or treat conversational approval as action authority.

## Release status

These notes describe staged source code. They do not announce a live endpoint, published tag, directory approval, or installation availability. Release requires final validation, a clean deterministic package, deployment verification, clean installs, updated public policies, and explicit publication approval.
