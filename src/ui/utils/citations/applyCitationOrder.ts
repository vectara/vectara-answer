export const applyCitationOrder = (
  searchResults: any[],
  unorderedSummary: string
) => {
  const orderedSearchResults: any[] = [];
  const citations = unorderedSummary.match(/\[\d+\]/g) || [];
  const addedCitations = new Set<string>();

  for (let i = 0; i < citations.length; i++) {
    const citation = citations[i];

    // Ignore citations that have already been added.
    if (addedCitations.has(citation)) continue;

    // Extract index from [INDEX] format.
    const citationIndex = Number(citation.slice(1, citation.length - 1)) - 1;

    // Ignore citations that are out of range of the search results.
    if (citationIndex < 0 || citationIndex >= searchResults.length) continue;

    orderedSearchResults.push(searchResults[citationIndex]);
    addedCitations.add(citation);
  }

  return orderedSearchResults;
};
