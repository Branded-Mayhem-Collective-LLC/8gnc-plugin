---
name: core-strategic-truth
description: Use when the user asks for a core strategic truth, product thesis seed, foundational market tension, the one constraint buyers can't escape, the forced trade-off at the center of a market, or a strategy foundation sentence. Also trigger when requests mention "market tension," "strategic tension," "product thesis," "foundational positioning," "what buyers are forced to choose between," "why buyers compromise," "the real constraint in this market," or any request to distill a product or platform down to the single trade-off that drives all buying decisions. Layer 1 of the Productprint research stack and the entry point for any new product strategy engagement. Even if the user just says "find the real reason buyers are stuck between X and Y" or "what's the one market problem no one has actually solved," use this skill.
---

# Core Strategic Truth — Deep Research Directive

Produce a single validated sentence (max 25 words) that captures the Core Strategic Truth for a given product and audience. The sentence must pass tension, stakes, and agency checks, and be backed by triangulated evidence.

## When NOT to Use

- **Quick positioning taglines or copywriting.** This skill runs a six-phase research pipeline. If the user wants a headline without evidence, write the copy directly — don't invoke this.
- **A validated strategic truth already exists.** If the product has a researched, evidence-backed truth sentence, skip to `productprint-tier-a` and feed it in as the seed.
- **Non-strategy research questions.** Market sizing, technology comparisons, or general analysis belong in `deep-research` — this skill only distills foundational product/market strategic truths.

## When You Receive a Request

Before doing anything else, resolve these variables with the user. If any are missing, ask.

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `product_name` | The product, platform, service, or solution | *required* |
| `category` | The market category or domain it competes in | *required* |
| `audience` | Primary buyer/operator audience definition | *required* |
| `region_context` | Geography or cultural context | US / English-speaking |
| `constraints` | Scope limits, legal, or strategic constraints | None |
| `mode` | `rapid`, `standard`, or `enterprise` | `standard` |
| `evidence_mode` | `greenfield` or `existing-product` | `greenfield` |

## Principles

These are non-negotiable throughout the entire process:

1. **Truth over consensus.** Cite, compare, and challenge sources.
2. **Show tension, stakes, and agency** in the final sentence.
3. **No jargon. Max 25 words.** Instantly understood by the audience.
4. **Never fabricate data, quotes, or attributions.** If unknown, mark unknown.
5. **Triangulate.** Prefer converging evidence across independent sources.
6. **Be explicit about uncertainty** and counter-evidence.
7. **Respect privacy.** Use only public, lawful sources.

## Reasoning Approach

Throughout every phase:

- Surface assumptions before starting. List them.
- Voice counter-arguments and plausible alternatives.
- Stress-test conclusions with red team checks.
- Reframe if a simpler or more powerful truth emerges.
- Keep internal working notes distinct from final deliverables.

## Workflow — Six Phases

Execute these phases in order. Each phase has a clear goal, actions, and outputs.

### Phase 0 — Orientation

**Goal:** Define the lens and success criteria before research begins.

Actions:
- Resolve all variables (product_name, category, audience, region, constraints, mode, evidence_mode)
- List explicit assumptions and open questions
- Define success criteria: max 25 words, no jargon, tension + stakes + agency, testable via proxy validation
- Set evidence thresholds and note any disallowed sources
- **In `existing-product` mode:** ingest operator-supplied internal artifacts (roadmap docs, telemetry summaries, customer-interview notes, loss reasons) into Phase 1 sourcing and weight them above external secondary sources. These first-party artifacts are the primary evidence tier; external sources corroborate or challenge, they do not lead.

Outputs: `lens_brief`, `success_criteria`, `assumptions_list`

### Phase 1 — Secondary Sourcing

**Goal:** Map existing knowledge and tensions.

