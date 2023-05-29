import { ReactNode } from "react";
import classNames from "classnames";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiTitle } from "../typography/Title";
import { VuiTextColor } from "../typography/TextColor";
import { VuiText } from "../typography/Text";

const COLOR = ["accent", "primary", "success", "warning", "danger"] as const;
const SIZE = ["s", "m"] as const;
const HEADING_ELEMENT = ["h1", "h2", "h3", "h4", "h5", "h6", "p"] as const;

type Props = {
  children?: ReactNode;
  title: string;
  headingElement: (typeof HEADING_ELEMENT)[number];
  color: (typeof COLOR)[number];
  size?: (typeof SIZE)[number];
};

const sizeToTitleSizeMap = {
  s: "xxs",
  m: "s"
} as const;

const sizeToSpacerSizeMap = {
  s: "xxs",
  m: "xs"
} as const;

const sizeToContentSizeMap = {
  s: "xs",
  m: "s"
} as const;

export const VuiCallout = ({ children, title, headingElement, color, size = "m" }: Props) => {
  const classes = classNames("vuiCallout", `vuiCallout--${color}`, `vuiCallout--${size}`);
  const HeadingElement = headingElement as keyof JSX.IntrinsicElements;

  return (
    <div className={classes}>
      <VuiTitle size={sizeToTitleSizeMap[size]}>
        <HeadingElement>
          <VuiTextColor color={color}>{title}</VuiTextColor>
        </HeadingElement>
      </VuiTitle>
      {children && (
        <>
          <VuiSpacer size={sizeToSpacerSizeMap[size]} />
          <VuiText size={sizeToContentSizeMap[size]}>{children}</VuiText>
        </>
      )}
    </div>
  );
};
