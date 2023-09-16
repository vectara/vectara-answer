import { VuiFlexContainer } from "../../flex/FlexContainer";
import { VuiFlexItem } from "../../flex/FlexItem";

type Props = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  id?: string;
  disabled?: boolean;
};

export const VuiRadioButton = ({ checked, onChange, label, id, disabled, ...rest }: Props) => {
  // Enable a lazy developer to just use the label as the ID,
  // though this risks accidental duplication of IDs.
  const idOrLabel = id ?? label;

  const checkbox = (
    <input
      id={label ? idOrLabel : undefined}
      type="radio"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      {...rest}
    />
  );

  if (!label) {
    return checkbox;
  }

  return (
    <VuiFlexContainer spacing="xs" alignItems="center">
      <VuiFlexItem grow={false} shrink={false}>
        {checkbox}
      </VuiFlexItem>

      <VuiFlexItem grow={false} shrink={false}>
        <label className="vuiRadioButtonLabel" htmlFor={idOrLabel}>
          {label}
        </label>
      </VuiFlexItem>
    </VuiFlexContainer>
  );
};
