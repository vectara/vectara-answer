import classNames from "classnames";
import { Props as LinkProps } from "../link/Link";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const COLOR = ["accent", "primary", "danger", "normal"] as const;

type Props = {
  className?: string;
  icon: ReactNode;
  color?: (typeof COLOR)[number];
  onClick?: () => void;
  href?: LinkProps["href"];
  target?: LinkProps["target"];
};

export const VuiButtonIcon = ({ className, icon, color = "primary", onClick, href, target, ...rest }: Props) => {
  const props = {
    className: classNames("vuiButtonIcon", className, `vuiButtonIcon--${color}`),
    onClick,
    ...rest
  };

  if (href) {
    return (
      <Link to={href} target={target} {...props}>
        {icon}
      </Link>
    );
  }

  return <button {...props}>{icon}</button>;
};
