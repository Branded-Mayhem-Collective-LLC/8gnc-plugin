# 8gnc plugin

This repository is the additive ChatGPT and Codex package for 8gnc. It must not modify or replace the six public Claude plugin repositories it derives from.

## Boundaries

- Treat `plugins/8gnc/sources.lock.json` as the provenance contract.
- Preserve exactly 37 skill folders. Do not fork or rewrite the six public source repositories.
- Keep upstream adaptations inside this repository.
- Preserve the original MIT notices under `third_party/`.
- The approved v0.3 MCP surface is exactly one public, authentication-free, stateless renderer: `render_working_diagnosis`, with one MCP Apps resource at `ui://8gnc/working-diagnosis/v2.html`.
- The renderer may validate, normalize, serialize, and present a caller-supplied diagnosis. It must not generate or validate the truth of a diagnosis, perform research, fetch external URLs, or change state.
- Keep Claude skills-only. Do not add the MCP server, an app declaration, or hooks to the Claude manifest.
- Preserve the Claude marketplace isolation contract: repository-root source, `strict: false`, explicit `./plugins/8gnc/skills/` exposure, and no repository-root `.mcp.json`. Do not document the nested Codex directory as a direct Claude plugin path.
- Do not add authentication, storage, analytics, telemetry, cookies, browser persistence, CRM or email access, private-system access, outbound sending, publishing, or deployment capabilities without a new explicit contract and approval.
- Do not add Claude hooks as a requirement for core behavior. ChatGPT does not run them.
- Never claim access to client intelligence, approvals, or agentic websites unless an authenticated connection is actually present in the current runtime.
- Do not publish, submit, install, deploy, push, or mutate a live system without explicit operator approval.

## Validation

Run the bundle validator, the OpenAI plugin validator against `plugins/8gnc`, the skill validator against every skill folder, the MCP package checks, and the portability audit before handoff. The deterministic release packager must run only from a clean committed tree.
