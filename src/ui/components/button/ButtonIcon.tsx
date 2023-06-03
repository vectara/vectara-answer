import classNames from "classnames";
import { ReactNode, forwardRef } from "react";
import { Link } from "react-router-dom";
import { getTrackingProps } from "../../utils/getTrackingProps";
import { Props as LinkProps } from "../link/Link";

const COLOR = ["accent", "primary", "danger", "normal"] as const;

type Props = {
  className?: string;
  icon: ReactNode;
  color?: (typeof COLOR)[number];
  onClick?: () => void;
  href?: LinkProps["href"];
  target?: LinkProps["target"];
  track?: LinkProps["track"];
};

export const VuiButtonIcon = forwardRef<HTMLButtonElement | null, Props>(
  (
    {
      className,
      icon,
      color = "primary",
      onClick,
      href,
      target,
      track,
      ...rest
    }: Props,
    ref
  ) => {
    const props = {
      className: classNames(
        "vuiButtonIcon",
        className,
        `vuiButtonIcon--${color}`
      ),
      onClick,
      ...rest,
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
