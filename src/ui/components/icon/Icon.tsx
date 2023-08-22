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
};

export const VuiIcon = ({ children, size = "m", color = "inherit", className }: Props) => {
  const classes = classNames(className, "vuiIcon__inner", {
    [`vuiIcon--${color}`]: color
  });

  const icon = cloneElement(children as React.ReactElement, {
    size: sizeToValueMap[size]
  });

  return (
    <IconContext.Provider value={{ className: classes }}>
      <div className="vuiIcon">{icon}</div>
    </IconContext.Provider>
  );
};
