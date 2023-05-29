import { parseSnippet } from "./parseSnippet";
import { DocMetadata, SearchResponse, DeserializedSearchResult } from "../views/search/types";

const convertMetadataToObject = (metadata: DocMetadata[]) => {
  const obj: Record<string, string> = {};
  metadata.forEach((item) => {
    obj[item.name] = item.value;
  });
  return obj;
};

const parseMetadata = (rawMetadata: DocMetadata[]) => {
  const metadata = convertMetadataToObject(rawMetadata);
  return {
    source: metadata.source as string,
    url: metadata.url,
    title: metadata.title || "Untitled",
    metadata
  };
};

export const deserializeSearchResponse = (
  searchResponse?: SearchResponse
): Array<DeserializedSearchResult> | undefined => {
  if (!searchResponse) return undefined;

  const results: Array<DeserializedSearchResult> = [];
  const { response: responses, document: documents } = searchResponse;

  responses.forEach((response) => {
    const { documentIndex, text: rawText } = response;
    const { pre, post, text } = parseSnippet(rawText);
    const document = documents[Number(documentIndex)];
    const { id, metadata: rawMetadata } = document;
    const { source, url, title, metadata } = parseMetadata(rawMetadata);

    results.push({
      id,
      snippet: {
        pre,
        text,
        post
      },
      source,
      url,
      title,
      metadata
    });
  });

  return results;
};
