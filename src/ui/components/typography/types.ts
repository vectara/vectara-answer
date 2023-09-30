export const TITLE_SIZE = ["xxs", "xs", "s", "m", "l", "xl", "xxl"] as const;

export const TEXT_COLOR = ["accent", "primary", "success", "warning", "danger", "subdued", "neutral"] as const;
export type TextColor = (typeof TEXT_COLOR)[number];

export const TEXT_SIZE = ["xs", "s", "m", "l"] as const;
