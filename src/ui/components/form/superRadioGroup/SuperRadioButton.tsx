import { createId } from "../../../utils/createId";
import { VuiFlexContainer } from "../../flex/FlexContainer";
import { VuiFlexItem } from "../../flex/FlexItem";
import { VuiSpacer } from "../../spacer/Spacer";
import { VuiText } from "../../typography/Text";
import { VuiTextColor } from "../../typography/TextColor";
import { RadioButtonConfig } from "./types";

type Props = RadioButtonConfig & {
  groupName: string;
  onChange: (value: string) => void;
};

export const VuiSuperRadioButton = ({ label, description, value, checked, onChange, groupName, ...rest }: Props) => {
  const id = createId();

  return (
    <label className="vuiSuperRadioButton" htmlFor={id}>
      <VuiFlexContainer spacing="l" alignItems="center">
        <VuiFlexItem grow={false} shrink={false}>
          <input id={id} name={groupName} type="radio" checked={checked} onChange={() => onChange(value)} {...rest} />
        </VuiFlexItem>

        <VuiFlexItem grow={false} shrink={false}>
          <VuiText>
            <p>{label}</p>
          </VuiText>

          {description && (
            <>
              <VuiSpacer size="xxs" />

              <VuiText size="xs">
                <VuiTextColor color="subdued">
                  <p>{description}</p>
                </VuiTextColor>
              </VuiText>
            </>
          )}
        </VuiFlexItem>
      </VuiFlexContainer>
    </label>
  );
};
