# Brandprint Tier-B — Output Schema (Layer 3)

The final deliverable is a single JSON object with the shape below. This object (together with the Tier-A JSON carried forward from Layer 2) is the seed input for `brandprint-tier-c` (Layer 4) — Layer 4 specifically needs the tone, platform word, and no-no rules.

## Field Reference

| Field | Type | Description |
|---|---|---|
| `brand_name` | string | Brand being researched |
| `topic` | string | Topic/category scope |
| `audience` | string | Audience definition used |
| `backbone_refs_used` | array | Which Backbone/Tier-A evidence was reused (no re-research) |
| `tierB_results` | object | All 5 elements, each with at least one behavioral proxy test |
| `sources` | array | Citation list (carried forward + any new lightweight evidence) |
| `audit_log` | array | Phase-by-phase record of actions and decisions |

## Schema Skeleton

```json
{
  "brand_name": "string",
  "topic": "string",
  "audience": "string",
  "backbone_refs_used": ["source_id or Tier-A element ref"],
  "tierB_results": {
    "brand_activator": {
      "activator_candidates": ["string"],
      "test_plan": "string (behavioral proxy test design)",
      "proxy_results": "string (observed or planned signals)",
      "final_activator_pack": "string | object"
    },
    "brand_platform_word": {
      "platform_word_options": ["string (single words)"],
      "semantic_notes": "string",
      "gatekeeper_question": "string ('Does this belong to [word]?')",
      "final_platform_word": "string (ONE word — a filter, not a tagline)"
    },
    "tone_and_manner": {
      "adjectives": ["string (3-6)"],
      "key_phrases": ["string"],
      "dos_and_donts": { "do": ["string"], "dont": ["string"] },
      "readability_notes": "string"
    },
    "moat": {
      "moat_statement": "string (plain language)",
      "evidence_notes": "string",
      "observable_signals": ["string"],
      "time_to_value_or_switch_cost_proxy": "string"
    },
    "brand_no_nos": {
      "no_nos_list": ["string"],
      "rationales": ["string (one per no-no)"],
      "risk_mapping": "object | string (what each no-no protects against)"
    }
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
  ]
}
```

## Validation Rules

- Every element in `tierB_results` carries at least one behavioral proxy signal (a test plan with observable outcomes, not just opinion).
- `final_platform_word` is exactly one word. It is a decision filter, not a public tagline.
- Any element that conflicts with Tier-A output must be revised or carry explicit boundary conditions — record the conflict in the `audit_log`.
- Proxy tests must be designed fresh for this brand — do not copy Tier-A proof points verbatim as proxy tests.
