---
name: productprint-engine-guide
description: Use when starting a new Productprint engagement, when a buyer needs instructions on how to use the skill package, or when the user asks "how do I run the Productprint," "what order do I use these skills," or "where do I start" with the Product/Platform Strategy Engine. Orientation skill for the 6-layer Productprint chain (core-strategic-truth → productprint-tier-a → productprint-tier-b → productprint-tier-c → thesis-stress-test → strategy-thesis-compiler).
---

# Productprint Engine — Runner Guide

This guide walks through the complete Productprint Engine workflow and produces a structured Integrated Product Strategy Thesis.

## When NOT to Use

- **Running an individual layer.** Invoke that layer's skill directly (`core-strategic-truth`, `productprint-tier-a`, etc.) — this guide orients and sequences, it doesn't execute.
- **As a substitute for the layer skills.** The workflows, gates, and output schemas live in each layer's SKILL.md. This file tells you the order and the prompts, nothing more.

## What You Get

The Productprint Engine is a chain of 6 skills that run in sequence. Each layer feeds the next:

```
Layer 1: Core Strategic Truth ─── foundational tension sentence (1 sentence, max 25 words)
    │
    ▼
Layer 2: Productprint Tier-A ──── 10 Playing-to-Win cascade elements with evidence gates
    │
    ▼
Layer 3: Productprint Tier-B ──── 5 actionable elements: bets, roadmap, build/buy/partner,
    │                              prioritization model, risk register
    ▼
Layer 4: Productprint Tier-C ──── 4 deployable positioning artifacts: positioning statement,
    │                              product one-liner, bet narrative, strategy-on-a-page
    ▼
Layer 5: Thesis Stress-Test ───── extracts load-bearing assumptions; tries to FALSIFY them
    │
    ├── If REFINE → re-run Layers 1-4 with constraint package injected (second pass)
    │                (hard stop after 2 passes — surface to operator)
    └── If PROCEED ──▼
                      │
Layer 6: Strategy Thesis Compiler ── 20-40 page consulting-grade integrated strategy thesis
```

The domain-neutral skeleton these layers implement is specified in `CONTRACT.md`.

---

## Prerequisites

