import { BiTimeFive } from "react-icons/bi";
import { useSearchContext } from "../../../contexts/SearchContext";
import {
  VuiButtonEmpty,
  VuiDrawer,
  VuiFlexContainer,
  VuiFlexItem,
  VuiIcon,
  VuiMenu,
  VuiMenuItem,
  VuiText,
  VuiTextColor,
  VuiTitle
} from "../../../ui";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const HistoryDrawer = ({ isOpen, onClose }: Props) => {
  const { onSearch, history, clearHistory } = useSearchContext();

  return (
    <VuiDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <VuiFlexContainer justifyContent="spaceBetween" alignItems="center" spacing="xs">
          <VuiFlexItem>
            <VuiIcon size="s">
              <BiTimeFive />
            </VuiIcon>
          </VuiFlexItem>

          <VuiFlexItem>
            <VuiTitle size="s">
              <h2>History</h2>
            </VuiTitle>
          </VuiFlexItem>

          <VuiFlexItem>
            <VuiButtonEmpty color="normal" size="s" onClick={clearHistory}>
              Clear
            </VuiButtonEmpty>
          </VuiFlexItem>
        </VuiFlexContainer>
      }
    >
      {!history.length ? (
        <VuiText>
          <VuiTextColor color="subdued">
            <p>No history to show.</p>
          </VuiTextColor>
        </VuiText>
      ) : (
        <VuiMenu>
          {history.map(({ query, filter, date }) => (
            <VuiMenuItem
              key={query}
              title={query}
              text={date}
              onClick={() => {
                onSearch({ value: query, filter });
                onClose();
              }}
            />
          ))}
        </VuiMenu>
      )}
    </VuiDrawer>
  );
};
