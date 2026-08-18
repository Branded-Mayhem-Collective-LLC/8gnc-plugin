---
name: strategy-thesis-compiler
description: Use when all Productprint layers are complete and the user needs the final consulting-grade integrated strategy thesis — Layer 6 of the Productprint stack. Trigger when the user asks to compile the Productprint into a strategy thesis report, create the integrated strategy deliverable, generate a where-to-play how-to-win report, produce the consulting-grade thesis document, or finalize the strategy for a client or internal audience. Also trigger on "compile the thesis," "final strategy report," "integrated strategy deliverable," "strategy thesis document," "Productprint report," or "Layer 6." If the thesis-stress-test skill has just completed with a PROCEED decision, move directly into this skill without waiting for user confirmation.
---

# Strategy Thesis Compiler — Consulting-Grade Integrated Thesis Directive

Assemble all Productprint outputs (Layers 1–5) into a single, cohesive Integrated Strategy Thesis formatted to the standard of top-tier strategy consultancies (Strategy&, EY-Parthenon, Monitor Deloitte, KPMG Strategy). The report is not a summary — it is a synthesis. It resolves contradictions, builds arguments across layers, and delivers a document that a leadership team, board, or investor can act on.

## When NOT to Use

- **Layers are incomplete.** Layers 1–4 are required inputs. Layer 5 (Thesis Stress-Test) is strongly recommended. If Layer 5 is missing, the report must disclose that adversarial validation was not performed and surface the unvalidated load-bearing assumptions — do not compile silently around the gap.
- **Generating new strategy content.** This layer synthesizes what Layers 1–5 produced. If a section needs claims or evidence that do not exist upstream, run the missing layer — do not write it here.
- **Quick one-page summaries.** For a brief, pull the executive summary structure manually. This skill's floor output is 15–20 pages in rapid mode.
- **A REFINE verdict is pending from Layer 5.** Do not compile around an unresolved REFINE. The Assumption-Test Log section must expose the broken assumption and the constraint package — not present a failed thesis as validated.

## Chain Position

This is **Layer 6** — the terminal layer of the Productprint research stack. It consumes ALL upstream JSON (Layers 1–5):

1. **Core Strategic Truth** (Layer 1) → foundational tension sentence, tension map, JTBD seed, archetypes, lexicon
2. **Productprint Tier-A** (Layer 2) → 10 Playing-to-Win cascade elements with claim sheets
3. **Productprint Tier-B** (Layer 3) → strategic bets, Now/Next/Later roadmap, build/buy/partner, prioritization model, risk register
4. **Productprint Tier-C** (Layer 4) → positioning statement, product one-liner, bet narrative, strategy-on-a-page
5. **Thesis Stress-Test** (Layer 5) → assumption ledger, load-bearing assumptions, falsification findings, PROCEED/REFINE verdict
6. **Strategy Thesis Compiler** (this skill) → consulting-grade integrated strategy thesis deliverable

**No forward chain.** This is the terminal layer. Output is the deliverable.

## Variables to Resolve

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `skin` | Report packaging mode (`8gnc-public`, `client-deliverable`, or `internal`) | `internal` |
| `mode` | Output depth (`rapid`, `standard`, or `enterprise`) | `standard` |
| `client_name` | Who receives the report (may differ from product name) | `product_name` |
| `prepared_by` | Firm name for the cover page | *required* |
| `report_date` | Date for the cover page | Current month/year |
| `confidentiality` | Confidential / Internal / Public | Confidential |
| `include_roadmap` | Include Section 6 (Now/Next/Later roadmap) | `yes` |
| `include_financials` | Include Section 7 (economic model) | `yes` |
| `layer_outputs` | JSON outputs from Layers 1–5 | *required* |

## Skin Behavior

The `skin` parameter controls ONLY voice, styling, and packaging. Strategy content, section order, and evidence are identical across all skins. A skin must never alter what the strategy says, who it recommends playing, how it recommends winning, or which assumptions survived falsification. If you find yourself changing strategic content to match a skin, stop — that is a violation of this constraint.

