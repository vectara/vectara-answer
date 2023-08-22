import classNames from "classnames";

type Props = {
  className?: string;
  labelFor?: string;
  children: React.ReactNode;
};

export const VuiLabel = ({ className, labelFor, children, ...rest }: Props) => {
  const classes = classNames("vuiLabel", className);

  return (
    <label className={classes} htmlFor={labelFor} {...rest}>
      {children}
    </label>
  );
};
