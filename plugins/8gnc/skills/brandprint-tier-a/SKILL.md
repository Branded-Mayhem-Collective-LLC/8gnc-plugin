---
name: brandprint-tier-a
description: Use when the user asks for a Brandprint, brand strategy research, Tier-A elements, brand architecture, competitive analysis paired with brand positioning, equity ladder, signature offers mapping, economic engine modeling, or any comprehensive brand strategy deliverable — Layer 2 of the Brandprint research stack. Also trigger on "run Tier-A," "brandprint research," "full brand audit," "brand sprint," or when the user wants audience segments, JTBD outcomes, competitive set, and positioning in one pass. Use immediately when the core-human-truth skill has just completed — chain directly using its output as the seed.
---

# Brandprint Tier-A — Hybrid Research Directive

Deliver all 10 Tier-A Brandprint elements using a hybrid method: build a shared evidence Backbone first, then run independent, falsifiable sprints per element — each with its own proofs and claim sheets.

## When NOT to Use

- **You only need quick positioning or stylistic outputs.** Tier-C requires Tier-A and Tier-B as seeds — there is no shortcut to a mantra. Run the full chain, or run this skill in `rapid` mode to lighten the load.
- **No access to real market evidence.** Every sprint gates on ≥3 independent sources or behavioral signals. Without reviews, search data, and competitor materials to mine, the claims can't clear the gates.
- **Validating existing positioning against competitors.** That's an adversarial test, not a build — use `competitive-positioning-audit` (Layer 5).

## Chain Position

This is **Layer 2** of a 6-layer Brandprint research stack:

1. **Core Human Truth** (Layer 1) → foundational truth sentence, tension map, archetypes, lexicon
2. **Brandprint Tier-A** (this skill) → uses Layer 1 output as seed; produces 10 defensible brand strategy elements
3. **Brandprint Tier-B** (Layer 3) → uses Tier-A output as seed; produces 5 actionable brand elements with proxy tests
4. **Brandprint Tier-C** (Layer 4) → uses Tier-A + Tier-B output as seeds; produces 4 stylistic elements ready for deployment
5. **Competitive Positioning Audit** (Layer 5) → validates differentiation against named competitors; may trigger second-pass refinement
6. **Brand Strategy Report** (Layer 6) → compiles all layers into consulting-grade deliverable

**When Layer 1 has just completed:** Import its output directly. The `final_sentence`, `tension_map`, `archetypes`, and `lexicon` from Core Human Truth seed the Backbone phase — do not re-research what Layer 1 already validated. Carry forward its sources into the Backbone bibliography.

**When running standalone:** Resolve all variables with the user and build the Backbone from scratch.

## Variables to Resolve

Before starting, confirm these with the user (or inherit from Layer 1):

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `brand_name` | The brand being researched | *required* |
| `topic` | Product, service, or subject | *required* |
| `category` | Industry or category | *required* |
| `audience` | Primary audience definition | *required* (or from Layer 1) |
| `region_context` | Geography or cultural context | US / English-speaking |
| `constraints` | Scope, legal, or brand constraints | None |
| `mode` | `rapid`, `standard`, or `enterprise` | `standard` |

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
- **Claim sheet required:** statement, boundaries, counter-evidence, confidence rating
- **Comprehension checks** for any public-facing lines (tagline, promises)
- **Economic claims** require simple math with explicit ranges and inputs

**Mode adjustments:**
- *Rapid:* ≥2 sources per claim, 1 behavioral proxy, lightweight comprehension checks
- *Standard:* Full desk research, corpus mining, structured validation
- *Enterprise:* Add cross-market slices, expert panels, longitudinal comparisons

## Workflow

### Phase: Backbone Evidence Garage

**Goal:** Assemble shared inputs once. No final claims yet.

Actions:
- **Landscape scan** — category definition, purchase contexts, substitutes
- **Macro data pull** — longitudinal stats relevant to the topic and audience
- **Review corpus** — collect public reviews, forums, social posts where permitted; store verbatims with links
- **Search-intent map** — SERP, marketplaces, app stores; identify real buyer language
- **Competitor inventory** — top direct and substitutes; capture offers, pricing, proof signals
- **Contradictions log** — note conflicts to test in sprints

If Layer 1 output is available, merge its tension map, archetypes, lexicon, and sources into the Backbone. Do not duplicate research Layer 1 already completed.

Outputs: `annotated_bibliography`, `macro_data_summary`, `review_verbatim_library`, `search_intent_map`, `competitor_inventory`, `contradictions_log_seed`

---

### Sprint 1: Audience Insight + Problem/Tension (paired)

**Inputs:** All Backbone outputs (+ Layer 1 tension map if available)

