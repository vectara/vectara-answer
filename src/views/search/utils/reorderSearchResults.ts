import { DeserializedSearchResult } from "../types";

export const reorderSearchResults = (
  searchResults: DeserializedSearchResult[],
  unorderedSummary: string
) => {
  const newSearchResults: DeserializedSearchResult[] = [];
  const allCitations = unorderedSummary.match(/\[\d+\]/g) || [];

  const addedIndices = new Set<number>();
  for (let i = 0; i < allCitations.length; i++) {
    const citation = allCitations[i];
    const index = Number(citation.slice(1, citation.length - 1)) - 1;

    if (addedIndices.has(index)) continue;
    newSearchResults.push(searchResults[index]);
    addedIndices.add(index);
  }

  return newSearchResults;
};
