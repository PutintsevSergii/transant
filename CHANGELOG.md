# TransANT implementation change log

Append-only handoff log. Add new entries at the end. Never rewrite or delete prior entries. Each entry must leave a future model with the package, files, evidence, blockers, and exact continuation point.

## 2026-09-04 — PLAN — V7 component-first delivery plan

- Outcome: Defined a 43-package component-first implementation and release sequence.
- Decisions: Components must be isolated, tested, documented, portable, and `VERIFIED` before page assembly. Release one excludes search, filters, comparison, and configuration tools.
- Files: Added `docs/specifications/v7-component-development-plan.md` and `docs/specifications/component-implementation-status.md`; aligned active technical, UX, stack, and one-week scope documents.
- Validation: Confirmed balanced Markdown fences, 43 tracker rows, and consistent first-release discovery requirements.
- Blockers: Production application and its test harness are not scaffolded.
- Continue: Establish the long-running agent harness and clean development root, then implement F-001.

## 2026-09-04 — HARNESS — Agent loop and development-root cleanup

- Outcome: Added a bounded OpenAI-model worker/evaluator harness and reorganized the repository into active development, active documentation, durable state, and preparation/archive boundaries.
- Research basis: Applied OpenAI’s lean outcome-first prompting, explicit autonomy/evidence/stop rules, and durable-state guidance together with Anthropic’s initializer, one-feature worker, persistent progress, end-to-end verification, and selective evaluator patterns.
- State contract: Added root `AGENTS.md`, `STATUS.md`, and append-only `CHANGELOG.md`. Every worker/evaluator cycle must update status and the package tracker, append without rewriting the log, and pass structural validation.
- Harness files: Added `agent/HARNESS.md`, worker/initializer/evaluator prompts, structured result schemas, bounded runner scripts, state validation, and content/input validation.
- Safety: Defaulted to one `gpt-5.6-terra` cycle, capped runs at 50 cycles, used `workspace-write` plus approval review, prohibited dangerous bypass, and added dry-run preflight support.
- Repository cleanup: Moved `generated-design/`, `source-material/`, old Stitch bundles/prompts, extraction tooling, duplicate media, and pre-development inventories under `prep/`; removed generated `.DS_Store` files.
- Production alignment: Moved product content to `website/src/content/`, source media to `website/src/assets/images/`, tokens to `website/src/styles/` and `website/src/data/`, and the byte-identical logo to `website/public/brand/transant-logo.png`. Product image fields now use typed-adapter-ready logical paths.
- Validation: `bash -n agent/scripts/*.sh` PASS; both JSON schemas parse with `jq`; `agent/scripts/validate-state.sh` PASS with 43 packages; `agent/scripts/validate-inputs.sh` PASS with 10 individual and 10 aggregate products; logo SHA-256 matched `fc0a30fff3e99c2a7af66ca78d04af82218a035c0926b11c2d5418d14ac0c985`; worker and evaluator dry-run preflights PASS.
- Removed: Nine generated macOS `.DS_Store` metadata files. They are non-source files and are not recoverable from this workspace, but macOS may regenerate them.
- Limitation: The directory is not a Git repository, so history/diff rollback is unavailable. The loop uses `--skip-git-repo-check` until repository initialization is approved or performed during foundation work.
- Continue: Read `STATUS.md`, validate state and inputs, then implement F-001 only. Do not begin a neighbouring component.

## 2026-09-04 — ASSETS — Production-safe source image boundary

- Outcome: Reduced the active `website/` workspace from approximately 208 MB to 34 MB without losing source masters.
- Files: Archived the 10112 x 8377 fleet image, large operational/editorial originals, two 23 MB overview grids, and campaign artwork under `prep/source-material/web-image-masters/`.
- Replacements: Installed the reviewed Stitch-lite fleet, train, and bogie images as local source assets under `website/src/assets/images/editorial/`.
- Guard: Extended `agent/scripts/validate-inputs.sh` to reject any active source or public asset larger than 25 MiB.
- Validation: Product and aggregate JSON remain valid; all ten product image paths resolve; the immutable logo digest remains unchanged; no active image exceeds 25 MiB.
- Continue: Initialize the Git baseline, then implement F-001 only.

## 2026-09-04 — BASELINE — Initial development repository

- Outcome: Initialized a local Git repository on branch `main` for diff-based handoff, recovery, and rollback between harness cycles.
- Ignore boundary: Excluded agent runtime logs/results and large preparation-only archives while retaining active requirements, harness files, extracted content, and production source assets.
- Validation: Shell syntax PASS; JSON parse checks PASS; state validator PASS with 43 packages; input validator PASS with 10 products, matching aggregate data, resolved local images, verified logo digest, and 25 MiB active/public asset limits; worker and evaluator dry-run preflights PASS.
- Baseline: This entry is included in the initial development commit. Future sessions should use `git log -1 --oneline` and `git status --short` instead of relying on a self-referential hash inside this file.
- Continue: Implement F-001 only. Before code, mark F-001 `IN_PROGRESS` in both `STATUS.md` and the component tracker.
