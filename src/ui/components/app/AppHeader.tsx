import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";

type Props = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export const VuiAppHeader = ({ left, right, ...rest }: Props) => {
  return (
    <div className="vuiAppHeader" {...rest}>
      <VuiFlexContainer className="vuiAppHeader__inner" justifyContent="spaceBetween" alignItems="center">
        {Boolean(left) && (
          <VuiFlexItem grow={1} shrink={false}>
            {left}
          </VuiFlexItem>
        )}

        {Boolean(right) && (
          <VuiFlexItem grow={false} shrink={false}>
            {right}
          </VuiFlexItem>
        )}
      </VuiFlexContainer>
    </div>
  );
};
