import classNames from "classnames";

type Props = {
  header?: React.ReactNode;
  body?: React.ReactNode;
  align?: "center" | "left" | "right";
  className?: string;
  interactive?: boolean;
  href?: string;
  padding?: "s" | "m" | "l";
  highlight?: boolean;
  ungrouped?: boolean;
};

export const VuiCard = ({
  header,
  body,
  align = "left",
  interactive,
  href,
  className,
  padding = "s",
  highlight,
  ungrouped,
  ...rest
}: Props) => {
  const classes = classNames(
    "vuiCard",
    `vuiCard--${align}`,
    `vuiCard--${padding}`,
    {
      "vuiCard--interactive": interactive && !href,
      "vuiCard--link": href,
      "vuiCard--highlight": highlight,
      "vuiCard--ungrouped": ungrouped
    },
    className
  );

  const headerContent = header && <div className="vuiCard__content">{header}</div>;
  const bodyContent = body && <div className="vuiCard__footer">{body}</div>;

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {headerContent}
        {bodyContent}
      </a>
    );
  }

  return (
    <div className={classes} {...rest}>
      {headerContent}
      {bodyContent}
    </div>
  );
};
