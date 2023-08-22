export const BUTTON_SIZE = ["xs", "s", "m"] as const;
export const BUTTON_COLOR = ["accent", "primary", "success", "danger", "warning", "neutral"] as const;
export type ButtonColor = (typeof BUTTON_COLOR)[number];
