#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
STATUS_FILE="$PROJECT_ROOT/STATUS.md"
CHANGELOG_FILE="$PROJECT_ROOT/CHANGELOG.md"
TRACKER_FILE="$PROJECT_ROOT/docs/specifications/component-implementation-status.md"
PLAN_FILE="$PROJECT_ROOT/docs/specifications/v7-component-development-plan.md"
V7_SCREEN="$PROJECT_ROOT/prep/design/stitch-generations/v7/stitch_transant_b2b_website_redesign (6)/screen.png"

errors=0

fail() {
  echo "state-error: $1" >&2
  errors=$((errors + 1))
}

for required_file in \
  "$PROJECT_ROOT/AGENTS.md" \
  "$STATUS_FILE" \
  "$CHANGELOG_FILE" \
  "$TRACKER_FILE" \
  "$PLAN_FILE" \
  "$V7_SCREEN"; do
  if [[ ! -f "$required_file" ]]; then
    fail "missing required file: ${required_file#"$PROJECT_ROOT/"}"
  fi
done

if ((errors > 0)); then
  exit 1
fi

required_status_fields=(
  "Last updated"
  "Lifecycle"
  "Active work package"
  "Active objective"
  "Last completed work package"
  "Next eligible work package"
  "Last change-log entry"
  "State validation command"
  "Input validation command"
  "Application baseline command"
)

for field in "${required_status_fields[@]}"; do
  if ! grep -qE "^- ${field}: .+" "$STATUS_FILE"; then
    fail "STATUS.md is missing a populated '${field}' field"
  fi
done

lifecycle="$(awk -F': ' '/^- Lifecycle: / {print $2; exit}' "$STATUS_FILE")"
case "$lifecycle" in
  READY | RUNNING | BLOCKED | PAUSED | COMPLETE) ;;
  *) fail "invalid lifecycle '$lifecycle'" ;;
esac

package_count="$(awk -F'|' '/^\| (F|C|H|P|E|A|I)-[0-9][0-9][0-9] / {count++} END {print count+0}' "$TRACKER_FILE")"
if [[ "$package_count" != "43" ]]; then
  fail "tracker contains $package_count package rows; expected 43"
fi

duplicate_ids="$(awk -F'|' '/^\| (F|C|H|P|E|A|I)-[0-9][0-9][0-9] / {id=$2; gsub(/[[:space:]]/, "", id); print id}' "$TRACKER_FILE" | sort | uniq -d)"
if [[ -n "$duplicate_ids" ]]; then
  fail "tracker contains duplicate package IDs: $duplicate_ids"
fi

invalid_statuses="$(awk -F'|' '
  /^\| (F|C|H|P|E|A|I)-[0-9][0-9][0-9] / {
    status=$5
    gsub(/[ `[:space:]]/, "", status)
    if (status != "NOT_STARTED" && status != "IN_PROGRESS" && status != "IMPLEMENTED" && status != "VERIFIED" && status != "BLOCKED" && status != "DEFERRED") print $2 ":" status
  }
' "$TRACKER_FILE")"
if [[ -n "$invalid_statuses" ]]; then
  fail "tracker contains invalid status values: $invalid_statuses"
fi

active_package="$(awk -F': ' '/^- Active work package: / {print $2; exit}' "$STATUS_FILE")"
if [[ "$active_package" != "NONE" ]]; then
  if [[ ! "$active_package" =~ ^(F|C|H|P|E|A|I)-[0-9]{3}$ ]]; then
    fail "active package '$active_package' is not a valid package ID"
  elif ! grep -qE "^\| ${active_package} .*\| \`(IN_PROGRESS|IMPLEMENTED|BLOCKED)\` \|" "$TRACKER_FILE"; then
    fail "active package '$active_package' is not active in the tracker"
  fi
fi

last_completed="$(awk -F': ' '/^- Last completed work package: / {print $2; exit}' "$STATUS_FILE")"
if [[ "$last_completed" != "NONE" && ! "$last_completed" =~ ^(F|C|H|P|E|A|I)-[0-9]{3}$ ]]; then
  fail "last completed package '$last_completed' is not a valid package ID"
fi

next_package="$(awk -F': ' '/^- Next eligible work package: / {print $2; exit}' "$STATUS_FILE")"
if [[ "$next_package" != "NONE" && ! "$next_package" =~ ^(F|C|H|P|E|A|I)-[0-9]{3}( |$) ]]; then
  fail "next eligible package '$next_package' does not start with a valid package ID"
fi

last_entry="$(awk -F': ' '/^- Last change-log entry: / {sub(/^- Last change-log entry: /, ""); print; exit}' "$STATUS_FILE")"
if [[ "$last_entry" != "NONE" ]] && ! grep -qF "## $last_entry" "$CHANGELOG_FILE"; then
  fail "STATUS.md references a missing change-log entry: $last_entry"
fi

if find "$PROJECT_ROOT" -path "$PROJECT_ROOT/prep" -prune -o -name .DS_Store -type f -print -quit | grep -q .; then
  fail "generated .DS_Store metadata exists outside prep"
fi

if ((errors > 0)); then
  echo "state validation failed with $errors error(s)" >&2
  exit 1
fi

echo "state-ok: lifecycle=$lifecycle active=$active_package next=$next_package packages=$package_count"
