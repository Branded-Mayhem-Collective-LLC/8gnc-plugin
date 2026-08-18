---
name: thesis-stress-test
description: Use to run a thesis stress test, strategy pre-mortem, or assumption falsification on a Productprint — Layer 5 of the Productprint stack, the adversarial gate. Trigger on "thesis stress test," "strategy pre-mortem," "assumption falsification," "load-bearing assumption," "what breaks this strategy," "PROCEED or REFINE," "stress-test the thesis," "is this assumption actually true," or when productprint-tier-c has just completed and the integrated strategy thesis needs adversarial validation before compiling. This skill extracts every assumption the strategy rests on, ranks them by fragility, and tries to BREAK the load-bearing few — returning PROCEED if they survive or REFINE (with a constraint package) if one falls.
---

# Thesis Stress-Test — Adversarial Pre-Mortem Gate

This is **Layer 5** of the Productprint stack: the adversarial gate. It does NOT validate that a buyer can tell the product apart from competitors (that is Brandprint's competitive-positioning-audit, a different question for a different deliverable). It runs a **structured pre-mortem on the one assumption that, if false, collapses the whole strategy** — and then tries to prove that assumption false.

Brandprint's gate asks *"can a buyer tell us apart?"* Productprint's gate asks *"what's the one assumption that, if false, kills this thesis — and is it actually true?"* The two-pass loop is preserved, but the second pass is about **truth-hardening**, not vocabulary-dodging.

## ADVERSARIAL STANCE (read before anything else)

> **You are adversarial. Your job is to BREAK the thesis.**
>
> - Do NOT look for confirming evidence. Look for the single fact that makes the strategy collapse.
> - Counter-evidence is the **success condition** of this skill, not a failure. Finding the killing fact is the point. A falsification pass that only assembles supporting evidence has not done its job.
> - **A gate that always says PROCEED is broken.** If you cannot remember the last time a gate like this returned REFINE, you are confirming, not falsifying. Assume the thesis is wrong and go hunting for the proof.
> - Frame every research query as a disconfirmation query: "find evidence that X is false," never "find evidence that X is true."
> - An assumption that *survives* a genuine attempt to break it has earned its place. An assumption that was never genuinely attacked has not — the verdict is meaningless without a real attack.

## When NOT to Use

- **No upstream Productprint exists.** This gate tests Tier-A/B/C output; it does not create strategy. Run Layers 1–4 first.
- **You want competitive differentiation testing.** That's "can a buyer tell us apart?" — a Brandprint question, not a strategy-thesis question. This gate tests whether the strategy is *true*, not whether it is *distinctive*.
- **Category white-space mapping.** Use `competitive-teardown`. This skill tests assumptions the strategy already made, not the open category.

## Chain Position

This is **Layer 5** of the 6-layer Productprint stack. It **consumes the Tier-A + Tier-B + Tier-C JSON**:

1. **Core Strategic Truth** (Layer 1) → foundational tension sentence, JTBD seed, lexicon
2. **Productprint Tier-A** (Layer 2) → 10 Playing-to-Win cascade elements, each with a claim sheet
3. **Productprint Tier-B** (Layer 3) → strategic bets, Now/Next/Later roadmap, build/buy/partner, prioritization, risk register, each with a claim sheet
4. **Productprint Tier-C** (Layer 4) → positioning statement, one-liner, bet narrative, strategy-on-a-page, each with a claim sheet
5. **Thesis Stress-Test** (this skill) → assumption ledger → fragility ranking → falsification → PROCEED/REFINE
6. **Strategy Thesis Compiler** (Layer 6) → compiles all layers into the consulting-grade integrated thesis

**When Layer 4 has just completed:** Import the full Tier-A, Tier-B, and Tier-C JSON. Walk every `claim_sheet` to extract assumptions. Inherit `evidence_mode` (`greenfield` | `existing-product`) and `mode` (`rapid` | `standard` | `enterprise`) from upstream.

**When running standalone:** Resolve variables with the user; require at minimum the Tier-A and Tier-B JSON (Tier-C optional). Without claim sheets to walk, there are no assumptions to extract.

## Variables to Resolve

| Variable | What to Capture | Default |
|----------|-----------------|---------|
| `product_name` | Product/platform/solution under test | *required* (or from upstream) |
| `tierA_json` / `tierB_json` / `tierC_json` | Upstream Productprint JSON | *required* (Tier-A + Tier-B minimum) |
| `mode` | `rapid` / `standard` / `enterprise` (source-rigor dial) | inherit from upstream, else `standard` |
| `evidence_mode` | `greenfield` / `existing-product` | inherit from upstream, else `greenfield` |
| `refine_loop_count` | How many REFINE loops have already run (0 on first pass) | `0` |

## Principles (Non-Negotiable)

1. **Falsify, don't confirm.** Every load-bearing assumption gets a disconfirmation attempt. Counter-evidence is the goal.
2. **Fragility is multiplicative.** `if_false_impact × thesis_dependence` — an assumption must be both consequential and widely-depended-on to be load-bearing.
3. **Survival must be earned.** An assumption "survives" only after a genuine attempt to break it failed. No attack = no verdict.
4. **One broken load-bearing assumption forces REFINE.** The gate does not average. If the thesis rests on a false belief, it must be rebuilt — not waved through.
5. **The verdict is defensible by the falsification record.** Every PROCEED is backed by a disconfirmation attempt that failed; every REFINE names the killing fact.

## Evidence & Citation Policy

Same discipline as Layers 1–4: for every source, capture title, publisher, author (if available), URL, publish date, access date, a one-line evidence note, and stance (`supports` | `contradicts` | `contextual`). For the assumptions you try to break, the most valuable sources are `contradicts` — cite them precisely. In `existing-product` mode, internal telemetry/data checks are first-party evidence and must be logged the same way (source = the named internal artifact).

## Workflow — Four Phases

### Phase 1: Extract Assumptions

**Goal:** surface every assumption the strategy rests on, tagged to where it came from.

- Walk **every** `claim_sheet` in the Tier-A, Tier-B, and Tier-C JSON. For each claim, ask: *what underlying belief must be true for this claim to hold?* That belief is the assumption.
- Where-to-play, how-to-win, the economic engine, and roadmap sequencing all rest on assumptions — be exhaustive. Specifically interrogate:
  - **where_to_play_map** → "this segment exists, is reachable at the assumed cost, and is large enough."
  - **how_to_win_hypothesis** → "the advantage is *structurally* defensible, not merely true today."
  - **differentiation_wedge.why_unoccupied** → "this white space is unoccupied for a structural reason, and stays unoccupied."
  - **economic_engine** → "CAC/LTV/payback ranges hold under the planned channel mix."
  - **roadmap_horizons.sequencing_logic** → "bet A is genuinely a prerequisite for bet B; the kill-criterion thresholds are right."
  - **risk_register.tied_to_assumption** → these point you directly at assumptions the upstream author already flagged.
- State each assumption so it **can be false** (falsifiable). Tag each with `source_layer`. Collapse near-duplicates and note the collapse in the audit log.

Output: `assumption_ledger` (each entry: `id`, `assumption`, `source_layer`).

### Phase 2: Rank by Fragility

**Goal:** find the 1–3 assumptions where the thesis actually breaks.

- Score each assumption: `if_false_impact (1–5) × thesis_dependence (1–5) = fragility_score`.
  - `if_false_impact`: if false, how much of the strategy dies? (5 = thesis is dead.)
  - `thesis_dependence`: how many downstream claims route through it? (5 = everything chains off it.)
- The multiplication is deliberate: an assumption must be **both** consequential and widely-depended-on. High impact + low dependence (isolated) is not load-bearing; high dependence + low impact is not either.
- The top 1–3 by `fragility_score` become `load_bearing` (ties → favor higher `if_false_impact`). Be honest: do not down-score the scary assumption to avoid having to falsify it. Inflating comfort or deflating fragility breaks the gate.

If the highest non-load-bearing assumption's `fragility_score` is within 3 of the lowest load-bearing entry's score, either promote it into `load_bearing` or record in `audit_log` why the cut is safe.

Output: `assumption_ledger` with `fragility_score` filled; `load_bearing` (1–3 ids).

### Phase 3: Falsify, Don't Confirm

**Goal:** for EACH load-bearing assumption, run a disconfirmation pass whose explicit aim is to break it.

- For each load-bearing assumption, **invoke `deep-research`** with a disconfirmation brief — same invocation discipline as the Brandprint competitive audit's forensic collection, but the query is inverted: *"find the evidence that assumption X is FALSE."* Examples: "find an incumbent that already profitably serves the segment we claim is unoccupied"; "find benchmark data showing the activation target is unreachable"; "find the channel-cost trend that breaks the CAC range."
- In **`existing-product` mode**, also check **internal telemetry / first-party data** (loss reasons, churn, activation funnels, NPS verbatims, roadmap reality) for counter-evidence *before* external search — internal data that contradicts the assumption is the strongest possible killing fact.
- Record, per load-bearing assumption: `method` (the disconfirmation query/check), `evidence` (what you found — cite even null results), `survived` (bool: true = the attempt failed to break it; false = counter-evidence broke it), and `notes` (if survived, why the counter-evidence was insufficient; if broke, the single fact that killed it).
- **Mode-aware depth** (inherited from upstream `mode`):
  - *Rapid:* one disconfirmation pass per load-bearing assumption; lighter source minimum (≥2).
  - *Standard:* full `deep-research` disconfirmation pass per assumption; triangulate; ≥3 sources or one decisive contradicting source.
  - *Enterprise:* add cross-market disconfirmation, longitudinal check (was this ever true and is it decaying?), and — in existing-product mode — a telemetry deep-dive.

Output: `falsification_findings` (one entry per `load_bearing` id).

### Phase 4: Verdict

**Goal:** PROCEED or REFINE, defensibly.

- **`PROCEED`** iff **every** load-bearing assumption has `survived == true`. Forward-chain to `strategy-thesis-compiler` (Layer 6), carrying `assumption_ledger` + `falsification_findings` forward as the report's assumption-test log.
- **`REFINE`** if **any** load-bearing assumption has `survived == false`. Emit a `constraint_package`:
  - `broken_assumption` — the id + statement that failed.
  - `evidence_it_is_false` — the counter-evidence that broke it.
  - `rebuild_constraints` — negative constraints on the rebuild ("the rebuild must not depend on X"; "where-to-play must exclude segment Y"; "re-size SOM to net out the share competitor Z already holds").

#### On REFINE — re-run Layers 1–4 with the constraint package injected, then re-run THIS gate

1. Re-invoke the build chain **in order**, injecting the accumulated constraint packages as **hard constraints** into each layer's `constraints` variable:
   `core-strategic-truth` → `productprint-tier-a` → `productprint-tier-b` → `productprint-tier-c`.
   Each layer must honor the constraints (e.g. Tier-A must not re-make the broken where-to-play bet).
   **Constraint packages ACCUMULATE across REFINE loops** — re-dispatch Layers 1–4 with the union of every `constraint_package` emitted so far this run, not just the latest, so no rebuild re-makes a previously-broken bet.
2. **RE-RUN this gate** (`thesis-stress-test`) on the rebuilt Tier-A/B/C, incrementing `refine_loop_count`.
3. **Cap at 2 REFINE loops.** If the gate still returns `REFINE` after 2 loops (i.e. a load-bearing assumption breaks for a third time), **STOP looping**. Surface to the operator: report the unresolved broken assumption, the constraint packages tried, and why the rebuilds did not resolve it. Do not loop forever — three strikes means the strategy has a structural problem a research loop can't fix, and a human needs to decide whether to re-scope, pivot, or kill it.

#### On PROCEED — forward-chain to Layer 6

Pass the full stress-test JSON to `strategy-thesis-compiler`. The `assumption_ledger` and `falsification_findings` become the thesis's **assumption-test log** — proof that the strategy survived adversarial review.

## Mode Adjustments

- **Rapid:** Phases 1–4, lighter. One disconfirmation pass per load-bearing assumption; source minimum ≥2; cap load_bearing at 1–2.
- **Standard:** Full four phases. `deep-research` disconfirmation per load-bearing assumption; ≥3 sources or one decisive contradicting source.
- **Enterprise:** Add cross-market and longitudinal disconfirmation; in existing-product mode, a telemetry deep-dive; widen load_bearing to the full top 3.

## What NOT to Do

- Do not soften `if_false_impact` or `fragility_score` to avoid falsifying a scary assumption. The scary one is exactly the one to break.
- Do not run a confirmation search and call it falsification. "Find evidence X is true" is the wrong query.
- Do not return PROCEED because the load-bearing assumptions *feel* solid. They survive only if a genuine break attempt failed.
- Do not loop REFINE more than twice — surface to the operator instead.
- Do not fabricate counter-evidence to force a REFINE, either. Falsify honestly; if the attack genuinely fails, the assumption survives.

## Evaluation Rubric

1. **Extraction exhaustiveness** — does the `assumption_ledger` cover every claim sheet (where-to-play, how-to-win, economic engine, sequencing), not just the obvious ones?
2. **Honest fragility scoring** — are `if_false_impact` and `thesis_dependence` rated on the strategy's real dependence, not on what's comfortable to falsify? Is `fragility_score` the actual product?
3. **Genuine falsification** — did Phase 3 actually try to BREAK each load-bearing assumption (disconfirmation queries, counter-evidence sought), or did it assemble supporting evidence? A confirm-bias Phase 3 fails the rubric regardless of verdict.
4. **Defensible verdict** — is PROCEED backed by failed break-attempts, and is REFINE's `constraint_package` precise enough that the rebuild can't re-make the broken bet?

## Output Format

Deliver as a single JSON object matching `references/output-schema-stress-test.md`: `product_name`, `assumption_ledger`, `load_bearing`, `falsification_findings`, `verdict` (PROCEED | REFINE), `constraint_package` (present only when REFINE), `sources`, `audit_log`, `evidence_mode`.

**Forward chaining:**
- `PROCEED` → pass the full JSON to `strategy-thesis-compiler` (Layer 6); the ledger + findings become the assumption-test log.
- `REFINE` → inject the union of ALL prior constraint packages as hard constraints, re-run `core-strategic-truth` → `productprint-tier-a` → `-tier-b` → `-tier-c`, then re-run this gate (increment `refine_loop_count`; cap at 2). Constraint packages ACCUMULATE — never inject only the latest loop's package.

## File I/O Contract (orchestrated mode)

> **Note:** automated orchestrated mode is not included in this release; run the manual chain. This contract is a forward-looking specification.

When invoked by the Productprint pipeline, the dispatch prompt provides explicit paths. Honor them exactly:

- **Seed inputs:** read ONLY the Tier-A/B/C JSON files listed in the dispatch prompt.
- **Output:** write the final JSON object to the exact path given (under `.productprint/engagements/{slug}/pass-N/`). On REFINE, the orchestrator reads `constraint_package` and re-dispatches Layers 1–4 with the union of ALL prior constraint packages injected (not just the latest — constraint packages ACCUMULATE across REFINE loops so no rebuild re-makes a previously-broken bet), then re-dispatches this gate at `pass-(N+1)`.
- **Return value:** your final message is the output path plus the verdict and (on REFINE) the broken assumption — not the full JSON. The orchestrator reads files, not transcripts. Always report `refine_loop_count` so the orchestrator can enforce the 2-loop cap.

When invoked manually, present the JSON in conversation, state the verdict, and on REFINE give the user the constraint package plus the instruction to re-run Layers 1–4 with it before re-running this gate.
