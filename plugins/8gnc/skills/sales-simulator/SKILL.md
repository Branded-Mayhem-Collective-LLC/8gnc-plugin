---
name: sales-simulator
description: Practice arena for sales roleplay, pitch stress-testing, and objection drills. Use when the user wants to practice a pitch, simulate a sales call, run objection drills, or get coaching on a real call. Triggers on "sales roleplay," "practice my pitch," "objection practice," "sales coaching," "mock sales call," "stress test my pitch," "play the buyer," "sales simulation." Distinct from pitching-pivot (which teaches the methodology) — this skill IS the practice arena with structured scenarios, scoring, and coaching feedback.
---

# Sales Simulator

The practice arena. `pitching-pivot` is the playbook. This is the field. You do not get good at sales by reading about sales — you get good by doing reps against someone who will not go easy on you.

## Core Philosophy

Question-first discovery: the seller never pitches — they ask questions until the prospect closes themselves. That is what is being practiced here.

The scoring rubric rewards questions over statements. It penalizes premature pitching. It measures whether the buyer stated the ROI, or whether the seller did.

## When NOT to Use

- **You need the methodology, not reps.** `pitching-pivot` is the playbook; this is the field. If you do not yet know the five pivot steps and the objection handles, the simulator will just score you failing them. Learn the framework first, then come here to drill it.
- **You are prepping a specific real call.** `pitching-pivot` prep mode builds the pivot script with anticipated objections for a named prospect. The simulator trains general instincts against personas, not a script for Thursday's meeting.
- **The problem is outreach mechanics.** Low opens, zero replies, deliverability, subject lines — that is `outreach-diagnosis`. This skill scores live conversations; it cannot tell you why nobody is replying to your emails.
- **As a full replacement for live call review.** Debrief mode scores a transcript against the four dimensions, but it cannot hear tone, pacing, or what the buyer's silence meant. Use it alongside real call recordings and peer review, not instead of them.

Determine which mode to run:

| Mode | Trigger | Output |
|------|---------|--------|
| `scenario` | "play a buyer," "let's do a roleplay," "practice with me" | Live interactive simulation with a defined persona |
| `gauntlet` | "gauntlet," "5 rounds," "give me a challenge," "stress test" | 5 escalating scenarios, scored, with final report |
| `debrief` | "debrief this call," "analyze this transcript," "what did I miss" | Diagnosis of a real call + coaching recommendations |

If mode is unclear, ask: "Which mode — scenario (one deep practice run), gauntlet (5 rapid rounds), or debrief (analyze a real call)?"

---

## Mode 1: Scenario

### Setup

Before starting, collect or build the persona:

**Persona inputs:**
- Industry (tech, food/bev, professional services, retail, nonprofit, etc.)
- Company size (solopreneur / 2-10 / 10-50 / 50-200 / enterprise)
- Buyer title (founder, marketing director, ops manager, procurement, etc.)
- Primary concern (what they say they want)
- Personality archetype (see below)
- Budget signal (none given / vague / constrained / flexible)

If the user provides minimal context, generate a persona using the Persona Template below. Ask: "Want me to pick a persona for you or describe who you are selling to?"

### Persona Template

```
PERSONA: [Name, Title, Company]
Industry: [sector]
Company size: [range]
Primary concern (stated): [what they say they need]
Hidden objection (unstated): [what they are really worried about — never reveal until earned]
Budget authority: [full / partial / none — must go upstairs]
Personality archetype: [analytical / driver / amiable / expressive]
Difficulty: [easy / moderate / hard / brutal]
```

### Personality Archetype Behavior Rules

**Analytical** — Data-driven, skeptical, moves slowly. Responds to proof, not enthusiasm. Asks "how do you measure that?" Silence is not discomfort — it is processing. Hard to read. Will not close until all questions are answered. Never volunteers information.

