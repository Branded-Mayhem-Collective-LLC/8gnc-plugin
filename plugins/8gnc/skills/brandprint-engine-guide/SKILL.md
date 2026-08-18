---
name: brandprint-engine-guide
description: Use when starting a new Brandprint engagement, when a user needs instructions on how to use the skill package, or when the user asks "how do I run Brandprint," "what order do I use these skills," or "where do I start" with the Brand Strategy Engine. Orientation skill for the six-layer Brandprint chain and its two-pass workflow.
---

# Brandprint Engine — Runner Guide

This guide walks through the complete Brandprint Engine workflow and produces a structured Brand Strategy and Competitive Positioning Report.

## When NOT to Use

- **Running an individual layer.** Invoke that layer's skill directly (`core-human-truth`, `brandprint-tier-a`, etc.) — this guide orients and sequences, it doesn't execute.
- **As a substitute for the layer skills.** The workflows, gates, and output schemas live in each layer's SKILL.md. This file tells you the order and the prompts, nothing more.

## What You Get

The Brandprint Engine is a chain of 6 skills that run in sequence. Each layer feeds the next:

```
Layer 1: Core Human Truth ─── foundational insight (1 sentence)
    │
    ▼
Layer 2: Brandprint Tier-A ── 10 strategy elements with evidence
    │
    ▼
Layer 3: Brandprint Tier-B ── 5 actionable elements with proxy tests
    │
    ▼
Layer 4: Brandprint Tier-C ── 4 stylistic elements ready to deploy
    │
    ▼
Layer 5: Competitive Audit ── validates differentiation vs. competitors
    │
    ├── If REFINE → re-run Layers 1-4 with competitive context (second pass)
    │
    └── If PROCEED ──▼
                      │
Layer 6: Report Compiler ─── 25-35 page consulting-grade deliverable
```

## How to Run It

Run the layer-by-layer chain below. In Codex with local file access, save each layer's JSON to a user-approved workspace directory such as `.8gnc/brandprint/{slug}/`. In ChatGPT without local file access, return each artifact in the conversation or as a downloadable file and ask the user to preserve it before the next layer.

This OpenAI package does not include the legacy provider-specific slash-command pipeline or its hooks. Do not refer users to those commands from this bundle.

## Prerequisites

