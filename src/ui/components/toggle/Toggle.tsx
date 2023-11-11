import { createId } from "../../utils/createId";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";

type Props = {
  id?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

export const VuiToggle = ({ id, checked, onChange, label, ...rest }: Props) => {
  let labelId;

  const inputProps: Record<string, string> = {};

  if (label) {
    labelId = createId();
    inputProps["aria-labelledby"] = labelId;
  }

  return (
    <VuiFlexContainer alignItems="center" spacing="s">
      <VuiFlexItem grow={false}>
        <label className="vuiToggle">
          <input
            className="vuiToggle__input"
            type="checkbox"
            checked={checked}
            onChange={onChange}
            id={id}
            {...inputProps}
            {...rest}
          />
          <span className="vuiToggle__button" />
        </label>
      </VuiFlexItem>

      {label && (
        <VuiFlexItem grow={false}>
          <div id={labelId}>{label}</div>
        </VuiFlexItem>
      )}
    </VuiFlexContainer>
  );
};
