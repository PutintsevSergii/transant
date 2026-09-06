import type { ImageMetadata } from "astro";

import flatRelnsWagon from "../../assets/images/products/flat/uno-flat-60ft-relns/wagon-render.png";
import flatRensWagon from "../../assets/images/products/flat/uno-flat-60ft-rens/wagon-render.png";
import flatRnsWagon from "../../assets/images/products/flat/uno-flat-60ft-rns/wagon-render.png";
import intermodalWagon from "../../assets/images/products/intermodal/uno-intermodal-60ft-sgns/wagon-render.png";
import openBox40Wagon from "../../assets/images/products/open-box/uno-multi-40ft-eanos/wagon-render.png";
import openBox56Wagon from "../../assets/images/products/open-box/uno-multi-56ft-eanos/wagon-render.png";
import openBox33Wagon from "../../assets/images/products/open-box/uno-multibox-33ft-eamnos/wagon-render.png";
import tankWagon from "../../assets/images/products/tank/uno-tank-88m3-zacns/wagon-render.png";
import timberRnoosWagon from "../../assets/images/products/timber/uno-timber-60ft-rnoos/wagon-render.png";
import timberSnpsWagon from "../../assets/images/products/timber/uno-timber-60ft-snps/wagon-render.png";
import type { ResponsiveMediaProps } from "../../components/core/ResponsiveMedia/ResponsiveMedia.types";
import type { Product } from "../../domain/content/types";
import catalogJson from "../../content/catalog.json";
import { parseCatalogSource } from "./catalog-source";

/** Parsed release-one product source and reviewed local render adapter. */
export const catalogue = parseCatalogSource(catalogJson);

const wagonImages: Readonly<Record<string, ImageMetadata>> = {
  "products/intermodal/uno-intermodal-60ft-sgns/wagon-render.png":
    intermodalWagon,
  "products/flat/uno-flat-60ft-rens/wagon-render.png": flatRensWagon,
  "products/flat/uno-flat-60ft-relns/wagon-render.png": flatRelnsWagon,
  "products/flat/uno-flat-60ft-rns/wagon-render.png": flatRnsWagon,
  "products/timber/uno-timber-60ft-rnoos/wagon-render.png": timberRnoosWagon,
  "products/timber/uno-timber-60ft-snps/wagon-render.png": timberSnpsWagon,
  "products/open-box/uno-multibox-33ft-eamnos/wagon-render.png": openBox33Wagon,
  "products/open-box/uno-multi-40ft-eanos/wagon-render.png": openBox40Wagon,
  "products/open-box/uno-multi-56ft-eanos/wagon-render.png": openBox56Wagon,
  "products/tank/uno-tank-88m3-zacns/wagon-render.png": tankWagon,
};

/** Resolves only source-approved logical render paths to local image metadata. */
export function wagonMedia(product: Product): ResponsiveMediaProps {
  const image = wagonImages[product.imagePath];
  if (!image) {
    throw new Error(`Missing reviewed wagon render for ${product.id}.`);
  }

  return {
    image,
    alt: `Render of ${product.name} ${product.code} freight wagon`,
    sizes: "(min-width: 56rem) 48vw, 100vw",
    fit: "contain",
    aspectRatio: "3 / 2",
  };
}
