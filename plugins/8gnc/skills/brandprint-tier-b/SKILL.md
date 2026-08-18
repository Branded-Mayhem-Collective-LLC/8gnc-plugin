---
name: brandprint-tier-b
description: Use when the user asks for Tier-B brand elements — brand activator, brand platform word, tone and manner guidelines, moat statement, brand no-no's, brand guardrails, brand voice, or brand behavior testing — Layer 3 of the Brandprint research stack. Also trigger on "run Tier-B," "brand activation," "brand tone," "competitive moat," "brand rules," or when the user wants practical, testable brand outputs derived from existing strategy research. Use immediately when the brandprint-tier-a skill has just completed — chain directly using its output as the seed.
---

# Brandprint Tier-B — Activation & Guardrails Directive

Deliver 5 Tier-B brand elements that are practical, testable, and aligned to validated Tier-A truths. Evidence is lightweight but real. Every element gets at least one behavioral proxy signal.

## When NOT to Use

- **No Tier-A output exists.** Tier-B derives, it doesn't originate. Run `brandprint-tier-a` first — standalone mode here produces reduced-confidence output and says so in the audit log.
- **Full visual identity or design systems.** Tone, platform word, and guardrails are verbal/behavioral elements. Logos, palettes, and type systems are design work outside this chain.
- **Testing positioning against competitors.** Tier-B checks alignment with Tier-A, not differentiation in market — that's `competitive-positioning-audit` (Layer 5).

## Chain Position

This is **Layer 3** of a 6-layer Brandprint research stack:

1. **Core Human Truth** (Layer 1) → foundational truth sentence, tension map, archetypes, lexicon
2. **Brandprint Tier-A** (Layer 2) → 10 defensible brand strategy elements with evidence-gated sprints
3. **Brandprint Tier-B** (this skill) → uses Layer 2 output as seed; produces 5 actionable brand elements with proxy tests
4. **Brandprint Tier-C** (Layer 4) → uses Tier-A + Tier-B output as seeds; produces 4 stylistic elements ready for deployment
5. **Competitive Positioning Audit** (Layer 5) → validates differentiation against named competitors; may trigger second-pass refinement
6. **Brand Strategy Report** (Layer 6) → compiles all layers into consulting-grade deliverable

**When Layer 2 has just completed:** Import its full output JSON directly. Pull Tier-A anchors — tensions, outcomes, audience, equity ladder, competition, tagline, moat signals — into the Intake phase. Do not re-research what Layers 1–2 already validated. Carry forward all sources and the contradiction matrix.

**When running standalone:** Resolve all variables with the user. If no Tier-A backbone exists, build a lightweight Backbone Tap from scratch using desk research, but note reduced confidence in the audit log.

## Variables to Resolve

Before starting, confirm these with the user (or inherit from Layers 1–2):

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `brand_name` | The brand being researched | *required* |
| `topic` | Product, service, or subject | *required* |
| `category` | Industry or category | *required* |
| `audience` | Primary audience definition | *required* (or from Layer 2) |
| `region_context` | Geography or cultural context | US / English-speaking |
| `constraints` | Scope, legal, brand safety, cultural sensitivities | None |
| `languages` | Output language | English |
| `timeline_days` | Suggested execution window | 7–21 days |
| `mode` | `rapid`, `standard`, or `enterprise` | `standard` |
| `backbone_source` | Link or reference to Tier-A backbone repository | From Layer 2 if chained |

## Principles (Non-Negotiable)

1. **Evidence-informed, not evidence-bloated.** Two independent sources or one source + a behavioral proxy per claim.
2. **Mirror the audience's words.** Reduce adjectives. Show behaviors.
3. **Test the smallest possible thing:** five-second comprehension, recall ping, micro-click, or completion rate.
4. **If an output conflicts with Tier-A,** either revise or state boundary conditions.
5. **No fabrication.** If data is unknown, label as unknown.

## Evidence & Citation Policy

For any external claim, include: title, publisher, URL, dates, and a one-line evidence note. Quote sparingly. Same citation format as Layers 1–2.

