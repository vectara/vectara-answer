import classNames from "classnames";
import { ReactNode } from "react";

const GROW = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const SHRINK = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const BASIS = ["auto", "content", "fill", "maxContent", "minContent", "none"] as const;

const alignItemsToClassNameMap = {
  baseline: "vuiFlexItem--alignItemsBaseline",
  center: "vuiFlexItem--alignItemsCenter",
  end: "vuiFlexItem--alignItemsEnd",
  start: "vuiFlexItem--alignItemsStart",
  stretch: "vuiFlexItem--alignItemsStretch"
} as const;

type Props = {
  children?: ReactNode;
  grow?: (typeof GROW)[number] | boolean;
  shrink?: (typeof SHRINK)[number] | boolean;
  basis?: (typeof BASIS)[number];
  alignItems?: keyof typeof alignItemsToClassNameMap;
  className?: string;
  truncate?: boolean;
};

export const VuiFlexItem = ({
  children,
  grow,
  shrink,
  basis = "auto",
  alignItems = "stretch",
  className,
  truncate,
  ...rest
}: Props) => {
  const isGrowNone = grow === false;
  const isShrinkNone = shrink === false;

  const classes = classNames(
    "vuiFlexItem",
    `vuiFlexItem--${basis}`,
    alignItemsToClassNameMap[alignItems],
    {
      [`vuiFlexItem--flexGrow${grow}`]: typeof grow === "number",
      "vuiFlexItem--flexGrowNone": isGrowNone,
      [`vuiFlexItem--flexShrink${shrink}`]: typeof shrink === "number",
      "vuiFlexItem--flexShrinkNone": isShrinkNone,
      "vuiFlexItem--truncate": truncate
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