| skin | voice | styling | packaging |
|------|-------|---------|-----------|
| `8gnc-public` | brand-neutral; "your firm" and "your product" as placeholders throughout; no internal BMC references | clear report styling; no proprietary framework labels in the output | self-contained deliverable for a self-directed operator; strip internal framework terminology (translate "Tier-A" to "strategy research," "JTBD" to "buyer outcome," etc.) |
| `client-deliverable` | BMC voice; direct, diagnosis-not-promise tone; no superlatives or urgency theater | client-branded header, footer, and cover; route to `branded-mayhem-pdf` skill if available for PDF generation | client-facing PDF or formatted markdown; references BMC as the preparing firm; appropriate for delivery to the client's leadership team |
| `internal` | terse operator memo style; framework terminology permitted; no translation layer needed | minimal formatting; no cover styling required | markdown output for the Productprint pipeline; retain all field names and source references for pipeline consumption |

**Reminder:** Skin changes voice, styling, and packaging ONLY. The thesis content — section order, strategic findings, evidence, and assumption-test log — is skin-invariant.

## Principles (Non-Negotiable)

1. **Synthesis over summary.** Do not paste layer outputs verbatim. Transform them into a coherent strategic narrative where each section builds on the previous one.
2. **Every claim traces to evidence.** If a claim appeared in Layers 1–5 with sources, those sources appear in the bibliography. No orphan claims.
3. **No JSON paste — assemble narrative prose.** Raw JSON has no place in any section of the report. Every layer output must be translated into narrative, exhibits, or structured tables. This discipline is non-negotiable across all skins.
4. **Exhibits do the heavy lifting.** Tables, matrices, and frameworks convey key findings at a glance. Narrative text explains what the exhibit means and what to do about it.
5. **Strategic recommendations are specific.** "Improve positioning" is not a recommendation. "Replace the homepage hero message with the product one-liner within 30 days" is a recommendation.
6. **Acknowledge uncertainty.** Confidence levels from upstream claim sheets carry forward. If evidence was thin, say so. If a recommendation is high-confidence, say that too.
7. **Client-appropriate language (non-internal skins).** The report must be readable by a C-suite executive who has never seen a Productprint. Translate all framework language into business language: no "Layer 2," "Sprint 4," "kill criterion," "JTBD seed," or "Tier-B" in client-deliverable or 8gnc-public output.
8. **Assumption-Test Log is mandatory.** Layer 5 results always appear. If Layer 5 was skipped, the section must say so plainly and list the unvalidated assumptions — never omit or minimize the gap.

## Report Structure

Follow the section order defined in `references/report-template.md`. The 10 sections plus cover and appendix are:

