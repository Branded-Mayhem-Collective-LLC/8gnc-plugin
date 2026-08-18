# Productprint Tier-C — Output Schema (Layer 4)

The final deliverable is a single JSON object with the shape below. Tier-C creates NO new strategic claims — every artifact must trace back to validated Tier-A or Tier-B material. This object feeds `thesis-stress-test` (Layer 5) and the `strategy-thesis-compiler` (Layer 6).

## Field Reference

| Field | Type | Description |
|---|---|---|
| `product_name` | string | Product, platform, or solution being researched |
| `tierC_results` | object | The 4 deployable positioning artifacts |
| `sources` | array | Full citation list (carry Tier-A and Tier-B sources forward) |
| `audit_log` | array | Phase-by-phase record of actions and decisions |

## The `claim_sheet` Shape

Every Tier-C element carries a `claim_sheet` with this structure:

```json
{
  "statement": "string (the specific claim being made)",
  "boundaries": "string (where the claim does NOT apply — segment, use case, or condition limits)",
  "counter_evidence": "string (known evidence that challenges the claim; null if none surfaced)",
  "confidence": "high | medium | low",
  "sources": ["string (source ref IDs from the top-level sources array)"]
}
```

No `claim_sheet` field is optional — every element ships with one. Confidence ratings map to: high = claim is consistent across ≥3 independent sources; medium = 2 sources or 1 source + 1 behavioral proxy; low = single source or inference from Tier-A/B reasoning.

## Schema Skeleton

```json
{
  "product_name": "string",
  "tierC_results": {
    "positioning_statement": {
      "text": "For [segment] who [need], [product] is the [category] that [differentiator] because [proof].",
      "source_refs": {
        "differentiator": "ref to Tier-A differentiation_wedge (Sprint 10) — the field that populates [differentiator] in the template",
        "proof": "ref to Tier-A claim_sheet entry with highest confidence — the field that populates [proof] in the template",
        "segment": "ref to Tier-A segments_wtp — the field that populates [segment] in the template"
      },
      "comprehension_check": "string (plain-language verdict: would a non-expert buyer understand this in one read? note any jargon or confusion points)",
      "claim_sheet": {
        "statement": "string",
        "boundaries": "string",
        "counter_evidence": "string | null",
        "confidence": "high | medium | low",
        "sources": ["string"]
      }
    },
    "product_one_liner": {
      "variants": ["string (each ≤25 words; minimum 3 variants)"],
      "final": "string (≤25 words — the selected variant; must pass comprehension check)",
      "comprehension_check": "string (plain-language verdict: non-expert test; word count confirmed; no jargon)",
      "claim_sheet": {
        "statement": "string",
        "boundaries": "string",
        "counter_evidence": "string | null",
        "confidence": "high | medium | low",
        "sources": ["string"]
      }
    },
    "bet_narrative": {
      "story": "string (1–3 paragraphs; tells the story of what the product bets on and why that sequence leads to the winning aspiration; buyer-readable, not internal-strategy language)",
      "named_bets": [
        {
          "bet_ref": "string (references the bet ID or name from Tier-B strategic_bets or roadmap_horizons)",
          "name": "string (plain-English name for this bet, ≤6 words, suitable for external use)"
        }
      ],
      "claim_sheet": {
        "statement": "string",
        "boundaries": "string",
        "counter_evidence": "string | null",
        "confidence": "high | medium | low",
        "sources": ["string"]
      }
    },
    "strategy_on_a_page": {
      "aspiration": "string (pulled from Tier-A winning_aspiration.ambition — the bounded ambition in one sentence)",
      "where_to_play": "string (pulled from Tier-A where_to_play_map — the selected option(s) in plain language)",
      "how_to_win": "string (pulled from Tier-A how_to_win_hypothesis — the advantage type in plain language)",
      "capabilities": "string (pulled from Tier-A required_capabilities — the 3–5 must-build/must-have capabilities)",
      "must_track": [
        {
          "leading_indicator": "string (pulled from Tier-B risk_register leading_indicators — the early-warning signal)",
          "rationale": "string (one sentence: why this indicator is the right one to watch)"
        }
      ],
      "claim_sheet": {
        "statement": "string",
        "boundaries": "string",
        "counter_evidence": "string | null",
        "confidence": "high | medium | low",
        "sources": ["string"]
      }
    }
  },
  "sources": [
    {
      "id": "string",
      "title": "string",
      "publisher": "string",
      "url": "string | null",
      "date": "string",
      "evidence_note": "string (one line on how this source was used)"
    }
  ],
  "derivation_matrix": [
    {
      "artifact": "string (Tier-C artifact name, e.g. positioning_statement)",
      "tierA_source": "string (Tier-A field(s) this artifact derives from)",
      "tierB_source": "string (Tier-B field(s) this artifact derives from, or null if none)"
    }
  ],
  "audit_log": [
    {
      "phase": "string",
      "actions": "string",
      "decisions": "string"
    }
  ]
}
```

