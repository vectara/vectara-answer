import { forwardRef } from "react";
import { VuiText, VuiTextColor, VuiFlexContainer, VuiFlexItem, VuiBadge, VuiSearchResult } from "../../../ui";
import { truncateEnd, truncateStart } from "../../../ui/utils/truncateString";
import { useSearchContext } from "../../../contexts/SearchContext";
import { useConfigContext } from "../../../contexts/ConfigurationContext";
import { SearchGroupedResult, SearchSingleResult } from "../types";
import "./SearchResult.scss";

type Props = {
  result: SearchGroupedResult;
  position: number;
  isSelected: boolean;
};

const CONTEXT_MAX_LENGTH = 200;

export const SearchResult = forwardRef<HTMLDivElement | null, Props>(({ result, position, isSelected }: Props, ref) => {
  const { filters } = useConfigContext();
  const { onSearch } = useSearchContext();

  const { url, source } = result;
  // const { pre, text, post } = result.subresults[0].snippet as SearchSingleResult["snippet"];

  const positions = result.subresults.map((subresult) => subresult.index + 1);

  return (
    <VuiSearchResult
      ref={ref}
      isSelected={isSelected}
      result={result}
      positions={positions}
      subTitle={
        Boolean(filters.isEnabled || url) && (
          <VuiFlexContainer alignItems="center" spacing="xs" className="searchResultFilterGroup">
            {filters.isEnabled && (
              <VuiFlexItem>
                <VuiBadge
                  aria-label={`Filter by source ${
                    filters.sourceValueToLabelMap ? filters.sourceValueToLabelMap[source] : source
                  }`}
                  color="normal"
                  onClick={() => onSearch({ filter: source })}
                >
                  {filters.sourceValueToLabelMap ? filters.sourceValueToLabelMap[source] : source}
                </VuiBadge>
              </VuiFlexItem>
            )}

            {url && (
              <VuiFlexItem grow={1}>
                <VuiText size="s" className="searchResultSiteCategory">
                  <p>
                    <VuiTextColor color="subdued">{url}</VuiTextColor>
                  </p>
                </VuiText>
              </VuiFlexItem>
            )}
          </VuiFlexContainer>
        )
      }
    />
  );
});
