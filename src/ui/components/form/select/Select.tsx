import classNames from "classnames";
import { VuiIcon } from "../../icon/Icon";
import { BiChevronDown } from "react-icons/bi";

const SIZE = ["m", "l"] as const;

type Props = {
  className?: string;
  id?: string;
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

export const VuiSelect = ({ className, id, options, value, size = "m", onChange, ...rest }: Props) => {
  const classes = classNames("vuiSelect", `vuiSelect--${size}`, className);

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
      <select id={id} value={value} onChange={onChange} {...rest}>
        {renderedOptions}
      </select>
      <div className="vuiSelect__caret">
        <VuiIcon color="subdued" size={sizeToIconSizeMap[size]}>
          <BiChevronDown />
        </VuiIcon>
      </div>
    </div>
  );
};
