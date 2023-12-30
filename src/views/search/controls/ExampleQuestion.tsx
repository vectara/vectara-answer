import classNames from "classnames";
import { VuiSpacer, VuiTextColor, VuiTitle } from "../../../ui";
type Props = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick: () => void;
  title?: string;
};

export const ExampleQuestion = ({
  children,
  className,
  href,
  onClick,
  title,
  ...rest
}: Props) => {
  const classes = classNames("exampleQuestion", className);
  const content = (
    <>
      {title && (
        <>
          <VuiTitle size="xs">
            <p>
              <VuiTextColor color="primary">{title}</VuiTextColor>
            </p>
          </VuiTitle>

          {children && <VuiSpacer size="xxs" />}
        </>
      )}

      {children}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  );
};
