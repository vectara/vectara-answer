import React from "react";
import classNames from "classnames";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiIcon } from "../icon/Icon";
import { BiCheck } from "react-icons/bi";

type Props = {
  value: string;
  children: React.ReactNode;
  isSelectable?: boolean;
  isSelected: boolean;
  onClick: (value: string) => void;
};

export const VuiOptionsListItem = ({
  value,
  children,
  isSelectable,
  isSelected,
  onClick,
  ...rest
}: Props) => {
  return (
    <button
      className="vuiOptionsListItem"
      onClick={() => onClick(value)}
      {...rest}
    >
      <VuiFlexContainer alignItems="center" spacing="xs">
        {isSelectable && (
          <VuiFlexItem grow={false}>
            <VuiIcon
              className={
                isSelected ? "" : "vuiOptionsListItem__selected--unselected"
              }
              color="accent"
              size="s"
            >
              <BiCheck />
            </VuiIcon>
          </VuiFlexItem>
        )}

        <VuiFlexItem grow={false}> {children}</VuiFlexItem>
      </VuiFlexContainer>
    </button>
  );
};
