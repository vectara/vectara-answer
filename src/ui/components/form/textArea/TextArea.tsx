import { forwardRef } from "react";
import classNames from "classnames";

type Props = {
  className?: string;
  id?: string;
  name?: string;
  value?: string;
  fullWidth?: boolean;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
};

export const VuiTextArea = forwardRef<HTMLTextAreaElement | null, Props>(
  ({ className, id, placeholder, value, onChange, fullWidth, name, ...rest }: Props, ref) => {
    const classes = classNames(
      "vuiTextArea",
      {
        "vuiTextArea--fullWidth": fullWidth
      },
      className
    );

    return (
      <textarea
        ref={ref}
        className={classes}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    );
  }
);
