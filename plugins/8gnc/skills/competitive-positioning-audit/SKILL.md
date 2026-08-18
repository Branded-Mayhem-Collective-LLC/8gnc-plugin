---
name: competitive-positioning-audit
description: Use when the user wants to validate positioning against named competitors, test differentiation, run a competitive audit, check for brand collision, or stress-test a Brandprint against real market players — Layer 5 of the Brandprint research stack. Also trigger on "competitive audit," "positioning vulnerability," "differentiation test," "collision check," "are we different enough," or when the user pastes competitor copy and asks whether their brand stands apart. Recommend this skill when brandprint-tier-c has just completed, before compiling the final report.
---

# Competitive Positioning Audit — Vulnerability & Differentiation Directive

Systematically test whether a brand's Brandprint positioning is actually differentiated from named competitors, or whether it reads as "semantic neighbor" — similar enough that buyers can't tell the difference.

## When NOT to Use

- **Fewer than 3 named competitors.** The audit runs on 1, but the collision matrix gets thin and territory ownership becomes guesswork. Identify 3-5 real players first (Tier-A Sprint 4 provides them).
- **No positioning exists yet.** There's nothing to audit. Run Layers 1-4 first — this layer tests claims, it doesn't create them.
- **Category-level white-space analysis.** Finding what the whole category is missing is `competitive-teardown`. This skill tests one brand's claims against named competitors.

## Why This Layer Exists

The first pass of Layers 1-4 produces positioning built from the brand's own tensions and evidence. But positioning doesn't exist in isolation — it exists relative to competitors. This layer pressure-tests whether the Brandprint outputs survive contact with real competitor messaging.

**The pattern this skill catches:** A brand runs the full Brandprint chain, produces strong outputs — then discovers their tagline, platform word, or mantra collides with an entrenched competitor. The ESOP story that felt unique turns out to overlap with a competitor's "family culture" narrative. The geographic claim that felt ownable is already owned by someone with 5x the revenue. This skill catches those collisions before they ship.

## Chain Position

This is **Layer 5** of the Brandprint research stack:

1. **Core Human Truth** (Layer 1) → foundational truth sentence
2. **Brandprint Tier-A** (Layer 2) → 10 strategy elements
3. **Brandprint Tier-B** (Layer 3) → 5 actionable elements
4. **Brandprint Tier-C** (Layer 4) → 4 stylistic elements
5. **Competitive Positioning Audit** (this skill) → validates differentiation; triggers refinement if needed
6. **Brand Strategy Report** (Layer 6) → compiles all layers into consulting-grade deliverable

**When Layer 4 has just completed:** Import all Tier-A, B, and C outputs. Run the full audit against the competitive landscape already identified in Tier-A Sprint 4, plus any additional competitors the user names.

**When running standalone:** Resolve all variables with the user. Requires at minimum: the brand's current positioning claims (tagline, platform word, key messages) and at least one named competitor to test against.

**After this skill completes:** If vulnerability scores are LOW (positioning is differentiated), proceed to Layer 6 (Report Compiler). If vulnerability scores are HIGH (positioning collides), recommend a **second-pass refinement** — re-running Layers 1-4 with the audit findings as additional context. The second pass typically produces dramatically sharper positioning.

## Variables to Resolve

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `brand_name` | The brand being audited | *required* |
| `brand_claims` | Current tagline, platform word, key messages, mantra | *required* (or from Layers 1-4) |
| `competitors` | Named competitors to test against (min 1, ideally 3-5) | *required* |
| `competitor_sources` | URLs, copy, or descriptions of competitor positioning | User provides or research |
| `category` | Industry or category | *required* (or from Layer 2) |
| `audience` | Primary audience definition | *required* (or from Layer 2) |
| `region_context` | Geography or cultural context | US / English-speaking |
| `mode` | `rapid`, `standard`, or `enterprise` | `standard` |

## Principles (Non-Negotiable)

1. **Buyer perception over brand intention.** It doesn't matter what you meant — it matters what buyers hear when they see your claims next to a competitor's.
2. **Quantify overlap.** Semantic collision is measurable. Score it, don't hand-wave.
3. **Attack your own positioning.** This is adversarial by design. The goal is to find weaknesses before the market does.
4. **Entrenched beats clever.** If a competitor already owns a positioning territory with more budget, more history, and more share-of-voice, clever messaging won't unseat them. Find open territory instead.
5. **Structure vs. message.** Structural advantages (ESOP, patents, network effects) are real moats. Messages about structural advantages may not be — if buyers don't understand or care about the structure, the message fails even if the advantage is real.

