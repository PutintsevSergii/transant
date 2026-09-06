export type RailwayOrbitalMotion = "auto" | "off";

export type RailwayOrbitalDensity = "sparse" | "standard" | "dense";

export type RailwayOrbitalAccent = "blue" | "red";

export interface RailwayOrbitalProps {
  /** Optional accessible figure label; omit it when the graphic is decorative. */
  readonly label?: string;
  /** `auto` enables only the optional onscreen motion enhancement. */
  readonly motion?: RailwayOrbitalMotion;
  /** Controls the amount of static route-marker detail. */
  readonly density?: RailwayOrbitalDensity;
  /** Selects a restrained existing-token accent treatment. */
  readonly accent?: RailwayOrbitalAccent;
}
