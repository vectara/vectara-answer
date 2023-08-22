import classNames from "classnames";
import { forwardRef } from "react";

const SIZE = ["m", "l"] as const;

type Props = {
  className?: string;
  id?: string;
  max?: number;
  min?: number;
  step?: number;
  value?: number;
  size?: (typeof SIZE)[number];
  fullWidth?: boolean;
  onChange: (value?: number) => void;
};

export const VuiNumberInput = forwardRef<HTMLInputElement | null, Props>(
  ({ className, id, max, min, step, value, size = "m", onChange, fullWidth, ...rest }: Props, ref) => {
    const classes = classNames(
      "vuiInput",
      `vuiInput--${size}`,
      {
        "vuiInput--fullWidth": fullWidth
      },
      className
    );

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Enable resetting the value to undefined.
      if (e.target.value === "") return onChange();

      const numberValue = Number(e.target.value);
      if (isNaN(numberValue)) return onChange();

      onChange(Number(e.target.value));
    };

    const onBlur = () => {
      if (min !== undefined && value !== undefined && value < min) onChange(min);
      if (max !== undefined && value !== undefined && value > max) onChange(max);
    };

    return (
      <input
        ref={ref}
        type="number"
        className={classes}
        id={id}
        max={max}
        min={min}
        step={step}
        value={value ?? ""}
        onChange={onChangeValue}
        onBlur={onBlur}
        {...rest}
      />
    );
  }
);
