---
name: ai-focus-group
description: Simulate a focus group of audience archetypes to test marketing creative, messaging, and brand assets. Use when the user wants audience feedback, creative testing, or message validation without real user research. Triggers on "focus group," "audience feedback," "test this creative," "what would they think," "simulate audience," "creative testing," "message testing," "would this resonate," "audience reaction," or any request to pressure-test copy, design, headlines, taglines, brand names, or campaign concepts against a defined audience. Pairs well with brand strategy and creative direction skills for richer audience profiles and psychological response frameworks. Outputs can feed into brand audits as message-testing evidence.
---

# AI Focus Group — Simulated Audience Testing Protocol

Simulate a panel of 5–7 audience archetypes to generate structured reactions to any marketing creative — copy, design, headlines, landing pages, emails, social posts, taglines, brand names, or campaign concepts. The model constructs each panelist from a defined demographic and psychographic profile and voices them distinctly. Label every result as synthetic; this is not real user research.

## When You Receive a Request

Before running the panel, resolve these variables. Ask for any that are missing and cannot be inferred from context.

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `creative_asset` | The thing being tested — copy, headline, visual description, concept | *required* |
| `asset_type` | Tagline / headline / landing page / email / social post / ad / brand name / concept | *infer if obvious* |
| `target_audience` | Who this creative is meant to reach | *required* |
| `panel_size` | Number of panelists | 5–7 |
| `custom_archetypes` | Any specific panelist types the user wants on the panel | Use standard archetypes if not provided |
| `brand_context` | Brand, product, or campaign this creative belongs to | *ask if not provided* |
| `success_criteria` | What would make this creative succeed (click, purchase, share, recall) | *infer from asset type* |

---

## The Simulated Focus Group Protocol

Execute all five stages in order. Do not skip synthesis or recommendations even if the panel reaction seems obvious.

---

### Stage 1 — Define the Panel

Build a panel of 5–7 archetypes tailored to the target audience. Each panelist gets a name, a one-line profile, and a behavioral stance toward the category.

**Standard Archetype Library** (customize or swap based on audience):

| Archetype | Who They Are | Behavioral Stance |
|-----------|-------------|-------------------|
| The Skeptic | Has been burned before. Distrusts claims. Reads the fine print. | Challenges everything. Needs proof before belief. |
| The Enthusiast | Already bought in. Loves the category. Shares with their circle. | Emotionally open. Amplifier if won, irrelevant if not targeted. |
| The Budget-Conscious | Every dollar is a decision. Value-to-cost ratio is the filter. | Converts on clarity and proof, drops off at vague pricing. |
| The Brand-Loyal | Already has a preference. This brand has to earn a switch. | Compares everything to the incumbent. Skeptical of newcomers. |
| The First-Timer | No prior experience in the category. Learning vocabulary. | Converts on simplicity and trust signals. Confused by jargon. |
| The Influencer | Thinks in shareable moments. Considers how this looks to their audience. | Buys aesthetics and story as much as utility. |
| The Decision-Maker | Holds budget authority. Evaluates ROI, risk, and operational fit. | Short attention. Wants the business case fast. |

**Panel Definition Output Format:**

```
PANEL: [Brand/Campaign Name] Focus Group
Target Audience: [description]
Panel Size: [n]

Panelists:
1. [Name], [Age/Context] — [Archetype] — [One-sentence behavioral profile]
2. [Name], [Age/Context] — [Archetype] — [One-sentence behavioral profile]
...
```

Make each panelist feel like a real person. Give them a name, a situation, and a reason they would encounter this creative.

---

### Stage 2 — Present the Creative

Restate the creative asset clearly before the panel reacts to it. If it is a visual, describe it as if briefing someone who cannot see it. Be precise — vague descriptions produce vague reactions.

```
CREATIVE UNDER TEST:
Asset Type: [type]
Content: [exact copy, headline, or detailed description]
Context: [where this appears — Instagram feed, email subject line, billboard, etc.]
```

---

### Stage 3 — Panel Reactions

For each panelist, generate five distinct reaction dimensions. Voice each reaction in the panelist's natural register — not survey language. They are talking, not filling out a form.

**Reaction Format (per panelist):**

```
[Name] — [Archetype]

First Impression:
[Their gut reaction in their own voice. 1–3 sentences. Raw, unfiltered.]

Comprehension Check:
[What they think this brand/product/offer is or does. Stated as they would describe it to a friend.]

Emotional Response:
[The specific feeling this triggers. Name the emotion. Then explain why in their voice.]

Action Likelihood:
[Would they click, buy, share, save, ignore, or show someone else? Why or why not. Honest, not aspirational.]

Concerns or Objections:
[What gives them pause. What's missing. What makes them hesitate or walk away.]
```

Each panelist should feel distinct. The Skeptic does not sound like the Enthusiast. The First-Timer does not use industry vocabulary. Do not let all five panelists agree — that is a sign of averaging, not simulation.

---

### Stage 4 — Synthesis

Aggregate the panel findings into a structured summary. This is where patterns become actionable intelligence.

```
SYNTHESIS

Consensus Points (3+ panelists agree):
- [Finding]
- [Finding]

Split Opinions (panel divided):
- [Topic]: [Who's in favor and why] vs. [Who objects and why]

Red Flags (any single panelist raised this — flag even if isolated):
- [Flag]

Strongest Signals:
- [The one thing the panel responded to most positively — be specific]
- [The one thing that most reliably triggered friction — be specific]

Comprehension Score: [Clear / Mostly Clear / Mixed / Confused]
Resonance Score: [High / Medium / Low / Split]
Conversion Risk: [Low / Medium / High — and why]
```

---

