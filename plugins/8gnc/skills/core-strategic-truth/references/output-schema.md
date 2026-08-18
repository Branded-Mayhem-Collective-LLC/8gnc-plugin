# Core Strategic Truth — Output Schema (Layer 1)

The final deliverable is a single JSON object with the shape below. All fields are required unless marked optional. This object is the seed input for `productprint-tier-a` (Layer 2) — preserve it intact when chaining.

## Field Reference

| Field | Type | Description |
|---|---|---|
| `product_name` | string | The product, platform, or solution researched. Replaces `topic` from the Brandprint schema — splits product identity from its market category. |
| `category` | string | The market category or domain the product competes in (e.g. "B2B project management SaaS", "DTC fitness hardware"). Required; seeds the category-frame analysis in Tier-A. |
| `audience` | string | The primary buyer/operator audience definition used for the research |
| `final_sentence` | string | The validated Core Strategic Truth — max 25 words, plain language; states the forced trade-off buyers face, not a feeling they hold |
| `success_criteria_check` | object | Pass/fail per quality gate (see below). Note: uses `stakes` (consequence of the trade-off) instead of `emotion` (feeling) — strategy tension is about what happens to the buyer if they choose wrong, not how they feel about it |
| `tension_map` | array | Ranked tensions, each expressed as a two-pole axis with evidence |
| `jtbd_seed` | array | Candidate jobs-to-be-done surfaced during distillation. New field (not in Brandprint schema). These are unvalidated JTBD hypotheses that Tier-A refines into full JTBD claims. |
| `archetypes` | array | Buyer/operator role archetypes surfaced during research, grounded in their JTBD and decision context — not consumer identity profiles |
| `lexicon` | object | Words and phrases that resonate vs. repel, keyed by `resonates` and `repels` arrays (flattened from the Brandprint `lexicon` array for forward-chaining parsability) |
| `sources` | array | Full citation list per the Citations Policy |
| `audit_log` | array | Phase-by-phase record of what was done and decided |
| `mode` | string | `rapid`, `standard`, or `enterprise` — the mode used for this run |
| `evidence_mode` | string | `greenfield` or `existing-product`. New field (not in Brandprint schema). Signals to Tier-A whether internal operator artifacts were available (existing-product) or research was built entirely from external secondary sources (greenfield). |

## Schema Skeleton

```json
{
  "product_name": "string",
  "category": "string",
  "audience": "string",
  "final_sentence": "string (max 25 words — states the forced market trade-off, not a consumer feeling)",
  "success_criteria_check": {
    "word_count": 0,
    "tension": true,
    "stakes": true,
    "agency": true,
    "agency_absence_rationale": "string | null (required only if agency is false)",
    "evidence_min_3_sources": true,
    "counter_evidence_addressed": true
  },
  "tension_map": [
    {
      "axis": "string (name of the trade-off axis, e.g. 'Speed vs. Control')",
      "pole_a": "string (one end of the axis)",
      "pole_b": "string (other end of the axis)"
    }
  ],
  "jtbd_seed": [
    "string (one candidate job-to-be-done per entry, verbatim hypothesis)"
  ],
  "archetypes": [
    {
      "name": "string (role title or operator type, e.g. 'The Overwhelmed Ops Lead')",
      "description": "string (1–2 sentences: their decision context + dominant trade-off they face)",
      "evidence_refs": ["source_id"]
    }
  ],
  "lexicon": {
    "resonates": ["string (word or phrase that lands with this audience)"],
    "repels": ["string (word or phrase that triggers resistance or distrust)"]
  },
  "sources": [
    {
      "title": "string",
      "publisher": "string",
      "url": "string",
      "publish_date": "YYYY-MM-DD | null",
      "access_date": "YYYY-MM-DD",
      "evidence_note": "string (one line)",
      "stance": "supporting | conflicting | neutral"
    }
  ],
  "audit_log": ["string (one entry per phase: what was done and decided)"],
  "mode": "rapid | standard | enterprise",
  "evidence_mode": "greenfield | existing-product"
}
```

## Validation Rules

- `final_sentence` must pass every gate in `success_criteria_check`; if any gate is false, the output is not final — return to the relevant phase.
- `word_count` must be ≤ 25 and must match the actual word count of `final_sentence`.
- Tension axes do not carry `evidence_refs` directly — they inform `jtbd_seed` entries, which Tier-A validates against sources.
- At least 3 sources must carry `stance: "supporting"` for the core tension.
- At least 1 source with `stance: "conflicting"` must exist OR `counter_evidence_addressed` must document why none was found.
- `jtbd_seed` must contain at least 2 candidate jobs; Tier-A will stress-test and prune them — do not pre-filter here.
- `archetypes` must be grounded in buyer/operator ROLES and their decision context, not consumer identity signals (demographics, personality, lifestyle). Each archetype must cite at least one source.

