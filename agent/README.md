# Agent harness

This directory contains the durable control plane for long-running implementation with OpenAI coding models.

## Files

| Path | Role |
| --- | --- |
| [`HARNESS.md`](HARNESS.md) | Architecture, state machine, safety, and operating procedure |
| [`prompts/initializer.md`](prompts/initializer.md) | One-time setup prompt for a fresh project |
| [`prompts/worker.md`](prompts/worker.md) | Stable prompt for one bounded implementation cycle |
| [`prompts/evaluator.md`](prompts/evaluator.md) | Independent verification prompt for selected packages |
| [`schemas/cycle-result.schema.json`](schemas/cycle-result.schema.json) | Structured worker result contract |
| [`schemas/evaluation-result.schema.json`](schemas/evaluation-result.schema.json) | Structured evaluator result contract |
| [`scripts/run-loop.sh`](scripts/run-loop.sh) | Safe bounded Codex worker loop |
| [`scripts/run-evaluator.sh`](scripts/run-evaluator.sh) | One independent evaluation cycle |
| [`scripts/validate-state.sh`](scripts/validate-state.sh) | State-file and tracker consistency checks |
| [`scripts/validate-inputs.sh`](scripts/validate-inputs.sh) | Product JSON, local image, logo digest, and public-size checks |
| `logs/` | Ignored JSONL execution logs |
| `results/` | Ignored structured final results |
| `reviews/` | Evaluator reports, created on demand |

The active project context is not duplicated here. Read root [`../STATUS.md`](../STATUS.md), [`../CHANGELOG.md`](../CHANGELOG.md), and the package documents they name.
