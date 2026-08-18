# Thesis Stress-Test — Output Schema (Layer 5)

The final deliverable is a single JSON object with the shape below. This is the **gate output** of the Productprint stack. Its `verdict` decides what happens next:

- `PROCEED` → forward-chain to `strategy-thesis-compiler` (Layer 6), carrying the assumption ledger and falsification findings forward as the report's "assumption-test log."
- `REFINE` → emit a `constraint_package`, inject it as a hard constraint, and re-run Layers 1–4 (`core-strategic-truth` → `productprint-tier-a` → `-tier-b` → `-tier-c`), then RE-RUN this gate. Cap at 2 REFINE loops (see SKILL.md).

This is an **adversarial gate**. A run that always returns `PROCEED` is broken — see the SKILL's Adversarial Stance block.

## Field Reference

| Field | Type | Description |
|---|---|---|
| `product_name` | string | Product, platform, or solution under test |
| `assumption_ledger` | array | Every assumption extracted from the Tier-A/B/C claim sheets, scored for fragility |
| `load_bearing` | array | The top 1–3 assumption ids by `fragility_score` — these are the ones that get falsified |
| `falsification_findings` | array | One entry per load-bearing assumption: the method used to try to break it, the evidence found, and whether it survived |
| `verdict` | string | `PROCEED` or `REFINE` |
| `constraint_package` | object \| null | Present ONLY when `verdict == REFINE`; names the broken assumption, the evidence it is false, and the rebuild constraints |
| `sources` | array | Full citation list (carry upstream sources forward + any new falsification evidence) |
| `audit_log` | array | Phase-by-phase record of actions and decisions |
| `evidence_mode` | string | `greenfield` or `existing-product` (inherited from upstream) |

## Schema Skeleton

```json
{
  "product_name": "string",
  "assumption_ledger": [
    {
      "id": "string (e.g. 'A1')",
      "assumption": "string (the underlying belief the claim rests on, stated so it CAN be false)",
      "source_layer": "string (which layer/element/claim_sheet it came from, e.g. 'Tier-A/where_to_play_map' or 'Tier-B/roadmap_horizons.sequencing_logic')",
      "if_false_impact": "1-5 (how much of the strategy collapses if this turns out false — 5 = thesis is dead)",
      "thesis_dependence": "1-5 (how many downstream claims chain off this assumption — 5 = everything routes through it)",
      "fragility_score": "int (if_false_impact * thesis_dependence)"
    }
  ],
  "load_bearing": [ "assumption_id (top 1-3 by fragility_score)" ],
  "falsification_findings": [
    {
      "assumption_id": "string",
      "method": "string (how you tried to BREAK it — the research query/data-check designed to surface counter-evidence, not confirm)",
      "evidence": [ "source ref (the counter-evidence sought; cite even when it failed to materialize)" ],
      "survived": "bool (true = falsification attempt failed to break it; false = counter-evidence broke it)",
      "notes": "string (what the attempt found; if survived, why the counter-evidence was insufficient; if broke, the single fact that killed it)"
    }
  ],
  "verdict": "PROCEED | REFINE",
  "constraint_package": {
    "broken_assumption": "string (the assumption_id + statement that failed falsification)",
    "evidence_it_is_false": [ "ref (the counter-evidence that broke it)" ],
    "rebuild_constraints": [ "string (e.g. 'the rebuild must not depend on X'; 'where-to-play must exclude segment Y'; 'economic engine must not assume CAC below $Z')" ]
  },
  "sources": [
    {
      "id": "source_id",
      "title": "string",
      "publisher": "string",
      "url": "string",
      "access_date": "YYYY-MM-DD",
      "evidence_note": "string",
      "stance": "supports | contradicts | contextual"
    }
  ],
  "audit_log": [
    { "phase": "string", "actions": "string", "decisions": "string" }
  ],
  "evidence_mode": "greenfield | existing-product"
}
```

> `constraint_package` is `null` (or absent) when `verdict == PROCEED`. It is REQUIRED and non-null when `verdict == REFINE`.

