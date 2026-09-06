#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PROMPT_FILE="$PROJECT_ROOT/agent/prompts/worker.md"
SCHEMA_FILE="$PROJECT_ROOT/agent/schemas/cycle-result.schema.json"
STATE_VALIDATOR="$PROJECT_ROOT/agent/scripts/validate-state.sh"
INPUT_VALIDATOR="$PROJECT_ROOT/agent/scripts/validate-inputs.sh"
LOG_DIR="$PROJECT_ROOT/agent/logs"
RESULT_DIR="$PROJECT_ROOT/agent/results"

HARNESS_MODEL="${HARNESS_MODEL:-gpt-5.6-terra}"
HARNESS_MAX_CYCLES="${HARNESS_MAX_CYCLES:-1}"
HARNESS_DRY_RUN="${HARNESS_DRY_RUN:-0}"

if [[ ! "$HARNESS_MAX_CYCLES" =~ ^[1-9][0-9]*$ ]]; then
  echo "HARNESS_MAX_CYCLES must be a positive integer" >&2
  exit 2
fi

if ((HARNESS_MAX_CYCLES > 50)); then
  echo "HARNESS_MAX_CYCLES may not exceed 50" >&2
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

mkdir -p "$LOG_DIR" "$RESULT_DIR"

git_args=()
if ! git -C "$PROJECT_ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git_args+=(--skip-git-repo-check)
fi

"$STATE_VALIDATOR"
"$INPUT_VALIDATOR"

if [[ "$HARNESS_DRY_RUN" == "1" ]]; then
  echo "harness-dry-run: preflight passed model=$HARNESS_MODEL cycles=$HARNESS_MAX_CYCLES"
  exit 0
fi

for ((cycle = 1; cycle <= HARNESS_MAX_CYCLES; cycle++)); do
  lifecycle="$(awk -F': ' '/^- Lifecycle: / {print $2; exit}' "$PROJECT_ROOT/STATUS.md")"
  case "$lifecycle" in
    BLOCKED | PAUSED | COMPLETE)
      echo "harness-stop: lifecycle=$lifecycle"
      exit 0
      ;;
  esac

  timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
  log_file="$LOG_DIR/${timestamp}-worker-${cycle}.jsonl"
  result_file="$RESULT_DIR/${timestamp}-worker-${cycle}.json"
  status_before="$(cksum <"$PROJECT_ROOT/STATUS.md")"
  tracker_before="$(cksum <"$PROJECT_ROOT/docs/specifications/component-implementation-status.md")"
  changelog_size_before="$(wc -c <"$PROJECT_ROOT/CHANGELOG.md" | tr -d ' ')"
  changelog_prefix_before="$(head -c "$changelog_size_before" "$PROJECT_ROOT/CHANGELOG.md" | cksum)"

  echo "harness-cycle: $cycle/$HARNESS_MAX_CYCLES model=$HARNESS_MODEL"

  codex_args=(
    exec
    --approve-for-me
    --cd "$PROJECT_ROOT"
    --model "$HARNESS_MODEL"
    --output-schema "$SCHEMA_FILE"
    --output-last-message "$result_file"
    --json
  )

  if ((${#git_args[@]} > 0)); then
    codex_args+=("${git_args[@]}")
  fi

  set +e
  codex "${codex_args[@]}" - <"$PROMPT_FILE" | tee "$log_file"
  codex_exit=${PIPESTATUS[0]}
  set -e

  if ((codex_exit != 0)); then
    echo "harness-stop: codex exited with status $codex_exit; inspect $log_file" >&2
    exit "$codex_exit"
  fi

  status_after="$(cksum <"$PROJECT_ROOT/STATUS.md")"
  tracker_after="$(cksum <"$PROJECT_ROOT/docs/specifications/component-implementation-status.md")"
  changelog_size_after="$(wc -c <"$PROJECT_ROOT/CHANGELOG.md" | tr -d ' ')"
  changelog_prefix_after="$(head -c "$changelog_size_before" "$PROJECT_ROOT/CHANGELOG.md" | cksum)"

  if [[ "$status_before" == "$status_after" ]]; then
    echo "harness-stop: STATUS.md was not updated during cycle $cycle" >&2
    exit 1
  fi

  if [[ "$tracker_before" == "$tracker_after" ]]; then
    echo "harness-stop: component tracker was not updated during cycle $cycle" >&2
    exit 1
  fi

  if ((changelog_size_after <= changelog_size_before)); then
    echo "harness-stop: CHANGELOG.md did not receive an appended entry during cycle $cycle" >&2
    exit 1
  fi

  if [[ "$changelog_prefix_before" != "$changelog_prefix_after" ]]; then
    echo "harness-stop: existing CHANGELOG.md content was rewritten during cycle $cycle" >&2
    exit 1
  fi

  if ! "$STATE_VALIDATOR"; then
    echo "harness-stop: persistent state validation failed after cycle $cycle" >&2
    exit 1
  fi

  if ! "$INPUT_VALIDATOR"; then
    echo "harness-stop: production input validation failed after cycle $cycle" >&2
    exit 1
  fi
done

echo "harness-stop: configured cycle limit reached ($HARNESS_MAX_CYCLES)"
