---
name: dataforseo
description: >-
  Use when the user asks to perform SEO research, keyword analysis, SERP audits,
  backlink checks, competitor analysis, or any task involving the DataForSEO API.
  Provides the complete Python client, authentication, response parsing patterns,
  and all available endpoints. Also use when writing scripts that call DataForSEO
  or when the user mentions keyword research, search volume, SERP rankings, or
  SEO data collection.
---

# DataForSEO API — Operational Guide

## File locations (read this first)

Choose behavior based on the current execution surface:

| Context | Client access | Working dir | User-facing output |
|---|---|---|---|
| Codex with local shell access | Resolve this installed skill directory and use `scripts/dataforseo_client.py` | current workspace | `./dataforseo-results/YYYYMMDD/` or another user-approved path |
| ChatGPT or a surface without local shell access | No direct API execution in this skills-only release | conversation or supported file workspace | Return an input contract or analyze user-supplied exports; never fabricate live API results |

This release has no authenticated DataForSEO MCP connection.

## When NOT to Use

- No DataForSEO account or API budget. Every call bills the account — there's no free tier worth building on.
- You only need your own site's organic data. Google Search Console gives you queries, clicks, impressions, and positions for free.
- One-off single-keyword lookups. Scripting a client and paying API spend for one number isn't worth it — use a free volume tool instead.

## Credentials

Use one of these local credential sources, in priority order:

1. **Environment variables:** `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD`.
2. **Local config file:** `~/.config/8gnc/dataforseo.json` with `{"login": "...", "password": "..."}`. Create or read it only with the user's permission and never print its contents.

Do not paste credentials into chat, source files, reports, or committed project configuration.

## Bundled client

A working `DataForSEOClient` ships inside the skill at `scripts/dataforseo_client.py` (~200 LoC, requests-based, covers every convenience method in the table below + generic `post`/`get`/`task_post`/`task_get`/`tasks_ready` escape hatches).

**To use it:** on a local execution surface, resolve the installed `dataforseo` skill directory from this loaded `SKILL.md` and add its `scripts/` directory to the Python import path. Do not copy the client into the user's project unless the user explicitly asks for a vendored copy.

The client only depends on `requests`. Standard library otherwise. Python 3.9+.

## Quick Start (Copy-Paste Pattern)

Every local DataForSEO script should start with this pattern after resolving the bundled client path:

```python
import json, sys, os, time
from pathlib import Path

from dataforseo_client import DataForSEOClient

API_LOGIN = os.environ.get("DATAFORSEO_LOGIN")
API_PASSWORD = os.environ.get("DATAFORSEO_PASSWORD")

client = DataForSEOClient(API_LOGIN, API_PASSWORD)
OUTPUT_DIR = Path.cwd() / "dataforseo-results" / time.strftime("%Y%m%d")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
```

- Add `time.sleep(2)` between API calls to respect rate limits.
- Save raw responses as JSON for re-analysis without re-billing the API.
- On a non-local surface, stop before the API call and request an export or an authenticated MCP capability.

## Available Client Methods

### Convenience Methods (Use These First)

| Method | What It Does | Endpoint |
|--------|-------------|----------|
| `client.serp_google_organic_live(keyword, location_name, language_name, device, depth)` | Live Google organic SERP results | `/serp/google/organic/live/advanced` |
| `client.serp_google_maps_live(keyword, location_name, language_name, depth)` | Live Google Maps SERP results | `/serp/google/maps/live/advanced` |
| `client.keywords_search_volume(keywords_list, location_name, language_name)` | Search volume for a list of keywords (up to 700 per call) | `/keywords_data/google_ads/search_volume/live` |
| `client.keywords_for_site(target_domain, location_name, language_name)` | Keywords Google associates with a domain | `/keywords_data/google_ads/keywords_for_site/live` |
| `client.backlinks_summary(target_url_or_domain)` | Backlink profile summary | `/backlinks/summary/live` |
| `client.onpage_task_post(target_url)` | Submit async on-page SEO audit | `/on_page/task_post` |
| `client.onpage_summary(task_id)` | Get on-page audit results | `/on_page/summary/{task_id}` |
| `client.business_data_google_reviews(keyword, location_name, language_name, depth)` | Google Business reviews | `/business_data/google/reviews/live/advanced` |
| `client.serp_google_locations()` | List all available SERP locations | `/serp/google/locations` |
| `client.serp_google_languages()` | List all available SERP languages | `/serp/google/languages` |

