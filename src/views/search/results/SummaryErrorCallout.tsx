import { VuiCallout, VuiText, VuiTextColor } from "../../../ui";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  summarizationError: any;
};

export const SummaryErrorCallout = ({ summarizationError }: Props) => {
  // Log for diagnostics.
  console.error("summarizationError", summarizationError);

  const errorMessage = summarizationError.message;
  const errorDataMessage = summarizationError.response?.data?.message;

  return (
    <VuiCallout
      headingElement="h3"
      title="There was an error while generating this summary"
      color="danger"
    >
      {(errorMessage || errorDataMessage) && (
        <VuiText>
          {errorMessage && (
            <p>
              <VuiTextColor color="danger">{errorMessage}</VuiTextColor>
            </p>
          )}
          {errorDataMessage && (
            <p>
              <VuiTextColor color="danger">{errorDataMessage}</VuiTextColor>
            </p>
          )}
        </VuiText>
      )}
    </VuiCallout>
  );
};
