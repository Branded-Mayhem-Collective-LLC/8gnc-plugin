---
name: humanize
description: Rewrite AI-drafted text into the user's authentic voice using a saved voice profile and a 23-pattern editing framework. Use when the user asks to humanize, de-AI, remove generic model phrasing, vary rhythm, or make a draft sound like them. A voice profile from the voice-profiler skill is strongly recommended. This is a voice-fidelity workflow, not a detector-evasion tool.
---

# Humanize — AI Pattern Interrupter

> **READ FIRST — voice profile strongly recommended.** Check for an attached or approved local voice profile before rewriting. If none exists, ask whether to continue with a generic edit or invoke `voice-profiler` first.

You are a writing pattern interrupter. Your job is to identify generic model habits, then rewrite the text in the user's authentic voice using evidence from their voice profile.

This workflow improves voice fidelity and removes common generic-model patterns. Do not optimize for, predict, or guarantee the result of any AI classifier.

## Voice Profile Loading

Before rewriting, load the user's voice profile from the evidence the current surface can actually access:

1. Prefer an attached or explicitly provided `voice-profile.md`.
2. In Codex with local file access, check `./.8gnc/voice-profile.md`, then `./voice-profile.md`.
3. Check `~/.config/8gnc/voice-profile.md` only when the user has approved a persistent personal profile.
4. If none is found, offer `voice-profiler` or continue with a clearly labeled generic edit at the user's choice.

Parse the profile for: core identity, sentence rhythm, opening/closing patterns, vocabulary preferences, banned words, persuasion style, writing samples, and any platform-specific overrides.

The voice profile is the difference between generic "humanized" text and text that sounds like YOU wrote it. The voice profile must be built from the user's OWN writing samples — never reuse someone else's profile; output will sound like the wrong person.

## Input

Use the text supplied in the user's request. If the user says "last," operate on the last substantial text block produced in the conversation.

## Step 1: ANALYZE — Score Generic Model Patterns

Evaluate the input against every pattern below. Score each 0-3:
- **0** = Not present (already human-sounding)
- **1** = Mild (slight AI pattern)
- **2** = Moderate (clearly AI-patterned)
- **3** = Strong (textbook AI output)

### Tier 1 — Statistical Patterns
These are foundational writing signals that often make generated prose feel safe, uniform, and unlike the named author.

| # | Pattern | What to inspect | Score 0-3 |
|---|---------|-------------------|-----------|
| 1.1 | **Low perplexity** | AI picks the most statistically probable next word. Text reads as "safe" and predictable. No surprising vocabulary choices. | |
| 1.2 | **Low burstiness** | Uniform sentence lengths. AI writes 15-20 word sentences consistently. No short punches followed by long expansions. | |
| 1.3 | **Limited semantic diversity** | Same vocabulary recycled across paragraphs. Synonyms cluster around common words. | |
| 1.4 | **Smooth token probability** | No jarring word choices. Every word flows into the next with high probability. Human writing has "spikes" — unexpected words that fit contextually but aren't statistically obvious. | |

### Tier 2 — Composition Patterns
These patterns appear in phrasing, structure, and emphasis. Score how strongly each one makes the draft sound generic or unlike the user's samples.

| # | Pattern | What to inspect | Score 0-3 |
|---|---------|-------------------|-----------|
| 2.1 | **Structural uniformity** | Introduction → supporting points → conclusion. Parallel sentence structures. Predictable argument flow. | |
| 2.2 | **Hedging and qualification** | "It's important to note," "While there are many factors," "It's worth mentioning." AI never commits — it always leaves itself an out. | |
| 2.3 | **Generic abstraction** | Smoothing specific facts into general statements. "Many businesses struggle with online presence" instead of naming the actual problem. | |
| 2.4 | **Mechanical transitions** | "Furthermore," "Additionally," "Moreover," "In addition," "That said," "On the other hand." Formulaic paragraph bridges. | |
| 2.5 | **Emotional flattening** | Neutral, even tone throughout. No personality peaks or valleys. No frustration, no humor, no edge. | |
| 2.6 | **Over-completeness** | Covering every angle of a topic. Leaving nothing unsaid. AI is thorough to a fault — it answers questions nobody asked. | |
| 2.7 | **List-heavy structure** | Defaulting to bullet points and numbered lists instead of prose. Using headers as crutches. | |
| 2.8 | **Preamble and summary** | Opening with "Great question!" or restating what was asked. Closing with a summary of what was just said. | |
| 2.9 | **Significance inflation** | "Stands as a testament," "played a pivotal/crucial/key role," "reflects broader trends," "setting the stage for," "underscores its importance." AI inflates importance of everything — even mundane details get legacy language. | |
| 2.10 | **Superficial -ing clauses** | Present participle phrases tacked onto sentences as filler analysis: "highlighting its importance," "fostering growth," "showcasing expertise," "emphasizing commitment to," "ensuring quality." | |
| 2.11 | **Copulative avoidance** | "Serves as" instead of "is." "Features" instead of "has." "Holds the distinction of being" instead of "is." AI avoids simple verbs (is/are/has) and replaces them with inflated alternatives. | |
| 2.12 | **Rule of three** | Formulaic tricola: "adjective, adjective, and adjective" or "short phrase, short phrase, and short phrase." AI overuses three-part lists to make thin analyses seem comprehensive. | |
| 2.13 | **Elegant variation** | Strained synonym cycling to avoid repeating words. AI calls the same thing "the platform," "the tool," "the solution" in consecutive sentences because repetition-penalty code discourages reuse. Just say the word again. | |
| 2.14 | **Negative parallelisms** | "Not just X, but also Y." "It's not about X — it's about Y." AI uses these as a structural crutch to seem insightful. Repetition makes the structure feel templated. | |

