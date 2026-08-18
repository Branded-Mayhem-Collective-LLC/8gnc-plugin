---
name: brand-strategy-compiler
description: Use when all Brandprint layers (Core Human Truth through Competitive Audit) are complete and the user needs the final client-ready deliverable — Layer 6 of the Brandprint research stack. Trigger when the user asks to compile the Brandprint into a final report, create a client deliverable, generate a strategy document, or produce a consulting-grade brand report. Also trigger on "compile report," "final deliverable," "client report," "strategy document," "consulting report." If the competitive-positioning-audit skill has just completed with a PROCEED decision, move directly into this skill.
---

# Brand Strategy Report Compiler — Consulting-Grade Deliverable Directive

Assemble all Brandprint outputs (Layers 1-5) into a single, cohesive Brand Strategy & Competitive Positioning Report formatted to the standard of top-tier strategy consultancies (Strategy&, EY-Parthenon, Monitor Deloitte, KPMG Strategy).

## When NOT to Use

- **Layers are incomplete.** Layers 1-4 outputs are required inputs. Layer 5 is strongly recommended; if it's missing, the report must disclose that competitive validation was not performed and recommend it — don't compile silently around the gap.
- **Generating new strategy content.** This layer synthesizes what Layers 1-5 produced. If a section needs claims or evidence that don't exist upstream, run the missing layer — don't write it here.
- **Quick one-page summaries.** The floor is 15-20 pages in rapid mode. For a brief, pull the executive summary structure manually instead of invoking the compiler.

## Why This Layer Exists

Layers 1-4 produce structured JSON outputs optimized for machines and chain-forward processing. Layer 5 produces a competitive analysis. None of these are client-ready. This layer transforms raw strategic outputs into a narrative document that leadership teams, boards, and investors can act on.

The report is not a summary — it is a synthesis. It resolves contradictions, builds arguments across layers, adds market context, models financial impact, and provides a phased implementation roadmap. It connects the "what" (positioning elements) to the "why" (evidence) to the "how" (implementation) to the "when" (roadmap).

## Chain Position

This is **Layer 6** — the terminal layer of the Brandprint research stack:

1. **Core Human Truth** (Layer 1) → foundational truth sentence
2. **Brandprint Tier-A** (Layer 2) → 10 strategy elements
3. **Brandprint Tier-B** (Layer 3) → 5 actionable elements
4. **Brandprint Tier-C** (Layer 4) → 4 stylistic elements
5. **Competitive Positioning Audit** (Layer 5) → differentiation validation
6. **Brand Strategy Report** (this skill) → consulting-grade deliverable

**Required inputs:** At minimum, Layers 1-4 outputs. Layer 5 (Competitive Audit) is strongly recommended. If Layer 5 is missing, the report will note that competitive validation was not performed and recommend it.

## Variables to Resolve

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `brand_name` | The brand | *required* |
| `client_name` | Who receives the report (may differ from brand) | brand_name |
| `prepared_by` | Firm name for the cover page | *required* |
| `report_date` | Date for the cover page | Current month/year |
| `confidentiality` | Confidential / Internal / Public | Confidential |
| `include_financials` | Include economic engine and financial modeling sections | true |
| `include_roadmap` | Include implementation roadmap | true |
| `format` | `narrative` (long-form) or `deck` (slide-style with exhibits) | `narrative` |
| `layer_outputs` | JSON outputs from Layers 1-5 | *required* |

## Principles (Non-Negotiable)

1. **Synthesis over summary.** Do not paste layer outputs verbatim. Transform them into a coherent strategic narrative where each section builds on the previous one.
2. **Every claim traces to evidence.** If a claim appeared in Layers 1-5 with sources, those sources appear in the report. No orphan claims.
3. **Exhibits do the heavy lifting.** Tables, matrices, and frameworks should convey key findings at a glance. Narrative text explains what the exhibit means and what to do about it.
4. **Strategic recommendations are specific.** "Improve positioning" is not a recommendation. "Replace 'We Build Texas' with the Header Translation Line on the homepage hero section within 30 days" is a recommendation.
5. **Acknowledge uncertainty.** Confidence levels from Layers 1-5 carry forward. If evidence was thin, say so. If a recommendation is high-confidence, say that too.
6. **Client-appropriate language.** The report should be readable by a C-suite executive who has never seen a Brandprint. No references to "Layer 2" or "Sprint 4" — translate framework language into business language.

