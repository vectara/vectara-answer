import { VuiSpacer, VuiTitle, VuiHorizontalRule, VuiSummary } from "../../ui";
import {
  sanitizeCitations,
  reorderCitations,
  applyCitationOrder,
} from "../../ui/utils/citations";
import { useHemScore } from "../../utils/useHemScore";
import { useSearchContext } from "../../contexts/SearchContext";
import { SearchResultList } from "./results/SearchResultList";
import { ProgressReport } from "./progressReport/ProgressReport";
import { SummaryCitation } from "./summary/SummaryCitation";
import { DeserializedSearchResult } from "./types";

export const SummaryUx = () => {
  const {
    isSearching,
    searchResults,
    isSummarizing,
    summarizationResponse,
    searchResultsRef,
    selectedSearchResultPosition,
    hfToken,
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
  }

  const { hemScore } = useHemScore(hfToken, rawSummary, summarySearchResults);

  function getGaugeColor(score: number) {
    if (score > 0 && score <= 0.25) {
      return "red";
    } else if (score > 0.25 && score <= 0.5) {
      return "orange";
    } else if (score > 0.5 && score <= 0.75) {
      return "yellow";
    } else {
      return "green";
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
              {" "}
              {/* Flex container */}
              <strong>Summary</strong>
              {hemScore > 0 && (
                <div
                  style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: getGaugeColor(hemScore),
                    display: "inline-block",
                    marginLeft: "10px",
                    borderRadius: "50%",
                  }}
                />
              )}
            </h2>
          </VuiTitle>

          <VuiSpacer size="s" />

          <VuiSummary summary={summary} SummaryCitation={SummaryCitation} />

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
      )}
    </>
  );
};
