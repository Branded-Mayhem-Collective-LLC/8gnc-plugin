---
name: productprint-tier-c
description: Use when the user asks for Tier-C product positioning artifacts — positioning statement, product one-liner, bet narrative, strategy on a page, deployable differentiation outputs, or Layer 4 of the Productprint stack. Also trigger on "run Tier-C," "Productprint Tier-C," "positioning statement," "product one-liner," "strategy on a page," "roadmap narrative," "bet narrative," or when the user wants deployment-ready strategy artifacts derived from existing Tier-A and Tier-B research. Use immediately when the productprint-tier-b skill has just completed — chain directly using its output as the seed.
---

# Productprint Tier-C — Deployable Positioning Artifacts Directive

Deliver 4 Tier-C positioning artifacts that are deployment-ready, derivative, and human-facing. These outputs create no new strategic claims. Every line traces back to validated Tier-A and Tier-B truths. The job of this layer is translation: take the strategy cascade and make it readable, sticky, and usable by people who were not in the room when it was built.

## When NOT to Use

- **Tier-A or Tier-B output is missing.** This layer needs both as anchors. Without them, either collect equivalent inputs from the user or run the chain from Layer 1 — don't improvise anchors.
- **Creating new strategy or new claims.** Tier-C translates and packages what Layers 2–3 validated. If the product needs a new bet, capability, or differentiation argument, that's a Tier-A or Tier-B sprint, not a Tier-C edit.
- **Long-form copywriting.** Positioning statement, one-liner, bet narrative, and strategy on a page — that's the full scope. Sales decks, website copy, and investor memos are downstream deployment work.

## Chain Position

This is **Layer 4** of a 6-layer Productprint research stack:

1. **Core Strategic Truth** (Layer 1) → foundational tension sentence, tension map, JTBD seed, archetypes, lexicon
2. **Productprint Tier-A** (Layer 2) → 10 defensible Playing-to-Win cascade elements with evidence-gated sprints
3. **Productprint Tier-B** (Layer 3) → 5 actionable strategy elements: bets, roadmap, build/buy/partner, prioritization, risk register
4. **Productprint Tier-C** (this skill) → uses Tier-A + Tier-B output as seeds; produces 4 deployable positioning artifacts ready for team handoff
5. **Thesis Stress-Test** (Layer 5) → adversarial pre-mortem gate; extracts load-bearing assumptions and tries to FALSIFY them; returns PROCEED if they survive or REFINE (with a constraint package) if one falls
6. **Strategy Thesis Compiler** (Layer 6) → compiles all layers into a consulting-grade integrated strategy thesis deliverable

**When Layer 3 has just completed:** Import the full Tier-B output JSON and the Tier-A JSON carried forward. Pull positioning anchors — `winning_aspiration`, `where_to_play_map`, `how_to_win_hypothesis`, `required_capabilities`, `differentiation_wedge` from Tier-A; `strategic_bets`, `roadmap_horizons`, and `risk_register` leading indicators from Tier-B. Do not create new claims or re-research.

**When running standalone:** Resolve all variables with the user. If no Tier-A/B anchors exist, ask the user to provide equivalent inputs (winning aspiration, where-to-play selection, how-to-win hypothesis, required capabilities, differentiation wedge, bet list, risk leading indicators) or recommend running the full chain first.

## Variables to Resolve

Before starting, confirm these with the user (or inherit from Layers 1–3):

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `product_name` | The product, platform, or solution being positioned | *required* |
| `topic` | Product or category scope | *required* |
| `category` | The category frame the product competes in | *required* (or from Tier-A) |
| `audience` | Primary buyer/operator audience definition | *required* (or from Layer 2) |
| `region_context` | Geography or cultural context | US / English-speaking |
| `constraints` | Legal, brand safety, or strategic constraints | None |
| `languages` | Output language | English |
| `mode` | `rapid`, `standard`, or `enterprise` | `standard` |
| `tierA_anchor_ref` | Link or ID for Tier-A output | From Layer 2 if chained |
| `tierB_anchor_ref` | Link or ID for Tier-B output | From Layer 3 if chained |

## Principles (Non-Negotiable)

