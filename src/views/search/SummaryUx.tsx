import { VuiSpacer, VuiTitle, VuiHorizontalRule, VuiSummary } from "../../ui";
import {
  sanitizeCitations,
  reorderCitations,
  applyCitationOrder,
} from "../../ui/utils/citations";
import { useSearchContext } from "../../contexts/SearchContext";
import { SearchResultList } from "./results/SearchResultList";
import { ProgressReport } from "./progressReport/ProgressReport";
import { SummaryCitation } from "./summary/SummaryCitation";
import { DeserializedSearchResult } from "./types";

import { HfInference } from '@huggingface/inference'
import { useEffect, useState } from "react";

export const SummaryUx = () => {
  const {
    isSearching,
    searchResults,
    isSummarizing,
    summarizationResponse,
    searchResultsRef,
    selectedSearchResultPosition,
    hfToken,
  } = useSearchContext();

  const rawSummary = summarizationResponse?.summary[0]?.text;
  const unorderedSummary = sanitizeCitations(rawSummary);

  let summary = "";
  let summarySearchResults: DeserializedSearchResult[] = [];

  if (!isSummarizing && unorderedSummary) {
    summary = reorderCitations(unorderedSummary);
    if (searchResults) {
      summarySearchResults = applyCitationOrder(
        searchResults,
        unorderedSummary
      );
    }
  }

  // compute the HEM score
  const summaryWithoutCitations = rawSummary?.replace(/\[[0-9]+\]/g, "");
  const API_URL = "https://api-inference.huggingface.co/models/vectara/hallucination_evaluation_model";
  const inference = new HfInference(hfToken && hfToken.length > 0 ? hfToken : undefined);
  const hem = inference.endpoint(API_URL);

  async function getHEMScore(inputText: string): Promise<any> {
    const responseData = await hem.textClassification({ inputs: inputText })
    const hemScore = responseData[0].score;
    return Math.round(hemScore * 100) / 100; // round to 2 digits
  }

  async function getMaxScore() {
    const scorePromises = summarySearchResults.map((result, index) => {
      const { snippet: { pre, post, text } } = result;
      const query = [pre, text, post, "[SEP]", summaryWithoutCitations].join(" ");
      const score = getHEMScore(query);
      return score
    });
  
    try {
      const scores = await Promise.all(scorePromises);
      console.log("Scores: ", scores)  // TEMP
      return Math.max(...scores);
    } catch (error) {
      console.error("An error occurred while processing scores: ", error);
      return -1; // Optional: early return in case of error
    }
  }

  const [maxScore, setMaxScore] = useState<number>(-1);
  useEffect(() => {
    if (summaryWithoutCitations !== undefined && summaryWithoutCitations.length > 0) {
      getMaxScore().then(score => {
        setMaxScore(score);
      }).catch(error => {
        console.error("Error getting max score: ", error);
      });
    }
  }, [summarySearchResults]);

  function getGaugeColor(maxScore: number) {
    if (maxScore > 0 && maxScore <= 0.25) {
      return 'red';
    } else if (maxScore > 0.25 && maxScore <= 0.5) {
      return 'orange';
    } else if (maxScore > 0.5 && maxScore <= 0.75) {
      return 'blue';
    } else {
      return 'green';
    }
  }

  return (
    <>
      <ProgressReport isSearching={isSearching} isSummarizing={isSummarizing} />

      {summary && (
        <>
          <VuiSpacer size="l" />

          <VuiTitle size="xs">
            <h2 style={{ display: 'flex', alignItems: 'center' }}> {/* Flex container */}
              <strong>Summary</strong>
              <div style={{
                height: '20px',
                width: '20px',
                backgroundColor: getGaugeColor(maxScore),
                display: 'inline-block',
                marginLeft: '10px',
                borderRadius: '50%'
              }} />
            </h2>
          </VuiTitle>

          <VuiSpacer size="s" />

          <VuiSummary summary={summary} SummaryCitation={SummaryCitation} />

          <VuiSpacer size="l" />
          <VuiHorizontalRule />
          <VuiSpacer size="l" />

          <VuiTitle size="xs">
            <h2>
              <strong>References</strong>
            </h2>
          </VuiTitle>

          <VuiSpacer size="s" />

          <SearchResultList
            results={summarySearchResults}
            selectedSearchResultPosition={selectedSearchResultPosition}
            setSearchResultRef={(el: HTMLDivElement | null, index: number) =>
              (searchResultsRef.current[index] = el)
            }
          />
        </>
      )}
    </>
  );
}
