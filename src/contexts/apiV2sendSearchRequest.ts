import { SummaryLanguage, QueryBody, QueryRequestHeaders } from "../views/search/types";

type GenerationConfig = {
  promptName?: string;
  maxUsedSearchResults?: number;
  promptText?: string;
  maxResponseCharacters?: number;
  responseLanguage?: SummaryLanguage;
  modelParameters?: {
    maxTokens: number;
    temperature: number;
    frequencyPenalty: number;
    presencePenalty: number;
  };
  citations?: {
    style: "none" | "numeric";
  } | {
    style: "html" | "markdown";
    urlPattern: string;
    textPattern: string;
  };
  enableFactualConsistencyScore?: boolean;
};
type Config = {
  customerId: string;
  apiKey?: string;
  authToken?: string;
  endpoint?: string;
  query: string;
  corpusKey: string;
  search: {
    metadataFilter: string;
    lexicalInterpolation?: number;
    customDimensions?: Record<string, number>;
    semantics?: "default" | "query" | "response";
    offset: number;
    limit?: number;
    contextConfiguration?: {
      charactersBefore?: number;
      charactersAfter?: number;
      sentencesBefore?: number;
      sentencesAfter?: number;
      startTag?: string;
      endTag?: string;
    };
    reranker?: {
      type: "none";
    } | {
      type: "customer_reranker";
      rerankerId: string;
    } | {
      type: "mmr";
      diversityBias: number;
    };
  };
  generation?: GenerationConfig;
  chat?: {
    store?: boolean;
    conversationId?: string;
  };
};

const convertReranker = (reranker?: Config["search"]["reranker"]) => {
  if (!reranker) return;

  if (reranker.type === "none") {
    return {
      type: reranker.type
    };
  }

  if (reranker.type === "customer_reranker") {
    return {
      type: reranker.type,
      reranker_id: reranker.rerankerId
    };
  }

  if (reranker.type === "mmr") {
    return {
      type: reranker.type,
      diversity_bias: reranker.diversityBias
    };
  }
};

const convertCitations = (citations?: GenerationConfig["citations"]) => {
  if (!citations) return;

  if (citations.style === "none" || citations.style === "numeric") {
    return {
      style: citations.style
    };
  }

  if (citations.style === "html" || citations.style === "markdown") {
    return {
      style: citations.style,
      url_pattern: citations.urlPattern,
      text_pattern: citations.textPattern
    };
  }
};


/**
 * Send a request to the query API.
 */
export const apiV2sendSearchRequest = async ({
  customerId,
  corpusKey,
  apiKey,
  query,
  endpoint,
  search,
  generation
}: Config) => {
  const {
    metadataFilter,
    lexicalInterpolation,
    customDimensions,
    semantics,
    offset,
    limit,
    contextConfiguration,
    reranker
  } = search

  const body: QueryBody = {
    query,
    search: {
      corpora: corpusKey.split(",").map((key) => (
          {
            corpus_key: key,
            metadata_filter: metadataFilter ? `doc.source = '${metadataFilter}'`: undefined,
            lexical_interpolation: lexicalInterpolation,
            custom_dimensions: customDimensions,
            semantics
          }
      )),
      offset,
      limit,
      context_configuration: {
        characters_before: contextConfiguration?.charactersBefore,
        characters_after: contextConfiguration?.charactersAfter,
        sentences_before: contextConfiguration?.sentencesBefore,
        sentences_after: contextConfiguration?.sentencesAfter,
        start_tag: contextConfiguration?.startTag,
        end_tag: contextConfiguration?.endTag
      },
      reranker: convertReranker(reranker)
    }
  };

  if (generation) {
    const {
      promptName,
      maxUsedSearchResults,
      promptText,
      maxResponseCharacters,
      responseLanguage,
      modelParameters,
      citations,
      enableFactualConsistencyScore
    } = generation;

    body.generation = {
      prompt_name: promptName,
      max_used_search_results: maxUsedSearchResults,
      prompt_text: promptText,
      max_response_characters: maxResponseCharacters,
      response_language: responseLanguage,
      model_parameters: modelParameters && {
        max_tokens: modelParameters.maxTokens,
        temperature: modelParameters.temperature,
        frequency_penalty: modelParameters.frequencyPenalty,
        presence_penalty: modelParameters.presencePenalty
      },
      citations: convertCitations(citations),
      enable_factual_consistency_score: enableFactualConsistencyScore
    };
  }

  const headers: QueryRequestHeaders = {
    "customer-id": customerId,
    "Content-Type": "application/json"
  };

  if (apiKey) headers["x-api-key"] = apiKey;

  const url = `https://${endpoint}/v2/query`;
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  });

  if (response.status === 400 || response.status === 403 || response.status === 404) {
    const result = await response.json();
    throw new Error(`BAD REQUEST: ${result?.messages[0] ?? result.field_errors}`);
  }

  if (response.status !== 200) throw new Error(response.status.toString());

  return await response.json()
};
