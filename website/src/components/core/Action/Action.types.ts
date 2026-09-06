export type ActionVariant = "primary" | "secondary" | "text" | "inverse";

export type ActionSize = "compact" | "regular";

export type ActionIcon = "arrow-right" | "download";

interface ActionBaseProps {
  /** Visible, concise action label. */
  readonly label: string;
  /** Visual treatment; semantic element selection is controlled by `kind`. */
  readonly variant: ActionVariant;
  /** Both sizes preserve the 44 CSS-pixel minimum action target. */
  readonly size?: ActionSize;
  /** Optional decorative directional or download icon. */
  readonly icon?: ActionIcon;
  /** Adds a disabled state without retaining an active destination or control. */
  readonly disabled?: boolean;
}

export interface ActionLinkProps extends ActionBaseProps {
  readonly kind: "link";
  /** A real destination is required for a link action. */
  readonly href: string;
  /** Opens a destination in a new tab with safe relationship attributes. */
  readonly external?: boolean;
  /** Caller-owned accessible notice for links that open a new tab. */
  readonly externalLabel?: string;
}

export interface ActionButtonProps extends ActionBaseProps {
  readonly kind: "button";
  /** Native button behaviour; defaults to `button` to avoid accidental submits. */
  readonly type?: "button" | "submit" | "reset";
}

export type ActionProps = ActionLinkProps | ActionButtonProps;
