---
name: brandprint-tier-c
description: Use when the user asks for Tier-C brand elements — brand mantra, brand personification, translation line, features-to-benefits mapping, brand style elements, brand personality vignette, or brand copy finalization — Layer 4 of the Brandprint research stack. Also trigger on "run Tier-C," "brand mantra," "brand personality," "header line," "features list," or when the user wants ready-to-deploy brand style outputs derived from existing strategy. Use immediately when the brandprint-tier-b skill has just completed — chain directly using its output as the seed.
---

# Brandprint Tier-C — Style & Deployment Directive

Deliver 4 Tier-C brand elements that are stylistic, derivative, and ready to deploy. These outputs create no new claims. Every line traces back to validated Tier-A and Tier-B truths.

## When NOT to Use

- **Tier-A or Tier-B output is missing.** This layer needs both as anchors. Without them, either collect equivalent inputs from the user or run the chain from Layer 1 — don't improvise anchors.
- **Creating new claims or strategy.** Tier-C styles what Layers 1-3 validated. If the brand needs a new benefit, proof, or position, that's a Tier-A sprint, not a Tier-C edit.
- **Long-form copywriting.** Mantra, vignette, translation line, features list — that's the full scope. Web pages, campaigns, and articles are downstream deployment work.

## Chain Position

This is **Layer 4** of a 6-layer Brandprint research stack:

