import { VuiBadge } from "../../../ui";
import { ConfidenceLevel } from "../../../utils/useHemScore";

const confidenceLevelToLabel = {
  unavailable: "Unavailable confidence",
  low: "Low confidence",
  medium: "Partial confidence",
  high: "High confidence",
};

const confidenceLevelToColor = {
  unavailable: "neutral",
  low: "danger",
  medium: "warning",
  high: "success",
} as const;

type Props = { confidenceLevel: ConfidenceLevel };

export const ConfidenceBadge = ({ confidenceLevel }: Props) => {
  return (
    <VuiBadge color={confidenceLevelToColor[confidenceLevel]}>
      {confidenceLevelToLabel[confidenceLevel]}
    </VuiBadge>
  );
};
