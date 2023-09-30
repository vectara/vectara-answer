import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiButtonTertiary } from "../button/ButtonTertiary";
import { VuiIcon } from "../icon/Icon";
import { createPagination } from "./createPagination";
import classNames from "classnames";

export type Pagination = {
  currentPage: number;
  numPages: number;
  onSelectPage: (page: number) => void;
};

type Props = Pagination & {
  isDisabled?: boolean;
};

export const VuiTablePagination = ({ currentPage, numPages, onSelectPage, isDisabled }: Props) => {
  const { items, activeIndex } = createPagination(currentPage, numPages);
  const manyPagesTokenClasses = classNames("vuiTableManyPagesToken", {
    "vuiTableManyPagesToken-isDisabled": isDisabled
  });

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
          onClick={() => onSelectPage(currentPage - 1)}
          isDisabled={isDisabled || currentPage === 1}
        >
          Previous
        </VuiButtonTertiary>
      </VuiFlexItem>

      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <VuiFlexItem grow={false} shrink={false} key={index}>
            {item === "..." ? (
              <div className={manyPagesTokenClasses}>{item}</div>
            ) : (
              <VuiButtonTertiary
                color={isActive ? "primary" : "neutral"}
                isInert={isActive}
                isSelected={isActive}
                size="s"
                onClick={() => onSelectPage(item)}
                isDisabled={isDisabled}
              >
                {item}
              </VuiButtonTertiary>
            )}
          </VuiFlexItem>
        );
      })}

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
          onClick={() => onSelectPage(currentPage + 1)}
          isDisabled={isDisabled || currentPage === numPages}
        >
          Next
        </VuiButtonTertiary>
      </VuiFlexItem>
    </VuiFlexContainer>
  );
};
