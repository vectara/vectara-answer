import { useEffect, useState } from "react";
import { HfInference, HfInferenceEndpoint } from "@huggingface/inference";
import { DeserializedSearchResult } from "../views/search/types";

const API_URL =
  "https://api-inference.huggingface.co/models/vectara/hallucination_evaluation_model";

async function getMaxScore(
  hem: HfInferenceEndpoint,
  summaryWithoutCitations: string,
  summarySearchResults: DeserializedSearchResult[]
) {
  async function getHemScore(inputText: string): Promise<any> {
    const responseData = await hem.textClassification({ inputs: inputText });
    const hemScore = responseData[0].score;
    console.log(responseData);
    return Math.round(hemScore * 100) / 100; // round to 2 digits
  }

  const scorePromises = summarySearchResults.map((result) => {
    const {
      snippet: { pre, post, text },
    } = result;
    const query = [pre, text, post, "[SEP]", summaryWithoutCitations].join(" ");
    const score = getHemScore(query);
    return score;
  });

  try {
    const scores = await Promise.all(scorePromises);
    return Math.max(...scores);
  } catch (error) {
    console.error("An error occurred while processing scores: ", error);
    return -1; // Optional: early return in case of error
  }
}

export const useHemScore = (
  hfToken: string,
  rawSummary: string | undefined,
  summarySearchResults: DeserializedSearchResult[]
) => {
  const [hemScore, setHemScore] = useState<number>(-1);

  const [serializedResults, setSerializedResults] = useState(
    JSON.stringify(summarySearchResults)
  );

  const summaryWithoutCitations = rawSummary?.replace(/\[[0-9]+\]/g, "");

  const inference = new HfInference(
    hfToken && hfToken.length > 0 ? hfToken : undefined
  );

  const hem = inference.endpoint(API_URL);

  useEffect(() => {
    setSerializedResults(JSON.stringify(summarySearchResults));
  }, [summarySearchResults]);

  useEffect(() => {
    if (
      summaryWithoutCitations !== undefined &&
      summaryWithoutCitations.length > 0
    ) {
      getMaxScore(hem, summaryWithoutCitations, summarySearchResults)
        .then((score) => {
          setHemScore(score);
        })
        .catch((error) => {
          console.error("Error getting max score: ", error);
        });
    }
  }, [serializedResults]);

  return { hemScore };
};
