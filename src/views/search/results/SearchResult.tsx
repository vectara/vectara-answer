import { forwardRef } from "react";
import {
  VuiText,
  VuiTextColor,
  VuiFlexContainer,
  VuiFlexItem,
  VuiSearchResult, VuiBadge
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
    const { filterBySource } = useConfigContext();
    const { relatedContent } = useSearchContext();

    const {
      source,
      url,
      id,
      snippet: { pre, post, text },
    } = result;
    const title = result.title ?? id
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
        relatedContent={relatedContent}
        subTitle={
          Boolean(filterBySource.isEnabled || url) && (
            <VuiFlexContainer
              alignItems="center"
              spacing="xs"
              className="searchResultFilterGroup"
            >
              {source && (
                <VuiFlexItem>
                  {/* eslint-disable-next-line react/jsx-no-undef */}
                  <VuiBadge
                    aria-label={`Filter by source ${source}`}
                    color="neutral"
                  >
                    {source}
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
