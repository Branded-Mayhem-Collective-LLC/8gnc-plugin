---
name: outreach-diagnosis
description: Diagnose cold outreach performance using kill metrics, root cause analysis, and prioritized fix plans. Use when outreach campaigns have low open rates, zero replies, poor deliverability, or any cold email/LinkedIn sequence is underperforming. Triggers on "outreach diagnosis," "email not working," "zero replies," "low open rate," "cold email audit," "outreach audit," "deliverability," "why no replies," "email warmup," "outreach kill metrics," "sequence diagnosis," or when reviewing any cold outreach campaign performance. Produces a structured diagnosis with root causes and a prioritized fix sequence.
---

# Outreach Diagnosis Framework

Structured post-mortem methodology for cold outreach campaigns. Identifies root causes, applies kill metrics, and produces a prioritized fix plan.

## When NOT to Use

- **Fewer than ~50 sends.** The kill metrics are rates, and at small sample sizes one reply or one bounce swings a rate past a threshold. This framework's own follow-up cadence re-evaluates at 40 sends — below that volume you are diagnosing noise, not a campaign.
- **Brand-new domain with zero warmup.** You already know what Check 1 will find. Warm the domain first — ramped daily volume, auth records, engagement on warmup sends — then run the diagnosis on real campaign data.
- **Outreach under active legal or compliance review.** The fix plans here optimize performance, not legal exposure. If counsel is reviewing your sends for CAN-SPAM, GDPR, or industry rules, pause and resolve that first — a better subject line does not fix a compliance problem.
- **The problem is past the inbox.** Replies that stall on calls, prospects who ghost after a proposal, deals that die in negotiation — that is conversation territory. Use `pitching-pivot` for the methodology and `sales-simulator` to practice it.

Resolve these variables:

| Variable | What to Capture | Default |
|----------|----------------|---------|
| `campaign_name` | Campaign or sequence identifier | *required* |
| `channel` | Email / LinkedIn / Multi-channel | Email |
| `sends` | Total emails or messages sent | *required* |
| `opens` | Open count and rate | *required for email* |
| `replies` | Reply count and rate | *required* |
| `bookings` | Meetings booked | 0 |
| `time_period` | Date range of sends | *required* |
| `sender_domain` | Sending domain | *required for email* |
| `domain_age` | How long the domain has been sending | *ask* |
| `tools_used` | Outreach platform, CRM, warmup tools | *ask* |
| `sample_subjects` | 5-10 subject lines used | *ask* |
| `sample_body` | 1-2 email body examples | *helpful* |
| `target_segment` | Who was targeted (ICP, title, industry) | *ask* |

## Kill Metrics

These are non-negotiable thresholds. If any is violated, the campaign is broken and must be fixed before continuing sends.

| Metric | Target | Kill Floor | Action if Below Kill Floor |
|--------|--------|------------|---------------------------|
| Open Rate | 50%+ | 30% | **Stop sending.** Deliverability or subject line problem. |
| Reply Rate | 5%+ | 2% | **Pause and diagnose.** Message or targeting problem. |
| Bounce Rate | <2% | 5% | **Stop sending.** List quality problem. |
| Unsubscribe Rate | <1% | 2% | **Pause.** Targeting or frequency problem. |
| Spam Complaint | <0.1% | 0.3% | **Stop immediately.** Domain reputation at risk. |

## Diagnosis Protocol

Run these checks in order. Each produces findings that feed the fix plan.

### Check 1: Deliverability

**Is the email reaching the inbox?**

- Domain warmup status: Has the sending domain been warmed? How many emails/day before campaign?
- SPF/DKIM/DMARC: Are authentication records configured?
- Sending volume: How many emails per day? Ramp pattern?
- Sending pattern: Spacing between sends? All same time or distributed?
- Blacklist check: Is the domain or IP on any blocklists?
- Reply rate on warmup emails: Were warmup emails getting engagement?

**Red flags:**
- New domain with no warmup → emails go to spam
- More than 50 sends/day from a new domain
- All sends in a single batch within minutes
- No SPF/DKIM records

### Check 2: Subject Lines

**Would you open this?**

Evaluate subject lines against these filters:
- **Spam trigger words:** "free," "guarantee," "act now," "limited time," "vs.," "what's hiding"
- **Pattern repetition:** Are multiple subjects using the same formula?
- **Personalization:** Does the subject reference the recipient's company or situation?
- **Length:** 4-7 words optimal. Over 10 words = lower open rates.
- **Curiosity vs. clarity:** Best subjects create a gap the recipient wants to close.

