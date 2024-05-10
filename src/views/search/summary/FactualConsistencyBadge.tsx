import {VuiBadge, VuiFlexContainer, VuiFlexItem, VuiLinkInternal, VuiText} from "../../../ui";
import {ConfidenceBadge} from "./ConfidenceBadge";
import {FcsMode} from "../types";

interface Props {
    score?: number;
    fcsMode?: FcsMode
}

export type ConfidenceLevel = "unavailable" | "low" | "medium" | "high";

const getConfidenceLevel = (score: number): ConfidenceLevel => {
    if (score < 0) {
        return "unavailable";
    }

    if (score <= 0.33) {
        return "low";
    }

    if (score <= 0.66) {
        return "medium";
    }

    return "high";
};
export const FactualConsistencyBadge = ({ score, fcsMode }: Props) => {
    let badge;
    const fcsLDocsLink = "https://docs.vectara.com/docs/api-reference/search-apis/search?#factual-consistency-score"
    if (score !== undefined) {
        // badge = <VuiBadge color="accent">Calculating Factual Consistency Score…</VuiBadge>;
        const sanitizedScore = parseFloat(score.toFixed(2));
        badge = (
            <VuiBadge color={"neutral" as "neutral" | "warning" | "success" | "danger"}>
                Factual Consistency Score: {sanitizedScore}
            </VuiBadge>
        );

        return (
            <VuiFlexContainer alignItems="center" data-testid="factualConsistencyBadge">
                {/*{score === undefined && <VuiSpinner size="s" />}*/}
                <VuiFlexItem>
                    {
                        fcsMode === "badge" ? <ConfidenceBadge confidenceLevel={getConfidenceLevel(score ?? -1)} />
                            : badge
                    }
                </VuiFlexItem>
                <VuiFlexItem>
                    <VuiText size="xs">
                        <p>
                            <VuiLinkInternal href={fcsLDocsLink} target="_blank">
                                What's this?
                            </VuiLinkInternal>
                        </p>
                    </VuiText>
                </VuiFlexItem>
            </VuiFlexContainer>
        );
    }

    else {
        return <></>
    }

};