## Report Structure

The report follows an 11-section structure. Each section has a purpose, required content, and source layers.

### Cover Page
- Report title: "Brand Strategy & Competitive Positioning Report"
- Brand name
- Prepared for: [client_name] Leadership
- Date
- Prepared by: [prepared_by]
- Confidentiality notice

### Table of Contents
- Auto-generated from section headers

### Executive Summary (2-3 pages)
**Purpose:** Give leadership the full strategic picture in under 5 minutes.

**Required content:**
- Strategic imperative (why this report exists, what market forces demand action)
- The Core Human Truth (the foundational insight, stated plainly)
- Strategic positioning statement (synthesized from Tier-A tagline + Tier-C translation line)
- 3-5 headline findings (quantified where possible — use callout boxes)
- The recommended path (one paragraph, decisive)

**Source layers:** All layers contribute. The executive summary is the most synthesized section.

### Section 1: Market Context & Strategic Imperative
**Purpose:** Establish urgency and opportunity with data.

**Required content:**
- Market conditions relevant to the brand's category and region
- Growth sectors and tailwinds (from Tier-A Backbone macro data)
- Competitive dynamics (from Layer 5 territory ownership map)
- Legislative or regulatory context (if applicable)
- Academic or industry research supporting the strategic direction

**Source layers:** Tier-A Backbone, Layer 5 Competitive Audit

### Section 2: Core Human Truth & Buyer Psychology
**Purpose:** Present the foundational insight and the evidence behind it.

**Required content:**
- The Core Human Truth sentence (from Layer 1)
- Tension ladder (from Layer 1 — reformatted as exhibit)
- Buyer psychology: how the audience actually makes decisions (from Layer 1 qualitative synthesis)
- Current positioning baseline: gap between what the brand says and what buyers hear
- Validation of the proposed truth (from Layer 1 red team report)

**Source layers:** Layer 1 (Core Human Truth)

**Key exhibit:** Buyer Tension Ladder (table: Level, Tension, Implication)

### Section 3: Competitive Landscape & White Space Analysis
**Purpose:** Show where competitors are positioned and where open territory exists.

**Required content:**
- Direct competitor assessment (from Tier-A Sprint 4 + Layer 5)
- White space map (from Layer 5 territory ownership — reformatted as 2x2 or positioning grid)
- Collision analysis results (from Layer 5 collision matrix)
- Key competitor vulnerabilities to exploit
- Specific competitor gap analysis (the "Rogers-O'Brien Gap" pattern — name the gap after the competitor)

**Source layers:** Tier-A Sprint 4, Layer 5 Competitive Audit

**Key exhibits:** Competitive Territory Ownership grid, White Space Map (2x2), Collision Matrix summary

### Section 4: Target Audience Segments & Buyer Archetypes
**Purpose:** Define who to pursue and how they decide.

**Required content:**
- Segment definitions (from Tier-A Sprint 3)
- Buyer archetypes with core fears and brand fit (from Layer 1 archetypes + Tier-A)
- Jobs to be done hierarchy (from Tier-A Sprint 2 — reformatted as exhibit)

**Source layers:** Layer 1, Tier-A Sprints 2-3

**Key exhibit:** Segment Overview table (Segment, Archetype, Core Fear, Brand Fit)

### Section 5: Brand Architecture & Equity Framework
**Purpose:** Present the complete brand system — the strategic toolkit.

**Required content:**
- Equity Ladder (from Tier-A Sprint 9 — reformatted as tiered exhibit)
- Brand Platform Word (from Tier-B) with gatekeeper question
- Brand Mantra (from Tier-C) with usage context
- Header Translation Line (from Tier-C) with deployment guidance
- Tagline system hierarchy (mantra → tagline → translation line with use contexts)

