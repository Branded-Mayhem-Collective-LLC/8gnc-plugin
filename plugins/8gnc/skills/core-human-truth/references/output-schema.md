# Core Human Truth — Output Schema (Layer 1)

The final deliverable is a single JSON object with the shape below. All fields are required unless marked optional. This object is the seed input for `brandprint-tier-a` (Layer 2) — preserve it intact when chaining.

## Field Reference

| Field | Type | Description |
|---|---|---|
| `topic` | string | The brand, product, service, or topic researched |
| `audience` | string | The audience definition used for the research |
| `final_sentence` | string | The validated Core Human Truth — max 25 words, plain language |
| `success_criteria_check` | object | Pass/fail per quality gate (see below) |
| `rationale` | string | 2–5 sentence explanation of why this sentence won |
| `tension_map` | array | Ranked tensions, each with evidence |
| `archetypes` | array | Audience archetypes surfaced during research |
| `lexicon` | array | Verbatim words/phrases the audience actually uses |
| `sources` | array | Full citation list per the Citations Policy |
| `audit_log` | array | Phase-by-phase record of what was done and decided |

## Schema Skeleton

```json
{
  "topic": "string",
  "audience": "string",
  "final_sentence": "string (max 25 words)",
  "success_criteria_check": {
    "word_limit_25": true,
    "plain_language": true,
    "tension_present": true,
    "emotion_present": true,
    "agency_present": true,
    "agency_absence_rationale": "string | null (required only if agency_present is false)",
    "evidence_min_3_sources": true,
    "counter_evidence_addressed": true
  },
  "rationale": "string",
  "tension_map": [
    {
      "tension": "string (the push-and-pull, stated plainly)",
      "rank": 1,
      "evidence_refs": ["source_id"],
      "boundary_conditions": "string | null"
    }
  ],
  "archetypes": [
    {
      "name": "string",
      "summary": "string (1-2 sentences)",
      "dominant_tension": "string",
      "evidence_refs": ["source_id"]
    }
  ],
  "lexicon": [
    {
      "phrase": "string (verbatim audience language)",
      "context": "string (where/how it's used)",
      "source_ref": "source_id"
    }
  ],
  "sources": [
    {
      "id": "source_id",
      "title": "string",
      "publisher": "string",
      "author": "string | null",
      "url": "string",
      "publish_date": "YYYY-MM-DD | null",
      "access_date": "YYYY-MM-DD",
      "evidence_note": "string (one line)",
      "stance": "supports | contradicts | contextual"
    }
  ],
  "audit_log": [
    {
      "phase": "string (e.g. 'Phase 3: Insight Mining')",
      "actions": "string (what was done)",
      "decisions": "string (what was decided and why)"
    }
  ]
}
```

## Validation Rules

- `final_sentence` must pass every gate in `success_criteria_check`; if any gate is false, the output is not final — return to the relevant phase.
- Every `tension_map` entry needs at least one `evidence_refs` entry resolving to an `id` in `sources`.
- At least 3 sources must carry `stance: "supports"` for the core tension.
- At least 1 source with `stance: "contradicts"` must exist OR `counter_evidence_addressed` must document why none was found.
