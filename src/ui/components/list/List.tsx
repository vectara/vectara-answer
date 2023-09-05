import classNames from "classnames";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiSpacer } from "../spacer/Spacer";

type ListItem = {
  isComplete: boolean;
  render: () => React.ReactNode;
};

type Props = {
  items: ListItem[];
};

export const VuiList = ({ items }: Props) => {
  return (
    <>
      {items.map((item, index) => {
        const humanizedStep = index + 1;
        const numberClasses = classNames("vuiListNumber", {
          "vuiListNumber-isComplete": item.isComplete
        });

        return (
          <>
            <VuiFlexContainer alignItems="center">
              <VuiFlexItem grow={false} shrink={false}>
                <div className={numberClasses} aria-label={`Step ${humanizedStep}`}>
                  {humanizedStep}
                </div>
              </VuiFlexItem>

              <VuiFlexItem grow={1}>{item.render()}</VuiFlexItem>
            </VuiFlexContainer>

            {index < items.length - 1 && <VuiSpacer size="s" />}
          </>
        );
      })}
    </>
  );
};