**Driver** — Time-pressured, direct, impatient. Interrupts. Says "get to the point." Respects confidence. Will end the call if it feels like a waste. Hates small talk. Responds to ROI and speed. Can be won by matching their directness.

**Amiable** — Relationship-first, conflict-averse, slow to decide. Deflects with "let me think about it" instead of real objections. Needs to feel safe, not sold. Responds to case studies and peer validation. The hidden objection is almost always fear of making the wrong call.

**Expressive** — Enthusiastic, big-picture, easily distracted. Says "I love this" and then forgets to follow up. Agrees to everything in the room, nothing outside it. The sell is real buy-in, not surface excitement. Gets pulled back in with story and vision.

### Running the Scenario

1. State the persona in a brief block (visible to the user — this is the setup card)
2. Open the scene: describe where they are in the conversation (cold intro, warm referral, follow-up after a deck, re-engagement)
3. The model speaks as the buyer. Stay in character. Be difficult.
4. After each exchange, the model breaks character with a brief coaching note:
   - What landed
   - What missed
   - One alternative line to try
5. Continue until the user closes, loses the deal, or calls it
6. End with the Session Scorecard

### Buyer Realism Rules

These make the simulation hard enough to be useful:

- Raise the hidden objection only after 3+ exchanges, and only if the user has earned trust through questions
- Never volunteer information the buyer would not volunteer in real life
- If the user pitches features or explains services unprompted, deflect or get colder
- If the user asks genuine discovery questions, reward with information
- Match the archetype's communication style precisely — short answers for Driver, long tangents for Expressive, silence for Analytical
- Use real industry language, not generic placeholders
- At least one objection must be price or budget
- At least one objection must be a competitor reference ("we talked to [Agency X] and they quoted half that")

---

## Mode 2: Gauntlet

5 rounds, escalating difficulty. Fast pace — no extended debrief mid-round, just a one-line coaching note after each exchange.

### Round Structure

| Round | Difficulty | Archetype | Scenario Type |
|-------|------------|-----------|---------------|
| 1 | Easy | Amiable | Warm referral, open budget, single decision-maker |
| 2 | Moderate | Expressive | Inbound interest, vague budget, buying committee |
| 3 | Moderate | Driver | Cold intro, constrained budget, prior agency disappointment |
| 4 | Hard | Analytical | RFP process, technical objections, must prove ROI before any meeting |
| 5 | Brutal | Driver + Procurement | Price war, multi-vendor evaluation, price anchor already set by a competitor |

### Gauntlet Rules

- Each round: 4-6 exchanges maximum, then a score
- The user must attempt a close in every round (partial credit if it is a soft close vs. a hard close)
- The model plays each buyer distinctly — no blending archetypes
- Rounds 4 and 5: the model references competitors by name using clearly fictional or generic examples such as "the bigger agency in town" or "the freelancer who does it for $500"

### Gauntlet Scoring

Each round scored on 4 dimensions (1-5 each, 20 points per round, 100 total):

| Dimension | What It Measures | 5 = | 1 = |
|-----------|-----------------|-----|-----|
| Question ratio | Questions vs. statements | Mostly questions throughout | Mostly statements, minimal discovery |
| Pivot speed | How fast the commodity ask was reframed | Within 2 exchanges | Never reframed — quoted the service |
| Value source | Who stated the ROI | Buyer stated it unprompted | Seller stated it, buyer did not confirm |
| Close quality | How the close was attempted | Low-friction question ("What would need to be true to move forward?") | Hard ask ("Can we get a deposit today?") or no close attempt |

After all 5 rounds: full Gauntlet Report (see Output Formats).

---

## Mode 3: Debrief

Analyze a real call. The user provides notes, a transcript, or a summary of what happened.

### Debrief Process

1. Read the input fully before commenting
2. Identify the key moments:
   - First commodity ask (the moment the prospect named the thing they wanted)
   - First pivot attempt (did it happen? when?)
   - Objection moments (what were they, how were they handled)
   - Close attempt (was there one? what was it?)
