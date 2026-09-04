# Security Policy

## Supported version

Security fixes are applied to the latest tagged public release. Version 0.3.0 is the current supported public beta.

## Report a vulnerability

Email `hello@brandedmayhem.com` with the subject `8gnc security report`.

Include the affected version, skill, renderer, or file involved, reproduction steps, and impact. Do not include real credentials, client data, private account exports, or other sensitive material. We will acknowledge a reproducible report within five business days and coordinate disclosure after a fix is available.

## Runtime boundary

The Claude distribution is skills-only. The v0.3 Codex/ChatGPT distribution declares one publisher-operated MCP endpoint containing one read-only renderer tool and one UI resource.

The renderer is stateless. It does not authenticate users, retain request bodies, set cookies, persist browser state, collect analytics or telemetry, fetch external URLs, or connect to CRM, email, approval, publishing, sending, deployment, or private systems. It schema-validates, normalizes, serializes, and presents the structured diagnosis supplied in the request; it does not validate the truth of the diagnosis.

Individual host applications and optional user-configured third-party research services remain governed by their own security and privacy terms.
