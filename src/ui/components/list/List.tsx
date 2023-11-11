import classNames from "classnames";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiSpacer } from "../spacer/Spacer";
import { Fragment } from "react";

type ListItem = {
  key: string;
  isComplete: boolean;
  render: () => React.ReactNode;
};

type Props = {
  items: ListItem[];
  size?: "s" | "m";
  alignItems?: "start" | "center" | "end";
};

export const VuiList = ({ items, size = "m", alignItems = "center" }: Props) => {
  return (
    <>
      {items.map((item, index) => {
        const humanizedStep = index + 1;
        const numberClasses = classNames("vuiListNumber", `vuiListNumber--${size}`, {
          "vuiListNumber-isComplete": item.isComplete
        });

        return (
          <Fragment key={item.key}>
            <VuiFlexContainer alignItems={alignItems} spacing={size}>
              <VuiFlexItem grow={false} shrink={false}>
                <div className={numberClasses} aria-label={`Step ${humanizedStep}`}>
                  {humanizedStep}
                </div>
              </VuiFlexItem>

              <VuiFlexItem grow={1} alignItems="start">
                {item.render()}
              </VuiFlexItem>
            </VuiFlexContainer>

            {index < items.length - 1 && <VuiSpacer size="s" />}
          </Fragment>
        );
      })}
    </>
  );
};
