import { SearchResult } from "./SearchResult";
import {
  SearchGroupedResult,
  SearchSingleResult,
  DeserializedSearchResult,
} from "../types";

type Props = {
  results: Array<DeserializedSearchResult>;
  selectedSearchResultPosition?: number;
  setSearchResultRef: (el: HTMLDivElement | null, index: number) => void;
};

export const SearchResultList = ({
  results,
  selectedSearchResultPosition,
  setSearchResultRef,
}: Props) => {
  const groupedResults: Array<SearchGroupedResult> = [];
  for (let i = 0; i < results.length; i++) {
    // If the result is not already in the grouped results, add it.
    if (
      !groupedResults.find(
        (groupedResult) => groupedResult.id === results[i].id
      )
    ) {
      const { id, url, metadata, source, title } = results[i];
      const { pre, text, post } = results[i]
        .snippet as SearchSingleResult["snippet"];
      groupedResults.push({
        id: id,
        title: title,
        url: url,
        metadata: metadata,
        source: source,
        subresults: [
          {
            snippet: {
              pre,
              text,
              post,
            },
            index: i,
          },
        ],
      });
    } else {
      // Otherwise, add the subresult to the existing result.
      const groupedResult = groupedResults.find(
        (groupedResult) => groupedResult.id === results[i].id
      ) as SearchGroupedResult;
      const { pre, text, post } = results[i]
        .snippet as SearchSingleResult["snippet"];
      groupedResult.subresults.push({
        snippet: {
          pre,
          text,
          post,
        },
        index: i,
      });
    }
  }

  return (
    <>
      {groupedResults.map((result, i) => (
        <SearchResult
          key={i}
          result={result}
          position={i}
          isSelected={selectedSearchResultPosition === i}
          ref={(el: HTMLDivElement | null) => setSearchResultRef(el, i)}
        />
      ))}
    </>
  );
};
