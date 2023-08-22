import { forwardRef } from "react";
import {
  VuiText,
  VuiTextColor,
  VuiFlexContainer,
  VuiFlexItem,
  VuiBadge,
  VuiSearchResult,
} from "../../../ui";
import { truncateEnd, truncateStart } from "../../../ui/utils/truncateString";
import { useSearchContext } from "../../../contexts/SearchContext";
import { useConfigContext } from "../../../contexts/ConfigurationContext";
import { DeserializedSearchResult } from "../types";
import "./SearchResult.scss";

type Props = {
  result: DeserializedSearchResult;
  position: number;
  isSelected: boolean;
};

const CONTEXT_MAX_LENGTH = 200;

export const SearchResult = forwardRef<HTMLDivElement | null, Props>(
  ({ result, position, isSelected }: Props, ref) => {
    const { filters } = useConfigContext();
    const { onSearch } = useSearchContext();

    const {
      source,
      title,
      url,
      snippet: { pre, post, text },
    } = result;

    return (
      <VuiSearchResult
        ref={ref}
        isSelected={isSelected}
        result={{
          title,
          url,
          snippet: {
            pre: truncateStart(pre, CONTEXT_MAX_LENGTH),
            text,
            post: truncateEnd(post, CONTEXT_MAX_LENGTH),
          },
        }}
        position={position + 1}
        subTitle={
          Boolean(filters.isEnabled || url) && (
            <VuiFlexContainer
              alignItems="center"
              spacing="xs"
              className="searchResultFilterGroup"
            >
              {filters.isEnabled && (
                <VuiFlexItem>
                  <VuiBadge
                    aria-label={`Filter by source ${
                      filters.sourceValueToLabelMap
                        ? filters.sourceValueToLabelMap[source]
                        : source
                    }`}
                    color="neutral"
                    onClick={() => onSearch({ filter: source })}
                  >
                    {filters.sourceValueToLabelMap
                      ? filters.sourceValueToLabelMap[source]
                      : source}
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
  }
);
