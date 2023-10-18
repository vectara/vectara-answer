export const SUMMARY_STYLES = [
  "default",
  "colbert",
  "bullets",
  "email",
  "legal",
  "developer",
  "pooh",
  "thompson"
] as const;

export type SummaryStyle = (typeof SUMMARY_STYLES)[number];

const styleToPromptMap: Record<SummaryStyle, string> = {
  default: "Default style",
  colbert: "In the style of Stephen Colbert",
  bullets: "In bullet point format",
  email: "In email draft format",
  legal: "As a lawyer using legal terms",
  developer: "In the style of a software developer",
  pooh: "In the style of Winnie the Pooh",
  thompson: "In the style of journalist Hunter S. Thompson",
} as const;

export const humanizeStyle = (style: SummaryStyle): string => {
  return styleToPromptMap[style];
};
