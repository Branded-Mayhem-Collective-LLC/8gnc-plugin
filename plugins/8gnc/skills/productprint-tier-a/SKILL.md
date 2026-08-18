---
name: productprint-tier-a
description: Use when the user asks for a Productprint, product strategy research, Playing-to-Win cascade, where-to-play analysis, how-to-win hypothesis, market sizing, competitive capability teardown, JTBD outcomes mapping, segment willingness-to-pay, economic engine modeling, differentiation wedge, or any comprehensive product or platform strategy deliverable — Layer 2 of the Productprint research stack. Also trigger on "run Tier-A," "productprint research," "full product strategy audit," "product strategy sprint," "Playing-to-Win cascade," "market sizing," "where to play," "how to win," or when the user wants JTBD outcomes, competitive capability teardown, segment WTP, and strategy positioning in one pass. Use immediately when the core-strategic-truth skill has just completed — chain directly using its output as the seed.
---

# Productprint Tier-A — Hybrid Research Directive

Deliver all 10 Tier-A Productprint elements using a hybrid method: build a shared evidence Backbone first, then run independent, falsifiable sprints per element — each with its own proofs and claim sheets. The 10 elements form an integrated Playing-to-Win cascade: winning aspiration → category sizing → JTBD outcomes → segments → where-to-play → competitive capability teardown → how-to-win → required capabilities → economic engine → differentiation wedge.

## When NOT to Use

- **You only need quick positioning or stylistic outputs.** Tier-C requires Tier-A and Tier-B as seeds — there is no shortcut to a strategy thesis. Run the full chain, or run this skill in `rapid` mode to lighten the load.
- **No access to real market evidence.** Every sprint gates on ≥3 independent sources or behavioral signals. Without reviews, search data, and competitor materials to mine, the claims can't clear the gates.
- **Validating existing positioning against competitors.** That's an adversarial test, not a build — use `thesis-stress-test` (Layer 5).

## Chain Position

This is **Layer 2** of a 6-layer Productprint research stack:

1. **Core Strategic Truth** (Layer 1) → foundational tension sentence, tension map, JTBD seed, archetypes, lexicon
2. **Productprint Tier-A** (this skill) → uses Layer 1 output as seed; produces 10 defensible Playing-to-Win cascade elements
3. **Productprint Tier-B** (Layer 3) → uses Tier-A output as seed; produces actionable plan: strategic bets, Now/Next/Later roadmap, build/buy/partner decisions, prioritization model, and risk register
4. **Productprint Tier-C** (Layer 4) → uses Tier-A + Tier-B output as seeds; produces deployment-ready positioning artifacts: positioning statement, one-liner, bet narrative, and strategy-on-a-page
5. **Thesis Stress-Test** (Layer 5) → adversarial pre-mortem gate; extracts load-bearing assumptions and tries to FALSIFY them; returns PROCEED if they survive or REFINE (with a constraint package) if one falls
6. **Strategy Thesis Compiler** (Layer 6) → compiles all layers into a consulting-grade integrated strategy thesis deliverable

**When Layer 1 has just completed:** Import its output directly. The `final_sentence`, `tension_map`, `jtbd_seed`, `archetypes`, `lexicon`, and `evidence_mode` from Core Strategic Truth seed the Backbone phase — do not re-research what Layer 1 already validated. Carry forward its sources into the Backbone bibliography.

**When running standalone:** Resolve all variables with the user and build the Backbone from scratch.

## Variables to Resolve

Before starting, confirm these with the user (or inherit from Layer 1):

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `product_name` | The product, platform, or solution being researched | *required* |
| `category` | Market category or domain | *required* |
| `audience` | Primary buyer/operator audience definition | *required* (or from Layer 1) |
| `region_context` | Geography or cultural context | US / English-speaking |
| `constraints` | Scope, legal, or strategic constraints | None |
| `mode` | `rapid`, `standard`, or `enterprise` | `standard` |
| `evidence_mode` | `greenfield` or `existing-product` | `greenfield` |

## Principles (Non-Negotiable)

1. **Truth over consensus.** Triangulate across independent sources; show counter-evidence.
2. **Each sprint is a separate claim** with its own acceptance gates and proof minimums.
3. **No fabrication.** If unknown, mark unknown. Quote sparsely; summarize faithfully.
4. **Plain language.** Prioritize verifiable behaviors over vibes.
5. **Log contradictions** between sprints; resolve or bound them.

