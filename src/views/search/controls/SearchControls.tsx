import { ChangeEvent, FormEvent, useState } from "react";
import { BiSlider, BiTimeFive } from "react-icons/bi";
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
  VuiButtonSecondary,
  VuiLink,
} from "../../../ui";
import { useSearchContext } from "../../../contexts/SearchContext";
import "./searchControls.scss";
import { HistoryDrawer } from "./HistoryDrawer";
import { OptionsDrawer } from "./OptionsDrawer";

type Props = {
  hasQuery: boolean;
};

export const SearchControls = ({ hasQuery }: Props) => {
  const { filterValue, setFilterValue, searchValue, setSearchValue, onSearch, reset } =
    useSearchContext();
  const { searchHeader, filters } = useConfigContext();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch({ value: searchValue });
  };

  const filterOptions: Array<{ value: string; text: string }> = [];

  if (filters.isEnabled) {
    if (filters.allSources) {
      filterOptions.push({
        text: "All sources",
        value: "",
      });
    }

    // if allSources is false, then we set the filterValue is set to the first source
    // In this case the "All sources" button is not there, and the first source is selected by default
    if (!filters.allSources && filterValue === "") {
      setFilterValue(filters.sources[0].value)
    }

    filters.sources.forEach(({ value, label }) => {
      filterOptions.push({ text: label, value });
    });
  }

  return (
    <>
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
                    }
                    rel="noreferrer"
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
                    <VuiLink href="/">
                      <h2>
                        <strong>{searchHeader.title}</strong>
                      </h2>
                    </VuiLink>
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
                <VuiButtonSecondary
                  color="neutral"
                  size="s"
                  isSelected={isOptionsOpen}
                  onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                  icon={
                    <VuiIcon size="m">
                      <BiSlider />
                    </VuiIcon>
                  }
                >
                  Options
                </VuiButtonSecondary>
              </VuiFlexItem>

              <VuiFlexItem grow={false}>
                <VuiButtonSecondary
                  color="neutral"
                  size="s"
                  isSelected={isHistoryOpen}
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                  icon={
                    <VuiIcon size="m">
                      <BiTimeFive />
                    </VuiIcon>
                  }
                >
                  History
                </VuiButtonSecondary>
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
                              color={isSelected ? "primary" : "neutral"}
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
              <VuiButtonSecondary
                color="neutral"
                size="s"
                onClick={() => reset()}
              >
                Start over
              </VuiButtonSecondary>
            </VuiFlexItem>
          )}
        </VuiFlexContainer>
      </div>

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      <OptionsDrawer
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
      />
    </>
  );
};
