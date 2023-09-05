import classNames from "classnames";
import { ReactElement, forwardRef } from "react";
import { Link } from "react-router-dom";
import { getTrackingProps } from "../../utils/getTrackingProps";
import { Props as LinkProps } from "../link/Link";
import { ButtonColor, BUTTON_SIZE } from "./types";
import { createButtonIcon } from "./createButtonIcon";

type Props = {
  className?: string;
  icon: ReactElement;
  color?: ButtonColor;
  size?: (typeof BUTTON_SIZE)[number];
  onClick?: () => void;
  href?: LinkProps["href"];
  target?: LinkProps["target"];
  track?: LinkProps["track"];
  tabIndex?: number;
};

export const VuiIconButton = forwardRef<HTMLButtonElement | null, Props>(
  ({ className, icon, color = "primary", size = "m", onClick, href, target, track, tabIndex, ...rest }: Props, ref) => {
    const props = {
      className: classNames("vuiIconButton", className, `vuiIconButton--${color}`, `vuiIconButton--${size}`),
      onClick,
      tabIndex,
      ...rest
    };

    const buttonIcon = createButtonIcon(icon, size, color);

    if (href) {
      return (
        <Link to={href} target={target} {...props} {...getTrackingProps(track)}>
          <button ref={ref}>{buttonIcon}</button>
        </Link>
      );
    }

    return (
      <button {...props} ref={ref}>
        {buttonIcon}
      </button>
    );
  }
);