### Generic Methods (For Any Endpoint)

| Method | When to Use |
|--------|-------------|
| `client.post(endpoint_path, [task_dict])` | Any POST endpoint not covered by convenience methods |
| `client.get(endpoint_path)` | Any GET endpoint |
| `client.task_post(api_path, [task_dict])` | Submit async tasks (endpoints ending in `/task_post`) |
| `client.task_get(api_path, task_id)` | Retrieve async task results |
| `client.tasks_ready(api_path)` | Check which async tasks are completed |

All convenience methods accept `**extra` kwargs — you can pass any additional DataForSEO parameter without modifying the client.

## Response Structure (Critical)

**Every DataForSEO response has this structure:**

```python
{
    "version": "0.1.20260209",
    "status_code": 20000,        # 20000 = success
    "status_message": "Ok.",
    "tasks": [
        {
            "id": "task-uuid",
            "status_code": 20000,
            "status_message": "Ok.",
            "result": [...]      # <-- THE DATA IS HERE
        }
    ]
}
```

**Standard parsing pattern:**

```python
result = client.some_method(...)
if result.get("tasks"):
    for task in result["tasks"]:
        if task.get("result"):
            for item in task["result"]:
                # Process item here
```

### Search Volume Result Items

Each item in a search volume result contains:
- `item["keyword"]` — the keyword string
- `item["search_volume"]` — monthly search volume (int or None)
- `item["competition"]` — "LOW", "MEDIUM", "HIGH", or None
- `item["cpc"]` — cost per click (float or None)
- `item["monthly_searches"]` — list of dicts with `year`, `month`, `search_volume`

### SERP Result Items

Each SERP result contains an `items` list. Items have a `type` field:
- `type == "organic"` — organic search result: has `title`, `url`, `rank_absolute`, `description`
- `type == "people_also_ask"` — PAA box: has `items` list of dicts with `title` key
- `type == "related_searches"` — related searches: has `items` list of **plain strings, NOT dicts** — check `isinstance(item, str)` when iterating, or your dict-style parsing will crash here
- `type == "featured_snippet"` — featured snippet: has `title`, `url`, `description`
- `type == "local_pack"` — local pack: has `items` list with business details
- `type == "paid"` — paid ads: has `title`, `url`

**IMPORTANT: `related_searches` items are plain strings, NOT dicts. Check `isinstance(item, str)` when iterating.**

### Keywords-for-Site Result Items

Each item contains:
- `item["keyword"]` — keyword string
- `item["search_volume"]` — monthly volume
- `item["competition"]` — LOW/MEDIUM/HIGH

## Common Endpoint Patterns (via client.post)

### Keyword Suggestions from Seed Keywords

```python
result = client.post("/keywords_data/google_ads/keywords_for_keywords/live", [{
    "keywords": ["adaptive reuse", "historic preservation"],
    "location_name": "United States",
    "language_name": "English",
}])
```

### Backlinks (More Endpoints)

```python
# Backlinks list
result = client.post("/backlinks/backlinks/live", [{"target": "example.com", "limit": 100}])

# Referring domains
result = client.post("/backlinks/referring_domains/live", [{"target": "example.com", "limit": 100}])

# Anchors
result = client.post("/backlinks/anchors/live", [{"target": "example.com", "limit": 100}])
```

### Domain Analytics

```python
# Technologies used by a domain
result = client.post("/domain_analytics/technologies/domains_by_technology/live", [{
    "technology": "WordPress",
    "filters": ["country_iso_code", "=", "US"],
}])
```

### Google Trends

```python
result = client.post("/keywords_data/google_trends/explore/live", [{
    "keywords": ["adaptive reuse", "office conversion"],
    "location_name": "United States",
    "language_name": "English",
    "time_range": "past_12_months",
}])
```

## Location Names (Common Values)

Use these exact strings for `location_name`:
- `"United States"`
- `"New York,New York,United States"` (city-level)
- `"Dallas,Texas,United States"` (city-level)
- `"Houston,Texas,United States"` (city-level)
- `"Austin,Texas,United States"` (city-level)
- `"United Kingdom"`, `"Canada"`, `"Australia"`, etc.

