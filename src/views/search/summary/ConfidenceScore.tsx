import { useState } from "react";
import {
  VuiButtonSecondary,
  VuiFlexContainer,
  VuiFlexItem,
  VuiSpinner,
  VuiText,
} from "../../../ui";
import { HemDrawer } from "./HemDrawer";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { useHemScore } from "../../../utils/useHemScore";
import { useSearchContext } from "../../../contexts/SearchContext";
import { DeserializedSearchResult } from "../types";

type Props = {
  rawSummary?: string;
  summarySearchResults: DeserializedSearchResult[];
};

export const ConfidenceScore = ({
  rawSummary,
  summarySearchResults,
}: Props) => {
  const { hfToken } = useSearchContext();

  const { isFetchingHemScore, confidenceLevel } = useHemScore(
    hfToken,
    rawSummary,
    summarySearchResults
  );

  const [isHemDrawerOpen, setIsHemDrawerOpen] = useState(false);

  return (
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

      <HemDrawer
        isOpen={isHemDrawerOpen}
        onClose={() => setIsHemDrawerOpen(false)}
      />
    </>
  );
};
