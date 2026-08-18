# Productprint Tier-A — Output Schema (Layer 2)

The final deliverable is a single JSON object with the shape below. This object is the seed input for `productprint-tier-b` (Layer 3) — preserve it intact when chaining. Layer 3 specifically needs `tierA_results` elements: winning aspiration, JTBD outcomes, segments, where-to-play options, how-to-win hypothesis, required capabilities, economic engine, and differentiation wedge.

## Field Reference

| Field | Type | Description |
|---|---|---|
| `product_name` | string | Product, platform, or solution being researched |
| `category` | string | Market category or domain |
| `audience` | string | Primary buyer/operator audience definition used throughout |
| `backbone_repository` | object | Shared evidence built in the Backbone phase |
| `tierA_results` | object | All 10 Playing-to-Win cascade elements, each with its claim sheet |
| `contradiction_matrix` | array | Logged conflicts and their resolutions or boundaries |
| `sources` | array | Full citation list (carry Layer 1 sources forward) |
| `audit_log` | array | Sprint-by-sprint record of actions and decisions |

## Schema Skeleton

```json
{
  "product_name": "string",
  "category": "string",
  "audience": "string",
  "backbone_repository": {
    "annotated_bibliography": ["source_id with one-line note"],
    "macro_data_summary": "string",
    "review_verbatim_library": ["string (verbatim, public)"],
    "search_intent_map": "string | object",
    "competitor_inventory": ["string (name, offers, pricing, capability signals)"],
    "outcomes_seed": ["string (JTBD hypotheses carried from Layer 1 jtbd_seed)"],
    "contradictions_log_seed": ["string"]
  },
  "tierA_results": {
    "winning_aspiration": {
      "ambition": "string (the bounded ambition statement — what winning looks like for this product in this category)",
      "boundaries": "string (explicit statement of where the product will NOT play)",
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "category_definition_sizing": {
      "category": "string (how the product defines and frames the category it competes in)",
      "tam_range": "string (Total Addressable Market — explicit range with method note, e.g. '$4B–$6B; bottom-up from segment counts × ARPU proxy')",
      "sam_range": "string (Serviceable Addressable Market — explicit range with method note)",
      "som_range": "string (Serviceable Obtainable Market — explicit range with assumptions and time horizon)",
      "method_notes": "string (how estimates were derived; state inputs explicitly; never a point estimate)",
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "jtbd_outcomes": {
      "outcomes_top3": [
        {
          "statement": "string (outcome statement in buyer language, e.g. 'Help me reduce the time I spend reconciling data across systems')",
          "importance": "high | medium | low (with evidence note)",
          "satisfaction_gap": "string (current satisfaction vs. importance — explicit evidence or behavioral proxy; ranges where known)"
        }
      ],
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "segments_wtp": {
      "segments": [
        {
          "name": "string (segment label)",
          "firmographic": "string (company size, industry, stage, geography — where relevant)",
          "psychographic": "string (decision-making style, values, risk posture, switching triggers)",
          "size_bound": "string (addressable count or revenue range with evidence source; no silent math)",
          "wtp_proxy": "string (pricing signal, switching cost evidence, or analogous purchase behavior)"
        }
      ],
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "where_to_play_map": {
      "options": [
        {
          "segment": "string (which segment this option targets)",
          "channel": "string (acquisition or distribution channel)",
          "geo": "string (geography scope)",
          "use_case": "string (specific use case or workflow this option captures)",
          "attractiveness": "high | medium | low (market size × growth × competitive intensity)",
          "right_to_win": "high | medium | low (capability fit × switching cost × differentiation advantage)"
        }
      ],
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "competitive_capability_teardown": {
      "competitors": [
        {
          "name": "string",
          "capabilities": ["string (observable capability, not brand claim)"],
          "moats": ["string (structural advantage that makes them hard to displace)"],
          "gaps": ["string (documented weakness or unserved outcome)"]
        }
      ],
      "substitute_map": "object | string (map of non-obvious substitutes buyers use when the product category fails them)",
      "jtbd_gap_map": [
        {
          "jtbd": "string (the JTBD outcome statement from Sprint 3)",
          "best_competitor_coverage": "string (which competitor covers this outcome best, and how well)",
          "gap": "string (the specific unmet portion of this outcome across the entire competitive set)"
        }
      ],
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "how_to_win_hypothesis": {
      "value_prop": "string (plain-language statement of what the product delivers that competitors do not)",
      "advantage_type": "string (one of: cost leadership | differentiation | network effect | switching cost | data flywheel | platform lock-in | speed-to-outcome | regulatory | brand — name the primary type)",
      "why_it_holds": "string (structural reason the advantage is defensible, not just a claim)",
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "required_capabilities": {
      "capabilities": [
        {
          "name": "string (capability name)",
          "current_state": "string (exists and strong | exists and weak | does not exist)",
          "gap": "string (what must be built, acquired, or partnered to close the gap — or 'none' if already strong)",
          "criticality": "must-have | high | medium | low (relative to the how-to-win hypothesis)"
        }
      ],
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "economic_engine": {
      "unit_economics_ranges": "string (CAC range, LTV range, gross margin range — all as explicit ranges with channel-mix assumptions stated, e.g. 'CAC $120–$400 via content+outbound blend; LTV $1,200–$3,600 at 24mo average tenure')",
      "cac_ltv_ranges": "string (LTV:CAC ratio range with inputs; flag if ratio is below 3:1)",
      "pricing_model": "string (pricing architecture: seat-based, usage-based, outcome-based, tiered subscription, etc. — with evidence for why this model fits the segment's WTP)",
      "payback_bounds": "string (payback period range with explicit assumptions about ramp rate and channel)",
      "sensitivity_notes": "string (which single input, if wrong by 20%, breaks the model — boundary conditions where the engine fails)",
      "claim_sheet": { "$ref": "#claim_sheet" }
    },
    "differentiation_wedge": {
      "open_white_space": "string (the specific customer outcome or capability combination that named competitors do not currently occupy)",
      "why_unoccupied": "string (structural reason competitors have not filled this space — capability cost, market timing, incentive misalignment, etc.)",
      "defensibility": "string (why holding this position compounds over time — switching cost, data accumulation, network, brand, regulatory, etc.)",
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

## Element Descriptions and Realistic Examples

### 1. `winning_aspiration`

Captures the bounded ambition: what "winning" looks like in concrete terms for this product within this category. The ambition must be bounded — if it does not specify where the product will NOT play, it is a wish, not a strategy.

**Example:**
```json
{
  "ambition": "Be the workflow-layer that mid-market logistics operators use as the first tool they open — capturing 15% of the $2.1B mid-market TMS segment in North America within 36 months.",
  "boundaries": "Will not serve enterprise shippers (>$500M revenue) requiring custom ERP integration; will not compete in last-mile delivery software; will not expand to EMEA before domestic segment share exceeds 10%.",
  "claim_sheet": { ... }
}
```

### 2. `category_definition_sizing`

Defines the category frame the product occupies (not necessarily the category analysts use) and provides TAM/SAM/SOM as explicit ranges with stated methodology. Never a point estimate.

**Example:**
```json
{
  "category": "Mid-market Transportation Management Systems (TMS) — workflow-layer tools that give shippers without a dedicated ops team the visibility and carrier-negotiation leverage previously requiring a freight broker.",
  "tam_range": "$4.2B–$6.8B (North American TMS market; range spans Gartner $4.2B floor to Pitchbook $6.8B ceiling; methodology: top-down from freight-spend × software-attach-rate proxy 0.8–1.3%)",
  "sam_range": "$800M–$1.4B (mid-market shippers, $10M–$500M revenue, >500 shipments/year; filtered from TAM by segment sizing from RILA survey data)",
  "som_range": "$80M–$210M over 36 months (10–15% SAM capture at current growth rate; assumes 3 sales cycles per year per rep at $45K–$90K ACV)",
  "method_notes": "Bottom-up crosscheck: 12,000 addressable mid-market shippers × $6,700–$17,500 estimated ACV = $80M–$210M. Ranges kept wide given market-definition variance across analyst reports.",
  "claim_sheet": { ... }
}
```

### 3. `jtbd_outcomes`

The top 3 Jobs-to-be-Done stated as outcome statements the buyer hires the product to deliver. Ranked by importance × satisfaction-gap. Outcome statements use buyer language, not feature language.

**Example:**
```json
{
  "outcomes_top3": [
    {
      "statement": "Help me stop paying for freight capacity I can't see until the invoice arrives.",
      "importance": "high (cited in 74% of buyer-side review verbatims as primary pain; G2 + Capterra corpus)",
      "satisfaction_gap": "Current tools score 2.8/5 on 'real-time cost visibility' vs. 4.1/5 importance rating — gap of 1.3 points. Proxy: 68% of switchers cited this as primary switch trigger."
    }
  ],
  "claim_sheet": { ... }
}
```

### 4. `segments_wtp`

Named buyer segments with firmographic and psychographic definition, size bounds as explicit ranges, and WTP proxies drawn from observable pricing signals or switching behavior.

**Example segment:**
```json
{
  "name": "Lean Ops Manufacturer",
  "firmographic": "US-based manufacturer, $25M–$150M revenue, 3–8 person ops team, 600–3,000 shipments/year",
  "psychographic": "Risk-averse adopters; prioritize vendor stability; willing to pay for setup support; decision made by VP Ops, not IT",
  "size_bound": "~4,200–5,800 firms nationally (NAICS 31-33 filtered by revenue band; Census + D&B estimate)",
  "wtp_proxy": "Current spend on freight broker fees $18K–$65K/year signals $8K–$20K/year SaaS tolerance; analogous SaaS switches at $12K–$18K ACV observed in competitor pricing pages"
}
```

### 5. `where_to_play_map`

Each option is a concrete intersection of segment × channel × geo × use-case, rated on attractiveness (market pull) and right-to-win (capability fit). This is the strategic option map — not a plan, an evaluated menu.

> **Artifact mapping:** Sprint 5's named output `attractiveness_right_to_win_matrix` IS the `options[]` array — each option carries its attractiveness × right_to_win scores. There is no separate matrix field in the schema.

**Example option:**
```json
{
  "segment": "Lean Ops Manufacturer",
  "channel": "Content-led inbound + freight-broker referral network",
  "geo": "US Midwest manufacturing belt",
  "use_case": "Carrier rate benchmarking at bid time",
  "attractiveness": "high (large segment, underserved by enterprise TMS, growing 11% YoY)",
  "right_to_win": "medium (strong on UX and onboarding speed; weaker on carrier network depth vs. incumbents)"
}
```

### 6. `competitive_capability_teardown`

Competitors mapped by observable capabilities, structural moats, and documented gaps — not brand claims. Includes a substitute map of non-obvious alternatives buyers use when the category fails.

**Example competitor entry:**
```json
{
  "name": "MercuryGate",
  "capabilities": ["multi-modal rate shopping", "ERP integration library (SAP, Oracle, NetSuite)", "carrier compliance engine"],
  "moats": ["18-year carrier data network (>15K carriers)", "enterprise switching cost via deep ERP integration", "long-tenured customer base with high re-procurement friction"],
  "gaps": ["onboarding takes 90–180 days per customer reviews", "no self-serve tier; requires implementation partner", "UX rated 2.9/5 on G2 for 'ease of use'"]
}
```

### 7. `how_to_win_hypothesis`

Names the advantage type explicitly (not a category claim). States WHY the advantage holds structurally — the mechanism, not the aspiration.

**Example:**
```json
{
  "value_prop": "The only TMS that a 3-person ops team can deploy without an implementation partner and start seeing carrier cost variance within 14 days.",
  "advantage_type": "speed-to-outcome + switching cost (self-serve moat: once operators build carrier lists and routing rules in the tool, data portability is low)",
  "why_it_holds": "Enterprise TMS vendors structurally cannot serve self-serve: their revenue model requires PS revenue (avg $40K/deal) and their product architecture was built for ERP integration, not standalone use. Smaller operators structurally lack IT headcount to run implementation-heavy tools, creating a capability vacuum that compounds as headcount stays lean."
}
```

### 8. `required_capabilities`

Capabilities the product must have — or build — for the how-to-win hypothesis to hold. Rated by criticality relative to the hypothesis. Gap = what must change.

**Example capability:**
```json
{
  "name": "Self-serve onboarding with guided carrier setup",
  "current_state": "exists and weak (current onboarding requires a CSM touchpoint; 60% of trials stall at carrier-upload step per internal telemetry)",
  "gap": "Build AI-assisted carrier import and routing-rule suggestion to reduce time-to-value from 14 days to <48 hours",
  "criticality": "must-have (the entire speed-to-outcome advantage collapses without this)"
}
```

### 9. `economic_engine`

Unit economics as explicit ranges. States channel-mix assumptions, LTV:CAC ratio, and payback bounds. Flags which single input breaks the model if wrong by 20%. No hidden math.

**Example:**
```json
{
  "unit_economics_ranges": "CAC $280–$620 (content-led blend: $200–$400 content-sourced; $500–$900 outbound-sourced; blended at 60/40 mix); LTV $14,400–$32,400 (ACV $7,200–$13,500 × 2.0–2.4yr avg tenure at 85–91% gross retention)",
  "cac_ltv_ranges": "LTV:CAC ratio 23:1–52:1 at current mix; note: ratio collapses to 8:1–14:1 if outbound share rises to >60% without conversion rate improvement",
  "pricing_model": "Annual seat subscription, 3 tiers ($6K, $10K, $18K ACV); usage-based freight-volume add-on above 5,000 shipments/year. Rationale: Lean Ops buyers prefer predictable annual commitments; usage-based ceiling captures upside as customers grow without requiring upsell motion.",
  "payback_bounds": "CAC payback 4–11 months depending on channel; content-sourced deals recover in 4–6 months; outbound in 7–11 months at current ACV",
  "sensitivity_notes": "Model is most sensitive to gross retention (85% vs 91% swings LTV by 35%). If churn exceeds 15%/year, LTV:CAC drops below 3:1 at outbound-heavy mix. Second sensitivity: ACV compression below $6K/year makes content-led unit economics marginal at current content investment levels."
}
```

### 10. `differentiation_wedge`

The specific unoccupied customer-outcome or capability combination. Must name WHY it is unoccupied (structural, not accidental) and how holding it compounds.

**Example:**
```json
{
  "open_white_space": "Self-serve TMS with sub-48-hour time-to-value for teams without IT support — no incumbent serves this outcome at this speed for mid-market operators.",
  "why_unoccupied": "Enterprise TMS vendors (MercuryGate, Oracle TMS, BluJay) structurally require PS revenue to fund their GTM and cannot price or architect for self-serve. SMB-oriented tools (Freightview, uShip) lack multi-carrier rate optimization depth. The gap is an incentive-structure problem, not a technical one.",
  "defensibility": "Self-serve data accumulation: each operator's carrier lists, routing preferences, and lane history create a private data asset that is operationally costly to migrate. Combined with the switching cost of re-training ops teams, retention compounds. Additionally, carrier network density improves as customers add carriers, creating a weak but real network effect on rate benchmarking accuracy."
}
```

## Claim Sheet Shape (`#claim_sheet`)

Every one of the 10 elements must carry one:

```json
{
  "statement": "string (single plain-language summary claim for this element)",
  "boundaries": "string | null (conditions under which this claim does not hold)",
  "counter_evidence": "string (most credible source or argument against this claim)",
  "confidence": "high | medium | low",
  "sources": ["source_id (minimum 3 per claim sheet)"]
}
```

## Validation Rules

- Every `claim_sheet` must reference ≥3 entries resolving to `sources` ids — no claim ships below the proof minimum.
- All numeric assertions appear as explicit ranges with inputs and method stated (`tam_range`, `sam_range`, `som_range`, `unit_economics_ranges`, `cac_ltv_ranges`, `payback_bounds`, `size_bound`). No silent math, no point estimates.
- Every contradiction encountered during sprints must appear in `contradiction_matrix` as `resolved` or `bounded` — never silently dropped.
- `winning_aspiration.boundaries` must be non-empty — an unbounded ambition is not a strategy claim.
- `how_to_win_hypothesis.advantage_type` must name a specific mechanism from the allowed list — generic claims like "better product" do not satisfy this field.
- `differentiation_wedge.why_unoccupied` must cite a structural reason, not a timing assumption.
