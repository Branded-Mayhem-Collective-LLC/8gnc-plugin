import { describe, expect, it } from "vitest";

import { WORKING_DIAGNOSIS_UI } from "../src/ui";

describe("Working Diagnosis MCP Apps UI", () => {
  it("contains the approved 8gnc interface copy and all four views", () => {
    expect(WORKING_DIAGNOSIS_UI).toContain("Find the constraint before you buy the tactic.");
    expect(WORKING_DIAGNOSIS_UI).toContain("Start a working diagnosis");
    expect(WORKING_DIAGNOSIS_UI).toContain("Working Diagnosis");
    expect(WORKING_DIAGNOSIS_UI).toContain(
      "Evidence-backed. Read-only. Nothing changes until you decide.",
    );
    expect(WORKING_DIAGNOSIS_UI).toContain(
      "Evidence threshold not met. Read-only. Nothing changes until you decide.",
    );
    expect(WORKING_DIAGNOSIS_UI).toContain(
      "Presents evidence supplied by the host, which may include lawful public sources. The renderer does not fetch sources or access CRM, email, publishing, or private systems.",
    );
    expect(WORKING_DIAGNOSIS_UI).toContain("diagnosis.primaryConstraintEvidenceIds");
    expect(WORKING_DIAGNOSIS_UI.match(/<section class="panel"[^>]*role="tabpanel"/g)).toHaveLength(4);
    expect(WORKING_DIAGNOSIS_UI).toContain('data-view="input"');
    expect(WORKING_DIAGNOSIS_UI).toContain('data-view="diagnosis"');
    expect(WORKING_DIAGNOSIS_UI).toContain('data-view="route"');
    expect(WORKING_DIAGNOSIS_UI).toContain('data-view="fallback"');
  });

  it("uses the portable MCP Apps result notification and guarded compatibility fallback", () => {
    expect(WORKING_DIAGNOSIS_UI).toContain('message.method !== "ui/notifications/tool-result"');
    expect(WORKING_DIAGNOSIS_UI).toContain("message.params && message.params.structuredContent");
    expect(WORKING_DIAGNOSIS_UI).toContain("event.source !== window.parent");
    expect(WORKING_DIAGNOSIS_UI).toContain("window.openai && window.openai.toolOutput");
  });

  it("renders untrusted result fields without HTML injection sinks", () => {
    expect(WORKING_DIAGNOSIS_UI).toContain(".textContent =");
    expect(WORKING_DIAGNOSIS_UI).not.toContain(".innerHTML");
    expect(WORKING_DIAGNOSIS_UI).not.toContain("insertAdjacentHTML");
    expect(WORKING_DIAGNOSIS_UI).not.toContain("document.write");
    expect(WORKING_DIAGNOSIS_UI).not.toContain("eval(");
  });

  it("contains no network, durable storage, mutation, or host-specific behavior", () => {
    const forbidden = [
      "fetch(",
      "XMLHttpRequest",
      "WebSocket",
      "EventSource",
      "localStorage",
      "sessionStorage",
      "document.cookie",
      "sendFollowUpMessage",
      "callTool",
      'method: "tools/call"',
      "ui/message",
      "navigator.userAgent",
      "window.location",
      'src="http',
      'href="http',
      "<form",
    ];

    forbidden.forEach((value) => {
      expect(WORKING_DIAGNOSIS_UI).not.toContain(value);
    });
  });

  it("supports working, blocked, and unsupported statuses without inventing data", () => {
    expect(WORKING_DIAGNOSIS_UI).toContain('diagnosis.status === "working"');
    expect(WORKING_DIAGNOSIS_UI).toContain('diagnosis.status === "blocked"');
    expect(WORKING_DIAGNOSIS_UI).toContain("This interface can only present a working or blocked diagnosis.");
    expect(WORKING_DIAGNOSIS_UI).toContain("No evidence records supplied.");
    expect(WORKING_DIAGNOSIS_UI).toContain("No inferences supplied.");
    expect(WORKING_DIAGNOSIS_UI).toContain("No method sequence supplied.");
  });

  it("includes keyboard tabs, focus treatment, responsive layout, and reduced motion", () => {
    expect(WORKING_DIAGNOSIS_UI).toContain('role="tablist"');
    expect(WORKING_DIAGNOSIS_UI).toContain('aria-selected="true"');
    expect(WORKING_DIAGNOSIS_UI).toContain('event.key === "ArrowRight"');
    expect(WORKING_DIAGNOSIS_UI).toContain('event.key === "ArrowLeft"');
    expect(WORKING_DIAGNOSIS_UI).toContain('event.key === "Home"');
    expect(WORKING_DIAGNOSIS_UI).toContain('event.key === "End"');
    expect(WORKING_DIAGNOSIS_UI).toContain(":focus-visible");
    expect(WORKING_DIAGNOSIS_UI).toContain("@media (max-width: 680px)");
    expect(WORKING_DIAGNOSIS_UI).toContain("@media (pointer: coarse)");
    expect(WORKING_DIAGNOSIS_UI).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
