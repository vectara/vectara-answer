import {
  VuiSpacer,
  VuiTitle,
  VuiHorizontalRule,
  VuiSummary,
  VuiFlexContainer,
  VuiFlexItem,
  VuiSpinner,
  VuiText,
  VuiButtonSecondary,
} from "../../ui";
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
import { ConfidenceBadge } from "../../utils/ConfidenceBadge";
import { useState } from "react";
import { HemDrawer } from "./controls/HemDrawer";

export const SummaryUx = () => {
  const {
    isSearching,
    searchResults,
    isSummarizing,
    summarizationResponse,
    searchResultsRef,
    selectedSearchResultPosition,
    summaryEnableHem,
    hfToken,
  } = useSearchContext();

  const [isHemDrawerOpen, setIsHemDrawerOpen] = useState(false);

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

  const { isFetchingHemScore, confidenceLevel } = useHemScore(
    summaryEnableHem,
    hfToken,
    rawSummary,
    summarySearchResults
  );
  //    : { isFetchingHemScore: false, confidenceLevel: getConfidenceLevel(0) };

  //  let isFetchingHemScore = false;
  //  let confidenceLevel = getConfidenceLevel(0);
  //  if (summaryEnableHem) {
  //    ({ isFetchingHemScore, confidenceLevel } = useHemScore(
  //      hfToken,
  //      rawSummary,
  //      summarySearchResults
  //    ));
  //  }

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
            <>
              <VuiFlexContainer alignItems="center">
                <VuiFlexItem grow={false} shrink={false}>
                  {isFetchingHemScore ? (
                    <VuiFlexContainer alignItems="center" spacing="xs">
                      <VuiFlexItem grow={false}>
                        <VuiSpinner size="xs" />
                      </VuiFlexItem>

                      <VuiFlexItem grow={false}>
                        <VuiText size="s">
                          <p>Evaluating confidence</p>
                        </VuiText>
                      </VuiFlexItem>
                    </VuiFlexContainer>
                  ) : (
                    <ConfidenceBadge confidenceLevel={confidenceLevel} />
                  )}
                </VuiFlexItem>
                <VuiFlexItem grow={false} shrink={false}>
                  <VuiButtonSecondary
                    color="subdued"
                    size="s"
                    onClick={() => setIsHemDrawerOpen(true)}
                  >
                    What's this?
                  </VuiButtonSecondary>
                </VuiFlexItem>
              </VuiFlexContainer>
            </>
          )}

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

          <HemDrawer
            isOpen={isHemDrawerOpen}
            onClose={() => setIsHemDrawerOpen(false)}
          />
        </>
      )}
    </>
  );
};