- An installed 8gnc plugin in ChatGPT or Codex
- Current web research access for evidence-dependent layers
- **Python 3.9+** for optional local research and validation helpers in Codex
- **Optional:** weasyprint (`pip install weasyprint`) for PDF output
- **Optional:** [search-cli](https://github.com/199-biotechnologies/search-cli) for enhanced multi-provider search on local execution surfaces

---

## Installation Check

This guide is installed as part of the `8gnc` plugin. Ask the model to list the available Productprint skills. Confirm that the six strategy layers, this guide, and the shared `deep-research` skill are available before starting the full chain.

---

## The Two-Pass Workflow

This is the most important thing to understand. **The Productprint Engine is designed to run twice.**

### First Pass (Layers 1-4): Raw Strategy

The first pass builds a strategy thesis from the product's own evidence: market tensions, JTBD outcomes, competitive capabilities, economic engine, and positioning artifacts. It produces good output — but the load-bearing assumptions have not been attacked yet.

### The Thesis Gate (Layer 5): Adversarial Pre-Mortem

Layer 5 is not a competitive vocabulary check. It is a **structured pre-mortem on the one assumption that, if false, collapses the entire strategy**. The gate asks: "What has to be true for this thesis to hold — and is it actually true?"

The gate extracts every assumption embedded in Layers 1-4, ranks them by fragility (how much of the strategy depends on each one × how hard it is to verify), and then tries to FALSIFY the highest-fragility assumption using disconfirmation queries. Counter-evidence is the success condition of this pass, not a failure.

Two outcomes:

- **PROCEED** — The load-bearing assumption survived a genuine attempt to break it. Move to Layer 6.
- **REFINE** — The falsification pass found a fact that breaks the assumption. The gate emits a constraint package (the broken assumption + what it changes + boundaries for the rebuild). Re-run Layers 1-4 with that package injected as a hard constraint.

### Second Pass (Layers 1-4 again): Truth-Hardened Strategy

The second pass is where the value lives. Now every layer knows the prior thesis broke on a specific assumption — they rebuild the cascade excluding that bet, finding the strategy that actually holds.

The loop is capped at 2 passes, then surfaced to the operator if still unresolved. A third pass almost always signals a positioning premise that needs external human judgment, not more research.

**Concrete example:**

- First-pass thesis rested on: "The category's enterprise incumbents cannot serve the mid-market segment because their implementation complexity creates a prohibitive switching cost floor."
- Falsification found: Salesforce Essentials had repriced to $25/user/mo and added a self-serve onboarding path in Q4 2024 — an incumbent already eliminated the switching-cost moat the thesis required.
- **REFINE** issued. Constraint package: "Do not build a strategy that relies on incumbent complexity as a durable barrier for the $25-100/user/mo band. Find a different wedge."
- Second pass rebuilt the thesis around a different where-to-play (vertical-specific workflow automation, not horizontal CRM) where the incumbents have genuine capability gaps and no announced roadmap to close them. The economic engine shifted from price-arbitrage to specialization-premium.

The second pass took the product from a thesis that would have been dead on arrival to one that owns defensible ground.

---

## Modes

Two orthogonal dials control how the engine runs. Set them at Layer 1 and carry them through the chain.

### Depth dial

| Mode | Sources per layer | Rigor | Time |
|------|-------------------|-------|------|
| `rapid` | 8-12 | Lightweight (desk research + top sources) | 15-30 min total |
| `standard` | 15-25 | Full backbone + claim sheets | 60-120 min total |
| `enterprise` | 30+ | Deep triangulation + contradictions log | 3-5 hours total |

Use `rapid` for internal ideation passes. Use `standard` for most client engagements. Use `enterprise` for high-stakes decisions (board decks, fundraising, platform pivots).

### Evidence dial

| Mode | What it means | When to use |
|------|---------------|-------------|
| `greenfield` | Research-only — all evidence gathered from public sources | New product concepts, pre-launch platforms, market entry assessments |
| `existing-product` | Ingest + weight internal artifacts before any external research | Products already in market with real telemetry, user interviews, sales loss-reason data, or roadmap docs |

In `existing-product` mode, Layer 1 asks for internal artifacts first (usage telemetry, NPS verbatims, win/loss call notes, roadmap docs, support ticket themes). Internal evidence receives elevated weighting in claim acceptance gates. Public research fills gaps and pressure-tests internal narratives against market reality.

Set both dials explicitly at the start of every engagement. The chain cannot infer them accurately from context alone.

---

## Skins

A skin controls only how the final output is packaged — voice, styling, and audience framing. It is set at Layer 6 (the compiler) and has no effect on the research or the strategy claims upstream.

| Skin | Audience | Voice / Style | When to use |
|------|----------|---------------|-------------|
| `8gnc-public` | Self-directed operator using the public method | Report voice is clear, firm, and brand-neutral. Packaging may carry an 8gnc method credit without agency-sales copy. | When the user is running the public plugin for their own team. |
| `client-deliverable` | The client's internal leadership team | Report voice uses the client's own language where possible. Packaging carries the client's name, engagement date, and BMC "prepared by" credit. | Standard agency delivery — the most common case. |
| `internal` | Michael / BMC team | No styling overhead. Dense, direct, annotation-friendly. | Internal strategy work, capability demos, test runs, and sales-process evidence. |

Skins are a config parameter passed to `strategy-thesis-compiler`, not a fork of the chain. Switching from `client-deliverable` to `8gnc-public` changes packaging, not the research claims.

---

## Layer-by-Layer Chain

### Step 1: Gather Your Inputs

Before you start, collect:

| Input | What You Need | Where to Find It |
|-------|--------------|------------------|
| Product name | The product, platform, or service | Client brief |
| Category | Market category or domain | Client brief |
| Audience | Primary buyer / operator audience | Client brief, sales team |
| Region | Geographic market | Client brief |
| Competitors | 3-5 named competitors or substitutes | Client brief, industry knowledge |
| Competitor URLs | Their product pages, pricing pages | Web search |
| Constraints | Legal, scope, or strategic limits | Client brief |
| Evidence mode | `greenfield` or `existing-product` | Depends on product maturity |
| Internal artifacts | Telemetry, interviews, roadmap, loss reasons | Client (existing-product only) |

### Step 2: Run Layer 1 — Core Strategic Truth

**Prompt:**

```
Run the core-strategic-truth skill for [PRODUCT NAME].

Category: [market category]
Audience: [who buys/uses it]
Region: [geographic market]
Mode: standard
Evidence mode: greenfield [or existing-product]

[If existing-product, paste or attach internal artifacts here]
```

**What happens:** The deep research engine launches 5-10 parallel searches across academic sources, industry data, forums, reviews, and analyst reports. Sources are triangulated, credibility-scored, and synthesized. The Core Strategic Truth skill distills findings into a single validated sentence (max 25 words) capturing the foundational constraint or forced trade-off buyers face in this market.

**Output:** Core Strategic Truth sentence, tension map, JTBD seed, buyer archetypes, lexicon, source bibliography.

**Duration:** 15-25 minutes in standard mode.

**Checkpoint:** Read the Core Strategic Truth sentence. Does it capture a real tension buyers experience but rarely articulate? Is it specific enough to be falsifiable? If it reads like a marketing headline, it isn't a strategic truth — provide additional context and re-run.

### Step 3: Run Layers 2-4 — Productprint Tier-A, Tier-B, Tier-C

These should chain automatically. If they don't auto-chain, prompt each one:

**Tier-A prompt (if needed):**

```
Run productprint-tier-a for [PRODUCT NAME], using the Core Strategic Truth output as seed.
```

**Tier-B prompt (if needed):**

```
Run productprint-tier-b for [PRODUCT NAME], using the Tier-A output as seed.
```

**Tier-C prompt (if needed):**

```
Run productprint-tier-c for [PRODUCT NAME], using the Tier-A and Tier-B outputs as seeds.
```

**Output after all three:**
- Tier-A: Winning aspiration, category sizing, JTBD outcomes, segments, where-to-play, competitive capability teardown, how-to-win hypothesis, required capabilities, economic engine, differentiation wedge
- Tier-B: Strategic bets, Now/Next/Later roadmap, build/buy/partner decisions, prioritization model, risk register
- Tier-C: Positioning statement, product one-liner, bet narrative, strategy-on-a-page

**Duration:** 45-90 minutes total for all three tiers in standard mode.

**Checkpoint:** Review the how-to-win hypothesis and differentiation wedge from Tier-A, and the strategic bets from Tier-B. Can you articulate what has to be true for this strategy to succeed? If yes, those are the assumptions Layer 5 is about to attack.

### Step 4: Run Layer 5 — Thesis Stress-Test

This is where most people skip — and where the most value lives.

**Prompt:**

```
Run the thesis-stress-test for [PRODUCT NAME].

Competitors / substitutes:
1. [Competitor 1] — [URL]
2. [Competitor 2] — [URL]
3. [Competitor 3] — [URL]

Use the Tier-A, Tier-B, and Tier-C outputs from Layers 1-4 as the thesis to stress-test.
```

**Pro tip:** If you have competitor pricing pages, product roadmap announcements, or recent press releases that might challenge the thesis, paste them directly. The falsification pass is only as sharp as the disconfirming evidence it can find.

**Output:** Assumption ledger, fragility ranking, load-bearing assumption identification, falsification findings, PROCEED/REFINE verdict. If REFINE: constraint package.

**Duration:** 15-30 minutes.

**The critical decision:**

If the gate returns **PROCEED** — the load-bearing assumption survived. Skip to Step 6.

If the gate returns **REFINE** — go to Step 5.

### Step 5: Second Pass (Only If REFINE)

Re-run Layers 1-4, but this time inject the constraint package from the gate:

**Prompt:**

```
Re-run the core-strategic-truth skill for [PRODUCT NAME] with an additional constraint package from the thesis stress-test:

[Paste the constraint package from Layer 5 here]

The first-pass thesis rested on the assumption that [assumption]. The falsification pass found: [finding].

The rebuild MUST NOT rely on [excluded bet or territory]. Find a where-to-play and how-to-win that does not depend on this assumption.
```

Then chain through Tier-A, B, C again with the same constraint package visible at every layer.

**What changes:** The cascade rebuilds from a narrower but truthful foundation. The where-to-play selection excludes the falsified ground. The differentiation wedge anchors in a different capability gap — one the falsification pass could not break.

**After the second pass:** Run Layer 5 again to confirm PROCEED. If it still says REFINE, surface to the operator with both constraint packages — a third automated pass rarely resolves a fundamental positioning premise without human judgment.

### Step 6: Run Layer 6 — Strategy Thesis Compiler

**Prompt:**

```
Run the strategy-thesis-compiler to create the final integrated strategy thesis.

Product: [PRODUCT NAME]
Client: [CLIENT NAME]
Prepared by: [YOUR FIRM NAME]
Date: [MONTH YEAR]
Skin: client-deliverable [or 8gnc-public or internal]
Confidentiality: Confidential
Include financials: yes
Include roadmap: yes
Format: narrative

Use all outputs from Layers 1-5 (or the second-pass versions if applicable).
```

**Output:** A 20-40 page Integrated Strategy Thesis (rapid: 15-20pp; standard: 25-35pp; enterprise: 35-50pp) with:

- Executive summary with key bets and evidence quality
- Market context and category dynamics
- Core Strategic Truth with tension map and buyer psychology
- Competitive landscape with capability gap analysis
- Target segments with JTBD outcome maps
- Where-to-play / How-to-win cascade with evidence chains
- Now/Next/Later roadmap (3 horizons, 18 months)
- Build / Buy / Partner decision map
- Economic engine model with ranges and assumptions
- Differentiation wedge and moat argument
- Assumption-Test Log (load-bearing assumptions + falsification findings)
- Strategic guardrails and decision boundaries
- Source bibliography (typically 400-1000+ sources across layers)

**Duration:** 20-40 minutes.

---

## Tips for Best Results

### Use the Deep Research Engine

Layers 1, 2, and 5 are evidence-heavy and route all search through the shared `deep-research` engine. Choose depth based on the engagement:

- **Standard mode** — good for most engagements (15-25 sources per layer, 5-10 min per layer)
- **Deep mode** — recommended for thesis stress-tests (25+ sources, 10-20 min)
- **UltraDeep mode** — comprehensive for enterprise-scale platform decisions (30+ sources, 20-45 min)

The engine handles parallel search, credibility scoring, triangulation, and citation verification automatically. For enhanced search, install [search-cli](https://github.com/199-biotechnologies/search-cli) — it aggregates Brave, Serper, Exa, Jina, and Firecrawl.

### In Existing-Product Mode, Front-Load Internal Evidence

For products already in market, internal artifacts (telemetry, win/loss notes, NPS verbatims, support themes, roadmap docs) almost always contain truths that public research misses. Paste them at Layer 1. Every layer downstream will weight them above public sources when the internal evidence is specific and dated.

### Feed Real Competitor Data to the Stress-Test

Don't just name competitors — paste their product pages, pricing announcements, recent blog posts, and roadmap items into Layer 5. The falsification pass can only break assumptions it has real ammunition against. Generic competitor names produce shallow attacks.

### Don't Skip the Second Pass

The first pass is necessary scaffolding. The second pass is where the strategy actually earns its keep. Every engagement where we've run the second pass has produced a sharper, more defensible thesis than the first pass alone — because it had to be rebuilt around something that couldn't be broken.

### Save Your Outputs

Each layer produces structured JSON. Save these files between sessions. If you need to update one layer six months later (e.g., re-run the stress-test after a competitor ships a new product), you can feed the saved outputs from the other layers back in without re-running the full chain.

### Carry the Evidence Mode Through Every Layer

Set `evidence_mode` once at Layer 1 and state it explicitly in every subsequent layer prompt. Layers don't inherit session state reliably. If you forget, later layers default to `greenfield` and may ignore internal artifacts you provided earlier.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Skills don't auto-chain | Manually prompt each layer with "use the [previous layer] output as seed" |
| Current research is unavailable | Stop evidence-dependent claims or label them as hypotheses. Do not substitute model memory for current market evidence. |
| Stress-test says PROCEED immediately | Add more competitors / substitutes or paste actual product announcements. A gate that always proceeds hasn't actually attacked anything. |
| Stress-test REFINE loops more than twice | Surface to the operator — a third automated pass signals a foundational positioning premise that needs human judgment, not more research. |
| Report is too short | Set mode to `enterprise` or provide more context. The compiler needs rich layer outputs to produce a rich report. |
| Layer outputs feel generic | Audience definition is probably too broad. "SaaS buyers" is too broad. "VP of Engineering at 50-500-person B2B SaaS companies who own the toolchain budget" is specific enough for the research to anchor on. |
| First-pass Core Strategic Truth feels like a tagline | It's not specific enough. Add constraints: the specific compromise buyers are forced to make, the decision they regret most, or the gap between what they expected and what they got. |
| Existing-product mode not weighting internal artifacts | Re-state `evidence_mode: existing-product` explicitly in each layer prompt and paste the artifacts again — session context doesn't always persist across long chains. |

---

## What This Replaces

This skill chain replaces a traditional product strategy engagement:

| Traditional | Productprint Engine |
|------------|---------------------|
| 8-16 weeks | 2-6 hours |
| Consultant fees plus operator time | Model access plus operator review time |
| 5-8 stakeholder workshops | Text inputs + competitor URLs + optional internal artifacts |
| 1 deliverable, no iteration | Unlimited re-runs with refined constraints |
| Static recommendations | Living thesis you can stress-test quarterly |

Treat the output as a decision-support artifact, not automatic truth. Its value comes from an explicit, documented, repeatable adversarial gate, but quality still depends on source quality, first-party inputs, and operator judgment.

---

## Package Contents

The 8gnc plugin includes `core-strategic-truth`, Tiers A through C, `thesis-stress-test`, `strategy-thesis-compiler`, this guide, and the shared `deep-research` engine.
