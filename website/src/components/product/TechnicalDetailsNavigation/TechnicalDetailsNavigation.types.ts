export interface TechnicalDetailsNavigationProps {
  /** Visible source-owned label for the technical-details destination. */
  readonly label: string;
  /** Localized landmark name for the compact in-page navigation. */
  readonly navigationLabel: string;
  /** Fragment identifier of the technical-details section. */
  readonly targetId?: string;
}