Actions:
- Extract recurring tensions and triggers from verbatims and search intent
- Draft 3–5 tension statements in audience language
- Score frequency × severity; map triggers to contexts
- Run counter-arguments using conflicting sources

**Acceptance gates:** proof_minimum ≥3, deliver claim sheet

Outputs: `tension_statements_ranked`, `problem_trigger_matrix`, `claim_sheet_audience_problem`

---

### Sprint 2: Desired Outcomes

**Inputs:** `Backbone.review_verbatim_library`, `Sprint 1.tension_statements_ranked`

Actions:
- Convert verbatims to JTBD outcome statements
- Estimate importance and satisfaction gap from credible third-party data or behavioral proxies
- Reduce to top 3 outcomes with boundaries

**Acceptance gates:** proof_minimum ≥3, deliver claim sheet

Outputs: `outcome_statements_top3`, `importance_gap_notes`, `claim_sheet_outcomes`

---

### Sprint 3: Target Audience

**Inputs:** `Backbone.macro_data_summary`, `Backbone.search_intent_map` (+ Layer 1 archetypes if available)

Actions:
- Define 1–3 segments with demographic/firmographic and psychographic cues
- Estimate addressable size bounds using reputable datasets
- Derive willingness-to-pay proxies from pricing signals and switching behaviors

**Acceptance gates:** proof_minimum ≥3, boundaries required, deliver claim sheet

Outputs: `segments_defined`, `size_bounds`, `wtp_proxies`, `signals_identifiers`, `claim_sheet_target`

---

### Sprint 4: Competitive Set

**Inputs:** `Backbone.competitor_inventory`, `Backbone.search_intent_map`

Actions:
- Identify top 5 direct competitors and top 5 substitutes
- Map where they appear along buyer journeys (SERP, marketplaces, referrals)
- Produce substitute map and positioning grid

**Acceptance gates:** proof_minimum ≥3, deliver claim sheet

Outputs: `direct_competitors`, `substitutes`, `substitute_map`, `positioning_grid`, `claim_sheet_competition`

---

### Sprint 5: Signature Offers/Services

**Inputs:** `Sprint 2.outcome_statements_top3`, `Sprint 4.positioning_grid`

Actions:
- Draft 5–8 offers mapped feature → benefit → outcome
- Run basic unit economics sanity with transparent inputs and ranges
- Identify proof requirements per offer (demo metrics, guarantees, case signals)

**Acceptance gates:** proof_minimum ≥3, unit economics required, deliver claim sheet

Outputs: `offers_list`, `feature_benefit_outcome_map`, `unit_economics_ranges`, `claim_sheet_offers`

---

### Sprint 6: Expertise (Authority Signals)

**Inputs:** `Backbone.annotated_bibliography`

Actions:
- Compile independent signals of expertise (press, citations, awards, credentials, case outcomes)
- Summarize 3+ case outcomes with measurable results or reputable testimonials

**Acceptance gates:** proof_minimum ≥3, third-party required, deliver claim sheet

Outputs: `expertise_proofs`, `case_outcome_summaries`, `claim_sheet_expertise`

---

### Sprint 7: Economic Engine

**Inputs:** `Sprint 5.unit_economics_ranges`, `Sprint 3.size_bounds`

Actions:
- Model CAC/LTV ranges with explicit channel mix assumptions
- State payback window assumptions and sensitivity to key levers
- Document boundary conditions where the model breaks

**Acceptance gates:** math transparency required, ranges required, deliver claim sheet

Outputs: `engine_model_ranges`, `payback_window_bounds`, `sensitivity_notes`, `claim_sheet_economic_engine`

---

### Sprint 8: Core Equities/Programs

**Inputs:** `Backbone.search_intent_map`, `Sprint 4.positioning_grid`

Actions:
- List distinctive assets and tent-pole programs tied to recognition and recall
- Estimate share-of-search or analogous recall proxies where available

**Acceptance gates:** proof_minimum ≥3, deliver claim sheet

Outputs: `core_equities_list`, `distinctiveness_proofs`, `recall_proxy_notes`, `claim_sheet_core_equities`

---

### Sprint 9: Equity Ladder Linkage

**Inputs:** `Sprint 5.feature_benefit_outcome_map`, `Sprint 6.expertise_proofs`

Actions:
- Assemble Equity → Benefits → Features → Reasons-to-Believe
- Ensure every benefit has at least one credible proof; remove, reword, or add proof

**Acceptance gates:** no orphan benefits, deliver claim sheet

Outputs: `equity_ladder`, `proof_gaps_closed`, `claim_sheet_equity_ladder`

---

### Sprint 10: One-Line Promise/Tagline

**Inputs:** `Sprint 9.equity_ladder`, `Sprint 2.outcome_statements_top3`, `Sprint 1.tension_statements_ranked` (+ Layer 1 final_sentence and lexicon if available)

