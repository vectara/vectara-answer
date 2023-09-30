import { BiCaretDown } from "react-icons/bi";
import { Props as ButtonPrimaryProps, VuiButtonPrimary } from "../button/ButtonPrimary";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { Props as OptionsListProps, VuiOptionsList } from "../optionsList/OptionsList";
import { VuiIcon } from "../icon/Icon";
import { Props as PopoverProps, VuiPopover } from "../popover/Popover";
import { VuiButtonSecondary } from "../button/ButtonSecondary";

export type Props = Pick<PopoverProps, "isOpen" | "setIsOpen"> &
  Pick<OptionsListProps<any>, "options" | "onSelectOption"> &
  Pick<ButtonPrimaryProps, "children" | "icon" | "color" | "size" | "className" | "fullWidth" | "onClick"> & {
    type?: "primary" | "secondary";
  };

export const VuiOptionsButton = ({
  type = "primary",
  isOpen,
  setIsOpen,
  children,
  icon,
  color,
  size,
  className,
  fullWidth,
  onSelectOption,
  options,
  ...rest
}: Props) => {
  const Button = type === "primary" ? VuiButtonPrimary : VuiButtonSecondary;

  return (
    <VuiFlexContainer spacing="none" alignItems="center" className={className}>
      <VuiFlexItem grow={false}>
        <Button icon={icon} color={color} size={size} className="vuiOptionsButtonLeft" fullWidth={fullWidth} {...rest}>
          {children}
        </Button>
      </VuiFlexItem>

      <VuiFlexItem grow={false}>
        <VuiPopover
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(!isOpen)}
          button={
            <Button
              color={color}
              size={size}
              className={`vuiOptionsButtonRight vuiOptionsButtonRight--${color}`}
              isSelected={isOpen}
              icon={
                <VuiIcon>
                  <BiCaretDown />
                </VuiIcon>
              }
            />
          }
        >
          <VuiOptionsList onSelectOption={onSelectOption} options={options} />
        </VuiPopover>
      </VuiFlexItem>
    </VuiFlexContainer>
  );
};