## Evidence & Citation Policy

For every public claim, include: title, publisher, author (if available), URL, publish date, access date, one-line evidence note, and stance (`supporting` | `conflicting` | `neutral`).

## Global Acceptance Gates

Every Tier-A sprint must meet these before its claim is accepted:

- **Proof minimum:** ≥3 independent sources or behavioral signals per claim
- **Claim sheet required:** statement, boundaries, counter-evidence, confidence rating, sources
- **Economic claims** require transparent math with explicit ranges and inputs — no point estimates
- **Where-to-play options** must be scored on attractiveness AND right-to-win — a one-dimensional score does not clear the gate
- **Winning aspiration** must include explicit boundaries — an unbounded ambition is a wish, not a strategy claim

**Mode adjustments:**
- *Rapid:* ≥2 sources per claim, 1 behavioral proxy, lighter economic math (ranges still required)
- *Standard:* Full desk research, corpus mining, structured validation
- *Enterprise:* Add cross-market slices, expert panels, longitudinal comparisons

## Workflow

### Phase: Backbone Evidence Garage

**Goal:** Assemble shared inputs once. No final claims yet.

Actions:
- **Landscape scan** — category definition, purchase contexts, substitutes, adjacent categories
- **Macro data pull** — longitudinal stats relevant to the product, category, and audience
- **Review corpus** — collect public reviews, forums, social posts where permitted; store verbatims with links
- **Search-intent map** — SERP, marketplaces, app stores; identify real buyer language and JTBD signals
- **Competitor inventory** — top direct competitors and substitutes; capture capabilities, moats, pricing, and proof signals
- **Contradictions log** — note conflicts to test in sprints

In **existing-product mode**, seed the Backbone `competitor_inventory` and `outcomes_seed` from internal telemetry and interview artifacts (loss reasons, churn data, NPS verbatims, roadmap notes) before beginning external search. Internal first-party artifacts are Tier 1 evidence; external sources are Tier 2 corroboration.

If Layer 1 output is available, merge its `tension_map`, `jtbd_seed`, `archetypes`, `lexicon`, and `sources` into the Backbone. Do not duplicate research Layer 1 already completed.

Outputs: `annotated_bibliography`, `macro_data_summary`, `review_verbatim_library`, `search_intent_map`, `competitor_inventory`, `outcomes_seed`, `contradictions_log_seed`

---

### Sprint 1: Winning Aspiration (Bounded Ambition)

**Inputs:** All Backbone outputs (+ Layer 1 `final_sentence` and `tension_map` if available)

Actions:
- Draft a winning aspiration statement: what does it mean for this product to "win" in this category within a defined time horizon?
- State explicit boundaries: where will the product NOT play (segments, channels, geographies, use cases)?
- Validate the ambition against market sizing — is it achievable within the bounded scope?
- Run counter-arguments: what would cause this aspiration to be wrong?

**Acceptance gates:** proof_minimum ≥3; ambition MUST include explicit boundaries (unbounded aspiration fails the gate); deliver claim sheet

Outputs: `winning_aspiration_statement`, `boundary_conditions`, `claim_sheet_winning_aspiration`

---

### Sprint 2: Category Definition + Sizing

**Inputs:** `Backbone.macro_data_summary`, `Backbone.annotated_bibliography`

Actions:
- Define the category frame the product occupies — this may differ from how analysts categorize it
- Build TAM/SAM/SOM estimates as explicit RANGES with stated methodology for each level
- Run bottom-up and top-down crosschecks; surface where they diverge
- Document every input assumption; flag analyst variance across sources

**Acceptance gates:** proof_minimum ≥3; TAM/SAM/SOM MUST be ranges with method notes — point estimates fail the gate; deliver claim sheet

Outputs: `category_definition`, `tam_range`, `sam_range`, `som_range`, `method_notes`, `claim_sheet_sizing`

---

### Sprint 3: JTBD / Desired Outcomes (Top 3)

**Inputs:** `Backbone.review_verbatim_library`, `Backbone.outcomes_seed` (+ Layer 1 `jtbd_seed` if available)

Actions:
- Convert verbatims and JTBD seed candidates to outcome statements in buyer language
- Estimate importance and satisfaction gap from credible third-party data or behavioral proxies (review ratings, churn signals, NPS verbatims, switcher surveys)
- Reduce to top 3 outcomes with boundaries; rank by importance × satisfaction-gap
- Run counter-arguments: are these the real outcomes, or surface symptoms?

