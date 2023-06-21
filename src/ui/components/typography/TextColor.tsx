import { ReactNode } from "react";
import classNames from "classnames";

export const COLOR = [
  "accent",
  "primary",
  "success",
  "warning",
  "danger",
  "subdued",
  "normal",
] as const;

export type TextColor = (typeof COLOR)[number];

type Props = {
  children?: ReactNode;
  color: TextColor;
  className?: string;
};

export const VuiTextColor = ({ children, color, className }: Props) => {
  const classes = classNames(
    className,
    "vuiTextColor",
    `vuiTextColor--${color}`
  );
  return <span className={classes}>{children}</span>;
};
