import type { ActionLinkProps } from "../../core/Action/Action.types";

export interface InnoTransEventProps {
  /** Stable fragment destination for the temporary homepage announcement. */
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly date: string;
  readonly startDate: string;
  readonly location: string;
  readonly action: ActionLinkProps;
  readonly diagram: {
    readonly routeLabel: string;
    readonly highlightLabel: string;
    readonly origin: string;
    readonly destination: string;
    readonly eventLabel: string;
    readonly companyLabel: string;
  };
}
