import classNames from "classnames";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiTextColor } from "../typography/TextColor";
import { VuiTitle } from "../typography/Title";

type Props = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick: () => void;
  title?: string;
};

export const VuiTopicButton = ({ children, className, href, onClick, title, ...rest }: Props) => {
  const classes = classNames("vuiTopicButton", className);
  const content = (
    <>
      {title && (
        <>
          <VuiTitle size="s">
            <p>
              <VuiTextColor color="primary">{title}</VuiTextColor>
            </p>
          </VuiTitle>

          <VuiSpacer size="xxs" />
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
