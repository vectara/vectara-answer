import classNames from "classnames";

import { ReactNode } from "react";

const SIZE = ["xs", "s", "m", "l"] as const;
const TEXT_ALIGN = ["left", "center", "right"] as const;

type Props = {
  className?: string;
  id?: string;
  children?: ReactNode;
  size?: (typeof SIZE)[number];
  align?: (typeof TEXT_ALIGN)[number];
};

export const VuiText = ({ children, className, id, size = "s", align = "left" }: Props) => {
  const classes = classNames("vuiText", `vuiText--${size}`, `vuiText--${align}`, className);
  return (
    <div className={classes} id={id}>
      {children}
    </div>
  );
};
