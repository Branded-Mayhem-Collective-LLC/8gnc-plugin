import { createMcpHandler } from "agents/mcp/server";

import { create8gncServer } from "./server";

function parseHostnameList(value: string | undefined): string[] | undefined {
  const hostnames = value
    ?.split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);
  return hostnames?.length ? hostnames : undefined;
}

export default {
  fetch(request: Request, env: Env, context: ExecutionContext): Promise<Response> {
    const allowedHostnames = parseHostnameList(env.MCP_ALLOWED_HOSTNAMES);
    const allowedOriginHostnames = parseHostnameList(env.MCP_ALLOWED_ORIGIN_HOSTNAMES);

    const handler = createMcpHandler(create8gncServer, {
      route: "/mcp",
      legacy: "stateless",
      responseMode: "auto",
      corsOptions: { origin: "*" },
      ...(allowedHostnames ? { allowedHostnames } : {}),
      ...(allowedOriginHostnames ? { allowedOriginHostnames } : {})
    });

    return handler(request, env, context);
  }
} satisfies ExportedHandler<Env>;
