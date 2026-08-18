---
name: ux-ui-psych
description: Execute the UX/UI Psych choice architecture playbook (PLAY-002). Use when designing product menus, ordering flows, kiosk UX, upsell/cross-sell intercepts, or any conversion flow that needs behavioral nudges. Triggers on "choice architecture," "default selection," "upsell intercept," "cart cross-sell," "decoy pricing," "progress bar," "nudge," "contextual bandit," or when optimizing attachment rates and average check. Includes scoring functions, personalization rules, experimentation standards, accessibility specs, and dark-pattern guardrails.
---

# UX/UI Psych — Choice Architecture (PLAY-002)

Design defaults and frames so the easiest path is also the most profitable and ethical path. Use proven nudges, honest anchors, real personalization, and experimentation that does not lie to you.

## When NOT to Use

- **Funnels without the volume to learn.** The experimentation standards here demand power analysis up front and contextual bandits by week 5. If your traffic cannot feed enough exposures to power the tests you design, the bandits never converge and the A/Bs lie to you. Ship the rules-based defaults and Slot-1 ladder, skip the learning loop until volume exists.
- **No consent or privacy infrastructure.** Personalization runs on past orders, location, and context signals, and the ethics telemetry requires tracking opt-outs and consent symmetry. If you cannot capture consent properly, you cannot run this playbook ethically — and "no pre-checked consent boxes" is a hard rule, not a suggestion.
- **Operations that cannot absorb demand shifts.** Every recipe here is kitchen-aware: station capacity guardrails, prep-time thresholds, a kill switch tied to SLA risk. If fulfillment cannot flex when upsells land, you are trading order accuracy and throughput for attachment rate. Fix capacity first.
- **The pricing architecture itself is the problem.** This skill optimizes how customers select from a ladder that already exists. If the anchor, upgrades, and bundles are not designed yet, start with `fairness-anchor-ladder`.

1. Preselect a sane default or bundle that most customers actually want.
2. Lead with a premium anchor so the hero feels reasonably priced.
3. Insert one interstitial upsell after add-to-cart and a second pass in cart.
4. Rank suggestions with a scoring function, then let contextual bandits learn.
5. Measure attachment, average check, and throughput weekly. Kill weak patterns.

## Principles

1. **Choice beats chance.** Choreograph decisions so the right path is the easy path.
2. **Defaults decide.** Most users keep the preselected option if it is fair and clear.
3. **Anchors frame reality.** Start with a premium reference, then present the target hero.
4. **One nudge, not a maze.** Intercept once after add, and once in cart if the gap remains.
5. **Progress pulls.** Steps and progress bars speed completion near the finish line.
6. **Personal is powerful.** Day-part, weather, and order context matter more than slogans.
7. **No trickery.** Study dark patterns so you never ship them.

## Pattern Architecture

### Frame
- **Top of screen:** premium anchor, then target hero. Sticky mini-basket.
- **Same frame selection:** upgrade chips directly under the hero. No second page.
- **One-tap/two-click rule:** attach Slot-1 without leaving the flow.

### Ladder
- **Slot 1:** Sane add-on with highest attachment.
- **Slot 2:** Signature upgrade with highest margin.
- **Slot 3:** Novelty or seasonal.
- **Bundles:** Hero plus Slot-1 at a small discount.

## Scoring and Decisioning

**Candidate set:** items not in cart that meet constraints (in stock, prep time under threshold, station capacity, allergen safe).

**Score function:**
```
score(item, context) =
  w1·margin +
  w2·attach_rate_by_context +
  w3·popularity_now +
  w4·personal_affinity +
  w5·inventory_pressure
  − penalties(allergens, station_load, SLA_risk)
```

**Learning:** contextual bandits to balance explore vs exploit. Start rules-based week 1, flip to bandits by week 5.

**Signals:** day-part, weather, location, basket contents, past orders, promo calendar, inventory, station load.

## Pattern Recipes

