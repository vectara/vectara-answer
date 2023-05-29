import classNames from "classnames";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type Props = {
  children: ReactNode;
  href: string;
  className?: string;
  target?: "_blank";
  onClick?: () => void;
};

export const VuiLink = ({ children, href, target, onClick, className, ...rest }: Props) => {
  const props: {
    target?: string;
    rel?: string;
  } = { ...rest };

  if (target === "_blank") {
    props.target = target;
    // Protect against tabnabbing but leave out noreferrer so targets, such as our docs,
    // can still track outbound clicks.
    props.rel = "noopener";
  }

  return (
    <Link className={classNames("vuiLink", className)} to={href} onClick={onClick} {...props}>
      {children}
    </Link>
  );
};