3. Score on the same 4 dimensions as the Gauntlet (1-5 each)
4. Identify missed pivots — specific exchanges where a question could have reframed the conversation
5. Identify the hidden objection — if never uncovered, name it and explain what question would have surfaced it
6. Coaching recommendations (see Output Formats)

---

## Scoring Framework

### The Four Dimensions

**1. Question-to-Statement Ratio**
Target: 3 questions for every 1 statement. Count actual questions asked vs. statements/explanations made. If the seller is talking more than the buyer, something is wrong.

- 5: Ratio meets or exceeds 3:1. Buyer is talking 65%+ of the time.
- 4: Ratio around 2:1. Mostly questions with some necessary context.
- 3: Roughly even — some good questions but too many explanations.
- 2: Seller dominated. More pitching than asking.
- 1: No meaningful discovery. Seller presented a solution without understanding the problem.

**2. Pivot Speed**
How many exchanges before the conversation shifted from "what do you want to buy" to "what outcome are you trying to achieve."

- 5: Pivoted within the first exchange. Never quoted a service unprompted.
- 4: Pivoted by exchange 2-3. Briefly acknowledged the ask, then redirected.
- 3: Pivoted mid-conversation. Some commodity framing happened first.
- 2: Pivoted late or incompletely. Most of the conversation was about the service.
- 1: Never pivoted. Quoted the commodity, stayed in commodity frame.

**3. Value Source**
Who articulated the ROI — the buyer or the seller?

- 5: Buyer stated a specific number, outcome, or "if we fix this, here is what it means" without being told.
- 4: Buyer articulated value after a good discovery question surfaced it.
- 3: Seller reflected value back and buyer confirmed.
- 2: Seller stated the value. Buyer was passive.
- 1: No value conversation. Deal discussed purely in terms of scope and price.

**4. Close Quality**
How the conversation ended or was attempted.

- 5: Low-friction close question. "What would need to be true to move forward?" / "What is the right next step from your end?"
- 4: Soft close with clear next step. "Can we schedule a consultative discovery call this week?"
- 3: Weak or vague close. "Let me know if you want to talk more."
- 2: Aggressive or premature close. Pushed for decision before trust was earned.
- 1: No close. Conversation ended without a defined next step.

---

## Output Formats

### Session Scorecard (Scenario Mode)

```
SALES SIMULATOR — SESSION SCORECARD
Buyer: [Name, Title, Company]
Archetype: [type]
Difficulty: [level]
Exchanges: [count]
Outcome: [Deal advanced / Stalled / Lost / Closed]

SCORES
Question-to-Statement Ratio:  [1-5] — [one-line note]
Pivot Speed:                  [1-5] — [one-line note]
Value Source:                 [1-5] — [one-line note]
Close Quality:                [1-5] — [one-line note]
TOTAL:                        [X/20]

WHAT WORKED
- [specific exchange or technique that landed]
- [specific exchange or technique that landed]

WHAT TO FIX
- [specific missed moment with context]
- [specific missed moment with context]

3 THINGS TO PRACTICE NEXT SESSION
1. [specific drill or focus area]
2. [specific drill or focus area]
3. [specific drill or focus area]
```

### Gauntlet Report (Gauntlet Mode)

```
GAUNTLET REPORT
Date: [date]
Rounds Completed: [X/5]

ROUND SCORES
Round 1 (Easy / Amiable):     [X/20]
Round 2 (Moderate / Expressive): [X/20]
Round 3 (Moderate / Driver):  [X/20]
Round 4 (Hard / Analytical):  [X/20]
Round 5 (Brutal / Procurement): [X/20]
TOTAL:                         [X/100]

DIMENSION BREAKDOWN
Question-to-Statement Ratio:  [avg] — [pattern note]
Pivot Speed:                  [avg] — [pattern note]
Value Source:                 [avg] — [pattern note]
Close Quality:                [avg] — [pattern note]

PATTERNS IDENTIFIED
Strengths: [what consistently worked across rounds]
Vulnerabilities: [what consistently broke down]

HARDEST MOMENT
[The specific exchange that exposed the biggest gap — quote it]

3 THINGS TO DRILL BEFORE NEXT GAUNTLET
1. [specific]
2. [specific]
3. [specific]
```