Actions:
- Literature sweep across academic and industry sources for the product, category, and audience
- Trend and media scan across reputable news, trade publications, forums, and short-form platforms
- Data dig of longitudinal datasets where applicable
- Tag emergent tensions and paradoxes — build a first-pass thematic map
- In `existing-product` mode: prioritize operator-supplied artifacts (customer interviews, loss-reason logs, telemetry, roadmap) as Tier 1; external sources are Tier 2 corroboration

Outputs: `annotated_bibliography`, `thematic_map`, `data_summary`

**Mode adjustments:**
- *Rapid:* 8–12 qualitative artifacts, lighter desk research
- *Standard:* Full desk research, qualitative synthesis
- *Enterprise:* Add cross-market comparisons, deeper comparative datasets

### Phase 2 — Qualitative Synthesis

**Goal:** Extract lived trade-offs from public qualitative artifacts.

Actions:
- Identify and summarize public first-person accounts, interviews, reviews, and forums relevant to the audience, product, and category
- Harvest cultural artifacts that symbolize the market tension (community posts, analyst commentary, buyer-side RFP language) where public and permissible
- Cluster quotes and artifacts into a **tension ladder** — from surface complaints to root market trade-offs

Outputs: `insight_memos`, `tension_ladder`, `verbatim_snippets_public`

### Phase 3 — Validation via Triangulation

**Goal:** Validate candidate sentences with existing evidence and proxy signals.

Actions:
- Draft 3–5 candidate sentences based on the tension ladder
- Score each candidate against success criteria and evidence strength
- Triangulate with existing surveys, win/loss data, meta-analyses, and credible datasets
- If appropriate in Standard or Enterprise mode, design a small survey instrument *as a plan only* — never fabricate results
- Surface candidate JTBD hypotheses implied by each candidate sentence — these become `jtbd_seed` entries in the output

Outputs: `candidate_sentences_scored`, `validation_notes`, `jtbd_seed_candidates`, `quant_plan_optional`

### Phase 4 — Extraction and Red Team

**Goal:** Select the strongest sentence and pressure-test it.

Actions:
- Select the top candidate or create a hybrid based on evidence and clarity
- Run red team critique: Who would disagree and why? What would falsify it? Where does it fail?
- Revise with minimal words to increase truth density
- Run the plain-language and 25-word checks
- Confirm the sentence names a **strategic tension** (a forced trade-off with real consequences) — not a brand feeling, an emotional resonance, or a category observation. If it reads like a brand truth, return to Phase 2 and re-anchor on the market structure, not the audience psychology.

Outputs: `final_sentence`, `red_team_report`, `readability_check`

### Phase 5 — Packaging

**Goal:** Deliver the sentence and its proof in compact, reusable form.

Actions:
- Assemble rationale narrative connecting tensions to evidence (capture in `audit_log`)
- Create a tension map of paradox axes as two-pole structures (`tension_map`)
- Draft buyer/operator **decision-role** archetype snapshots grounded in cited evidence and their JTBD and decision context — not consumer identity or demographics (`archetypes`)
- Compile a lexicon: words that resonate vs. words that repel, based on sources (`lexicon`)
- Finalize `jtbd_seed` list from Phase 3 candidates, pruned to the most evidence-backed hypotheses

Outputs: `rationale_narrative`, `tension_map`, `archetype_summaries`, `lexicon`, `jtbd_seed`

## Quality Checks (Run Before Finalizing)

Every final deliverable must pass all of these:

- [ ] **25-word limit** on the final sentence
- [ ] **Plain language** — passes a 6th-grade readability test
- [ ] **Tension present** — clear forced trade-off the buyer recognizes
- [ ] **Stakes present** — consequence of choosing wrong is implied or explicit (not just a feeling)
- [ ] **Agency present** (or intentionally absent with explanation)
- [ ] **Evidence check** — at least 3 high-quality sources support the core tension
- [ ] **Counter-evidence addressed** with rationale

## Citations Policy

- Provide a source list with: title, publisher, URL, publish date, access date, one-line evidence note, stance (supporting / conflicting / neutral)
- Quote sparingly. Summarize faithfully. No more than 25 words from any single source.

