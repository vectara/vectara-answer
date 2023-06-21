import classNames from "classnames";
import { ReactComponent as Spinner } from "./spinner.svg";

const sizeToClassNameMap = {
  xs: "vuiSpinner--xs",
  s: "vuiSpinner--s",
  m: "vuiSpinner--m",
  l: "vuiSpinner--l",
  xl: "vuiSpinner--xl",
  xxl: "vuiSpinner--xxl",
  xxxl: "vuiSpinner--xxxl"
} as const;

type Props = {
  size?: keyof typeof sizeToClassNameMap;
};

export const VuiSpinner = ({ size = "m" }: Props) => {
  const classes = classNames("vuiSpinner", sizeToClassNameMap[size]);
  return (
    <div className={classes}>
      <Spinner className="vuiSpinner__animation" />
    </div>
  );
};
