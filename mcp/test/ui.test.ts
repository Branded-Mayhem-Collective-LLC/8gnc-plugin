import { describe, expect, it } from "vitest";

import { WORKING_DIAGNOSIS_UI } from "../src/ui";

describe("Working Diagnosis React MCP App bundle", () => {
  it("is a complete self-contained HTML document generated from the React interface", () => {
    expect(WORKING_DIAGNOSIS_UI).toContain("<!doctype html>");
    expect(WORKING_DIAGNOSIS_UI).toContain('id="8gnc-working-diagnosis-root"');
    expect(WORKING_DIAGNOSIS_UI).toContain("Brand Growth Diagnostic");
    expect(WORKING_DIAGNOSIS_UI).toContain("data:font/woff2;base64,");
    expect(WORKING_DIAGNOSIS_UI).not.toMatch(/<(?:link|script)[^>]+src=["']https?:/i);
    expect(WORKING_DIAGNOSIS_UI).not.toMatch(/<link[^>]+href=["']https?:/i);
  });

  it("contains one focused diagnosis, one next move, and progressive detail", () => {
    const content = WORKING_DIAGNOSIS_UI.toLowerCase();
    expect(content).toContain("working diagnosis");
    expect(content).toContain("first move");
    expect(content).toContain("why this diagnosis");
    expect(content).toContain("use this route");
    expect(content).toContain("challenge it");
    expect(WORKING_DIAGNOSIS_UI).not.toContain("Complete text result");
    expect(WORKING_DIAGNOSIS_UI).not.toContain("wd-context");
    expect(WORKING_DIAGNOSIS_UI).not.toContain("Diagnosis stages");
  });

  it("uses the MCP Apps lifecycle and keeps the ChatGPT result alias", () => {
    expect(WORKING_DIAGNOSIS_UI).toContain("openai:set_globals");
    expect(WORKING_DIAGNOSIS_UI).toContain("ui/initialize");
    expect(WORKING_DIAGNOSIS_UI).toContain("ui/notifications/initialized");
    expect(WORKING_DIAGNOSIS_UI).toContain("ui/notifications/tool-result");
    expect(WORKING_DIAGNOSIS_UI).toContain("ui/notifications/size-changed");
    expect(WORKING_DIAGNOSIS_UI).toContain("ui/message");
    expect(WORKING_DIAGNOSIS_UI).toContain("structuredContent");
    expect(WORKING_DIAGNOSIS_UI).toContain("window.parent");
  });

  it("contains no application network, storage, form, or external mutation capability", () => {
    const forbidden = [
      "XMLHttpRequest",
      "WebSocket",
      "EventSource",
      "localStorage",
      "sessionStorage",
      "document.cookie",
      "sendFollowUpMessage",
      "callTool",
      'method:"tools/call"',
      "navigator.userAgent",
      'src="http',
      'href="http',
      "<form",
    ];

    forbidden.forEach((value) => expect(WORKING_DIAGNOSIS_UI).not.toContain(value));
  });

  it("uses accessible library controls, focus treatment, and one responsive breakpoint", () => {
    expect(WORKING_DIAGNOSIS_UI).toContain("aria-expanded");
    expect(WORKING_DIAGNOSIS_UI).toContain(":focus-visible");
    expect(WORKING_DIAGNOSIS_UI).toContain("max-width:580px");
    expect(WORKING_DIAGNOSIS_UI).toContain("prefers-reduced-motion:reduce");
  });
});