**Source layers:** Tier-A Sprint 9, Tier-B Platform Word, Tier-C Mantra + Translation Line

**Key exhibits:** Equity Ladder table, Tagline System hierarchy table

### Section 6: Competitive Moat
**Purpose:** Explain why the brand wins and why competitors can't replicate it.

**Required content:**
- Moat pillars (from Tier-B Moat sprint — reformatted as exhibit)
- Time-to-replicate estimates for each pillar
- Observable evidence per pillar (buyer-verifiable proof)
- Switching cost analysis

**Source layers:** Tier-B Moat, Tier-A Sprint 6

**Key exhibit:** Moat Pillar Analysis table (Pillar, Observable Evidence, Time to Replicate, Buyer Verifiable?)

### Section 7: Signature Offers & Growth Strategy
**Purpose:** Map the brand's offerings to target segments and market opportunities.

**Required content:**
- Signature offers mapped to segments (from Tier-A Sprint 5)
- Growth sector strategy (from Tier-A Backbone macro data)
- Economic engine model (from Tier-A Sprint 7 — if include_financials = true)
- Bridge strategy for market transitions (if applicable)

**Source layers:** Tier-A Sprints 5, 7

**Key exhibit:** Signature Offer Portfolio table (Offer, Target Segment, Project Range, Competitive Advantage, Market Tailwind)

### Section 8: Brand Activation System
**Purpose:** Translate strategy into observable, repeatable behaviors.

**Required content:**
- Brand Activator (from Tier-B) with touchpoint map and implementation phases
- Tone & Manner guide (from Tier-B) with do/say conversion table
- Personification vignette(s) (from Tier-C)
- Tagline system with deployment contexts

**Source layers:** Tier-B (Activator, Tone), Tier-C (Vignette)

**Key exhibits:** Activator Touchpoint Map, Tone & Manner table (Adjective, Client Validation, Instead of/Say), Tagline Hierarchy table

### Section 9: Strategic Guardrails & Brand Protection
**Purpose:** Define the defensive perimeter — what the brand must never do.

**Required content:**
- Brand No-No's (from Tier-B) with rationale and risk prevented
- Strategic tensions resolved (from Layer 5 repositioning analysis + Tier-A contradictions)
- Expertise claims: what the brand can claim with confidence, what requires qualification, what it must not claim
- Features list with equity ladder mapping (from Tier-C)

**Source layers:** Tier-B No-No's, Tier-A Contradiction Matrix, Tier-C Features List

**Key exhibits:** Brand No-No's table (Guardrail, Rationale & Risk Prevented), Expertise Claims (three-tier: Full Confidence, Requiring Qualification, Must Not Make)

### Section 10: Implementation Roadmap
**Purpose:** Translate strategy into a phased execution plan.

**Required content (if include_roadmap = true):**
- Phase 1: Immediate Actions (Months 1-3) — quick wins, positioning pivots, internal alignment
- Phase 2: Foundation Building (Months 4-6) — sales enablement, content strategy, template redesign
- Phase 3: Market Positioning (Months 7-12) — category ownership, thought leadership, speaking, PR
- Phase 4: Expansion Phase (Months 12-24) — new sectors, geographic expansion, brand equity measurement
- Measurable milestones per phase
- Resource requirements and budget estimates

**Source layers:** Synthesized from all layers

**Key exhibit:** Implementation Roadmap visual (4-phase timeline with key actions per phase)

### Section 11: Conclusion
**Purpose:** Close with conviction. Restate the single most important strategic insight.

**Required content:**
- Strategic summary (3 sentences max)
- The positioning opportunity restated
- The "excavation not construction" insight: the positioning already exists in the portfolio, the people, and the performance — it just needs to be named
- Closing statement with prepared-by attribution

### Appendix (Optional)
- Full source bibliography organized by category
- Research methodology notes
- Confidence scoring methodology
- Detailed financial modeling assumptions
- Glossary of terms

