export const BUTTON_SIZE = ["xs", "s", "m", "l"] as const;
export const BUTTON_COLOR = ["accent", "primary", "success", "danger", "warning", "neutral", "subdued"] as const;
export type ButtonColor = (typeof BUTTON_COLOR)[number];
