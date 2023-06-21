import { cloneElement, forwardRef, ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { Props as LinkProps } from "../link/Link";
import { Link } from "react-router-dom";
import { getTrackingProps } from "../../utils/getTrackingProps";

const COLOR = ["accent", "primary", "danger", "warning", "normal"] as const;
const SIZE = ["xs", "s", "m"] as const;

type Props = {
  children?: ReactNode;
  icon?: ReactElement;
  color: (typeof COLOR)[number];
  size?: (typeof SIZE)[number];
  className?: string;
  isPressed?: boolean;
  isSelected?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  href?: LinkProps["href"];
  target?: LinkProps["target"];
  track?: LinkProps["track"];
};

export const VuiButtonEmpty = forwardRef<HTMLButtonElement | null, Props>(
  (
    {
      children,
      icon,
      color,
      size = "m",
      className,
      isPressed,
      isSelected,
      fullWidth,
      onClick,
      href,
      target,
      track,
      ...rest
    }: Props,
    ref
  ) => {
    const classes = classNames(
      className,
      "vuiButtonEmpty",
      `vuiButtonEmpty--${color}`,
      `vuiButtonEmpty--${size}`,
      {
        "vuiButtonEmpty--fullWidth": fullWidth,
        "vuiButtonEmpty--isPressed": isPressed,
        "vuiButtonEmpty--isSelected": isSelected,
      }
    );

    const props = {
      className: classes,
      onClick,
      ...rest,
    };

    const iconContainer = icon ? (
      <span className="vuiButtonEmpty__iconContainer">
        {cloneElement(icon, {
          size: 18,
          color,
        })}
      </span>
    ) : null;

    if (href) {
      return (
        <Link
          className="vuiButtonEmptyLink"
          to={href}
          target={target}
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

    return (
      <button {...props} ref={ref}>
        {iconContainer}
        {children}
      </button>
    );
  }
);
