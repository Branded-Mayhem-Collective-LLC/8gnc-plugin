---
name: productprint-tier-b
description: Use when the user asks for Tier-B product strategy elements — strategic bets, Now/Next/Later roadmap, build-vs-buy-vs-partner decisions, prioritization model, risk register, or roadmap sequencing — Layer 3 of the Productprint research stack. Also trigger on "run Tier-B," "Productprint Tier-B," "strategic bets," "roadmap horizons," "Now/Next/Later," "build vs buy," "prioritization model," "risk register," or when the user wants a sequenced, evidence-backed product plan derived from existing Tier-A strategy research. Use immediately when the productprint-tier-a skill has just completed — chain directly using its output as the seed.
---

# Productprint Tier-B — Strategic Bets, Roadmap & Risk Directive

Deliver 5 Tier-B product strategy elements that are sequenced, falsifiable, and aligned to validated Tier-A truths. The Now/Next/Later roadmap is the marquee output: its ordering MUST be justified by inter-bet dependencies and kill-criterion thresholds, not intuition. Evidence is lightweight but real. Every element with a testable behavioral signal gets a proxy test.

## When NOT to Use

- **No Tier-A output exists.** Tier-B derives, it doesn't originate. Run `productprint-tier-a` first — standalone mode here produces reduced-confidence output and says so in the audit log.
- **Full product specifications or technical architecture.** Bets, roadmap horizons, and the risk register are strategy-layer artifacts. Technical specs, API designs, and sprint plans are implementation work outside this chain.
- **Adversarial differentiation testing.** Tier-B checks alignment with Tier-A, not competitive positioning stress-testing — that's `thesis-stress-test` (Layer 5).

## Chain Position

This is **Layer 3** of a 6-layer Productprint research stack:

1. **Core Strategic Truth** (Layer 1) → foundational tension sentence, tension map, JTBD seed, archetypes, lexicon
2. **Productprint Tier-A** (Layer 2) → 10 defensible Playing-to-Win cascade elements with evidence-gated sprints
3. **Productprint Tier-B** (this skill) → uses Layer 2 output as seed; produces 5 actionable strategy elements: bets, roadmap, build/buy/partner, prioritization, risk register
4. **Productprint Tier-C** (Layer 4) → uses Tier-A + Tier-B output as seeds; produces deployment-ready positioning and differentiation elements
5. **Thesis Stress-Test** (Layer 5) → adversarial pre-mortem gate; extracts load-bearing assumptions and tries to FALSIFY them; returns PROCEED if they survive or REFINE (with a constraint package) if one falls
6. **Strategy Thesis Compiler** (Layer 6) → compiles all layers into a consulting-grade integrated strategy thesis deliverable

**When Layer 2 has just completed:** Import its full output JSON directly. Pull Tier-A anchors — `winning_aspiration`, `jtbd_outcomes`, `where_to_play_map`, `how_to_win_hypothesis`, `required_capabilities`, `economic_engine`, `differentiation_wedge` — into the Intake phase. Do not re-research what Layers 1–2 already validated. Carry forward all sources and the contradiction matrix.

**When running standalone:** Resolve all variables with the user. If no Tier-A backbone exists, build a lightweight Backbone Tap from scratch using desk research, but note reduced confidence in the audit log.

## Variables to Resolve

Before starting, confirm these with the user (or inherit from Layers 1–2):

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `product_name` | The product, platform, or solution being researched | *required* |
| `topic` | Product or category scope | *required* |
| `audience` | Primary buyer/operator audience definition | *required* (or from Layer 2) |
| `region_context` | Geography or cultural context | US / English-speaking |
| `constraints` | Scope, legal, or strategic constraints | None |
| `languages` | Output language | English |
| `planning_horizon` | Time window for Now/Next/Later horizons | Now=0-6mo, Next=6-18mo, Later=18mo+ |
| `mode` | `rapid`, `standard`, or `enterprise` | `standard` |
| `backbone_source` | Link or reference to Tier-A backbone repository | From Layer 2 if chained |

## Principles (Non-Negotiable)

1. **Evidence-informed, not evidence-bloated.** Two independent sources or one source + a behavioral proxy per claim.
2. **Bets are falsifiable.** Every strategic bet has a hypothesis AND a kill criterion — no kill criterion means no bet.
3. **Roadmap ordering is argued, not assumed.** Sequencing logic must cite inter-bet dependencies and kill-criterion thresholds. An unjustified sequence fails the gate.
4. **If an output conflicts with Tier-A,** either revise or state boundary conditions.
5. **No fabrication.** If data is unknown, label as unknown.

## Evidence & Citation Policy

