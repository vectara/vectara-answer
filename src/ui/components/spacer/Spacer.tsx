import classNames from "classnames";
import { SPACER_SIZE } from "./types";

interface Props {
  size: (typeof SPACER_SIZE)[number];
}

export const VuiSpacer = ({ size = "m" }: Props) => {
  const classes = classNames("vuiSpacer", { [`vuiSpacer--${size}`]: size });
  return <div className={classes} />;
};
