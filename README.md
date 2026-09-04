# TransANT website

This repository is the clean development workspace for the new TransANT website. Production work lives in `website/`; active requirements and architecture live in `docs/`; durable agent state lives at the repository root; historical design generations and source archives live in `prep/`.

## Start every development session here

1. Read [`AGENTS.md`](AGENTS.md).
2. Read [`STATUS.md`](STATUS.md).
3. Read the latest entries in [`CHANGELOG.md`](CHANGELOG.md).
4. Open only the specification and files named by the active or next work package.
5. Run `agent/scripts/validate-state.sh` and `agent/scripts/validate-inputs.sh` before changing code.

This startup sequence is designed to avoid rescanning the whole repository after a context reset.

## Active sources of truth

- [`STATUS.md`](STATUS.md) — current project health, active package, exact next action, blockers, and last verified baseline.
- [`CHANGELOG.md`](CHANGELOG.md) — append-only session handoff record with changed files and validation evidence.
- [`docs/specifications/component-implementation-status.md`](docs/specifications/component-implementation-status.md) — package-level completion matrix.
- [`docs/specifications/v7-component-development-plan.md`](docs/specifications/v7-component-development-plan.md) — component-first implementation plan and definitions of done.
- [`docs/specifications/technical-requirements.md`](docs/specifications/technical-requirements.md) — production requirements and release gates.
- [`docs/technology-stack-decision.md`](docs/technology-stack-decision.md) — Astro/static-first architecture decision.
- [`docs/specifications/site-structure-and-ux-strategy.md`](docs/specifications/site-structure-and-ux-strategy.md) — information architecture, UX, and marketing strategy.

## Root structure

```text
.
├── AGENTS.md              durable instructions for coding agents
├── STATUS.md              compact current-state handoff
├── CHANGELOG.md           append-only implementation history
├── agent/                 harness prompts, scripts, schemas, and references
├── docs/                  active requirements, architecture, and product guidance
├── prep/                  historical generations, source masters, and old tooling
└── website/               production application workspace and approved content/assets
```

## Harness

The bounded OpenAI-model loop is documented in [`agent/HARNESS.md`](agent/HARNESS.md). The safe default runs one cycle:

```bash
agent/scripts/run-loop.sh
```

Override the number of cycles or model explicitly:

```bash
HARNESS_MAX_CYCLES=4 HARNESS_MODEL=gpt-5.6-terra agent/scripts/run-loop.sh
```

The loop uses `workspace-write` sandboxing and automatic approval review. It never uses a dangerous sandbox bypass. Every cycle must leave `STATUS.md`, `CHANGELOG.md`, and the package tracker synchronized.

## Production boundary

The competitor-derived prototype in `prep/source-material/prototypes/` is content provenance only. Its layout, CSS, JavaScript, component structure, and interactions must not be copied. Client-supplied product text, tables, and authorized media may be reused after validation. The TransANT logo must remain byte-identical and must never be redrawn, recoloured, distorted, or animated.

Nothing under `prep/` is part of a production build unless a current specification explicitly identifies it as an approved source and the required asset is deliberately copied into `website/`.