## Formatting Standards

To match consulting-grade deliverables:

- **Exhibits are numbered:** Exhibit 1.1, Exhibit 3.1, etc. (section.sequence)
- **Key statistics in callout boxes:** Large numbers, bold, with context below
- **Pull quotes for critical insights:** Blockquoted, italicized
- **Consistent header hierarchy:** Section numbers match TOC
- **Professional tone:** Authoritative but not academic. No hedging language ("might," "could possibly"). State findings with appropriate confidence.
- **Footer:** "[Brand Name] [bullet] Brand Strategy & Competitive Positioning Report [bullet] Page X"
- **Cover page footer:** "[Prepared by] [bullet] [City, State] / Brand Strategy [bullet] Competitive Intelligence [bullet] Market Positioning"

## Quality Checks (Run Before Finalizing)

- [ ] Every section traces to specific layer outputs (no orphan sections)
- [ ] Every exhibit has a number, title, and is referenced in the narrative text
- [ ] The executive summary can stand alone — a reader who reads only this section gets the full strategic picture
- [ ] No Brandprint framework jargon appears (no "Layer 2," "Sprint 4," "Tier-B")
- [ ] Financial projections include ranges and assumptions, never point estimates
- [ ] Competitor names are used only where the analysis requires it — the report positions the brand, not attacks competitors
- [ ] The implementation roadmap has measurable milestones, not vague aspirations
- [ ] Confidence levels are stated for key recommendations
- [ ] All sources from Layers 1-5 are compiled in the bibliography
- [ ] The report reads as a single coherent document, not a stack of skill outputs

## What NOT to Do

- Do not paste JSON outputs into the report. Transform everything into narrative and exhibits.
- Do not use Brandprint layer/sprint terminology. Translate to business language.
- Do not present recommendations without evidence chain.
- Do not include financial projections without explicit assumptions and ranges.
- Do not hedge excessively. If the evidence supports a recommendation, state it with conviction. If evidence is thin, state that too — but don't hedge everything.
- Do not create a report shorter than 20 pages for standard mode. This is a comprehensive strategic deliverable, not a summary.
- Do not invent market data to fill Section 1. If the Tier-A Backbone didn't collect it, mark the gap — fabricated context poisons an otherwise evidence-backed report.
- Do not compile around a REFINE decision. If Layer 5 said REFINE and the client chose to ship anyway, the report must disclose the unresolved collisions, not present first-pass positioning as validated.
- Do not reference an exhibit that isn't in the document, or include an exhibit the narrative never mentions. Orphan exhibits are the fastest tell of a stapled-together report.

## Mode Adjustments

- **Rapid:** 15-20 pages. Executive summary + sections 2, 3, 5, 9. Skip financial modeling and detailed roadmap. Include simplified exhibits.
- **Standard:** 25-35 pages. All 11 sections. Full exhibits. Financial modeling with ranges. Phased roadmap.
- **Enterprise:** 35-50+ pages. All 11 sections expanded. Add: sensitivity analysis, scenario modeling, board-ready executive brief (2-page standalone), competitive monitoring plan, quarterly review structure.

## Output Format

Deliver as:
1. **Markdown document** — full report in clean markdown suitable for conversion to PDF or DOCX
2. **If the user has PDF generation capabilities** — offer to generate a formatted PDF

The report should be immediately presentable to client leadership without additional editing.

## Evaluation Rubric

1. **Synthesis quality** — The report reads as one coherent narrative, not six skill outputs stapled together
2. **Evidence density** — Every recommendation traces to cited evidence
3. **Exhibit quality** — Tables and frameworks convey findings at a glance
4. **Actionability** — Recommendations are specific enough to execute without additional interpretation
5. **Professional standard** — Formatting, tone, and depth match top-tier strategy consultancy deliverables
6. **Standalone executive summary** — A reader who skips everything except the exec summary still gets the full strategic picture
7. **Completeness** — All layer outputs are represented; no strategic elements are missing from the final document
