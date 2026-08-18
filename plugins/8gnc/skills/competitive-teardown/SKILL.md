---
name: competitive-teardown
description: >-
  Use when the goal is category-level disruption analysis: finding structural
  gaps and white space across an entire category or platform, not brand-vs-brand
  positioning comparison. Triggers on "teardown," "competitive analysis,"
  "SCAMPER analysis," "platform analysis," "gap analysis," "what are competitors
  missing," "find the white space," "category disruption," "what's unoccupied,"
  or "where's the open quadrant." This is structurally different from
  competitive-positioning-audit, which tests one brand's claims against named
  competitors, and from general SCAMPER ideation, which treats a single item.
---

# Competitive Teardown — Category SCAMPER Protocol

Reveal structural gaps in a category by mapping all major players into a feature/value matrix, running SCAMPER across the entire matrix (not on a single brand), identifying what no one is doing, and building concepts that exploit those empty quadrants.

## When NOT to Use

- **Brand-vs-brand positioning validation.** Testing one brand's claims against named competitors is `competitive-positioning-audit`. This skill's unit of analysis is the category matrix, not a brand.
- **Single-item ideation.** Applying SCAMPER to one product or campaign is general creative ideation — no matrix required.
- **Fewer than ~5 meaningful players in the category.** With 2-3 players there are no convergence clusters to read; shared assumptions can't be distinguished from coincidence.

## Why This Skill Exists

Standard competitive analysis asks: "How are we different from competitors?" That question assumes the right category exists and the right dimensions of differentiation are already visible. It produces incremental positioning.

This skill asks a different question: "What is the entire category structurally incapable of doing?" That question exposes the gaps baked into the category's shared assumptions — the white space that every player is simultaneously missing because they're all operating inside the same mental model.

The pattern: map the category matrix first, SCAMPER the matrix as a whole, find the structural absence, build into the absence.

**What this is not:**
- Not brand-vs-brand collision scoring — that's the competitive-positioning-audit
- Not single-item ideation with SCAMPER as one of ten methods — that's general creative ideation
- Not a vulnerability audit of existing positioning — that's the competitive-positioning-audit

This skill is category-level structural analysis. The output is opportunity concepts, not positioning refinements.

## Chain Position

This skill operates as a standalone research sprint OR feeds upstream/downstream within the Brandprint Engine:

**Upstream inputs:**
- Competitive Positioning Audit gap findings — teardown the gap further
- Brandprint Tier-A Sprint 4 (Competitive Landscape) — expand into full teardown

**Downstream outputs:**
- Competitive Positioning Audit — teardown findings replace or extend the Competitive Matrix
- Brand strategy layers — concepts from gap identification inform content strategy and positioning
- If a concept is chosen, validate its positioning differentiation before launch

## Variables to Resolve

Before starting, confirm these with the user or extract from prior skill outputs:

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `category` | The category or platform being torn down | *required* |
| `client_name` | The brand or client using this analysis | *required* |
| `client_context` | What they do, what they're capable of, their resources/constraints | *required* |
| `players` | Named competitors to include (3-7 preferred) | User provides or research |
| `teardown_lens` | What angle to attack (features, pricing, audience, channel, business model, content, UX) | All lenses |
| `concept_count` | How many concepts to develop from gap findings | 2-3 |
| `mode` | `rapid`, `standard`, or `enterprise` | `standard` |
| `output_format` | `report`, `slide-ready bullets`, or `JSON` | `report` |

If the user doesn't provide players, research or name the most visible 3-7 players in the stated category before proceeding.

---

## Step 1: Category Map

**Goal:** Build a shared-assumption matrix across all players. Make the invisible visible.

### Actions

**1a. Player identification**
List 3-7 players. Include: the market leader, one challenger, one niche player, and (if applicable) one platform or aggregator that shapes behavior across the category. Do not include the client — they are the disruptor, not the benchmark.

