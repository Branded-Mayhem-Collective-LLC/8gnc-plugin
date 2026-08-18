---
name: deep-research
description: Use when a task needs enterprise-grade research across many sources with citation tracking and verification. Triggers on "deep research", "comprehensive analysis", "research report", "compare X vs Y", "analyze trends", or "state of the art". Not for simple lookups, debugging, or questions answerable with 1-2 searches.
---

# Deep Research

## Core Purpose

Deliver citation-backed, verified research reports through a structured pipeline with source credibility scoring, evidence persistence, and progressive context management.

**Autonomy Principle:** Operate independently. Infer assumptions from context. Only stop for critical errors or incomprehensible queries.

---

## Decision Tree

```
Request Analysis
+-- Simple lookup? --> STOP: Use the available current web-search tool
+-- Debugging? --> STOP: Use standard tools
+-- Complex analysis needed? --> CONTINUE

Mode Selection
+-- Initial exploration --> quick (3 phases, 2-5 min)
+-- Standard research --> standard (6 phases, 5-10 min) [DEFAULT]
+-- Critical decision --> deep (8 phases, 10-20 min)
+-- Comprehensive review --> ultradeep (8+ phases, 20-45 min)
```

**Default assumptions:** Technical query = technical audience. Comparison = balanced perspective. Trend = recent 1-2 years.

---

## Workflow Overview

| Phase | Name | Quick | Standard | Deep | UltraDeep |
|-------|------|-------|----------|------|-----------|
| 1 | SCOPE | Y | Y | Y | Y |
| 2 | PLAN | - | Y | Y | Y |
| 3 | RETRIEVE | Y | Y | Y | Y |
| 4 | TRIANGULATE | - | Y | Y | Y |
| 4.5 | OUTLINE REFINEMENT | - | Y | Y | Y |
| 5 | SYNTHESIZE | - | Y | Y | Y |
| 6 | CRITIQUE | - | - | Y | Y |
| 7 | REFINE | - | - | Y | Y |
| 8 | PACKAGE | Y | Y | Y | Y |

---

## File locations (read this first)

Choose behavior based on the current execution surface:

| Context | Helper execution | Report destination |
|---|---|---|
| Codex with local file and shell access | Resolve the installed `deep-research` skill directory from this loaded `SKILL.md`; call helpers from its `scripts/` directory | A user-approved workspace path such as `./research-output/[topic]-YYYYMMDD/` |
| ChatGPT or another surface without local shell access | Do not claim that bundled scripts ran | Return the report in conversation or through the supported downloadable-file workflow |

Never write into a home directory or external system without the user's authorization.

## Execution

**On invocation, load relevant reference files** (relative paths from this SKILL.md, which work on both surfaces):

1. **Phase 1-7:** Load [methodology.md](./reference/methodology.md) for detailed phase instructions
2. **Phase 8 (Report):** Load [report-assembly.md](./reference/report-assembly.md) for progressive generation
3. **HTML/PDF output:** Load [html-generation.md](./reference/html-generation.md)
4. **Quality checks:** Load [quality-gates.md](./reference/quality-gates.md)
5. **Long reports (>18K words):** Load [continuation.md](./reference/continuation.md)

**Templates:**
- Report structure: [report_template.md](./templates/report_template.md)
- HTML styling: [mckinsey_report_template.html](./templates/mckinsey_report_template.html)

**Scripts:** on a local execution surface, resolve the installed skill directory first and use absolute package-relative paths:

- `python3 [skill-dir]/scripts/validate_report.py --report [path]`
- `python3 [skill-dir]/scripts/verify_citations.py --report [path]`
- `python3 [skill-dir]/scripts/md_to_html.py [markdown_path]`

If local execution is unavailable, apply the same checks manually and disclose that the bundled validators did not run.

---

## Output Contract

**Required sections:**
- Executive Summary (200-400 words)
- Introduction (scope, methodology, assumptions)
- Main Analysis (4-8 findings, 600-2,000 words each, cited)
- Synthesis & Insights (patterns, implications)
- Limitations & Caveats
- Recommendations
- Bibliography (COMPLETE - every citation, no placeholders)
- Methodology Appendix

**Output files** — use the destination contract above. Produce:
- Markdown (primary source)
- HTML when the current surface can create it
- PDF when a supported PDF workflow or WeasyPrint is available

**Quality standards:**
- 10+ sources, 3+ per major claim
- All claims cited immediately [N]
- No placeholders, no fabricated citations
- Prose-first (>=80%), bullets sparingly

---

## Common Mistakes

- **Running deep/ultradeep for a question one search answers** — burns 10-45 minutes for no added confidence. Walk the decision tree first; simple lookup means STOP.
- **Citing a major claim from a single source** — fails the 3+ sources standard and ships unverified assertions. Triangulate, or downgrade the claim and say so in Limitations.
- **Leaving placeholder or uncited entries in the bibliography** — `validate_report.py` rejects it, and a client who checks one dead citation distrusts the whole report. Every [N] must resolve.
- **Writing bullet-heavy sections** — violates the prose-first (>=80%) contract and reads as notes, not analysis. Convert findings to narrative; bullets only for genuine lists.
- **Skipping `verify_citations.py` before packaging** — fabricated or dead links reach the reader. Run it on every report, every time.

## When to Use / NOT Use

**Use:** Comprehensive analysis, technology comparisons, state-of-the-art reviews, multi-perspective investigation, market analysis.

**Do NOT use:** Simple lookups, debugging, 1-2 search answers, quick time-sensitive queries.
