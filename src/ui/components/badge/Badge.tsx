import { MouseEvent } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Props as LinkProps } from "../link/Link";
import { getTrackingProps } from "../../utils/getTrackingProps";

const COLOR = ["accent", "primary", "danger", "success", "normal"] as const;

type Props = {
  children: React.ReactNode;
  className?: string;
  color: (typeof COLOR)[number];
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  href?: LinkProps["href"];
  target?: LinkProps["target"];
  track?: LinkProps["track"];
};

export const VuiBadge = ({
  children,
  className,
  color,
  onClick,
  href,
  track,
  ...rest
}: Props) => {
  const classes = classNames(className, "vuiBadge", `vuiBadge--${color}`, {
    "vuiBadge--clickable": onClick ?? href,
  });

  if (onClick) {
    return (
      <button className={classes} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <Link
        className={classes}
        onClick={onClick}
        to={href}
        {...getTrackingProps(track)}
      >
        {children}
      </Link>
    );
  }

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
