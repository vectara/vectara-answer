import axios from "axios";
import { START_TAG, END_TAG } from "../utils/parseSnippet";
import { SummaryLanguage, mmr_reranker_id } from "../views/search/types";

type Config = {
  filter: string;
  query_str?: string;
  language?: SummaryLanguage;
  summaryMode?: boolean;
  rerank?: boolean;
  rerankNumResults?: number;
  rerankerId?: number;
  rerankDiversityBias?: number;
  hybridNumWords: number;
  hybridLambdaShort?: number;
  hybridLambdaLong?: number;
  summaryNumResults?: number;
  summaryNumSentences?: number;
  summaryPromptName?: string;
  customerId: string;
  corpusId: string;
  endpoint: string;
  apiKey: string;
};

export const sendSearchRequest = async ({
  filter,
  query_str,
  language,
  summaryMode,
  rerank,
  rerankNumResults,
  rerankerId,
  rerankDiversityBias,
  hybridNumWords,
  hybridLambdaShort,
  hybridLambdaLong,
  summaryNumResults,
  summaryNumSentences,
  summaryPromptName,
  customerId,
  corpusId,
  endpoint,
  apiKey,
}: Config) => {
  const lambda =
    typeof query_str === "undefined" || query_str.trim().split(" ").length > hybridNumWords
      ? hybridLambdaLong
      : hybridLambdaShort;
  const corpusKeyList = corpusId.split(",").map((id) => {
    return {
      customerId,
      corpusId: id,
      lexicalInterpolationConfig: {
        lambda: lambda,
      },
      metadataFilter: filter ? `doc.source = '${filter}'` : undefined,
    };
  });

  const body = {
    query: [
      {
        query: query_str,
        start: 0,
        numResults: rerank ? rerankNumResults : 10,
        corpusKey: corpusKeyList,
        contextConfig: {
          sentencesBefore: summaryMode ? summaryNumSentences : 2,
          sentencesAfter: summaryMode ? summaryNumSentences : 2,
          startTag: START_TAG,
          endTag: END_TAG,
        },
        ...(summaryMode
          ? {
              summary: [
                {
                  responseLang: language,
                  maxSummarizedResults: summaryNumResults,
                  summarizerPromptName: summaryPromptName,
                },
              ],
            }
          : {}),
        ...(rerank
          ? {
              rerankingConfig: {
                rerankerId: rerankerId,
                ...(rerankerId === mmr_reranker_id ? {
                      mmrConfig: {
                        diversityBias: rerankDiversityBias,
                      }
                    } : {}
                ),
              },
            }
          : {}),
      },
    ],
  };

  let headers = {};
  let url = "";
  if (process.env.NODE_ENV === "production") {
    // Call proxy server if in production
    url = `/v1/query`;
    headers = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
  } else {
    // Call directly if in development
    url = `https://${endpoint}/v1/query`;
    headers = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "customer-id": customerId,
        "x-api-key": apiKey,
        "grpc-timeout": "60S",
      },
    };
  }
  const result = await axios.post(url, body, headers);

  const status = result["data"]["responseSet"][0]["status"];
  if (status.length > 0 && status[0]["code"] === "UNAUTHORIZED") {
    console.log("UNAUTHORIZED access; check your API key and customer ID");
  }

  if (summaryMode) {
    const summaryStatus =
      result["data"]["responseSet"][0]["summary"][0]["status"];
    if (
      summaryStatus.length > 0 &&
      summaryStatus[0]["code"] === "BAD_REQUEST"
    ) {
      throw new Error(`BAD REQUEST: Too much text for the summarizer to summarize. Please try reducing the number of search results to summarize, or the context of each result by adjusting the 'summary_num_sentences', and 'summary_num_results' parameters respectively.`);
    }
    if (
      summaryStatus.length > 0 &&
      summaryStatus[0]["code"] === "NOT_FOUND" &&
      summaryStatus[0]["statusDetail"] === "Failed to retrieve summarizer."
    ) {
      throw new Error(`BAD REQUEST: summarizer ${summaryPromptName} is invalid for this account.`);
    }
  }

  return result["data"]["responseSet"][0];
};