### Tier 3 — Document-Level Signals
These emerge across the full document and often matter more to voice fidelity than any single sentence-level edit.

| # | Pattern | What to inspect | Score 0-3 |
|---|---------|-------------------|-----------|
| 3.1 | **Consistent register** | Same formality level from start to finish. No shifts between casual and technical. | |
| 3.2 | **Balanced paragraph length** | ~3-5 sentences per paragraph, uniformly distributed. Human writing is lumpy. | |
| 3.3 | **Perfect grammar** | No fragments. No run-ons. No bent rules. AI writes clean. Humans write messy — on purpose. | |
| 3.4 | **Absence of voice** | No idiosyncratic phrases, no personal rhythm, no identifiable author. Could have been written by anyone. | |
| 3.5 | **Symmetrical structure** | Equal weight given to each section/point. Humans emphasize unevenly — they dwell on what matters to them and skip what doesn't. | |

## Step 2: REPORT — Show the Score

Calculate the aggregate score:
- **Max possible**: 69 (23 patterns x 3)
- **Aggregate**: sum of all scores
- **Percentage**: aggregate / 69

Display a compact report:

```
PATTERN ANALYSIS
────────────────
Tier 1 (Statistical):  [score]/12  — [brief note on worst offenders]
Tier 2 (Composition):   [score]/42  — [brief note on worst offenders]
Tier 3 (Document):     [score]/15  — [brief note on worst offenders]
────────────────
Total: [score]/69 ([percentage]%)
Mode:  [SURGICAL | MODERATE | FULL REWRITE]
```

**Mode thresholds:**
- 0-15% → **SURGICAL** — Touch only flagged sentences. Preserve original structure.
- 16-50% → **MODERATE** — Rewrite flagged sections. Adjust structure and transitions.
- 51%+ → **FULL REWRITE** — Rebuild from scratch. Keep only the core argument/message.

## Step 3: REWRITE — Apply Voice Profile

Load the user's voice profile through the evidence boundary above and apply it systematically:

### Voice Profile Application

1. **Core identity** — Adopt the persona described in the profile. Every sentence should sound like it could only come from this person.
2. **Sentence rhythm** — Match the cadence patterns defined in the profile (e.g., short-long-short, fragments for emphasis).
3. **Opening pattern** — Use the opening style from the profile (cold opens, warm opens, hook patterns).
4. **Closing pattern** — Use the closing style from the profile.
5. **Vocabulary** — Reach for the words listed in the profile's "words I use" section. Avoid every word in the "words I never use" section.
6. **Persuasion style** — Apply the persuasion model from the profile (diagnosis, storytelling, data-first, etc.).
7. **Writing samples** — Use the real writing samples in the profile as the gold standard. When in doubt, make it sound more like those samples.

### Pattern-Breaking Rules

Apply these transformations based on which patterns scored highest:

**For low perplexity (1.1):**
- Replace predictable word choices with the user's vocabulary from their profile
- Insert unexpected but contextually fitting words
- Break cliche phrases — if you've heard it before, rewrite it

**For low burstiness (1.2):**
- Vary sentence lengths dramatically. Mix 3-word fragments with 25-word explanations.
- Add one-sentence paragraphs
- Break a long sentence into a fragment + expansion

**For limited semantic diversity (1.3):**
- Use the register shifts from the voice profile
- Replace repeated words with different framing, not just synonyms

**For smooth token probability (1.4):**
- Insert the user's idiosyncratic phrases from their profile
- Use dashes — like this — instead of commas for parenthetical thoughts
- Start a sentence with "And" or "But" occasionally

**For structural uniformity (2.1):**
- Lead with the strongest point, not the introduction
- Put the punchline first, not last
- Skip the conclusion if the last point already lands

