import { createId } from "../../../utils/createId";
import { VuiSuperRadioButton } from "./SuperRadioButton";
import { RadioButtonConfig } from "./types";

type Props = {
  group: RadioButtonConfig[];
  onChange: (value: string) => void;
};

export const VuiSuperRadioGroup = ({ group, onChange }: Props) => {
  const groupName = createId();

  return (
    <div className="vuiSuperRadioGroup">
      {group.map((item) => (
        <VuiSuperRadioButton key={item.value} {...item} groupName={groupName} onChange={onChange} />
      ))}
    </div>
  );
};