- An installed 8gnc plugin in ChatGPT or Codex
- Current web research access for evidence-dependent layers
- **Python 3.9+** for optional local validation helpers in Codex
- **Optional:** weasyprint (`pip install weasyprint`) for PDF output
- **Optional:** [search-cli](https://github.com/199-biotechnologies/search-cli) for enhanced multi-provider search on local execution surfaces

## Installation Check

This guide is installed as part of the `8gnc` plugin. Ask the model to list the available Brandprint skills. Confirm that `deep-research`, the six strategy layers, this guide, `brand-revival`, and `competitive-teardown` are available before starting the full chain.

---

## The Two-Pass Workflow

This is the most important thing to understand. **The Brandprint Engine is designed to run twice.**

### First Pass (Layers 1-4): Raw Positioning

The first pass builds positioning from the brand's own tensions, evidence, and market reality. It produces good output — but it hasn't been tested against competitors yet.

### The Competitive Gate (Layer 5): Reality Check

Layer 5 takes the first-pass outputs and stress-tests them against named competitors. It answers the question: "If a buyer saw our positioning next to [competitor], could they tell us apart in 10 seconds?"

Two outcomes:
- **PROCEED** — Your positioning is differentiated. Move to Layer 6.
- **REFINE** — Your positioning collides with a competitor. Re-run Layers 1-4 with the competitive context baked in.

### Second Pass (Layers 1-4 again): Sharp Positioning

The second pass is where the magic happens. Now the skills have competitive context as a constraint — they know which territories are occupied, which claims collide, and where open space exists. The output is dramatically sharper.

**Example from a real engagement:**
- First pass produced: "We build Texas. Our crews own it." (collides with Rogers-O'Brien's "Texas' Premier Builder")
- Competitive audit exposed: 40%+ vocabulary overlap, follower positioning on Texas identity
- Second pass produced: "Complexity-first builder" positioning + "Same Team, Every Project" mantra + "Certainty" as platform word (zero competitor overlap)

The second pass took the same brand from "we sound like everyone else" to "we own a category no one else claims."

---

## Layer-by-Layer Chain

### Step 1: Gather Your Inputs

Before you start, collect:

| Input | What You Need | Where to Find It |
|-------|--------------|-------------------|
| Brand name | The company/product | Client brief |
| Audience | Who buys from them | Client brief, sales team |
| Region | Geographic market | Client brief |
| Category | Industry/sector | Obvious from context |
| Competitors | 3-5 named competitors | Client brief, industry knowledge, or ask |
| Competitor URLs | Their websites, LinkedIn | Web search |
| Constraints | Legal limits, brand safety | Client brief |

### Step 2: Run Layer 1 — Core Human Truth

**Prompt:**
```
Run the core-human-truth skill for [BRAND NAME].

Topic: [what they do]
Audience: [who buys from them]
Region: [geographic market]
Mode: standard

Use the deep-research skill in Standard mode to gather evidence.
```

**What happens:** The deep research engine launches 5-10 parallel searches across academic sources, industry data, forums, and reviews. Sources are triangulated, credibility-scored, and synthesized. The Core Human Truth skill then distills findings into a single validated sentence (max 25 words) capturing the foundational tension buyers feel.

**Output:** Core Human Truth sentence, tension ladder, buyer archetypes, lexicon, source bibliography.

**Duration:** 15-25 minutes with deep research in Standard mode.

**Checkpoint:** Read the Core Human Truth sentence. Does it feel true? Does it capture tension the audience recognizes but rarely articulates? If yes, proceed. If it feels generic, provide additional context and re-run.

### Step 3: Run Layers 2-4 — Brandprint Tiers A, B, C

These should chain automatically. If they don't auto-chain, prompt each one:

**Tier-A prompt (if needed):**
```
Run brandprint-tier-a for [BRAND NAME], using the Core Human Truth output as seed.
```

**Tier-B prompt (if needed):**
```
Run brandprint-tier-b for [BRAND NAME], using the Tier-A output as seed.
```

**Tier-C prompt (if needed):**
```
Run brandprint-tier-c for [BRAND NAME], using the Tier-A and Tier-B outputs as seeds.
```

**Output after all three:** 10 strategy elements + 5 actionable elements + 4 stylistic elements = complete Brandprint.

**Duration:** 30-60 minutes total for all three tiers.

**Checkpoint:** Review the tagline, platform word, and mantra. Do they feel differentiated? Or could a competitor claim the same things? If you're unsure, that's exactly what Layer 5 is for.

### Step 4: Run Layer 5 — Competitive Positioning Audit

This is where most people skip — and it's where the most value lives.

**Prompt:**
```
Run the competitive-positioning-audit for [BRAND NAME].

Competitors:
1. [Competitor 1] — [their website URL]
2. [Competitor 2] — [their website URL]
3. [Competitor 3] — [their website URL]

Use the Brandprint outputs from Layers 1-4 as the brand claims to test.
```

**Pro tip:** If you have the competitor's actual website copy, paste it directly. The more exact the competitor language, the sharper the collision analysis.

**Output:** Collision matrix, vulnerability scores, repositioning paths, PROCEED/REFINE decision.

**Duration:** 15-30 minutes.

**The critical decision:**

If the audit returns **PROCEED** — your positioning is differentiated. Skip to Step 6.

If the audit returns **REFINE** — go to Step 5.

### Step 5: Second Pass (Only If REFINE)

Re-run Layers 1-4, but this time include the competitive context:

**Prompt:**
```
Re-run the core-human-truth skill for [BRAND NAME] with additional competitive context:

[Paste the context package from Layer 5 here]

The first-pass positioning collided with [competitor names]. Key collisions:
- [list the specific collisions from the audit]

Constraints: The new positioning must NOT occupy these territories:
- [list competitor-owned territories]

The recommended repositioning path from the audit is: [paste recommended path]
```

Then chain through Tier-A, B, C again with the same competitive constraints.

**What changes:** Everything gets sharper. The Core Human Truth narrows to a tension only your brand can resolve. The platform word avoids competitor vocabulary. The tagline claims open territory instead of contested ground.

**After the second pass:** Run Layer 5 again to confirm PROCEED. If it still says REFINE, you may need to narrow the niche further or provide more competitive intelligence.

### Step 6: Run Layer 6 — Report Compiler

**Prompt:**
```
Run the brand-strategy-compiler to create the final report.

Brand: [BRAND NAME]
Client: [CLIENT NAME]
Prepared by: [YOUR FIRM NAME]
Date: [MONTH YEAR]
Confidentiality: Confidential
Include financials: yes
Include roadmap: yes
Format: narrative

Use all outputs from Layers 1-5 (or the second-pass versions if applicable).
```

**Output:** A 25-35 page Brand Strategy & Competitive Positioning Report with:
- Executive summary
- Market context
- Core Human Truth with buyer psychology
- Competitive landscape with white space map
- Target segments with buyer archetypes
- Brand architecture (equity ladder, platform word, mantra, tagline system)
- Competitive moat analysis
- Signature offers mapped to growth sectors
- Brand activation system with touchpoint map
- Strategic guardrails and brand protection
- Implementation roadmap (4 phases, 24 months)
- Source bibliography

**Duration:** 20-40 minutes.

---

## Tips for Best Results

### Use the Deep Research Engine
Layers 1, 2, and 5 are powered by the included deep research engine. Choose research depth based on the engagement:
- **Standard mode** — good for most engagements (15+ sources per layer, 5-10 min)
- **Deep mode** — recommended for competitive audits (25+ sources, 10-20 min)
- **UltraDeep mode** — comprehensive category reviews (30+ sources, 20-45 min)

The engine handles parallel search, credibility scoring, triangulation, and citation verification automatically. For enhanced search, install [search-cli](https://github.com/199-biotechnologies/search-cli) — it aggregates Brave, Serper, Exa, Jina, and Firecrawl.

### Feed Real Competitor Copy
Don't just name competitors — paste their actual website copy, LinkedIn About sections, and taglines into Layer 5. The collision analysis is only as good as the competitor data it receives.

### Don't Skip the Second Pass
The first pass is necessary. The second pass is where the value lives. If Layer 5 says REFINE, run the second pass. Every engagement where we've run the second pass has produced dramatically better positioning than the first pass alone.

### Provide Industry Context
The more context you provide about the brand's industry, the better the research. Client briefs, stakeholder meeting notes, sales deck PDFs, and competitor RFPs all improve output quality.

### Save Your Outputs
Each layer produces structured JSON. Save these files — they're the raw materials. If you need to re-run a single layer later (e.g., update the competitive audit after 6 months), you can feed the saved outputs back in without re-running the entire chain.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Workflow state is unclear | Inventory the saved layer artifacts and compare them with the required sequence above. Do not infer completion from filenames alone. |
| Lost track of an engagement | Summarize the completed layers, missing inputs, current gate, and next required artifact. |
| Skills don't auto-chain | Manually prompt each layer with "use the [previous layer] output as seed" |
| Current research is unavailable | Stop evidence-dependent claims or label them as hypotheses. Do not substitute model memory for current market evidence. |
| Competitive audit says PROCEED too easily | Add more competitors or paste their actual copy. Generic competitor names produce generic audits. |
| Report is too short | Set mode to `enterprise` or provide more context. The compiler needs rich layer outputs to produce a rich report. |
| Layer outputs feel generic | You probably need more specific audience and constraint inputs. "Business owners" is too broad. "VP of Construction at Texas multifamily developers who have completed 5+ projects" is specific. |

---

## What This Replaces

This skill chain replaces a traditional brand strategy engagement:

| Traditional | Brandprint Engine |
|------------|-------------------|
| 6-12 weeks | 2-4 hours |
| Consultant fees plus operator time | Model access plus operator review time |
| 3-5 stakeholder workshops | Text inputs + competitor URLs |
| 1 deliverable, no iteration | Unlimited re-runs with refined context |
| Static recommendations | Living system you can update quarterly |

Treat the output as a decision-support artifact, not automatic truth. Its quality depends on source quality, first-party inputs, operator judgment, and whether the competitive gate was run honestly.

---

## Package Contents

The 8gnc plugin includes `deep-research`, `core-human-truth`, Tiers A through C, `competitive-positioning-audit`, `brand-strategy-compiler`, `brand-revival`, `competitive-teardown`, and this guide.