## Evidence & Citation Policy

Same as Layers 1-4: title, publisher, URL, dates, one-line evidence note. For competitor claims, cite the specific URL or document where the claim appears. Screenshot or quote the exact language — paraphrasing competitor copy introduces bias.

## Workflow

### Phase 1: Forensic Collection

**Goal:** Capture the exact positioning language from both the brand and all named competitors.

Actions:
- **Brand claims inventory:** Extract every positioning claim from the Brandprint outputs (or user-provided materials). Catalog: tagline, platform word, mantra, translation line, key phrases, tone adjectives, moat claims, sector claims, geographic claims, culture claims.
- **Competitor claims inventory:** For each named competitor, extract the same categories from their website, LinkedIn, proposals, press releases, job postings, and any other public materials. Capture exact language — do not paraphrase.
- **Claim taxonomy:** Organize all claims into categories: Geographic identity, Culture/people, Sector expertise, Scale/capability, Technology, Values/mission, Process/methodology, Price/value, Relationships, Heritage/history.

Outputs: `brand_claims_inventory`, `competitor_claims_inventories`, `claim_taxonomy`

---

### Phase 2: Collision Analysis

**Goal:** Quantify where the brand's positioning overlaps with competitors.

Actions:
- **Collision matrix:** For each brand claim, score differentiation against each competitor on a 0-10 scale:
  - 0-2: Direct collision (same territory, same language)
  - 3-4: Semantic neighbor (different words, same idea)
  - 5-6: Adjacent (related territory, clear difference exists but requires explanation)
  - 7-8: Distinct (clearly different positioning territory)
  - 9-10: Orthogonal (completely different axis, no overlap)
- **Vocabulary overlap score:** Calculate % of shared significant words between brand and each competitor's positioning copy (excluding articles, prepositions). Target: <30% for differentiation.
- **Territory ownership assessment:** For each positioning territory (geographic, culture, sector, etc.), determine who currently owns it based on: time invested, budget deployed, market share, share-of-voice, and buyer associations.
- **Revenue asymmetry check:** Compare brand revenue/size to each competitor. If a competitor is 5x+ larger and occupies the same territory, the brand reads as follower regardless of message quality.

**Scoring:**
- Average collision score <4 across primary competitor = CRITICAL vulnerability
- Vocabulary overlap >40% = HIGH vulnerability
- Competing for territory owned by 5x+ larger player = HIGH vulnerability

Outputs: `collision_matrix`, `vocabulary_overlap_scores`, `territory_ownership_map`, `revenue_asymmetry_notes`, `vulnerability_score`

---

### Phase 3: Buyer Perception Modeling

**Goal:** Model how buyers experience the brand vs. competitors — not how the brand intends to be experienced.

Actions:
- **Side-by-side comprehension test (modeled):** Present brand and competitor positioning cards side by side. For each pair, answer: "If a buyer saw both of these in the same RFP shortlist, could they articulate a clear difference in under 10 seconds?" Score: Clear / Vague / Indistinguishable.
- **ESOP/structure education test:** If the brand's differentiation relies on a structural advantage (ESOP, proprietary process, etc.), assess: Does the audience already understand this structure? If not, how many seconds/words of explanation are required before the advantage registers? If >15 seconds, the advantage is real but the message may fail.
- **Core Human Truth collision test:** Does the brand's Core Human Truth apply equally to competitors? If yes, differentiation must come from the solution mechanism, not the truth itself. Identify which competitor has the stronger solution narrative for the same truth.
- **Emotional resonance ranking:** Rank brand and competitors on: Instant clarity, Emotional impact, Memorability, Credibility, Specificity. Note where brand ranks #1 vs. where it trails.

Outputs: `comprehension_test_results`, `structure_education_assessment`, `truth_collision_analysis`, `emotional_resonance_ranking`

---

### Phase 4: Repositioning Paths

**Goal:** If vulnerabilities are confirmed, model alternative positioning paths.

Actions:
- Generate 3-5 repositioning paths, each defined by:
  - **Territory:** What positioning territory does this path claim?
  - **Attack vector:** Which competitor vulnerability does it exploit?
  - **Buyer segment:** Which segment does it win?
  - **Proof required:** What evidence is needed to defend this position?
  - **Risk:** What could go wrong?
  - **Collision score:** How differentiated is this path from all competitors?
- For each path, draft a revised tagline, platform word, and key message to illustrate the shift.
- **Path evaluation matrix:** Score each path on: Differentiation (vs. all competitors), Defensibility (can competitors copy this?), Audience resonance (does the target segment care?), Proof availability (does evidence already exist?), Migration cost (how much existing positioning is abandoned?).
- **Recommended path:** Select the path with the highest combined score. Explain why. Note what must change in Layers 1-4 if this path is adopted.

