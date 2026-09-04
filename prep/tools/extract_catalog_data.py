#!/usr/bin/env python3
"""Extract the catalogue JSON embedded in the self-contained HTML prototype.

The prototype stores all product copy and images in one large JavaScript object.
This script keeps the copy, replaces embedded image data with stable public paths,
and writes product-oriented JSON and Markdown for website development.
"""

from __future__ import annotations

import json
from copy import deepcopy
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PROTOTYPE = ROOT / "source-material" / "prototypes" / "transant-product-website-prototype.html"
CONTENT_ROOT = ROOT / "website" / "content"
PRODUCT_ROOT = CONTENT_ROOT / "products"

CATEGORY_FOLDERS = {
    "intermodal": "intermodal",
    "flat": "flat",
    "timber": "timber",
    "multi": "open-box",
    "tank": "tank",
}

PRODUCTS = {
    "sgns": ("sgns", "uno-intermodal-60ft-sgns"),
    "rens": ("rens", "uno-flat-60ft-rens"),
    "relns": ("relns", "uno-flat-60ft-relns"),
    "rns": ("rns", "uno-flat-60ft-rns"),
    "rnoos": ("rnoos", "uno-timber-60ft-rnoos"),
    "snps": ("snps", "uno-timber-60ft-snps"),
    # The source prototype uses the misspelled key "ealmnos" for Eamnos.
    "ealmnos": ("eamnos", "uno-multibox-33ft-eamnos"),
    "eanos40": ("eanos-40", "uno-multi-40ft-eanos"),
    "eanos56": ("eanos-56", "uno-multi-56ft-eanos"),
    "zacns": ("zacns", "uno-tank-88m3-zacns"),
}


def read_embedded_data() -> dict:
    source = PROTOTYPE.read_text(encoding="utf-8")
    marker = "const DATA = "
    start = source.index(marker) + len(marker)
    data, _ = json.JSONDecoder().raw_decode(source[start:])
    return data


def public_image_path(category: str, slug: str) -> str:
    folder = CATEGORY_FOLDERS[category]
    return f"/images/products/{folder}/{slug}/wagon-render.png"


def markdown_list(items: list[str]) -> str:
    return "\n".join(f"- {item}" for item in items)


def product_markdown(product: dict) -> str:
    specs = "\n".join(f"| {label} | {value} |" for label, value in product["specs"])
    load_limit = ""
    if product.get("loadlimit"):
        load_rows = "\n".join(f"| {line_class} | {limit} t |" for line_class, limit in product["loadlimit"])
        load_limit = f"""

## Load limit by line class

| Route class | Load limit (S) |
| --- | ---: |
{load_rows}
"""
    goods = ""
    if product.get("goods"):
        goods_rows = "\n".join(f"| {name} | {number} |" for name, number in product["goods"])
        goods = f"""

## Approved transport goods

| Product | UN number |
| --- | --- |
{goods_rows}
"""
    intro = "\n\n".join(product["intro"])
    return f"""# {product['name']} - {product['code']}

{product['tagline']}

{intro}

- Category: {product['category_name']}
- Source product key: `{product['source_id']}`
- Website image: `{product['image']}`

## Typical commodities

{markdown_list(product['commodities'])}

## Key benefits

{markdown_list(product['benefits'])}

## Technical specifications

| Specification | Value |
| --- | --- |
{specs}
{load_limit}

## Special features

{markdown_list(product['special'])}
{goods}
"""


def write_outputs(data: dict) -> None:
    PRODUCT_ROOT.mkdir(parents=True, exist_ok=True)
    categories_by_id = {category["id"]: category for category in data["categories"]}
    cleaned_products: dict[str, dict] = {}

    for source_id, source_product in data["products"].items():
        product_id, slug = PRODUCTS[source_id]
        category_id = source_product["cat"]
        category_folder = CATEGORY_FOLDERS[category_id]
        category = categories_by_id[category_id]
        product = deepcopy(source_product)
        product.update(
            {
                "id": product_id,
                "source_id": source_id,
                "slug": slug,
                "category": category_folder,
                "category_name": category["name"],
                "image": public_image_path(category_id, slug),
            }
        )
        product.pop("cat", None)
        product.pop("img", None)
        cleaned_products[product_id] = product

        product_dir = PRODUCT_ROOT / category_folder / slug
        product_dir.mkdir(parents=True, exist_ok=True)
        (product_dir / "product.json").write_text(
            json.dumps(product, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        (product_dir / "README.md").write_text(product_markdown(product), encoding="utf-8")

    cleaned_categories = []
    for category in data["categories"]:
        category_folder = CATEGORY_FOLDERS[category["id"]]
        category_products = [PRODUCTS[source_id][0] for source_id in category["models"]]
        clean_category = {
            "id": category_folder,
            "source_id": category["id"],
            "name": category["name"],
            "tag": category["tag"],
            "description": category["desc"],
            "products": category_products,
        }
        cleaned_categories.append(clean_category)

        rows = []
        for source_id in category["models"]:
            product_id, slug = PRODUCTS[source_id]
            product = cleaned_products[product_id]
            rows.append(f"- [{product['name']} - {product['code']}](./{slug}/README.md)")
        category_readme = f"""# {category['name']} wagons

{category['desc']}

Commercial use: {category['tag']}.

## Models

{chr(10).join(rows)}
"""
        category_dir = PRODUCT_ROOT / category_folder
        category_dir.mkdir(parents=True, exist_ok=True)
        (category_dir / "README.md").write_text(category_readme, encoding="utf-8")

    catalog = {
        "name": "TransANT UNO wagon range",
        "source": str(PROTOTYPE.relative_to(ROOT)),
        "categories": cleaned_categories,
        "products": cleaned_products,
    }
    (CONTENT_ROOT / "catalog.json").write_text(
        json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    category_links = "\n".join(
        f"- [{category['name']}](./products/{category['id']}/README.md) - {len(category['products'])} model(s)"
        for category in cleaned_categories
    )
    content_readme = f"""# Website content

This directory contains product copy extracted from the self-contained HTML prototype. `catalog.json` is the aggregate data source; each product also has a colocated `product.json` and human-readable `README.md`.

## Product categories

{category_links}

Regenerate these files with `python3 tools/extract_catalog_data.py` after updating the prototype.
"""
    (CONTENT_ROOT / "README.md").write_text(content_readme, encoding="utf-8")


if __name__ == "__main__":
    write_outputs(read_embedded_data())
