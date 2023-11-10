import { ReactNode } from "react";
import classNames from "classnames";
import { FlexSpacing } from "./types";

const alignItemsToClassNameMap = {
  baseline: "vuiFlexContainer--alignItemsBaseline",
  center: "vuiFlexContainer--alignItemsCenter",
  end: "vuiFlexContainer--alignItemsEnd",
  start: "vuiFlexContainer--alignItemsStart",
  stretch: "vuiFlexContainer--alignItemsStretch"
} as const;

const directionToClassNameMap = {
  column: "vuiFlexContainer--directionColumn",
  columnReverse: "vuiFlexContainer--directionColumnReverse",
  row: "vuiFlexContainer--directionRow",
  rowReverse: "vuiFlexContainer--directionRowReverse"
} as const;

const justifyContentToClassNameMap = {
  center: "vuiFlexContainer--justifyContentCenter",
  end: "vuiFlexContainer--justifyContentEnd",
  start: "vuiFlexContainer--justifyContentStart",
  spaceAround: "vuiFlexContainer--justifyContentSpaceAround",
  spaceBetween: "vuiFlexContainer--justifyContentSpaceBetween",
  spaceEvenly: "vuiFlexContainer--justifyContentSpaceEvenly"
} as const;

const spacingToClassNameMap: Record<FlexSpacing, string> = {
  none: "vuiFlexContainer--spacingNone",
  xxs: "vuiFlexContainer--spacingXxs",
  xs: "vuiFlexContainer--spacingXs",
  s: "vuiFlexContainer--spacingS",
  m: "vuiFlexContainer--spacingM",
  l: "vuiFlexContainer--spacingL",
  xl: "vuiFlexContainer--spacingXl",
  xxl: "vuiFlexContainer--spacingXxl"
} as const;

export type Props = {
  children?: ReactNode;
  alignItems?: keyof typeof alignItemsToClassNameMap;
  direction?: keyof typeof directionToClassNameMap;
  justifyContent?: keyof typeof justifyContentToClassNameMap;
  spacing?: FlexSpacing;
  wrap?: boolean;
  className?: string;
  fullWidth?: boolean;
};

export const VuiFlexContainer = ({
  children,
  alignItems = "stretch",
  direction = "row",
  justifyContent = "start",
  spacing = "m",
  wrap,
  className,
  fullWidth,
  ...rest
}: Props) => {
  const classes = classNames(
    className,
    "vuiFlexContainer",
    alignItemsToClassNameMap[alignItems],
    directionToClassNameMap[direction],
    justifyContentToClassNameMap[justifyContent],
    spacingToClassNameMap[spacing],
    {
      "vuiFlexContainer--wrap": wrap,
      "vuiFlexContainer--fullWidth": fullWidth
    }
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
