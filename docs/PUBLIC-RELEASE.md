# Public Beta Release Runbook

This runbook separates reversible release preparation from live publication.

## Preparation

1. Validate both plugin manifests, both marketplace files, all 37 skills, provenance, licenses, and the skills-only boundary.
2. Commit the final source tree on `codex/8gnc-public-beta`.
3. Run `python3 scripts/package_release.py` from the clean commit.
4. Verify the archive manifest and checksum and test the archive in clean Claude and Codex environments.
5. Confirm the website policy, support, and product URLs are ready to deploy.
6. Confirm the legacy successor notice points to the exact public repository and new product route.

## One-gate launch sequence

The exact approval phrase for these public actions is:

`approve 8gnc public beta launch`

After that approval:

1. Merge the prepared plugin branch while the repository is private.
2. Change `Branded-Mayhem-Collective-LLC/8gnc-plugin` to public.
3. Verify unauthenticated access to the README, license, source, and policy links.
4. Tag `v0.2.0` and publish the GitHub release with the OpenAI archive, file manifest, and checksum.
5. Install and smoke-test the public GitHub source in clean Claude and Codex environments.
6. Deploy the prepared website branch through the repository's production runbook and verify every public route and asset.
7. Publish the `contraband-marketplace` successor notice.
8. Submit the release to Claude Community and OpenAI review using `docs/SUBMISSION.md` and `docs/REVIEW-TESTS.md`.

Claude Community approval can make the reviewed plugin publicly discoverable after Anthropic's catalog sync. OpenAI review approval does not publish automatically.

## Separate OpenAI publication gate

After OpenAI approves the submission, publish it only after the exact phrase:

`approve OpenAI 8gnc publish`

## Local Codex migration

After a clean public Codex install works, install `8gnc@8gnc` on this station and validate it in a fresh task. Only then remove `8gnc@8gnc-local` and the `8gnc-local` marketplace registration.

## 90-day beta decision

Track platform installation or activation data when the host exposes it, install-command clicks by platform, optional feedback, weekly support time, and qualified inquiries that explicitly cite 8gnc.

Continue marketplace investment when the beta produces either 25 verified successful installations or completed diagnostic uses, or three qualified inquiries explicitly citing 8gnc, provided no high-severity issue remains unresolved and support stays at or below two hours per week.

If neither signal appears, keep the open-source plugin available, pause MCP expansion and additional marketplace investment, and revisit discovery and positioning.

## Rollback

- Before directory approval, withdraw or amend the submission rather than publishing a known issue.
- If the website deployment is defective, use the Cloudflare rollback procedure and keep the GitHub release available only if its package remains safe.
- If the plugin package has a material defect, mark the release as affected, publish a patched semver release, and do not silently replace the tagged archive.
