import { createId } from "../../../utils/createId";
import { VuiFlexContainer } from "../../flex/FlexContainer";
import { VuiFlexItem } from "../../flex/FlexItem";

type Props = {
  checked: boolean;
  onChange: () => void;
  groupName: string;
  label?: string;
  disabled?: boolean;
};

export const VuiRadioButton = ({ checked, onChange, label, groupName, disabled, ...rest }: Props) => {
  const id = createId();

  const radioButton = (
    <input id={id} type="radio" checked={checked} onChange={onChange} disabled={disabled} {...rest} />
  );

  if (!label) {
    return radioButton;
  }

  return (
    <VuiFlexContainer spacing="xs" alignItems="center">
      <VuiFlexItem grow={false} shrink={false}>
        {radioButton}
      </VuiFlexItem>

      <VuiFlexItem grow={false} shrink={false}>
        <label className="vuiRadioButtonLabel" htmlFor={id}>
          {label}
        </label>
      </VuiFlexItem>
    </VuiFlexContainer>
  );
};
