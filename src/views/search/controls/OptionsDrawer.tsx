import { useState } from "react";
import { BiSlider } from "react-icons/bi";
import { useSearchContext } from "../../../contexts/SearchContext";
import {
  VuiButtonPrimary,
  VuiButtonSecondary,
  VuiButtonTertiary,
  VuiDrawer,
  VuiFlexContainer,
  VuiFlexItem,
  VuiFormGroup,
  VuiHorizontalRule,
  VuiIcon,
  VuiLabel,
  VuiRadioButton,
  VuiSearchSelect,
  VuiSpacer,
  VuiText,
  VuiTextColor,
  VuiTitle,
} from "../../../ui";
import {SUMMARY_LANGUAGES, SummaryLanguage, humanizeLanguage, FCS_MODE, UiText, FcsMode} from "../types";
import { useConfigContext } from "../../../contexts/ConfigurationContext";

const languageOptions  = SUMMARY_LANGUAGES.reduce<{ value: string; label: string }[]>((langInfo, code) => {
  const label = humanizeLanguage(code);
  if (!langInfo.some(option => option.label === label)) {
    langInfo.push({ value: code, label });
  }
  return langInfo;
}, []);

const FcsOptions = FCS_MODE.map((code) => ({
  value: code,
  label: UiText(code),
}));

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const OptionsDrawer = ({ isOpen, onClose }: Props) => {
  const { uxMode, setUxMode, fcsMode, setFcsMode, summary } = useConfigContext();
  const { language, onSearch } = useSearchContext();

  const [newUxMode, setNewUxMode] = useState(uxMode);
  const [isLanguageMenuOpen, seIisLanguageMenuOpen] = useState(false);
  const [isFcsOpen, setIsFcsOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [newLanguage, setNewLanguage] = useState<SummaryLanguage>(language);
  const [newFcsMode, setNewFcsMode] = useState<FcsMode>(fcsMode);
  const [newPrompt, setNewPrompt] = useState<string>(summary.summaryPromptName);

  return (
    <VuiDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <VuiFlexContainer
          justifyContent="spaceBetween"
          alignItems="center"
          spacing="xs"
        >
          <VuiFlexItem>
            <VuiIcon size="s">
              <BiSlider />
            </VuiIcon>
          </VuiFlexItem>

          <VuiFlexItem>
            <VuiTitle size="s">
              <h2>Options</h2>
            </VuiTitle>
          </VuiFlexItem>
        </VuiFlexContainer>
      }
    >
      <VuiLabel>Summary language</VuiLabel>

      <VuiSpacer size="xs" />

      <VuiText size="xs">
        <VuiTextColor color="subdued">
          <p>Summaries will be written in this language.</p>
        </VuiTextColor>
      </VuiText>

      <VuiSpacer size="xs" />

      <VuiSearchSelect
        isOpen={isLanguageMenuOpen}
        setIsOpen={seIisLanguageMenuOpen}
        onSelect={(value: string[]) => {
          setNewLanguage(value[0] as SummaryLanguage);
        }}
        selected={[newLanguage]}
        options={languageOptions}
        isMultiSelect={false}
      >
        <VuiButtonSecondary color="neutral" size="m">
          {humanizeLanguage(newLanguage)}
        </VuiButtonSecondary>
      </VuiSearchSelect>

      <VuiSpacer size="m" />

      <VuiFormGroup
        label="UX mode"
        labelFor="uxModeSelect"
        helpText="Focus the user experience on the search results or the summary."
      >
        <>
          <VuiRadioButton
            groupName="uxMode"
            label="Summary"
            onChange={() => setNewUxMode("summary")}
            checked={newUxMode === "summary"}
          />

          <VuiSpacer size="xs" />

          <VuiRadioButton
            groupName="uxMode"
            label="Search"
            onChange={() => setNewUxMode("search")}
            checked={newUxMode === "search"}
          />
        </>
      </VuiFormGroup>

      <VuiSpacer size="m"></VuiSpacer>

      <VuiLabel>Factual Consistency Score Mode</VuiLabel>

      <VuiSpacer size="xs" />

      <VuiSearchSelect
          isOpen={isFcsOpen}
          setIsOpen={setIsFcsOpen}
          onSelect={(value: string[]) => {
            setNewFcsMode(value[0] as FcsMode);
          }}
          selected={[newFcsMode]}
          options={FcsOptions}
          isMultiSelect={false}
      >
        <VuiButtonSecondary color="neutral" size="m">
          {UiText(newFcsMode)}
        </VuiButtonSecondary>
      </VuiSearchSelect>

      <VuiSpacer size="xs" />

      <VuiText size="xs">
        <VuiTextColor color="subdued">
          <p>Shows factual consistency score based on HHEMv2.</p>
        </VuiTextColor>
      </VuiText>
      {
        summary.summaryPromptOptions && (

          <><VuiSpacer size="m"></VuiSpacer><VuiLabel>Summary Prompts Options</VuiLabel><VuiSpacer size="xs" /><VuiSearchSelect
            isOpen={isPromptOpen}
            setIsOpen={setIsPromptOpen}
            onSelect={(value: string[]) => {
              setNewPrompt(value[0]);
            }}
            selected={[newPrompt]}
            options={summary.summaryPromptOptions.map((prompt: string) => ({
              value: prompt,
              label: prompt
            }))}
            isMultiSelect={false}
          >
            <VuiButtonSecondary color="neutral" size="m">
              {newPrompt}
            </VuiButtonSecondary>
          </VuiSearchSelect><VuiSpacer size="xs" /></>

        )
      }

      <VuiSpacer size="xs" />
      <VuiSpacer size="m" />

      <VuiSpacer size="l" />

      <VuiHorizontalRule />

      <VuiSpacer size="m" />

      <VuiFlexContainer justifyContent="spaceBetween" alignItems="center">
        <VuiFlexItem grow={false} shrink={false}>
          <VuiButtonTertiary color="primary" onClick={() => onClose()}>
            Cancel
          </VuiButtonTertiary>
        </VuiFlexItem>

        <VuiFlexItem grow={false} shrink={false}>
          <VuiButtonPrimary
            color="primary"
            onClick={() => {
              setUxMode(newUxMode);
              setFcsMode(newFcsMode)
              if (newLanguage !== language || newFcsMode !== fcsMode || newPrompt!== summary.summaryPromptName) {
                onSearch({
                  language: newLanguage as SummaryLanguage, modifiedFcsMode: newFcsMode as FcsMode, promptName: newPrompt
                });
              }
              onClose();
            }}
          >
            Save
          </VuiButtonPrimary>
        </VuiFlexItem>
      </VuiFlexContainer>
    </VuiDrawer>
  );
};