**1b. Feature/value inventory**
For each player, inventory across these dimensions:
- **Core offer:** What is the primary product/service?
- **Primary value prop:** What problem do they claim to solve?
- **Target audience:** Who is it explicitly for?
- **Pricing model:** How is value captured?
- **Key differentiator:** What do they say makes them unique?
- **Distribution/channel:** How does the product reach buyers?
- **Content/media presence:** How do they build awareness?
- **Proof mechanism:** How do they demonstrate credibility (case studies, reviews, certifications, press)?
- **Onboarding/UX:** How do buyers get started?
- **Retention model:** What keeps buyers from leaving?

**1c. Category Matrix**
Render the inventory as a matrix:

```
| Dimension         | Player A | Player B | Player C | Player D | Player E |
|-------------------|----------|----------|----------|----------|----------|
| Core offer        |          |          |          |          |          |
| Value prop        |          |          |          |          |          |
| Target audience   |          |          |          |          |          |
| Pricing model     |          |          |          |          |          |
| Differentiator    |          |          |          |          |          |
| Channel           |          |          |          |          |          |
| Content/media     |          |          |          |          |          |
| Proof mechanism   |          |          |          |          |          |
| Onboarding/UX     |          |          |          |          |          |
| Retention model   |          |          |          |          |          |
```

**1d. Cluster identification**
After building the matrix, identify where players cluster. Which dimensions show near-identical approaches across most or all players? These clusters represent shared category assumptions — the places where disruption is most available.

Label each cluster: `HIGH CONVERGENCE` (4+ players similar) / `MODERATE CONVERGENCE` (2-3 players similar) / `DIVERGENCE` (meaningful variation exists).

Output: `category_matrix`, `cluster_map`

---

## Step 2: SCAMPER Pass — Across the Matrix

**Goal:** Apply each SCAMPER lens not to one brand but to the category matrix as a whole. The question for each lens is: "What does this lens reveal that NO player in this matrix is doing?"

This is the core distinction of this skill. SCAMPER is not applied to a single product. It is applied to the shared patterns revealed in Step 1. Each lens interrogates the category's collective blind spots.

### The Seven Lenses

**S — Substitute**
What element that every player uses could be replaced with something fundamentally different?
- What ingredient/component/mechanism do all players share that could be swapped?
- What assumption about delivery, format, or medium is universal in this category?
- Prompt: "What if the [universal mechanism] were replaced entirely by [alternative]?"

**C — Combine**
What two things that exist in the category have never been combined — or what is this category refusing to combine with an adjacent category?
- Which player capabilities exist in isolation that would be powerful together?
- What does an adjacent category do that this category has never absorbed?
- Prompt: "What if [capability A] and [capability B] operated as a single unified experience?"

**A — Adapt**
What model from a different industry could be adapted to this category, and why hasn't it been?
- What does SaaS do that services categories haven't adopted? What does media do that product categories resist?
- What subscription, community, or platform mechanic exists elsewhere but is absent here?
- Prompt: "What would this category look like if it were built like [other industry model]?"

**M — Modify / Magnify / Minimize**
What dimension is everyone treating as fixed that could be radically scaled up or stripped down?
- What do all players treat as a necessary cost or complexity that could be eliminated?
- What do all players under-invest in that buyers actually care deeply about?
- Prompt: "What if [shared element] were 10x more of it — or removed entirely?"

**P — Put to Other Uses**
What assets, data, or outputs in this category are being used narrowly when they could serve a much broader function?
- What do players produce as a byproduct that buyers or other markets would value independently?
- What audience does this category serve that could be served through a completely different use case?
- Prompt: "What else could [category output] do? Who else could use it differently?"

**E — Eliminate**
What does every player include that buyers don't actually want — or what friction exists across the board that could be removed entirely?
- What is the category's universal cost, complexity, or barrier that persists out of inertia?
- What do all onboarding flows or sales processes include that could be cut?
- Prompt: "What would the category look like if [universal element] were gone?"

**R — Reverse / Rearrange**
What sequence, relationship, or structure does every player share that could be inverted?
- Who is the customer and who is the provider — could those roles flip?
- What comes first in every buyer journey that could come last?
- What is the standard business model structure — could it be inverted (pay on outcome, community before product, etc.)?
- Prompt: "What if [universal sequence or structure] ran backwards — or inside out?"

