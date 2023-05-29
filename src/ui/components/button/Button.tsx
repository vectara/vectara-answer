import { cloneElement, ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { Props as LinkProps } from "../link/Link";
import { Link } from "react-router-dom";

const COLOR = ["accent", "primary", "danger", "warning", "normal"] as const;
const SIZE = ["xs", "s", "m"] as const;

type Props = {
  children?: ReactNode;
  icon?: ReactElement;
  color: (typeof COLOR)[number];
  size?: (typeof SIZE)[number];
  className?: string;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLAnchorElement, MouseEvent>) => void;
  href?: LinkProps["href"];
  target?: LinkProps["target"];
};

const colorToIconColorMap = {
  accent: "empty",
  primary: "empty",
  danger: "empty",
  warning: "empty",
  normal: "normal"
};

export const VuiButton = ({
  children,
  icon,
  color,
  size = "m",
  className,
  fullWidth,
  onClick,
  href,
  target,
  ...rest
}: Props) => {
  const classes = classNames(className, "vuiButton", `vuiButton--${color}`, `vuiButton--${size}`, {
    "vuiButton--fullWidth": fullWidth
  });

  const props = {
    className: classes,
    onClick,
    ...rest
  };

  const iconContainer = icon ? (
    <span className="vuiButton__iconContainer">
      {cloneElement(icon, {
        size: 18,
        color: colorToIconColorMap[color]
      })}
    </span>
  ) : null;

  if (href) {
    return (
      <Link to={href} target={target} {...rest} className="vuiButtonLink">
        {/* Wrap a button otherwise the flex layout breaks */}
        <button className={classes} tabIndex={-1}>
          {iconContainer}
          {children}
        </button>
      </Link>
    );
  }

  return (
    // @ts-expect-error HTMLButtonElement conflict with HTMLAnchorElement
    <button {...props}>
      {iconContainer}
      {children}
    </button>
  );
};
