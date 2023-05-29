import { MouseEvent } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

const COLOR = ["accent", "primary", "danger", "success", "normal"] as const;

type Props = {
  children: React.ReactNode;
  className?: string;
  color: (typeof COLOR)[number];
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  target?: "_blank";
};

export const VuiBadge = ({ children, className, color, onClick, href, target, ...rest }: Props) => {
  const classes = classNames(className, "vuiBadge", `vuiBadge--${color}`, {
    "vuiBadge--clickable": onClick ?? href
  });

  if (onClick) {
    return (
      <button className={classes} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }

  if (href) {
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
      <Link className={classes} onClick={onClick} to={href} {...props}>
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