### Intercept Upsell After Add-to-Cart
- Title: "Make it a meal?"
- Body: "Add fries and a drink and save $1.20"
- Primary CTA: "Add meal"
- Secondary CTA: "No, continue"
- Show if: entrée lacks side or drink, kitchen load under threshold, attach_rate above floor.

### Cart Cross-Sell
- Carousel: "People add with X"
- Ranking: contextual bandit score
- Include a fast-prep item to smooth throughput.

### Post-Purchase Add
- Timing: within 3 minutes if batching is possible
- Action: one tap with stored payment
- Guardrail: do not reopen the full checkout.

## Personalization Rules

- Early evening → family bundles
- Hot weather → cold drinks
- Low station load → unlock fries upsell
- Out-of-stock → hard-filter candidates

## Experimentation Standards

- **Design:** power analysis up front, fixed horizon or sequential methods.
- **SRM checks:** halt if allocations deviate from plan.
- **Variance reduction:** CUPED or covariate adjustment.
- **Kitchen-aware:** define station capacity guardrails. Abort if exceeded.
- **Registry:** log hypotheses, exposures, metrics, and decision notes.

## Metrics

**Primary:** average check, attachment rate, units per transaction, conversion, time to complete.

**Second order:** repeat purchase, order accuracy, refund/void rate, prep-station utilization.

**Ethics telemetry:** opt-out rate, complaint rate, undo after accidental adds, churn after promos, consent acceptance symmetry.

## Legal and Ethical Standards

- No pre-checked consent boxes.
- Clear declines and cancellation paths with parity to acceptance.
- If "No thanks" is harder to see or reach than "Add," it is out.

## Category Adaptations

- **QSR/cafes:** meal default, drink + side as Slot-1, dessert as fast-prep cross-sell.
- **Retail:** bundle defaults, warranty/care kit as Slot-1, limited colorways as novelty.
- **Wellness/beauty:** ritual default, booster as Slot-1, seasonal scent as novelty.
- **Local services:** consult default, quick add-on as Slot-1, priority turnaround as Slot-2.

## Accessibility

- Minimum 44px tap targets, consistent focus states, readable contrast.
- Kiosk flows reachable at standing and seated height.
- Basket preserved for N minutes after timeout.

## JSON Blueprint

```json
{
  "ui": {
    "anchor_order": ["premium_anchor", "target_hero", "value_option"],
    "defaults": {"meal_variant": true, "slot1_selected": true},
    "progress_steps": ["browse", "build", "review", "checkout"]
  },
  "eligibility": {
    "max_prep_minutes": 8,
    "exclude_if": ["out_of_stock", "allergen_conflict", "station_overload"]
  },
  "scoring": {
    "weights": {"margin": 0.35, "attach_rate_ctx": 0.25, "popularity_now": 0.15, "affinity": 0.15, "inventory_pressure": 0.10},
    "penalties": {"allergens": 1.0, "station_load": 0.5, "sla_risk": 0.4}
  },
  "patterns": {
    "intercept_after_add": {"show": true, "copy_variant": "value_save"},
    "cart_cross_sell": {"max_items": 10, "include_fast_prep": true},
    "post_purchase_add": {"window_seconds": 180, "requires_stored_payment": true}
  },
  "metrics": {
    "primary": ["avg_check", "attachment_rate", "upt", "conversion", "time_to_complete"],
    "ethics": ["opt_out_rate", "undo_rate", "complaint_rate"]
  },
  "guardrails": {
    "srm_watchdog": true,
    "kitchen_load_kill_switch": true,
    "consent_symmetry_required": true
  }
}
```

## 30/60/90 Implementation

**Day 0–30:** Instrument events (view_item, add_to_cart, upsell_shown, upsell_accept, upsell_dismiss, checkout_start, purchase). Ship baseline patterns with eligibility rules. Stand up dashboards and SRM watchdog.

**Day 31–60:** Tune scoring weights. Run A/B on copy, placement, default states. Introduce Slot-3 novelty and fast-prep cross-sell.

**Day 61–90:** Replace ranking with contextual bandits. Add cart-level second-chance prompts. Harden kill switch tied to kitchen load and SLA risk.
