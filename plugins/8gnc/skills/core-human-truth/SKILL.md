---
name: core-human-truth
description: Use when the user asks for a core human truth, brand truth, audience insight, consumer truth, foundational brand insight, or strategic brand research — Layer 1 of the Brandprint research stack and the entry point for any new brand engagement. Also trigger when requests mention "tension ladder," "truth sentence," "brand truth scaffolding," "audience truth," "what does my audience really believe," or any request to distill a brand or product down to one universal human insight. Even if the user just says "find the real truth behind why people buy X" or "what's the one thing my audience feels but can't say," use this skill.
---

# Core Human Truth — Deep Research Directive

Produce a single validated sentence (max 25 words) that captures the Core Human Truth for a given topic and audience. The sentence must pass tension, emotion, and agency checks, and be backed by triangulated evidence.

## When NOT to Use

- **Quick taglines or copywriting.** This skill runs a six-phase research pipeline. If the user wants a headline without evidence, write the copy directly — don't invoke this.
- **A validated truth already exists.** If the brand has a researched, evidence-backed truth sentence, skip to `brandprint-tier-a` and feed it in as the seed.
- **Non-brand research questions.** Market sizing, technology comparisons, or general analysis belong in `deep-research` — this skill only distills brand/audience truths.

## When You Receive a Request

Before doing anything else, resolve these variables with the user. If any are missing, ask.

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `topic` | The brand, product, service, or subject | *required* |
| `audience` | Primary audience definition | *required* |
| `region_context` | Geography or cultural context | US / English-speaking |
| `constraints` | Scope limits, legal, or brand constraints | None |
| `mode` | `rapid`, `standard`, or `enterprise` | `standard` |

## Principles

These are non-negotiable throughout the entire process:

1. **Truth over consensus.** Cite, compare, and challenge sources.
2. **Show tension, emotion, and agency** in the final sentence.
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
- Resolve all variables (topic, audience, region, constraints, mode)
- List explicit assumptions and open questions
- Define success criteria: max 25 words, no jargon, tension + emotion + agency, testable via proxy validation
- Set evidence thresholds and note any disallowed sources

Outputs: `lens_brief`, `success_criteria`, `assumptions_list`

### Phase 1 — Secondary Sourcing

**Goal:** Map existing knowledge and tensions.

Actions:
- Literature sweep across academic and industry sources for the topic and audience
- Trend and media scan across reputable news, trade publications, forums, and short-form platforms
- Data dig of longitudinal datasets where applicable
- Tag emergent tensions and paradoxes — build a first-pass thematic map

Outputs: `annotated_bibliography`, `thematic_map`, `data_summary`

**Mode adjustments:**
- *Rapid:* 8–12 qualitative artifacts, lighter desk research
- *Standard:* Full desk research, qualitative synthesis
- *Enterprise:* Add cross-market comparisons, deeper comparative datasets

### Phase 2 — Qualitative Synthesis

**Goal:** Extract lived tensions from public qualitative artifacts.

Actions:
- Identify and summarize public first-person accounts, interviews, reviews, and forums relevant to the audience and topic
- Harvest cultural artifacts that symbolize the topic (memes, community posts) where public and permissible
- Cluster quotes and artifacts into a **tension ladder** — from surface complaints to root causes

Outputs: `insight_memos`, `tension_ladder`, `verbatim_snippets_public`

### Phase 3 — Validation via Triangulation

**Goal:** Validate candidate sentences with existing evidence and proxy signals.

Actions:
- Draft 3–5 candidate sentences based on the tension ladder
- Score each candidate against success criteria and evidence strength
- Triangulate with existing surveys, meta-analyses, and credible datasets
- If appropriate in Standard or Enterprise mode, design a small survey instrument *as a plan only* — never fabricate results

Outputs: `candidate_sentences_scored`, `validation_notes`, `quant_plan_optional`

### Phase 4 — Extraction and Red Team

**Goal:** Select the strongest sentence and pressure-test it.

Actions:
- Select the top candidate or create a hybrid based on evidence and clarity
- Run red team critique: Who would disagree and why? What would falsify it? Where does it fail?
- Revise with minimal words to increase truth density
- Run the plain-language and 25-word checks

Outputs: `final_sentence`, `red_team_report`, `readability_check`

### Phase 5 — Packaging

