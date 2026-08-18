---
name: data-density-commerce
description: Apply the Instant Checkout & ACP data-density commerce checklist for product feed optimization. Use when preparing product feeds for AI-powered shopping, Google Merchant Center compliance, or agent-compatible checkout flows. Triggers on "feed completeness," "product feed," "ACP," "instant checkout," "delivery estimate," "return window," "answerability," "description depth," "merchant center," "feed parity," or when SKU data needs to be machine-readable and agent-actionable for natural-language shopping queries.
---

# Instant Checkout & ACP — Data-Density Commerce

Make products the only logical answer to natural-language asks by maxing out feed completeness and policy clarity. This is the commerce data layer that powers AI agent-readiness (PLAY-004).

## Goal

Products surface and convert in chat-led SERPs and agentic browsers because the data is complete, accurate, and machine-verifiable.

## When NOT to Use

- Digital-only products with no shipping or feed. Delivery estimates, Merchant Center, and feed parity don't apply.
- You don't control the product feed. Pure marketplace sellers (Amazon- or Etsy-only) can't change refresh cadence or field structure.
- The catalog is under ~10 SKUs. Manual checks beat building feed-completeness tooling at that scale.

## Readiness Checklist

### Feed Refresh
- [ ] Feed refresh ≤ 15 minutes for price and stock updates
- [ ] Price changes reflected in feed within one refresh cycle
- [ ] Stock status (in-stock, out-of-stock, preorder) accurate in real time

### Field Completeness
- [ ] Required + recommended fields ≥ 95% populated on top 20% SKUs
- [ ] All required Google Merchant Center fields present
- [ ] Optional fields (color, size, material, pattern) filled where applicable

### Description Depth
- [ ] 5,000-character descriptions structured as knowledge base
- [ ] Descriptions answer common buyer questions inline
- [ ] Structured sections: what it is, who it's for, specs, care/use, compatibility

### Delivery Promises
- [ ] `delivery_estimate` present on SKUs with fast shipping methods
- [ ] Handling time and transit time separated and accurate
- [ ] Shipping cost visible or calculable before checkout

### Returns Policy
- [ ] Returns: live URL published and accessible
- [ ] Explicit `return_window` (e.g., "30 days from delivery")
- [ ] Return conditions clearly stated (restocking fees, exclusions)

### Payment & Checkout
- [ ] ACP (Automated Checkout Process) endpoints respond correctly
- [ ] Cart totals math correct (subtotal + tax + shipping = total)
- [ ] Idempotent payment processing (no double charges on retry)
- [ ] Prefilled cart links functional for top configurations

### Parity
- [ ] Feed price = page price = JSON-LD price (no mismatches)
- [ ] Feed availability = page availability = JSON-LD availability
- [ ] Feed condition = page condition = JSON-LD condition
- [ ] Shipping settings match between Merchant Center and JSON-LD

## Weekly KPIs

| Metric | Target | How to Measure |
|--------|--------|---------------|
| Feed completeness % | ≥ 95% on top SKUs | Required + recommended fields filled / total fields |
| Answerability % | ≥ 80% | % of top buyer queries answerable from feed data alone |
| Description depth | ≥ 3,000 avg chars | Average character count across active SKUs |
| Parity score | 100% | Feed vs page vs JSON-LD match rate on price, availability, condition |
| Feed freshness | ≤ 15 min lag | Time between source change and feed update |

## Description Structure Template

For each SKU, structure the 5,000-char description as:

```
## What It Is
[1-2 sentences: category, primary function, key differentiator]

## Who It's For
[1-2 sentences: ideal buyer, use case, skill level]

## Key Specs
[Structured list: dimensions, weight, materials, capacity, compatibility]

## How to Use / Care
[Maintenance, setup, or usage instructions relevant to the product]

## What's Included
[Box contents, accessories, warranties]

## Common Questions
[2-3 FAQ-style Q&As that buyers typically ask before purchasing]
```

## Integration with PLAY-004

This checklist is the commerce data layer for the AI Agent-Readiness playbook. When both are implemented:

1. **Agent discovers product** via structured data and feed (this checklist)
2. **Agent evaluates fit** using description depth and field completeness (this checklist)
3. **Agent completes purchase** via selector contract and task URLs (PLAY-004)
4. **Agent verifies parity** between feed, page, and JSON-LD (both)

## Ops Cadence

- **Daily:** Monitor feed refresh lag and parity alerts
- **Weekly:** Review KPI dashboard; fix top 5 parity mismatches
- **Monthly:** Audit description depth on new SKUs; expand to next 20% of catalog
- **Quarterly:** Full feed audit; update return/shipping policies; review ACP endpoint health
