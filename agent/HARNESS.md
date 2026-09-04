# Harness design for long-running application development

## 1. Outcome

The harness enables an OpenAI coding model, defaulting to `gpt-5.6-terra`, to implement the TransANT site across many bounded sessions without relying on chat history or repeatedly scanning the repository.

Success means every cycle:

- starts from verified persistent state;
- selects one eligible package;
- leaves a small, clean, reviewable change;
- proves the applicable definition of done;
- synchronizes package status, current status, and an append-only handoff log;
- stops safely on completion, a real blocker, invalid state, or the configured cycle limit.

## 2. Design basis

The setup combines current official guidance without copying model-specific scaffolding blindly:

- OpenAI recommends lean outcome-first prompts with explicit success criteria, autonomy boundaries, evidence requirements, and stopping conditions. Stable instructions are kept in `AGENTS.md`; changing context is kept in `STATUS.md` and `CHANGELOG.md`.
- OpenAI guidance for long-running work recommends deliberate state preservation, sparse milestone updates, relevant validation, and avoiding repeated prompt content as sessions grow.
- Anthropic’s long-running-agent work demonstrated the value of an initializer, a one-feature worker, a persistent feature/status list, end-to-end verification, and explicit handoff artifacts.
- Anthropic’s later harness work found value in planner/generator/evaluator separation when criteria are objective, while also warning that unnecessary harness complexity becomes overhead as models improve.

The TransANT harness therefore uses a simple single-worker loop by default and a fresh evaluator only for packages where independent visual, accessibility, integration, or release judgment adds measurable value.

Official references:

