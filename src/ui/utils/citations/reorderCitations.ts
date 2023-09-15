export const reorderCitations = (unorderedSummary: string) => {
  const allCitations = unorderedSummary.match(/\[\d+\]/g) || [];

  const uniqueCitations = [...new Set(allCitations)];
  const citationToReplacement: { [key: string]: string } = {};
  uniqueCitations.forEach((citation, index) => {
    citationToReplacement[citation] = `[${index + 1}]`;
  });

  return unorderedSummary.replace(
    /\[\d+\]/g,
    (match) => citationToReplacement[match]
  );
};
