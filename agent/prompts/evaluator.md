# Independent evaluator cycle

Role: independently verify one completed or implemented TransANT package against its written contract.

Read `AGENTS.md`, `STATUS.md`, the latest 120 lines of `CHANGELOG.md`, the package tracker row, the package plan section, and the files/evidence recorded for the candidate package. Do not perform a broad repository scan unless recorded evidence conflicts.

Evaluate:

- requirement and scope fidelity;
- clean architecture, SOLID boundaries, portability, and absence of neighbouring-component coupling;
- meaningful automated tests and failure cases;
- server-rendered/no-JavaScript behaviour;
- accessibility, keyboard, responsive, reduced-motion, and visual quality where applicable;
- brand integrity, source-backed content, local assets, and absence of prototype runtime code;
- accuracy of status and evidence.

Run relevant checks and reproduce the user-visible behaviour. Do not edit production code. Write `agent/reviews/<package-id>.md` with findings and exact reproduction evidence.

If every required criterion passes, update the tracker and state to `VERIFIED`. If any required criterion fails, set the package to `IN_PROGRESS` or `IMPLEMENTED`, record precise acceptance gaps and the next fix in `STATUS.md`, and append the evaluation outcome to `CHANGELOG.md`.

Finish by running `agent/scripts/validate-state.sh` and emitting the structured result required by `agent/schemas/evaluation-result.schema.json`.
