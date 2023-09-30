export const applyCitationOrder = (
  searchResults: any[],
  unorderedSummary: string
) => {
  const orderedSearchResults: any[] = [];
  const allCitations = unorderedSummary.match(/\[\d+\]/g) || [];

  const addedIndices = new Set<number>();
  for (let i = 0; i < allCitations.length; i++) {
    const citation = allCitations[i];
    const index = Number(citation.slice(1, citation.length - 1)) - 1;

    if (addedIndices.has(index)) continue;
    orderedSearchResults.push(searchResults[index]);
    addedIndices.add(index);
  }

  return orderedSearchResults;
};
