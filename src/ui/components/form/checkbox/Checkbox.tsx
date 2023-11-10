import { createId } from "../../../utils/createId";
import { VuiFlexContainer } from "../../flex/FlexContainer";
import { VuiFlexItem } from "../../flex/FlexItem";

type Props = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
};

export const VuiCheckbox = ({ checked, onChange, label, disabled, ...rest }: Props) => {
  const id = createId();

  const checkbox = (
    <input id={id} type="checkbox" checked={checked} onChange={onChange} disabled={disabled} {...rest} />
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
        <label className="vuiCheckboxLabel" htmlFor={id}>
          {label}
        </label>
      </VuiFlexItem>
    </VuiFlexContainer>
  );
};
