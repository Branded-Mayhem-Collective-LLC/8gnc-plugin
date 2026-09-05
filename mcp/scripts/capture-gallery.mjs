#!/usr/bin/env node

import { execFile, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { constants, createReadStream } from "node:fs";
import { access, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { build } from "esbuild";

const WIDTH = 1600;
const HEIGHT = 1000;
const DEVICE_SCALE_FACTOR = 1;
const CAPTURES = [
  { view: "diagnosis", triggerId: null, scrollTargetId: null },
  { view: "evidence", triggerId: "wd-trigger-reasoning", scrollTargetId: "wd-trigger-reasoning" },
  { view: "output", triggerId: "wd-trigger-output", scrollTargetId: "wd-trigger-output" },
  { view: "blocked", triggerId: null, scrollTargetId: null, fixture: "blocked" }
];

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "../..");
const uiSourcePath = join(repositoryRoot, "mcp/src/ui.ts");
const fixturePath = join(repositoryRoot, "mcp/fixtures/gallery-working-diagnosis.json");
const assetsDirectory = join(repositoryRoot, "plugins/8gnc/assets");
const manifestPath = join(assetsDirectory, "canonical-ui-capture-manifest.json");
const execFileAsync = promisify(execFile);

function chromeCandidates() {
  const pathCandidates = (process.env.PATH || "")
    .split(":")
    .filter(Boolean)
    .flatMap((directory) => ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"].map((name) => join(directory, name)));

  return [
    process.env.CHROME_BIN,
    process.env.CHROMIUM_BIN,
    ...pathCandidates,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium"
  ].filter(Boolean);
}

async function resolveChrome() {
  for (const candidate of chromeCandidates()) {
    try {
      await access(candidate, constants.X_OK);
      return candidate;
    } catch {
      // Try the next explicit or system candidate.
    }
  }
  throw new Error(
    "No Chrome or Chromium executable found. Set CHROME_BIN (recommended) or CHROMIUM_BIN to an executable path."
  );
}

async function sha256File(path) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest("hex");
}

async function loadMarkdownRenderer() {
  const buildResult = await build({
    entryPoints: [join(repositoryRoot, "mcp/src/markdown.ts")],
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node22",
    write: false
  });
  const output = buildResult.outputFiles && buildResult.outputFiles[0];
  if (!output) throw new Error("Could not compile the runtime Markdown renderer");
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(output.contents).toString("base64")}`;
  const rendererModule = await import(moduleUrl);
  if (typeof rendererModule.renderWorkingDiagnosisMarkdown !== "function") {
    throw new Error("Compiled Markdown module does not export renderWorkingDiagnosisMarkdown");
  }
  return rendererModule.renderWorkingDiagnosisMarkdown;
}

function extractWorkingDiagnosisUi(source) {
  const prefix = "export const WORKING_DIAGNOSIS_UI = ";
  const suffix = ";";
  const start = source.indexOf(prefix);
  const end = source.lastIndexOf(suffix);

  if (start < 0 || end < start) {
    throw new Error("Could not extract WORKING_DIAGNOSIS_UI from mcp/src/ui.ts");
  }

  const html = JSON.parse(source.slice(start + prefix.length, end));
  if (typeof html !== "string" || !html.startsWith("<!doctype html>")) {
    throw new Error("WORKING_DIAGNOSIS_UI must be a JSON-encoded HTML string");
  }
  return html;
}

function pngDimensions(buffer) {
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    throw new Error("Capture is not a PNG");
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function waitForDebuggerUrl(process, timeoutMs = 15_000) {
  return new Promise((resolvePromise, rejectPromise) => {
    let stderr = "";
    const timeout = setTimeout(() => {
      rejectPromise(new Error(`Chrome did not expose DevTools within ${timeoutMs}ms\n${stderr}`));
    }, timeoutMs);

    process.stderr.setEncoding("utf8");
    process.stderr.on("data", (chunk) => {
      stderr += chunk;
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timeout);
        resolvePromise(match[1]);
      }
    });
    process.once("exit", (code) => {
      clearTimeout(timeout);
      rejectPromise(new Error(`Chrome exited before capture with code ${code}\n${stderr}`));
    });
  });
}

async function connectCdp(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  const pending = new Map();
  let nextId = 0;

  await new Promise((resolvePromise, rejectPromise) => {
    socket.addEventListener("open", resolvePromise, { once: true });
    socket.addEventListener("error", rejectPromise, { once: true });
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data));
    if (!message.id || !pending.has(message.id)) return;
    const { resolve: resolveCall, reject: rejectCall } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) rejectCall(new Error(JSON.stringify(message.error)));
    else resolveCall(message.result ?? {});
  });

  function send(method, params = {}) {
    const id = ++nextId;
    return new Promise((resolveCall, rejectCall) => {
      pending.set(id, { resolve: resolveCall, reject: rejectCall });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }

  return { send, close: () => socket.close() };
}

async function waitForExpression(cdp, expression, timeoutMs = 5_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const result = await cdp.send("Runtime.evaluate", {
      expression,
      returnByValue: true
    });
    if (result.result && result.result.value === true) return;
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 50));
  }
  throw new Error(`Timed out waiting for browser expression: ${expression}`);
}

async function stopProcess(process) {
  if (process.exitCode !== null || process.signalCode !== null) return;
  await new Promise((resolvePromise) => {
    const forceTimer = setTimeout(() => process.kill("SIGKILL"), 5_000);
    process.once("exit", () => {
      clearTimeout(forceTimer);
      resolvePromise();
    });
    process.kill("SIGTERM");
  });
}

async function run() {
  const [uiSource, fixtureSource] = await Promise.all([
    readFile(uiSourcePath, "utf8"),
    readFile(fixturePath, "utf8")
  ]);
  const html = extractWorkingDiagnosisUi(uiSource);
  const fixtureInput = JSON.parse(fixtureSource);
  const renderWorkingDiagnosisMarkdown = await loadMarkdownRenderer();
  const fixture = {
    diagnosis: fixtureInput.diagnosis,
    markdown: renderWorkingDiagnosisMarkdown(fixtureInput.diagnosis)
  };
  const blockedDiagnosis = {
    schemaVersion: "1.0",
    status: "blocked",
    input: {
      summary: "Synthetic example: a studio wants to understand a drop in inquiries but has not supplied current source material."
    },
    reason: "There is not enough current evidence to name a growth constraint without guessing.",
    missingEvidence: [
      "A dated traffic-to-inquiry baseline",
      "A current offer or landing-page sample",
      "One direct source of buyer or sales feedback"
    ],
    decisionGate: {
      required: true,
      question: "Will you add one dated source so the diagnosis can continue?"
    }
  };
  const blockedFixture = {
    diagnosis: blockedDiagnosis,
    markdown: renderWorkingDiagnosisMarkdown(blockedDiagnosis)
  };
  const chromePath = await resolveChrome();
  const { stdout, stderr } = await execFileAsync(chromePath, ["--version"], { encoding: "utf8" });
  const chromeVersion = (stdout || stderr).trim();
  if (!chromeVersion) throw new Error("Chrome or Chromium did not report a version");
  const chromeSha256 = await sha256File(chromePath);
  const profileDirectory = await mkdtemp(join(tmpdir(), "8gnc-gallery-chrome-"));
  await mkdir(assetsDirectory, { recursive: true });

  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--disable-software-rasterizer",
    "--force-color-profile=srgb",
    "--font-render-hinting=none",
    "--hide-scrollbars",
    "--no-sandbox",
    "--no-default-browser-check",
    "--no-first-run",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDirectory}`,
    "about:blank"
  ], { stdio: ["ignore", "ignore", "pipe"] });

  let cdp;
  try {
    const browserWebSocketUrl = await waitForDebuggerUrl(chrome);
    const browserUrl = new URL(browserWebSocketUrl);
    const targetResponse = await fetch(
      `http://${browserUrl.host}/json/new?${encodeURIComponent("about:blank")}`,
      { method: "PUT" }
    );
    if (!targetResponse.ok) throw new Error(`Could not create Chrome target: ${targetResponse.status}`);
    const target = await targetResponse.json();
    cdp = await connectCdp(target.webSocketDebuggerUrl);

    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      mobile: false,
      screenWidth: WIDTH,
      screenHeight: HEIGHT
    });
    await cdp.send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }]
    });

    const frameTree = await cdp.send("Page.getFrameTree");
    await cdp.send("Page.setDocumentContent", {
      frameId: frameTree.frameTree.frame.id,
      html
    });
    await waitForExpression(cdp, "document.readyState === 'complete'");
    await waitForExpression(
      cdp,
      "document.getElementById('8gnc-working-diagnosis-root').children.length > 0"
    );

    const notification = {
      jsonrpc: "2.0",
      method: "ui/notifications/tool-result",
      params: { structuredContent: fixture }
    };
    await cdp.send("Runtime.evaluate", {
      expression: `window.postMessage(${JSON.stringify(notification)}, "*")`
    });
    await waitForExpression(
      cdp,
      `document.body.textContent.includes(${JSON.stringify(fixture.diagnosis.primaryConstraint)})`
    );

    const assets = [];
    for (const [index, captureSpec] of CAPTURES.entries()) {
      if (captureSpec.fixture === "blocked") {
        const blockedNotification = {
          jsonrpc: "2.0",
          method: "ui/notifications/tool-result",
          params: { structuredContent: blockedFixture }
        };
        await cdp.send("Runtime.evaluate", {
          expression: `window.postMessage(${JSON.stringify(blockedNotification)}, "*"); document.body.style.paddingBottom = "0"; window.scrollTo(0, 0)`
        });
        await waitForExpression(
          cdp,
          `document.body.textContent.includes(${JSON.stringify(blockedDiagnosis.reason)})`
        );
      }
      if (captureSpec.triggerId) {
        await cdp.send("Runtime.evaluate", {
          expression: `document.getElementById(${JSON.stringify(captureSpec.triggerId)}).click()`
        });
        await waitForExpression(
          cdp,
          `document.getElementById(${JSON.stringify(captureSpec.triggerId)}).getAttribute('aria-expanded') === 'true'`
        );
      }
      if (captureSpec.scrollTargetId) {
        await cdp.send("Runtime.evaluate", {
          expression: `(() => {
            document.body.style.paddingBottom = "600px";
            const target = document.getElementById(${JSON.stringify(captureSpec.scrollTargetId)});
            target.scrollIntoView({ block: "start" });
            window.scrollBy(0, -32);
            return true;
          })()`
        });
      }
      await cdp.send("Runtime.evaluate", {
        expression: "new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))",
        awaitPromise: true
      });

      const capture = await cdp.send("Page.captureScreenshot", {
        format: "png",
        fromSurface: true,
        captureBeyondViewport: false
      });
      const image = Buffer.from(capture.data, "base64");
      const dimensions = pngDimensions(image);
      if (dimensions.width !== WIDTH || dimensions.height !== HEIGHT) {
        throw new Error(`Unexpected ${captureSpec.view} dimensions: ${dimensions.width}x${dimensions.height}`);
      }

      const filename = `screenshot-${captureSpec.view}.png`;
      await writeFile(join(assetsDirectory, filename), image);
      assets.push({
        order: index + 1,
        view: captureSpec.view,
        filename,
        dimensions,
        sha256: createHash("sha256").update(image).digest("hex"),
        sourceFixture: "mcp/fixtures/gallery-working-diagnosis.json",
        sourceUiPath: "mcp/src/ui.ts#WORKING_DIAGNOSIS_UI",
        sourceDesignAuthority: "8gnc website React component system and shared design tokens"
      });
    }

    const manifest = {
      schemaVersion: 1,
      generatedBy: "mcp/scripts/capture-gallery.mjs",
      browser: {
        source: process.env.CHROME_BIN ? "CHROME_BIN" : process.env.CHROMIUM_BIN ? "CHROMIUM_BIN" : "system discovery",
        version: chromeVersion,
        executableSha256: chromeSha256
      },
      viewport: {
        width: WIDTH,
        height: HEIGHT,
        deviceScaleFactor: DEVICE_SCALE_FACTOR
      },
      listingOrder: CAPTURES.map(({ view }) => view),
      assets,
      futureUsage: {
        chatgptListing: "Use the four frames in this exact order: diagnosis, expanded evidence, supplied output, evidence-required state.",
        website: "Use screenshot-diagnosis.png in the 8gnc hero; place evidence, output, and blocked below the fold only when the page needs supporting product detail."
      },
      contentBoundary: "Illustrative product walkthrough, not customer results. Synthetic demonstration data only. These captures contain no private, client, CRM, or production-system data."
    };
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    process.stdout.write(`${JSON.stringify(manifest, null, 2)}\n`);
  } finally {
    if (cdp) cdp.close();
    await stopProcess(chrome);
    await rm(profileDirectory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
