import { MouseEvent } from "react";
import classNames from "classnames";
import { Link, To } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
  to: To;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  isActive?: boolean;
};

export const VuiTab = ({ children, className, to, onClick, isActive = false, ...rest }: Props) => {
  const classes = classNames(className, "vuiTab", {
    "vuiTab-isActive": isActive
  });

  return (
    <Link className={classes} to={to} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
};