1. **Alignment first.** Every artifact must trace to Tier-A's cascade (winning aspiration, where-to-play, how-to-win, required capabilities, differentiation wedge) and Tier-B's strategy elements (bets, roadmap, risk leading indicators).
2. **Clarity over clever.** Plain language. Sixth-grade readability for public-facing lines. Zero internal jargon in the positioning statement and one-liner.
3. **No new claims.** If a line implies a capability, proof, or benefit not present in Tier-A or Tier-B, it is a new claim — reword or remove it.
4. **Translation, not reframing.** Strategy-on-a-page fields are translated from Tier-A/B, not synthesized fresh. Plain-language rewording is allowed; strategic reinterpretation is not.
5. **Comprehension gates are real gates.** The positioning statement and one-liner each require an explicit comprehension check. A check that says only "pass" without evidence fails the gate.

## Quality Gates (Global)

- Plain-language comprehension check for positioning statement and product one-liner
- Alignment check against Tier-A and Tier-B anchors for all 4 artifacts
- Word-count gate: product one-liner must be ≤25 words — over-length fails
- `bet_narrative.named_bets[].bet_ref` must reference an existing Tier-B bet — unanchored refs fail
- `strategy_on_a_page` fields must cite their Tier-A/B source field explicitly in the audit log

**Mode adjustments:**
- *Rapid:* One pass, one variant per element; single comprehension check
- *Standard:* Three variants for the one-liner; two variant wordings for the positioning statement; comprehension check for both
- *Enterprise:* Three positioning statement variants, five one-liner variants, cross-language comprehension check, and a mini translation rationale per artifact

## What NOT to Do

- Do not contradict Tier-A or Tier-B
- Do not invent a differentiator, proof point, or capability that does not exist in the Tier-A equity ladder or Tier-B bet list
- Do not use internal strategy vocabulary (winning aspiration, JTBD, kill criterion, economic engine) in the positioning statement, one-liner, or bet narrative — translate them out
- Do not use cliches or em dashes in positioning copy; keep punctuation simple
- Do not exceed 25 words in `product_one_liner.final` — this is a hard gate, not a guideline
- Do not reference a bet in `bet_narrative.named_bets` that does not exist in Tier-B's `strategic_bets` or `roadmap_horizons` — route new bets back through Tier-B
- Do not coin a new category frame inside a Tier-C sprint — if category reframing is needed, that is a Tier-A naming sprint
- Do not write the strategy-on-a-page `aspiration`, `where_to_play`, `how_to_win`, or `capabilities` fields from memory — pull and translate the exact Tier-A source text

## Workflow

### Phase 0: Intake and Anchor Pull

**Goal:** Load Tier-A and Tier-B anchors and constraints.

Actions:
- Load from Tier-A: `winning_aspiration`, `where_to_play_map` (selected options), `how_to_win_hypothesis`, `required_capabilities`, `differentiation_wedge`
- Load from Tier-B: `strategic_bets` list (names, hypotheses, kill criteria), `roadmap_horizons` (Now/Next/Later assignments), `risk_register` top leading indicators (by severity × likelihood)
- List any legal, cultural, or language constraints
- Build a short anchor summary: one line per pulled element, with its source field noted

Outputs: `anchor_summary`, `constraints_list`

---

### Phase 1: Derivation Map

**Goal:** Map each Tier-C artifact to its Tier-A and Tier-B parent fields before drafting begins.

Actions:
- Create a short matrix: each Tier-C artifact → the specific Tier-A and Tier-B fields it derives from
- Flag any possible contradictions or gaps for review before sprint execution begins

Outputs: `derivation_matrix`, `contradictions_watchlist`

---

### Sprint: Positioning Statement

**Goal:** Distill the product's position into a single structured sentence that a buyer can parse in one read, using the For-Who-Is-The-That-Because template.

Template: "For [segment] who [need], [product] is the [category] that [differentiator] because [proof]."

Actions:
- Pull the primary segment from Tier-A `segments_wtp`; pull the primary need from Tier-A `jtbd_outcomes` (top outcome)
- Pull the category frame from Tier-A `category_definition_sizing`
- Pull the differentiator from Tier-A `differentiation_wedge`
- Pull the proof from the Tier-A claim sheet with the highest confidence score
- Draft 2 positioning statement variants in standard mode (1 in rapid, 3 in enterprise)
- Run a comprehension check on the selected variant: "Would a non-expert buyer understand this in one read? Note any jargon or confusion points." Pass requires an explanation, not just the word "pass."
- Remove or translate any internal strategy vocabulary

**Acceptance gates:**
- Template structure must be present (For-Who-Is-The-That-Because)
- `[differentiator]` must trace to Tier-A `differentiation_wedge`
- `[proof]` must trace to a Tier-A claim sheet entry with evidence
- Comprehension check required — explicit pass/fail verdict with notes

