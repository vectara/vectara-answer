import classNames from "classnames";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiText } from "../typography/Text";
import { VuiTextColor } from "../typography/TextColor";
import { Props as LinkProps } from "../link/Link";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
  title?: string;
  text?: string;
  onClick?: () => void;
  href?: LinkProps["href"];
};

export const VuiMenuItem = ({ className, title, text, href, onClick, ...rest }: Props) => {
  const classes = classNames(className, "vuiMenuItem");

  const props = {
    className: classes,
    onClick,
    ...rest
  };

  const content = (
    <>
      <VuiText>
        <p>{title}</p>
      </VuiText>

      <VuiSpacer size="xxs" />

      <VuiText size="xs">
        <VuiTextColor color="subdued">
          <p>{text}</p>
        </VuiTextColor>
      </VuiText>
    </>
  );

  if (href)
    return (
      <Link to={href} {...props}>
        {content}
      </Link>
    );

  return <button {...props}>{content}</button>;
};