1. **Core Human Truth** (Layer 1) → foundational truth sentence, tension map, archetypes, lexicon
2. **Brandprint Tier-A** (Layer 2) → 10 defensible brand strategy elements with evidence-gated sprints
3. **Brandprint Tier-B** (Layer 3) → 5 actionable brand elements with proxy tests (activator, platform word, tone, moat, no-no's)
4. **Brandprint Tier-C** (this skill) → uses Tier-A + Tier-B output as seeds; produces 4 stylistic elements ready for team handoff
5. **Competitive Positioning Audit** (Layer 5) → validates differentiation against named competitors; may trigger second-pass refinement
6. **Brand Strategy Report** (Layer 6) → compiles all layers into consulting-grade deliverable

**When Layer 3 has just completed:** Import the full Tier-B output JSON and the Tier-A JSON carried forward. Pull anchors — tensions, outcomes, equity ladder, tagline from Tier-A; tone, key phrases, platform word, no-no rules from Tier-B. Do not create new claims or re-research.

**When running standalone:** Resolve all variables with the user. If no Tier-A/B anchors exist, ask the user to provide equivalent inputs (tensions, outcomes, tone adjectives, platform word, equity ladder) or recommend running the full chain first.

## Variables to Resolve

Before starting, confirm these with the user (or inherit from Layers 1–3):

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `brand_name` | The brand being styled | *required* |
| `topic` | Product, service, or subject | *required* |
| `category` | Industry or category | *required* |
| `audience` | Primary audience definition | *required* (or from Layer 2) |
| `region_context` | Geography or cultural context | US / English-speaking |
| `constraints` | Legal, brand safety, cultural constraints | None |
| `languages` | Output language | English |
| `timeline_days` | Suggested execution window | 3–10 days |
| `mode` | `rapid`, `standard`, or `enterprise` | `standard` |
| `tierA_anchor_ref` | Link or ID for Tier-A output | From Layer 2 if chained |
| `tierB_anchor_ref` | Link or ID for Tier-B output | From Layer 3 if chained |

## Principles (Non-Negotiable)

1. **Alignment first.** Every line must trace to Tier-A tensions, outcomes, and equity ladder, and Tier-B tone and platform.
2. **Clarity over clever.** Sixth-grade readability. Zero jargon.
3. **Cultural hygiene.** Avoid stereotypes. Prefer inclusive, specific language.
4. **No new promises.** If text implies a claim, link it to an existing proof or reword as mood.
5. **Naming note.** If creating a new name or legal risk appears, escalate to Tier-A naming sprint.

## Quality Gates (Global)

- Plain-language check for all public lines
- Alignment check against Tier-A and Tier-B anchors
- Stereotype and cultural risk check
- Word-count limits: mantra = 3 words exactly; translation line = 20 words or fewer

**Mode adjustments:**
- *Rapid:* One pass, one variant per element
- *Standard:* Two variants per element and a quick alignment note
- *Enterprise:* Three variants per element, cross-language check, and a mini style rationale

## What NOT to Do

- Do not contradict Tier-A or Tier-B
- Do not add benefits or proofs that do not exist in the equity ladder
- Do not use cliches or em dashes; keep punctuation simple
- Do not ship jargon or insider language
- Do not exceed 3 words for the mantra — exactly three, and hyphenating two words into one doesn't count
- Do not keep a feature that lacks a mapped benefit and proof — cut it and log it in `gaps_list`; orphans break the equity ladder
- Do not coin a new brand or product name inside a sprint — route it through the Name Hygiene Check and escalate to a Tier-A naming sprint if risk appears

## Workflow

### Phase 0: Intake and Anchor Pull

**Goal:** Load Tier-A and Tier-B anchors and constraints.

Actions:
- Load tensions, outcomes, target segments, equity ladder, and final tagline from Tier-A
- Load tone, key phrases, platform word, and no-no rules from Tier-B
- List any legal, cultural, or language constraints

Outputs: `anchor_summary`, `constraints_list`

---

### Phase 1: Derivation Map

**Goal:** Map Tier-C elements to their parents in A and B.

Actions:
- Create a short matrix showing each Tier-C element and which Tier-A and Tier-B items it derives from
- Flag any possible contradictions for review

Outputs: `derivation_matrix`, `contradictions_watchlist`

---

### Sprint: Brand Mantra (three words)

**Goal:** Distill the brand into exactly three words that echo the platform word and core outcome.

Actions:
- Generate 3–5 candidate three-word mantras that echo the platform word and the core outcome
- Remove cliches and internal jargon
- Run plain-language check and rhythm check

**Acceptance gates:**
- Word count: exactly 3
- Alignment with platform word and core outcome required
- Plain-language check required

Outputs: `mantra_options`, `final_mantra`, `alignment_notes`

---

### Sprint: Personification Vignette

**Goal:** Make the brand tangible as a character people can picture.

Actions:
- Draft a day-in-the-life vignette with fields: city, music genre, TV show, drink, outfit
- Offer 1–2 alternates for different segments or moods
- Run stereotype and cultural risk checklist

**Acceptance gates:**
- Stereotype check required
- Alignment with tone and platform required

Outputs: `primary_vignette`, `alternate_vignettes`, `cultural_risk_notes`

---

### Sprint: Header Translation Line

**Goal:** Write the one plain-English sentence that explains what the brand does and why it matters.

Actions:
- Write the plain-English SVO line: "We [do X] so [audience] can [outcome]."
- Keep verbs active and concrete
- Run plain-language check and confusion check

**Acceptance gates:**
- Max 20 words
- SVO structure required
- Plain-language check required

Outputs: `translation_line_variants`, `final_translation_line`, `readability_notes`

---

### Sprint: Features List for Equity Ladder

**Goal:** Map product features to existing benefits and reasons-to-believe with no orphans.

Actions:
- Pull features from product facts; map each to the existing benefit and reason-to-believe from the Tier-A equity ladder
- Remove any feature that lacks a mapped benefit or proof
- Mark gaps for follow-up

**Acceptance gates:**
- Fact-check required
- No orphan features (every feature maps to a benefit and proof)

Outputs: `features_mapped`, `gaps_list`

---

### Optional: Name Hygiene Check

**Goal:** Catch naming risks before they become legal problems.

Actions:
- If a new or changed brand name is proposed, run pronounceability and basic availability scan notes
- If risk is detected, escalate to Tier-A naming sprint

**Acceptance gates:**
- Escalate if risk detected

Outputs: `name_hygiene_notes`, `escalation_recommendation`

---

### Phase: Integration and Packaging

**Goal:** Assemble clean, ready-to-use Tier-C outputs.

Actions:
- Run final alignment check against anchors and no-no rules
- Package final variants and notes with simple usage guidance
- Update derivation matrix with final references

Outputs: `alignment_check`, `tierC_one_pagers`, `final_derivation_matrix`

## Sprint Dependency Map

Tier-C sprints are lightweight and mostly parallel after the Derivation Map:

```
Tier-A Output (Layer 2) + Tier-B Output (Layer 3)
    │
    ▼
Intake and Anchor Pull
    │
    ▼
Derivation Map ──┬── Sprint: Brand Mantra ──────────────────┐
                 │                                           │
                 ├── Sprint: Personification Vignette ───────┤
                 │                                           │
                 ├── Sprint: Header Translation Line ────────┤
                 │                                           │
                 ├── Sprint: Features List (Equity Ladder) ──┤
                 │                                           │
                 └── Optional: Name Hygiene Check ───────────┤
                                                             │
                        Integration and Packaging ◄──────────┘
```

All 4 core sprints can run in parallel. The Name Hygiene Check runs only if a new name is proposed. Integration waits for all to complete.

## Heuristics

- Use verbs. Kill filler adjectives.
- Prefer audience words over brand words.
- If it reads like an ad, simplify it.
- If two options tie, keep the one that is easier to use across channels.
- No stereotypes. If you have to ask, cut it.

## Output Format

Deliver the final output as structured JSON conforming to the schema in `references/output-schema-tier-c.md`.

The JSON must include: `brand_name`, `audience`, `derivation_matrix`, `tierC_results` (all 4 elements plus optional name hygiene), `consistency_matrix`, and `audit_log`.

**Forward chaining:** When this skill completes, recommend running the `competitive-positioning-audit` skill (Layer 5) before compiling the final report. Layer 5 validates whether the Brandprint positioning is actually differentiated from competitors. If it finds collisions, it triggers a second pass through Layers 1-4 with competitive context — which typically produces dramatically sharper positioning.

If the user wants to skip Layer 5 and go directly to the report, proceed to the `brand-strategy-compiler` skill (Layer 6). But note that skipping competitive validation risks shipping positioning that collides with an entrenched competitor.

## Evaluation Rubric

1. **Alignment** — every Tier-C element traces to Tier-A and Tier-B
2. **Clarity** — plain language, low confusion, no jargon
3. **Cultural hygiene** — zero stereotypes or lazy tropes
4. **Brevity** — mantra is three words; translation line fits the 20-word limit
5. **Consistency** — features map to benefits and proofs with no orphans
6. **Deployability** — outputs are ready to paste into the Brandprint without edits

## File I/O Contract (orchestrated mode)

When an authorized orchestrator provides explicit paths, honor them exactly:

- **Seed inputs:** read ONLY the JSON/YAML files listed in the dispatch prompt.
- **Output:** write the final JSON object to the exact path given (under
  `.brandprint/engagements/{slug}/pass-N/`). No other location.
- **Return value:** your final message is the output path plus the layer's key
  artifact — not the full JSON. The orchestrator reads files, not transcripts.

When invoked as a direct skill call, present the JSON in conversation or through the supported file workflow and tell the user to preserve it for the next layer.