- **Cover Page**
- **Table of Contents**
- **Executive Summary** (all layers contribute; standalone-readable)
- **Section 1: Market Context** (Layer 1, Tier-A backbone + sizing)
- **Section 2: Core Strategic Truth** (Layer 1)
- **Section 3: Where-to-Play / How-to-Win Cascade** (Tier-A: winning_aspiration, where_to_play_map, how_to_win_hypothesis, segments_wtp, jtbd_outcomes)
- **Section 4: Competitive Moat & Capability Map** (Tier-A: competitive_capability_teardown, required_capabilities, differentiation_wedge)
- **Section 5: Positioning & One-Liner** (Tier-C: positioning_statement, product_one_liner)
- **Section 6: Prioritized Roadmap — Now/Next/Later** (Tier-B: roadmap_horizons, strategic_bets, build_buy_partner, prioritization_model; Tier-C: bet_narrative) — omit if `include_roadmap = no`
- **Section 7: Economic Model** (Tier-A: economic_engine, category_definition_sizing) — omit if `include_financials = no`
- **Section 8: Risk Register + Leading Indicators** (Tier-B: risk_register; Tier-C: strategy_on_a_page must_track)
- **Section 9: Assumption-Test Log** (Layer 5: assumption_ledger, load_bearing, falsification_findings, verdict)
- **Section 10: Source Bibliography** (all layers' sources)
- **Appendix** (optional)

For the full field mapping, exhibit specifications, and formatting standards, see `references/report-template.md`.

## Mode Adjustments

- **Rapid:** 15–20 pages. Executive summary + Sections 2, 3, 4, 5, 9. Simplified exhibits. Skip financial modeling and detailed roadmap (note both omissions in the executive summary).
- **Standard:** 25–35 pages. All 10 sections. Full exhibits. Economic model with ranges. Phased roadmap.
- **Enterprise:** 35–50+ pages. All 10 sections expanded. Add: sensitivity analysis, scenario modeling, board-ready executive brief (2-page standalone), cross-segment risk variants, competitive monitoring plan.

## Quality Checks (Run Before Finalizing)

- [ ] Every section traces to specific upstream field names — no orphan sections
- [ ] Every exhibit has a number, title, and is referenced in the narrative text
- [ ] Executive summary stands alone — full picture without reading further
- [ ] No framework jargon in client-deliverable or 8gnc-public skin (translate all Productprint terminology)
- [ ] No JSON pasted raw into any section — all outputs translated into narrative and exhibits
- [ ] Economic projections include ranges and explicit inputs — no point estimates
- [ ] Assumption-Test Log section is present; if Layer 5 was skipped, the disclosure is explicit
- [ ] Source bibliography is complete — all sources from Layers 1–5 present
- [ ] The skin has NOT altered strategy content, section order, or evidence — only voice, styling, and packaging
- [ ] The report reads as a single coherent document, not a stack of layer outputs

## What NOT to Do

- Do not paste JSON outputs into the report. Transform everything into narrative and exhibits.
- Do not use Productprint layer or sprint terminology in client-deliverable or 8gnc-public skin output. Translate to business language.
- Do not present recommendations without an evidence chain.
- Do not include financial projections without explicit ranges and stated assumptions.
- Do not compile around a REFINE verdict. If Layer 5 said REFINE, the Assumption-Test Log must expose the broken assumption and constraint package.
- Do not let skin selection alter the strategy. Skin touches voice, styling, and packaging only.
- Do not create a report shorter than 15 pages in rapid mode or 25 pages in standard mode. This is a comprehensive strategic deliverable.
- Do not invent market data to fill Section 1. If the Tier-A Backbone did not collect it, mark the gap.
- Do not reference an exhibit that is not in the document, or include an exhibit the narrative never mentions.

## Output Format

Deliver as:
1. **Markdown document** — full report in clean markdown suitable for conversion to PDF or DOCX
2. **If `skin = client-deliverable` and the `branded-mayhem-pdf` skill is available** — offer to generate a formatted client PDF after markdown is approved
3. **If `skin = internal` and operating in orchestrated mode** — write the markdown to the engagement path provided by the dispatch prompt (`.productprint/engagements/{slug}/pass-N/layer6-thesis.md`)

The report must be immediately presentable to its target audience without additional editing beyond skin-appropriate formatting.

## File I/O Contract (orchestrated mode)

> **Note:** automated orchestrated mode is not included in this release; run the manual chain. This contract is a forward-looking specification.

When an authorized orchestrator provides explicit paths, honor them exactly:

- **Seed inputs:** read ONLY the JSON files listed in the dispatch prompt (Layers 1–5 output files).
- **Output:** write the compiled report to the exact path given (`.productprint/engagements/{slug}/pass-N/layer6-thesis.md`). No other location.
- **Return value:** your final message is the output path plus the verdict carried forward from Layer 5 — not the full report text. The orchestrator reads files, not transcripts.

When invoked as a direct skill call, present the full report in conversation and offer PDF generation only when a supported document workflow is available.

## Evaluation Rubric

1. **Synthesis quality** — The report reads as one coherent narrative, not six layer outputs stapled together
2. **Evidence density** — Every recommendation traces to cited evidence from upstream layers
3. **Exhibit quality** — Tables and frameworks convey findings at a glance; no orphan exhibits
4. **Actionability** — Recommendations are specific enough to execute without additional interpretation
5. **Professional standard** — Formatting, tone, and depth match top-tier strategy consultancy deliverables
6. **Standalone executive summary** — A reader who skips everything except the exec summary still gets the full strategic picture
7. **Assumption-Test Log integrity** — Layer 5 results are faithfully represented; PROCEED is backed by falsification records; REFINE exposes the constraint package
8. **Skin discipline** — Voice, styling, and packaging match the selected skin; strategy content is skin-invariant