## Schema Deltas vs. Brandprint Core Human Truth Schema

| Brandprint field | Productprint field | Change rationale |
|---|---|---|
| `topic` | `product_name` + `category` | Splits product identity from market frame; category is needed for the Playing-to-Win cascade in Tier-A |
| `success_criteria_check.emotion_present` | `success_criteria_check.stakes` | Strategy tension is about consequence (what happens if the buyer chooses wrong), not feeling. Emotion is a brand concern; stakes is a strategy concern. |
| `lexicon` (array of objects) | `lexicon` (object with `resonates`/`repels` arrays) | Flattened shape is more parsable in forward-chaining; Tier-A consumes both lists directly |
| `archetypes[].summary` + `dominant_tension` | `archetypes[].description` | Unified — description captures both the role context and the trade-off they face |
| *(absent)* | `jtbd_seed` | New — surfaces candidate JTBD hypotheses during distillation for Tier-A to validate; keeps Layer 1 evidence-only while seeding strategy work |
| *(absent)* | `evidence_mode` | New — tells downstream layers whether internal artifacts were available; affects confidence weighting in Tier-A |
| `rationale` (prose string) | *(implicit in audit_log)* | Dropped as a top-level field; rationale belongs in `audit_log` phase entries, which Tier-A can parse selectively |

## Example (abbreviated)

```json
{
  "product_name": "Meridian",
  "category": "B2B construction project management SaaS",
  "audience": "Mid-market general contractors (50–500 employees) managing 10+ simultaneous job sites",
  "final_sentence": "Contractors are forced to choose between real-time field visibility and the back-office systems their finance teams will actually use.",
  "success_criteria_check": {
    "word_count": 24,
    "tension": true,
    "stakes": true,
    "agency": true,
    "agency_absence_rationale": null,
    "evidence_min_3_sources": true,
    "counter_evidence_addressed": true
  },
  "tension_map": [
    {
      "axis": "Field visibility vs. finance-system compatibility",
      "pole_a": "Real-time site visibility (field-first tools)",
      "pole_b": "Back-office integration (finance-team adoption)"
    },
    {
      "axis": "Speed of adoption vs. depth of data",
      "pole_a": "Crews adopt fast, data is shallow",
      "pole_b": "Deep data capture, crews resist the tool"
    }
  ],
  "jtbd_seed": [
    "When I'm offsite, I need to know right now if a crew is behind — without calling anyone.",
    "When my CFO asks for job cost variance, I need to pull it in one report, not reconcile three systems.",
    "When a subcontractor misses a milestone, I need to document it immediately so I'm protected in disputes."
  ],
  "archetypes": [
    {
      "name": "The Offsite PM",
      "description": "Manages 3–5 active sites simultaneously; their core trade-off is trusting the field vs. flying blind until the weekly status call. Buys any tool that reduces that anxiety.",
      "evidence_refs": ["source-01", "source-03"]
    }
  ],
  "lexicon": {
    "resonates": ["real-time", "one source of truth", "field-to-office", "job cost"],
    "repels": ["enterprise", "implementation", "change management", "platform"]
  },
  "sources": [
    {
      "title": "Why Construction Tech Fails in the Field",
      "publisher": "Construction Dive",
      "url": "https://www.constructiondive.com/example",
      "publish_date": "2025-09-14",
      "access_date": "2026-06-15",
      "evidence_note": "Documents the adoption gap between field crews and finance teams in mid-market GC firms.",
      "stance": "supporting"
    }
  ],
  "audit_log": [
    "Phase 0: Defined lens — mid-market GC audience, US market, standard mode, existing-product evidence mode. Assumptions: buyer is the PM/Operations lead, not IT. Open question: is finance-team veto power consistent across firm sizes?",
    "Phase 1: Sourced 14 artifacts across Construction Dive, G2 reviews, ENR, and operator interview transcripts. Thematic map shows field-office split as dominant tension across all source types.",
    "Phase 3: Drafted 4 candidate sentences. Top two both name the field-office split; winner chosen for naming the finance-team veto explicitly, which operationalizes the stakes.",
    "Phase 4: Red team — counterargument: larger GCs solve this with dedicated IT; boundary condition added. Sentence unchanged."
  ],
  "mode": "standard",
  "evidence_mode": "existing-product"
}
```