## Global Acceptance Gates

Every Tier-B element must meet these before its claim is accepted:

- **Proof minimum:** ≥2 independent sources OR 1 source + 1 behavioral proxy
- **Plain-language and confusion checks** for anything public-facing
- **Alignment check** against Tier-A tensions, outcomes, and audience

**Mode adjustments:**
- *Rapid:* Single pass using Backbone + 1 proxy test per element
- *Standard:* Backbone + 2 proxy tests per element; alt variants where helpful
- *Enterprise:* Add cross-segment variants and pre-registered test plans

## What NOT to Do

- Don't invent survey results
- Don't contradict Tier-A without stating limits
- Don't ship jargon
- Don't skip proxy tests — every element needs at least one behavioral signal
- Don't copy Tier-A proof points verbatim as proxy tests — proxy tests must be designed fresh per element (recall ping, micro-click, completion rate)
- Don't treat the platform word as a tagline — it is a one-word decision filter for internal use, never public copy
- Don't write a no-no rule without its rationale and the Tier-A tension it protects — an unanchored rule gets ignored or argued away

## Workflow

### Phase 0: Intake & Alignment

**Goal:** Confirm context and pull Tier-A anchors.

Actions:
- Resolve all variables; pull Tier-A anchors: tensions, outcomes, audience, equity ladder, competition
- List constraints (legal, brand safety, cultural sensitivities)
- Define success criteria per element (see acceptance gates in each sprint)

Outputs: `alignment_brief`, `tierA_anchor_summary`, `success_criteria`

---

### Phase: Backbone Tap

**Goal:** Reuse existing evidence; no re-collection if unnecessary.

Actions:
- Inherit review verbatims, search-intent phrases, competitor inventory from Tier-A Backbone
- Flag contradictions to watch

If no Tier-A Backbone exists, conduct lightweight desk research to populate: review verbatims (min 20), search-intent sample (min 10 phrases), top 5 competitor inventory. Log reduced confidence.

Outputs: `backbone_refs_used`, `contradictions_watchlist`

---

### Sprint: Brand Activator (signature micro-behavior)

**Goal:** Define the one repeatable action or ritual that makes the brand tangible at touchpoints.

Actions:
- Hypothesize 2–3 activators derived from Tier-A tensions and outcomes
- Define where to use (touchpoints) and expected micro-behavior
- Design a proxy test: completion rate, post-exposure recall, or micro-conversion
- Select winner based on proxy signal + feasibility

**Acceptance gates:**
- Proof minimum: ≥2 (independent sources or 1 source + 1 behavioral proxy)
- Recall or completion proxy required
- Alignment with Tier-A required

Outputs: `activator_candidates`, `test_plan`, `proxy_results`, `final_activator_pack`

---

### Sprint: Brand Platform (single word/idea)

**Goal:** Identify one word that becomes the decision filter for the brand.

Actions:
- Mine audience language to propose 3–5 platform words with synonyms
- Run semantic field check against corpus and competitors
- Write the gatekeeper question: "Does this create more [word]?"
- Select word with strongest evidence and lowest confusion risk

**Acceptance gates:**
- Proof minimum: ≥2
- Confusion rate check required
- Semantic overlap with competitors must be noted

Outputs: `platform_word_options`, `semantic_notes`, `gatekeeper_question`, `final_platform_word`

---

### Sprint: Tone & Manner (adjectives and key phrases)

**Goal:** Codify how the brand sounds using real customer language.

Actions:
- Extract frequent customer phrases; remove category clichés
- Propose 3–6 adjectives and 5–8 key phrases grounded in verbatims
- Run five-second and plain-language checks
- Provide do/say examples and anti-patterns

**Acceptance gates:**
- Proof minimum: ≥2
- Plain-language check required
- Anti-patterns required

Outputs: `adjectives`, `key_phrases`, `dos_and_donts`, `readability_notes`

---

### Sprint: Our Moat (why we win)

**Goal:** Articulate why the brand wins in observable, defensible terms.

