import classNames from "classnames";
import { VuiIcon } from "../../icon/Icon";
import { BiCaretDown } from "react-icons/bi";
import { forwardRef } from "react";

const SIZE = ["m", "l"] as const;

type Props = {
  className?: string;
  id?: string;
  name?: string;
  isInvalid?: boolean;
  options: {
    text: string;
    value: string;
  }[];
  value: string;
  size?: (typeof SIZE)[number];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const sizeToIconSizeMap = {
  m: "m",
  l: "l"
} as const;

export const VuiSelect = forwardRef<HTMLSelectElement | null, Props>(
  ({ className, id, name, options, value, size = "m", onChange, isInvalid, ...rest }: Props, ref) => {
    const classes = classNames(
      "vuiSelect",
      `vuiSelect--${size}`,
      {
        "vuiSelect-isInvalid": isInvalid
      },
      className
    );

    const renderedOptions = options.map((option, index) => {
      const { text, ...rest } = option;
      return (
        <option {...rest} key={index}>
          {text}
        </option>
      );
    });

    return (
      <div className={classes}>
        <select ref={ref} id={id} name={name} value={value} onChange={onChange} {...rest}>
          {renderedOptions}
        </select>

        <div className="vuiSelect__caret">
          <VuiIcon color="subdued" size={sizeToIconSizeMap[size]}>
            <BiCaretDown />
          </VuiIcon>
        </div>
      </div>
    );
  }
);
