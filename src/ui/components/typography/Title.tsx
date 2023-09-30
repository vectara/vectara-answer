import classNames from "classnames";
import { ReactElement, cloneElement } from "react";
import { TITLE_SIZE } from "./types";

const TEXT_ALIGN = ["left", "center", "right"] as const;

interface Props {
  children: ReactElement<any>;
  className?: string;
  size: (typeof TITLE_SIZE)[number];
  align?: (typeof TEXT_ALIGN)[number];
}

export const VuiTitle = ({ children, className, size, align, ...rest }: Props) => {
  return cloneElement(children, {
    className: classNames(
      "vuiTitle",
      `vuiTitle--${size}`,
      {
        [`vuiTitle--${align}`]: align
      },
      className,
      children.props.className
    ),
    ...rest
  });
};
