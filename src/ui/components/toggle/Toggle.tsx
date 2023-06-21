import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";

type Props = {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

export const VuiToggle = ({ checked, onChange, label, ...rest }: Props) => {
  return (
    <VuiFlexContainer alignItems="center" spacing="s">
      <VuiFlexItem grow={false}>
        <label className="vuiToggle">
          <input className="vuiToggle__input" type="checkbox" checked={checked} onChange={onChange} {...rest} />
          <span className="vuiToggle__button"></span>
        </label>
      </VuiFlexItem>

      {label && <VuiFlexItem grow={false}>{label}</VuiFlexItem>}
    </VuiFlexContainer>
  );
};