### SCAMPER Output Format

For each lens, produce:
1. **Category pattern:** What the matrix shows every player doing (or not doing) on this dimension
2. **SCAMPER finding:** What the lens reveals as available or absent
3. **Raw concepts:** 2-4 rough concepts suggested by this finding (unfiltered, no feasibility judgment yet)
4. **Convergence connection:** Which cluster from Step 1 does this finding attack?

Output: `scamper_findings` (7 sections, one per lens)

---

## Step 3: Gap Identification

**Goal:** Synthesize SCAMPER findings into a structured gap map. Identify which empty quadrants are most structurally significant.

### Actions

**3a. Gap inventory**
From the 7 SCAMPER passes, list every identified gap. A gap is valid when:
- No player in the matrix occupies it (confirmed by the matrix, not assumed)
- It addresses a real buyer need (not just structural novelty)
- It is not absent because it is technically impossible or legally prohibited

**3b. Gap classification**

Classify each gap by type:
- **Audience gap** — a buyer segment that no player serves well
- **Value prop gap** — a problem no player is solving, or solving backwards
- **Delivery gap** — a distribution or channel no player uses
- **Experience gap** — a UX or journey no player offers
- **Business model gap** — a pricing or retention structure no player has deployed
- **Content/media gap** — an awareness or trust-building approach no player has claimed

**3c. Gap map**
Render the top gaps in priority order. Score each on:
- **Size:** How large is the opportunity? (Small / Medium / Large)
- **Vacancy:** How empty is this quadrant? Is anyone approaching it? (Empty / Nearly empty / Emerging)
- **Defensibility:** Once occupied, how hard is it to copy? (Low / Medium / High)
- **Buyer signal:** Is there evidence buyers want this — search behavior, complaints, workarounds they use? (Weak / Moderate / Strong)

```
| Gap | Type | Size | Vacancy | Defensibility | Buyer Signal | Priority |
|-----|------|------|---------|---------------|--------------|----------|
|     |      |      |         |               |              |          |
```

Output: `gap_inventory`, `gap_map`

---

## Step 4: Concept Development

**Goal:** Build 2-3 concrete concepts that exploit the highest-priority gaps. These are strategic concepts, not final brand names or complete strategies.

### Concept Structure

For each concept, produce:

**Concept Name:** A working title (functional, not brand-ready)

**Gap Exploited:** Which gap(s) from Step 3 does this concept occupy?

**Core Mechanic:** In one sentence — what does this concept actually do differently from every player in the matrix?

**Value Proposition Draft:** What does a buyer gain that they cannot get from any current player?

**Target Audience:** Who is the primary buyer this concept is built for? Be specific — not "SMBs" but "operations leads at 10-50 person agencies who are buying for the first time."

**Category Disruption Thesis:** Why does this concept, if executed well, change the category — not just win a segment?

**Rough Business Model:** How does value get captured? What pricing or retention mechanic matches the gap?

**Evidence the gap is real:** What buyer behavior, complaint pattern, search data, workaround, or adjacent-category adoption supports this gap's existence?

**Risks:** What could kill this concept? (Market timing, category education cost, technical barrier, incumbent response)

Output: `concepts` (array of 2-3)

---

## Step 5: Feasibility Filter

**Goal:** Match concepts to the client's actual capabilities. Eliminate concepts the client cannot execute. Rank surviving concepts.

### Filter Criteria

For each concept, score against the client's context (`client_context` variable):

| Criterion | Question | Score |
|-----------|----------|-------|
| **Resources** | Can the client fund the build and go-to-market? | 1-5 |
| **Timeline** | Can the client reach market before the window closes? | 1-5 |
| **Positioning fit** | Does this concept align with or extend the client's existing brand equity? | 1-5 |
| **Proof availability** | Does the client already have evidence/credentials that support this concept? | 1-5 |
| **Distribution access** | Does the client have or can they build the channel this concept requires? | 1-5 |

**Scoring:**
- 21-25: Greenlight — client is positioned to execute
- 15-20: Conditional — execute with noted constraints
- Below 15: Deprioritize — not wrong, just not right for this client now

