import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiButtonTertiary } from "../button/ButtonTertiary";
import { VuiIcon } from "../icon/Icon";

export type Pager = {
  onSelectPreviousPage?: () => void;
  onSelectNextPage?: () => void;
};

type Props = Pager & {
  isDisabled?: boolean;
};

export const VuiTablePager = ({ onSelectPreviousPage, onSelectNextPage, isDisabled }: Props) => {
  return (
    <VuiFlexContainer justifyContent="start" alignItems="center" spacing="none">
      <VuiFlexItem grow={false} shrink={false}>
        <VuiButtonTertiary
          icon={
            <VuiIcon>
              <BiLeftArrowAlt />
            </VuiIcon>
          }
          color="neutral"
          size="s"
          onClick={() => onSelectPreviousPage?.()}
          isDisabled={isDisabled || !onSelectPreviousPage}
        >
          Previous
        </VuiButtonTertiary>
      </VuiFlexItem>

      <VuiFlexItem grow={false} shrink={false}>
        <VuiButtonTertiary
          icon={
            <VuiIcon>
              <BiRightArrowAlt />
            </VuiIcon>
          }
          iconSide="right"
          color="neutral"
          size="s"
          onClick={() => onSelectNextPage?.()}
          isDisabled={isDisabled || !onSelectNextPage}
        >
          Next
        </VuiButtonTertiary>
      </VuiFlexItem>
    </VuiFlexContainer>
  );
};
