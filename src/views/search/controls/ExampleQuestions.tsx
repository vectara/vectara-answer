import { useConfigContext } from "../../../contexts/ConfigurationContext";
import { VuiFlexContainer, VuiFlexItem, VuiPrompt, VuiSpacer, VuiTextColor, VuiText } from "../../../ui";
import { useSearchContext } from "../../../contexts/SearchContext";
import "./exampleQuestions.scss";

export const ExampleQuestions = () => {
  const { exampleQuestions } = useConfigContext();
  const { onSearch } = useSearchContext();
  const hasExampleQuestions = exampleQuestions.length > 0;

  if (!hasExampleQuestions) return null;

  return (
    <div>
      <VuiSpacer size="s" />

      <VuiText size="s">
        <p>
          <VuiTextColor color="accent">Describe your interest above or try one of these topics.</VuiTextColor>
        </p>
      </VuiText>

      <VuiSpacer size="m" />

      <VuiFlexContainer spacing="m" wrap className="promptList">
        {exampleQuestions.map((exampleQuestion) => (
          <VuiFlexItem grow={1} key={exampleQuestion}>
            <VuiPrompt
              key={exampleQuestion}
              className="prompt"
              onClick={() => {
                onSearch({ value: exampleQuestion });
              }}
            >
              {exampleQuestion}
            </VuiPrompt>
          </VuiFlexItem>
        ))}
      </VuiFlexContainer>
    </div>
  );
};
