import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { VuiFlexContainer, VuiFlexItem, VuiHorizontalRule, VuiSpacer, VuiSpinner, VuiTitle } from "../../ui";
import { SearchControls } from "./controls/SearchControls";
import { Summary } from "./results/Summary";
import { SearchResults } from "./results/SearchResults";
import { ExampleQuestions } from "./controls/ExampleQuestions";
import { useSearchContext } from "../../contexts/SearchContext";
import { AppHeader } from "./chrome/AppHeader";
import { AppFooter } from "./chrome/AppFooter";
import { useConfigContext } from "../../contexts/ConfigurationContext";
import { HistoryDrawer } from "./controls/HistoryDrawer";
import "./searchView.scss";

export const SearchView = () => {
  const { isConfigLoaded, app } = useConfigContext();

  const {
    onSearch,
    isSearching,
    searchError,
    searchResults,
    isSummarizing,
    summarizationError,
    summarizationResponse,
    searchResultsRef,
    selectedSearchResultPosition,
    selectSearchResultAt
  } = useSearchContext();

  const [searchParams] = useSearchParams();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Use the browser back and forward buttons to traverse history
  // of searches.
  useEffect(() => {
    if (!isConfigLoaded) return;

    const urlParams = new URLSearchParams(searchParams);
    const persistedSearchValue = decodeURIComponent(urlParams.get("query") ?? "");
    const persistedFilterValue = decodeURIComponent(urlParams.get("filter") ?? "");

    onSearch({ value: persistedSearchValue, filter: persistedFilterValue, isPersistable: false });
  }, [isConfigLoaded, searchParams]); // TODO: Add onSearch and fix infinite render loop

  let content;

  if (!isConfigLoaded) {
    content = (
      <VuiFlexContainer className="appSpinner" direction="column" justifyContent="center" alignItems="center">
        <VuiSpinner size="l" />
        <VuiSpacer size="l" />
        <VuiTitle size="xs">
          <h2>Loading</h2>
        </VuiTitle>
      </VuiFlexContainer>
    );
  } else if (
    !isSearching &&
    !searchError &&
    !searchResults &&
    !isSummarizing &&
    !summarizationError &&
    !summarizationResponse
  ) {
    content = <ExampleQuestions />;
  } else {
    const summary = summarizationResponse?.summary[0]?.text;
    content = (
      <>
        <VuiSpacer size="s" />

        <Summary
          isSummarizing={isSummarizing}
          summarizationError={summarizationError}
          summary={summary}
          selectedSearchResultPosition={selectedSearchResultPosition}
          onClickCitation={(position: number) => selectSearchResultAt(position - 1)}
        />

        <VuiSpacer size="l" />

        <VuiHorizontalRule />

        <VuiSpacer size="l" />

        <SearchResults
          isSearching={isSearching}
          searchError={searchError}
          results={searchResults}
          selectedSearchResultPosition={selectedSearchResultPosition}
          setSearchResultRef={(el: HTMLDivElement | null, index: number) =>
            ((searchResultsRef as any).current[index] = el)
          }
        />
      </>
    );
  }

  return (
    <>
      {app.isHeaderEnabled && <AppHeader />}
      <VuiFlexContainer className="searchView" direction="column" alignItems="center" spacing="none">
        {isConfigLoaded && (
          <VuiFlexItem className="searchControlsContainer">
            <SearchControls
              isHistoryOpen={isHistoryOpen}
              onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
              hasQuery={Boolean(isSearching || searchResults)}
            />
          </VuiFlexItem>
        )}

        <VuiFlexItem grow={1} className="searchContent">
          {content}
        </VuiFlexItem>

        <HistoryDrawer isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />

        {app.isFooterEnabled && <AppFooter />}
      </VuiFlexContainer>
    </>
  );
};
