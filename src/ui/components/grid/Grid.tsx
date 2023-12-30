import React from "react";
import classNames from "classnames";
import { FlexSpacing } from "../flex/types";

export const COLUMNS = [1, 2, 3] as const;
export type Columns = (typeof COLUMNS)[number];

type Props = {
  children?: React.ReactNode;
  columns?: Columns;
  spacing?: FlexSpacing;
  className?: string;
};

export const VuiGrid = ({ children, columns = 2, spacing = "m", className, ...rest }: Props) => {
  const classes = classNames("vuiGridContainer", className);
  const contentClasses = classNames("vuiGrid", `vuiGrid--${spacing}`, `vuiGrid--columns${columns}`);

  return (
    <div className={classes} {...rest}>
      <div className={contentClasses}>{children}</div>
    </div>
  );
};
