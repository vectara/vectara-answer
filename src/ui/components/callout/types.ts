export const CALLOUT_COLOR = ["accent", "primary", "success", "warning", "danger"] as const;
export const CALLOUT_SIZE = ["s", "m"] as const;
export type CalloutColor = (typeof CALLOUT_COLOR)[number];
