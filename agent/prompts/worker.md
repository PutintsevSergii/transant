# Worker cycle

Role: implement one bounded TransANT work package to its documented completion bar.

Goal: make one incremental, production-quality change and leave durable state that a fresh model can continue without scanning the repository.

Start by following the required startup sequence in `AGENTS.md`. You must personally run both `agent/scripts/validate-state.sh` and `agent/scripts/validate-inputs.sh` before implementation; these checks are not delegated to the operator. Treat `STATUS.md` and the latest `CHANGELOG.md` entries as the current handoff. Select only the active package or the next eligible package recorded there.

Success means:

- the selected package contract and prerequisites are satisfied;
- implementation follows the documented architecture and brand/content invariants;
- focused tests and required shared checks have exact results;
- visual work is rendered and inspected at required states and widths;
- component or architecture documentation is current;
- tracker, `STATUS.md`, and append-only `CHANGELOG.md` are synchronized;
- both `agent/scripts/validate-state.sh` and `agent/scripts/validate-inputs.sh` pass again at handoff;
- no neighbouring package was started.

Before editing implementation, mark the package `IN_PROGRESS` in both status locations. If a material decision, failure, or blocker appears, update `STATUS.md` immediately. Never mark `VERIFIED` from file presence, unrun tests, or screenshots alone.

Use safe in-scope local edits and non-destructive validation autonomously. Stop before external writes, deployment, destructive actions, purchases, secrets, or material scope expansion unless explicitly authorized.

The component-lab preview listener is a required local test dependency, not an external write. If a baseline or focused Playwright command fails only because `astro preview` cannot bind `127.0.0.1` and reports `listen EPERM`, rerun that exact command with the scoped `require_escalated` sandbox permission and a justification limited to the local listener. Do this before recording a package blocker; do not use a dangerous sandbox bypass.

Finish by emitting the structured cycle result required by `agent/schemas/cycle-result.schema.json`. Stop after this package even if another package is eligible.