For any external claim, include: title, publisher, URL, dates, and a one-line evidence note. Quote sparingly. Same citation format as Layers 1–2.

## Global Acceptance Gates

Every Tier-B element must meet these before its claim is accepted:

- **Proof minimum:** ≥2 independent sources OR 1 source + 1 behavioral proxy
- **Alignment check** against Tier-A winning aspiration, JTBD outcomes, required capabilities, and economic engine
- **Kill criterion required** on every strategic bet
- **Sequencing logic required** in roadmap horizons — unjustified order fails the gate
- **Leading indicator required** on every risk register entry

**Mode adjustments:**
- *Rapid:* Single pass using Backbone + 1 proxy test per testable element; kill criteria may be lightweight
- *Standard:* Backbone + 2 proxy tests per testable element; full dependency map; leading indicators required
- *Enterprise:* Add cross-segment risk variants, pre-registered test plans, and scenario modeling for each horizon

## What NOT to Do

- Don't invent survey results
- Don't contradict Tier-A without stating limits
- Don't ship jargon
- Don't skip proxy tests on testable elements — strategic bets, roadmap horizons, and the prioritization model each need at least one behavioral signal
- Don't copy Tier-A proof points verbatim as proxy tests — proxy tests must be designed fresh per element (leading indicator, activation signal, kill-criterion threshold check)
- Don't write a strategic bet without a kill criterion — an un-killable bet is a commitment, not a hypothesis
- Don't justify roadmap ordering with "this feels like the right sequence" — cite the dependency type and which Tier-A assumption gates the downstream bet
- Don't score prioritization model dimensions from intuition — each dimension (impact, confidence, effort) must cite its source in Tier-A evidence
- Don't list risks without leading indicators — a risk without an early warning signal is not actionable

## Workflow

### Phase 0: Intake & Alignment

**Goal:** Confirm context and pull Tier-A anchors.

Actions:
- Resolve all variables; pull Tier-A anchors: `winning_aspiration`, `jtbd_outcomes` (top 3), `segments_wtp`, `where_to_play_map`, `how_to_win_hypothesis`, `required_capabilities`, `economic_engine`, `differentiation_wedge`
- List constraints (legal, strategic scope, cultural sensitivities)
- Define success criteria per element (see acceptance gates in each sprint)
- Flag any Tier-A contradictions to watch during sprint execution

Outputs: `alignment_brief`, `tierA_anchor_summary`, `success_criteria`, `contradictions_watchlist`

---

### Phase: Backbone Tap

**Goal:** Reuse existing evidence; no re-collection if unnecessary.

Actions:
- Inherit competitor inventory, review verbatims, search-intent phrases, economic benchmarks, and behavioral proxies from Tier-A Backbone
- Flag contradictions to watch across sprints
- Note any evidence gaps that must be filled with lightweight desk research

If no Tier-A Backbone exists, conduct lightweight desk research to populate: competitor capability profiles (min 5), market sizing references (min 2), behavioral proxies (min 3). Log reduced confidence.

Outputs: `backbone_refs_used`, `contradictions_watchlist`

---

### Sprint: Strategic Bets

**Goal:** Define the 3–5 falsifiable bets that, if won, deliver the winning aspiration. Each bet requires a hypothesis and a kill criterion; each ties to a required capability from Tier-A Sprint 8.

Actions:
- Derive bet candidates from Tier-A `how_to_win_hypothesis` and `required_capabilities`
- For each candidate, write the hypothesis: "If we do X, we will achieve Y, as evidenced by Z"
- For each candidate, write the kill criterion: the observable signal that invalidates the bet; must be specific enough to trigger a decision
- Map each bet to its `required_capability` ref from Tier-A Sprint 8
- Design a proxy test for the leading bet: a behavioral signal (activation rate, adoption rate, leading indicator metric) that can be observed before full resource commitment
- Reduce to 3–5 bets; rank by kill-criterion risk (highest-risk bets need the most confidence before proceeding)

**Acceptance gates:**
- Proof minimum: ≥2 (independent sources or 1 source + 1 behavioral proxy)
- Kill criterion required on EVERY bet — no kill criterion, no bet
- Alignment with Tier-A `required_capabilities` and `how_to_win_hypothesis` required
- Proxy test required for at least the leading bet

Outputs: `bets_list`, `kill_criteria`, `proxy_test`, `claim_sheet`

---

### Sprint: Roadmap Horizons (Now/Next/Later)

**Goal:** Sequence the strategic bets into a Now/Next/Later roadmap where the ordering is justified by dependencies and kill-criterion thresholds. This is the marquee output of Tier-B.

