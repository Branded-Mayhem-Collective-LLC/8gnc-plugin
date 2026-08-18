# Brandprint Tier-A — Output Schema (Layer 2)

The final deliverable is a single JSON object with the shape below. This object is the seed input for `brandprint-tier-b` (Layer 3) — preserve it intact when chaining. Layer 3 specifically needs `tierA_results` tensions, outcomes, audience, equity ladder, competition, and tagline.

## Field Reference

| Field | Type | Description |
|---|---|---|
| `brand_name` | string | Brand being researched |
| `topic` | string | Topic/category scope |
| `audience` | string | Audience definition used |
| `backbone_repository` | object | Shared evidence built in the Backbone phase |
| `tierA_results` | object | All 10 sprint elements, each with its claim sheet |
| `contradiction_matrix` | array | Logged conflicts and their resolutions or boundaries |
| `sources` | array | Full citation list (carry Layer 1 sources forward) |
| `audit_log` | array | Sprint-by-sprint record of actions and decisions |

## Schema Skeleton

```json
{
  "brand_name": "string",
  "topic": "string",
  "audience": "string",
  "backbone_repository": {
    "annotated_bibliography": ["source_id with one-line note"],
    "macro_data_summary": "string",
    "review_verbatim_library": ["string (verbatim, public)"],
    "search_intent_map": "string | object",
    "competitor_inventory": ["string"],
    "contradictions_log_seed": ["string"]
  },
  "tierA_results": {
    "audience_insight_problem": {
      "tension_statements_ranked": ["string"],
      "problem_trigger_matrix": "object | string",
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "desired_outcomes": {
      "outcome_statements_top3": ["string"],
      "importance_gap_notes": "string",
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "target_audience": {
      "segments_defined": ["string"],
      "size_bounds": "string (explicit ranges, no hidden math)",
      "wtp_proxies": ["string"],
      "signals_identifiers": ["string"],
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "competitive_set": {
      "direct_competitors": ["string"],
      "substitutes": ["string"],
      "substitute_map": "object | string",
      "positioning_grid": "object | string",
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "signature_offers": {
      "offers_list": ["string"],
      "feature_benefit_outcome_map": "object | string",
      "unit_economics_ranges": "string (explicit ranges)",
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "expertise": {
      "expertise_proofs": ["string (third-party required)"],
      "case_outcome_summaries": ["string"],
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "economic_engine": {
      "engine_model_ranges": "string",
      "payback_window_bounds": "string",
      "sensitivity_notes": "string",
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "core_equities": {
      "core_equities_list": ["string"],
      "distinctiveness_proofs": ["string"],
      "recall_proxy_notes": "string",
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "equity_ladder": {
      "equity_ladder": "object | array (attribute → benefit → emotional payoff)",
      "proof_gaps_closed": ["string"],
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "promise_tagline": {
      "tagline_variants": ["string"],
      "comprehension_notes": "string",
      "final_tagline": "string (max 25 words)",
      "claim_sheet": { "$ref": "#claim_sheet" }
    }
  },
  "contradiction_matrix": [
    {
      "claim": "string",
      "conflicting_evidence": "string",
      "resolution": "resolved | bounded",
      "boundary_conditions": "string | null"
    }
  ],
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
  ]
}
```

## Claim Sheet Shape (`#claim_sheet`)

Every one of the 10 elements must carry one:

```json
{
  "claims": [
    {
      "claim": "string (plain language)",
      "proof_refs": ["source_id (minimum 3 per claim)"],
      "confidence": "high | medium | low",
      "boundary_conditions": "string | null"
    }
  ]
}
```

## Validation Rules

- Every claim sheet claim needs `proof_refs` with ≥3 entries resolving to `sources` ids — no claim ships below the proof minimum.
- `final_tagline` must not exceed 25 words.
- All numeric assertions appear as explicit ranges with inputs stated (`unit_economics_ranges`, `size_bounds`, `engine_model_ranges`).
- Every contradiction encountered during sprints must appear in `contradiction_matrix` as `resolved` or `bounded` — never silently dropped.