Outputs: `repositioning_paths`, `path_evaluation_matrix`, `recommended_path`, `migration_notes`

---

### Phase 5: Second-Pass Decision

**Goal:** Determine whether the Brandprint needs a second pass through Layers 1-4.

Actions:
- **Threshold check:** If overall vulnerability score is CRITICAL or HIGH, recommend a second-pass refinement.
- **Context package:** If second pass is recommended, assemble a context package containing: all audit findings, the recommended repositioning path, specific competitor claims to differentiate against, and revised constraints for each layer.
- **Skip conditions:** If vulnerability score is LOW or MODERATE, the current Brandprint holds. Proceed to Layer 6 (Report Compiler) with audit findings included as a competitive analysis section.

Decision outputs:
- `PROCEED` → Current positioning is differentiated. Move to Layer 6.
- `REFINE` → Re-run Layers 1-4 with audit context. The second pass should produce dramatically sharper positioning because the competitive landscape is now a constraint, not an afterthought.

Outputs: `decision`, `context_package_for_second_pass` (if REFINE), `competitive_analysis_section` (if PROCEED)

## Mode Adjustments

- **Rapid:** Phases 1-2 only. Collision matrix + vocabulary overlap. Quick differentiation score. Skip buyer modeling and repositioning paths.
- **Standard:** Full Phases 1-5. Complete audit with repositioning recommendations.
- **Enterprise:** Add: historical positioning timeline (who claimed territory first), share-of-voice estimation, buyer interview protocol design for live validation, and competitive monitoring plan for ongoing defense.

## Heuristics

- If the first word of the brand's tagline also appears in a competitor's tagline, that's a collision regardless of context.
- Revenue asymmetry matters more than message quality. A $50M company cannot out-position a $500M company on the same territory.
- Structural advantages (ESOP, patents, proprietary tech) are only differentiators if buyers understand them without explanation. If explanation is required, lead with the outcome the structure produces, not the structure itself.
- "Texas builder" is an identity claim. "Builds exclusively in Texas" is a fact claim. Fact claims are defensible; identity claims are contestable.
- When two brands share the same Core Human Truth, the one with more visible proof wins. More visible, not more proof — perception beats evidence.

## What NOT to Do

- Do not soften collision scores to protect the brand's feelings. This is adversarial testing.
- Do not compare brand aspirations to competitor realities. Compare reality to reality.
- Do not assume buyers understand structural advantages (ESOP, B-Corp, proprietary process) without evidence that they do.
- Do not recommend repositioning that abandons proven strengths. The goal is to find adjacent open territory, not to start over.
- Do not fabricate buyer perception data. Model it from evidence; flag it as modeled, not measured.

## Output Format

Deliver as structured JSON including: `brand_name`, `competitors_audited`, `collision_matrix`, `vocabulary_overlap_scores`, `vulnerability_score`, `territory_ownership_map`, `repositioning_paths`, `recommended_path`, `decision` (PROCEED or REFINE), `context_package` (if REFINE), `sources`, `audit_log`.

**Forward chaining:**
- If decision = `PROCEED`: Pass `competitive_analysis_section` to Layer 6 (Brand Strategy Report Compiler).
- If decision = `REFINE`: Pass `context_package_for_second_pass` back to Layer 1. The user should re-run Layers 1-4 with this context baked into the constraints and variables. The second pass will produce a refined Brandprint that is competitive-aware from the start.

## Evaluation Rubric

1. **Honesty** — Collision scores reflect reality, not brand preference
2. **Specificity** — Exact competitor language is cited, not paraphrased
3. **Quantification** — Overlap is scored numerically, not described vaguely
4. **Actionability** — Repositioning paths are specific enough to execute
5. **Traceability** — Every vulnerability links to specific competing claims
6. **Decision clarity** — PROCEED or REFINE is unambiguous with clear rationale

## File I/O Contract (orchestrated mode)

When an authorized orchestrator provides explicit paths, honor them exactly:

- **Seed inputs:** read ONLY the JSON/YAML files listed in the dispatch prompt.
- **Output:** write the final JSON object to the exact path given (under
  `.brandprint/engagements/{slug}/pass-N/`). No other location.
- **Return value:** your final message is the output path plus the layer's key
  artifact — not the full JSON. The orchestrator reads files, not transcripts.

When invoked as a direct skill call, present the JSON in conversation or through the supported file workflow and tell the user to preserve it for the next layer.
