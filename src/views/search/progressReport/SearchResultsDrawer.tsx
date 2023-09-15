import { BiDetail } from "react-icons/bi";
import {
  VuiDrawer,
  VuiFlexContainer,
  VuiFlexItem,
  VuiIcon,
  VuiText,
  VuiTitle,
} from "../../../ui";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SearchResultsDrawer = ({ isOpen, onClose }: Props) => {
  return (
    <VuiDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <VuiFlexContainer
          justifyContent="spaceBetween"
          alignItems="center"
          spacing="xs"
        >
          <VuiFlexItem>
            <VuiIcon size="s">
              <BiDetail />
            </VuiIcon>
          </VuiFlexItem>

          <VuiFlexItem grow={1}>
            <VuiTitle size="s">
              <h2>Review search results</h2>
            </VuiTitle>
          </VuiFlexItem>
        </VuiFlexContainer>
      }
    >
      <VuiText>
        <p>
          These are all of the search results retrieved for this query. Not all
          of them will be used to generate a summary.
        </p>
      </VuiText>
    </VuiDrawer>
  );
};