### Feasibility Output

For each concept: feasibility score, key constraint, and whether the constraint is surmountable within 90 days.

Rank concepts: Concept 1 (highest feasibility + highest gap priority), Concept 2, Concept 3.

Output: `feasibility_scores`, `ranked_concepts`

---

## Mode Adjustments

**Rapid:** Steps 1-3 only. Deliver the gap map and name the top concept. No full concept development or feasibility scoring. Use when the client needs a quick competitive read before a pitch or kickoff.

**Standard:** Full Steps 1-5. Complete teardown with 2-3 developed concepts and feasibility ranking. Core deliverable for strategy engagements.

**Enterprise:** Add to Standard:
- Extended player set (up to 10 players)
- Historical category trajectory (how the category has evolved over 5 years and where momentum is pointing)
- Adjacent category scan (what 2-3 adjacent categories are doing that this category has not absorbed)
- Buyer interview protocol (5 questions to validate gaps with real buyers before concept investment)
- Monitoring brief (what signals to watch that would indicate a competitor is moving into identified gaps)

---

## Output Format

Deliver as a **Competitive Teardown Report** with these sections:

---

### Competitive Teardown Report: [Category]
**Prepared for:** [Client Name]
**Date:** [Date]

**Category Analyzed:** [Category]
**Players Mapped:** [List]

---

#### 1. Category Matrix
[Full matrix from Step 1]

**Cluster Summary:**
- HIGH CONVERGENCE dimensions: [list]
- Key shared assumptions: [2-3 sentences on what the category universally believes]

---

#### 2. SCAMPER Findings
[Seven sections, one per lens — pattern, finding, raw concepts, convergence connection]

---

#### 3. Gap Map
[Gap classification table + narrative on the top 2-3 gaps]

---

#### 4. Concepts
[Full concept write-up for each, structured per Step 4 format]

---

#### 5. Feasibility Rankings
[Scored table + recommendation]

**Recommended starting point:** [Concept name] — [One-sentence rationale tying gap priority to client feasibility]

---

#### 6. Next Steps
- If pursuing a concept: feed gap findings into the Competitive Positioning Audit as pre-built competitive matrix
- If developing brand strategy next: use gap findings to constrain Tier-A Sprint 4 and sharpen differentiation requirements
- If scoping an engagement: gap findings inform content strategy and positioning layers
- Before finalizing positioning: validate chosen concept with the Competitive Positioning Audit

---

## What NOT to Do

- Do not apply SCAMPER to a single player's features. The lens always runs across the full matrix.
- Do not confuse a gap with a niche. A gap is structurally absent from the category. A niche is served — just by fewer players.
- Do not develop concepts before the gap map. Concept first is invention. Gap map first is strategy.
- Do not score feasibility before concepts are fully formed. Premature feasibility filtering kills the most interesting ideas.
- Do not include the client in the category matrix. They are the disruptor — benchmarking them as a peer produces incremental thinking.
- Do not skip the buyer signal check in Step 3. A structural gap with no buyer signal is an academic exercise.
- Do not paraphrase player positioning when filling the matrix. Loose summaries make convergence calls guesses — capture what each player actually says and does.
- Do not read DIVERGENCE dimensions as gaps. Variation means the category has already explored that axis; gaps live where the matrix is uniformly empty.
- Do not run the feasibility filter against a generic client. If `client_context` is thin, ask — scoring concepts against an imagined SMB produces rankings nobody can act on.

## Evaluation Rubric

1. **Matrix completeness** — Does the category map include the real players and all relevant dimensions?
2. **SCAMPER discipline** — Are lenses applied to the matrix as a whole, or did the skill revert to single-item ideation?
3. **Gap validity** — Are gaps confirmed empty by the matrix, or assumed?
4. **Concept specificity** — Are concepts specific enough to act on, or too abstract to execute?
5. **Feasibility honesty** — Does the filter reflect the client's actual constraints, not aspirational ones?
6. **Next steps clarity** — Are downstream recommendations specific and actionable?
