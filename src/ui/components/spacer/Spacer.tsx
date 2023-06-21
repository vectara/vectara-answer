import classNames from "classnames";

const SIZE = ["xxs", "xs", "s", "m", "l", "xl", "xxl"] as const;

interface Props {
  size: (typeof SIZE)[number];
}

export const VuiSpacer = ({ size = "m" }: Props) => {
  const classes = classNames("vuiSpacer", { [`vuiSpacer--${size}`]: size });
  return <div className={classes} />;
};