Actions:
- Map inter-bet dependencies: which bets are prerequisites for others? Which bets provide learning gates that must fire before downstream bets begin?
- Classify each dependency type: prerequisite, risk-gate, resource-constraint, or learning-gate
- Assign bets to Now (0–6 months), Next (6–18 months), or Later (18+ months) based on the dependency map AND each bet's confidence score from Tier-A
- Write sequencing logic that cites specific dependencies and kill-criterion thresholds — this is the argumentation that makes the roadmap auditable
- Design a proxy test for the Now horizon: a leading indicator that would trigger Now→Next promotion or a bet kill before the Next horizon begins
- Surface trade-offs: where do two bets compete for the same capability or window?

**Acceptance gates:**
- Proof minimum: ≥2
- `sequencing_logic` MUST cite inter-bet dependencies and kill-criterion thresholds — an unjustified sequence fails this gate
- Dependency map required; each edge must name its type
- Alignment with Tier-A winning aspiration and planning horizon required
- Proxy test required for Now horizon

Outputs: `now`, `next`, `later`, `sequencing_logic`, `dependencies`, `proxy_test`, `claim_sheet`

---

### Sprint: Build-vs-Buy-vs-Partner

**Goal:** For each required capability from Tier-A Sprint 8, make one explicit build/buy/partner decision with evidence-backed rationale.

Actions:
- List every required capability from Tier-A Sprint 8
- For each, evaluate: build (cost, timeline, defensibility), buy (cost, integration risk, vendor lock-in), partner (strategic alignment, control, revenue share)
- Select the path that wins on at least two of: cost, speed-to-capability, defensibility, integration risk
- Write a plain-language rationale; note what you're trading away
- Flag where a "build" choice is chosen purely for control without a defensibility argument — these require additional scrutiny

**Acceptance gates:**
- Proof minimum: ≥2 per capability decision
- Rationale MUST address at least two of: cost, speed, defensibility, integration risk
- Alignment with Tier-A `economic_engine` (capacity to fund) and `how_to_win_hypothesis` (does this choice support the advantage type?) required
- "Build for control" without defensibility must be flagged

Outputs: `bbp_decisions`, `claim_sheet`

---

### Sprint: Prioritization Model

**Goal:** Score the strategic bets using impact × confidence / effort so priority is evidence-backed, not intuitive.

Actions:
- For each bet, rate impact (1–5) against Tier-A JTBD outcome importance scores and economic engine metrics — impact must be tied to a specific Tier-A claim, not asserted
- For each bet, rate confidence (1–5) from the relevant Tier-A claim sheet confidence level and proof density — high=4–5, medium=3, low=1–2
- For each bet, rate effort (1–5) from build/buy/partner rationale and required capability gap assessments — 1=lowest effort (partner/buy light), 5=highest (build complex, absent capability)
- Compute score = (impact × confidence) / effort
- Document the scoring method so it can be re-run as assumptions change
- Design a proxy test: the smallest observable signal that would shift the top-priority bet's impact or confidence rating

**Acceptance gates:**
- Proof minimum: ≥2 per rated dimension
- ALL three dimensions must be evidence-backed — ungrounded scores fail this gate
- Impact must tie to a Tier-A JTBD outcome or economic engine metric
- Proxy test required

Outputs: `prioritized_bets`, `scoring_method`, `proxy_test`, `claim_sheet`

---

### Sprint: Risk Register + Leading Indicators

**Goal:** Identify the risks that threaten Tier-A assumptions or bet success, and pair each with a leading indicator that fires before the risk materializes.

Actions:
- From Tier-A's assumption set and the bet kill criteria, identify 5–10 risks that would break the strategy
- For each risk, name the specific Tier-A assumption or bet it threatens — an unanchored risk gets ignored
- Rate likelihood (low/medium/high) and severity (low/medium/high) with evidence
- Write a `leading_indicator` — the observable early signal that fires before the risk materializes; this is the management-system hook that makes the register actionable
- Write a `mitigation` — the concrete pre-planned response to execute when the leading indicator fires; not a platitude, a decision
- Prioritize by severity × likelihood; surface the top 3 in the summary

**Acceptance gates:**
- Proof minimum: ≥2
- EVERY risk requires a `leading_indicator` — no indicator, no actionable risk entry
- EVERY risk must map to a specific Tier-A assumption it threatens
- Alignment with Tier-A `required_capabilities` and `differentiation_wedge` required

Outputs: `risk_list`, `leading_indicators`, `mitigations`, `tied_assumptions`, `claim_sheet`

---

### Phase: Integration & Packaging

**Goal:** Ensure Tier-B elements align and don't contradict Tier-A; confirm the roadmap ordering is internally consistent.