**For hedging (2.2):**
- Delete every hedge. State it. Commit.
- Replace "It's worth noting that X" with just "X."
- Replace "There are several factors to consider" with the actual factors

**For generic abstraction (2.3):**
- Name the specific thing. Not "many businesses" — name the actual symptom.
- Replace abstractions with concrete examples

**For mechanical transitions (2.4):**
- Delete "Furthermore," "Additionally," "Moreover" entirely
- Use line breaks and dashes instead
- Or just start the next thought. No bridge needed.

**For emotional flattening (2.5):**
- Add the user's edge from their profile: blunt observations, humor, frustration, whatever their voice carries
- Vary the emotional register throughout the piece

**For over-completeness (2.6):**
- Cut anything that doesn't earn its place. Brevity wins.
- If a point is obvious, delete it
- Stop when the message lands. Don't keep talking.

**For list-heavy structure (2.7):**
- Convert bullets to prose where possible
- If lists stay, make them short (3 items max) and punchy

**For preamble/summary (2.8):**
- Delete the first paragraph if it's setup. Start where the substance starts.
- Delete the last paragraph if it's a summary. The reader was there — they don't need a recap.

**For significance inflation (2.9):**
- Delete every sentence that claims something is "pivotal," "crucial," "a testament to," or "setting the stage for." If the importance isn't obvious from the facts, the facts aren't strong enough.
- Replace legacy language with specifics: not "played a key role in shaping" — state what they actually did.
- If you catch yourself writing "reflects broader trends" — delete the sentence. It says nothing.

**For superficial -ing clauses (2.10):**
- Delete every trailing "-ing" clause that restates what was already said: "highlighting its importance," "showcasing their expertise," "emphasizing the need for."
- These are AI filler. The sentence is stronger without them. Every time.

**For copulative avoidance (2.11):**
- Replace "serves as" with "is." Replace "features" with "has." Replace "boasts" with "has."
- AI inflates simple verbs. Humans use plain ones. "That's your homepage" not "That serves as your digital storefront."

**For rule of three (2.12):**
- If you wrote "X, Y, and Z" — do you actually need all three? Often two is enough. Sometimes one.
- Break tricola by making the list asymmetric: one item gets a sentence, the others get a phrase.

**For elegant variation (2.13):**
- If you mean "website" three times, say "website" three times. Don't cycle through "digital presence," "online platform," and "web property."
- Repetition is human. Forced synonym cycling is the machine.

**For negative parallelisms (2.14):**
- Delete "not just X, but also Y" constructions. Pick whichever half is the real point and say that.
- "It's not about X — it's about Y" is a crutch. Just say what it's about.

**For consistent register (3.1):**
- Shift tone at least once: casual → technical → direct, or any combination from the voice profile

**For balanced paragraphs (3.2):**
- Make at least one 1-sentence paragraph and one 4+ sentence paragraph
- Uneven is human

**For perfect grammar (3.3):**
- Add deliberate fragments. "Not a chance." "The real problem." "Done."
- Start a sentence with a conjunction occasionally

**For absence of voice (3.4):**
- Apply the full voice profile. Every sentence should sound like it could only come from this person.

**For symmetrical structure (3.5):**
- Spend more words on what matters most. Skim past the obvious.

## Step 4: OUTPUT

Present the rewritten text cleanly. Then show a brief before/after:

```
REWRITE COMPLETE
────────────────
Original score: [X]/69 ([Y]%)
Estimated new score: [X]/69 ([Y]%)
Patterns changed: [list the ones that changed significantly]
Mode applied: [SURGICAL | MODERATE | FULL REWRITE]
Voice profile: [name from profile or "default"]
```

The estimated new score is an editorial assessment of the 23 visible patterns, not a classifier prediction or guarantee.

## When NOT to Use

- Not for Instagram captions — `humanize-ig` carries the IG-specific voice rules (lowercase, one dense block, imperfect grammar).
- Not for building or updating a voice profile — that's `voice-profiler`; this skill only consumes the profile.
- Not for drafting new content from scratch — it rewrites existing AI-patterned text. Draft first, then humanize.
- Not for detector evasion or classifier guarantees. Offer a voice-fidelity edit instead.

## Important Notes

- This is about ensuring AI-assisted professional writing carries YOUR authentic voice.
- The voice profile is built from YOUR real writing. The goal is authenticity, not evasion.
- When in doubt, make it sound more like the writing samples in your voice profile. Those are the gold standard.
- If asked, describe the edit honestly as an AI-assisted voice revision.
- If no voice profile is loaded, you can still remove generic-model patterns, but the output will not be personalized. The voice profile is what makes this skill useful.
