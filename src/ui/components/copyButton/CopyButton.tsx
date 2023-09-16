import { useEffect, useState } from "react";
import { VuiOptionsButton } from "../optionsButton/OptionsButton";
import { Props as OptionsButtonProps } from "../optionsButton/OptionsButton";
import { VuiIcon } from "../icon/Icon";
import { BiCheck, BiClipboard } from "react-icons/bi";
import { VuiButtonSecondary } from "../button/ButtonSecondary";

type Props = {
  value: string;
  options?: OptionsButtonProps["options"];
  size: OptionsButtonProps["size"];
  label?: string;
  title?: string;
};

const sizeToIconSizeMap = {
  xs: "s",
  s: "s",
  m: "m",
  l: "m",
  xl: "m"
} as const;

export const VuiCopyButton = ({ value, options, label, size = "s", ...rest }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2400);

      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  const icon = isCopied ? (
    <VuiIcon size={sizeToIconSizeMap[size]} color="success">
      <BiCheck />
    </VuiIcon>
  ) : (
    <VuiIcon size={sizeToIconSizeMap[size]}>
      <BiClipboard />
    </VuiIcon>
  );

  const copy = (copyValue = value) => {
    navigator.clipboard.writeText(copyValue);
    setIsCopied(true);
  };

  return options ? (
    <VuiOptionsButton
      type="secondary"
      icon={icon}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      color="neutral"
      size={size}
      onClick={() => {
        copy();
      }}
      onSelectOption={(value) => {
        copy(value);
        setIsOpen(false);
      }}
      options={options}
      {...rest}
    >
      {label}
    </VuiOptionsButton>
  ) : (
    <VuiButtonSecondary
      size={size}
      icon={icon}
      color="neutral"
      onClick={() => {
        copy(value);
      }}
      {...rest}
    >
      {label}
    </VuiButtonSecondary>
  );
};
