import classNames from "classnames";
import { ReactNode, cloneElement } from "react";
import { IconContext } from "react-icons";

const COLOR = ["inherit", "accent", "primary", "success", "warning", "danger", "subdued", "normal", "empty"] as const;

const SIZE = ["s", "m", "l", "xl", "xxl"] as const;

const sizeToValueMap = {
  s: "16",
  m: "20",
  l: "28",
  xl: "46",
  xxl: "68"
};

type Props = {
  children: ReactNode;
  color?: (typeof COLOR)[number];
  className?: string;
  size?: (typeof SIZE)[number];
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
