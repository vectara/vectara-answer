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
import {FactualConsistencyBadge} from "./summary/FactualConsistencyBadge";

export const SummaryUx = () => {
  const {
    isSearching,
    searchResults,
    isSummarizing,
    summarizationResponse,
    searchResultsRef,
    selectedSearchResultPosition,
    fcsMode,
    factualConsistencyScore,
    enableStreamQuery
  } = useSearchContext();

  const rawSummary = summarizationResponse;
  const unorderedSummary = sanitizeCitations(rawSummary);

  let summary = "";
  let summarySearchResults: DeserializedSearchResult[] = [];
  const processCitations =  (unorderedSummary: string) => {
    summary = reorderCitations(unorderedSummary);
    if (searchResults) {
      summarySearchResults = applyCitationOrder(
          searchResults,
          unorderedSummary
      );
    }

    // If there aren't any search results, we can safely sanitize the
    // summary of any source text citations that might be contaminating
    // it.
    if (summarySearchResults.length === 0) {
      summary = unorderedSummary.replace(/\[\d+\]/g, "");
    }
  }
  if(enableStreamQuery && unorderedSummary) {
    processCitations(unorderedSummary)
  }
  else if(!isSummarizing && unorderedSummary)
  {
    processCitations(unorderedSummary)
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

          <VuiSummary summary={summary} SummaryCitation={SummaryCitation} className="vuiSummaryWidth" />

          <VuiSpacer size="s" />

          {(fcsMode !== "disable" && !isSummarizing) && (
            <FactualConsistencyBadge
              score={factualConsistencyScore}
              fcsMode={fcsMode}
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
