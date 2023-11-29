import { useConfigContext } from "../../../contexts/ConfigurationContext";
import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiSpacer,
  VuiTextColor,
  VuiText,
} from "../../../ui";
import { useSearchContext } from "../../../contexts/SearchContext";
import "./exampleQuestions.scss";
import { ExampleQuestion } from "./ExampleQuestion";

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
          <VuiTextColor color="accent">
            Describe your interest above or try one of these topics.
          </VuiTextColor>
        </p>
      </VuiText>

      <VuiSpacer size="m" />

      <VuiFlexContainer spacing="m" wrap className="promptList">
        {exampleQuestions.map((exampleQuestion) => (
          <VuiFlexItem grow={1} basis="none" key={exampleQuestion}>
            <ExampleQuestion
              key={exampleQuestion}
              className="prompt"
              onClick={() => {
                onSearch({ value: exampleQuestion });
              }}
              title={exampleQuestion}
            />
          </VuiFlexItem>
        ))}
      </VuiFlexContainer>
    </div>
  );
};
