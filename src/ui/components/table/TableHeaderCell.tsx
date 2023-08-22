import { BiChevronDown } from "react-icons/bi";
import { VuiFlexContainer } from "../flex/FlexContainer";
import { VuiFlexItem } from "../flex/FlexItem";
import { VuiIcon } from "../icon/Icon";

export type Props = {
  name: string;
  header: {
    isSortable?: boolean;
    render?: () => React.ReactNode;
  };
  onSort?: (column: string, direction: "asc" | "desc") => void;
};

export const VuiTableHeaderCell = ({ name, header, onSort }: Props) => {
  return (
    <VuiFlexContainer spacing="xxs" alignItems="center" justifyContent="start">
      <VuiFlexItem grow={false} shrink={false}>
        {header.render ? header.render() : name}
      </VuiFlexItem>

      {onSort && header.isSortable && (
        <VuiFlexItem grow={false} shrink={false}>
          <VuiIcon size="s">
            <BiChevronDown />
          </VuiIcon>
        </VuiFlexItem>
      )}
    </VuiFlexContainer>
  );
};
