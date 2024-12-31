import { VuiBadge, VuiFlexContainer, VuiFlexItem, VuiLinkInternal } from "../../../ui";
import {ConfidenceBadge} from "./ConfidenceBadge";
import {FcsMode} from "../types";
import { useState } from "react";
import { HemDrawer } from "./HemDrawer";

interface Props {
    score?: number;
    fcsMode?: FcsMode
}

export type ConfidenceLevel = "unavailable" | "low" | "medium" | "high";

const getConfidenceLevel = (score: number): ConfidenceLevel => {
    if (score < 0) {
        return "unavailable";
    }

    if (score <= 0.20) {
        return "low";
    }

    if (score >= 0.20 && score <= 0.40) {
        return "medium";
    }

    return "high";
};
export const FactualConsistencyBadge = ({ score, fcsMode }: Props) => {
    const [isHemDrawerOpen, setIsHemDrawerOpen] = useState(false);
    const sanitizedScore = score ? parseFloat(score.toFixed(2)) : "unavailable";
    const badge = (
        <VuiBadge color={"neutral" as "neutral" | "warning" | "success" | "danger"}>
            Factual Consistency Score: {sanitizedScore}
        </VuiBadge>
    );

    return (
      <>
          <VuiFlexContainer alignItems="center" data-testid="factualConsistencyBadge">
              {/*{score === undefined && <VuiSpinner size="s" />}*/}
              <VuiFlexItem>
                  {
                      fcsMode === "badge" && sanitizedScore !== "unavailable" ? <ConfidenceBadge confidenceLevel={getConfidenceLevel(score ?? -1)} />
                        : badge
                  }
              </VuiFlexItem>
              <VuiFlexItem grow={false} shrink={false}>
                  <VuiLinkInternal
                    onClick={() => setIsHemDrawerOpen(true)}
                  >
                      What's this?
                  </VuiLinkInternal>
              </VuiFlexItem>
          </VuiFlexContainer>
          <HemDrawer
            isOpen={isHemDrawerOpen}
            onClose={() => setIsHemDrawerOpen(false)}
          />
      </>

    );


};