### Stage 5 — Recommendations

Translate synthesis into specific, actionable changes. Do not hedge. Each recommendation targets a real finding from the panel.

```
RECOMMENDATIONS

Priority 1 — [Change category: headline / CTA / proof / framing / simplification / etc.]
Finding it addresses: [Which panelist(s) raised this and what they said]
Recommended change: [Specific edit or direction — not "improve clarity," but how]

Priority 2 — [Change category]
Finding it addresses: [...]
Recommended change: [...]

Priority 3 — [Change category]
Finding it addresses: [...]
Recommended change: [...]

Optional A/B Test:
If resources allow, test [specific variation] against [current version] to resolve the split opinion on [topic].
```

---

## Focus Group Report Output

After all five stages are complete, compile into a single clean report:

```markdown
# AI Focus Group Report
Creative: [Asset name or description]
Brand: [Brand or campaign name]
Date: [date]
Panel Size: [n]

## Panel Composition
[Panelist list with archetype and one-line profile]

## Creative Under Test
[Restated asset]

## Individual Reactions
[Full reactions per panelist — Stage 3]

## Synthesis
[Stage 4 findings]

## Recommendations
[Stage 5 priorities]

## Confidence Level
[High / Medium / Low]
Reasoning: [Why this confidence level — based on how well the panel profile matches the real target audience, how specific the creative is, and how clear the use context is]
```

---

## Panelist Voice Guidelines

This is the most important creative discipline in the protocol. Panelist voice must be distinct or the simulation fails.

**The Skeptic** speaks in conditional language. "I'd want to know..." "That's a big claim." "Who's saying that?" They do not attack — they interrogate.

**The Enthusiast** leads with feeling. "Oh, I love this." "This is exactly what I've been looking for." They can be won quickly and lost quickly if something rings false.

**The Budget-Conscious** runs mental math. "So that's... what per month?" "Is this included or add-on?" They are not cheap — they are deliberate.

**The Brand-Loyal** compares. "Well, [incumbent] does this too but..." "I've been with [brand] for X years." They need a reason to switch that doesn't embarrass them for switching.

**The First-Timer** asks naive questions that reveal clarity gaps. "Wait, is this for me?" "I don't know what that means." They are not unintelligent — they are new.

**The Influencer** thinks in frames and captions. "This would be such a good story." "The aesthetic is on point." "People in my space would eat this up." They evaluate shareworthiness alongside utility.

**The Decision-Maker** is impatient and ROI-focused. "What's the measurable outcome?" "How long does implementation take?" "Who else is using this?" They cut to the business case.

---

## Variable Resolution for Common Asset Types

| Asset Type | Success Criteria (default) | Key Dimension to Watch |
|------------|---------------------------|------------------------|
| Headline | Click intent, comprehension | First Impression + Comprehension |
| Tagline | Recall, emotional fit | Emotional Response + Action Likelihood |
| Email subject line | Open intent | First Impression + Action Likelihood |
| Landing page | Conversion intent | Comprehension + Concerns |
| Social post | Share intent, engagement | Emotional Response + Action Likelihood |
| Brand name | Memorability, fit, associations | First Impression + Comprehension |
| Ad creative | Click intent, recall | All five dimensions equally |
| Offer / pricing structure | Purchase intent | Concerns + Action Likelihood |

---

## Limitations — Simulated vs. Real Feedback

This protocol produces structured inference, not empirical data. Understand the gap before using results to make high-stakes decisions.

**What simulated panels do well:**
- Surface comprehension gaps and ambiguous language
- Reveal likely friction points before launch
- Generate diverse reaction frames quickly and cheaply
- Pressure-test assumptions about audience response
- Identify which segments are likely won vs. likely lost

**What simulated panels cannot replace:**
- Real behavioral data (clicks, purchases, time-on-page)
- Genuine emotional reactions in the moment of exposure
- Cultural nuance that archetypes may not capture
- Subconscious processing that only shows in physiological response
- Statistical validity — this is qualitative inference, not quantitative research

**Risk calibration by decision stakes:**

| Decision | Simulated Panel Sufficient? |
|----------|-----------------------------|
| Refining copy before launch | Yes |
| Choosing between two headlines | Use with caution — supplement with real click data if possible |
| Rejecting a concept outright | No — requires real validation before kill decision |
| Major rebrand or campaign investment | No — real user research required |
| Quick gut-check before client presentation | Yes |

The Confidence Level field in the output report reflects how closely the panel archetypes match the real target audience definition. If the target audience is very specific (e.g., "Latino small business owners in Texas with under 10 employees") and the panel is built from generic archetypes, confidence drops. Flag this explicitly.

---

## When NOT to Use

- Not for statistical validity or real market research — this is qualitative inference from simulated archetypes, not data from real people.
- Not for high-stakes kill decisions — rejecting a concept outright requires real validation, not a simulated panel.
- Not for major rebrand or campaign-investment decisions — run real user research before committing that budget.
- Not when real behavioral data already exists — clicks, conversions, and replies beat simulated reactions every time.
- Not for writing or fixing the creative itself — this skill tests; produce with `linkedin-authority`, `story-spine`, or `humanize`.

---

## Skill Integration

- **Input sources:** Pairs well with brand strategy and creative direction skills — use audience truth statements and archetype summaries to calibrate panelist profiles. Reference psychological response frameworks (emotional polarity, nostalgia, salience) when scoring emotional reaction dimensions.
- **Output feeds into:** AI Focus Group results qualify as message-testing evidence for brand audits and positioning work. Attach the synthesis and recommendations sections to audit briefs.
- **Standalone use:** This skill runs independently. No prerequisite skill required, though richer audience definitions produce more accurate panels.