## Heuristics

- Prefer primary sources and systematic reviews over single opinion pieces
- When two high-quality sources conflict, present both and explain the difference in methods or samples
- Reduce adjectives, increase verbs in the final sentence
- If the truth is situational, state the boundary conditions
- A strategic tension names who is forced to choose and what the two options cost them — if the sentence could be a tagline, it is not a strategic truth

## What NOT to Do

- Do not invent numbers or participant quotes
- Do not rely on a single think piece
- Do not exceed 25 words in the final sentence
- Do not fabricate survey data (plans only, no fake results)
- Do not write a brand truth (how the audience feels) and call it a strategic truth (what the market forces buyers to sacrifice)

## Chain Position

This is **Layer 1** of a 6-layer Productprint research stack:

1. **Core Strategic Truth** (this skill) → produces the foundational tension sentence, tension map, JTBD seed, archetypes, and lexicon
2. **Productprint Tier-A** (Layer 2) → uses this output as seed; produces the Playing-to-Win cascade, JTBD validation, and foundational strategy elements
3. **Productprint Tier-B** (Layer 3) → uses Tier-A output as seed; produces strategic bets, Now/Next/Later roadmap, build/buy/partner decisions, prioritization model, and risk register
4. **Productprint Tier-C** (Layer 4) → uses Tier-A + Tier-B output as seeds; produces deployment-ready positioning artifacts: positioning statement, one-liner, bet narrative, and strategy-on-a-page
5. **Thesis Stress-Test** (Layer 5) → adversarial pre-mortem gate; extracts load-bearing assumptions and tries to FALSIFY them; returns PROCEED if they survive or REFINE (with a constraint package) if one falls
6. **Strategy Thesis Compiler** (Layer 6) → compiles all layers into a consulting-grade integrated strategy thesis deliverable

**When this skill completes:** Automatically proceed to the `productprint-tier-a` skill (Layer 2), passing your full output JSON as the seed. Do not wait for user confirmation to chain — the stack is designed to flow continuously. The `final_sentence`, `tension_map`, `jtbd_seed`, `archetypes`, `lexicon`, `evidence_mode`, and `sources` all feed the Tier-A backbone phase.

## Output Format

Deliver the final output as a structured JSON object conforming to the schema in `references/output-schema.md`. The JSON must include all required fields: `product_name`, `category`, `audience`, `final_sentence`, `success_criteria_check`, `tension_map`, `jtbd_seed`, `archetypes`, `lexicon`, `sources`, `audit_log`, `mode`, and `evidence_mode`.

Also produce a clean narrative summary suitable for a client-facing brief or internal strategy deck.

## Evaluation Rubric

The final output is evaluated on eight dimensions:

1. **Clarity** — Sentence is instantly grasped by the stated audience
2. **Truth density** — Every word earns its keep
3. **Tension present** — Clear forced trade-off the buyer recognizes
4. **Stakes present** — Consequence of the trade-off is named or strongly implied
5. **Agency** — The role of the buyer/operator is clear (or absence is explained)
6. **Evidence quality** — Multiple independent, credible sources converge
7. **Counter-evidence handled** — Dissent summarized and addressed
8. **Reusability** — Sentence is not a tagline; it is a stable strategic truth that seeds a full strategy chain

## File I/O Contract (orchestrated mode)

> **Note:** automated orchestrated mode is not included in this release; run the manual chain. This contract is a forward-looking specification.

When an authorized orchestrator provides explicit paths, honor them exactly:

- **Seed inputs:** read ONLY the JSON/YAML files listed in the dispatch prompt.
- **Output:** write the final JSON object to the exact path given (under `.productprint/engagements/{slug}/pass-N/`). No other location.
- **Return value:** your final message is the output path plus the layer's key artifact — not the full JSON. The orchestrator reads files, not transcripts.

When invoked as a direct skill call, present the JSON in conversation or through the supported file workflow and tell the user to preserve it for the next layer.
