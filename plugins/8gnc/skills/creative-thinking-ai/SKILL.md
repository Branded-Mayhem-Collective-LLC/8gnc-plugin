---
name: creative-thinking-ai
description: Apply the Mayhem Method to Creative Thinking with AI for structured ideation using 10 classic creativity frameworks as AI workflows. Use when running creative sprints, generating ideas at volume, or stress-testing concepts. Triggers on "SCAMPER," "Six Thinking Hats," "mind mapping," "brainstorming," "SWOT," "design thinking," "lotus blossom," "reverse brainstorming," "random word stimulation," "role storming," "creative sprint," "ideation," or when a team is stuck and needs structured divergent/convergent thinking.
---

# Creative Thinking with AI (Mayhem Method v1.0)

Turn classic creativity frameworks into practical AI workflows. Pick a method, feed a structured prompt, generate options, critique with a different method, consolidate and prototype.

## Core Loop

1. Pick a method that fits the job.
2. Feed AI a structured prompt pattern.
3. Generate 3–10 options per pass.
4. Critique with a different method to stress test.
5. Consolidate into a short list and prototype.

## Global Principles

- **Context in, quality out.** Give brand, audience, constraints, and success criteria.
- **One knob per pass.** Change a single variable between iterations.
- **Range before refinement.** Diverge wide, then converge with criteria.
- **Show your work.** Label which technique was used for each idea.
- **Bias checks.** Force at least one option that contradicts the default audience or channel.
- **Evidence lane.** If facts matter, require citations or mark outputs as speculative.

## When NOT to Use

- Not for production drafting — once a concept is picked, `mayhem-method-ai-use` handles structured AI-assisted production.
- Not for testing how an audience reacts — that's `ai-focus-group`.
- Not for narrative writing — story structure lives in `story-spine`.
- Not when the decision is already made — these methods generate and stress-test options; running them to justify a foregone conclusion wastes the room's time.

## The 10 Methods

### 1) SCAMPER
**Use when** you need many variations of an existing product, process, or message.
```
You are applying SCAMPER to {object}.
Constraints: {brand, audience, channel, limits}.
For each letter, output 3 ideas:
- S Substitute / C Combine / A Adapt / M Modify / P Put to another use / E Eliminate / R Reverse
End with a shortlist of 5 with rationale.
```
**Twists:** Add a cost band to each idea. Force 1 idea per letter that can ship within 48 hours.

### 2) Six Thinking Hats
**Use when** a team is stuck arguing about taste. You want structured angles.
```
We are evaluating {concept}.
Give 6 sections labeled by hat:
White facts, Red emotions, Black risks, Yellow benefits, Green creative alternatives, Blue process next steps.
Each section 3 bullets max, grounded in {data if any}.
```
**Twists:** Run the same input twice and compare where the hats disagree. Force one Green option that contradicts brand norms.

### 3) Mind Mapping
**Use when** you need a landscape fast.
```
Create a hierarchical outline mind map for {central topic}.
Depth 3 levels. Return as nested bullets and as JSON {id, label, parent_id}.
Tag each node with {opportunity|risk|unknown}.
```
**Twists:** Ask for an adjacency list for a diagram tool. Require 5 edge cases in an "unknown" cluster.

### 4) Brainstorming
**Use when** you want raw volume before filters.
```
Generate 30 ideas for {goal}.
Rules: no self-censoring, 12 words max per idea, no duplicates.
Label each with {safe bet|stretch|wild}.
End with 5 "bridge" ideas that combine a safe bet with a wild.
```
**Twists:** Time-boxed rounds: 10 ideas per minute with increasing constraints.

### 5) SWOT Analysis
**Use when** you need strategic alignment or stakeholder buy-in.
```
Create a SWOT for {initiative}. Use evidence where possible.
Each quadrant 5 bullets.
Then propose 3 TOWS strategies that pair internal with external factors.
```
**Twists:** Add a confidence score per bullet. Require one contrarian TOWS play.

### 6) Design Thinking
**Use when** solving fuzzy human problems.
```
We are applying Design Thinking to {problem}.
Return sections:
Empathize insights, Define problem statement (How might we...),
Ideate 15 ideas categorized by effort vs impact,
Prototype plan for top 3, Test plan with success metrics and risks.
```
**Twists:** Force one idea per disability persona. Add a concierge MVP in 24 hours.

### 7) Lotus Blossom Technique
**Use when** you want depth around one seed idea.
```
Central idea: {seed}.
Generate 8 petals with labels, each with 8 sub-ideas.
Return as a table and as JSON {petal, ideas[]}.
Highlight 5 cross-petal combos with high synergy.
```
**Twists:** Make one petal "legal and consent." Force one petal for automation and one for community.

### 8) Reverse Brainstorming
**Use when** you need to find failure modes before they find you.
```
Goal: {goal}.
Step 1: List 20 ways to make this fail.
Step 2: For each, propose a prevention or detection measure.
Return a top 10 risk register with severity, likelihood, owner, first step.
```
**Twists:** Ask for canaries and tripwires you can measure in real time.

### 9) Random Word Stimulation
**Use when** the room is stale and safe.
```
Generate 10 random concrete nouns and 10 abstract nouns.
Map each to {topic} with a 1-line concept.
Pick 5 favorites and expand each into a 2-sentence concept plus a title.
```
**Twists:** Seed the randomizer with a theme like "nautical" or "kitchen."

### 10) Role Storming
**Use when** you need perspective shifts fast.
```
Adopt these roles: {list}.
Each role proposes 3 ideas for {problem}, each with a role-specific rationale and a red flag to watch.
```
**Twists:** Add a "nemesis" role that wants you to fail. Require one idea per role under $100.

## Combo Patterns

- **SCAMPER × Hats:** Generate with SCAMPER, evaluate with Hats, shortlist.
- **Mind Map × Reverse:** Map the space, attack the riskiest branches.
- **Design Thinking × Role Storming:** Empathy and roles to test assumptions.
- **Lotus × SWOT:** Go deep, then pressure test strategically.

```
Run {method A} for {topic}.
Then switch to {method B} to critique the top 10 outputs.
Return a 5-item shortlist with reasons and next steps.
```

## Acceptance Rubric (Score 1–5 Each, Ship at 22+)

- Relevance to brief
- Originality that still fits the audience
- Feasibility within constraints
- Evidence or plausible rationale
- Ethical and legal sanity

## Workshop Sprint Outline (60 Minutes)

- 0–5: Brief and constraints
- 5–20: Diverge Round 1 (Brainstorming or Random Word)
- 20–35: Diverge Round 2 (SCAMPER or Lotus)
- 35–45: Converge (Six Hats or SWOT)
- 45–55: Prototype notes (Design Thinking)
- 55–60: Assign next steps and owners

## Universal Prompt

```
You are my creative collaborator.
Brand: {brand}. Audience: {aud}. Constraints: {rules}.
We will use {method}. Label outputs with the method and provide 3 to 10 options.
End with a shortlist of 5 and next steps I can do in 48 hours.
```

## Guardrails

- Label speculative content.
- Avoid dark patterns and deceptive claims.
- Respect IP and attribution.
- Include accessibility checks in every shortlist.