Outputs: `positioning_statement_variants`, `final_positioning_statement`, `comprehension_check`, `claim_sheet`

---

### Sprint: Product One-Liner

**Goal:** Write the single ≤25-word sentence that explains what the product does and who benefits — not a slogan, but the clearest possible description of the product's value.

Actions:
- Pull the core JTBD outcome (top outcome from Tier-A `jtbd_outcomes`) and the primary segment
- Draft at minimum 3 variants in standard mode (1 in rapid, 5 in enterprise); every variant must be ≤25 words
- Remove all internal vocabulary; keep verbs active and concrete
- Run a comprehension check on the selected final: confirm ≤25 words, plain language, readable by a non-expert
- Select the final variant; confirm word count explicitly in the comprehension check

**Acceptance gates:**
- Hard limit: `final` is ≤25 words — over-limit fails this gate without exception
- Must describe what the product does and who benefits — slogans that skip the "what" fail
- Comprehension check required — must state word count and a pass/fail verdict with notes
- Alignment with Tier-A winning aspiration and primary JTBD outcome required

Outputs: `one_liner_variants`, `final_one_liner`, `comprehension_check`, `claim_sheet`

---

### Sprint: Bet Narrative

**Goal:** Write a buyer-readable story that explains what the product is betting on, why those bets are sequenced the way they are, and what winning looks like — without using internal strategy vocabulary.

Actions:
- Pull the bet list from Tier-B `strategic_bets`; pull the Now/Next/Later sequence from Tier-B `roadmap_horizons`
- Write 1–3 paragraphs that tell the story of the roadmap: what the product is doing first and why, what it will do next once the first bets land, and what the longer-term vision looks like when all bets compound
- Give each bet a plain-English public name (≤6 words) for use in external communications; record the `bet_ref` that maps it back to its Tier-B artifact
- Translate kill criteria and hypothesis language into buyer-readable cause-and-effect logic — do not use the words "kill criterion" or "hypothesis" in the narrative
- Remove any capability references that would reveal internal competitive strategy not meant for public disclosure; flag these in the audit log

**Acceptance gates:**
- `named_bets[].bet_ref` must reference an existing Tier-B bet or roadmap horizon — unanchored refs fail
- Story must flow in logical sequence consistent with Tier-B roadmap ordering — a narrative that contradicts the Now/Next/Later sequence fails
- No internal strategy vocabulary in the public story text
- Alignment with Tier-A `winning_aspiration` required — the narrative must point toward the same end state

Outputs: `bet_narrative_draft`, `named_bets`, `claim_sheet`

---

### Sprint: Strategy on a Page

**Goal:** Assemble the Playing-to-Win cascade and the top risk signals into a single-screen summary that lets any stakeholder understand the strategy without reading Layers 1–3.

Actions:
- Pull and translate (not re-synthesize) the following Tier-A fields:
  - `aspiration` ← `winning_aspiration.ambition` (one sentence)
  - `where_to_play` ← `where_to_play_map` selected options (plain-language summary, ≤2 sentences)
  - `how_to_win` ← `how_to_win_hypothesis` (plain-language summary, ≤2 sentences)
  - `capabilities` ← `required_capabilities` (3–5 capabilities, each ≤10 words)
- Pull and translate the top 3 Tier-B `risk_register` leading indicators (by severity × likelihood) into `must_track` entries; write a one-sentence rationale per indicator explaining why it is the right signal to watch
- Verify that all five field groups are internally consistent — if a capabilities list contradicts the how-to-win, flag it
- The output should be renderable on one slide or one printed page; brevity is the design constraint

**Acceptance gates:**
- All four pull fields must cite their source Tier-A/B field in the audit log — fields written from memory fail
- `must_track` entries must reference Tier-B `risk_register` leading indicators, not new ones invented here
- Internal consistency check required: `where_to_play` × `how_to_win` × `capabilities` must be coherent
- Comprehension: a stakeholder unfamiliar with Layers 1–3 must be able to understand the page without a glossary

Outputs: `strategy_on_a_page_draft`, `must_track_list`, `claim_sheet`

---

### Phase: Integration and Packaging

**Goal:** Assemble clean, ready-to-hand-off Tier-C outputs; verify all four artifacts are internally consistent and align with Tier-A/B anchors.