## Field Notes

### `positioning_statement.text`
Follows the Geoffrey Moore template: "For [segment] who [need], [product] is the [category] that [differentiator] because [proof]." The `[proof]` must trace to a Tier-A claim sheet or Tier-B bet with evidence. The `[differentiator]` must align with `differentiation_wedge` from Tier-A Sprint 10. Do not invent a differentiator or proof at this layer.

### `product_one_liner.final`
Hard limit: ≤25 words. If the count is 26+, the field fails the acceptance gate and must be trimmed before the output is final. Count is verified in the comprehension check. The one-liner must describe what the product does and who benefits — not a slogan.

### `bet_narrative.named_bets[].bet_ref`
Must reference a bet by its ID or label from Tier-B `strategic_bets` or `roadmap_horizons`. A bet_ref that does not correspond to a Tier-B artifact is a new claim, which is forbidden at this layer.

### `strategy_on_a_page` field sources
The four pull fields are not synthesized at this layer — they are translated:
- `aspiration` ← Tier-A `winning_aspiration.ambition`
- `where_to_play` ← Tier-A `where_to_play_map` (selected option(s))
- `how_to_win` ← Tier-A `how_to_win_hypothesis`
- `capabilities` ← Tier-A `required_capabilities`
- `must_track[].leading_indicator` ← Tier-B `risk_register` leading indicators (top 3 by severity × likelihood)

Plain-language translation is allowed; strategic reframing is not.

## Validation Rules

- `product_one_liner.final` must be ≤25 words — over-length output fails this gate.
- Every `claim_sheet.sources` array must reference IDs present in the top-level `sources` array.
- `bet_narrative.named_bets[].bet_ref` must correspond to a Tier-B artifact; unanchored refs are forbidden.
- `strategy_on_a_page` fields must be traceable to their Tier-A/B source fields — no new framing invented here.
- All `comprehension_check` fields must state a pass/fail verdict and explain any issues found; "pass" alone is not sufficient.

## Example (abbreviated)

```json
{
  "product_name": "Acme Ops",
  "tierC_results": {
    "positioning_statement": {
      "text": "For multi-location restaurant operators who lose hours each week reconciling labor data across systems, Acme Ops is the operations platform that closes the gap between scheduled and actual labor cost in real time because it pulls live POS and scheduling data into one consolidated view without manual export.",
      "comprehension_check": "Pass. A non-expert operator can parse this in one read. 'Reconciling' is borderline jargon — acceptable in this segment. No undefined acronyms.",
      "claim_sheet": {
        "statement": "Acme Ops is the operations platform that closes the gap between scheduled and actual labor cost in real time.",
        "boundaries": "Claim applies to multi-location operators (5+ units) running supported POS systems. Single-unit or franchise-managed operators out of scope.",
        "counter_evidence": "Competitor Y offers a comparable real-time labor view for enterprise clients — Acme's advantage is mid-market pricing.",
        "confidence": "medium",
        "sources": ["src-004", "src-007"]
      }
    },
    "product_one_liner": {
      "variants": [
        "Acme Ops closes the labor cost gap for multi-location restaurants — in real time.",
        "See your real labor cost, not your scheduled labor cost, at every location.",
        "One dashboard. Live labor data. No manual exports. For operators running five or more locations."
      ],
      "final": "See your real labor cost — not your scheduled cost — at every location, in real time.",
      "comprehension_check": "Pass. 18 words. No jargon. A GM could read this without explanation.",
      "claim_sheet": {
        "statement": "Acme Ops delivers real-time labor cost visibility across locations without manual exports.",
        "boundaries": "Applies only to supported POS integrations listed in Sprint 8 required capabilities.",
        "counter_evidence": null,
        "confidence": "medium",
        "sources": ["src-004"]
      }
    }
  },
  "sources": [],
  "audit_log": []
}
```
