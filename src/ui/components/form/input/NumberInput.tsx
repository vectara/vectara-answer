import classNames from "classnames";
import { forwardRef, useEffect, useState } from "react";

const SIZE = ["m", "l"] as const;

type Props = {
  className?: string;
  id?: string;
  isInvalid?: boolean;
  value?: number;
  size?: (typeof SIZE)[number];
  fullWidth?: boolean;
  onChange: (value?: number) => void;
  max?: number;
  min?: number;
  step?: number;
  autoFocus?: boolean;
};

export const VuiNumberInput = forwardRef<HTMLInputElement | null, Props>(
  (
    { className, id, max, min, step, value, size = "m", onChange, fullWidth, isInvalid, autoFocus, ...rest }: Props,
    ref
  ) => {
    const [localValue, setLocalValue] = useState<number | undefined>(value);

    // This is a hacky solution to the number input misbehaving on Firefox.
    // If we were to apply the value and onChange values directly to the
    // value and onChange props of the input, then a user who:
    //  1. Selects all
    //  2. Types 1.0
    // will have the input show "0" as soon as they enter a decimal point.
    // When that character is entered, onChange is called with undefined.
    // This value gets stored in the value state, which resets the value to 0.
    // For some reason, using a useState hook to store the value doesn't have
    // this problem.
    useEffect(() => {
      // Reflect the upstream value when it changes. Ignore 0
      // because that indicates the user has entered a decimal point.
      if (value !== 0) {
        setLocalValue(value);
      }
    }, [value]);

    // Part of the hacky solution above.
    useEffect(() => {
      // Set value locally so an undefined value doesn't reset it to 0.
      // Pass the value upstream, e.g. so it can be persisted.
      onChange(localValue ?? 0);
    }, [localValue]);

    const classes = classNames(
      "vuiInput",
      `vuiInput--${size}`,
      {
        "vuiInput-isInvalid": isInvalid,
        "vuiInput--fullWidth": fullWidth
      },
      className
    );

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Enable resetting the value to undefined.
      if (e.target.value === "") return setLocalValue(undefined);

      const numberValue = Number(e.target.value);
      if (isNaN(numberValue)) return setLocalValue(undefined);

      setLocalValue(Number(e.target.value));
    };

    const onBlur = () => {
      if (min !== undefined && value !== undefined && value < min) onChange(min);
      if (max !== undefined && value !== undefined && value > max) onChange(max);
    };

    return (
      <input
        autoFocus={autoFocus}
        ref={ref}
        type="number"
        className={classes}
        id={id}
        max={max}
        min={min}
        step={step}
        value={localValue ?? ""}
        onChange={onChangeValue}
        onBlur={onBlur}
        {...rest}
      />
    );
  }
);
