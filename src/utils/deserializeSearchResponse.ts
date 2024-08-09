import { parseSnippet } from "./parseSnippet";
import {
  DocMetadata,
  SearchResponse,
  DeserializedSearchResult,
  SearchResult
} from "../views/search/types";
import { ApiV2 } from "@vectara/stream-query-client";

const convertMetadataToObject = (metadata: DocMetadata[]) => {
  const obj: Record<string, string> = {};
  metadata.forEach((item) => {
    obj[item.name] = item.value;
  });
  return obj;
};

const parseMetadata = (rawMetadata: DocMetadata[], matchingText: string) => {
  const metadata = convertMetadataToObject(rawMetadata);
  return {
    source: metadata.source as string,
    url: metadata.url,
    title: metadata.title || matchingText.split(' ').slice(0, 10).join(' '),  // Use first 10 words if title not present
    metadata
  };
};

export const deserializeSearchResponse = (
  searchResponse?: SearchResponse | ApiV2.Query.SearchResult[] | undefined
): Array<DeserializedSearchResult> | undefined => {
  if (!searchResponse ) return undefined;

  const results: Array<DeserializedSearchResult> = [];

  if ('response' in searchResponse) {
    const { response: responses, document: documents } = searchResponse;
    responses.forEach((response) => {
      const { documentIndex, text: rawText } = response;
      const { pre, post, text } = parseSnippet(rawText);
      const document = documents[Number(documentIndex)];
      const { id, metadata: rawMetadata } = document;
      const { source, url, title, metadata } = parseMetadata(rawMetadata, text);

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
  }
  else {

    searchResponse.forEach((document:SearchResult) => {
      const { pre, post, text } = parseSnippet(document.text);

      results.push({
        id: document.document_id,
        snippet: {
          pre,
          text,
          post
        },
        source: document.document_metadata.source,
        url: document.document_metadata.url,
        title: document.document_metadata.title || text.split(' ').slice(0, 10).join(' '),
        metadata: document.document_metadata
      } as DeserializedSearchResult);
    });
  }


  return results;
};
