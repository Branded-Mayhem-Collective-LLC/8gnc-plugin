# Auto-Continuation Protocol

## When to Use

Trigger auto-continuation when report exceeds 18,000 words in single run.

---

## Strategy Overview

1. Generate sections 1-10 (stay under 18K words)
2. Save continuation state file with context preservation
3. Start a continuation pass in the current task or through an available, authorized parallel-agent mechanism
4. The continuation pass reads state, generates the next batch, and updates state
5. Repeat until complete

---

## Continuation State File

**Location:** store `continuation_state_[report_id].json` beside the report in its user-approved output directory.

```json
{
  "version": "2.1.1",
  "report_id": "[unique_id]",
  "file_path": "[absolute_path_to_report.md]",
  "mode": "[quick|standard|deep|ultradeep]",

  "progress": {
    "sections_completed": ["list of section IDs"],
    "total_planned_sections": 15,
    "word_count_so_far": 12000,
    "continuation_count": 1
  },

  "citations": {
    "used": [1, 2, 3, "...", "N"],
    "next_number": 45,
    "bibliography_entries": [
      "[1] Full citation entry",
      "[2] Full citation entry"
    ]
  },

  "research_context": {
    "research_question": "[original question]",
    "key_themes": ["theme1", "theme2"],
    "main_findings_summary": [
      "Finding 1: [100-word summary]",
      "Finding 2: [100-word summary]"
    ],
    "narrative_arc": "middle"
  },

  "quality_metrics": {
    "avg_words_per_finding": 1500,
    "citation_density": 5.2,
    "prose_vs_bullets_ratio": "85% prose",
    "writing_style": "technical-precise-data-driven"
  },

  "next_sections": [
    {"id": 11, "type": "finding", "title": "Finding X", "target_words": 1500},
    {"id": 12, "type": "synthesis", "title": "Synthesis", "target_words": 1000}
  ]
}
```

---

## Running a Continuation Pass

Use the current task unless the runtime exposes an authorized parallel-agent mechanism. For every pass:

1. Read the continuation state beside the report.
2. Read the existing report and its last three completed sections.
3. Load themes, narrative arc, writing style, and the next citation number.
4. Generate the next listed section batch without exceeding the current surface's output limit.
5. Append through the available file-editing workflow.
6. Keep section length within 20 percent of the prior average, match citation density, preserve at least 80 percent prose, and tie each section to the key themes.
7. Update state if work remains. If complete, generate the bibliography, verify the report, and remove the temporary state only after validating the final files.

---

## Continuation Agent Quality Protocol

### Context Loading (CRITICAL)

1. Read continuation_state.json -> Load ALL context
2. Read existing report file -> Review last 3 sections
3. Extract patterns:
   - Sentence structure complexity
   - Technical terminology used
   - Citation placement patterns
   - Paragraph transition style

### Pre-Generation Checklist

- [ ] Loaded research context (themes, question, narrative arc)
- [ ] Reviewed previous sections for flow
- [ ] Loaded citation numbering (start from N+1)
- [ ] Loaded quality targets (words, density, style)
- [ ] Understand narrative position (beginning/middle/end)

### Per-Section Generation

1. Generate section content
2. Quality checks:
   - Word count within +/-20%
   - Citation density matches
   - Prose ratio >=80%
   - Theme connection verified
   - Style consistent
3. If ANY fails: Regenerate
4. If passes: Write to file, update state

### Handoff Decision

Calculate: Current words + remaining sections x avg_words_per_section
- If total < 18K: Generate all + finish
- If total > 18K: Generate partial, update state, spawn next agent

### Final Agent Responsibilities

- Generate final content sections
- Generate COMPLETE bibliography from state.citations.bibliography_entries
- Read entire assembled report
- Run validation: `python scripts/validate_report.py --report [path]`
- Delete continuation_state.json (cleanup)
- Report complete to user

---

## User Communication

After spawning continuation:
```
Report Generation: Part 1 Complete (N sections, X words)
Auto-continuing via spawned agent...
   Next batch: [section list]
   Progress: [X%] complete
```
