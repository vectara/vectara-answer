export const APP_CONTENT_PADDING = ["none", "xs", "s", "m", "l", "xl"] as const;
export type AppContentPadding = (typeof APP_CONTENT_PADDING)[number];

export type Tree = Array<TreeItem>;

export type TreeItem = {
  name: string;
  path?: string;
  pages?: Tree;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  isActive?: boolean;
  className?: string;
  "data-testid"?: string;
};

export type Sections = Array<{
  name: string;
  pages: Array<SectionItem>;
}>;

export type SectionItem = {
  name: string;
  path: string;
};
