import { VuiSpacer, VuiTitle, VuiHorizontalRule, VuiSummary } from "../../ui";
import {
  sanitizeCitations,
  reorderCitations,
  applyCitationOrder,
} from "../../ui/utils/citations";
import { useSearchContext } from "../../contexts/SearchContext";
import { SearchErrorCallout } from "./results/SearchErrorCallout";
import { SummaryErrorCallout } from "./results/SummaryErrorCallout";
import { SearchResultList } from "./results/SearchResultList";
import { ProgressReport } from "./progressReport/ProgressReport";
import { DeserializedSearchResult } from "./types";

export const SummaryUx = () => {
  const {
    isSearching,
    searchError,
    searchResults,
    isSummarizing,
    summarizationError,
    summarizationResponse,
    searchResultsRef,
    selectedSearchResultPosition,
    selectSearchResultAt,
  } = useSearchContext();

  if (searchError || summarizationError) {
    return searchError ? (
      <SearchErrorCallout searchError={searchError} />
    ) : (
      <SummaryErrorCallout summarizationError={summarizationError} />
    );
  }

  const unorderedSummary = sanitizeCitations(
    summarizationResponse?.summary[0]?.text
  );

  let summary = "";
  let summarySearchResults: DeserializedSearchResult[] = [];

  if (!isSummarizing && unorderedSummary) {
    summary = reorderCitations(unorderedSummary);
    if (searchResults) {
      summarySearchResults = applyCitationOrder(
        searchResults,
        unorderedSummary
      );
    }
  }

  return (
    <>
      <ProgressReport isSearching={isSearching} isSummarizing={isSummarizing} />

      <VuiSpacer size="l" />

      <VuiTitle size="xs">
        <h2>
          <strong>Summary</strong>
        </h2>
      </VuiTitle>

      <VuiSpacer size="s" />

      <VuiSummary
        summary={summary}
        selectedCitationPosition={
          selectedSearchResultPosition === undefined
            ? undefined
            : selectedSearchResultPosition + 1
        }
        onClickCitation={(position: number) =>
          selectSearchResultAt(position - 1)
        }
      />

      <VuiSpacer size="l" />
      <VuiHorizontalRule />
      <VuiSpacer size="l" />

      <VuiTitle size="xs">
        <h2>
          <strong>References</strong>
        </h2>
      </VuiTitle>

      <VuiSpacer size="s" />

      <SearchResultList
        results={summarySearchResults}
        selectedSearchResultPosition={selectedSearchResultPosition}
        setSearchResultRef={(el: HTMLDivElement | null, index: number) =>
          (searchResultsRef.current[index] = el)
        }
      />
    </>
  );
};
