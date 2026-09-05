# 8gnc 0.3.0 Release Runbook

This runbook separates reversible release preparation from deployment and public publication. The v0.3 implementation pass does not itself authorize a commit, push, deployment, marketplace update, website switch, or announcement.

## Release invariants

- Exactly 37 skill folders remain unchanged in source count and provenance.
- Claude Code remains skills-only: its marketplace entry uses `source: "./"`, `strict: false`, and `skills: "./plugins/8gnc/skills/"`, with no MCP declaration or root `.mcp.json`.
- Codex/ChatGPT declare exactly one MCP server, `eightgnc`, at `https://mcp.8gnc.io/mcp`.
- The server exposes exactly one read-only tool, `render_working_diagnosis`, and one UI resource, `ui://8gnc/working-diagnosis/v2.html`.
- The renderer schema-validates, normalizes, serializes, and presents a caller-supplied diagnosis and optional evidence-linked specialist artifact; it does not perform diagnosis, create the artifact, truth-verify claims, or perform research.
- The server has no authentication, storage, analytics, telemetry, cookies, outbound fetches, CRM, email, sending, publishing, deployment, or private-system access.
- Structured content and the Markdown fallback carry the complete user-facing result, including the artifact when supplied. UI metadata is presentation-only.

## Preparation

1. Confirm the source tree contains exactly 37 skills, the pinned `sources.lock.json`, licenses, and third-party notices.
2. Run the bundle validator and the OpenAI plugin validator against `plugins/8gnc`.
3. Run the skill validator against every skill folder.
4. Run `npm --prefix mcp run check` on the registered remote execution plane.
5. Run `claude plugin validate --strict .`; confirm the Claude marketplace entry exposes only `./plugins/8gnc/skills/`, the Claude manifest has no MCP declaration, and no `.mcp.json` exists at the repository root.
6. Start a loopback-only Worker preview on the registered execution plane and test MCP initialization, tool discovery, resource discovery, valid working and blocked results, artifact evidence-reference validation, schema rejection, and the Markdown fallback.
7. Inspect the rendered UI at desktop and mobile widths, with keyboard navigation and reduced motion.
8. Verify the renderer performs no outbound request and uses no storage, cookie, analytics, telemetry, form submission, or browser persistence.
9. Perform repository and history secret/privacy scans.
10. Commit the final source tree only after implementation review.
11. From that clean commit, run `python3 scripts/package_release.py`; compare the archive manifest with the distributable source tree and verify the checksum.
12. Confirm the public privacy, terms, support, and product pages match the deployed behavior before any submission or promotion.

## Deployment gate

A separate explicit approval is required before creating the public Worker, DNS route, or release deployment.

After approval:

1. Deploy the exact reviewed Worker build to the staging environment.
2. Re-run the MCP and UI tests against staging.
3. Verify logging and retention configuration against `docs/PRIVACY.md` and `docs/DATA-FLOW.md`.
4. Deploy the same reviewed revision to the production Worker.
5. Create or verify the `mcp.8gnc.io` route and TLS.
6. Test `https://mcp.8gnc.io/mcp` from an unauthenticated clean client.

Do not merge or publish a plugin manifest that points users to an unavailable endpoint.

## Publication gate

A separate explicit approval is required before the v0.3 tag, GitHub release, directory update, website switch, or public announcement.

After approval:

1. Merge the reviewed source and tag `v0.3.0` without replacing existing tags or assets.
2. Publish the deterministic OpenAI archive, file manifest, and checksum.
3. Test clean Claude and Codex installs from the tag.
4. Confirm Claude loads the 37 skills without the MCP server.
5. Confirm Codex loads the same 37 skills and the single renderer.
6. Submit or update the OpenAI directory entry with the exact reviewed release and policies.
7. Keep Anthropic copy skills-only; do not imply that Claude runs the renderer.
8. Update and verify the product page only after the public install works.

Directory approval and publication remain separate platform actions. Do not describe review, approval, catalog placement, or timing as guaranteed.

## Rollback

- If the production endpoint is defective, withdraw the v0.3 directory update and use the Worker rollback procedure. Keep v0.2.1 installation instructions available.
- If the package has a material defect, mark v0.3.0 as affected and publish a patched semver release; never silently replace a tagged archive.
- If privacy behavior differs from the declaration, disable the endpoint, preserve evidence, correct the public policy, and complete security review before restoration.
