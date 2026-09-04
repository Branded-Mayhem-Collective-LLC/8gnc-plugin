# 8gnc — Brand Growth Diagnostic

**Find the constraint before you buy the tactic.**

8gnc diagnoses what is actually blocking growth, separates evidence from assumption, and routes the work into the smallest useful method. Bring an unclear offer, a stalled brand, weak conversion, invisible search presence, or a sales motion that is not moving.

Version 0.3.0 keeps the exact 37-skill implementation and adds one optional, read-only Working Diagnosis renderer for compatible Codex and ChatGPT hosts. Claude Code remains skills-only.

## Release status

Version 0.3.0 is the current public beta. The read-only renderer is live at `https://mcp.8gnc.io/mcp` and was verified from an unauthenticated clean client before publication.

## Install

### Claude Code

```text
/plugin marketplace add Branded-Mayhem-Collective-LLC/8gnc-plugin
/plugin install 8gnc@8gnc
```

Claude installs the 37 skills without the MCP renderer. The Claude marketplace entry deliberately uses the repository root as its source and exposes only `./plugins/8gnc/skills/`. Do not load `plugins/8gnc` directly as a Claude plugin: that nested directory also contains the Codex-only `.mcp.json` declaration.

### Codex

```bash
codex plugin marketplace add Branded-Mayhem-Collective-LLC/8gnc-plugin --ref v0.3.0
codex plugin add 8gnc@8gnc
```

Codex installs the same skills plus the declared read-only renderer connection. ChatGPT directory availability remains subject to platform review.

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
- one Codex/ChatGPT MCP declaration for `render_working_diagnosis`
- one MCP Apps UI resource at `ui://8gnc/working-diagnosis/v1.html`
- pinned source provenance and original MIT notices
- provider-neutral instructions and package-relative helpers

The source packages historically counted `deep-research` in both Brandprint and Productprint. This bundle keeps one shared copy, producing 37 installed skill folders: 36 specialists plus the router.

## What the renderer does

The 37 skills do the diagnostic work in the host. The remote renderer receives a caller-supplied `WorkingDiagnosisV1`, schema-validates and normalizes it, returns a complete Markdown fallback, and can present the same result as an interactive case file.

The renderer does not determine whether a diagnosis is true, decide how long evidence remains useful, perform research, fetch external URLs, or generate missing evidence. Missing provenance or a valid non-future as-of date must produce a blocked result or schema error rather than invented support.

## Runtime boundary

The renderer is stateless and has no authentication, database, durable storage, analytics, telemetry, cookies, browser persistence, or outbound network fetches. It has no CRM, email, approval-system, publishing, sending, purchase, deployment, or private-system access.

The skills can use evidence you provide, files the current host makes available, lawful public research, and locally configured credentials when a specialist explicitly supports them. Those host-side capabilities are separate from the renderer.

8gnc may draft and recommend. Approval of an artifact is not authorization to publish, deploy, send, purchase, or mutate an external system. Simulated audience reactions are not customer research, and speculative recommendations are not validated strategy.

## Validate and package

```bash
python3 plugins/8gnc/scripts/validate_bundle.py
npm --prefix mcp run check
claude plugin validate --strict .
python3 scripts/package_release.py
```

The packager requires a clean tracked tree, rejects unexpected or sensitive files, and writes a deterministic OpenAI upload archive plus its file manifest and SHA-256 checksum under `dist/`. It packages the distributable plugin declaration, not the separately deployed Worker source.

## Policies and support

- Data flow: [docs/DATA-FLOW.md](docs/DATA-FLOW.md)
- Repository privacy declaration: [docs/PRIVACY.md](docs/PRIVACY.md)
- Website: <https://8gnc.io/products/8gnc>
- Privacy: <https://8gnc.io/products/8gnc/privacy>
- Terms: <https://8gnc.io/products/8gnc/terms>
- Support: <https://8gnc.io/products/8gnc/support>
- Security reports: [SECURITY.md](SECURITY.md)

## Source integrity

Every source repository and commit is recorded in [`plugins/8gnc/sources.lock.json`](plugins/8gnc/sources.lock.json). The source repositories remain independent and are not modified by this package. 8gnc and the adapted sources are distributed under the MIT License; original notices are preserved in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