**Acceptance gates:** proof_minimum ≥3; importance × satisfaction-gap scoring required for each outcome; deliver claim sheet

Outputs: `outcomes_top3`, `importance_gap_notes`, `claim_sheet_jtbd`

---

### Sprint 4: Segments + Willingness-to-Pay

**Inputs:** `Backbone.macro_data_summary`, `Backbone.search_intent_map` (+ Layer 1 `archetypes` if available)

Actions:
- Define 1–3 segments with firmographic and psychographic cues
- Estimate addressable size bounds per segment using reputable datasets (explicit ranges, no silent math)
- Derive WTP proxies from pricing signals, switching behaviors, and analogous purchase data
- Note decision-maker role differences across segments

**Acceptance gates:** proof_minimum ≥3; size bounds required as ranges; WTP proxies required (not inferred); deliver claim sheet

Outputs: `segments_defined`, `size_bounds_per_segment`, `wtp_proxies`, `claim_sheet_segments`

---

### Sprint 5: Where-to-Play Option Map

**Inputs:** `Sprint 2.tam_range` + `Sprint 2.sam_range`, `Sprint 3.outcomes_top3`, `Sprint 4.segments_defined`

Actions:
- Generate 3–6 where-to-play options as concrete intersections of segment × channel × geo × use-case
- Score each option on attractiveness (market size × growth × competitive intensity) and right-to-win (capability fit × differentiation advantage × switching cost)
- Surface trade-offs between high-attractiveness / low-right-to-win options and vice versa
- Map which Layer 1 tensions align to each option — options that address no validated tension are suspect

**Acceptance gates:** proof_minimum ≥3; every option scored on BOTH attractiveness AND right-to-win; deliver claim sheet

Outputs: `where_to_play_options_scored`, `attractiveness_right_to_win_matrix`, `claim_sheet_where_to_play`

---

### Sprint 6: Competitive Capability Teardown

**Inputs:** `Backbone.competitor_inventory`, `Backbone.search_intent_map`

Actions:
- For each top direct competitor and substitute, document observable capabilities (not brand claims), structural moats, and documented gaps
- Build a substitute map: what do buyers use when the product category fails them?
- Map competitor gaps against Sprint 3 outcomes — identify which JTBD outcomes are underserved across the entire competitive set
- Run counter-arguments: which competitor is most likely to close their gaps and why?

**Acceptance gates:** proof_minimum ≥3; teardown must be by capability/moat/gap — brand claim comparisons without behavioral evidence fail the gate; deliver claim sheet

Outputs: `competitor_capability_profiles`, `substitute_map`, `jtbd_gap_map`, `claim_sheet_competitive`

---

### Sprint 7: How-to-Win Hypothesis

**Inputs:** `Sprint 5.where_to_play_options_scored`, `Sprint 6.competitor_capability_profiles`

Actions:
- Draft a how-to-win hypothesis: what must be true about the product's advantage for the winning where-to-play options to be achievable?
- Name the advantage TYPE explicitly: cost leadership, differentiation, network effect, switching cost, data flywheel, platform lock-in, speed-to-outcome, regulatory, brand
- State WHY the advantage holds structurally (the mechanism, not the aspiration)
- Run red-team: what would need to change in the market for this hypothesis to break?

**Acceptance gates:** proof_minimum ≥3; advantage TYPE must be named explicitly; structural mechanism must be stated; deliver claim sheet

Outputs: `how_to_win_hypothesis`, `advantage_type`, `mechanism_rationale`, `claim_sheet_how_to_win`

---

### Sprint 8: Required Capabilities

**Inputs:** `Sprint 7.how_to_win_hypothesis`, `Backbone.competitor_inventory`

Actions:
- List the capabilities the product must have for the how-to-win hypothesis to hold
- Assess current state (strong, weak, absent) with evidence
- Define the gap for each weak or absent capability: what must be built, acquired, or partnered?
- Rate criticality: must-have, high, medium, low — relative to the how-to-win hypothesis specifically

**Acceptance gates:** proof_minimum ≥3; criticality rating required per capability relative to how-to-win; gaps must be actionable (not vague); deliver claim sheet

Outputs: `required_capabilities_list`, `gap_assessments`, `criticality_ratings`, `claim_sheet_capabilities`

---

