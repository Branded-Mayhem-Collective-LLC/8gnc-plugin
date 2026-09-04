#!/usr/bin/env python3
"""Validate the 37-skill 8gnc package and its exact read-only MCP declaration."""

from __future__ import annotations

import hashlib
import json
import re
import struct
import sys
from pathlib import Path
from typing import Any


PLUGIN_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = PLUGIN_ROOT.parents[1]
SKILLS_ROOT = PLUGIN_ROOT / "skills"
LOCK_PATH = PLUGIN_ROOT / "sources.lock.json"
CODEX_MANIFEST_PATH = PLUGIN_ROOT / ".codex-plugin" / "plugin.json"
CLAUDE_MANIFEST_PATH = PLUGIN_ROOT / ".claude-plugin" / "plugin.json"
MCP_CONFIG_PATH = PLUGIN_ROOT / ".mcp.json"
LISTING_MEDIA_MANIFEST_PATH = PLUGIN_ROOT / "assets" / "listing-media-manifest.json"
CODEX_MARKETPLACE_PATH = REPO_ROOT / ".agents" / "plugins" / "marketplace.json"
CLAUDE_MARKETPLACE_PATH = REPO_ROOT / ".claude-plugin" / "marketplace.json"

EXPECTED_NAME = "8gnc"
EXPECTED_VERSION = "0.3.0"
EXPECTED_DISPLAY_NAME = "8gnc — Brand Growth Diagnostic"
EXPECTED_SCREENSHOTS = [
    "./assets/screenshot-input.png",
    "./assets/screenshot-diagnosis.png",
    "./assets/screenshot-route.png",
    "./assets/screenshot-fallback.png",
]
EXPECTED_SCREENSHOT_VIEWS = ["input", "diagnosis", "route", "fallback"]
EXPECTED_SCREENSHOT_SIZE = {"width": 1600, "height": 1000}
EXPECTED_MCP_CONFIG = {
    "mcpServers": {"eightgnc": {"type": "http", "url": "https://mcp.8gnc.io/mcp"}}
}
EXPECTED_HOMEPAGE = "https://8gnc.io/products/8gnc"
EXPECTED_REPOSITORY = "https://github.com/Branded-Mayhem-Collective-LLC/8gnc-plugin"
EXPECTED_LICENSE = "MIT"
EXPECTED_AUTHOR = {
    "name": "Branded Mayhem Collective LLC",
    "email": "hello@brandedmayhem.com",
    "url": "https://8gnc.io",
}
EXPECTED_PLUGIN_ROOT_ENTRIES = {
    ".claude-plugin",
    ".codex-plugin",
    ".mcp.json",
    "LICENSE",
    "README.md",
    "THIRD_PARTY_NOTICES.md",
    "assets",
    "scripts",
    "skills",
    "sources.lock.json",
    "third_party",
}
FORBIDDEN_ROOT_COMPONENTS = (".app.json", "hooks", "agents", "commands")
FORBIDDEN_SKILL_PATTERNS = {
    "Claude-specific language": re.compile(r"claude|anthropic|\.claude", re.IGNORECASE),
    "Claude hook dependency": re.compile(r"SessionStart|PostToolUse|Cowork"),
    "Claude runtime variable": re.compile(r"CLAUDE_PLUGIN_(?:ROOT|DATA|OPTION)"),
    "legacy namespaced command": re.compile(
        r"/(?:brandprint-engine|productprint-engine|content-creative-lab):"
    ),
    "retired Contraband brand": re.compile(r"contraband", re.IGNORECASE),
    "private workstation path": re.compile(
        "|".join(("/" + "Users/", "/Volumes/" + "DriveB/", "/home/" + "michael/"))
    ),
}
FORBIDDEN_PUBLIC_CLAIMS = {
    "detector defeat claim": re.compile(r"defeat(?:s|ing)?\s+(?:an?\s+)?AI[- ]?detect", re.IGNORECASE),
    "detector pass claim": re.compile(r"(?:pass|passes|passing)\s+(?:the\s+)?(?:AI\s+)?detector", re.IGNORECASE),
    "detector bypass claim": re.compile(r"bypass(?:es|ing)?\s+(?:an?\s+)?AI[- ]?detect", re.IGNORECASE),
    "undetectability claim": re.compile(r"guaranteed\s+(?:to\s+be\s+)?undetectable", re.IGNORECASE),
}


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def load_json(errors: list[str], path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        fail(errors, f"missing JSON file: {path.relative_to(REPO_ROOT)}")
        return {}
    except json.JSONDecodeError as error:
        fail(errors, f"invalid JSON in {path.relative_to(REPO_ROOT)}: {error}")
        return {}
    if not isinstance(value, dict):
        fail(errors, f"JSON root must be an object: {path.relative_to(REPO_ROOT)}")
        return {}
    return value


def validate_shared_metadata(
    errors: list[str], codex_manifest: dict[str, Any], claude_manifest: dict[str, Any]
) -> None:
    for field in ("name", "version", "description", "author", "homepage", "repository", "license", "keywords"):
        if codex_manifest.get(field) != claude_manifest.get(field):
            fail(errors, f"Claude and Codex manifests disagree on {field}")

    expected = {
        "name": EXPECTED_NAME,
        "version": EXPECTED_VERSION,
        "author": EXPECTED_AUTHOR,
        "homepage": EXPECTED_HOMEPAGE,
        "repository": EXPECTED_REPOSITORY,
        "license": EXPECTED_LICENSE,
        "skills": "./skills/",
    }
    for label, manifest in (("Codex", codex_manifest), ("Claude", claude_manifest)):
        for field, value in expected.items():
            if manifest.get(field) != value:
                fail(errors, f"{label} manifest {field} must be {value!r}")

    interface = codex_manifest.get("interface")
    if not isinstance(interface, dict):
        fail(errors, "Codex manifest interface must be an object")
    else:
        if interface.get("displayName") != EXPECTED_DISPLAY_NAME:
            fail(errors, f"Codex displayName must be {EXPECTED_DISPLAY_NAME!r}")
        required_urls = {
            "websiteURL": EXPECTED_HOMEPAGE,
            "privacyPolicyURL": f"{EXPECTED_HOMEPAGE}/privacy",
            "termsOfServiceURL": f"{EXPECTED_HOMEPAGE}/terms",
        }
        for field, value in required_urls.items():
            if interface.get(field) != value:
                fail(errors, f"Codex interface {field} must be {value!r}")
        prompts = interface.get("defaultPrompt")
        if not isinstance(prompts, list) or not 1 <= len(prompts) <= 3:
            fail(errors, "Codex defaultPrompt must contain one to three prompts")
        elif any(not isinstance(prompt, str) or len(prompt) > 128 for prompt in prompts):
            fail(errors, "Codex default prompts must be strings of at most 128 characters")

        capabilities = interface.get("capabilities")
        expected_capabilities = ["Research", "Strategy", "Content generation", "Interactive"]
        if capabilities != expected_capabilities:
            fail(errors, f"Codex interface capabilities must be {expected_capabilities!r}")

        if interface.get("screenshots") != EXPECTED_SCREENSHOTS:
            fail(errors, f"Codex interface screenshots must be {EXPECTED_SCREENSHOTS!r}")

    if codex_manifest.get("mcpServers") != "./.mcp.json":
        fail(errors, "Codex manifest mcpServers must point to ./.mcp.json")
    if "mcpServers" in claude_manifest:
        fail(errors, "Claude manifest must remain skills-only and omit mcpServers")
    if claude_manifest.get("displayName") != EXPECTED_DISPLAY_NAME:
        fail(errors, f"Claude displayName must be {EXPECTED_DISPLAY_NAME!r}")


def validate_marketplaces(
    errors: list[str], codex_marketplace: dict[str, Any], claude_marketplace: dict[str, Any]
) -> None:
    if codex_marketplace.get("name") != EXPECTED_NAME:
        fail(errors, "Codex marketplace name must be 8gnc")
    if codex_marketplace.get("interface") != {"displayName": EXPECTED_DISPLAY_NAME}:
        fail(errors, f"Codex marketplace displayName must be {EXPECTED_DISPLAY_NAME!r}")
    codex_entries = codex_marketplace.get("plugins")
    if not isinstance(codex_entries, list) or len(codex_entries) != 1:
        fail(errors, "Codex marketplace must contain exactly one plugin")
    else:
        entry = codex_entries[0]
        expected_source = {"source": "local", "path": "./plugins/8gnc"}
        if entry.get("name") != EXPECTED_NAME or entry.get("source") != expected_source:
            fail(errors, "Codex marketplace must route 8gnc to ./plugins/8gnc")
        if entry.get("policy") != {"installation": "AVAILABLE", "authentication": "ON_INSTALL"}:
            fail(errors, "Codex marketplace policy must keep frictionless availability")
        if entry.get("category") != "Productivity":
            fail(errors, "Codex marketplace category must be Productivity")

    if claude_marketplace.get("name") != EXPECTED_NAME:
        fail(errors, "Claude marketplace name must be 8gnc")
    claude_entries = claude_marketplace.get("plugins")
    if not isinstance(claude_entries, list) or len(claude_entries) != 1:
        fail(errors, "Claude marketplace must contain exactly one plugin")
    else:
        entry = claude_entries[0]
        expected_identity = {
            "name": EXPECTED_NAME,
            "displayName": EXPECTED_DISPLAY_NAME,
            "source": "./",
            "strict": False,
            "version": EXPECTED_VERSION,
            "description": "Diagnose what is blocking brand growth, separate evidence from assumption, and route the work into the smallest useful 8gnc method.",
            "author": EXPECTED_AUTHOR,
            "homepage": EXPECTED_HOMEPAGE,
            "repository": EXPECTED_REPOSITORY,
            "license": EXPECTED_LICENSE,
            "keywords": [
                "brand-strategy",
                "product-strategy",
                "content",
                "seo",
                "conversion",
                "sales",
            ],
            "category": "productivity",
            "skills": "./plugins/8gnc/skills/",
        }
        for field, value in expected_identity.items():
            if entry.get(field) != value:
                fail(errors, f"Claude marketplace {field} must be {value!r}")
        if "mcpServers" in entry:
            fail(errors, "Claude marketplace must not expose MCP servers")
        if (REPO_ROOT / ".mcp.json").exists():
            fail(errors, "Claude marketplace root must not contain .mcp.json")


def validate_listing_media(errors: list[str], manifest: dict[str, Any]) -> None:
    if manifest.get("schemaVersion") != 1:
        fail(errors, "listing media manifest schemaVersion must be 1")
    if manifest.get("listingOrder") != EXPECTED_SCREENSHOT_VIEWS:
        fail(errors, f"listing media order must be {EXPECTED_SCREENSHOT_VIEWS!r}")

    assets = manifest.get("assets")
    if not isinstance(assets, list) or len(assets) != len(EXPECTED_SCREENSHOTS):
        fail(errors, "listing media manifest must contain exactly four assets")
        return

    for index, (asset, declared_path, view) in enumerate(
        zip(assets, EXPECTED_SCREENSHOTS, EXPECTED_SCREENSHOT_VIEWS, strict=True), start=1
    ):
        if not isinstance(asset, dict):
            fail(errors, f"listing media asset {index} must be an object")
            continue
        expected_filename = Path(declared_path).name
        expected_fields = {
            "order": index,
            "view": view,
            "filename": expected_filename,
            "dimensions": EXPECTED_SCREENSHOT_SIZE,
        }
        for field, value in expected_fields.items():
            if asset.get(field) != value:
                fail(errors, f"listing media asset {index} {field} must be {value!r}")

        path = PLUGIN_ROOT / declared_path.removeprefix("./")
        if not path.is_file():
            fail(errors, f"missing Codex screenshot: {declared_path}")
            continue
        data = path.read_bytes()
        if len(data) < 24 or data[:8] != b"\x89PNG\r\n\x1a\n" or data[12:16] != b"IHDR":
            fail(errors, f"invalid PNG screenshot: {declared_path}")
            continue
        width, height = struct.unpack(">II", data[16:24])
        if {"width": width, "height": height} != EXPECTED_SCREENSHOT_SIZE:
            fail(errors, f"Codex screenshot must be 1600x1000: {declared_path}")
        digest = hashlib.sha256(data).hexdigest()
        if asset.get("sha256") != digest:
            fail(errors, f"listing media checksum mismatch: {declared_path}")


def main() -> int:
    errors: list[str] = []

    codex_manifest = load_json(errors, CODEX_MANIFEST_PATH)
    claude_manifest = load_json(errors, CLAUDE_MANIFEST_PATH)
    mcp_config = load_json(errors, MCP_CONFIG_PATH)
    listing_media_manifest = load_json(errors, LISTING_MEDIA_MANIFEST_PATH)
    codex_marketplace = load_json(errors, CODEX_MARKETPLACE_PATH)
    claude_marketplace = load_json(errors, CLAUDE_MARKETPLACE_PATH)
    lock = load_json(errors, LOCK_PATH)

    validate_shared_metadata(errors, codex_manifest, claude_manifest)
    validate_marketplaces(errors, codex_marketplace, claude_marketplace)
    validate_listing_media(errors, listing_media_manifest)
    if mcp_config != EXPECTED_MCP_CONFIG:
        fail(errors, f".mcp.json must contain exactly {EXPECTED_MCP_CONFIG!r}")

    actual_root_entries = {path.name for path in PLUGIN_ROOT.iterdir()}
    unexpected_root_entries = sorted(actual_root_entries - EXPECTED_PLUGIN_ROOT_ENTRIES)
    missing_root_entries = sorted(EXPECTED_PLUGIN_ROOT_ENTRIES - actual_root_entries)
    if unexpected_root_entries:
        fail(errors, f"undeclared plugin-root entries: {', '.join(unexpected_root_entries)}")
    if missing_root_entries:
        fail(errors, f"missing plugin-root entries: {', '.join(missing_root_entries)}")

    for component in FORBIDDEN_ROOT_COMPONENTS:
        if (PLUGIN_ROOT / component).exists():
            fail(errors, f"0.3.0 permits only its declared MCP surface; unexpected {component} found")

    skill_dirs = sorted(
        path.parent for path in SKILLS_ROOT.glob("*/SKILL.md") if path.is_file()
    )
    expected_count = lock.get("installedSkillFolderCount")
    if expected_count != 37:
        fail(errors, f"source lock installedSkillFolderCount must be 37, found {expected_count!r}")
    if len(skill_dirs) != expected_count:
        fail(errors, f"expected {expected_count} skill folders, found {len(skill_dirs)}")
    if not (SKILLS_ROOT / "diagnose-brand-growth" / "SKILL.md").exists():
        fail(errors, "diagnose-brand-growth router is missing")

    source_skills: set[str] = set()
    sources = lock.get("sources")
    if not isinstance(sources, list) or len(sources) != 6:
        fail(errors, "source lock must contain exactly six specialist repositories")
    else:
        for source in sources:
            if not isinstance(source, dict):
                fail(errors, "every source lock entry must be an object")
                continue
            skills = source.get("skills")
            shared_skills = source.get("sharedSkills", [])
            if not isinstance(skills, list) or not all(isinstance(item, str) for item in skills):
                fail(errors, f"invalid skill list for source {source.get('name')!r}")
                continue
            if not isinstance(shared_skills, list) or not all(isinstance(item, str) for item in shared_skills):
                fail(errors, f"invalid shared skill list for source {source.get('name')!r}")
                continue
            source_skills.update(skills)
            source_skills.update(shared_skills)

    expected_skill_names = source_skills | {"diagnose-brand-growth"}
    actual_skill_names = {path.name for path in skill_dirs}
    if actual_skill_names != expected_skill_names:
        missing = sorted(expected_skill_names - actual_skill_names)
        unexpected = sorted(actual_skill_names - expected_skill_names)
        if missing:
            fail(errors, f"source-locked skills missing from bundle: {', '.join(missing)}")
        if unexpected:
            fail(errors, f"skills not declared in source lock: {', '.join(unexpected)}")

    for path in PLUGIN_ROOT.rglob("*"):
        if path.is_symlink():
            fail(errors, f"symlinks are not allowed in the distributable: {path}")

    for skill_dir in skill_dirs:
        skill_file = skill_dir / "SKILL.md"
        text = skill_file.read_text(encoding="utf-8")
        name_match = re.search(r"^name:\s*([^\n]+)$", text, re.MULTILINE)
        if not name_match or name_match.group(1).strip() != skill_dir.name:
            fail(errors, f"skill name does not match folder: {skill_dir.name}")
        if (skill_dir / "README.md").exists():
            fail(errors, f"extraneous README in skill folder: {skill_dir.name}")

        for file_path in skill_dir.rglob("*"):
            if not file_path.is_file():
                continue
            try:
                file_text = file_path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue
            for label, pattern in FORBIDDEN_SKILL_PATTERNS.items():
                if pattern.search(file_text):
                    fail(errors, f"{label} in {file_path.relative_to(PLUGIN_ROOT)}")
            for label, pattern in FORBIDDEN_PUBLIC_CLAIMS.items():
                if pattern.search(file_text):
                    fail(errors, f"{label} in {file_path.relative_to(PLUGIN_ROOT)}")

    if errors:
        print("8gnc bundle validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "8gnc bundle validation passed: "
        f"{len(skill_dirs)} skill folders, Claude marketplace skills-only, "
        "Codex exact single MCP declaration, provider-neutral skills"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
