import { Link } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiIcon } from "../icon/Icon";
import { OptionListItem } from "./types";

type Props<T> = OptionListItem<T> & {
  isSelectable?: boolean;
  isSelected?: boolean;
};

// https://github.com/typescript-eslint/typescript-eslint/issues/4062
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const VuiOptionsListItem = <T extends unknown = unknown>({
  value,
  label,
  color = "neutral",
  href,
  target,
  onClick,
  isSelectable,
  isSelected,
  testId,
  ...rest
}: Props<T>) => {
  const content = (
    <VuiFlexContainer alignItems="center" spacing="xs">
      {isSelectable && (
        <VuiFlexItem grow={false}>
          <VuiIcon className={isSelected ? "" : "vuiOptionsListItem__selected--unselected"} color="accent" size="s">
            <BiCheck />
          </VuiIcon>
        </VuiFlexItem>
      )}
      <VuiFlexItem grow={false}>{label}</VuiFlexItem>
    </VuiFlexContainer>
  );

  if (href) {
    return (
      <Link
        className="vuiOptionsListItem"
        to={href}
        target={target}
        onClick={() => onClick?.(value)}
        data-testid={testId}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className="vuiOptionsListItem" onClick={() => onClick?.(value)} data-testid={testId} {...rest}>
      {content}
    </button>
  );
};
