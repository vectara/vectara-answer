import classNames from "classnames";
import { ReactNode, forwardRef } from "react";
import { Link } from "react-router-dom";
import { getTrackingProps } from "../../utils/getTrackingProps";
import { Props as LinkProps } from "../link/Link";
import { ButtonColor } from "./types";

type Props = {
  className?: string;
  icon: ReactNode;
  color?: ButtonColor;
  onClick?: () => void;
  href?: LinkProps["href"];
  target?: LinkProps["target"];
  track?: LinkProps["track"];
  tabIndex?: number;
};

export const VuiIconButton = forwardRef<HTMLButtonElement | null, Props>(
  ({ className, icon, color = "primary", onClick, href, target, track, tabIndex, ...rest }: Props, ref) => {
    const props = {
      className: classNames("vuiIconButton", className, `vuiIconButton--${color}`),
      onClick,
      tabIndex,
      ...rest
    };

    if (href) {
      return (
        <Link to={href} target={target} {...props} {...getTrackingProps(track)}>
          <button ref={ref}>{icon}</button>
        </Link>
      );
    }

    return (
      <button {...props} ref={ref}>
        {icon}
      </button>
    );
  }
);
