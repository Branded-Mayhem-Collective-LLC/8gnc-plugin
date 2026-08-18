---
name: pitching-pivot
description: Apply the Pitching Pivot technique for value-based sales conversations. Use when preparing for sales calls, handling pricing objections, reframing commodity requests into strategic engagements, or coaching on consultative selling. Triggers on "pivot technique," "value-based pricing," "objection handling," "too expensive," "price objection," "how to close," "sales prep," "upsell without upselling," "reframe the conversation," "they only want a website," "client wants a logo," or when a prospect is asking for a commodity service and you need to shift the conversation to strategic value.
---

# Pitching Pivot Technique

Stop selling, start serving. Whoever asks more questions controls the conversation. When the client says the value out loud, they close themselves.

## Core Principle

When a client asks for a specific service (e.g., "I need a website"), do not quote the service. Pivot by asking about their bigger goals. The price gap between the commodity ask and the strategic offer is small, but the value leap is massive.

## When NOT to Use

- **Locked-budget RFPs where price is already decided.** A committee scoring line items against a fixed budget cannot be reframed by discovery questions — the frame was set before you arrived. Decide whether to bid the spec or walk; do not burn the pivot on a buyer who cannot reopen the conversation.
- **Pure commodity sales with no value-reframing room.** The pivot works because the output serves a bigger outcome. If the outcome genuinely is the output — a buyer who needs exactly the thing, at spec, with zero strategic upside — Step 2's question dead-ends and you sound evasive instead of consultative.
- **Emergency procurement with no discovery window.** The framework requires at least 3 questions before any solution and a discovery call before any proposal. A buyer in a same-day emergency has no window for either. Quote it, deliver it, and run the pivot on the next engagement.
- **Practice, not principles.** To drill this technique against realistic buyers with scoring, use `sales-simulator` — it trains exactly this framework. And if the problem is upstream — cold emails getting no replies, so there is no conversation to pivot — that is `outreach-diagnosis`.

Determine the mode:

| Mode | When | Output |
|------|------|--------|
| `prep` | Before a sales call or meeting | Pivot script with anticipated objections and reframes |
| `roleplay` | Practice run — you play the prospect | Interactive sales simulation with feedback |
| `debrief` | After a call that did not close | Diagnosis of where the pivot failed + recovery plan |
| `coach` | General sales methodology guidance | Principles and techniques with examples |

Resolve these variables:

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `prospect_name` | Company or individual | *required for prep/debrief* |
| `commodity_ask` | What they initially requested | *required* |
| `industry` | Their sector | *helpful* |
| `known_budget` | Any budget signals | None |
| `prior_context` | How they found you, what they have said so far | None |

## The Pivot Framework

### Step 1: Receive the Commodity Ask

The prospect says something like:
- "We need a new website"
- "How much for a logo?"
- "Can you redesign our social media?"
- "We need SEO help"

**Do not answer with a price.** Do not even answer with a range. The moment you quote a commodity, you are a commodity.

### Step 2: Acknowledge and Pivot

Use this pattern:

> "I can absolutely help with that. Before I give you a number, can I ask — what is the website (or logo, or SEO) supposed to do for your business?"

The pivot question format: **"What is [their ask] supposed to do for [their business]?"**

This forces the prospect to articulate the outcome, not the output.

### Step 3: Go Deeper with Follow-Up Questions

Each answer reveals a deeper need. Keep asking:

- "What happens if that works? What does that look like for your revenue?"
- "What have you tried before? What did not work?"
- "If we solve this, what is the next problem you would tackle?"
- "Who else is involved in this decision?"
- "What does success look like in 6 months?"

**Rule:** Ask at least 3 questions before presenting any solution. The prospect should be talking 70% of the time.

### Step 4: Let Them State the Value

When the prospect says something like:
- "If we could get 20 more leads a month, that is worth $50K to us"
- "We are losing deals because our brand looks amateur"
- "Our competitors are getting all the search traffic"

They have just told you the ROI. Now your price is a percentage of their stated value, not a line item.

### Step 5: Reframe and Offer

> "So what you are really saying is [reframe in strategic terms]. The website is not the goal — [their stated outcome] is the goal. Here is what I would recommend..."

Now present your strategic engagement instead of the commodity service. The price gap feels trivial against the value they just articulated.

## Objection Handling

### "That is too expensive"

**Reframe as ROI percentage:**
> "You said this could drive $[their number] in revenue. This investment is [X]% of that. If we hit even half of that target, you are looking at a [Y]x return."

### "We just need a website"

**Reframe as infrastructure:**
> "A website without positioning is a brochure nobody reads. The companies winning your market have messaging, SEO, and conversion paths working together. Would you rather build once or rebuild in 6 months?"

### "Can you just send me a proposal?"

**Reframe as diagnostic:**
> "I could, but I would be guessing at what you actually need. A 30-minute discovery call — free — lets me give you a prescription instead of a guess. When works this week?"

### "We are talking to other agencies"

**Reframe as process:**
> "Good — you should. Ask them this: who does the strategy, and who does the build? If the answer is two different teams, the strategy gets lost in translation."

### "We do not have the budget right now"

**Reframe as cost of waiting:**
> "What is this costing you per month right now? [Wait for answer.] So in 3 months of waiting, you have already spent $[their number]. A diagnostic gives you a clear plan whether you work with us or not."

## The Anti-Patterns

Never do these:
- **Never list services unprompted.** Clients pigeonhole you into one skill. Break the association through questions, not by reading a menu.
- **Never defend your price.** Reframe to value. If you are justifying cost, you have already lost positioning.
- **Never lead with your portfolio.** Let the client talk first. Discovery before presentation.
- **Never discount.** Reduce scope instead. "We can start with Phase 1 and add Phase 2 in Q2."
- **Never send a proposal without a conversation.** A proposal without discovery is a guess.

## Sales Path Template

Customize this path with your own service tiers and pricing:

| Stage | Tool | Pivot To |
|---|---|---|
| Cold inquiry | Free discovery call | Use questions to earn the next meeting |
| After discovery | Paid diagnostic (your entry-level offer) | "The diagnostic tells us exactly what to build" |
| After diagnostic | Full engagement (your core offer) | "The findings map directly to this plan" |
| Price objection | Scope reduction | "Start with Phase 1, add phases as revenue grows" |

## Roleplay Mode

When mode is `roleplay`:

1. Ask for the prospect profile (industry, company size, their commodity ask)
2. Play the prospect — be realistic, push back, raise real objections
3. After each exchange, break character and give feedback:
   - What worked
   - What missed
   - Alternative reframes
4. Run 3-5 rounds, then summarize patterns and areas to sharpen