Actions:
- Draft 3–5 variants ≤25 words using audience language
- Run plain-language and confusion checks
- Select winner based on evidence tie-back and comprehension

**Acceptance gates:** max 25 words, comprehension check required, deliver claim sheet

Outputs: `tagline_variants`, `comprehension_notes`, `final_tagline`, `claim_sheet_tagline`

---

### Phase: Integration & Contradiction Resolution

**Goal:** Resolve conflicts, finalize linkages, and package outputs.

Actions:
- Update contradiction matrix across all sprints; resolve or set boundaries
- Assemble rationale narrative connecting tensions to proofs
- Compile lexicon: words that resonate/repel from corpus
- Finalize sources with stances and evidence notes

Outputs: `contradiction_matrix`, `rationale_narrative`, `lexicon`, `sources_final`

## Sprint Dependency Map

Understanding which sprints can run in parallel vs. which must wait:

```
Backbone ──┬── Sprint 1 (Audience/Problem) ──┬── Sprint 2 (Desired Outcomes) ──┐
           │                                  │                                 │
           ├── Sprint 3 (Target Audience) ─────────────────────────────────────┤
           │                                                                   │
           ├── Sprint 4 (Competitive Set) ──┬── Sprint 5 (Offers) ────────────┤
           │                                │                                  │
           ├── Sprint 6 (Expertise) ────────┼──────────────────────────────────┤
           │                                │                                  │
           │                                └── Sprint 8 (Core Equities)      │
           │                                                                   │
           │   Sprint 3 + Sprint 5 ──── Sprint 7 (Economic Engine)            │
           │   Sprint 5 + Sprint 6 ──── Sprint 9 (Equity Ladder)             │
           │   Sprint 1 + Sprint 2 + Sprint 9 ──── Sprint 10 (Tagline)       │
           │                                                                   │
           └──────────────────── Integration & Contradiction Resolution ───────┘
```

## Heuristics

- Prefer primary datasets and systematic reviews over opinion pieces
- When credible sources conflict, show both and explain method/sample differences
- Reduce adjectives; increase observable behaviors and numbers with ranges
- If a truth is situational, state boundary conditions explicitly

## What NOT to Do

- Do not rely on a single think-piece or vendor blog for a claim
- Do not exceed 25 words for the final Promise/Tagline
- Do not invent survey results
- Do not skip claim sheets — every sprint must produce one
- Do not promote Backbone observations directly to accepted claims — the Backbone is shared input; only a sprint's acceptance gates produce a claim
- Do not give point estimates for economic claims — Sprint 7 and unit economics require ranges with explicit inputs, or the math reads as fabricated
- Do not run Sprint 10 (Tagline) before Sprints 1, 2, and 9 finish — a tagline drafted without ranked tensions and the equity ladder has nothing to tie back to

## Output Format

Deliver the final output as structured JSON conforming to the schema in `references/output-schema-tier-a.md`.

The JSON must include: `brand_name`, `topic`, `audience`, `backbone_repository`, `tierA_results` (all 10 elements with claim sheets), `contradiction_matrix`, `sources`, and `audit_log`.

**Forward chaining:** When this skill completes, its full output object becomes the input seed for Layer 3 (Brandprint Tier-B). Preserve the complete JSON — Layer 3 needs tensions, outcomes, audience, equity ladder, competition, and tagline to produce actionable brand elements. If the `brandprint-tier-b` skill is available, proceed directly into it without user confirmation.

If the user has the `branded-mayhem-pdf` skill available, offer to generate a branded PDF deliverable of the Tier-A results.

## Evaluation Rubric

1. **Backbone completeness** — shared inputs exist and are cited
2. **Proof density** — each Tier-A claim meets or exceeds proof minimums
3. **Conflict hygiene** — contradictions logged and resolved or bounded
4. **Comprehension** — public lines pass plain-language checks
5. **Economic sanity** — ranges and inputs are explicit; no hidden math
6. **Traceability** — every claim ties to sources with stances
7. **Reusability** — outputs slot cleanly into the Brandprint scaffold and forward into Layers 3–4

## File I/O Contract (orchestrated mode)

When an authorized orchestrator provides explicit paths, honor them exactly:

- **Seed inputs:** read ONLY the JSON/YAML files listed in the dispatch prompt.
- **Output:** write the final JSON object to the exact path given (under
  `.brandprint/engagements/{slug}/pass-N/`). No other location.
- **Return value:** your final message is the output path plus the layer's key
  artifact — not the full JSON. The orchestrator reads files, not transcripts.

When invoked as a direct skill call, present the JSON in conversation or through the supported file workflow and tell the user to preserve it for the next layer.
