# Repository Privacy Declaration

This declaration covers the public v0.3 8gnc plugin and renderer. The customer-facing policy is at <https://8gnc.io/products/8gnc/privacy>.

## Claude Code

The Claude marketplace entry exposes only the 37 local skills. Its source is the repository root, uses `strict: false`, and declares only `./plugins/8gnc/skills/`; the nested Codex `.mcp.json` is not at repository root and is not declared by the Claude marketplace or manifest. The publisher does not receive data merely because those skills are installed or invoked. Host behavior and any user-configured third-party service are governed by their respective terms.

## Codex and ChatGPT renderer

Compatible Codex and ChatGPT hosts may send a caller-supplied `WorkingDiagnosisV1` object to the public 8gnc MCP endpoint at <https://mcp.8gnc.io/mcp>. The service uses the object only to schema-validate, normalize, serialize, and present the same working diagnosis during that request.

The renderer code does not:

- require an account or authentication;
- store request or response bodies in a database or durable service;
- set cookies or use local or session storage;
- collect product analytics or telemetry;
- fetch URLs or enrich submitted information;
- access a CRM, mailbox, approval system, private client system, publishing system, or deployment system;
- send email, publish content, deploy software, purchase anything, or change external state.

## Sensitive data

Do not submit secrets, credentials, regulated records, raw client exports, or unnecessary personal information. Use a redacted summary when private evidence is relevant to a diagnosis.

## Infrastructure processing

The endpoint runs on Cloudflare Workers. The production configuration disables Workers observability, and the Worker emits no application logs. Cloudflare and the host application may still process transient network metadata according to their own terms. The release owner must keep the public policy aligned with the deployed configuration.

## Contact

Privacy questions: `hello@brandedmayhem.com`

Security reports: follow [SECURITY.md](../SECURITY.md).
