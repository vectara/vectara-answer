import { ReactElement, ReactNode, forwardRef } from "react";
import classNames from "classnames";
import { Props as LinkProps } from "../link/Link";
import { Link } from "react-router-dom";
import { getTrackingProps } from "../../utils/getTrackingProps";
import { BUTTON_SIZE } from "./types";

const alignToClassMap = {
  left: "vuiBaseButton--alignLeft",
  center: "vuiBaseButton--alignCenter",
  right: "vuiBaseButton--alignRight"
};

export type Props = {
  children?: ReactNode;
  icon?: ReactElement | null;
  iconSide?: "left" | "right";
  align?: "left" | "center" | "right";
  className?: string;
  size?: (typeof BUTTON_SIZE)[number];
  fullWidth?: boolean;
  isSelected?: boolean;
  isInert?: boolean;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLAnchorElement, MouseEvent>) => void;
  href?: LinkProps["href"];
  target?: LinkProps["target"];
  track?: LinkProps["track"];
  htmlFor?: string;
  tabIndex?: number;
  title?: string;
};

export const BaseButton = forwardRef<HTMLButtonElement | null, Props>(
  (
    {
      children,
      icon,
      iconSide = "left",
      align = "center",
      className,
      size,
      fullWidth,
      onClick,
      tabIndex,
      isInert,
      isDisabled,
      href,
      target,
      track,
      htmlFor,
      ...rest
    }: Props,
    ref
  ) => {
    const classes = classNames("vuiBaseButton", className, `vuiBaseButton--${size}`, alignToClassMap[align], {
      "vuiBaseButton-isInert": isInert,
      "vuiBaseButton-isDisabled": isDisabled,
      "vuiBaseButton--fullWidth": fullWidth,
      [`vuiBaseButton--${iconSide}`]: Boolean(icon) && Boolean(children)
    });

    const iconContainer = icon ? <span className="vuiBaseButtonIconContainer">{icon}</span> : null;

    // This is useful for controlling other elements, e.g. creating an <input type="file" />
    // for uploading files and adding a button to trigger it.
    if (htmlFor) {
      return (
        <label htmlFor={htmlFor} className={classes} tabIndex={tabIndex} {...rest}>
          {iconContainer}
          {children}
        </label>
      );
    }

    if (href) {
      const wrapperClasses = classNames("vuiBaseButtonLinkWrapper", {
        "vuiBaseButtonLinkWrapper--fullWidth": fullWidth
      });

      return (
        <Link
          className={wrapperClasses}
          to={href}
          onClick={onClick}
          target={target}
          tabIndex={tabIndex}
          {...rest}
          {...getTrackingProps(track)}
        >
          {/* Wrap a button otherwise the flex layout breaks */}
          <button className={classes} tabIndex={-1} ref={ref}>
            {iconContainer}
            {children}
          </button>
        </Link>
      );
    }

    const props = {
      onClick,
      tabIndex,
      ...rest
    };

    return (
      // @ts-expect-error HTMLButtonElement conflict with HTMLAnchorElement
      <button className={classes} {...props} ref={ref}>
        {iconContainer}
        {children}
      </button>
    );
  }
);
