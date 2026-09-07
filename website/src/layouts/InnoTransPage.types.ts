import type { ImageMetadata } from "astro";

import type { ActionLinkProps } from "../components/core/Action/Action.types";
import type { PageHeroProps } from "../components/editorial/PageHero/PageHero.types";
import type { ContactCTAProps } from "../components/home/ContactCTA/ContactCTA.types";
import type { BaseLayoutProps } from "./BaseLayout.types";

export interface InnoTransFact {
  readonly label: string;
  readonly value: string;
}

export interface InnoTransPosition {
  readonly code: string;
  readonly role: string;
  readonly action: ActionLinkProps;
}

export interface InnoTransPartner {
  readonly name: string;
  readonly role: string;
  readonly description: string;
  readonly logo: ImageMetadata;
  readonly logoAlt: string;
  readonly action: ActionLinkProps;
}

export interface InnoTransPageProps {
  readonly layout: BaseLayoutProps;
  readonly hero: PageHeroProps;
  readonly visit: {
    readonly eyebrow: string;
    readonly title: string;
    readonly summary: string;
    readonly facts: readonly InnoTransFact[];
    readonly actions: readonly ActionLinkProps[];
    readonly positions: readonly InnoTransPosition[];
    readonly positionListLabel: string;
    readonly map: {
      readonly title: string;
      readonly caption: string;
      readonly trackLabel: string;
      readonly outdoorLabel: string;
      readonly entranceLabel: string;
    };
  };
  readonly partners: {
    readonly eyebrow: string;
    readonly title: string;
    readonly summary: string;
    readonly items: readonly InnoTransPartner[];
  };
  readonly contactCta: ContactCTAProps;
}
