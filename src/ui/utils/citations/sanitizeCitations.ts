export const sanitizeCitations = (summary?: string) => {
  if (!summary) return summary;

  // Match citations.
  const regex = /\[(\d+(,*\s*\d*)*)\]/g;

  const parts: Array<string> = [];

  let match;
  let lastIndex = 0;

  // Parse all cited content.
  while ((match = regex.exec(summary)) !== null) {
    const index = match.index;
    const reference = match[1];
    const text = summary.slice(lastIndex, index);
    // Handle citations that are in the form of [1, 2, 3] or [1,2,3]
    // so normalize to the latter.
    parts.push(text);
    parts.push(
      reference
        .replace(/\s/g, "")
        .split(",")
        .map((citation) => `[${citation}]`)
        .join("")
    );
    lastIndex = index + match[0].length;
  }

  // Add the remaining content after the last citation.
  const text = summary.slice(lastIndex);
  if (text.length > 0) {
    parts.push(text);
  }

  return parts.join("");
};