**Goal:** Deliver the sentence and its proof in compact, reusable form.

Actions:
- Assemble rationale narrative connecting tensions to evidence
- Create a simple tension map of paradox axes
- Draft audience archetype snapshots grounded in cited evidence
- Compile a lexicon: words that resonate vs. words that repel (based on sources)

Outputs: `rationale_deck_outline`, `tension_map`, `archetype_summaries`, `lexicon`

## Quality Checks (Run Before Finalizing)

Every final deliverable must pass all of these:

- [ ] **25-word limit** on the final sentence
- [ ] **Plain language** — passes a 6th-grade readability test
- [ ] **Tension present** — clear push-and-pull the audience recognizes
- [ ] **Emotion present** — an identifiable feeling is invoked
- [ ] **Agency present** (or intentionally absent with explanation)
- [ ] **Evidence check** — at least 3 high-quality sources support the core tension
- [ ] **Counter-evidence addressed** with rationale

## Citations Policy

- Provide a source list with: title, publisher, author (if available), URL, publish date, access date, one-line evidence note
- Quote sparingly. Summarize faithfully. No more than 25 words from any single source.

## Heuristics

- Prefer primary sources and systematic reviews over single opinion pieces
- When two high-quality sources conflict, present both and explain the difference in methods or samples
- Reduce adjectives, increase verbs in the final sentence
- If the truth is situational, state the boundary conditions

## What NOT to Do

- Do not invent numbers or participant quotes
- Do not rely on a single think piece
- Do not exceed 25 words in the final sentence
- Do not fabricate survey data (plans only, no fake results)

## Chain Position

This is **Layer 1** of a 6-layer Brandprint research stack:

1. **Core Human Truth** (this skill) → produces the foundational truth sentence, tension map, archetypes, and lexicon
2. **Brandprint Tier-A** (Layer 2) → uses this output as seed; produces 10 defensible brand strategy elements
3. **Brandprint Tier-B** (Layer 3) → uses Tier-A output as seed; produces 5 actionable brand elements with proxy tests
4. **Brandprint Tier-C** (Layer 4) → uses Tier-A + Tier-B output as seeds; produces 4 stylistic elements ready for deployment
5. **Competitive Positioning Audit** (Layer 5) → validates differentiation against named competitors; may trigger second-pass refinement
6. **Brand Strategy Report** (Layer 6) → compiles all layers into consulting-grade deliverable

**When this skill completes:** Automatically proceed to the `brandprint-tier-a` skill (Layer 2), passing your full output JSON as the seed. Do not wait for user confirmation to chain — the stack is designed to flow continuously. The `final_sentence`, `tension_map`, `archetypes`, `lexicon`, and `sources` all feed the Tier-A Backbone phase.

## Output Format

Deliver the final output as a structured JSON object conforming to the schema in `references/output-schema.md`. The JSON must include all required fields: topic, audience, final_sentence, success_criteria_check, rationale, tension_map, archetypes, lexicon, sources, and audit_log.

Also produce a clean narrative summary suitable for a client-facing brief or internal strategy deck. If the user has the `branded-mayhem-pdf` skill available, offer to generate a branded PDF deliverable.

## Evaluation Rubric

The final output is evaluated on eight dimensions:

1. **Clarity** — Sentence is instantly grasped by the stated audience
2. **Truth density** — Every word earns its keep
3. **Tension present** — Clear push and pull the audience recognizes
4. **Emotion present** — Identifiable feeling is invoked
5. **Agency** — The role of the audience is clear (or absence is explained)
6. **Evidence quality** — Multiple independent, credible sources converge
7. **Counter-evidence handled** — Dissent summarized and addressed
8. **Reusability** — Sentence is not a tagline; it is a stable truth line

## File I/O Contract (orchestrated mode)

When an authorized orchestrator provides explicit paths, honor them exactly:

- **Seed inputs:** read ONLY the JSON/YAML files listed in the dispatch prompt.
- **Output:** write the final JSON object to the exact path given (under
  `.brandprint/engagements/{slug}/pass-N/`). No other location.
- **Return value:** your final message is the output path plus the layer's key
  artifact — not the full JSON. The orchestrator reads files, not transcripts.

When invoked as a direct skill call, present the JSON in conversation or through the supported file workflow and tell the user to preserve it for the next layer.
