export const truncateStart = (source: string, maxLength: number) => {
  if (source.length < maxLength || maxLength <= 0) return source;
  const truncatedSource = source.substring(source.length - maxLength, source.length).trim();

  if (truncatedSource.length) return `…${truncatedSource}`;
  return truncatedSource;
};

export const truncateEnd = (source: string, maxLength: number) => {
  if (source.length < maxLength || maxLength <= 0) return source;
  const truncatedSource = source.substring(0, maxLength).trim();

  if (truncatedSource.length) {
    if ([".", "?", "!"].includes(truncatedSource[truncatedSource.length - 1])) {
      return `${truncatedSource} …`;
    }
    return `${truncatedSource}…`;
  }
  return truncatedSource;
};
