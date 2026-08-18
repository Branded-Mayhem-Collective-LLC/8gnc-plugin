# Productprint Tier-B — Output Schema (Layer 3)

The final deliverable is a single JSON object with the shape below. This object (together with the Tier-A JSON carried forward from Layer 2) is the seed input for `productprint-tier-c` (Layer 4) — Layer 4 specifically needs the strategic bets, roadmap horizons, and risk register to produce deployment-ready positioning elements.

## Field Reference

| Field | Type | Description |
|---|---|---|
| `product_name` | string | Product or platform being researched |
| `topic` | string | Topic/category scope |
| `audience` | string | Audience definition used |
| `backbone_refs_used` | array | Which Backbone/Tier-A evidence was reused (no re-research) |
| `tierB_results` | object | All 5 elements, each with at least one behavioral proxy test where a signal is testable |
| `sources` | array | Citation list (carried forward + any new lightweight evidence) |
| `audit_log` | array | Phase-by-phase record of actions and decisions |

## Schema Skeleton

```json
{
  "product_name": "string",
  "topic": "string",
  "audience": "string",
  "backbone_refs_used": ["source_id or Tier-A element ref"],
  "tierB_results": {
    "strategic_bets": {
      "bets": [
        {
          "name": "string (short bet label)",
          "hypothesis": "string (if we do X, we will achieve Y, as evidenced by Z)",
          "kill_criterion": "string (the observable signal that invalidates this bet — if X happens, we stop)",
          "tied_to_capability": "string (required_capability ref from Tier-A Sprint 8)"
        }
      ],
      "proxy_test": "string (behavioral signal design to pressure-test the leading bet before committing full resources)",
      "claim_sheet": {
        "statement": "string (the claim these bets assert)",
        "boundaries": "string (conditions under which this bet set is valid)",
        "counter_evidence": "string (what evidence would break these bets)",
        "confidence": "low | medium | high",
        "sources": ["source_id"]
      }
    },
    "roadmap_horizons": {
      "now": ["bet_name (horizon 0-6 months)"],
      "next": ["bet_name (horizon 6-18 months)"],
      "later": ["bet_name (horizon 18+ months)"],
      "sequencing_logic": "string (explains WHY the order is correct — must cite dependencies between bets and kill-criterion thresholds, not intuition)",
      "dependencies": [
        {
          "from_bet": "string",
          "to_bet": "string",
          "dependency_type": "prerequisite | risk-gate | resource-constraint | learning-gate"
        }
      ],
      "proxy_test": "string (leading indicator to track in Now horizon that would trigger a Now→Next promotion or a bet kill)",
      "claim_sheet": {
        "statement": "string",
        "boundaries": "string",
        "counter_evidence": "string",
        "confidence": "low | medium | high",
        "sources": ["source_id"]
      }
    },
    "build_buy_partner": {
      "decisions": [
        {
          "capability": "string (required_capability ref from Tier-A Sprint 8)",
          "choice": "build | buy | partner",
          "rationale": "string (why this choice wins over the alternatives — cost, speed, defensibility, integration risk)"
        }
      ],
      "claim_sheet": {
        "statement": "string",
        "boundaries": "string",
        "counter_evidence": "string",
        "confidence": "low | medium | high",
        "sources": ["source_id"]
      }
    },
    "prioritization_model": {
      "items": [
        {
          "bet_ref": "string (bet name from strategic_bets)",
          "impact": "1-5 (evidence-backed, tied to Tier-A JTBD outcomes or economic engine)",
          "confidence": "1-5 (based on proof density and Tier-A claim sheet confidence)",
          "effort": "1-5 (1=lowest effort, 5=highest effort)",
          "score": "number (impact × confidence / effort)"
        }
      ],
      "method": "string (scoring method description — impact × confidence / effort, with notes on how each dimension was rated)",
      "proxy_test": "string (the smallest observable signal that would shift the top-priority bet's impact or confidence score)",
      "claim_sheet": {
        "statement": "string",
        "boundaries": "string",
        "counter_evidence": "string",
        "confidence": "low | medium | high",
        "sources": ["source_id"]
      }
    },
    "risk_register": {
      "risks": [
        {
          "risk": "string (plain-language risk statement)",
          "likelihood": "low | medium | high",
          "severity": "low | medium | high",
          "leading_indicator": "string (observable early signal BEFORE the risk materializes — this is the management-system hook)",
          "mitigation": "string (concrete action to take when the leading indicator fires)",
          "tied_to_assumption": "string (the Tier-A assumption or bet this risk threatens)"
        }
      ],
      "claim_sheet": {
        "statement": "string",
        "boundaries": "string",
        "counter_evidence": "string",
        "confidence": "low | medium | high",
        "sources": ["source_id"]
      }
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

## Element Descriptions

### 1. `strategic_bets`

Each bet is a falsifiable hypothesis tied to a required capability from Tier-A Sprint 8. A bet without a kill criterion is a wish, not a bet. The `proxy_test` is a behavioral signal — not a survey — designed to stress-test the leading bet before full resource commitment.

**Example:**

```json
"bets": [
  {
    "name": "SMB Self-Serve Onboarding",
    "hypothesis": "If we ship a 5-step guided onboarding flow, SMB activation rate will exceed 60% within 30 days, as evidenced by comparable B2B SaaS benchmarks showing 55-65% rates for guided vs. 30% for unguided flows.",
    "kill_criterion": "If 30-day activation stays below 40% after two iteration cycles (≤90 days), shut down self-serve and revert to high-touch onboarding for SMB.",
    "tied_to_capability": "guided_onboarding_engine"
  }
]
```

### 2. `roadmap_horizons`

The marquee output of Tier-B. Now/Next/Later ordering is REQUIRED to be justified by `sequencing_logic` citing inter-bet dependencies and kill-criterion thresholds. An unjustified sequence fails the gate. `dependencies` make the ordering auditable — each edge names its type (prerequisite, risk-gate, resource-constraint, or learning-gate).

**Example:**

```json
"now": ["SMB Self-Serve Onboarding"],
"next": ["Expansion Revenue Loop"],
"later": ["Enterprise Tier Launch"],
"sequencing_logic": "SMB Self-Serve Onboarding must ship first because (1) it is the prerequisite for the Expansion Revenue Loop (expansion requires activated users to expand) and (2) its kill criterion provides a learning gate — if activation stays below 40%, the Enterprise Tier bet's ICP assumption is invalidated before we commit enterprise sales resources.",
"dependencies": [
  { "from_bet": "SMB Self-Serve Onboarding", "to_bet": "Expansion Revenue Loop", "dependency_type": "prerequisite" },
  { "from_bet": "SMB Self-Serve Onboarding", "to_bet": "Enterprise Tier Launch", "dependency_type": "learning-gate" }
]
```

### 3. `build_buy_partner`

One decision per required capability from Tier-A Sprint 8. The `rationale` must address why the chosen path wins on at least two of: cost, speed-to-capability, defensibility, and integration risk. "Build" chosen purely for control without a defensibility argument does not clear the gate.

**Example:**

```json
"decisions": [
  {
    "capability": "guided_onboarding_engine",
    "choice": "build",
    "rationale": "Onboarding logic is deeply tied to our data model and user state machine — no off-the-shelf tool integrates without a full middleware layer. Build cost is 6-8 weeks; buying and integrating a vendor solution is estimated at 10-12 weeks plus $18K/yr licensing. Building keeps the activation data in-product, compounding into the personalization flywheel (defensibility)."
  }
]
```

### 4. `prioritization_model`

Impact × Confidence / Effort scoring. All three dimensions must be evidence-backed — no vibes. Impact ties to Tier-A JTBD outcomes or economic engine metrics. Confidence ties to proof density in the relevant Tier-A claim sheet. Effort is grounded in team capacity and build/buy/partner decisions. The `proxy_test` names the smallest observable signal that would move the top bet's score.

**Example:**

```json
"items": [
  {
    "bet_ref": "SMB Self-Serve Onboarding",
    "impact": 5,
    "confidence": 4,
    "effort": 3,
    "score": 6.67
  }
],
"method": "Impact rated 1-5 against Tier-A JTBD outcome importance scores. Confidence rated 1-5 from Tier-A claim sheet confidence (high=4-5, medium=3, low=1-2). Effort rated 1-5 from build/buy/partner rationale (1=partner/buy, 3=build light, 5=build complex). Score = (impact × confidence) / effort."
```

### 5. `risk_register`

Each risk maps to a specific Tier-A assumption or bet it threatens and carries a `leading_indicator` — an early observable signal that fires before the risk materializes. This is the management-system hook: when the indicator fires, the `mitigation` is the pre-planned response. Severity × Likelihood without a leading indicator is just a list; the indicator makes the register actionable.

**Example:**

```json
"risks": [
  {
    "risk": "Guided onboarding adoption stays below 30%, signaling ICP mismatch",
    "likelihood": "medium",
    "severity": "high",
    "leading_indicator": "Week-2 onboarding completion rate drops below 50% for three consecutive cohorts",
    "mitigation": "Trigger qualitative interview pass (min 10 non-completers within 5 days); pause further onboarding feature investment pending findings; escalate to strategy review if pattern holds for two additional cohorts",
    "tied_to_assumption": "SMB segment has sufficient activation motivation without high-touch support (Tier-A Sprint 4 WTP proxy)"
  }
]
```

## Validation Rules

- Every element in `tierB_results` carries at least one behavioral proxy signal where a signal is testable (`strategic_bets`, `roadmap_horizons`, and `prioritization_model` each require a `proxy_test`; `build_buy_partner` and `risk_register` use structural evidence in lieu of a behavioral proxy).
- `roadmap_horizons.sequencing_logic` MUST cite inter-bet dependencies and kill-criterion thresholds — an unjustified sequence fails the gate.
- Every `risk_register` entry requires a `leading_indicator` and a `tied_to_assumption` — a risk without an early warning signal is not actionable.
- Every `build_buy_partner` decision requires a `rationale` addressing at least two of: cost, speed, defensibility, integration risk.
- Any element that conflicts with Tier-A output must be revised or carry explicit boundary conditions — record the conflict in the `audit_log`.
- Proxy tests must be designed fresh — do not copy Tier-A proof points verbatim as proxy tests.
- `prioritization_model` scores must be computed from evidence-backed impact, confidence, and effort ratings — "no vibes" means every dimension cites its source (JTBD outcome rank, claim-sheet confidence level, build/buy/partner estimate).
