import React from "react";
import classNames from "classnames";
import { FlexSpacing } from "../flex/types";

export const COLUMNS = [1, 2, 3] as const;
export type Columns = (typeof COLUMNS)[number];

type Props = {
  children?: React.ReactNode;
  columns?: Columns;
  spacing?: FlexSpacing;
};

export const VuiGrid = ({ children, columns = 2, spacing = "m", ...rest }: Props) => {
  const classes = classNames("vuiGrid", `vuiGrid--${spacing}`, `vuiGrid--columns${columns}`);

  return (
    <div className="vuiGridContainer" {...rest}>
      <div className={classes}>{children}</div>
    </div>
  );
};
