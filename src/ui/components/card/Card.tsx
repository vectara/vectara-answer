import classNames from "classnames";

type Props = {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
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
  footer,
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

  const headerContent = header && <div className="vuiCard__header">{header}</div>;
  const bodyContent = body && <div className="vuiCard__body">{body}</div>;
  const footerContent = footer && <div className="vuiCard__footer">{footer}</div>;

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {headerContent}
        {bodyContent}
        {footerContent}
      </a>
    );
  }

  return (
    <div className={classes} {...rest}>
      {headerContent}
      {bodyContent}
      {footerContent}
    </div>
  );
};
