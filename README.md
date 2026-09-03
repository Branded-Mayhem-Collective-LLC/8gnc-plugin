# 8gnc — Brand Growth Diagnostic

**Find the constraint before you buy the tactic.**

8gnc diagnoses what is actually blocking growth, separates evidence from assumption, and routes the work into the smallest useful method. Bring an unclear offer, a stalled brand, weak conversion, invisible search presence, or a sales motion that is not moving.

This repository packages the same 37-skill, skills-only plugin for Claude Code, Codex, and the ChatGPT/Codex Plugins Directory.

## Install

### Claude Code

```text
/plugin marketplace add Branded-Mayhem-Collective-LLC/8gnc-plugin
/plugin install 8gnc@8gnc
```

### Codex

```bash
codex plugin marketplace add Branded-Mayhem-Collective-LLC/8gnc-plugin --ref v0.2.1
codex plugin add 8gnc@8gnc
```

The ChatGPT/Codex directory version will appear after platform review. The direct installs above use the public, MIT-licensed source in this repository.

## Start with a problem

Try one of these:

- `Use 8gnc to diagnose what is actually blocking my brand before recommending a tactic.`
- `Use 8gnc to pressure-test our positioning against the market and show the white space.`
- `Use 8gnc to turn this product strategy into a decision-ready plan with risks and next steps.`

The `diagnose-brand-growth` router names one primary constraint, marks what is observed, reported, inferred, or unknown, and selects the shortest method sequence the evidence can support. If you explicitly request a specialist and have its inputs, 8gnc goes directly to that specialist.

## What is included

- 36 unique specialist skills adapted from six existing public 8gnc packages
- one `diagnose-brand-growth` router
- one shared `deep-research` engine
- pinned source provenance and original MIT notices
- provider-neutral instructions and package-relative helpers

The source packages historically counted `deep-research` in both Brandprint and Productprint. This bundle keeps one shared copy, producing 37 installed skill folders: 36 specialists plus the router.

## Public beta boundary

Version 0.2.1 is skills-only. It has no MCP server, hooks, bundled or publisher-operated authenticated integrations, or background service.

The plugin can use evidence you provide, files the current host makes available, lawful public research, and locally configured credentials when a specialist explicitly supports them. It cannot independently access a CRM, client portal, approval system, private intelligence layer, or other private account.

8gnc may draft and recommend. Approval of an artifact is not authorization to publish, deploy, send, purchase, or mutate an external system. Simulated audience reactions are not customer research, and speculative recommendations are not validated strategy.

Some specialist outputs depend on host capabilities. DataForSEO workflows require a compatible local runtime and your own DataForSEO credentials. PDF rendering may require local Python dependencies. The diagnostic router and the rest of the methods remain usable without those optional integrations.

## Validate and package

```bash
python3 plugins/8gnc/scripts/validate_bundle.py
claude plugin validate --strict .
python3 scripts/package_release.py
```

The packager requires a clean tracked tree, rejects unexpected or sensitive files, and writes a deterministic OpenAI upload archive plus its file manifest and SHA-256 checksum under `dist/`.

## Policies and support

- Website: <https://8gnc.io/products/8gnc>
- Privacy: <https://8gnc.io/products/8gnc/privacy>
- Terms: <https://8gnc.io/products/8gnc/terms>
- Support: <https://8gnc.io/products/8gnc/support>
- Security reports: [SECURITY.md](SECURITY.md)

## Source integrity

Every source repository and commit is recorded in [`plugins/8gnc/sources.lock.json`](plugins/8gnc/sources.lock.json). The source repositories remain independent and are not modified by this package. 8gnc and the adapted sources are distributed under the MIT License; original notices are preserved in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