**Banned patterns:**
- "{Company} vs. {anything}" — triggers spam filters
- Any subject that reads like a marketing email, not a human one
- Manipulative or fear-based framing ("what's hiding," "you're losing")
- Generic curiosity bait with no specificity

**Good subject frameworks:**
- Question about their specific situation: "Quick question about [their recent initiative]"
- Observation: "Noticed [specific thing] on your site"
- Referral/connection: "[Mutual connection] suggested I reach out"
- Direct value: "[Specific result] for [their industry]"

### Check 3: Targeting

**Are these the right people?**

- ICP match: Do the recipients match the ideal customer profile?
- Title accuracy: Are you reaching decision-makers or gatekeepers?
- Company fit: Right size, stage, and industry?
- Timing: Any reason this is bad timing (holidays, industry cycles, fiscal year)?
- Same-company collision: Are multiple people at the same company getting emails in the same batch?

**Red flags:**
- No ICP scoring on the list
- Multiple contacts at same company in same wave
- Titles that cannot make purchasing decisions
- Companies outside the service area or budget range

### Check 4: Message Quality

**Does the email earn a reply?**

- **Opening line:** Does it reference something specific about the recipient? Generic = delete.
- **Value proposition:** Is the offer clear in under 15 words?
- **Social proof:** Any evidence this works? (Client results, case reference)
- **Call to action:** Is the ask low-friction? (Question, not "book a call")
- **Length:** Under 100 words for cold email. Under 150 for follow-up.
- **Tone:** Does it sound like a human or a marketing automation?

**Recommended outreach structure:**
1. **Signal** — what you noticed about their business (specific, researched)
2. **Tension** — the gap or problem that creates (not fear-based, not condescending)
3. **Offer** — what you can do about it (one sentence)
4. **Sign-off** — low-pressure close (question, not demand)

### Check 5: Sequence Architecture

**Is the follow-up strategy sound?**

- Number of touches: 3-5 for cold, 5-7 for warm
- Spacing: 3-5 days between touches minimum
- Escalation: Does each touch add new value or just "checking in"?
- Channel mix: Email only or email + LinkedIn + other?
- Exit criteria: When does a non-responder get removed?

## Output Format

```markdown
# Outreach Diagnosis — [Campaign Name]
Date: [date]
Period analyzed: [date range]

## Numbers

| Metric | Actual | Target | Kill Floor | Status |
|--------|--------|--------|------------|--------|
| Sent | [n] | — | — | — |
| Opened | [n] ([%]) | 50% | 30% | [OK/WARN/KILL] |
| Replied | [n] ([%]) | 5% | 2% | [OK/WARN/KILL] |
| Bounced | [n] ([%]) | <2% | 5% | [OK/WARN/KILL] |
| Bookings | [n] | — | — | — |

## Root Causes (ranked by severity)

### 1. [Root Cause Title]
**Evidence:** [What data shows this]
**Impact:** Critical / High / Medium
**Fix:** [Specific action]

### 2. [Root Cause Title]
**Evidence:** [What data shows this]
**Impact:** Critical / High / Medium
**Fix:** [Specific action]

[Continue for all identified causes]

## Fix Plan (prioritized)

| # | Fix | Effort | Impact | Timeline |
|---|-----|--------|--------|----------|
| 1 | [Action] | [Low/Med/High] | [Critical/High/Med] | [When] |
| 2 | [Action] | [Low/Med/High] | [Critical/High/Med] | [When] |

## Recommended Sequence

1. [First action — usually "pause sends"]
2. [Infrastructure fix — warmup, auth, etc.]
3. [Content fix — subjects, body, targeting]
4. [Resume with controls — A/B batches, velocity caps]
5. [Evaluate at N sends — which framework wins]

## What Is Working
[Identify anything that IS working — architecture, tooling, data quality — so it does not get broken during fixes]
```

## Common Diagnosis Patterns

| Symptom | Likely Root Cause | First Fix |
|---------|------------------|-----------|
| 0% open rate | Deliverability — spam folder | Domain warmup + auth records |
| Opens but 0% reply | Message quality or targeting | Rewrite with Signal-Tension-Offer structure |
| High bounce rate | Bad list data | Re-verify with email validation tool |
| Opens + replies but no bookings | CTA too aggressive or offer unclear | Soften to question-based CTA |
| Declining open rates over time | Domain reputation degrading | Pause, warm, reduce velocity |
| High unsubscribe | Wrong audience or too frequent | Tighten ICP filter, increase spacing |

## Follow-Up

After fixes are implemented, re-run this diagnosis at 40 sends to evaluate improvement. Compare metrics against the original baseline to measure impact.
