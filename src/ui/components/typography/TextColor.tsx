import { ReactNode } from "react";
import classNames from "classnames";

const COLOR = ["accent", "primary", "success", "warning", "danger", "subdued", "normal"] as const;

type Props = {
  children?: ReactNode;
  color: (typeof COLOR)[number];
  className?: string;
};

export const VuiTextColor = ({ children, color, className }: Props) => {
  const classes = classNames(className, "vuiTextColor", `vuiTextColor--${color}`);
  return <span className={classes}>{children}</span>;
};
