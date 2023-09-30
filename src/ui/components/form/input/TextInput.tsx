import classNames from "classnames";
import { forwardRef } from "react";

const SIZE = ["m", "l"] as const;

type Props = {
  className?: string;
  id?: string;
  name?: string;
  isInvalid?: boolean;
  value?: string;
  size?: (typeof SIZE)[number];
  fullWidth?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onSubmit?: () => void;
  maxLength?: number;
  autoComplete?: boolean;
  autoFocus?: boolean;
};

export const VuiTextInput = forwardRef<HTMLInputElement | null, Props>(
  (
    {
      className,
      id,
      placeholder,
      value,
      size = "m",
      onChange,
      fullWidth,
      onSubmit,
      isInvalid,
      name,
      autoComplete,
      autoFocus,
      ...rest
    }: Props,
    ref
  ) => {
    const classes = classNames(
      "vuiInput",
      "vuiInput--text",
      `vuiInput--${size}`,
      {
        "vuiInput-isInvalid": isInvalid,
        "vuiInput--fullWidth": fullWidth
      },
      className
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        onSubmit?.();
      }
    };

    return (
      <input
        autoComplete={autoComplete ? "on" : "off"}
        autoFocus={autoFocus}
        ref={ref}
        type="text"
        className={classes}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    );
  }
);