## Field-by-Field Notes

### `assumption_ledger`

Walk **every** claim sheet in the Tier-A, Tier-B, and Tier-C JSON. Each claim rests on one or more underlying assumptions — surface them. A claim says "X is true"; the assumption is the belief that, *if false*, makes the claim collapse. Write each assumption so it is **falsifiable** (it can be shown false), tagged with the `source_layer` it came from.

Be exhaustive. Where-to-play rests on "this segment exists and is reachable at the assumed cost." How-to-win rests on "the advantage is structurally defensible, not just currently true." The economic engine rests on "CAC/LTV ranges hold under the planned channel mix." Roadmap sequencing rests on "bet A is genuinely a prerequisite for bet B." Surface all of them.

### `fragility_score`

`fragility_score = if_false_impact × thesis_dependence` (range 1–25).

- `if_false_impact` (1–5): if this assumption is false, how much of the strategy dies? 5 = the whole thesis is dead; 1 = a footnote needs editing.
- `thesis_dependence` (1–5): how many downstream claims route through this assumption? 5 = everything chains off it; 1 = it stands alone.

The product is **not** an average — it is multiplicative on purpose: an assumption must be both consequential *and* widely-depended-upon to be load-bearing. Something catastrophic-if-false but isolated (high impact, low dependence) is not where the thesis breaks; neither is something everything depends on but that barely matters if wrong.

### `load_bearing`

The 1–3 highest `fragility_score` assumptions. These — and only these — get the full falsification treatment in Phase 3. Falsifying everything is noise; falsifying the load-bearing few is the gate.

### `falsification_findings`

One entry per load-bearing assumption. `method` describes a research query or data-check **designed to surface counter-evidence** — not to confirm. `survived: true` means the falsification attempt *failed to break* the assumption (you went hunting for the killing fact and could not find it). `survived: false` means counter-evidence broke it. Record `evidence` even when the attempt failed — citing what you looked for and did not find is part of an honest gate.

### `constraint_package` (REFINE only)

Names the single broken assumption, the evidence that falsified it, and the constraints the rebuild must honor so the next pass does not re-make the same broken bet. `rebuild_constraints` are phrased as negative constraints on Layers 1–4 ("must not depend on X").

## Validation Rules

- `assumption_ledger` is non-empty and every entry carries a `source_layer` tracing to a real upstream claim sheet/element.
- `fragility_score == if_false_impact * thesis_dependence` for every entry (no hand-scored fragility).
- `load_bearing` holds 1–3 ids, all of which are the highest-fragility entries in the ledger (ties broken toward higher `if_false_impact`).
- `falsification_findings` has exactly one entry per `load_bearing` id, each with a `method` that demonstrably tries to break (not confirm) and a boolean `survived`.
- `verdict == PROCEED` iff every load-bearing finding has `survived == true`. If any load-bearing assumption has `survived == false`, `verdict` MUST be `REFINE`.
- `constraint_package` is non-null iff `verdict == REFINE`; it is null/absent iff `verdict == PROCEED`.
- Counter-evidence is the success condition of Phase 3. A `falsification_findings` array where every `method` reads as a confirmation search fails the Evaluation Rubric regardless of verdict.

## Worked Example — PROCEED path

All three load-bearing assumptions survived a genuine falsification attempt.

