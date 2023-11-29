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

export type ConfidenceLevel = "unavailable" | "low" | "medium" | "high";

export const getConfidenceLevel = (score: number): ConfidenceLevel => {
  if (score < 0) {
    return "unavailable";
  }

  if (score <= 0.33) {
    return "low";
  }

  if (score <= 0.66) {
    return "medium";
  }

  return "high";
};

export const useHemScore = (
  enable_hem: boolean,
  hfToken: string,
  rawSummary: string | undefined,
  summarySearchResults: DeserializedSearchResult[]
) => {
  const [isFetchingHemScore, setIsFetchingHemScore] = useState<boolean>(false);
  const [hemScore, setHemScore] = useState<number>(-1);

  const summaryWithoutCitations = rawSummary?.replace(/\[[0-9]+\]/g, "");

  const inference = new HfInference(
    hfToken && hfToken.length > 0 ? hfToken : undefined
  );

  const hem = inference.endpoint(API_URL);

  useEffect(() => {
    if (!enable_hem || summarySearchResults.length === 0 || !summaryWithoutCitations) {
      setHemScore(-1);
      return;
    }

    console.log("fetch", summaryWithoutCitations);
    setIsFetchingHemScore(true);
    getMaxScore(hem, summaryWithoutCitations, summarySearchResults)
      .then((score) => {
        setHemScore(score);
        setIsFetchingHemScore(false);
      })
      .catch((error) => {
        console.error("Error getting max score: ", error);
        setIsFetchingHemScore(false);
      });
  }, [rawSummary]);

  return {
    isFetchingHemScore,
    hemScore,
    confidenceLevel: getConfidenceLevel(hemScore),
  };
};
