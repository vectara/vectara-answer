import { ChangeEvent, FormEvent, useState } from "react";
import { useConfigContext } from "../../../contexts/ConfigurationContext";
import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiSearchInput,
  VuiSpacer,
  VuiTitle,
  VuiTextColor,
  VuiText,
  VuiBadge,
  VuiIcon,
  VuiButtonEmpty,
  VuiPopover,
  VuiOptionsList,
} from "../../../ui";
import { useSearchContext } from "../../../contexts/SearchContext";
import "./searchControls.scss";
import { BiCaretDown, BiTimeFive } from "react-icons/bi";
import { SUMMARY_LANGUAGES, SummaryLanguage, humanizeLanguage } from "../types";

const languageOptions = SUMMARY_LANGUAGES.map((code) => ({
  value: code,
  label: humanizeLanguage(code),
}));

type Props = {
  isHistoryOpen: boolean;
  onToggleHistory: () => void;
  hasQuery: boolean;
};

export const SearchControls = ({
  isHistoryOpen,
  onToggleHistory,
  hasQuery,
}: Props) => {
  const {
    filterValue,
    searchValue,
    setSearchValue,
    language,
    onSearch,
    reset,
  } = useSearchContext();
  const { searchHeader, filters } = useConfigContext();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch({ value: searchValue });
  };

  const filterOptions: Array<{ value: string; text: string }> = [];

  if (filters.isEnabled) {
    filterOptions.push({
      text: "All sources",
      value: "",
    });

    filters.sources.forEach(({ value, label }) => {
      filterOptions.push({ text: label, value });
    });
  }

  return (
    <div className="searchControls">
      <VuiFlexContainer alignItems="center" justifyContent="spaceBetween">
        <VuiFlexItem grow={false}>
          <VuiFlexContainer alignItems="center">
            {searchHeader.logo.src && (
              <VuiFlexItem>
                <a
                  href={searchHeader.logo.link ?? "/"}
                  target={
                    searchHeader.logo.link !== undefined ? "_blank" : "_self"
                  } rel="noreferrer"
                >
                  <img
                    src={searchHeader.logo.src}
                    alt={searchHeader.logo.alt}
                    height={searchHeader.logo.height}
                  />
                </a>
              </VuiFlexItem>
            )}

            {searchHeader.title && (
              <VuiFlexItem grow={false}>
                <VuiTitle size="m">
                  <a href="/" target="_self" className="no-underline">
                    <h2>
                      <strong>{searchHeader.title}</strong>
                    </h2>
                  </a>
                </VuiTitle>
              </VuiFlexItem>
            )}
          </VuiFlexContainer>
        </VuiFlexItem>

        <VuiFlexItem grow={false}>
          <VuiFlexContainer alignItems="center" spacing="m">
            {searchHeader.description && (
              <VuiFlexItem grow={false}>
                <VuiTitle size="xxs" align="right">
                  <VuiTextColor color="subdued">
                    <h2 style={{ whiteSpace: "pre-line" }}>
                      {searchHeader.description.replaceAll("\\n", "\n")}
                    </h2>
                  </VuiTextColor>
                </VuiTitle>
              </VuiFlexItem>
            )}

            <VuiFlexItem grow={false}>
              <VuiPopover
                isOpen={isLanguageMenuOpen}
                setIsOpen={setIsLanguageMenuOpen}
                button={
                  <VuiButtonEmpty
                    color="normal"
                    size="s"
                    icon={
                      <VuiIcon size="m">
                        <BiCaretDown />
                      </VuiIcon>
                    }
                  >
                    Language: {humanizeLanguage(language as SummaryLanguage)}
                  </VuiButtonEmpty>
                }
              >
                <VuiOptionsList
                  isSelectable
                  onSelectOption={(value) => {
                    setIsLanguageMenuOpen(false);
                    onSearch({
                      language: value as SummaryLanguage,
                    });
                  }}
                  selectedOption={language}
                  options={languageOptions}
                />
              </VuiPopover>
            </VuiFlexItem>

            <VuiFlexItem grow={false}>
              <VuiButtonEmpty
                color="normal"
                size="s"
                isPressed={isHistoryOpen}
                onClick={onToggleHistory}
                icon={
                  <VuiIcon size="m">
                    <BiTimeFive />
                  </VuiIcon>
                }
              >
                History
              </VuiButtonEmpty>
            </VuiFlexItem>
          </VuiFlexContainer>
        </VuiFlexItem>
      </VuiFlexContainer>

      <VuiSpacer size="m" />

      <VuiSearchInput
        size="l"
        value={searchValue}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        placeholder={searchHeader.placeholder ?? ""}
        autoFocus
      />

      <VuiSpacer size="m" />

      <VuiFlexContainer alignItems="center" justifyContent="spaceBetween">
        {filters.isEnabled && (
          <VuiFlexItem grow={false}>
            <fieldset>
              <VuiFlexContainer
                alignItems="center"
                wrap={true}
                spacing="xs"
                className="filtersBar"
              >
                <VuiFlexItem grow={false}>
                  <legend>
                    <VuiText>
                      <VuiTextColor color="subdued">
                        <p>Filter by source</p>
                      </VuiTextColor>
                    </VuiText>
                  </legend>
                </VuiFlexItem>

                <VuiFlexItem grow={1}>
                  <VuiFlexContainer
                    alignItems="center"
                    wrap={true}
                    spacing="xxs"
                  >
                    {filterOptions.map((option) => {
                      const isSelected = option.value === filterValue;
                      return (
                        <VuiFlexItem key={option.value}>
                          <VuiBadge
                            color={isSelected ? "primary" : "normal"}
                            onClick={() =>
                              onSearch({
                                filter: isSelected ? "" : option.value,
                              })
                            }
                          >
                            {option.text}
                          </VuiBadge>
                        </VuiFlexItem>
                      );
                    })}
                  </VuiFlexContainer>
                </VuiFlexItem>
              </VuiFlexContainer>
            </fieldset>
          </VuiFlexItem>
        )}

        {hasQuery && (
          <VuiFlexItem grow={false}>
            <VuiButtonEmpty color="normal" size="s" onClick={() => reset()}>
              Start over
            </VuiButtonEmpty>
          </VuiFlexItem>
        )}
      </VuiFlexContainer>
    </div>
  );
};
