"""Minimal DataForSEO API client.

Covers the convenience methods documented in SKILL.md plus generic post/get
escape hatches for endpoints not wrapped here. Uses only the standard library
+ requests so it works in any Python 3.9+ environment without a dependency
manager.

Usage:
    from dataforseo_client import DataForSEOClient
    client = DataForSEOClient(login, password)
    result = client.serp_google_organic_live("brand strategy consultant",
                                             location_name="United States",
                                             language_name="English",
                                             depth=100)

Credentials priority — author code wraps these env reads upstream:
    1. DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD (environment variables)
    2. ~/.config/8gnc/dataforseo.json (only when the calling code loads it with user permission)

All endpoint paths are POST unless explicitly mapped to GET in the method.
"""
from __future__ import annotations

import base64
import json
from typing import Any

import requests


class DataForSEOClient:
    """Thin authenticated wrapper around the DataForSEO REST API."""

    BASE_URL = "https://api.dataforseo.com/v3"
    DEFAULT_TIMEOUT = 60

    def __init__(self, login: str, password: str, timeout: int = DEFAULT_TIMEOUT) -> None:
        if not login or not password:
            raise ValueError(
                "DataForSEO credentials missing. Set DATAFORSEO_LOGIN and "
                "DATAFORSEO_PASSWORD environment variables."
            )
        creds = f"{login}:{password}".encode("utf-8")
        self._auth_header = "Basic " + base64.b64encode(creds).decode("ascii")
        self._timeout = timeout

    def _headers(self) -> dict[str, str]:
        return {"Authorization": self._auth_header, "Content-Type": "application/json"}

    def post(self, path: str, task: list[dict[str, Any]] | dict[str, Any] | None = None) -> dict[str, Any]:
        """POST to any DataForSEO endpoint. `task` accepts the API's list-or-dict body."""
        url = f"{self.BASE_URL}{path}" if path.startswith("/") else f"{self.BASE_URL}/{path}"
        body = task if task is not None else []
        resp = requests.post(url, headers=self._headers(), data=json.dumps(body), timeout=self._timeout)
        resp.raise_for_status()
        return resp.json()

    def get(self, path: str) -> dict[str, Any]:
        """GET any DataForSEO endpoint (locations, languages, task_get/<id>, etc.)."""
        url = f"{self.BASE_URL}{path}" if path.startswith("/") else f"{self.BASE_URL}/{path}"
        resp = requests.get(url, headers=self._headers(), timeout=self._timeout)
        resp.raise_for_status()
        return resp.json()

    def task_post(self, api_path: str, task: list[dict[str, Any]] | dict[str, Any] | None = None) -> dict[str, Any]:
        """Submit an async task (endpoints ending in /task_post)."""
        return self.post(api_path, task)

    def task_get(self, api_path: str, task_id: str) -> dict[str, Any]:
        """Retrieve results for an async task by id."""
        suffix = api_path.rstrip("/")
        return self.get(f"{suffix}/{task_id}")

    def tasks_ready(self, api_path: str) -> dict[str, Any]:
        """List which async tasks are completed and ready to fetch."""
        return self.get(api_path)

    # ---- Convenience methods (high-traffic SERP / keyword / backlink endpoints) ----

    def serp_google_organic_live(
        self,
        keyword: str,
        location_name: str = "United States",
        language_name: str = "English",
        device: str = "desktop",
        depth: int = 100,
        **extra: Any,
    ) -> dict[str, Any]:
        return self.post(
            "/serp/google/organic/live/advanced",
            [{
                "keyword": keyword,
                "location_name": location_name,
                "language_name": language_name,
                "device": device,
                "depth": depth,
                **extra,
            }],
        )

    def serp_google_maps_live(
        self,
        keyword: str,
        location_name: str = "United States",
        language_name: str = "English",
        depth: int = 100,
        **extra: Any,
    ) -> dict[str, Any]:
        return self.post(
            "/serp/google/maps/live/advanced",
            [{
                "keyword": keyword,
                "location_name": location_name,
                "language_name": language_name,
                "depth": depth,
                **extra,
            }],
        )

    def keywords_search_volume(
        self,
        keywords: list[str],
        location_name: str = "United States",
        language_name: str = "English",
        **extra: Any,
    ) -> dict[str, Any]:
        if len(keywords) > 700:
            raise ValueError("keywords_search_volume accepts up to 700 keywords per call")
        return self.post(
            "/keywords_data/google_ads/search_volume/live",
            [{
                "keywords": keywords,
                "location_name": location_name,
                "language_name": language_name,
                **extra,
            }],
        )

    def keywords_for_site(
        self,
        target: str,
        location_name: str = "United States",
        language_name: str = "English",
        **extra: Any,
    ) -> dict[str, Any]:
        return self.post(
            "/keywords_data/google_ads/keywords_for_site/live",
            [{
                "target": target,
                "location_name": location_name,
                "language_name": language_name,
                **extra,
            }],
        )

    # ── AI Optimization API (LLM Mentions) ─────────────────────────────
    # Who the AI engines cite. platform: "google" (AI Overviews) or
    # "chat_gpt" (US-only per DataForSEO). targets: list of dicts like
    # {"domain": "example.com", "search_scope": ["sources"]} or {"keyword": "..."}.
    # Pricing (2026-06 official sheet): llm_mentions/* $0.10/task + $0.001/row;
    # ai_keyword_data $0.01/task; llm_responses $0.0006/task.
    # ⚠ llm_mentions/* requires DataForSEO's $100/mo minimum top-up through
    # 2026-06-30 only — requirement removed July 1, 2026 (then plain pay-per-call).

    def ai_llm_mentions_aggregated(
        self,
        targets: list[dict[str, Any]],
        platform: str = "google",
        location_name: str = "United States",
        **extra: Any,
    ) -> dict[str, Any]:
        return self.post(
            "/ai_optimization/llm_mentions/aggregated_metrics/live",
            [{"platform": platform, "target": targets, "location_name": location_name, **extra}],
        )

    def ai_llm_mentions_search(
        self,
        targets: list[dict[str, Any]],
        platform: str = "google",
        location_name: str = "United States",
        **extra: Any,
    ) -> dict[str, Any]:
        return self.post(
            "/ai_optimization/llm_mentions/search/live",
            [{"platform": platform, "target": targets, "location_name": location_name, **extra}],
        )

    def ai_llm_mentions_cross_aggregated(
        self,
        target_groups: list[dict[str, Any]],
        platform: str = "google",
        **extra: Any,
    ) -> dict[str, Any]:
        """Side-by-side compare. target_groups: 2-10 dicts like
        {"aggregation_key": "us", "target": [{"domain": "ourbrand.com"}]}."""
        return self.post(
            "/ai_optimization/llm_mentions/cross_aggregated_metrics/live",
            [{"platform": platform, "targets": target_groups, **extra}],
        )

    def ai_llm_mentions_top_domains(
        self,
        targets: list[dict[str, Any]],
        platform: str = "google",
        location_name: str = "United States",
        **extra: Any,
    ) -> dict[str, Any]:
        return self.post(
            "/ai_optimization/llm_mentions/top_domains/live",
            [{"platform": platform, "target": targets, "location_name": location_name, **extra}],
        )

    def ai_llm_mentions_top_pages(
        self,
        targets: list[dict[str, Any]],
        platform: str = "google",
        location_name: str = "United States",
        **extra: Any,
    ) -> dict[str, Any]:
        return self.post(
            "/ai_optimization/llm_mentions/top_pages/live",
            [{"platform": platform, "target": targets, "location_name": location_name, **extra}],
        )

    def ai_keywords_search_volume(
        self,
        keywords: list[str],
        location_name: str = "United States",
        **extra: Any,
    ) -> dict[str, Any]:
        """AI search volume per keyword — the cheap wide pass ($0.01/task)."""
        return self.post(
            "/ai_optimization/ai_keyword_data/keywords_search_volume/live",
            [{"keywords": keywords, "location_name": location_name, **extra}],
        )

    def ai_llm_models(self) -> dict[str, Any]:
        """Models available to llm_responses."""
        return self.get("/ai_optimization/llm_responses/models")

    def ai_llm_response(self, payload: dict[str, Any]) -> dict[str, Any]:
        """Query an LLM directly through DataForSEO ($0.0006/task). Payload is
        passed through unchanged — check llm_responses docs for current fields
        and ai_llm_models() for model names."""
        return self.post("/ai_optimization/llm_responses/live", [payload])

    def backlinks_summary(self, target: str, **extra: Any) -> dict[str, Any]:
        return self.post(
            "/backlinks/summary/live",
            [{"target": target, **extra}],
        )

    def onpage_task_post(self, target: str, max_crawl_pages: int = 100, **extra: Any) -> dict[str, Any]:
        return self.post(
            "/on_page/task_post",
            [{"target": target, "max_crawl_pages": max_crawl_pages, **extra}],
        )

    def onpage_summary(self, task_id: str) -> dict[str, Any]:
        return self.get(f"/on_page/summary/{task_id}")

    def business_data_google_reviews(
        self,
        keyword: str,
        location_name: str = "United States",
        language_name: str = "English",
        depth: int = 100,
        **extra: Any,
    ) -> dict[str, Any]:
        return self.post(
            "/business_data/google/reviews/live/advanced",
            [{
                "keyword": keyword,
                "location_name": location_name,
                "language_name": language_name,
                "depth": depth,
                **extra,
            }],
        )

    def serp_google_locations(self) -> dict[str, Any]:
        return self.get("/serp/google/locations")

    def serp_google_languages(self) -> dict[str, Any]:
        return self.get("/serp/google/languages")


__all__ = ["DataForSEOClient"]
