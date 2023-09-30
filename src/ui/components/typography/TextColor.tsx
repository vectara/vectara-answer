import { ReactNode } from "react";
import classNames from "classnames";
import { TextColor } from "./types";

type Props = {
  children?: ReactNode;
  color: TextColor;
  className?: string;
};

export const VuiTextColor = ({ children, color, className }: Props) => {
  const classes = classNames(className, "vuiTextColor", `vuiTextColor--${color}`);
  return <span className={classes}>{children}</span>;
};
