import { VuiSpacer, VuiTitle, VuiHorizontalRule, VuiSummary } from "../../ui";
import {
  sanitizeCitations,
  reorderCitations,
  applyCitationOrder,
} from "../../ui/utils/citations";
import { useSearchContext } from "../../contexts/SearchContext";
import { SearchResultList } from "./results/SearchResultList";
import { ProgressReport } from "./progressReport/ProgressReport";
import { SummaryCitation } from "./summary/SummaryCitation";
import { DeserializedSearchResult } from "./types";
import { ConfidenceScore } from "./summary/ConfidenceScore";

export const SummaryUx = () => {
  const {
    isSearching,
    searchResults,
    isSummarizing,
    summarizationResponse,
    searchResultsRef,
    selectedSearchResultPosition,
    summaryEnableHem,
  } = useSearchContext();

  const rawSummary = summarizationResponse?.summary[0]?.text;
  const unorderedSummary = sanitizeCitations(rawSummary);

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

    // If there aren't any search results, we can safely sanitize the
    // summary of any source text citations that might might be contaminating
    // it.
    if (summarySearchResults.length === 0) {
      summary = unorderedSummary.replace(/\[\d+\]/g, "");
    }
  }

  return (
    <>
      <ProgressReport isSearching={isSearching} isSummarizing={isSummarizing} />

      {summary && (
        <>
          <VuiSpacer size="l" />

          <VuiTitle size="xs">
            <h2 style={{ display: "flex", alignItems: "center" }}>
              <strong>Summary</strong>
            </h2>
          </VuiTitle>

          <VuiSpacer size="s" />

          <VuiSummary summary={summary} SummaryCitation={SummaryCitation} />

          <VuiSpacer size="s" />

          {summaryEnableHem && (
            <ConfidenceScore
              rawSummary={rawSummary}
              summarySearchResults={summarySearchResults}
            />
          )}

          <VuiSpacer size="l" />
          <VuiHorizontalRule />
          <VuiSpacer size="l" />

          {summarySearchResults.length > 0 && (
            <>
              <VuiTitle size="xs">
                <h2>
                  <strong>References</strong>
                </h2>
              </VuiTitle>

              <VuiSpacer size="s" />

              <SearchResultList
                results={summarySearchResults}
                selectedSearchResultPosition={selectedSearchResultPosition}
                setSearchResultRef={(
                  el: HTMLDivElement | null,
                  index: number
                ) => (searchResultsRef.current[index] = el)}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
