import axios from "axios";
import { START_TAG, END_TAG } from "../utils/parseSnippet";
import { normal_reranker_id, slingshot_reranker_id, SummaryLanguage } from "../views/search/types";

type  Reranker = {
  isEnabled?: boolean,
  numResults?: number,
  names?: string,
  diversityBias?: number,
  userFunction?: string
}
type Config = {
  metadataFilter?: string;
  query_str?: string;
  language?: SummaryLanguage;
  summaryMode?: boolean;
  reranker?: Reranker;
  hybridNumWords: number;
  hybridLambdaShort?: number;
  hybridLambdaLong?: number;
  mode?: string;
  summaryNumResults?: number;
  summaryNumSentences?: number;
  summaryPromptName?: string;
  summaryPromptText?: string;
  enableFactualConsistencyScore?: boolean
  customerId: string;
  corpusId: string;
  endpoint: string;
  apiKey: string;
  userFunction?: string;
  logQuery?: boolean;
};

type RerankingConfig = {
  reranker_name?: string;
  user_function?: string;
  reranker_id?: number;
  diversity_bias?: number;
  next_reranking_config?: RerankingConfig;
};

const convertReranker = (reranker?: Reranker) => {
  if (!reranker?.isEnabled || !reranker.names) {
    return {};
  }


  const rerankerNames = reranker?.names?.split(",");
  const buildRerankingConfig = (index: number): RerankingConfig | Record<string, string> => {
    if (index >= rerankerNames.length) {
      return {};
    }

    const name = rerankerNames[index];

    switch (name) {
      case "userfn":
        return {
          reranker_name: "User_Defined_Function_Reranker",
          user_function: reranker.userFunction ?? "",
          next_reranking_config: buildRerankingConfig(index + 1)
        };

      case "slingshot":
        return {
          reranker_name: "vectara-rrk-v1.0.0",
          reranker_id: slingshot_reranker_id,
          next_reranking_config: buildRerankingConfig(index + 1)
        };

      case "normal":
        return {
          reranker_name: "Rerank_Multilingual_v1",
          reranker_id: normal_reranker_id,
          next_reranking_config: buildRerankingConfig(index + 1)
        };

      case "mmr":
        return {
          reranker_name: "Maximum Marginal Relevance Reranker",
          diversity_bias: reranker.diversityBias ?? 0.3,
          next_reranking_config: buildRerankingConfig(index + 1)
        };

      // Add other reranker types as needed
      default:
        return {}
    }
  };

  // Start the recursion from the first reranker
  return buildRerankingConfig(0);
};

export const sendSearchRequest = async ({
  metadataFilter,
  query_str,
  language,
  summaryMode,
  reranker,
  hybridNumWords,
  hybridLambdaShort,
  hybridLambdaLong,
  mode,
  summaryNumResults,
  summaryNumSentences,
  summaryPromptName,
  summaryPromptText,
  enableFactualConsistencyScore,
  customerId,
  corpusId,
  endpoint,
  apiKey,
  userFunction,
  logQuery=false
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
      metadataFilter: metadataFilter,
      semantics: mode ? `RESPONSE` : undefined,
    };
  });

  if (summaryPromptText) {
    summaryPromptText = summaryPromptText.replaceAll("\\n", "\n");
    summaryPromptText = summaryPromptText.replaceAll("\\\"", "\\\\\\\"");
  }

  const body = {
    logQuery: logQuery, // passing request middleware to decide log the query or not
    query: [
      {
        query: query_str,
        start: 0,
        numResults: reranker?.isEnabled ? reranker.numResults : 10,
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
                  promptText: summaryPromptText,
                  factualConsistencyScore: enableFactualConsistencyScore ?? false
                },
              ],
            }
          : {}),
        rerankingConfig: convertReranker(reranker),
      },
    ],
  };

  console.log(reranker)
  console.log(body)
  console.log(convertReranker(reranker))

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
    if (
      summaryStatus.length > 0 &&
      summaryStatus[0]["code"] !== "OK"
    ) {
      const statusDetail = summaryStatus[0]["statusDetail"];
      const code = summaryStatus[0]["code"]
      throw new Error(`BAD REQUEST: error code [${code}]: ${statusDetail}`);
    }
  }

  return result["data"]["responseSet"][0];
};