For exact location IDs, call `client.serp_google_locations()`.

## Best Practices

1. **Always save raw JSON** — save every API response to the results dir (see File locations) so data can be re-analyzed without re-calling the API.
2. **Batch keywords** — `keywords_search_volume` accepts up to 700 keywords per call. Chunk larger lists.
3. **Rate limit** — add `time.sleep(2)` between calls. For SERP calls (heavier), use `time.sleep(3)`.
4. **Handle None values** — `search_volume`, `cpc`, and `competition` can all be None. Always use `or 0` / `or "-"` in formatting.
5. **Use depth=100 for SERP audits** — default depth=10 only returns page 1. Use depth=100 to get related_searches and people_also_ask which appear on later pages.
6. **Sort by volume** — when displaying results, always sort keywords by search_volume descending for readability.
7. **Deliverable delivery depends on surface** — use a user-approved workspace path in Codex; use the supported file workflow in ChatGPT. Never claim a live API result when no authenticated execution path exists.

## Full Example: Keyword Research Workflow

This example uses local environment variables and a workspace-scoped output directory.

```python
import json, sys, os, time
from pathlib import Path

# Resolve the installed dataforseo skill and add its scripts directory to sys.path first.
from dataforseo_client import DataForSEOClient

API_LOGIN = os.environ.get("DATAFORSEO_LOGIN")
API_PASSWORD = os.environ.get("DATAFORSEO_PASSWORD")

client = DataForSEOClient(API_LOGIN, API_PASSWORD)
OUTPUT_DIR = Path.cwd() / "dataforseo-results" / time.strftime("%Y%m%d")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def save(name, data):
    path = OUTPUT_DIR / f"{name}.json"
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# 1. Search volume for target keywords
keywords = ["keyword one", "keyword two", "keyword three"]
vol_result = client.keywords_search_volume(keywords)
save("search_volume", vol_result)

# Parse results
if vol_result.get("tasks"):
    for task in vol_result["tasks"]:
        if task.get("result"):
            items = sorted(task["result"], key=lambda x: (x.get("search_volume") or 0), reverse=True)
            for item in items:
                kw = item.get("keyword", "?")
                vol = item.get("search_volume") or 0
                comp = item.get("competition", "-") or "-"
                cpc = item.get("cpc")
                cpc_str = f"${cpc:.2f}" if cpc else "-"
                print(f"{kw:<50} vol={vol:<8} comp={comp:<10} cpc={cpc_str}")

time.sleep(2)

# 2. SERP audit for key terms
serp_result = client.serp_google_organic_live("target keyword", depth=100)
save("serp_audit", serp_result)

# Parse SERP — organics, PAA, and related searches
if serp_result.get("tasks"):
    for task in serp_result["tasks"]:
        if task.get("result"):
            for res in task["result"]:
                for item in res.get("items", []):
                    t = item.get("type", "")
                    if t == "organic":
                        print(f"#{item.get('rank_absolute')} {item.get('title','')[:60]}")
                        print(f"   {item.get('url','')[:70]}")
                    elif t == "people_also_ask":
                        for pa in item.get("items", []):
                            if isinstance(pa, dict):
                                print(f"PAA: {pa.get('title','')}")
                    elif t == "related_searches":
                        for rs in item.get("items", []):
                            if isinstance(rs, str):
                                print(f"Related: {rs}")

time.sleep(2)

# 3. Keyword suggestions for a competitor domain
site_result = client.keywords_for_site("competitor.com")
save("competitor_keywords", site_result)

# 4. Keyword suggestions from seed keywords
seed_result = client.post("/keywords_data/google_ads/keywords_for_keywords/live", [{
    "keywords": ["seed keyword"],
    "location_name": "United States",
    "language_name": "English",
}])
save("seed_suggestions", seed_result)
```

## Existing Research Data

Previous research results may be saved at the results path for your surface (see File locations table). Check for existing data before making redundant API calls.

## API Reference

For the complete list of all available DataForSEO API endpoints, parameters, and response schemas, consult the [official DataForSEO API documentation](https://docs.dataforseo.com/v3/). The convenience methods in this skill cover the highest-traffic endpoints; the `client.post()` and `client.get()` generic methods reach anything else.

> Earlier versions of this skill referenced a bundled `reference.md` that was not shipped — use the official DataForSEO docs instead.
