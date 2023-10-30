export type BreakpointsMapType = Record<string, number>;

export const MediaBreakpoints: BreakpointsMapType = {
  mobile: 320,
  mobileXL: 520,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
  fullhd: 1920,
  wide: 2560,
} as const;

export const media = {
  mobile: `@media (min-width: ${MediaBreakpoints.mobile}px)`,
  mobileXL: `@media (min-width: ${MediaBreakpoints.mobileXL}px)`,
  tablet: `@media (min-width: ${MediaBreakpoints.tablet}px)`,
  laptop: `@media (min-width: ${MediaBreakpoints.laptop}px)`,
  desktop: `@media (min-width: ${MediaBreakpoints.desktop}px)`,
  fullhd: `@media (min-width: ${MediaBreakpoints.fullhd}px)`,
  wide: `@media (min-width: ${MediaBreakpoints.wide}px)`,
};

export const mediaRevers = {
  mobile: `@media (max-width: ${MediaBreakpoints.mobile - 1}px)`,
  tablet: `@media (max-width: ${MediaBreakpoints.tablet - 1}px)`,
  laptop: `@media (max-width: ${MediaBreakpoints.laptop - 1}px)`,
  desktop: `@media (max-width: ${MediaBreakpoints.desktop - 1}px)`,
  wide: `@media (max-width: ${MediaBreakpoints.wide - 1}px)`,
};