- [OpenAI model guidance and prompting best practices](https://developers.openai.com/api/docs/guides/model-guidance?model=gpt-5.6#prompting-best-practices)
- [Anthropic: Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [Anthropic: Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

## 3. Architecture

```text
operator or scheduler
        |
        v
bounded runner ---------------------> JSONL logs + structured result
        |
        v
OpenAI worker model
        |
        +--> AGENTS.md               stable policy and architecture
        +--> STATUS.md               current snapshot and exact next action
        +--> CHANGELOG.md            append-only handoff history
        +--> component tracker       package truth and evidence
        +--> selected specification  bounded scope and definition of done
        |
        v
code + focused tests + documentation
        |
        v
state validator
        |
        +--> next bounded cycle
        +--> optional fresh evaluator
        +--> stop: COMPLETE / BLOCKED / PAUSED / invalid / limit
```

## 4. Persistent context contract

### Stable prefix

`AGENTS.md` contains rules that should rarely change: source authority, architecture, SOLID constraints, test evidence, state discipline, brand invariants, permissions, and stop conditions. Keeping these instructions stable reduces prompt churn and contradictory repetition.

### Dynamic snapshot

`STATUS.md` is overwritten intentionally because it represents current truth. It must remain compact and contain:

- lifecycle and release;
- active, last completed, and next eligible packages;
- exact active objective and working file set;
- last verified baseline and commands;
- current architecture decisions and invariants;
- current blockers and approvals;
- exact next action and continuation instructions;
- identifier of the latest change-log entry.

### Append-only history

`CHANGELOG.md` is chronological and append-only. It stores decisions and evidence that should survive status replacement. New entries are appended at the bottom so a fresh model can use `tail -n 120 CHANGELOG.md`.

### Detailed package truth

`docs/specifications/component-implementation-status.md` records all 43 packages, prerequisites, status, and evidence. It prevents a model from declaring the whole project complete because some visible progress exists.

## 5. Cycle state machine

```text
READY
  -> validate persistent state
  -> choose one prerequisite-complete package
  -> mark tracker and STATUS as IN_PROGRESS
RUNNING
  -> establish package contract
  -> implement server-rendered/core state
  -> add progressive enhancement if required
  -> test and visually inspect
  -> document
  -> update evidence
IMPLEMENTED
  -> use when code exists but required proof is missing
VERIFIED
  -> only after full package definition of done
  -> clear active package and set next eligible package
BLOCKED
  -> record owner, missing input, completed local work, and unblock condition
PAUSED
  -> operator-requested stop with an exact continuation point
COMPLETE
  -> only after every release-required package is VERIFIED or explicitly DEFERRED
```

The harness runner itself never converts package status. The model must update state based on evidence, and the validator checks structure and basic synchronization.

The runner also compares pre-cycle and post-cycle state: `STATUS.md` and the package tracker must change, `CHANGELOG.md` must grow, and every pre-existing change-log byte must remain unchanged. A cycle that fails this state transaction is rejected even if the model reports success.

## 6. State update transaction

State updates are part of the change, not a final courtesy. Use this order:

1. Before code, set the selected tracker row and `STATUS.md` to `IN_PROGRESS`.
2. After each material failure, scope decision, or blocker, update `STATUS.md` immediately.
3. After implementation, record focused and shared validation results in the tracker.
4. Set `VERIFIED` only when all required evidence exists. Otherwise use `IMPLEMENTED`, `IN_PROGRESS`, or `BLOCKED` accurately.
5. Rewrite `STATUS.md` to the new current snapshot.
6. Append one complete `CHANGELOG.md` handoff entry.
7. Set `Last change-log entry` in `STATUS.md` to that exact heading.
8. Run `agent/scripts/validate-state.sh`.

If the session is interrupted, steps 2, 5, and 6 are still required before stopping when tool access remains available.

## 7. Package contract

Before implementation, define within the existing component README or a short working section in `STATUS.md`:

- package ID and user-visible outcome;
- included and excluded scope;
- public types, props, slots, events, or ports;
- direct dependencies and allowed dependency direction;
- server-rendered/no-JavaScript behaviour;
- responsive, accessibility, motion, and failure states;
- focused tests and required shared checks;
- concrete evidence required for `VERIFIED`.

Do not generate a second large plan. The package contract resolves only implementation details left open by the approved plan.

## 8. Evaluator policy

Independent evaluation is recommended for:

- `H-001`, `H-002`, and `H-004` because visual quality and behaviour define the homepage;
- `A-002` through `A-006` because assembly can expose integration defects;
- `I-002` through `I-006` because these packages are explicit quality and release gates;
- any change involving security, privacy, form delivery, external integration, or disputed requirements.

The evaluator starts in a fresh model session, reads recorded state and evidence, and does not edit production code. It may add `agent/reviews/<package>.md`, update status/evidence, and fail or reopen a package. A failed evaluation returns the package to the worker with exact reproduction steps and acceptance gaps.

Do not run an evaluator for trivial documentation corrections or already deterministic checks unless a measured failure shows it is useful.

## 9. Safe runner policy

`run-loop.sh` is deliberately bounded:

- default: one worker cycle;
- operator override: `HARNESS_MAX_CYCLES`, maximum 50;
- default model: `gpt-5.6-terra`, overridable with `HARNESS_MODEL`;
- dry preflight: set `HARNESS_DRY_RUN=1` to validate configuration without invoking a model;
- sandbox: `workspace-write`;
- approvals: automatic review, not bypass;
- no recursive self-invocation and no unbounded `while true`;
- stops on non-zero model exit, state-validation failure, `BLOCKED`, `PAUSED`, `COMPLETE`, or cycle limit;
- works before Git initialization with `--skip-git-repo-check`, while surfacing the reduced rollback guarantee in `STATUS.md`.

For unattended execution, use an externally isolated machine/container, configure a hard wall-clock and cost limit outside this script, and review the allowed network and secret surface. This repository script does not grant broader permissions.

## 10. Prompt construction

The worker prompt is intentionally small. It states the outcome, startup contract, evidence bar, state transaction, and stop rule once. Project specifics remain in repository files.

For API-based orchestration:

- keep stable instructions and tool definitions first;
- put changing cycle data last;
- preserve assistant phase values if replaying assistant items manually;
- use conversation continuation or compaction at milestones, but treat repository state as the recovery source;
- require a structured final result and keep execution logs outside model context unless diagnosing a failure;
- expose only tools required for the selected package.

## 11. Crash and drift recovery

On restart:

1. Read `STATUS.md` and the latest change-log entry.
2. Run the validator.
3. If an active package exists, inspect only its recorded files and focused test output.
4. If status claims a pass but evidence is absent, downgrade it and record the discrepancy.
5. If files changed after the last handoff, add a recovery entry before continuing.
6. Repair a broken recorded baseline before selecting new work.

Never infer completion from file presence or a polished screenshot.

## 12. Measuring harness quality

Review the harness after representative packages using:

- percentage of cycles ending with synchronized valid state;
- percentage of `VERIFIED` packages later reopened;
- time/tool calls spent regaining context;
- focused-test and end-to-end defect escape rates;
- visual review failures by component;
- tokens and wall-clock time per verified package;
- unnecessary approvals, repeated scans, or duplicated instructions.

Remove or simplify a harness rule when it adds cost without preventing a measured failure. Add a rule only when it addresses a concrete recurring failure mode.
