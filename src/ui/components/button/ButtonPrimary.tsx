import { forwardRef } from "react";
import classNames from "classnames";
import { BaseButton, Props as BaseButtonProps } from "./BaseButton";
import { ButtonColor } from "./types";
import { createButtonIcon } from "./createButtonIcon";

export type Props = BaseButtonProps & {
  color: ButtonColor;
};

const colorToIconColorMap = {
  accent: "empty",
  primary: "empty",
  success: "empty",
  danger: "empty",
  warning: "empty",
  neutral: "neutral",
  subdued: "subdued"
};

export const VuiButtonPrimary = forwardRef<HTMLButtonElement | null, Props>(
  ({ children, icon, color, size = "m", className, isSelected, isDisabled, ...rest }: Props, ref) => {
    const classes = classNames(className, "vuiButtonPrimary", `vuiButtonPrimary--${color}`, {
      "vuiButtonPrimary-isSelected": isSelected
    });

    const buttonIcon = createButtonIcon(icon, size, color, colorToIconColorMap);

    return (
      <BaseButton ref={ref} className={classes} icon={buttonIcon} size={size} isDisabled={isDisabled} {...rest}>
        {children}
      </BaseButton>
    );
  }
);
