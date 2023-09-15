import { useState } from "react";
import { BiCheck, BiDetail } from "react-icons/bi";
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
import { DeserializedSearchResult } from "../types";
import { SearchResultsDrawer } from "./SearchResultsDrawer";

type Props = {
  isSearching: boolean;
  isSummarizing: boolean;
  searchResults?: DeserializedSearchResult[];
};

export const ProgressReport = ({
  isSearching,
  isSummarizing,
  searchResults,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReviewSearchResultsOpen, setIsReviewSearchResultsOpen] =
    useState(false);

  const receivedQuestionStep = {
    key: "receivedQuestionStep",
    isComplete: true,
    render: () => (
      <VuiFlexContainer alignItems="start" spacing="xs">
        <VuiFlexItem>
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
    render: () => (
      <VuiFlexContainer alignItems="start" spacing="xs">
        <VuiFlexItem>
          <VuiIcon size="s" color="success">
            <BiCheck />
          </VuiIcon>
        </VuiFlexItem>

        <VuiFlexItem grow={false} alignItems="start">
          <VuiText>
            <p>Retrieved search results</p>
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
        </VuiFlexItem>
      </VuiFlexContainer>
    ),
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

  const generatedSummaryStep = {
    key: "generatedSummaryStep",
    isComplete: true,
    render: () => (
      <VuiFlexContainer alignItems="start" spacing="xs">
        <VuiFlexItem>
          <VuiIcon size="s" color="success">
            <BiCheck />
          </VuiIcon>
        </VuiFlexItem>

        <VuiFlexItem grow={false}>
          <VuiText>
            <p>Generated summary</p>
          </VuiText>
        </VuiFlexItem>
      </VuiFlexContainer>
    ),
  };

  let items = [receivedQuestionStep];

  if (isSearching) {
    items = items.concat([retrievingSearchResultsStep, generateSummaryStep]);
  } else if (isSummarizing) {
    items = items.concat([retrievedSearchResultsStep, generatingSummaryStep]);
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
