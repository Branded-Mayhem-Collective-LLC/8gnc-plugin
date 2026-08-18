# 8gnc plugin

This repository is the additive ChatGPT and Codex package for 8gnc. It must not modify or replace the six public Claude plugin repositories it derives from.

## Boundaries

- Treat `plugins/8gnc/sources.lock.json` as the provenance contract.
- Keep upstream adaptations inside this repository.
- Preserve the original MIT notices under `third_party/`.
- Keep the plugin skills-only until an authenticated remote MCP contract is separately designed and approved.
- Do not add Claude hooks as a requirement for core behavior. ChatGPT does not run them.
- Never claim access to client intelligence, approvals, or agentic websites unless an authenticated connection is actually present in the current runtime.
- Do not publish, submit, install, deploy, push, or mutate a live system without explicit operator approval.

## Validation

Run the OpenAI plugin validator against `plugins/8gnc`, the skill validator against every skill folder, and the portability audit before handoff.
