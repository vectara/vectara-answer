import classNames from "classnames";
import { AppContentPadding } from "./types";

type Props = {
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  padding?: AppContentPadding;
};

const paddingToClassNameMap = {
  none: "vuiAppContent--paddingNone",
  xs: "vuiAppContent--paddingXs",
  s: "vuiAppContent--paddingS",
  m: "vuiAppContent--paddingM",
  l: "vuiAppContent--paddingL",
  xl: "vuiAppContent--paddingXl"
};

export const VuiAppContent = ({ children, className, fullWidth, padding = "none", ...rest }: Props) => {
  const classes = classNames(
    "vuiAppContent",
    paddingToClassNameMap[padding],
    {
      "vuiAppContent--fullWidth": fullWidth
    },
    className
  );
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
