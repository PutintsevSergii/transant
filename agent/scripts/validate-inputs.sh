#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WEBSITE_ROOT="$PROJECT_ROOT/website"
CONTENT_ROOT="$WEBSITE_ROOT/src/content"
ASSET_ROOT="$WEBSITE_ROOT/src/assets/images"
CATALOG_FILE="$CONTENT_ROOT/catalog.json"
LOGO_FILE="$WEBSITE_ROOT/public/brand/transant-logo.png"
EXPECTED_LOGO_SHA="fc0a30fff3e99c2a7af66ca78d04af82218a035c0926b11c2d5418d14ac0c985"

if ! command -v jq >/dev/null 2>&1; then
  echo "input-error: jq is required" >&2
  exit 2
fi

errors=0

fail() {
  echo "input-error: $1" >&2
  errors=$((errors + 1))
}

while IFS= read -r json_file; do
  if ! jq empty "$json_file"; then
    fail "invalid JSON: ${json_file#"$PROJECT_ROOT/"}"
  fi
done < <(find "$CONTENT_ROOT" -name '*.json' -type f | sort)

product_count="$(find "$CONTENT_ROOT/products" -name product.json -type f | wc -l | tr -d ' ')"
catalog_count="$(jq '.products | length' "$CATALOG_FILE")"

if [[ "$product_count" != "10" ]]; then
  fail "found $product_count individual product records; expected 10"
fi

if [[ "$catalog_count" != "10" ]]; then
  fail "aggregate catalogue contains $catalog_count products; expected 10"
fi

while IFS= read -r product_file; do
  product_id="$(jq -r '.id' "$product_file")"
  image_path="$(jq -r '.image' "$product_file")"
  catalog_image="$(jq -r --arg id "$product_id" '.products[$id].image // empty' "$CATALOG_FILE")"

  if [[ -z "$product_id" || "$product_id" == "null" ]]; then
    fail "missing product id: ${product_file#"$PROJECT_ROOT/"}"
  fi

  if [[ "$image_path" == /* || "$image_path" == *".."* ]]; then
    fail "unsafe or non-logical image path for $product_id: $image_path"
  elif [[ ! -f "$ASSET_ROOT/$image_path" ]]; then
    fail "missing product image for $product_id: src/assets/images/$image_path"
  fi

  if [[ "$catalog_image" != "$image_path" ]]; then
    fail "catalogue and individual image paths differ for $product_id"
  fi
done < <(find "$CONTENT_ROOT/products" -name product.json -type f | sort)

if [[ ! -f "$LOGO_FILE" ]]; then
  fail "missing immutable public logo"
else
  actual_logo_sha="$(shasum -a 256 "$LOGO_FILE" | awk '{print $1}')"
  if [[ "$actual_logo_sha" != "$EXPECTED_LOGO_SHA" ]]; then
    fail "logo digest changed: expected $EXPECTED_LOGO_SHA, got $actual_logo_sha"
  fi
fi

large_public_file="$(find "$WEBSITE_ROOT/public" -type f -size +26214400c -print -quit)"
if [[ -n "$large_public_file" ]]; then
  fail "public file exceeds 25 MiB: ${large_public_file#"$PROJECT_ROOT/"}"
fi

large_active_asset="$(find "$ASSET_ROOT" -type f -size +26214400c -print -quit)"
if [[ -n "$large_active_asset" ]]; then
  fail "active source asset exceeds 25 MiB; move the master to prep and use a reviewed web source: ${large_active_asset#"$PROJECT_ROOT/"}"
fi

if ((errors > 0)); then
  echo "input validation failed with $errors error(s)" >&2
  exit 1
fi

echo "input-ok: products=$product_count catalog=$catalog_count logo=$EXPECTED_LOGO_SHA active-asset-max=25MiB public-max=25MiB"
