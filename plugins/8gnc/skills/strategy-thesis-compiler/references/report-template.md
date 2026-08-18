# Strategy Thesis Report — Section Template

This template governs the structure, section order, and upstream field mapping for every report produced by `strategy-thesis-compiler`. The compiler assembles **narrative prose** from structured JSON inputs — do not paste raw JSON into any section. Every claim must trace to a named upstream field.

---

## Cover Page

- Report title: "Integrated Strategy Thesis"
- Product / platform name
- Prepared for: [client_name] Leadership
- Date
- Prepared by: [prepared_by]
- Confidentiality notice

---

## Table of Contents

Auto-generated from section headers below.

---

## Executive Summary (2–3 pages)

**Purpose:** Give leadership the complete strategic picture in under five minutes.

**Required content:**
- Strategic imperative: what market forces demand a decision now
- The Core Strategic Truth (stated plainly — the forced trade-off buyers can't escape)
- Recommended strategic position: a synthesis of where-to-play selection and how-to-win hypothesis
- 3–5 headline findings (quantified where possible; use callout boxes)
- One-paragraph decisive path forward

**Upstream fields:**
- Core Strategic Truth: `Layer1.final_sentence`
- Market imperative: `TierA.backbone_repository.macro_data_summary`
- Strategic position: `TierA.tierA_results.where_to_play_map.options[]` (selected option) + `TierA.tierA_results.how_to_win_hypothesis`
- Headline findings: synthesized from highest-confidence `claim_sheet` entries across all layers
- Positioning hook: `TierC.tierC_results.product_one_liner.final`

**Note:** The executive summary must stand alone. A reader who skips every other section still gets the full picture.

---

## Section 1: Market Context

**Purpose:** Establish urgency and opportunity with data.

**Required content:**
- Category definition and competitive dynamics
- Macro tailwinds and headwinds relevant to the product's where-to-play selection
- Market size context (TAM/SAM/SOM ranges) with method notes
- Substitute landscape and adjacent category pressures

**Upstream fields:**
- Category frame: `TierA.tierA_results.category_definition_sizing.category`
- TAM/SAM/SOM: `TierA.tierA_results.category_definition_sizing.tam_range` + `.sam_range` + `.som_range` + `.method_notes`
- Macro data: `TierA.backbone_repository.macro_data_summary`
- Substitutes: `TierA.tierA_results.competitive_capability_teardown.substitute_map`

**Key exhibit:** Market Sizing Ranges table (TAM / SAM / SOM with methodology notes per level).

---

## Section 2: Core Strategic Truth

**Purpose:** Present the foundational market tension and the evidence behind it.

**Required content:**
- The Core Strategic Truth sentence — the forced trade-off the audience can't escape
- The tension map: the paradox axes that structure the market
- Buyer and operator archetypes with their decision contexts and JTBD drivers
- Validation summary: how the truth was tested and what challenges it survived

**Upstream fields:**
- Truth sentence: `Layer1.final_sentence`
- Tension structure: `Layer1.tension_map` (each entry: two-pole structure with label)
- Archetypes: `Layer1.archetypes` (decision role, JTBD, decision context, evidence basis)
- Validation: `Layer1.audit_log` (condensed — what was challenged and what survived; red-team activity is recorded in phase entries here)
- JTBD seed carried forward: `Layer1.jtbd_seed`

**Key exhibit:** Market Tension Map table (Tension Axis | Pole A | Pole B | Strategic Implication).

---

## Section 3: Where-to-Play / How-to-Win Cascade

**Purpose:** Present the full Playing-to-Win cascade — the core strategic argument.

**Required content:**
- Winning aspiration (bounded) with explicit boundary conditions
- Where-to-play selection: which segment x channel x geo x use-case intersection was chosen and why
- How-to-win hypothesis: the advantage type, the structural mechanism, and why it holds
- JTBD outcomes (top 3) mapped to the selected where-to-play
- Segment definitions with size bounds and WTP proxies

**Upstream fields:**
- Winning aspiration: `TierA.tierA_results.winning_aspiration.ambition` + `.boundaries`
- Where-to-play: `TierA.tierA_results.where_to_play_map.options[]` (selected options; each option carries `.attractiveness` + `.right_to_win` scores — there is no separate matrix field)
- How-to-win: `TierA.tierA_results.how_to_win_hypothesis.value_prop` + `.advantage_type` + `.why_it_holds`
- JTBD outcomes: `TierA.tierA_results.jtbd_outcomes.outcomes_top3` (with importance x satisfaction-gap ranking)
- Segments: `TierA.tierA_results.segments_wtp.segments[]` (each entry: `.name` + `.firmographic` + `.psychographic` + `.size_bound` + `.wtp_proxy`)

**Key exhibits:**
- Where-to-Play Scoring Matrix (Option | Segment | Attractiveness | Right-to-Win | Selected?)
- JTBD Outcomes table (Outcome | Importance | Satisfaction Gap | Where-to-Play Alignment)

---

## Section 4: Competitive Moat & Capability Map

**Purpose:** Show why the strategy wins and why competitors can't replicate it quickly.

**Required content:**
- Competitive capability teardown: each direct competitor's observable capabilities, structural moats, and documented gaps
- JTBD gap map: which outcomes are underserved across the full competitive set
- Required capabilities: what the product must have for how-to-win to hold, with gap assessments
- Differentiation wedge: the specific outcome-or-capability combination no named competitor currently occupies, why it is unoccupied, and how the position compounds

**Upstream fields:**
- Competitor profiles: `TierA.tierA_results.competitive_capability_teardown.competitors[]`
- JTBD gap map: `TierA.tierA_results.competitive_capability_teardown.jtbd_gap_map`
- Required capabilities: `TierA.tierA_results.required_capabilities.capabilities[]` (each entry: `.name` + `.current_state` + `.gap` + `.criticality`)
- Differentiation wedge: `TierA.tierA_results.differentiation_wedge.open_white_space` + `.why_unoccupied` + `.defensibility`

**Key exhibits:**
- Competitive Capability Map (Competitor | Observable Capabilities | Structural Moat | Key Gap)
- Capability Gap Criticality table (Capability | Current State | Gap | Criticality | Build/Buy/Partner Decision)

---

## Section 5: Positioning & One-Liner

**Purpose:** Present the deployment-ready strategic position in buyer language.

**Required content:**
- Positioning statement (For-Who-Is-The-That-Because structure) with comprehension check verdict
- Product one-liner (<=25 words) with word-count confirmation
- Alignment trace: how the positioning derives from the where-to-play, differentiation wedge, and top JTBD outcome
- Usage guidance: where each artifact is deployed (pitch, website hero, investor brief, internal alignment)

**Upstream fields:**
- Positioning statement: `TierC.tierC_results.positioning_statement.text`
- Comprehension check: `TierC.tierC_results.positioning_statement.comprehension_check`
- Product one-liner: `TierC.tierC_results.product_one_liner.final`
- Derivation trace: `TierC.derivation_matrix` (maps each artifact to its Tier-A/B source fields)

---

## Section 6: Prioritized Roadmap — Now / Next / Later

**Purpose:** Translate the strategy into a sequenced execution plan with justified ordering.

**Required content:**
- Strategic bets (3-5): hypothesis, kill criterion, proxy test, and capability reference per bet
- Now / Next / Later horizon assignments with sequencing logic that names inter-bet dependencies and kill-criterion thresholds
- Build-vs-buy-vs-partner decision per required capability with rationale
- Prioritization model: impact x confidence / effort scores with evidence basis per dimension
- Bet narrative: the buyer-readable story of the roadmap sequence

**Upstream fields (if `include_roadmap = yes`):**
- Strategic bets: `TierB.tierB_results.strategic_bets.bets[]` (each bet carries `.kill_criterion`) + `.proxy_test`
- Roadmap horizons: `TierB.tierB_results.roadmap_horizons.now` + `.next` + `.later` + `.sequencing_logic` + `.dependencies`
- Build/buy/partner: `TierB.tierB_results.build_buy_partner.decisions[]`
- Prioritization: `TierB.tierB_results.prioritization_model.items[]` + `.method`
- Bet narrative: `TierC.tierC_results.bet_narrative.story` + `.named_bets`

**Key exhibits:**
- Now/Next/Later Roadmap (Bet | Horizon | Hypothesis | Kill Criterion | Capability Ref)
- Build/Buy/Partner Decisions table (Capability | Decision | Rationale | Trade-offs)
- Prioritization Scorecard (Bet | Impact | Confidence | Effort | Score | Priority Rank)

**If `include_roadmap = no`:** Omit this section. Note the omission in the executive summary.

---

## Section 7: Economic Model

**Purpose:** Frame the economic logic — ranges, not point estimates.

**Required content:**
- CAC and LTV ranges with channel-mix assumptions stated
- LTV:CAC ratio range; flag if any realistic scenario falls below 3:1
- Pricing model connected to segment WTP evidence
- Payback window assumptions and sensitivity to key levers
- Boundary condition: which single input, if wrong by 20%, breaks the model

**Upstream fields (if `include_financials = yes`):**
- Unit economics: `TierA.tierA_results.economic_engine.unit_economics_ranges` + `.cac_ltv_ranges`
- Pricing: `TierA.tierA_results.economic_engine.pricing_model`
- Payback: `TierA.tierA_results.economic_engine.payback_bounds`
- Sensitivity: `TierA.tierA_results.economic_engine.sensitivity_notes`
- Market sizing context: `TierA.tierA_results.category_definition_sizing.sam_range` + `.som_range`

**Key exhibit:** Economic Model Ranges table (Metric | Low | Mid | High | Key Assumption).

**If `include_financials = no`:** Omit this section. Note the omission in the executive summary.

---

## Section 8: Risk Register + Leading Indicators

**Purpose:** Surface the risks that threaten the strategy's load-bearing assumptions, each paired with a leading indicator that fires before the risk materializes.

**Required content:**
- Top 5-10 risks ranked by severity x likelihood
- For each risk: the specific Tier-A assumption it threatens, likelihood, severity, leading indicator, and mitigation
- Top 3 risks called out in a summary block (must-track signals)
- Connection to the strategy-on-a-page must-track list

**Upstream fields:**
- Risk list: `TierB.tierB_results.risk_register.risks[]` (each risk carries `.leading_indicator`, `.mitigation`, `.tied_to_assumption`)
- Must-track signals: `TierC.tierC_results.strategy_on_a_page.must_track[]`

**Key exhibit:** Risk Register table (Risk | Tied Assumption | Likelihood | Severity | Leading Indicator | Mitigation).

---

## Section 9: Assumption-Test Log

**Purpose:** Surface the adversarial pre-mortem results — proof that the strategy survived falsification attempts, or the constraint package it carries forward.

**Required content:**
- Full assumption ledger: every assumption the strategy rests on, tagged to its source layer
- Load-bearing assumptions: the 1-3 assumptions ranked highest by fragility_score (if_false_impact x thesis_dependence)
- Falsification findings: for each load-bearing assumption, the disconfirmation method, what was found, whether the assumption survived, and the notes explaining the verdict
- Verdict: PROCEED (all load-bearing assumptions survived) or REFINE (with constraint package naming the broken assumption and rebuild constraints)
- If REFINE: number of loops run, the broken assumption(s), and what rebuild constraints apply going forward

**Upstream fields:**
- Assumption ledger: `Layer5.assumption_ledger` (each entry: `id`, `assumption`, `source_layer`, `fragility_score`)
- Load-bearing: `Layer5.load_bearing` (ids of the 1-3 highest fragility-scored assumptions)
- Falsification findings: `Layer5.falsification_findings` (per load-bearing id: `method`, `evidence`, `survived`, `notes`)
- Verdict: `Layer5.verdict` (PROCEED | REFINE)
- Constraint package: `Layer5.constraint_package` (present only when verdict = REFINE)

**Disclosure rule:** If Layer 5 was skipped, this section must state: "Adversarial pre-mortem was not performed. The assumptions below are unvalidated. Running the Thesis Stress-Test before acting on this thesis is strongly recommended." List the would-be load-bearing assumptions from Tier-A and Tier-B claim sheets so the reader understands the risk exposure.

---

## Section 10: Source Bibliography

**Purpose:** Full attribution for every claim in the report, organized by layer.

**Required content:**
- Sources organized by layer of origin (Layer 1 / Tier-A / Tier-B / Tier-C / Layer 5)
- Per source: title, publisher, author (if available), URL, publish date, access date, one-line evidence note, stance (supporting / conflicting / neutral / contradicts)
- Any internal artifacts (telemetry, interview summaries, loss-reason logs) listed as a separate subsection with source = named internal document

**Upstream fields:**
- Layer 1 sources: `Layer1.sources`
- Tier-A sources: `TierA.sources`
- Tier-B sources: `TierB.sources`
- Tier-C sources: `TierC.sources` (if any new sources were introduced)
- Layer 5 sources: `Layer5.sources`

**Deduplication rule:** If the same source appears in multiple layers, list it once under the earliest layer and note the additional layers that relied on it.

---

## Appendix (Optional)

- Research methodology notes per layer
- Confidence scoring methodology
- Detailed economic modeling assumptions and sensitivity tables
- Glossary of terms (for external audiences unfamiliar with the Productprint framework)
- Strategy-on-a-Page exhibit (from `TierC.tierC_results.strategy_on_a_page` — sub-fields: `.aspiration`, `.where_to_play`, `.how_to_win`, `.capabilities`, `.must_track[]`) reproduced as a standalone page

---

## Formatting Standards

- **Exhibits are numbered:** Exhibit 1.1, Exhibit 3.1, etc. (section.sequence)
- **Key statistics in callout boxes:** Large numbers or ranges, bold, with context below
- **Pull quotes for critical insights:** Blockquoted, italicized — use sparingly
- **Consistent header hierarchy:** Section numbers match TOC
- **Professional tone:** Authoritative, not academic. Active voice. No hedging language unless confidence is genuinely low — state that plainly.
- **All economic figures are ranges.** Point estimates for CAC, LTV, TAM, or payback are not permitted.
- **Footer:** "[Product Name] · Integrated Strategy Thesis · Page X"

---

## Quality Checks (Run Before Finalizing)

- [ ] Every section cites specific upstream field names — no orphan claims
- [ ] Executive summary stands alone; a reader who skips all other sections gets the full picture
- [ ] No JSON is pasted raw — all layer outputs are assembled into narrative prose and exhibits
- [ ] No internal framework vocabulary appears in client-facing or 8gnc-public skin output (no "Tier-A," "JTBD seed," "kill criterion," "Layer 5" — translate to business language)
- [ ] All economic projections are ranges with explicit assumptions and inputs
- [ ] Every exhibit has a number, title, and is referenced in the narrative text
- [ ] Assumption-Test Log discloses clearly whether Layer 5 was run; if skipped, the gap is named
- [ ] Source bibliography is complete; every cited source appears here
- [ ] The skin parameter has NOT altered strategy content, section order, or evidence — only voice, styling, and packaging
- [ ] Confidence levels from upstream claim sheets carry forward where evidence was thin