Actions:
- Draft moat statements tied to observable advantages (speed to value, switching cost, IP, distribution)
- Cross-check against competitor claims and public signals
- Provide time-to-value comparison or switching-cost proxy

**Acceptance gates:**
- Proof minimum: ≥2
- Observable signal required
- No handwaving — every moat claim must cite a real signal

Outputs: `moat_statement`, `evidence_notes`, `observable_signals`, `time_to_value_or_switch_cost_proxy`

---

### Sprint: Brand No-No's

**Goal:** Define the guardrails that protect brand integrity.

Actions:
- From complaints, usability findings, and brand safety constraints, list 5–10 "never/avoid" rules
- Attach rationale and the risk each prevents
- Map each to a Tier-A tension it protects

**Acceptance gates:**
- Proof minimum: ≥2
- Each rule requires rationale
- Link to Tier-A tension required

Outputs: `no_nos_list`, `rationales`, `risk_mapping`

---

### Phase: Integration & Packaging

**Goal:** Ensure Tier-B elements align and don't step on Tier-A.

Actions:
- Run contradiction check against Tier-A anchors
- Assemble quick rationale notes and citations
- Produce a one-pager per element for handoff

Outputs: `contradiction_check`, `rationale_notes`, `tierB_one_pagers`

## Sprint Dependency Map

Tier-B sprints are lighter than Tier-A. Most can run in parallel after the Backbone Tap:

```
Tier-A Output (Layer 2)
    │
    ▼
Intake & Alignment
    │
    ▼
Backbone Tap ──┬── Sprint: Brand Activator ──────────────┐
               │                                          │
               ├── Sprint: Brand Platform ────────────────┤
               │                                          │
               ├── Sprint: Tone & Manner ─────────────────┤
               │                                          │
               ├── Sprint: Our Moat ──────────────────────┤
               │                                          │
               └── Sprint: Brand No-No's ─────────────────┤
                                                          │
                         Integration & Packaging ◄────────┘
```

All 5 sprints can run in parallel since they each tap the same Backbone + Tier-A anchors independently. The Integration phase waits for all 5 to complete.

## Heuristics

- If you can't explain it in one breath, it isn't Tier-B
- Prefer real customer words over clever synonyms
- One proxy signal beats five opinions
- If two good options tie, pick the one that's cheaper to test live

## Output Format

Deliver the final output as structured JSON conforming to the schema in `references/output-schema-tier-b.md`.

The JSON must include: `brand_name`, `topic`, `audience`, `backbone_refs_used`, `tierB_results` (all 5 elements with proxy tests), `sources`, and `audit_log`.

**Forward chaining:** When this skill completes, its full output object becomes the input seed for Layer 4 (Brandprint Tier-C). Preserve the complete JSON — Layer 4 needs Tier-B tone, platform word, and no-no rules. Also preserve the Tier-A JSON from Layer 2; Layer 4 needs both. If the `brandprint-tier-c` skill is available, proceed directly into it without user confirmation.

If the user has the `branded-mayhem-pdf` skill available, offer to generate a branded PDF deliverable of the Tier-B results.

## Evaluation Rubric

1. **Alignment** — Tier-B outputs reflect Tier-A truths without contradiction
2. **Evidence** — each element meets the Tier-B proof minimum (≥2 or 1+proxy)
3. **Behavior** — at least one proxy signal per element in rapid mode; two in standard mode
4. **Clarity** — plain-language and low confusion in public-facing pieces
5. **Differentiation** — platform word and moat are not commodity language
6. **Utility** — activator is specific, placeable, and testable at live touchpoints

## File I/O Contract (orchestrated mode)

When an authorized orchestrator provides explicit paths, honor them exactly:

- **Seed inputs:** read ONLY the JSON/YAML files listed in the dispatch prompt.
- **Output:** write the final JSON object to the exact path given (under
  `.brandprint/engagements/{slug}/pass-N/`). No other location.
- **Return value:** your final message is the output path plus the layer's key
  artifact — not the full JSON. The orchestrator reads files, not transcripts.

When invoked as a direct skill call, present the JSON in conversation or through the supported file workflow and tell the user to preserve it for the next layer.
