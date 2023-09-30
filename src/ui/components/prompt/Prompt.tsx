import classNames from "classnames";
import { ReactNode } from "react";

const COLOR = ["danger", "neutral"] as const;

const paddingToClassNameMap = {
  xs: "vuiPrompt--paddingXs",
  s: "vuiPrompt--paddingS",
  m: "vuiPrompt--paddingM",
  l: "vuiPrompt--paddingL",
  xl: "vuiPrompt--paddingXl",
  xxl: "vuiPrompt--paddingXxl"
} as const;

type Props = {
  children: ReactNode;
  className?: string;
  color?: (typeof COLOR)[number];
  padding?: keyof typeof paddingToClassNameMap;
  onClick?: () => void;
  isSpeechBubble?: boolean;
};

export const VuiPrompt = ({
  children,
  className,
  onClick,
  color = "neutral",
  padding = "l",
  isSpeechBubble
}: Props) => {
  const Component = onClick ? "button" : "div";
  const classes = classNames(className, "vuiPrompt", `vuiPrompt--${color}`, paddingToClassNameMap[padding], {
    "vuiPrompt--interactive": onClick !== undefined,
    "vuiPrompt--speechBubble": isSpeechBubble
  });

  return (
    <Component className={classes} onClick={onClick}>
      {children}
    </Component>
  );
};