Actions:
- Run final alignment check across all 4 artifacts: verify each traces to its Tier-A/B anchor and carries no new claims
- Verify the four artifacts tell the same story — the positioning statement, one-liner, bet narrative, and strategy-on-a-page must be consistent with each other
- Package final variants and notes with simple usage guidance per artifact
- Update the derivation matrix with final source references

Outputs: `alignment_check`, `consistency_check`, `tierC_one_pagers`, `final_derivation_matrix`

> **Session-only artifacts:** `anchor_summary` (Phase 0), `contradictions_watchlist` (Phase 1), and `final_derivation_matrix` (Integration) are working artifacts used during the sprint session. They are NOT persisted to the output JSON. The persisted form of the derivation mapping is the top-level `derivation_matrix` array in the output schema; populate it during Integration from the session `final_derivation_matrix`.

## Sprint Dependency Map

Sprints 1–4 can run in parallel once the Derivation Map is complete; Integration waits for all four:

```
Tier-A Output (Layer 2) + Tier-B Output (Layer 3)
    │
    ▼
Intake and Anchor Pull
    │
    ▼
Derivation Map ──┬── Sprint: Positioning Statement ──────────┐
                 │                                           │
                 ├── Sprint: Product One-Liner ──────────────┤
                 │                                           │
                 ├── Sprint: Bet Narrative ──────────────────┤
                 │                                           │
                 └── Sprint: Strategy on a Page ─────────────┤
                                                             │
                        Integration and Packaging ◄──────────┘
```

All 4 core sprints can run in parallel after the Derivation Map. Integration waits for all to complete.

## Heuristics

- If the positioning statement takes more than one read, it is not done yet
- If the one-liner could describe three other products, it is not specific enough
- If a bet name sounds like internal vocabulary, translate it
- The strategy-on-a-page should make someone want to ask a question, not need one answered
- If two variants of the one-liner tie, keep the one with the active verb and the named audience

## Output Format

Deliver the final output as structured JSON conforming to the schema in `references/output-schema-tier-c.md`.

The JSON must include: `product_name`, `tierC_results` (all 4 elements), `sources`, and `audit_log`.

**Forward chaining:** When this skill completes, proceed into `thesis-stress-test` (Layer 5), passing Tier-A + Tier-B + Tier-C JSON. Layer 5 is the adversarial pre-mortem gate — it extracts every load-bearing assumption embedded in the strategy and tries to FALSIFY the highest-fragility one using disconfirmation queries. If the assumption survives a genuine attack, the verdict is PROCEED and the chain continues to Layer 6. If the falsification pass finds a fact that breaks the assumption, the verdict is REFINE — the gate emits a constraint package (broken assumption + what it changes + rebuild boundaries), and Layers 1–4 re-run with that package injected as a hard constraint, producing a truth-hardened strategy.

If the user wants to skip Layer 5 and go directly to the report, proceed to the `strategy-thesis-compiler` skill (Layer 6). Note that skipping the stress-test risks shipping positioning that collides with an entrenched competitor or bets that do not survive adversarial scrutiny.

## Evaluation Rubric

1. **Alignment** — every Tier-C artifact traces to Tier-A cascade fields and Tier-B strategy elements; no artifact introduces new claims
2. **Clarity** — positioning statement and one-liner pass the comprehension check; no jargon for an external audience
3. **Brevity** — one-liner is ≤25 words; strategy-on-a-page fits one screen or printed page
4. **Traceability** — derivation matrix is complete; `bet_ref` fields map to real Tier-B artifacts; strategy-on-a-page fields cite their source Tier-A/B fields in the audit log
5. **Consistency** — all four artifacts tell the same strategic story; no artifact contradicts another or contradicts the Tier-A/B cascade
6. **Deployability** — outputs are ready to paste into a deck, website, or investor brief without further strategy revision

## File I/O Contract (orchestrated mode)

> **Note:** automated orchestrated mode is not included in this release; run the manual chain. This contract is a forward-looking specification.

When an authorized orchestrator provides explicit paths, honor them exactly:

- **Seed inputs:** read ONLY the JSON/YAML files listed in the dispatch prompt.
- **Output:** write the final JSON object to the exact path given (under `.productprint/engagements/{slug}/pass-N/`). No other location.
- **Return value:** your final message is the output path plus the layer's key artifact — not the full JSON. The orchestrator reads files, not transcripts.

When invoked as a direct skill call, present the JSON in conversation or through the supported file workflow and tell the user to preserve it for the next layer.
