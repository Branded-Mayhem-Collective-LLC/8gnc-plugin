# 8gnc — Brand Growth Diagnostic

Find the constraint before you buy the tactic.

This distributable directory contains one diagnostic router and 36 specialist skills. Version 0.3.0 adds a Codex/ChatGPT connection to a single read-only Working Diagnosis renderer. Claude Code continues to install the same 37 skills without the MCP connection.

Claude's documented install uses the repository-root marketplace entry, which exposes only this directory's `skills/` path. Do not load this nested directory directly as a Claude plugin because it also contains the Codex-only `.mcp.json` declaration.

## What it does

Start with the problem. `diagnose-brand-growth` names the primary constraint, distinguishes evidence from inference, and routes the work into the smallest useful sequence across brand, product, content, visibility, conversion, and sales.

In a compatible Codex or ChatGPT host, `render_working_diagnosis` can present the completed result as a compact interactive case file. The text response remains complete when the host cannot display the interface.

## Runtime boundary

The 37 skills do the diagnostic work in the host. The remote renderer only schema-validates, normalizes, serializes, and presents a diagnosis already supplied in the tool call. It does not decide whether the diagnosis is true and it does not perform research.

The renderer is stateless and has:

- no authentication, cookies, browser persistence, analytics, or telemetry;
- no database or durable storage;
- no outbound fetches;
- no CRM, email, approval-system, publishing, sending, purchase, deployment, or private-system access.

The skills can use only evidence the user provides, files exposed by the current host, lawful public research, and locally configured credentials where a specialist explicitly supports them. The renderer receives only the structured diagnosis passed to it.

This plugin may draft and recommend. Approval of an artifact is not authorization to publish, deploy, send, purchase, or mutate an external system.

## Staged endpoint

The Codex manifest points to `https://mcp.8gnc.io/mcp`, the planned public release endpoint. The v0.3 implementation is staged in source; the endpoint must not be described as available until deployment and clean-install verification are complete.

## Provenance and validation

Exact source revisions are in `sources.lock.json`; license texts are under `third_party/`.

From this directory, run:

```bash
python3 scripts/validate_bundle.py
```
