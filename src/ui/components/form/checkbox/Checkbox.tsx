import { VuiFlexContainer } from "../../flex/FlexContainer";
import { VuiFlexItem } from "../../flex/FlexItem";

type Props = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  id?: string;
  disabled?: boolean;
};

export const VuiCheckbox = ({ checked, onChange, label, id, disabled, ...rest }: Props) => {
  // Enable a lazy developer to just use the label as the ID,
  // though this risks accidental duplication of IDs.
  const idOrLabel = id ?? label;

  const checkbox = (
    <input
      id={label ? idOrLabel : undefined}
      type="checkbox"
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
        <label className="vuiCheckboxLabel" htmlFor={idOrLabel}>
          {label}
        </label>
      </VuiFlexItem>
    </VuiFlexContainer>
  );
};
