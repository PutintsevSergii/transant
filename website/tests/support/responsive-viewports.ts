export interface ResponsiveProject {
  readonly name: string;
  readonly viewport: {
    readonly width: number;
    readonly height: number;
  };
  readonly isMobile?: boolean;
}

export const responsiveProjects: readonly ResponsiveProject[] = [
  {
    name: "chromium-320",
    viewport: { width: 320, height: 720 },
    isMobile: true,
  },
  {
    name: "chromium-390",
    viewport: { width: 390, height: 844 },
    isMobile: true,
  },
  { name: "chromium-768", viewport: { width: 768, height: 1024 } },
  { name: "chromium-1024", viewport: { width: 1024, height: 768 } },
  { name: "chromium-1440", viewport: { width: 1440, height: 900 } },
  {
    name: "chromium-phone-landscape",
    viewport: { width: 844, height: 390 },
    isMobile: true,
  },
];

export const canonicalWidths = [320, 390, 768, 1024, 1440] as const;
