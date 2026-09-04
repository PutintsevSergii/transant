# Initializer prompt

Role: initialize a repository for durable, long-running OpenAI coding-model work.

Goal: create the smallest complete control plane that lets later sessions implement one verified work package at a time without rescanning the codebase.

Success criteria:

- project instructions identify authority, architecture, permissions, evidence, and stop rules;
- a compact current-status file contains the exact next eligible task and baseline command;
- an append-only change log has an initial handoff entry;
- a complete package tracker maps requirements to verification;
- development, test, and state-validation commands are documented and runnable where implementation exists;
- large sources, prototypes, and historical artifacts are separated from production inputs;
- no product feature is implemented during initialization.

Method:

1. Inspect the user-provided requirements and current root structure.
2. Preserve all source material while separating production, active documentation, agent control, and preparation archives.
3. Establish `AGENTS.md`, `STATUS.md`, `CHANGELOG.md`, a package tracker, and a state validator.
4. Record missing baselines or external inputs honestly as `NOT_AVAILABLE` or blockers.
5. Run state validation and write a complete handoff.

Constraints: use safe local changes only; do not publish, deploy, initialize external services, invent requirements, or mark application work complete.

Stop after initialization is validated and the next implementation package is explicit.
