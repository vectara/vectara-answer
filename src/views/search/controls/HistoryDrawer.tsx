import { BiTimeFive } from "react-icons/bi";
import { useSearchContext } from "../../../contexts/SearchContext";
import {
  VuiButtonSecondary,
  VuiDrawer,
  VuiFlexContainer,
  VuiFlexItem,
  VuiIcon,
  VuiMenu,
  VuiMenuItem,
  VuiText,
  VuiTextColor,
  VuiTitle,
} from "../../../ui";
import { humanizeLanguage } from "../types";

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
        <VuiFlexContainer
          justifyContent="spaceBetween"
          alignItems="center"
          spacing="xs"
        >
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
            <VuiButtonSecondary color="neutral" size="s" onClick={clearHistory}>
              Clear
            </VuiButtonSecondary>
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
          {history.map(({ query, filter, language, date }) => {
            let subTitle = date;
            if (language) {
              subTitle += ` • ${humanizeLanguage(language)}`;
            }

            return (
              <VuiMenuItem
                key={query}
                title={query}
                text={subTitle}
                onClick={() => {
                  onSearch({ value: query, filter, language });
                  onClose();
                }}
              />
            );
          })}
        </VuiMenu>
      )}
    </VuiDrawer>
  );
};