```json
{
  "product_name": "Acme Mid-Market TMS",
  "assumption_ledger": [
    {
      "id": "A1",
      "assumption": "Mid-market shippers ($10M–$500M rev) without an ops team cannot buy enterprise TMS because incumbents structurally require professional-services revenue and cannot price for self-serve.",
      "source_layer": "Tier-A/differentiation_wedge.why_unoccupied + how_to_win_hypothesis.why_it_holds",
      "if_false_impact": 5,
      "thesis_dependence": 5,
      "fragility_score": 25
    },
    {
      "id": "A2",
      "assumption": "Self-serve onboarding can reach time-to-value under 48 hours for a 3-person ops team without a CSM touchpoint.",
      "source_layer": "Tier-A/required_capabilities + Tier-B/strategic_bets['SMB Self-Serve Onboarding']",
      "if_false_impact": 4,
      "thesis_dependence": 4,
      "fragility_score": 16
    },
    {
      "id": "A3",
      "assumption": "Blended CAC stays in the $280–$620 range at the planned 60/40 content/outbound mix.",
      "source_layer": "Tier-A/economic_engine.unit_economics_ranges",
      "if_false_impact": 4,
      "thesis_dependence": 3,
      "fragility_score": 12
    },
    {
      "id": "A4",
      "assumption": "The Midwest manufacturing-belt geography is where the Lean-Ops segment concentrates.",
      "source_layer": "Tier-A/where_to_play_map.options[0].geo",
      "if_false_impact": 2,
      "thesis_dependence": 2,
      "fragility_score": 4
    }
  ],
  "load_bearing": ["A1", "A2", "A3"],
  "falsification_findings": [
    {
      "assumption_id": "A1",
      "method": "Searched specifically for any enterprise TMS vendor that HAS launched a profitable self-serve / PLG tier for sub-$500M shippers — i.e. evidence the structural barrier does NOT hold. Checked MercuryGate, Oracle TMS, BluJay, e2open product pages, 10-Ks, and recent PLG launch announcements.",
      "evidence": ["src-12", "src-13", "src-19"],
      "survived": true,
      "notes": "Could not find a single incumbent with a profitable self-serve tier. Two had announced 'SMB editions' that on inspection still require an implementation partner and a 60+ day onboarding — the PS-revenue dependency held. The killing fact (an incumbent thriving self-serve) did not materialize."
    },
    {
      "assumption_id": "A2",
      "method": "Hunted for benchmark evidence that comparable B2B ops tools FAIL to hit <48h TTV self-serve — pulled activation-time data from analogous self-serve ops SaaS (Ramp, Brex onboarding, freight-adjacent PLG tools) and looked for the failure mode.",
      "evidence": ["src-21", "src-24"],
      "survived": true,
      "notes": "Comparable tools hit 24–72h self-serve activation; the <48h target sits inside the observed band. No counter-evidence that data-import complexity is categorically worse for TMS. Survives, but flagged: carrier-list import is the long pole — tracked as a Tier-B leading indicator."
    },
    {
      "assumption_id": "A3",
      "method": "Tried to break the CAC range by stress-testing the channel mix: searched for content-CAC inflation in the freight-software niche and outbound reply-rate decay; modeled what happens if content share collapses to 30%.",
      "evidence": ["src-30", "src-31"],
      "survived": true,
      "notes": "Even at a pessimistic 30/70 content/outbound mix, blended CAC tops out around $680 — outside the stated ceiling, but the Tier-A sensitivity_notes already flagged this exact boundary, so the thesis carries the boundary, not a hidden assumption. Survives within its declared boundary."
    }
  ],
  "verdict": "PROCEED",
  "constraint_package": null,
  "sources": [
    { "id": "src-12", "title": "MercuryGate Product Tiers", "publisher": "MercuryGate", "url": "https://...", "access_date": "2026-06-15", "evidence_note": "No self-serve tier; implementation partner required.", "stance": "supports" }
  ],
  "audit_log": [
    { "phase": "Extract", "actions": "Walked 19 claim sheets across Tier-A/B/C; surfaced 4 assumptions.", "decisions": "Collapsed two near-duplicate how-to-win assumptions into A1." },
    { "phase": "Rank", "actions": "Scored fragility; A1=25, A2=16, A3=12, A4=4.", "decisions": "load_bearing = A1, A2, A3 (A4 below cut)." },
    { "phase": "Falsify", "actions": "Ran 3 disconfirming research passes.", "decisions": "All three survived; A3 survives only within its declared boundary." },
    { "phase": "Verdict", "actions": "All load-bearing survived.", "decisions": "PROCEED → strategy-thesis-compiler." }
  ],
  "evidence_mode": "greenfield"
}
```

