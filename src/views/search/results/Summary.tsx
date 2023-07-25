import {
  VuiFlexContainer,
  VuiSpacer,
  VuiSpinner,
  VuiTextColor,
  VuiText,
  VuiTitle,
  VuiFlexItem,
  VuiSummary,
  VuiCallout
} from "../../../ui";

type Props = {
  isSummarizing: boolean;
  summarizationError?: any;
  summary?: string;
  selectedSearchResultPosition?: number;
  onClickCitation: (position: number) => void;
};

export const Summary = ({
  isSummarizing,
  summarizationError,
  summary,
  selectedSearchResultPosition,
  onClickCitation
}: Props) => {
  let content;

  if (isSummarizing) {
    // Loading indicator.
    content = (
      <VuiSummary>
        <VuiFlexContainer alignItems="center" spacing="s">
          <VuiFlexItem>
            <VuiSpinner size="s" />
          </VuiFlexItem>

          <VuiFlexItem grow={false}>
            <VuiTitle size="s" align="center">
              <h2>Generating summary&hellip;</h2>
            </VuiTitle>
          </VuiFlexItem>
        </VuiFlexContainer>
      </VuiSummary>
    );
  } else if (summarizationError) {
    // Log for diagnostics.
    console.error(summarizationError);

    const errorMessage = summarizationError.message;
    const errorDataMessage = summarizationError.response?.data?.message;

    return (content = (
      <VuiCallout headingElement="h3" title="There was an error while generating this summary" color="danger">
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
    ));
  } else {
    if (summary) {
      content = (
        <VuiSummary
          summary={summary}
          selectedCitationPosition={
            selectedSearchResultPosition === undefined ? undefined : selectedSearchResultPosition + 1
          }
          onClickCitation={onClickCitation}
        />
      );
    }
  }

  return (
    <>
      <VuiTitle size="xxs">
        <h2>
          <strong>Summary</strong>
        </h2>
      </VuiTitle>

      <VuiSpacer size="s" />

      {content}
    </>
  );
};
