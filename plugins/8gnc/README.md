# 8gnc — Brand Growth Diagnostic

Find the constraint before you buy the tactic.

This is the distributable plugin directory shared by Claude Code, Codex, and the ChatGPT/Codex Plugins Directory. Its `skills/` tree contains one diagnostic router and 36 specialist skills.

## What it does

Start with the problem. `diagnose-brand-growth` names the primary constraint, distinguishes evidence from inference, and routes the work into the smallest useful sequence across brand, product, content, visibility, conversion, and sales.

## Boundary

Version 0.2.1 is skills-only. It does not connect to a client portal, agentic website, CRM, approval system, or private intelligence layer. It can use only evidence the user provides, files exposed by the current host, lawful public research, and locally configured credentials where a specialist explicitly supports them.

This plugin may draft and recommend. Approval of an artifact is not authorization to publish, deploy, send, purchase, or mutate an external system.

## Provenance and validation

Exact source revisions are in `sources.lock.json`; license texts are under `third_party/`.

From this directory, run:

```bash
python3 scripts/validate_bundle.py
```
