# Brandprint Tier-C — Output Schema (Layer 4)

The final deliverable is a single JSON object with the shape below. Tier-C creates NO new claims — every line must trace back to validated Tier-A or Tier-B material via the `derivation_matrix`. This object feeds the `competitive-positioning-audit` (Layer 5) and the `brand-strategy-compiler` (Layer 6).

## Field Reference

| Field | Type | Description |
|---|---|---|
| `brand_name` | string | Brand being researched |
| `audience` | string | Audience definition used |
| `derivation_matrix` | array | Per-line traceability: each Tier-C line → its Tier-A/B anchor |
| `tierC_results` | object | The 4 elements (+ optional name hygiene) |
| `consistency_matrix` | object | Cross-checks: each element vs tone, platform word, no-no rules |
| `audit_log` | array | Phase-by-phase record of actions and decisions |

## Schema Skeleton

```json
{
  "brand_name": "string",
  "audience": "string",
  "derivation_matrix": [
    {
      "tierC_line": "string (the exact deployed copy)",
      "derived_from": "string (Tier-A element or Tier-B element id)",
      "anchor_quote": "string (the validated truth it traces to)"
    }
  ],
  "tierC_results": {
    "brand_mantra": {
      "mantra_options": ["string (3 words each)"],
      "final_mantra": "string (exactly 3 words)",
      "alignment_notes": "string"
    },
    "personification_vignette": {
      "primary_vignette": "string (written in audience words, not brand language)",
      "alternate_vignettes": ["string"],
      "cultural_risk_notes": "string"
    },
    "header_translation_line": {
      "translation_line_variants": ["string"],
      "final_translation_line": "string",
      "readability_notes": "string (plain language check)"
    },
    "features_list": {
      "features_mapped": [
        {
          "feature": "string",
          "equity_ladder_ref": "string (which rung it maps to)",
          "checked": true
        }
      ],
      "gaps_list": ["string (features with no equity ladder home)"]
    },
    "name_hygiene": {
      "optional": true,
      "name_hygiene_notes": "string",
      "escalation_recommendation": "string | null"
    }
  },
  "consistency_matrix": {
    "tone_check": "pass | fail with notes",
    "platform_word_check": "pass | fail with notes",
    "no_no_check": "pass | fail with notes",
    "notes": "string"
  },
  "audit_log": [
    { "phase": "string", "actions": "string", "decisions": "string" }
  ]
}
```

## Validation Rules

- `final_mantra` is exactly 3 words.
- Every line in every `tierC_results` element must appear in the `derivation_matrix` — a Tier-C line with no Tier-A/B anchor is a new claim, which is forbidden at this layer.
- The `personification_vignette` uses audience lexicon (from Layer 1), never brand/marketing language.
- Any feature in `gaps_list` is flagged for the user, not silently included.
- All three `consistency_matrix` checks must pass before the output is final.
