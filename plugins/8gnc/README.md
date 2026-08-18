# 8gnc

One diagnostic front door for the complete 8gnc method stack in ChatGPT and Codex.

Start with the problem. The `diagnose-brand-growth` skill identifies the primary constraint, distinguishes evidence from inference, and routes the work into the smallest useful sequence across brand, product, content, visibility, conversion, and sales.

## What is included

- 36 unique specialist skills adapted from the six existing public 8gnc packages
- one new diagnostic router
- pinned source provenance, MIT license texts, and original notices
- package-relative helpers and provider-neutral instructions

The public catalog counts `deep-research` in both Brandprint and Productprint. This package keeps one shared real copy, producing 37 installed skill folders: 36 specialists plus the router.

## Boundary

Version 0.1.0 is skills-only. It does not connect to a client portal, agentic website, CRM, approval system, or private intelligence layer. Authenticated client intelligence belongs in a later, separately governed MCP phase.

This plugin may draft and recommend. Approval of an artifact is not authorization to publish, deploy, send, purchase, or mutate an external system.

## Provenance and validation

Exact source revisions are in `sources.lock.json`; license texts are under `third_party/`.

From the plugin directory, run:

```bash
python3 scripts/validate_bundle.py
```
