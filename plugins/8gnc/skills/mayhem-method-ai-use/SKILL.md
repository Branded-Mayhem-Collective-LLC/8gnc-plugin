---
name: mayhem-method-ai-use
description: Apply the Mayhem Method to AI Use for standardized AI-assisted creative production. Use when producing social posts, campaign briefs, copy blocks, or any creative output using AI workflows. Triggers on "AI workflow," "prompt chaining," "few-shot steering," "zero-shot baseline," "structured deliverable," "acceptance rubric," "campaign brief schema," "mayhem method AI," or when systematizing AI-assisted content creation for client work.
---

# Mayhem Method to AI Use (v1.0)

Standardize how Branded Mayhem uses AI to produce high-quality creative outputs fast. Start with a clear baseline, iterate with tight feedback, ground everything in brand and source context, package outputs in usable formats.

## Core Loop

1. Define the task and constraints with a zero-shot baseline.
2. Chain prompts with specific feedback to refine.
3. Provide examples to lock tone and cadence.
4. Request structured deliverables and variants.
5. Evaluate against brand criteria, then package and ship.

## Principles

1. **Clarity first.** State goal, audience, channel, format, length, constraints.
2. **Context in, quality out.** Supply source articles, brand pillars, voice rules.
3. **Iterate with purpose.** Each message adds or removes exactly one uncertainty.
4. **Examples steer style.** One good example is worth ten adjectives.
5. **Structure beats vibes.** Bullet requirements so nothing slips.
6. **Options unlock choice.** Ask for multiple hooks or formats when exploring.
7. **Ethics matter.** Avoid dark patterns, protect IP, cite when summarizing.
8. **Respect limits.** Request export-friendly output (Markdown, HTML, CSV).

## Workflow

### 3.1 Define the Task (Zero-Shot)

```
Goal: 4 social posts for {brand} during {theme}
Audience: {role}, {industry}
Tone: {voice rules}
Inputs: {link or pasted source}
Deliverable: {count}, {format}, {length}, {hashtags yes/no}, {artwork hooks}
Constraints: {regulated terms, claims, style rules}
```

### 3.2 Iterate (Prompt Chaining)

```
Keep: Post 1 structure
Change: Hook needs a stat; add 1 data point
Cut: Hashtags over 5
Add: CTA specific to {practice area}
```

### 3.3 Steer with Examples (Few-Shot)

```
Match this intro cadence:
"It's Cybersecurity Awareness Month... {short pivot}. {brand} helps {who} with {what}."
Apply that to 4 pillars: Insight, Security, Awareness, Governance.
```

### 3.4 Request Structure and Variants

```
For each post include:
- Headline (<=8 words)
- Caption (2–3 sentences)
- 3–5 hashtags
- Artwork hook (2 variants)
- 1 brand tie-in sentence using {practice area list}
```

### 3.5 Packaging

```
Output as Markdown sections per post with H2 headings. No code fences.
```

## Prompt Patterns Library

**Baseline generation:**
```
Create {n} {asset_type} for {brand}. Audience {aud}. Tone {voice}.
Each must include {elements}. Source: {link or text}.
Avoid {prohibited}. Length {limit}. Output as {format}.
```

**Refinement:**
```
Revise Post {#}: keep core idea, strengthen hook with stat,
wrap with {brand practice area}, remove jargon, keep under {char}.
```

**Few-shot steer:**
```
Mimic this style:
Example: "{sample 1}"
Example: "{sample 2}"
Now produce {n} new {assets} on {topics}.
```

**Options request:**
```
Give 3 alternate hooks for Post {#}, each in a different framing:
{authority}, {fear-to-safety}, {process reveal}.
```

**Format packaging:**
```
Return a one-page brief with:
- Objective
- Audience
- Message pillars
- 4 posts (H2)
- Asset checklist
```

## Thematic Cohesion

- Define a campaign spine with 3–4 pillars.
- Provide one sample intro to set cadence.
- Require each asset to map to a pillar and call out the mapping.

## Structured Deliverable Schemas

**Social post:**
```json
{
  "post_id": "CYA-01",
  "pillar": "Insight",
  "headline": "",
  "caption": "",
  "hashtags": [],
  "art_hooks": ["", ""],
  "brand_tie_in": ""
}
```

**Campaign brief:**
```json
{
  "objective": "",
  "audience": "",
  "pillars": ["","","",""],
  "sources": [""],
  "assets": ["posts","stories","artwork"],
  "due_date": "",
  "owner": "Branded Mayhem"
}
```

## Acceptance Rubric

Score each 1–5. Ship at 24+.

- **Clarity:** does a human get it in 3 seconds
- **Hook strength:** lead line earns the next line
- **Brand fit:** voice, claims, practice areas aligned
- **Structure:** every required element present
- **Evidence:** facts grounded when cited
- **Usability:** paste-ready, no cleanup needed

## Ship Checklist

- [ ] Task brief completed with audience, tone, constraints
- [ ] Baseline draft generated
- [ ] Few-shot examples supplied and applied
- [ ] Structured deliverable returned with all sections
- [ ] Options provided where requested
- [ ] Rubric score 24+
- [ ] Packaged in Markdown with headings
- [ ] Logged to campaign brief

## When NOT to Use

- Not for open-ended ideation — diverge first with `creative-thinking-ai`, then bring the chosen concept here for production.
- Not for making output sound like a specific person — run finished drafts through `humanize` with a voice profile.
- Not for narrative pieces — origin stories and case slices follow `story-spine`.
- Not for testing whether the creative lands — pressure-test with `ai-focus-group` before shipping.

## Limitations & Workarounds

- **Citations:** provide links or pasted passages for accurate summarization.
- **IP:** no long verbatim quotes from paywalled sources; paraphrase and attribute.
- **Sensitive claims:** require a source or soften to safe language.
