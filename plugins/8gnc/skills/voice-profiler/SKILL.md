---
name: voice-profiler
description: Interview the user about their writing and analyze their real samples to generate a reusable voice profile for the humanize skills. Use when the user asks to build or update a voice profile, identify their writing voice, make future drafts sound more like them, or before humanize when no profile exists.
---

# Voice Profiler — Build Your Writing Voice Profile

Act as a writing voice analyst. Interview the user, analyze their real writing samples, and produce a structured voice profile file that the `humanize` skills can use.

## Why This Matters

Generic model drafts repeat predictable patterns. `humanize` can edit those patterns, but a voice profile supplies the user's actual rhythm, vocabulary, and preferences. The goal is not generic humanity; it is faithful voice.

## The Interview Process

This is a conversation, not a form. Adapt based on what the user gives you. Some people will paste 10 writing samples and let you figure it out. Others will want to describe their voice. Both work.

### Phase 1: Collect Writing Samples (Most Important)

Ask the user for 3-5 real writing samples. These are the foundation — everything else is derived from or validated against these.

**What to ask for:**
- "Paste 3-5 pieces of writing you're proud of. Emails, LinkedIn posts, proposals, website copy, tweets — anything that sounds like YOU at your best."
- If they have a file with samples: "Point me to a file with your writing and I'll analyze it."
- If `$ARGUMENTS` contains a file path, read that file for samples.

**What to look for in samples:**
1. **Sentence rhythm** — What's their natural cadence? Short-long-short? All punchy? Long and flowing?
2. **Opening patterns** — How do they start pieces? Cold open? Story? Question? Direct statement?
3. **Closing patterns** — How do they end? Call to action? Reflection? Punchline? Just stop?
4. **Vocabulary fingerprint** — Words they reach for repeatedly. Phrases that are distinctly theirs.
5. **Grammar personality** — Fragments? Run-ons? Perfect grammar? Contractions? Formal/informal mix?
6. **Emotional range** — Do they show humor? Frustration? Vulnerability? Confidence? What's the baseline?
7. **Persuasion model** — How do they convince? Data? Story? Authority? Diagnosis? Challenge?
8. **Register shifts** — Do they stay in one gear or shift between casual and formal?

### Phase 2: Guided Questions

After analyzing samples, fill gaps with targeted questions. Only ask what you can't already see in the samples.

**Identity & Context:**
- "What do you do? How would you describe your role in one sentence?"
- "Who do you write for most often? (clients, colleagues, public audience, specific industry)"

**Voice Preferences:**
- "Are there words or phrases you HATE seeing in writing? Things that make you cringe?"
- "Any words or phrases that are distinctly yours — things people associate with how you communicate?"
- "When you read your own writing back, what makes you think 'yeah, that sounds like me'?"

**Style Preferences:**
- "Do you prefer short and punchy or detailed and thorough?"
- "How do you feel about humor in professional writing?"
- "Do you sign off a specific way? (signature, sign-off phrase, etc.)"

**Anti-Patterns:**
- "What kind of writing makes you physically uncomfortable? Corporate jargon? Fake enthusiasm? Over-qualification?"

### Phase 3: Synthesis & Validation

Before generating the profile, play back what you've found:

"Here's what I see in your voice: [2-3 sentence summary]. Does that sound right, or am I missing something?"

Let them correct you. The profile should feel like looking in a mirror, not a caricature.

## Output: The Voice Profile File

Choose the destination with the user:

- **Codex with local file access:** prefer `./.8gnc/voice-profile.md` for a project-scoped profile. Offer `~/.config/8gnc/voice-profile.md` only for a user-wide profile and write there only after explicit permission.
- **ChatGPT or another surface without persistent local file access:** return `voice-profile.md` through the supported downloadable-file workflow and tell the user to save and reattach it when persistence is not confirmed.

Never silently write a personal voice fingerprint into a shared repository.

### Voice Profile Format

