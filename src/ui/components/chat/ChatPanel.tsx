import { BiX } from "react-icons/bi";
import { VuiIconButton } from "../button/IconButton";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiIcon } from "../icon/Icon";
import { VuiSpacer } from "../spacer/Spacer";
import { VuiTitle } from "../typography/Title";

type Props = {
  title: React.ReactNode;
  onClose: () => void;
  children?: React.ReactNode;
};

export const VuiChatPanel = ({ title, onClose, children }: Props) => {
  return (
    <div className="vuiChatPanel">
      <VuiFlexContainer alignItems="center" justifyContent="spaceBetween">
        <VuiFlexItem grow={1}>
          <VuiTitle size="s">
            <h3>{title}</h3>
          </VuiTitle>
        </VuiFlexItem>

        <VuiFlexItem shrink={false} grow={false}>
          <VuiIconButton
            icon={
              <VuiIcon>
                <BiX />
              </VuiIcon>
            }
            color="neutral"
            onClick={() => onClose()}
          />
        </VuiFlexItem>
      </VuiFlexContainer>

      <VuiSpacer size="s" />

      {children}

      <VuiSpacer size="l" />
    </div>
  );
};
