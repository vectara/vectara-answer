import { useState } from "react";
import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiHorizontalRule,
  VuiSpacer,
  VuiSpinner,
  VuiTitle,
} from "../../ui";
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

const reorderCitations = (unorderedSummary: string) => {
  const allCitations = unorderedSummary.match(/\[\d+\]/g) || [];

  const uniqueCitations = [...new Set(allCitations)];
  const citationToReplacement: { [key: string]: string } = {};
  uniqueCitations.forEach((citation, index) => {
    citationToReplacement[citation] = `[${index + 1}]`;
  });

  return unorderedSummary.replace(
    /\[\d+\]/g,
    (match) => citationToReplacement[match]
  );
};

export const SearchView = () => {
  const { isConfigLoaded, app } = useConfigContext();

  const {
    isSearching,
    searchError,
    searchResults,
    summaryMode,
    isSummarizing,
    summarizationError,
    summarizationResponse,
    searchResultsRef,
    selectedSearchResultPosition,
    selectSearchResultAt,
  } = useSearchContext();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  let content;

  if (!isConfigLoaded) {
    content = (
      <VuiFlexContainer
        className="appSpinner"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
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
    const unorderedSummary = summarizationResponse?.summary[0]?.text;
    let summary = "";
    if (unorderedSummary) summary = reorderCitations(unorderedSummary);

    content = (
      <>
        <VuiSpacer size="s" />

        {summaryMode && (
          <>
            <VuiSpacer size="s" />
            <Summary
              isSummarizing={isSummarizing}
              summarizationError={summarizationError}
              summary={summary}
              selectedSearchResultPosition={selectedSearchResultPosition}
              onClickCitation={(position: number) =>
                selectSearchResultAt(position - 1)
              }
            />
            <VuiSpacer size="l" />
            <VuiHorizontalRule />
            <VuiSpacer size="l" />
          </>
        )}

        <SearchResults
          isSearching={isSearching}
          searchError={searchError}
          results={searchResults}
          selectedSearchResultPosition={selectedSearchResultPosition}
          setSearchResultRef={(el: HTMLDivElement | null, index: number) =>
            ((searchResultsRef).current[index] = el)
          }
          summaryMode={summaryMode}
        />
      </>
    );
  }

  return (
    <>
      {app.isHeaderEnabled && <AppHeader />}
      <VuiFlexContainer
        className="searchView"
        direction="column"
        alignItems="center"
        spacing="none"
      >
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

        <HistoryDrawer
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
        />

        {app.isFooterEnabled && <AppFooter />}
      </VuiFlexContainer>
    </>
  );
};