### Debrief Report (Debrief Mode)

```
CALL DEBRIEF
Source: [transcript / notes / summary]
Prospect: [name, company if known]

SCORES
Question-to-Statement Ratio:  [1-5]
Pivot Speed:                  [1-5]
Value Source:                 [1-5]
Close Quality:                [1-5]
TOTAL:                        [X/20]

MISSED PIVOTS
[Exchange where a pivot could have happened]
→ What was said: [quote or paraphrase]
→ Better move: [specific question or reframe]

[Repeat for each missed moment]

HIDDEN OBJECTION
[Name the unstated fear driving the buyer's resistance]
→ Question that would have surfaced it: [exact question]

COACHING NOTES
- [specific behavioral note]
- [specific behavioral note]
- [specific behavioral note]

3 THINGS TO PRACTICE BEFORE THE NEXT SIMILAR CALL
1. [specific]
2. [specific]
3. [specific]
```

---

## Chain Integration

**Upstream:** Uses `pitching-pivot` as the scoring rubric. The five pivot steps and objection handles in that skill are what this simulator is training. When a score is low on Pivot Speed, reference the specific framework step from `pitching-pivot`.

**Discovery gap:** If scores reveal weak discovery (low question ratio, seller stated the value), recommend practicing consultative discovery techniques — specifically asking one open question and listening for 5 full minutes without redirect, then synthesizing before asking the next question.

**Example chain recommendation:**
> "Your question ratio was 1.2:1 in Round 3. Practice the 'First Five' drill: ask one open question and listen for 5 full minutes without redirect. Then synthesize what you heard before asking the next question."

---

## Persona Library — Ready-to-Use

Use these when the user does not provide a persona or wants to jump straight in.

**Persona A — The Skeptical Founder**
Title: Founder/CEO, B2B SaaS startup
Size: 8 employees, Series A pending
Primary concern: "We need a new website before our investor pitch"
Hidden objection: Last agency burned them — late, over-budget, missed the brief entirely
Budget authority: Full, but has been told to watch burn rate
Archetype: Driver
Difficulty: Hard

**Persona B — The Procurement Gatekeeper**
Title: Marketing Director, regional healthcare network
Size: 300 employees
Primary concern: "We have an RFP out and you came recommended"
Hidden objection: Already has a preferred vendor, using RFP for price leverage
Budget authority: None — committee of 5, CFO has final call
Archetype: Analytical
Difficulty: Brutal

**Persona C — The Enthusiastic Distractor**
Title: Co-founder, DTC food brand
Size: 4 employees
Primary concern: "We want to blow up on social media, maybe a rebrand too"
Hidden objection: Not sure who owns brand decisions — co-founder has different vision
Budget authority: Partial — anything over $5K needs partner sign-off
Archetype: Expressive
Difficulty: Moderate

**Persona D — The Comfortable Drifter**
Title: Owner, regional service business (HVAC, roofing, etc.)
Size: 12 employees
Primary concern: "Our website is outdated and we've been losing leads"
Hidden objection: Happy enough with status quo — reached out because someone pushed them to
Budget authority: Full, conservative
Archetype: Amiable
Difficulty: Easy

**Persona E — The Budget Anchor**
Title: VP Marketing, mid-market manufacturer
Size: 150 employees
Primary concern: "We need brand refresh — got a quote from another agency for $4,500"
Hidden objection: Under-resourced internally, afraid of a project they cannot manage
Budget authority: Up to $10K, anything above needs C-suite
Archetype: Analytical
Difficulty: Hard
