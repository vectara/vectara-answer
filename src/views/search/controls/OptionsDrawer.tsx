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
import { SUMMARY_LANGUAGES, SummaryLanguage, humanizeLanguage } from "../types";
import { useConfigContext } from "../../../contexts/ConfigurationContext";

const languageOptions = SUMMARY_LANGUAGES.map((code) => ({
  value: code,
  label: humanizeLanguage(code),
}));

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const OptionsDrawer = ({ isOpen, onClose }: Props) => {
  const { uxMode, setUxMode } = useConfigContext();
  const { language, onSearch } = useSearchContext();

  const [newUxMode, setNewUxMode] = useState(uxMode);
  const [isLanguageMenuOpen, seIisLanguageMenuOpen] = useState(false);
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