### Sprint 9: Economic Engine

**Inputs:** `Sprint 5.where_to_play_options_scored`, `Sprint 8.required_capabilities_list`, `Sprint 4.wtp_proxies`

Actions:
- Model CAC and LTV ranges with explicit channel-mix assumptions; never a point estimate
- State pricing model and connect it to segment WTP evidence from Sprint 4
- Compute LTV:CAC ratio range; flag if it falls below 3:1 in any realistic scenario
- State payback window assumptions and sensitivity to key levers
- Document boundary conditions: which single input, if wrong by 20%, breaks the model?

**Acceptance gates:** math transparency required; all economic claims MUST be ranges with inputs stated — any point estimate fails the gate; deliver claim sheet

Outputs: `unit_economics_ranges`, `cac_ltv_ranges`, `pricing_model`, `payback_bounds`, `sensitivity_notes`, `claim_sheet_economic_engine`

---

### Sprint 10: Differentiation Wedge

**Inputs:** `Sprint 6.jtbd_gap_map` + `Sprint 6.substitute_map`, `Sprint 7.how_to_win_hypothesis`

Actions:
- Identify the specific customer-outcome or capability combination that no named competitor currently occupies
- Document WHY it is unoccupied: capability cost, market timing, incentive misalignment, structural architecture mismatch — not just "we got there first"
- State the defensibility mechanism: how does holding this position compound over time?
- Run counter-arguments: which competitor is closest to occupying this space, and what would trigger them to move?

**Acceptance gates:** proof_minimum ≥3; `why_unoccupied` must cite a structural reason — timing assumptions alone fail the gate; defensibility must name a compounding mechanism; deliver claim sheet

Outputs: `open_white_space`, `why_unoccupied_rationale`, `defensibility_mechanism`, `claim_sheet_wedge`

---

### Phase: Integration & Contradiction Resolution

**Goal:** Resolve conflicts, finalize linkages, and package outputs.

Actions:
- Update contradiction matrix across all sprints; resolve or set explicit boundaries
- Verify the cascade holds: winning aspiration → category sizing → JTBD → segments → where-to-play → competitive teardown → how-to-win → capabilities → economic engine → wedge. If any link in the chain is unsupported by the evidence, flag it
- Assemble rationale narrative connecting tensions to proofs
- Compile lexicon: words that resonate/repel from corpus (carry forward from Layer 1 if available)
- Finalize sources with stances and evidence notes

Outputs: `contradiction_matrix`, `cascade_linkage_check`, `rationale_narrative`, `lexicon`, `sources_final`

## Sprint Dependency Map

Understanding which sprints can run in parallel vs. which must wait:

```
Backbone ──┬── Sprint 1 (Winning Aspiration) ───────────────────────────────────────────┐
           │                                                                              │
           ├── Sprint 2 (Category Sizing) ──────────────────────────────────────────┐    │
           │                                                                         │    │
           ├── Sprint 3 (JTBD / Outcomes) ──────────────────────────────────────┐   │    │
           │                                                                      │   │    │
           ├── Sprint 4 (Segments + WTP) ────────────────────────────────────┐   │   │    │
           │                                                                  │   │   │    │
           │   Sprint 2 + Sprint 3 + Sprint 4 ──── Sprint 5 (Where-to-Play) ─┤   │   │    │
           │                                                                  │   │   │    │
           ├── Sprint 6 (Competitive Capability Teardown) ──────────────┐    │   │   │    │
           │                                                             │    │   │   │    │
           │   Sprint 5 + Sprint 6 ──── Sprint 7 (How-to-Win) ─────────┤    │   │   │    │
           │                                                             │    │   │   │    │
           │   Sprint 7 + Backbone ──── Sprint 8 (Required Capabilities)│    │   │   │    │
           │                                                             │    │   │   │    │
           │   Sprint 5 + Sprint 8 ──── Sprint 9 (Economic Engine) ─────┘    │   │   │    │
           │                                                                  │   │   │    │
           │   Sprint 6 + Sprint 7 ──── Sprint 10 (Differentiation Wedge)   │   │   │    │
           │                                                                  │   │   │    │
           └────────────── Integration & Contradiction Resolution ────────────┴───┴───┴────┘
```

