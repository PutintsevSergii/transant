# Worker cycle

Role: implement one bounded TransANT work package to its documented completion bar.

Goal: make one incremental, production-quality change and leave durable state that a fresh model can continue without scanning the repository.

Start by following the required startup sequence in `AGENTS.md`, including state and input validation. Treat `STATUS.md` and the latest `CHANGELOG.md` entries as the current handoff. Select only the active package or the next eligible package recorded there.

Success means:

- the selected package contract and prerequisites are satisfied;
- implementation follows the documented architecture and brand/content invariants;
- focused tests and required shared checks have exact results;
- visual work is rendered and inspected at required states and widths;
- component or architecture documentation is current;
- tracker, `STATUS.md`, and append-only `CHANGELOG.md` are synchronized;
- `agent/scripts/validate-state.sh` passes;
- no neighbouring package was started.

Before editing implementation, mark the package `IN_PROGRESS` in both status locations. If a material decision, failure, or blocker appears, update `STATUS.md` immediately. Never mark `VERIFIED` from file presence, unrun tests, or screenshots alone.

Use safe in-scope local edits and non-destructive validation autonomously. Stop before external writes, deployment, destructive actions, purchases, secrets, or material scope expansion unless explicitly authorized.

Finish by emitting the structured cycle result required by `agent/schemas/cycle-result.schema.json`. Stop after this package even if another package is eligible.
