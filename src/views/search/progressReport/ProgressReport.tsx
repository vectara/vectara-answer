import { useState } from "react";
import { BiCheck, BiX, BiDetail, BiError } from "react-icons/bi";
import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiSpinner,
  VuiIcon,
  VuiText,
  VuiTextColor,
  VuiList,
  VuiSpacer,
  VuiAccordion,
  VuiButtonSecondary,
} from "../../../ui";
import { useSearchContext } from "../../../contexts/SearchContext";
import { SearchResultsDrawer } from "./SearchResultsDrawer";

const humanizeTime = (ms: number) => {
  return `${(ms / 1000).toFixed(2)} seconds`;
};

type Props = {
  isSearching: boolean;
  isSummarizing: boolean;
};

export const ProgressReport = ({ isSearching, isSummarizing }: Props) => {
  const {
    searchTime,
    summaryTime,
    searchResults,
    searchError,
    summarizationResponse,
    summarizationError,
  } = useSearchContext();

  const [isOpen, setIsOpen] = useState(true);
  const [isReviewSearchResultsOpen, setIsReviewSearchResultsOpen] =
    useState(false);

  const receivedQuestionStep = {
    key: "receivedQuestionStep",
    isComplete: true,
    render: () => (
      <VuiFlexContainer alignItems="start" spacing="xs">
        <VuiFlexItem>
          <VuiSpacer size="xxxs" />
          <VuiIcon size="s" color="success">
            <BiCheck />
          </VuiIcon>
        </VuiFlexItem>

        <VuiFlexItem grow={false}>
          <VuiText>
            <p>Received question</p>
          </VuiText>
        </VuiFlexItem>
      </VuiFlexContainer>
    ),
  };

  const retrievingSearchResultsStep = {
    key: "retrievingSearchResultsStep",
    isComplete: true,
    render: () => (
      <VuiFlexContainer alignItems="start" spacing="xs">
        <VuiFlexItem>
          <VuiSpinner size="s" />
        </VuiFlexItem>

        <VuiFlexItem grow={false}>
          <VuiText>
            <p>Retrieving search results</p>
          </VuiText>
        </VuiFlexItem>
      </VuiFlexContainer>
    ),
  };

  const retrievedSearchResultsStep = {
    key: "retrievedSearchResultsStep",
    isComplete: true,
    render: () => {
      const numSearchResults = searchResults?.length ?? 0;
      const icon =
        numSearchResults > 0 ? (
          <VuiIcon size="s" color="success">
            <BiCheck />
          </VuiIcon>
        ) : (
          <VuiIcon size="s" color="danger">
            <BiError />
          </VuiIcon>
        );

      return (
        <VuiFlexContainer alignItems="start" spacing="xs">
          <VuiFlexItem>
            <VuiSpacer size="xxxs" />
            {icon}
          </VuiFlexItem>

          <VuiFlexItem grow={false} alignItems="start">
            {numSearchResults > 0 ? (
              <>
                <VuiText>
                  <p>
                    Retrieved {numSearchResults} search results in{" "}
                    {humanizeTime(searchTime)}
                  </p>
                </VuiText>
                <VuiSpacer size="xs" />

                <VuiButtonSecondary
                  size="s"
                  color="primary"
                  onClick={() => setIsReviewSearchResultsOpen(true)}
                  icon={
                    <VuiIcon>
                      <BiDetail />
                    </VuiIcon>
                  }
                >
                  Review results
                </VuiButtonSecondary>
              </>
            ) : (
              <VuiText>
                <VuiTextColor color="danger">
                  <p>
                    {searchError?.message ?? "We couldn't run your search."}
                  </p>
                </VuiTextColor>
              </VuiText>
            )}
          </VuiFlexItem>
        </VuiFlexContainer>
      );
    },
  };

  const generateSummaryStep = {
    key: "generateSummaryStep",
    isComplete: false,
    render: () => (
      <VuiText>
        <p>
          <VuiTextColor color="subdued">Generate summary</VuiTextColor>
        </p>
      </VuiText>
    ),
  };

  const generatingSummaryStep = {
    key: "generatingSummaryStep",
    isComplete: true,
    render: () => (
      <VuiFlexContainer alignItems="start" spacing="xs">
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
  };

  const canceledSummaryStep = {
    key: "canceledSummaryStep",
    isComplete: true,
    render: () => (
      <VuiFlexContainer alignItems="start" spacing="xs">
        <VuiFlexItem>
          <VuiSpacer size="xxxs" />
          <VuiIcon color="subdued">
            <BiX />
          </VuiIcon>
        </VuiFlexItem>

        <VuiFlexItem grow={false}>
          <VuiText>
            <VuiTextColor color="subdued">
              <p>Summary canceled</p>
            </VuiTextColor>
          </VuiText>
        </VuiFlexItem>
      </VuiFlexContainer>
    ),
  };

  const generatedSummaryStep = {
    key: "generatedSummaryStep",
    isComplete: true,
    render: () => {
      const hasSummary = summarizationResponse?.summary;
      const icon = hasSummary ? (
        <VuiIcon size="s" color="success">
          <BiCheck />
        </VuiIcon>
      ) : (
        <VuiIcon size="s" color="danger">
          <BiError />
        </VuiIcon>
      );

      return (
        <VuiFlexContainer alignItems="start" spacing="xs">
          <VuiFlexItem>
            <VuiSpacer size="xxxs" />
            {icon}
          </VuiFlexItem>

          <VuiFlexItem grow={false}>
            {hasSummary ? (
              <VuiText>
                <p>Generated summary in {humanizeTime(summaryTime)}</p>
              </VuiText>
            ) : (
              <VuiText>
                <VuiTextColor color="danger">
                  <p>
                    {summarizationError?.message ??
                      "We couldn't generate a summary."}
                  </p>
                </VuiTextColor>
              </VuiText>
            )}
          </VuiFlexItem>
        </VuiFlexContainer>
      );
    },
  };

  let items = [receivedQuestionStep];

  if (isSearching) {
    items = items.concat([retrievingSearchResultsStep, generateSummaryStep]);
  } else if (isSummarizing) {
    items = items.concat([retrievedSearchResultsStep, generatingSummaryStep]);
  } else if (searchError) {
    items = items.concat([retrievedSearchResultsStep, canceledSummaryStep]);
  } else if (summarizationError) {
    items = items.concat([retrievedSearchResultsStep, generatedSummaryStep]);
  } else {
    items = items.concat([retrievedSearchResultsStep, generatedSummaryStep]);
  }

  return (
    <>
      <VuiAccordion
        header="Progress report"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <VuiSpacer size="s" />
        <VuiList size="s" items={items} alignItems="start" />
      </VuiAccordion>

      <SearchResultsDrawer
        isOpen={isReviewSearchResultsOpen}
        onClose={() => setIsReviewSearchResultsOpen(false)}
      />
    </>
  );
};
