import classNames from "classnames";
import { ReactNode, cloneElement } from "react";
import { IconContext } from "react-icons";
import { ICON_COLOR, ICON_SIZE } from "./types";

const sizeToValueMap = {
  xs: "14",
  s: "16",
  m: "20",
  l: "24",
  xl: "28",
  xxl: "46",
  xxxl: "68"
};

type Props = {
  children: ReactNode;
  color?: (typeof ICON_COLOR)[number];
  className?: string;
  size?: (typeof ICON_SIZE)[number];
  inline?: boolean;
};

export const VuiIcon = ({ children, size = "m", color = "inherit", className, inline, ...rest }: Props) => {
  const innerClasses = classNames(className, "vuiIcon__inner", {
    [`vuiIcon--${color}`]: color
  });

  const classes = classNames("vuiIcon", {
    "vuiIcon--inline": inline
  });

  const icon = cloneElement(children as React.ReactElement, {
    size: sizeToValueMap[size]
  });

  return (
    <IconContext.Provider value={{ className: innerClasses }}>
      <div className={classes} {...rest}>
        {icon}
      </div>
    </IconContext.Provider>
  );
};
