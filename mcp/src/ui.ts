/**
 * Self-contained MCP Apps interface for the 8gnc Working Diagnosis.
 *
 * The resource is intentionally dependency-free: no network requests, durable
 * browser storage, host-specific branches, or write-capable bridge methods.
 */
export const WORKING_DIAGNOSIS_UI = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>Working Diagnosis</title>
  <style>
    :root {
      color-scheme: light;
      --ink: #141212;
      --paper: #f4ede1;
      --paper-deep: #e8ddce;
      --signal: #ff2e12;
      --signal-deep: #a91d0c;
      --muted: #655f58;
      --rule: rgba(20, 18, 18, 0.24);
      --rule-strong: rgba(20, 18, 18, 0.72);
      --focus: #005fcc;
      --serif: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, Georgia, serif;
      --sans: "Avenir Next", "Gill Sans", "Trebuchet MS", sans-serif;
      --mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    }

    * {
      box-sizing: border-box;
    }

    html {
      min-width: 280px;
      background: transparent;
    }

    body {
      margin: 0;
      padding: clamp(8px, 2vw, 18px);
      color: var(--ink);
      background: transparent;
      font-family: var(--sans);
      text-rendering: optimizeLegibility;
    }

    button {
      font: inherit;
    }

    .case-file {
      position: relative;
      isolation: isolate;
      width: min(100%, 920px);
      margin: 0 auto;
      overflow: hidden;
      border: 1px solid var(--rule-strong);
      border-radius: 3px;
      background:
        radial-gradient(circle at 14% 7%, rgba(255, 46, 18, 0.07), transparent 28%),
        repeating-linear-gradient(0deg, rgba(20, 18, 18, 0.018) 0 1px, transparent 1px 5px),
        var(--paper);
      box-shadow: 0 16px 42px rgba(20, 18, 18, 0.16);
      animation: file-arrival 420ms cubic-bezier(0.2, 0.75, 0.2, 1) both;
    }

    .case-file::before {
      position: absolute;
      z-index: -1;
      inset: 0 auto 0 0;
      width: 7px;
      content: "";
      background: var(--signal);
    }

    @keyframes file-arrival {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .masthead {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 20px;
      padding: clamp(22px, 5vw, 46px) clamp(20px, 5vw, 52px) 22px;
      border-bottom: 1px solid var(--rule-strong);
    }

    .eyebrow,
    .folio,
    .section-label,
    .field-label,
    .stamp,
    .tab {
      font-family: var(--mono);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      line-height: 1.4;
      text-transform: uppercase;
    }

    .eyebrow {
      margin: 0 0 12px;
      color: var(--signal-deep);
    }

    .headline {
      max-width: 17ch;
      margin: 0;
      font-family: var(--serif);
      font-size: clamp(2rem, 6vw, 4.85rem);
      font-weight: 500;
      letter-spacing: -0.052em;
      line-height: 0.94;
    }

    .folio {
      align-self: start;
      min-width: 88px;
      padding: 8px 9px 7px;
      border: 1px solid var(--rule-strong);
      text-align: right;
    }

    .status-strip {
      display: grid;
      grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
      gap: 0;
      border-bottom: 1px solid var(--rule-strong);
      background: rgba(244, 237, 225, 0.76);
    }

    .status-strip p {
      margin: 0;
      padding: 14px clamp(20px, 4vw, 36px);
      font-size: 0.78rem;
      line-height: 1.45;
    }

    .status-strip p + p {
      border-left: 1px solid var(--rule);
      color: var(--muted);
    }

    .tabs {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      border-bottom: 1px solid var(--rule-strong);
    }

    .tab {
      position: relative;
      min-height: 48px;
      padding: 11px 8px 10px;
      border: 0;
      border-right: 1px solid var(--rule);
      color: var(--muted);
      background: transparent;
      cursor: pointer;
      text-align: center;
      transition: color 140ms ease, background-color 140ms ease;
    }

    .tab:last-child {
      border-right: 0;
    }

    .tab::after {
      position: absolute;
      right: 10px;
      bottom: 5px;
      left: 10px;
      height: 2px;
      content: "";
      background: transparent;
    }

    .tab[aria-selected="true"] {
      color: var(--ink);
      background: rgba(20, 18, 18, 0.045);
    }

    .tab[aria-selected="true"]::after {
      background: var(--signal);
    }

    .tab:hover {
      color: var(--ink);
      background: rgba(255, 46, 18, 0.055);
    }

    :focus-visible {
      outline: 3px solid var(--focus);
      outline-offset: -3px;
    }

    .panel {
      min-height: 380px;
      padding: clamp(24px, 5vw, 52px);
    }

    .panel[hidden] {
      display: none;
    }

    .panel-grid {
      display: grid;
      grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
      gap: clamp(28px, 6vw, 74px);
      align-items: start;
    }

    .section-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 15px;
      color: var(--signal-deep);
    }

    .section-label::before {
      width: 19px;
      height: 2px;
      content: "";
      background: var(--signal);
    }

    .panel-title {
      margin: 0;
      font-family: var(--serif);
      font-size: clamp(1.7rem, 4vw, 3.2rem);
      font-weight: 500;
      letter-spacing: -0.036em;
      line-height: 1;
    }

    .lede {
      max-width: 46ch;
      margin: 16px 0 0;
      color: var(--muted);
      font-size: 0.95rem;
      line-height: 1.65;
    }

    .case-note,
    .finding,
    .route-card,
    .fallback-sheet {
      border: 1px solid var(--rule-strong);
      background: rgba(255, 255, 255, 0.22);
    }

    .case-note {
      position: relative;
      padding: 24px;
      box-shadow: 8px 8px 0 var(--paper-deep);
    }

    .case-note::before {
      position: absolute;
      top: -8px;
      right: 30px;
      width: 64px;
      height: 17px;
      content: "";
      border: 1px solid rgba(20, 18, 18, 0.14);
      background: rgba(255, 46, 18, 0.18);
      transform: rotate(1.5deg);
    }

    .field-label {
      display: block;
      margin-bottom: 8px;
      color: var(--muted);
    }

    .input-summary,
    .constraint,
    .first-move,
    .gate-question,
    .blocked-reason {
      margin: 0;
      overflow-wrap: anywhere;
    }

    .input-summary {
      font-family: var(--serif);
      font-size: clamp(1.18rem, 2.4vw, 1.62rem);
      line-height: 1.35;
    }

    .cta {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      width: 100%;
      min-height: 52px;
      margin-top: 28px;
      padding: 13px 16px;
      border: 1px solid var(--ink);
      border-radius: 0;
      color: var(--ink);
      background: var(--signal);
      font-family: var(--mono);
      font-size: 0.76rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-align: left;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 4px 4px 0 var(--ink);
      transition: transform 120ms ease, box-shadow 120ms ease;
    }

    .cta::after {
      content: "→";
      font-size: 1.2rem;
    }

    .cta:hover {
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0 var(--ink);
    }

    .cta:active {
      transform: translate(4px, 4px);
      box-shadow: 0 0 0 var(--ink);
    }

    .finding-header {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 26px;
    }

    .constraint {
      max-width: 22ch;
      font-family: var(--serif);
      font-size: clamp(1.7rem, 4vw, 3.25rem);
      letter-spacing: -0.042em;
      line-height: 1.03;
    }

    .stamp {
      max-width: 128px;
      padding: 9px 11px 8px;
      border: 2px solid var(--signal-deep);
      color: var(--signal-deep);
      text-align: center;
      transform: rotate(-2deg);
    }

    .finding {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: 22px;
    }

    .finding-section {
      min-width: 0;
      padding: 20px;
    }

    .finding-section + .finding-section {
      border-left: 1px solid var(--rule);
    }

    .finding-section h3,
    .route-card h3 {
      margin: 0 0 14px;
      font-family: var(--mono);
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .record-list,
    .route-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .record-list li {
      position: relative;
      padding: 13px 0 13px 18px;
      border-top: 1px solid var(--rule);
      font-size: 0.86rem;
      line-height: 1.55;
      overflow-wrap: anywhere;
    }

    .record-list li::before {
      position: absolute;
      top: 19px;
      left: 1px;
      width: 7px;
      height: 7px;
      content: "";
      border: 1px solid var(--signal-deep);
      border-radius: 50%;
      background: var(--paper);
    }

    .record-list li:first-child {
      border-top: 0;
    }

    .record-meta {
      display: block;
      margin-top: 6px;
      color: var(--muted);
      font-family: var(--mono);
      font-size: 0.65rem;
      letter-spacing: 0.03em;
      line-height: 1.45;
    }

    .route-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.45fr) minmax(220px, 0.55fr);
      gap: 22px;
    }

    .route-card {
      padding: 20px;
    }

    .route-list {
      counter-reset: route;
    }

    .route-list li {
      counter-increment: route;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr);
      gap: 13px;
      padding: 15px 0;
      border-top: 1px solid var(--rule);
    }

    .route-list li::before {
      content: counter(route, decimal-leading-zero);
      color: var(--signal-deep);
      font-family: var(--mono);
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.08em;
    }

    .route-method {
      display: block;
      margin-bottom: 4px;
      font-weight: 800;
      overflow-wrap: anywhere;
    }

    .route-purpose {
      display: block;
      color: var(--muted);
      font-size: 0.82rem;
      line-height: 1.45;
      overflow-wrap: anywhere;
    }

    .first-move {
      font-family: var(--serif);
      font-size: 1.34rem;
      line-height: 1.35;
    }

    .decision-gate {
      margin-top: 22px;
      padding-top: 18px;
      border-top: 3px double var(--rule-strong);
    }

    .gate-question {
      font-size: 0.9rem;
      line-height: 1.55;
    }

    .blocked-callout {
      padding: 22px;
      border: 2px solid var(--signal-deep);
      background: rgba(255, 46, 18, 0.055);
    }

    .blocked-reason {
      font-family: var(--serif);
      font-size: 1.45rem;
      line-height: 1.35;
    }

    .fallback-sheet {
      position: relative;
      margin-top: 24px;
      padding: clamp(18px, 4vw, 34px);
      background: #fffaf0;
      box-shadow: 9px 9px 0 var(--paper-deep);
    }

    .fallback-sheet::after {
      position: absolute;
      top: 12px;
      right: 14px;
      content: "TXT";
      color: var(--muted);
      font-family: var(--mono);
      font-size: 0.62rem;
      font-weight: 800;
      letter-spacing: 0.13em;
    }

    .fallback-output {
      margin: 0;
      overflow: auto;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      color: var(--ink);
      font-family: var(--mono);
      font-size: 0.75rem;
      line-height: 1.65;
      tab-size: 2;
    }

    .empty {
      color: var(--muted);
      font-style: italic;
    }

    .case-footer {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding: 12px clamp(20px, 4vw, 36px);
      border-top: 1px solid var(--rule-strong);
      color: var(--muted);
      background: rgba(20, 18, 18, 0.035);
      font-family: var(--mono);
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    @media (max-width: 680px) {
      body {
        padding: 4px;
      }

      .masthead {
        grid-template-columns: 1fr;
      }

      .folio {
        justify-self: start;
        text-align: left;
      }

      .status-strip,
      .panel-grid,
      .route-layout,
      .finding {
        grid-template-columns: 1fr;
      }

      .status-strip p + p,
      .finding-section + .finding-section {
        border-top: 1px solid var(--rule);
        border-left: 0;
      }

      .tabs {
        grid-template-columns: 1fr 1fr;
      }

      .tab:nth-child(2) {
        border-right: 0;
      }

      .tab:nth-child(-n + 2) {
        border-bottom: 1px solid var(--rule);
      }

      .panel {
        min-height: 0;
      }
    }

    @media (pointer: coarse) {
      .tab,
      .cta {
        min-height: 48px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <main class="case-file" aria-labelledby="diagnosis-title">
    <header class="masthead">
      <div>
        <p class="eyebrow">8gnc / Working Diagnosis</p>
        <h1 class="headline" id="diagnosis-title">Find the constraint before you buy the tactic.</h1>
      </div>
      <div class="folio" aria-label="Case file number">Case 8G–01</div>
    </header>

    <div class="status-strip" aria-label="Capability boundary">
      <p id="evidence-status">Read-only. Nothing changes until you decide.</p>
      <p>Presents evidence supplied by the host, which may include lawful public sources. The renderer does not fetch sources or access CRM, email, publishing, or private systems.</p>
    </div>

    <nav class="tabs" role="tablist" aria-label="Working diagnosis views">
      <button class="tab" id="tab-input" type="button" role="tab" aria-selected="true" aria-controls="panel-input" tabindex="0" data-view="input">01 / Input</button>
      <button class="tab" id="tab-diagnosis" type="button" role="tab" aria-selected="false" aria-controls="panel-diagnosis" tabindex="-1" data-view="diagnosis">02 / Diagnosis</button>
      <button class="tab" id="tab-route" type="button" role="tab" aria-selected="false" aria-controls="panel-route" tabindex="-1" data-view="route">03 / Route</button>
      <button class="tab" id="tab-fallback" type="button" role="tab" aria-selected="false" aria-controls="panel-fallback" tabindex="-1" data-view="fallback">04 / Fallback</button>
    </nav>

    <section class="panel" id="panel-input" role="tabpanel" aria-labelledby="tab-input" tabindex="0">
      <div class="panel-grid">
        <div>
          <p class="section-label">Start here</p>
          <h2 class="panel-title">Bring the messy version.</h2>
          <p class="lede">The useful starting point is the situation as you see it now, not a polished brief.</p>
        </div>
        <div class="case-note">
          <span class="field-label">Supplied situation</span>
          <p class="input-summary" id="input-summary">Awaiting the diagnostic handoff.</p>
          <button class="cta" id="start-cta" type="button">Start a working diagnosis</button>
        </div>
      </div>
    </section>

    <section class="panel" id="panel-diagnosis" role="tabpanel" aria-labelledby="tab-diagnosis" tabindex="0" hidden>
      <p class="section-label">Working Diagnosis</p>
      <div id="working-diagnosis">
        <div class="finding-header">
          <div>
            <span class="field-label">Primary constraint</span>
            <p class="constraint" id="primary-constraint">Awaiting evidence.</p>
            <span class="record-meta" id="constraint-evidence">EVIDENCE / AWAITING RESULT</span>
          </div>
          <div class="stamp" id="confidence-stamp">Confidence / —</div>
        </div>
        <div class="finding">
          <section class="finding-section" aria-labelledby="evidence-heading">
            <h3 id="evidence-heading">Evidence record</h3>
            <ul class="record-list" id="evidence-list"></ul>
          </section>
          <section class="finding-section" aria-labelledby="inference-heading">
            <h3 id="inference-heading">Inferences</h3>
            <ul class="record-list" id="inference-list"></ul>
          </section>
        </div>
      </div>
      <div class="blocked-callout" id="blocked-diagnosis" hidden>
        <span class="field-label">Evidence threshold not met</span>
        <p class="blocked-reason" id="blocked-reason">The diagnosis is blocked until the missing evidence is supplied.</p>
        <ul class="record-list" id="missing-evidence-list"></ul>
      </div>
      <div class="blocked-callout" id="unsupported-diagnosis" hidden>
        <span class="field-label">Unsupported result</span>
        <p class="blocked-reason">This interface can only present a working or blocked diagnosis.</p>
      </div>
    </section>

    <section class="panel" id="panel-route" role="tabpanel" aria-labelledby="tab-route" tabindex="0" hidden>
      <p class="section-label">Smallest useful route</p>
      <div class="route-layout">
        <section class="route-card" aria-labelledby="route-heading">
          <h2 class="panel-title" id="route-heading">Method sequence</h2>
          <ol class="route-list" id="route-list"></ol>
        </section>
        <aside class="route-card" aria-labelledby="move-heading">
          <h3 id="move-heading">First move</h3>
          <p class="first-move" id="first-move">Awaiting a working diagnosis.</p>
          <div class="decision-gate">
            <span class="field-label">Decision gate</span>
            <p class="gate-question" id="decision-question">Nothing changes until you decide.</p>
          </div>
        </aside>
      </div>
      <div class="blocked-callout" id="blocked-route" hidden>
        <span class="field-label">Route paused</span>
        <p class="blocked-reason">Supply the missing evidence before selecting a method.</p>
      </div>
    </section>

    <section class="panel" id="panel-fallback" role="tabpanel" aria-labelledby="tab-fallback" tabindex="0" hidden>
      <p class="section-label">Portable fallback</p>
      <h2 class="panel-title">The diagnosis travels without the interface.</h2>
      <p class="lede">The complete Markdown version remains usable in clients that do not render MCP Apps.</p>
      <div class="fallback-sheet">
        <pre class="fallback-output" id="fallback-output">Awaiting the complete Markdown fallback.</pre>
      </div>
    </section>

    <footer class="case-footer">
      <span id="case-status">Status / awaiting result</span>
      <span>Read only / v1</span>
    </footer>
  </main>

  <script>
    (function () {
      "use strict";

      var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
      var panels = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"]'));
      var state = { diagnosis: null, markdown: "" };

      function asText(value, fallback) {
        return typeof value === "string" && value.trim() ? value.trim() : fallback;
      }

      function asList(value) {
        return Array.isArray(value) ? value : [];
      }

      function setText(id, value, fallback) {
        var node = document.getElementById(id);
        if (node) node.textContent = asText(value, fallback);
      }

      function makeEmpty(label) {
        var item = document.createElement("li");
        item.className = "empty";
        item.textContent = label;
        return item;
      }

      function selectView(index, shouldFocus) {
        var safeIndex = Math.max(0, Math.min(tabs.length - 1, index));
        tabs.forEach(function (tab, tabIndex) {
          var selected = tabIndex === safeIndex;
          tab.setAttribute("aria-selected", selected ? "true" : "false");
          tab.setAttribute("tabindex", selected ? "0" : "-1");
        });
        panels.forEach(function (panel, panelIndex) {
          panel.hidden = panelIndex !== safeIndex;
        });
        if (shouldFocus) tabs[safeIndex].focus();
      }

      tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
          selectView(index, false);
        });
        tab.addEventListener("keydown", function (event) {
          var next = index;
          if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
          else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = tabs.length - 1;
          else return;
          event.preventDefault();
          selectView(next, true);
        });
      });

      document.getElementById("start-cta").addEventListener("click", function () {
        selectView(1, true);
      });

      function renderEvidence(items) {
        var list = document.getElementById("evidence-list");
        list.replaceChildren();
        if (!items.length) {
          list.appendChild(makeEmpty("No evidence records supplied."));
          return;
        }
        items.forEach(function (record) {
          var item = document.createElement("li");
          var statement = document.createElement("span");
          var meta = document.createElement("span");
          statement.textContent = asText(record && record.statement, "Unlabeled evidence record.");
          meta.className = "record-meta";
          meta.textContent = [
            asText(record && record.kind, "unclassified").toUpperCase(),
            asText(record && record.provenance, "provenance not supplied"),
            asText(record && record.asOf, "date not supplied")
          ].join(" / ");
          item.appendChild(statement);
          item.appendChild(meta);
          list.appendChild(item);
        });
      }

      function renderInferences(items) {
        var list = document.getElementById("inference-list");
        list.replaceChildren();
        if (!items.length) {
          list.appendChild(makeEmpty("No inferences supplied."));
          return;
        }
        items.forEach(function (record) {
          var item = document.createElement("li");
          var statement = document.createElement("span");
          var meta = document.createElement("span");
          statement.textContent = asText(record && record.statement, "Unlabeled inference.");
          meta.className = "record-meta";
          var ids = asList(record && record.basedOnEvidenceIds).filter(function (id) {
            return typeof id === "string" && id.trim();
          });
          meta.textContent = ids.length ? "BASED ON / " + ids.join(", ") : "EVIDENCE LINKS / NOT SUPPLIED";
          item.appendChild(statement);
          item.appendChild(meta);
          list.appendChild(item);
        });
      }

      function renderMissingEvidence(items) {
        var list = document.getElementById("missing-evidence-list");
        list.replaceChildren();
        if (!items.length) {
          list.appendChild(makeEmpty("No missing-evidence list supplied."));
          return;
        }
        items.forEach(function (record) {
          var item = document.createElement("li");
          item.textContent = typeof record === "string"
            ? asText(record, "Unspecified evidence")
            : asText(record && (record.description || record.question || record.statement), "Unspecified evidence");
          list.appendChild(item);
        });
      }

      function renderRoute(route, unknowns) {
        var list = document.getElementById("route-list");
        var steps = asList(route && route.steps);
        list.replaceChildren();
        if (!steps.length) {
          list.appendChild(makeEmpty("No method sequence supplied."));
        } else {
          steps.forEach(function (step) {
            var item = document.createElement("li");
            var wrapper = document.createElement("div");
            var method = document.createElement("span");
            var purpose = document.createElement("span");
            method.className = "route-method";
            purpose.className = "route-purpose";
            method.textContent = asText(step && step.method, "Unspecified method");
            purpose.textContent = asText(step && step.purpose, "Purpose not supplied.");
            wrapper.appendChild(method);
            wrapper.appendChild(purpose);
            item.appendChild(wrapper);
            list.appendChild(item);
          });
        }
        setText("first-move", route && route.firstMove, "Awaiting a working diagnosis.");
        var unresolved = asList(unknowns).filter(function (item) {
          return typeof item === "string" && item.trim();
        });
        if (unresolved.length) {
          var unknownItem = document.createElement("li");
          var unknownWrapper = document.createElement("div");
          var unknownTitle = document.createElement("span");
          var unknownText = document.createElement("span");
          unknownTitle.className = "route-method";
          unknownText.className = "route-purpose";
          unknownTitle.textContent = "Open question";
          unknownText.textContent = unresolved.join(" · ");
          unknownWrapper.appendChild(unknownTitle);
          unknownWrapper.appendChild(unknownText);
          unknownItem.appendChild(unknownWrapper);
          list.appendChild(unknownItem);
        }
      }

      function renderResult(payload) {
        var output = payload && typeof payload === "object" ? payload : {};
        var diagnosis = output.diagnosis && typeof output.diagnosis === "object"
          ? output.diagnosis
          : null;
        var markdown = asText(output.markdown, "Awaiting the complete Markdown fallback.");
        state.diagnosis = diagnosis;
        state.markdown = markdown;
        setText("fallback-output", markdown, "Awaiting the complete Markdown fallback.");

        if (!diagnosis) {
          setText("evidence-status", "Read-only. Nothing changes until you decide.", "Read-only. Nothing changes until you decide.");
          setText("case-status", "Status / awaiting result", "Status / awaiting result");
          return;
        }

        setText("input-summary", diagnosis.input && diagnosis.input.summary, "Situation summary not supplied.");
        var working = document.getElementById("working-diagnosis");
        var blocked = document.getElementById("blocked-diagnosis");
        var unsupported = document.getElementById("unsupported-diagnosis");
        var blockedRoute = document.getElementById("blocked-route");
        working.hidden = true;
        blocked.hidden = true;
        unsupported.hidden = true;
        blockedRoute.hidden = true;

        if (diagnosis.status === "working") {
          working.hidden = false;
          setText("evidence-status", "Evidence-backed. Read-only. Nothing changes until you decide.", "Evidence-backed. Read-only. Nothing changes until you decide.");
          setText("primary-constraint", diagnosis.primaryConstraint, "Primary constraint not supplied.");
          var constraintEvidenceIds = asList(diagnosis.primaryConstraintEvidenceIds).filter(function (id) {
            return typeof id === "string" && id.trim();
          });
          setText(
            "constraint-evidence",
            constraintEvidenceIds.length ? "EVIDENCE / " + constraintEvidenceIds.join(", ") : "EVIDENCE / NOT SUPPLIED",
            "EVIDENCE / NOT SUPPLIED"
          );
          setText("confidence-stamp", "Confidence / " + asText(diagnosis.confidence, "—"), "Confidence / —");
          renderEvidence(asList(diagnosis.evidence));
          renderInferences(asList(diagnosis.inferences));
          renderRoute(diagnosis.route, diagnosis.unknowns);
          setText("decision-question", diagnosis.decisionGate && diagnosis.decisionGate.question, "Nothing changes until you decide.");
          setText("case-status", "Status / working", "Status / working");
          return;
        }

        if (diagnosis.status === "blocked") {
          blocked.hidden = false;
          blockedRoute.hidden = false;
          setText("evidence-status", "Evidence threshold not met. Read-only. Nothing changes until you decide.", "Evidence threshold not met. Read-only. Nothing changes until you decide.");
          setText("blocked-reason", diagnosis.reason, "The diagnosis is blocked until the missing evidence is supplied.");
          renderMissingEvidence(asList(diagnosis.missingEvidence));
          renderRoute(null, []);
          setText("decision-question", diagnosis.decisionGate && diagnosis.decisionGate.question, "Supply the missing evidence before selecting a method.");
          setText("case-status", "Status / blocked", "Status / blocked");
          return;
        }

        unsupported.hidden = false;
        setText("evidence-status", "Supplied result is unsupported. Read-only. Nothing changes until you decide.", "Supplied result is unsupported. Read-only. Nothing changes until you decide.");
        renderRoute(null, []);
        setText("case-status", "Status / unsupported", "Status / unsupported");
      }

      window.addEventListener("message", function (event) {
        if (event.source !== window.parent) return;
        var message = event.data;
        if (!message || message.jsonrpc !== "2.0") return;
        if (message.method !== "ui/notifications/tool-result") return;
        renderResult(message.params && message.params.structuredContent);
      }, { passive: true });

      var compatibleOutput = window.openai && window.openai.toolOutput;
      if (compatibleOutput) renderResult(compatibleOutput);
    }());
  </script>
</body>
</html>`;