```markdown
---
name: [Full Name]
role: [One-line role description]
generated: [YYYY-MM-DD]
version: 1.0
---

# Voice Profile: [Name]

## Core Identity
[1-2 sentences describing who this person sounds like. Not what they do — how they SOUND. Use a metaphor or comparison if it fits.]

## Sentence Rhythm
[Describe their natural cadence pattern. Short-long-short? All punchy? Flowing with sudden stops? Give examples from their samples.]

**Pattern:** [e.g., "Short-long-short cadence. Punchy declarative → expansion → another punch."]

## Opening Patterns
[How they start pieces. List 2-3 patterns observed in their samples.]

- **[Pattern name]:** [Description + example]
- **[Pattern name]:** [Description + example]

## Closing Patterns
[How they end pieces. List 2-3 patterns observed.]

- **[Pattern name]:** [Description + example]

## Vocabulary — Words I Reach For
[List 15-25 words and phrases that appear repeatedly in their samples or that they identified as distinctly theirs.]

## Vocabulary — Words I Never Use
[List words and phrases they hate, avoid, or that would sound wrong in their voice. Include common AI words they specifically reject.]

## Persuasion Style
[How they convince. Name the model and describe it.]

- **Primary:** [e.g., "Diagnosis model — observe symptom → name it → offer remedy"]
- **Secondary:** [e.g., "Proof before promise — stack evidence before making the ask"]

## Grammar Personality
[Their relationship with grammar rules. Fragments? Contractions? Run-ons? Perfect grammar?]

## Emotional Range
[What emotions show up in their writing and how. Baseline tone + peaks.]

## Register
[Do they stay in one gear or shift? What triggers a shift?]

## Sign-Off
[How they sign things. Exact format.]

## Real Writing Samples

### Sample 1: [Context]
```
[Paste their actual writing sample]
```

### Sample 2: [Context]
```
[Paste their actual writing sample]
```

### Sample 3: [Context]
```
[Paste their actual writing sample]
```

## Platform Overrides

### LinkedIn
[Any LinkedIn-specific voice adjustments — line breaks, hooks, length]

### Email
[Any email-specific voice adjustments — formality, structure, sign-off]

### Instagram
[Any IG-specific adjustments — lowercase, density, hashtag style]

### [Other Platform]
[Add as needed]
```

## After Generation

1. Write or return the file through the approved path described above.
2. Tell the user where it was saved and whether the current surface will persist it.
3. Offer: "Want to test it? Paste any AI-generated text and I'll run `humanize` using your new profile."
4. Offer: "Want to add platform-specific overrides? (LinkedIn voice, email voice, Instagram voice)"

## Post-Processing Note

After generating content with `humanize`, run the em dash post-processor when local execution is available. Resolve the installed `voice-profiler` skill directory from this loaded `SKILL.md`, then run:

`python3 [voice-profiler-skill-dir]/scripts/de_emdash.py --max-emdash 2`

If local execution is unavailable, apply the punctuation rules manually and disclose that the script did not run.

This replaces excess em dashes with your natural punctuation devices (stdlib-only, no external dependencies). The script's defaults reflect a common human pattern; tune the flags to match what the voice profile observed in the user's samples — `--aside parens|hyphen|comma`, `--elaboration hyphen|comma|colon|semicolon`, `--pivot period|comma|colon`, and `--max-emdash N` (set N to roughly how often the user actually uses em dashes per piece). Run `de_emdash.py --help` for the full flag list.

## Updating an Existing Profile

If a voice profile already exists at the surface-appropriate path:
1. Read it first
2. Ask: "You already have a voice profile. Want to update it with new samples, or start fresh?"
3. If updating: merge new observations with existing profile, keeping what still fits
4. If starting fresh: run the full interview

## When NOT to Use

- Not for rewriting text — this skill builds the profile; `humanize` and `humanize-ig` consume it.
- Not for profiling someone else's writing to imitate them — the profile is built from the user's OWN samples; anything else makes every humanized piece sound like the wrong person.
- Not for inventing a voice from a description alone — push for real samples; descriptions without writing produce a caricature.
- Not needed every session — run once, update when the user's voice evolves or new samples surface.

## Important Notes

- The profile is only as good as the samples. Push for real writing, not descriptions of writing.
- 3 samples minimum. 5+ is ideal. More samples = more accurate profile.
- The user's BEST writing is the target — not their average. Ask for pieces they're proud of.
- Voice profiles should be updated periodically. Writing voice evolves.
- Never share the voice profile externally. It's a personal fingerprint.
- The profile file is plain Markdown — users can edit it manually anytime.
