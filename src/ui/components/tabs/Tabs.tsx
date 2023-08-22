import classNames from "classnames";
import { TabSize } from "./types";

type Props = {
  children: React.ReactNode;
  append?: React.ReactNode;
  className?: string;
  size?: TabSize;
};

export const VuiTabs = ({ children, className, append, size = "s" }: Props) => {
  const classes = classNames(className, "vuiTabs", `vuiTabs--${size}`);
  return (
    <div className={classes}>
      <div className="vuiTabs__tabs">{children}</div>
      {append && <div className="vuiTabs__appendedContent">{append}</div>}
    </div>
  );
};
