import { McpServer } from "@modelcontextprotocol/server";

import { renderWorkingDiagnosisMarkdown } from "./markdown";
import {
  normalizeWorkingDiagnosis,
  WorkingDiagnosisResultV1Schema,
  WorkingDiagnosisV1Schema
} from "./schema";
import { WORKING_DIAGNOSIS_UI } from "./ui";

export const WORKING_DIAGNOSIS_TOOL_NAME = "render_working_diagnosis" as const;
export const WORKING_DIAGNOSIS_UI_URI = "ui://8gnc/working-diagnosis/v1.html" as const;
export const MCP_APP_MIME_TYPE = "text/html;profile=mcp-app" as const;

const UI_META = {
  ui: {
    prefersBorder: true,
    csp: {
      connectDomains: [],
      resourceDomains: []
    }
  },
  "openai/widgetDescription":
    "A read-only 8gnc case file that presents supplied evidence, the working constraint, open questions, and the smallest useful route.",
  "openai/widgetPrefersBorder": true,
  "openai/widgetCSP": {
    connect_domains: [],
    resource_domains: []
  }
} as const;

export function create8gncServer(): McpServer {
  const server = new McpServer(
    {
      name: "8gnc-working-diagnosis",
      version: "0.3.0"
    },
    {
      instructions:
        "Use the installed 8gnc skills to complete the diagnosis before calling render_working_diagnosis. Supply only evidence-backed observations and clearly labeled inferences. If required provenance or a valid as-of date is missing, return status 'blocked'. The renderer validates and presents a supplied diagnosis; it does not originate the diagnosis or decide whether it is correct."
    }
  );

  server.registerResource(
    "working-diagnosis-interface",
    WORKING_DIAGNOSIS_UI_URI,
    {
      title: "8gnc Working Diagnosis",
      description: "Read-only interface for a supplied WorkingDiagnosisV1 result.",
      mimeType: MCP_APP_MIME_TYPE,
      _meta: UI_META
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: MCP_APP_MIME_TYPE,
          text: WORKING_DIAGNOSIS_UI,
          _meta: UI_META
        }
      ]
    })
  );

  server.registerTool(
    WORKING_DIAGNOSIS_TOOL_NAME,
    {
      title: "Render Working Diagnosis",
      description:
        "Validate and present an already-completed 8gnc WorkingDiagnosisV1. This renderer does not diagnose, research, fetch, contact, store, publish, send, approve, or change anything. Use status 'blocked' when required provenance or a valid as-of date is missing.",
      inputSchema: WorkingDiagnosisV1Schema,
      outputSchema: WorkingDiagnosisResultV1Schema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      },
      _meta: {
        ui: { resourceUri: WORKING_DIAGNOSIS_UI_URI },
        "openai/outputTemplate": WORKING_DIAGNOSIS_UI_URI,
        "openai/toolInvocation/invoking": "Rendering the working diagnosis…",
        "openai/toolInvocation/invoked": "Working diagnosis ready."
      }
    },
    async (input) => {
      const diagnosis = normalizeWorkingDiagnosis(input);
      const markdown = renderWorkingDiagnosisMarkdown(diagnosis);
      const result = WorkingDiagnosisResultV1Schema.parse({ diagnosis, markdown });

      return {
        content: [{ type: "text", text: markdown }],
        structuredContent: result
      };
    }
  );

  return server;
}
