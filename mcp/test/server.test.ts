import { Client, InMemoryTransport } from "@modelcontextprotocol/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  create8gncServer,
  MCP_APP_MIME_TYPE,
  WORKING_DIAGNOSIS_TOOL_NAME,
  WORKING_DIAGNOSIS_UI_URI
} from "../src/server";

describe("8gnc MCP contract", () => {
  let client: Client;
  let server: ReturnType<typeof create8gncServer>;

  beforeEach(async () => {
    client = new Client({ name: "8gnc-test", version: "1.0.0" });
    server = create8gncServer();
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  });

  afterEach(async () => {
    await Promise.all([client.close(), server.close()]);
  });

  it("advertises exactly one read-only, closed-world tool", async () => {
    const { tools } = await client.listTools();
    expect(tools).toHaveLength(1);
    expect(tools[0]).toMatchObject({
      name: WORKING_DIAGNOSIS_TOOL_NAME,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      },
      _meta: {
        ui: { resourceUri: WORKING_DIAGNOSIS_UI_URI },
        "openai/outputTemplate": WORKING_DIAGNOSIS_UI_URI
      }
    });
  });

  it("advertises and serves exactly one MCP App resource", async () => {
    const { resources } = await client.listResources();
    expect(resources).toHaveLength(1);
    expect(resources[0]).toMatchObject({
      uri: WORKING_DIAGNOSIS_UI_URI,
      mimeType: MCP_APP_MIME_TYPE
    });

    const result = await client.readResource({ uri: WORKING_DIAGNOSIS_UI_URI });
    expect(result.contents).toHaveLength(1);
    expect(result.contents[0]).toMatchObject({
      uri: WORKING_DIAGNOSIS_UI_URI,
      mimeType: MCP_APP_MIME_TYPE
    });
    expect("text" in result.contents[0]! ? result.contents[0].text : "").toContain("<!doctype html>");
  });

  it("returns matching structured content and a complete text fallback", async () => {
    const result = await client.callTool({
      name: WORKING_DIAGNOSIS_TOOL_NAME,
      arguments: {
        schemaVersion: "1.0",
        status: "working",
        input: { summary: "Qualified traffic grows while consultation starts stay flat." },
        primaryConstraint: "Offer clarity is the likeliest current constraint.",
        primaryConstraintEvidenceIds: ["august-funnel"],
        confidence: "medium",
        evidence: [
          {
            id: "august-funnel",
            kind: "observed",
            statement: "Qualified sessions rose while consultation starts stayed flat.",
            provenance: "Owner-supplied August funnel export.",
            asOf: "2026-08-31"
          }
        ],
        inferences: [
          {
            statement: "Visibility is less likely to be the primary constraint.",
            basedOnEvidenceIds: ["august-funnel"]
          }
        ],
        unknowns: ["Can visitors explain what happens after the initial call?"],
        route: {
          steps: [
            {
              method: "ux-ui-psych",
              purpose: "Test whether the next decision is legible."
            }
          ],
          firstMove: "Review the offer page against recent prospect questions."
        },
        artifact: {
          title: "Homepage decision map",
          method: "ux-ui-psych",
          summary: "One guided entry point and the proof that belongs around it.",
          items: [
            {
              label: "Before the first CTA",
              detail: "Show one buyer problem and one recommended offer.",
              basedOnEvidenceIds: ["august-funnel"]
            },
            {
              label: "After the first CTA",
              detail: "Explain fit and the engagement before booking.",
              basedOnEvidenceIds: ["august-funnel"]
            },
            {
              label: "Work to hold",
              detail: "Hold acquisition expansion until the choice is tested.",
              basedOnEvidenceIds: ["august-funnel"]
            }
          ]
        },
        decisionGate: {
          required: true,
          question: "Do you want to test offer clarity first?"
        }
      }
    });

    expect(result.isError).not.toBe(true);
    const structured = result.structuredContent as {
      diagnosis: { status: string; artifact?: { title: string } };
      markdown: string;
    };
    expect(structured.diagnosis.status).toBe("working");
    expect(structured.diagnosis.artifact?.title).toBe("Homepage decision map");
    expect(structured.markdown).toContain("# Working Diagnosis");
    expect(structured.markdown).toContain("## Specialist artifact");
    expect(result.content[0]).toEqual({ type: "text", text: structured.markdown });
  });

  it("rejects malformed evidence before the renderer runs", async () => {
    const result = await client.callTool({
      name: WORKING_DIAGNOSIS_TOOL_NAME,
      arguments: {
        schemaVersion: "1.0",
        status: "working",
        input: { summary: "We think conversion is weak." }
      }
    });

    expect(result.isError).toBe(true);
  });
});
