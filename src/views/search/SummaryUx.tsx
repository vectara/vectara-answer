import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiSpacer,
  VuiTitle,
  VuiSpinner,
  VuiHorizontalRule,
  VuiIcon,
  VuiText,
  VuiTextColor,
  VuiList,
  VuiSummary,
} from "../../ui";
import { DeserializedSearchResult } from "./types";
import { reorderSummaryCitations } from "./utils/reorderSummaryCitations";
import { reorderSearchResults } from "./utils/reorderSearchResults";
import { useSearchContext } from "../../contexts/SearchContext";
import { SearchErrorCallout } from "./results/SearchErrorCallout";
import { SummaryErrorCallout } from "./results/SummaryErrorCallout";
import { BiCheck } from "react-icons/bi";
import { SearchResultList } from "./results/SearchResultList";

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

  if (isSearching || isSummarizing) {
    let items;

    if (isSearching) {
      items = [
        {
          isComplete: true,
          render: () => (
            <VuiFlexContainer alignItems="center" spacing="xs">
              <VuiFlexItem>
                <VuiSpinner size="s" />
              </VuiFlexItem>

              <VuiFlexItem grow={false}>
                <VuiText>
                  <p>Retrieving information</p>
                </VuiText>
              </VuiFlexItem>
            </VuiFlexContainer>
          ),
        },
        {
          isComplete: false,
          render: () => (
            <VuiText>
              <p>
                <VuiTextColor color="subdued">Generate summary</VuiTextColor>
              </p>
            </VuiText>
          ),
        },
      ];
    } else {
      items = [
        {
          isComplete: true,
          render: () => (
            <VuiFlexContainer alignItems="center" spacing="xs">
              <VuiFlexItem>
                <VuiIcon size="s" color="success">
                  <BiCheck />
                </VuiIcon>
              </VuiFlexItem>

              <VuiFlexItem grow={false}>
                <VuiText>
                  <p>Retrieved information</p>
                </VuiText>
              </VuiFlexItem>
            </VuiFlexContainer>
          ),
        },
        {
          isComplete: true,
          render: () => (
            <VuiFlexContainer alignItems="center" spacing="xs">
              <VuiFlexItem>
                <VuiSpinner size="s" />
              </VuiFlexItem>

              <VuiFlexItem grow={false}>
                <VuiText>
                  <p>Generating summary</p>
                </VuiText>
              </VuiFlexItem>
            </VuiFlexContainer>
          ),
        },
      ];
    }

    return <VuiList items={items} />;
  } else if (searchError || summarizationError) {
    return searchError ? (
      <SearchErrorCallout searchError={searchError} />
    ) : (
      <SummaryErrorCallout summarizationError={summarizationError} />
    );
  }

  const unorderedSummary = summarizationResponse?.summary[0]?.text;

  let summary = "";
  let summarySearchResults: DeserializedSearchResult[] = [];
  if (!isSummarizing && unorderedSummary) {
    summary = reorderSummaryCitations(unorderedSummary);
    if (searchResults) {
      summarySearchResults = reorderSearchResults(
        searchResults,
        unorderedSummary
      );
    }
  }

  return (
    <>
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
