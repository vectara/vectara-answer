import classNames from "classnames";
import { ReactElement, cloneElement } from "react";

const SIZE = ["xxs", "xs", "s", "m", "l", "xl", "xxl"] as const;
const TEXT_ALIGN = ["left", "center", "right"] as const;

interface Props {
  children: ReactElement<any>;
  size: (typeof SIZE)[number];
  align?: (typeof TEXT_ALIGN)[number];
}

export const VuiTitle = ({ children, size, align = "left", ...rest }: Props) => {
  return cloneElement(children, {
    className: classNames("vuiTitle", `vuiTitle--${size}`, `vuiTitle--${align}`, children.props.className),
    ...rest
  });
};
