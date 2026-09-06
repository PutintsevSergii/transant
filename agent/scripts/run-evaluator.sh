#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PROMPT_FILE="$PROJECT_ROOT/agent/prompts/evaluator.md"
SCHEMA_FILE="$PROJECT_ROOT/agent/schemas/evaluation-result.schema.json"
STATE_VALIDATOR="$PROJECT_ROOT/agent/scripts/validate-state.sh"
INPUT_VALIDATOR="$PROJECT_ROOT/agent/scripts/validate-inputs.sh"
LOG_DIR="$PROJECT_ROOT/agent/logs"
RESULT_DIR="$PROJECT_ROOT/agent/results"

HARNESS_MODEL="${HARNESS_MODEL:-gpt-5.6-terra}"
HARNESS_PACKAGE="${HARNESS_PACKAGE:-$(awk -F': ' '/^- Last completed work package: / {print $2; exit}' "$PROJECT_ROOT/STATUS.md")}"
HARNESS_DRY_RUN="${HARNESS_DRY_RUN:-0}"

if [[ ! "$HARNESS_PACKAGE" =~ ^(F|C|H|P|E|A|I)-[0-9]{3}$ ]]; then
  echo "Set HARNESS_PACKAGE to a valid package ID; got '$HARNESS_PACKAGE'" >&2
  exit 2
fi

if [[ "$HARNESS_DRY_RUN" != "0" && "$HARNESS_DRY_RUN" != "1" ]]; then
  echo "HARNESS_DRY_RUN must be 0 or 1" >&2
  exit 2
fi

if ! command -v codex >/dev/null 2>&1; then
  echo "codex CLI is required but was not found" >&2
  exit 2
fi

mkdir -p "$LOG_DIR" "$RESULT_DIR" "$PROJECT_ROOT/agent/reviews"

git_args=()
if ! git -C "$PROJECT_ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git_args+=(--skip-git-repo-check)
fi

"$STATE_VALIDATOR"
"$INPUT_VALIDATOR"

if [[ "$HARNESS_DRY_RUN" == "1" ]]; then
  echo "evaluator-dry-run: preflight passed model=$HARNESS_MODEL package=$HARNESS_PACKAGE"
  exit 0
fi

timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
log_file="$LOG_DIR/${timestamp}-evaluator-${HARNESS_PACKAGE}.jsonl"
result_file="$RESULT_DIR/${timestamp}-evaluator-${HARNESS_PACKAGE}.json"
status_before="$(cksum <"$PROJECT_ROOT/STATUS.md")"
tracker_before="$(cksum <"$PROJECT_ROOT/docs/specifications/component-implementation-status.md")"
changelog_size_before="$(wc -c <"$PROJECT_ROOT/CHANGELOG.md" | tr -d ' ')"
changelog_prefix_before="$(head -c "$changelog_size_before" "$PROJECT_ROOT/CHANGELOG.md" | cksum)"

set +e
{
  cat "$PROMPT_FILE"
  echo
  echo "Candidate package: $HARNESS_PACKAGE"
} | codex exec \
  --approve-for-me \
  --cd "$PROJECT_ROOT" \
  --model "$HARNESS_MODEL" \
  --output-schema "$SCHEMA_FILE" \
  --output-last-message "$result_file" \
  --json \
  "${git_args[@]}" \
  - | tee "$log_file"
codex_exit=${PIPESTATUS[1]}
set -e

if ((codex_exit != 0)); then
  echo "evaluator-stop: codex exited with status $codex_exit; inspect $log_file" >&2
  exit "$codex_exit"
fi

status_after="$(cksum <"$PROJECT_ROOT/STATUS.md")"
tracker_after="$(cksum <"$PROJECT_ROOT/docs/specifications/component-implementation-status.md")"
changelog_size_after="$(wc -c <"$PROJECT_ROOT/CHANGELOG.md" | tr -d ' ')"
changelog_prefix_after="$(head -c "$changelog_size_before" "$PROJECT_ROOT/CHANGELOG.md" | cksum)"

if [[ "$status_before" == "$status_after" ]]; then
  echo "evaluator-stop: STATUS.md was not updated" >&2
  exit 1
fi

if [[ "$tracker_before" == "$tracker_after" ]]; then
  echo "evaluator-stop: component tracker was not updated" >&2
  exit 1
fi

if ((changelog_size_after <= changelog_size_before)); then
  echo "evaluator-stop: CHANGELOG.md did not receive an appended entry" >&2
  exit 1
fi

if [[ "$changelog_prefix_before" != "$changelog_prefix_after" ]]; then
  echo "evaluator-stop: existing CHANGELOG.md content was rewritten" >&2
  exit 1
fi

"$STATE_VALIDATOR"
"$INPUT_VALIDATOR"
echo "evaluator-stop: package=$HARNESS_PACKAGE result=$result_file"
