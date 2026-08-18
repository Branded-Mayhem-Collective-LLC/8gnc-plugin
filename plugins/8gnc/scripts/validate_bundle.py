#!/usr/bin/env python3
"""Validate the additive 8gnc skills-only package without network access."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


PLUGIN_ROOT = Path(__file__).resolve().parents[1]
SKILLS_ROOT = PLUGIN_ROOT / "skills"
LOCK_PATH = PLUGIN_ROOT / "sources.lock.json"
MANIFEST_PATH = PLUGIN_ROOT / ".codex-plugin" / "plugin.json"

FORBIDDEN_SKILL_PATTERNS = {
    "Claude-specific language": re.compile(r"claude|anthropic|\.claude", re.IGNORECASE),
    "Claude hook dependency": re.compile(r"SessionStart|PostToolUse|Cowork"),
    "Claude runtime variable": re.compile(r"CLAUDE_PLUGIN_(?:ROOT|DATA|OPTION)"),
    "legacy namespaced command": re.compile(
        r"/(?:brandprint-engine|productprint-engine|content-creative-lab):"
    ),
    "retired Contraband brand": re.compile(r"contraband", re.IGNORECASE),
}


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def main() -> int:
    errors: list[str] = []

    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    lock = json.loads(LOCK_PATH.read_text(encoding="utf-8"))

    if manifest.get("name") != "8gnc":
        fail(errors, "plugin manifest name must be 8gnc")
    if manifest.get("skills") != "./skills/":
        fail(errors, "plugin manifest skills path must be ./skills/")
    if (PLUGIN_ROOT / ".mcp.json").exists():
        fail(errors, "v0.1.0 must remain skills-only; unexpected .mcp.json found")
    if (PLUGIN_ROOT / "hooks").exists():
        fail(errors, "v0.1.0 core behavior must not depend on hooks")

    skill_dirs = sorted(
        path.parent for path in SKILLS_ROOT.glob("*/SKILL.md") if path.is_file()
    )
    expected_count = lock.get("installedSkillFolderCount")
    if len(skill_dirs) != expected_count:
        fail(errors, f"expected {expected_count} skill folders, found {len(skill_dirs)}")
    if not (SKILLS_ROOT / "diagnose-brand-growth" / "SKILL.md").exists():
        fail(errors, "diagnose-brand-growth router is missing")

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

    if errors:
        print("8gnc bundle validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "8gnc bundle validation passed: "
        f"{len(skill_dirs)} skill folders, skills-only, provider-neutral"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
