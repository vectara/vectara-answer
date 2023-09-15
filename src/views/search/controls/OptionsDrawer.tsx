import { useState } from "react";
import { BiSlider } from "react-icons/bi";
import { useSearchContext } from "../../../contexts/SearchContext";
import {
  VuiButtonPrimary,
  VuiButtonTertiary,
  VuiDrawer,
  VuiFlexContainer,
  VuiFlexItem,
  VuiFormGroup,
  VuiHorizontalRule,
  VuiIcon,
  VuiSelect,
  VuiSpacer,
  VuiTitle,
} from "../../../ui";
import { SUMMARY_LANGUAGES, SummaryLanguage, humanizeLanguage } from "../types";
import { useConfigContext } from "../../../contexts/ConfigurationContext";

const languageOptions = SUMMARY_LANGUAGES.map((code) => ({
  value: code,
  text: humanizeLanguage(code),
}));

const uxModeOptions = [
  {
    value: "summary",
    text: "Summary",
  },
  {
    value: "search",
    text: "Search",
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const OptionsDrawer = ({ isOpen, onClose }: Props) => {
  const { uxMode, setUxMode } = useConfigContext();
  const { language, onSearch } = useSearchContext();

  const [newUxMode, setNewUxMode] = useState(uxMode);
  const [newLanguage, setNewLanguage] = useState<SummaryLanguage>(language);

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
      <VuiFormGroup
        label="Summary language"
        labelFor="languageSelect"
        helpText="Summaries will be written in this language."
      >
        <VuiSelect
          id="languageSelect"
          options={languageOptions}
          value={newLanguage}
          onChange={(e: any) => {
            setNewLanguage(e.target.value);
          }}
        />
      </VuiFormGroup>

      <VuiSpacer size="m" />

      <VuiFormGroup
        label="UX mode"
        labelFor="uxModeSelect"
        helpText="Focus the user experience on the search results or the summary."
      >
        <VuiSelect
          id="uxModeSelect"
          options={uxModeOptions}
          value={newUxMode}
          onChange={(e: any) => {
            setNewUxMode(e.target.value);
          }}
        />
      </VuiFormGroup>

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
              if (newLanguage !== language) {
                onSearch({
                  language: newLanguage as SummaryLanguage,
                });
              }

              setUxMode(newUxMode);
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
