import { ReactNode } from "react";
import classNames from "classnames";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiTitle } from "../typography/Title";
import { VuiTextColor } from "../typography/TextColor";
import { VuiText } from "../typography/Text";
import { CALLOUT_SIZE, CalloutColor } from "./types";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiIconButton } from "../button/IconButton";
import { BiX } from "react-icons/bi";

const HEADING_ELEMENT = ["h1", "h2", "h3", "h4", "h5", "h6", "p"] as const;

type Props = {
  children?: ReactNode;
  title: string;
  headingElement: (typeof HEADING_ELEMENT)[number];
  color: CalloutColor;
  size?: (typeof CALLOUT_SIZE)[number];
  onDismiss?: () => void;
};

const sizeToTitleSizeMap = {
  s: "xs",
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

export const VuiCallout = ({ children, title, headingElement, color, size = "m", onDismiss, ...rest }: Props) => {
  const classes = classNames("vuiCallout", `vuiCallout--${color}`, `vuiCallout--${size}`);
  const HeadingElement = headingElement as keyof JSX.IntrinsicElements;

  return (
    <div className={classes} {...rest}>
      <VuiFlexContainer alignItems="start" justifyContent="spaceBetween">
        <VuiFlexItem grow={1}>
          <VuiTitle size={sizeToTitleSizeMap[size]}>
            <HeadingElement>
              <VuiTextColor color={color}>{title}</VuiTextColor>
            </HeadingElement>
          </VuiTitle>
        </VuiFlexItem>

        {onDismiss && (
          <VuiFlexItem shrink={false} grow={false}>
            <VuiIconButton
              className="vuiCallout__closeButton"
              data-testid="calloutCloseButton"
              color={color}
              onClick={onDismiss}
              icon={<BiX />}
              size="s"
            />
          </VuiFlexItem>
        )}
      </VuiFlexContainer>

      {children && (
        <>
          <VuiSpacer size={sizeToSpacerSizeMap[size]} />
          <VuiText size={sizeToContentSizeMap[size]}>{children}</VuiText>
        </>
      )}
    </div>
  );
};
