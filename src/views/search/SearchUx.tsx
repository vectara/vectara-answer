import { VuiFlexContainer, VuiFlexItem, VuiTitle, VuiSpinner } from "../../ui";
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

  if (isSearching) {
    return (
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
    return <SearchErrorCallout searchError={searchError} />;
  }
  return (
    <SearchResultList
      results={searchResults ?? []}
      selectedSearchResultPosition={selectedSearchResultPosition}
      setSearchResultRef={(el: HTMLDivElement | null, index: number) =>
        (searchResultsRef.current[index] = el)
      }
    />
  );
};
