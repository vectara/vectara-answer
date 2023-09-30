import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiTitle,
  VuiSpinner,
  VuiSpacer,
} from "../../ui";
import { useSearchContext } from "../../contexts/SearchContext";
import { SearchResultList } from "./results/SearchResultList";
import { SearchErrorCallout } from "./results/SearchErrorCallout";

export const SearchUx = () => {
  const {
    isSearching,
    searchError,
    searchResults,
    searchResultsRef,
    selectedSearchResultPosition,
  } = useSearchContext();

  let content;

  if (isSearching) {
    content = (
      <VuiFlexContainer alignItems="center" spacing="m">
        <VuiFlexItem>
          <VuiSpinner size="s" />
        </VuiFlexItem>

        <VuiFlexItem grow={false}>
          <VuiTitle size="s" align="center">
            <h2>Searching</h2>
          </VuiTitle>
        </VuiFlexItem>
      </VuiFlexContainer>
    );
  } else if (searchError) {
    content = <SearchErrorCallout searchError={searchError} />;
  } else {
    content = (
      <SearchResultList
        results={searchResults ?? []}
        selectedSearchResultPosition={selectedSearchResultPosition}
        setSearchResultRef={(el: HTMLDivElement | null, index: number) =>
          (searchResultsRef.current[index] = el)
        }
      />
    );
  }

  return (
    <>
      <VuiSpacer size="m" />
      {content}
    </>
  );
};