## Worked Example — REFINE path

The top load-bearing assumption broke under falsification, so the gate emits a constraint package and sends the thesis back through Layers 1–4.

```json
{
  "product_name": "Acme Mid-Market TMS",
  "assumption_ledger": [
    {
      "id": "A1",
      "assumption": "Mid-market shippers cannot buy enterprise TMS because incumbents structurally cannot price for self-serve.",
      "source_layer": "Tier-A/differentiation_wedge.why_unoccupied + how_to_win_hypothesis.why_it_holds",
      "if_false_impact": 5,
      "thesis_dependence": 5,
      "fragility_score": 25
    },
    {
      "id": "A2",
      "assumption": "Self-serve onboarding reaches <48h time-to-value without a CSM.",
      "source_layer": "Tier-A/required_capabilities + Tier-B/strategic_bets",
      "if_false_impact": 4,
      "thesis_dependence": 4,
      "fragility_score": 16
    }
  ],
  "load_bearing": ["A1", "A2"],
  "falsification_findings": [
    {
      "assumption_id": "A1",
      "method": "Searched for an incumbent that has launched a profitable self-serve tier for sub-$500M shippers — evidence the structural moat does NOT exist.",
      "evidence": ["src-12", "src-40", "src-41"],
      "survived": false,
      "notes": "BROKE. e2open shipped a genuine self-serve PLG tier (launched Q1 2026, $4.8K/yr, no implementation partner, 4-day onboarding) and reported 1,200 self-serve logos in two quarters. The differentiation wedge assumed this space was structurally unoccupiable by incumbents; it is now occupied by a $700M-revenue incumbent. The single killing fact: a large incumbent is already winning self-serve."
    },
    {
      "assumption_id": "A2",
      "method": "Pulled activation-time benchmarks from analogous self-serve ops SaaS to surface a <48h failure mode.",
      "evidence": ["src-21", "src-24"],
      "survived": true,
      "notes": "Comparable tools hit 24–72h; the target holds. But A2's value is contingent on A1, which broke — see constraint_package."
    }
  ],
  "verdict": "REFINE",
  "constraint_package": {
    "broken_assumption": "A1 — 'incumbents structurally cannot serve self-serve mid-market'",
    "evidence_it_is_false": ["src-40 (e2open self-serve PLG launch, 1,200 logos in 2 quarters)", "src-41 (e2open Q2 2026 earnings call, self-serve named as growth vector)"],
    "rebuild_constraints": [
      "The where-to-play and differentiation wedge must NOT assume the self-serve mid-market is unoccupied — e2open now occupies it.",
      "The how-to-win hypothesis must NOT rest on the 'incumbents structurally can't price self-serve' moat; find a sharper wedge (e.g. a sub-segment e2open's generic PLG ignores, or a carrier-network advantage e2open lacks).",
      "Re-size SAM/SOM to net out the share e2open has already captured; the original SOM assumed a greenfield self-serve segment."
    ]
  },
  "sources": [
    { "id": "src-40", "title": "e2open Launches Self-Serve TMS Tier", "publisher": "e2open", "url": "https://...", "access_date": "2026-06-15", "evidence_note": "Profitable self-serve PLG tier, no implementation partner, 4-day onboarding.", "stance": "contradicts" }
  ],
  "audit_log": [
    { "phase": "Extract", "actions": "Walked claim sheets; surfaced 2 dominant assumptions.", "decisions": "A1, A2 both ledgered." },
    { "phase": "Rank", "actions": "A1=25, A2=16.", "decisions": "load_bearing = A1, A2." },
    { "phase": "Falsify", "actions": "Disconfirming search on A1 surfaced e2open's self-serve launch.", "decisions": "A1 broke." },
    { "phase": "Verdict", "actions": "A load-bearing assumption broke.", "decisions": "REFINE; emit constraint_package; inject into Layers 1–4; re-run gate. REFINE loop 1 of 2." }
  ],
  "evidence_mode": "greenfield"
}
```