Actions:
- Run contradiction check against Tier-A anchors: any Tier-B element that conflicts with Tier-A must be revised or carry explicit boundary conditions; record in audit log
- Verify roadmap consistency: Now bets' kill criteria are observable within Now horizon; Next bets' prerequisites are all in Now or complete; Later bets' assumptions are validated by Now/Next signals
- Verify build/buy/partner decisions are consistent with economic engine capacity from Tier-A Sprint 9
- Assemble quick rationale notes and citations
- Produce a one-paragraph summary per element for handoff

Outputs: `contradiction_check`, `roadmap_consistency_check`, `rationale_notes`, `tierB_summaries`

## Sprint Dependency Map

Sprints 1–3 (Strategic Bets, Roadmap Horizons, Build-vs-Buy-vs-Partner) have a partial dependency: Roadmap Horizons requires Strategic Bets to be complete; Build-vs-Buy-vs-Partner requires the Required Capabilities list from Tier-A Sprint 8 (already available). Sprints 4–5 (Prioritization, Risk Register) can begin in parallel after Bets are drafted:

```
Tier-A Output (Layer 2)
    │
    ▼
Intake & Alignment
    │
    ▼
Backbone Tap ──┬── Sprint: Strategic Bets ──────────────────────────┐
               │       │                                             │
               │       ▼                                             │
               │   Sprint: Roadmap Horizons ────────────────────────┤
               │                                                     │
               ├── Sprint: Build-vs-Buy-vs-Partner ─────────────────┤
               │                                                     │
               ├── Sprint: Prioritization Model (after Bets) ───────┤
               │                                                     │
               └── Sprint: Risk Register (after Bets) ──────────────┤
                                                                     │
                         Integration & Packaging ◄───────────────────┘
```

**Parallelizable sets:**
- Strategic Bets must run first (Roadmap Horizons and Prioritization Model depend on it).
- Roadmap Horizons waits on Strategic Bets.
- Build-vs-Buy-vs-Partner draws on Tier-A Sprint 8 `required_capabilities` — runs independently of Bets.
- Prioritization Model waits on Strategic Bets (needs bet list).
- Risk Register waits on Strategic Bets (needs kill criteria and hypotheses).
- Integration waits on all sprints.

## Heuristics

- If you can't articulate the kill criterion in one sentence, the bet isn't specific enough
- Roadmap ordering that "feels right" must be argued — trace the dependency and name it
- Leading indicators are metrics that move before outcomes, not metrics that confirm outcomes
- Prioritize proxy tests that cost less than the decision they inform
- If two bets score identically, put the one with the faster kill criterion first — learning is itself a product

## Output Format

Deliver the final output as structured JSON conforming to the schema in `references/output-schema-tier-b.md`.

The JSON must include: `product_name`, `topic`, `audience`, `backbone_refs_used`, `tierB_results` (all 5 elements with proxy tests where applicable), `sources`, and `audit_log`.

**Forward chaining:** When this skill completes, its full output object becomes the input seed for Layer 4 (`productprint-tier-c`). Preserve the complete JSON — Layer 4 needs the strategic bets, roadmap horizons, build/buy/partner decisions, and risk register to produce deployment-ready positioning and differentiation elements. Also preserve the Tier-A JSON from Layer 2; Layer 4 needs both. If the `productprint-tier-c` skill is available, proceed directly into it without user confirmation.

## Evaluation Rubric

1. **Alignment** — Tier-B outputs reflect Tier-A winning aspiration, JTBD outcomes, required capabilities, and economic engine without contradiction
2. **Evidence** — each element meets the Tier-B proof minimum (≥2 or 1+proxy)
3. **Falsifiability** — every bet has a hypothesis AND a kill criterion; every risk has a leading indicator
4. **Sequencing rigor** — roadmap horizon ordering is justified by dependencies and kill-criterion thresholds, not intuition; unjustified order fails this dimension
5. **Scoring discipline** — prioritization model dimensions are evidence-backed; no dimension is rated from intuition alone
6. **Actionability** — risk register leading indicators are specific enough to trigger a decision, not a meeting

## File I/O Contract (orchestrated mode)

> **Note:** automated orchestrated mode is not included in this release; run the manual chain. This contract is a forward-looking specification.

When an authorized orchestrator provides explicit paths, honor them exactly:

- **Seed inputs:** read ONLY the JSON/YAML files listed in the dispatch prompt.
- **Output:** write the final JSON object to the exact path given (under `.productprint/engagements/{slug}/pass-N/`). No other location.
- **Return value:** your final message is the output path plus the layer's key artifact — not the full JSON. The orchestrator reads files, not transcripts.

When invoked as a direct skill call, present the JSON in conversation or through the supported file workflow and tell the user to preserve it for the next layer.
