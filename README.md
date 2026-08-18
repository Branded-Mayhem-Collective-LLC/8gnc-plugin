# 8gnc for ChatGPT and Codex

One diagnostic front door for the complete 8gnc method stack.

The plugin starts with the user's problem, identifies the primary constraint, and routes the work into the smallest useful sequence across brand strategy, product strategy, content, search and AI visibility, conversion, and sales.

## What is included

- 36 unique specialist skills from the six existing public 8gnc packages
- one new `diagnose-brand-growth` router
- the shared `deep-research` engine used by both Brandprint and Productprint
- pinned source provenance and original MIT notices
- provider-neutral instructions for ChatGPT and Codex

The existing storefront calls the six-package catalog “37 skills.” That count includes `deep-research` once in Brandprint and once in Productprint. This package preserves one real shared copy, so the installed plugin contains 37 folders total: 36 specialists plus the router.

## Current boundary

Version 0.1.0 is skills-only. It does not connect to a client portal, agentic website, approval system, CRM, or private intelligence layer. It uses user-provided files, the current workspace, lawful public research, and locally configured credentials where a specialist skill explicitly supports them.

Authenticated client intelligence belongs in a later remote MCP phase with explicit authorization, entity scoping, approval semantics, and auditability.

## Local review

The repo-local marketplace is at `.agents/plugins/marketplace.json`. The project has not been added to Codex configuration or installed in ChatGPT. Review and validate the package before registering that marketplace.

Official OpenAI guidance requires a `.codex-plugin/plugin.json`, provider-neutral skill instructions, package-relative helpers, and a workflow that does not depend on hooks in ChatGPT: <https://developers.openai.com/plugins/guides/submit-claude-plugin>.

## Source integrity

Every source repository and commit is recorded in `plugins/8gnc/sources.lock.json`. The original repositories are not edited by this project.
