# Marketplace Submission Packet

Use this document as the canonical copy source for a future 0.3.0 OpenAI update and the skills-only Claude listing. This is staged copy, not evidence that an endpoint is deployed or a submission has been filed.

## Identity

- **Plugin name:** 8gnc — Brand Growth Diagnostic
- **Technical identifier:** `8gnc`
- **Developer:** Branded Mayhem Collective LLC
- **Version:** 0.3.0
- **Release stage:** Public Beta
- **Category:** Productivity
- **License:** MIT
- **Repository:** <https://github.com/Branded-Mayhem-Collective-LLC/8gnc-plugin>
- **Website:** <https://8gnc.io/products/8gnc>
- **Support:** <https://8gnc.io/products/8gnc/support>
- **Privacy:** <https://8gnc.io/products/8gnc/privacy>
- **Terms:** <https://8gnc.io/products/8gnc/terms>
- **Availability:** All countries and regions supported by the host platform

## Listing copy

### Headline

Find the constraint before you buy the tactic.

### Short description

Diagnose what is actually blocking growth, separate evidence from assumption, and route the work into the smallest useful method.

### Long description

Bring an unclear offer, a stalled brand, weak conversion, invisible search presence, or a sales motion that is not moving. 8gnc identifies one primary constraint, labels evidence and uncertainty, and routes the work into the smallest useful sequence across brand strategy, product strategy, content and voice, search and AI visibility, conversion, and sales practice.

In compatible Codex and ChatGPT hosts, 8gnc can present the completed result as a read-only Working Diagnosis case file. The interface shows the supplied problem, evidence and inferences, the primary constraint, the smallest useful route, and the human decision gate. A complete Markdown result remains available without the interface.

8gnc cannot access private client systems, approve work, send email, publish, purchase, deploy, or change external state. The renderer does not perform research or determine whether a diagnosis is true; it validates and presents the structured result supplied by the host.

### Starter prompts

1. Use 8gnc to diagnose what is actually blocking my brand before recommending a tactic.
2. Pressure-test our positioning against the market and show me the evidence and the white space.
3. Turn this product strategy into a decision-ready plan with risks, gaps, and next steps.

## OpenAI implementation declaration

- Submission type: **Skills plus MCP Apps UI**
- Installed skill folders: **37**
- MCP servers: **One planned public HTTP endpoint**
- Tools: **One — `render_working_diagnosis`**
- UI resources: **One — `ui://8gnc/working-diagnosis/v1.html`**
- Tool properties: **read-only, non-destructive, closed-world**
- Authentication: **None**
- Publisher-operated durable storage: **None**
- Product analytics or telemetry: **None**
- Outbound server fetches: **None**
- Reviewer credentials: **Not required**

The endpoint is `https://mcp.8gnc.io/mcp`. Do not submit or attest that it is operational until production deployment and unauthenticated clean-client verification are complete.

## Claude implementation declaration

- Installed skill folders: **37**
- MCP servers: **None declared in the Claude plugin**
- Hooks: **None**
- Publisher-operated data collection from skill use: **None**

The Claude marketplace entry uses the repository as its source with `strict: false` and explicitly exposes only `./plugins/8gnc/skills/`. The nested Codex `.mcp.json` is not at repository root and is not declared as a Claude component. Do not load `plugins/8gnc` directly as a Claude plugin or imply that Claude runs the Working Diagnosis renderer in v0.3.

## Release notes

Version 0.3.0 preserves the 37-skill Brand Growth Diagnostic and adds one optional read-only Working Diagnosis renderer for compatible Codex and ChatGPT hosts. It returns the same evidence-backed result as structured content and complete Markdown, with an MCP Apps case-file interface when supported. Claude Code remains skills-only. The renderer is stateless, requires no account, makes no outbound request, and cannot access private systems or execute recommendations.

## Submission checks

1. Verify the production endpoint and exact tool/resource inventory.
2. Verify the public privacy, support, terms, and website pages match the deployed behavior.
3. Upload `dist/8gnc-0.3.0-openai.zip` only from the clean reviewed commit.
4. Compare the generated manifest, file manifest, and checksum with the tagged source.
5. Run every case in `docs/REVIEW-TESTS.md` in a clean environment.
6. Submit only after the required platform attestations are accurate for the deployed release.

Directory approval does not guarantee or automatically perform publication. Treat review, publication, and discoverability as separate platform-controlled states.
