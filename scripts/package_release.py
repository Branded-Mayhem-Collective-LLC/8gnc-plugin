#!/usr/bin/env python3
"""Build a deterministic, audited 8gnc OpenAI plugin archive."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
import zipfile
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
PLUGIN_ROOT = REPO_ROOT / "plugins" / "8gnc"
CODEX_MANIFEST = PLUGIN_ROOT / ".codex-plugin" / "plugin.json"
DIST_ROOT = REPO_ROOT / "dist"
EXPECTED_MCP_CONFIG = {
    "mcpServers": {"eightgnc": {"type": "http", "url": "https://mcp.8gnc.io/mcp"}}
}
EXPECTED_TOP_LEVEL = {
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
FORBIDDEN_FILENAMES = {
    ".env",
    ".env.local",
    ".env.production",
    "credentials.json",
    "id_rsa",
    "id_ed25519",
}
FORBIDDEN_SUFFIXES = {".key", ".p12", ".pfx", ".pem"}
PRIVATE_PATH_PATTERNS = (
    re.compile(r"/Users/"),
    re.compile(r"/Volumes/DriveB/"),
    re.compile(r"/home/michael/"),
)
FORBIDDEN_PATH_PARTS = {
    "client-data",
    "client-material",
    "clients",
    "customer-data",
    "prospects",
    "proposals",
}
KNOWN_PRIVATE_MATERIAL_PATTERNS = {
    "known client name": re.compile(r"\b(?:ANDRES|Moon Wolf|Rendon|EOSERA|Carrco)\b", re.IGNORECASE),
    "private system name": re.compile(r"\b(?:mlbrain|bmc-data-[0-9]+|Opelia-Convex)\b", re.IGNORECASE),
}
SECRET_PATTERNS = {
    "private key": re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
    "AWS access key": re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    "GitHub token": re.compile(r"\bgh[pousr]_[A-Za-z0-9_]{20,}\b"),
    "OpenAI-style secret": re.compile(r"\bsk-[A-Za-z0-9_-]{20,}\b"),
    "Slack token": re.compile(r"\bxox[baprs]-[A-Za-z0-9-]{20,}\b"),
    "literal production token": re.compile(r"\b(?:DOPPLER_TOKEN|CF_API_TOKEN)\s*=\s*[^\s${][^\s]*"),
}
FIXED_TIMESTAMP = (1980, 1, 1, 0, 0, 0)


def fail(message: str) -> None:
    print(f"release packaging failed: {message}", file=sys.stderr)
    raise SystemExit(1)


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def require_clean_tree() -> None:
    result = subprocess.run(
        ["git", "status", "--porcelain=v1", "--untracked-files=all"],
        cwd=REPO_ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    if result.stdout.strip():
        fail("tracked source must be committed and the worktree must be clean")


def collect_files() -> list[Path]:
    actual_top_level = {path.name for path in PLUGIN_ROOT.iterdir()}
    unexpected = sorted(actual_top_level - EXPECTED_TOP_LEVEL)
    missing = sorted(EXPECTED_TOP_LEVEL - actual_top_level)
    if unexpected:
        fail(f"unexpected plugin-root entries: {', '.join(unexpected)}")
    if missing:
        fail(f"missing plugin-root entries: {', '.join(missing)}")

    files: list[Path] = []
    for path in sorted(PLUGIN_ROOT.rglob("*"), key=lambda item: item.as_posix()):
        relative = path.relative_to(PLUGIN_ROOT)
        if path.is_symlink():
            fail(f"symlink is not allowed: {relative}")
        if path.is_dir():
            continue
        if path.name in FORBIDDEN_FILENAMES or path.suffix.lower() in FORBIDDEN_SUFFIXES:
            fail(f"sensitive filename is not allowed: {relative}")
        if any(part.lower() in FORBIDDEN_PATH_PARTS for part in relative.parts):
            fail(f"client-material path is not allowed: {relative}")

        data = path.read_bytes()
        try:
            text = data.decode("utf-8")
        except UnicodeDecodeError:
            text = ""
        if text:
            for pattern in PRIVATE_PATH_PATTERNS:
                if pattern.search(text):
                    fail(f"private absolute path found in {relative}")
            for label, pattern in SECRET_PATTERNS.items():
                if pattern.search(text):
                    fail(f"possible {label} found in {relative}")
            for label, pattern in KNOWN_PRIVATE_MATERIAL_PATTERNS.items():
                if pattern.search(text):
                    fail(f"possible {label} found in {relative}")
        files.append(path)
    return files


def write_archive(files: list[Path], version: str) -> tuple[Path, list[dict[str, object]]]:
    DIST_ROOT.mkdir(exist_ok=True)
    archive_path = DIST_ROOT / f"8gnc-{version}-openai.zip"
    entries: list[dict[str, object]] = []

    with zipfile.ZipFile(archive_path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path in files:
            relative = path.relative_to(PLUGIN_ROOT).as_posix()
            data = path.read_bytes()
            info = zipfile.ZipInfo(relative, FIXED_TIMESTAMP)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.create_system = 3
            mode = 0o755 if path.stat().st_mode & 0o111 else 0o644
            info.external_attr = mode << 16
            archive.writestr(info, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
            entries.append({
                "path": relative,
                "bytes": len(data),
                "sha256": sha256_bytes(data),
            })

    with zipfile.ZipFile(archive_path, "r") as archive:
        archived_names = archive.namelist()
        expected_names = [entry["path"] for entry in entries]
        if archived_names != expected_names:
            fail("archive file order or contents do not match the source manifest")
        for entry in entries:
            if sha256_bytes(archive.read(str(entry["path"]))) != entry["sha256"]:
                fail(f"archive parity check failed for {entry['path']}")

    return archive_path, entries


def main() -> int:
    require_clean_tree()
    manifest = json.loads(CODEX_MANIFEST.read_text(encoding="utf-8"))
    version = manifest.get("version")
    if not isinstance(version, str) or not re.fullmatch(r"\d+\.\d+\.\d+", version):
        fail("Codex manifest version must be strict semver")

    if manifest.get("mcpServers") != "./.mcp.json":
        fail("Codex manifest must point mcpServers to ./.mcp.json")
    mcp_config = json.loads((PLUGIN_ROOT / ".mcp.json").read_text(encoding="utf-8"))
    if mcp_config != EXPECTED_MCP_CONFIG:
        fail(".mcp.json does not match the exact approved 8gnc server declaration")

    files = collect_files()
    archive_path, entries = write_archive(files, version)
    archive_hash = sha256_bytes(archive_path.read_bytes())
    manifest_path = DIST_ROOT / f"8gnc-{version}-manifest.json"
    checksum_path = DIST_ROOT / f"8gnc-{version}-sha256.txt"
    manifest_path.write_text(
        json.dumps(
            {
                "plugin": "8gnc",
                "version": version,
                "archive": archive_path.name,
                "archiveSha256": archive_hash,
                "files": entries,
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    checksum_path.write_text(f"{archive_hash}  {archive_path.name}\n", encoding="utf-8")

    print(f"wrote {archive_path}")
    print(f"wrote {manifest_path}")
    print(f"wrote {checksum_path}")
    print(f"packaged {len(entries)} files; archive sha256 {archive_hash}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