**Parallelizable sets:**
- Sprints 1, 2, 3, 4, and 6 can all begin immediately from Backbone outputs.
- Sprint 5 waits on Sprints 2 + 3 + 4.
- Sprint 7 waits on Sprints 5 + 6.
- Sprint 8 waits on Sprint 7.
- Sprint 9 waits on Sprints 5 + 8.
- Sprint 10 waits on Sprints 6 + 7.
- Integration waits on all sprints.

> **Note:** Sprint Inputs may also draw on always-available Backbone objects (e.g. Sprint 8 draws `Backbone.competitor_inventory`; Sprint 9 draws `Sprint 4.wtp_proxies` as a transitively satisfied upstream) — these cross-edges are omitted from the diagram above for readability but are stated explicitly in each sprint's Inputs section.

## Heuristics

- Prefer primary datasets and systematic reviews over opinion pieces
- When credible sources conflict, show both and explain method/sample differences
- Reduce adjectives; increase observable behaviors and numbers with ranges
- If a truth is situational, state boundary conditions explicitly
- A where-to-play option with high attractiveness but low right-to-win is a trap — flag it explicitly rather than silently deprioritizing it

## What NOT to Do

- Do not rely on a single think-piece or vendor blog for a claim
- Do not give point estimates for economic claims — Sprint 9 and all unit economics require ranges with explicit inputs, or the math reads as fabricated
- Do not invent survey results or fabricate review verbatims
- Do not skip claim sheets — every sprint must produce one
- Do not promote Backbone observations directly to accepted claims — the Backbone is shared input; only a sprint's acceptance gates produce a claim
- Do not draft a winning aspiration without explicit boundaries — unbounded ambition fails Sprint 1's gate
- Do not name a how-to-win advantage type as "better product" or "best-in-class" — these are not advantage types; name the mechanism
- Do not run Sprint 5 (where-to-play) before Sprints 2, 3, and 4 complete — a where-to-play map without sizing, JTBD validation, and segment WTP has nothing to score against
- Do not run Sprint 10 (differentiation wedge) before Sprints 6 and 7 finish — the wedge requires both the capability gap map and the how-to-win hypothesis to establish that the white space is real and defensible

## Output Format

Deliver the final output as structured JSON conforming to the schema in `references/output-schema-tier-a.md`.

The JSON must include: `product_name`, `category`, `audience`, `backbone_repository`, `tierA_results` (all 10 elements with claim sheets), `contradiction_matrix`, `sources`, and `audit_log`.

**Forward chaining:** When this skill completes, its full output object becomes the input seed for Layer 3 (Productprint Tier-B). Preserve the complete JSON — Layer 3 needs the winning aspiration, JTBD outcomes, segments, where-to-play map, how-to-win hypothesis, required capabilities, economic engine, and differentiation wedge to produce strategic bets, Now/Next/Later roadmap, build/buy/partner decisions, prioritization model, and risk register. If the `productprint-tier-b` skill is available, proceed directly into it without user confirmation.

## Evaluation Rubric

1. **Backbone completeness** — shared inputs exist and are cited; in existing-product mode, internal artifacts are seeded first
2. **Cascade coherence** — the 10 elements link: winning aspiration is bounded by category sizing; JTBD informs segments; segments constrain where-to-play; competitive teardown grounds how-to-win; capabilities and economic engine tie to the selected where-to-play options; wedge emerges from the gap map
3. **Proof density** — each Tier-A claim meets or exceeds proof minimums
4. **Conflict hygiene** — contradictions logged and resolved or bounded
5. **Economic sanity** — ranges and inputs are explicit; LTV:CAC ratio is computed; no hidden math; payback sensitivity is named
6. **Advantage specificity** — how-to-win names a mechanism type, not a brand aspiration
7. **Traceability** — every claim ties to sources with stances
8. **Reusability** — outputs slot cleanly into the Productprint scaffold and forward into Layers 3–6

## File I/O Contract (orchestrated mode)

> **Note:** automated orchestrated mode is not included in this release; run the manual chain. This contract is a forward-looking specification.

When an authorized orchestrator provides explicit paths, honor them exactly:

- **Seed inputs:** read ONLY the JSON/YAML files listed in the dispatch prompt.
- **Output:** write the final JSON object to the exact path given (under `.productprint/engagements/{slug}/pass-N/`). No other location.
- **Return value:** your final message is the output path plus the layer's key artifact — not the full JSON. The orchestrator reads files, not transcripts.

When invoked as a direct skill call, present the JSON in conversation or through the supported file workflow and tell the user to preserve it for the next layer.
