import { VuiText } from "../typography/Text";
import { VuiTextColor, TextColor } from "../typography/TextColor";
import { VuiOptionsListItem } from "./OptionsListItem";

type Props = {
  options: {
    value: string;
    label: string;
    color?: TextColor;
  }[];
  onSelectOption: (value: string) => void;
  selectedOption: string;
  isSelectable?: boolean;
};

export const VuiOptionsList = ({
  options,
  onSelectOption,
  selectedOption,
  isSelectable = false,
  ...rest
}: Props) => {
  return (
    <div className="vuiOptionsList" {...rest}>
      {options.map(({ value, label, color = "normal" }) => (
        <VuiOptionsListItem
          key={value}
          value={value}
          onClick={onSelectOption}
          isSelectable={isSelectable}
          isSelected={value === selectedOption}
        >
          <VuiText>
            <VuiTextColor color={color}>
              <p>{label}</p>
            </VuiTextColor>
          </VuiText>
        </VuiOptionsListItem>
      ))}
    </div>
  );
};
