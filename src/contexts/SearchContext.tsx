/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
import { useSearchParams } from "react-router-dom";
import {
  DeserializedSearchResult,
  SearchResponse,
  SummaryLanguage,
  SearchError,
} from "../views/search/types";
import { useConfigContext } from "./ConfigurationContext";
import { sendSearchRequest } from "./sendSearchRequest";
import {
  HistoryItem,
  addHistoryItem,
  deleteHistory,
  retrieveHistory,
} from "./history";
import { deserializeSearchResponse } from "../utils/deserializeSearchResponse";

interface SearchContextType {
  filterValue: string;
  setFilterValue: (source: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: ({
    value,
    filter,
    language,
    isPersistable,
  }: {
    value?: string;
    filter?: string;
    language?: SummaryLanguage;
    isPersistable?: boolean;
  }) => void;
  reset: () => void;
  isSearching: boolean;
  searchError: SearchError | undefined;
  searchResults: DeserializedSearchResult[] | undefined;
  searchTime: number;
  isSummarizing: boolean;
  summarizationError: SearchError | undefined;
  summarizationResponse: SearchResponse | undefined;
  summaryTime: number;
  language: SummaryLanguage;
  summaryNumResults: number;
  summaryNumSentences: number;
  summaryPromptName: string;
  summaryPromptText: string;
  summaryEnableHem: boolean;
  hfToken: string;
  history: HistoryItem[];
  clearHistory: () => void;
  searchResultsRef: React.MutableRefObject<HTMLElement[] | null[]>;
  selectedSearchResultPosition: number | undefined;
  selectSearchResultAt: (position: number) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const getQueryParam = (urlParams: URLSearchParams, key: string) => {
  const value = urlParams.get(key);
  if (value) return decodeURIComponent(value);
  return undefined;
};

type Props = {
  children: ReactNode;
};

let searchCount = 0;

export const SearchContextProvider = ({ children }: Props) => {
  const { isConfigLoaded, search, summary, rerank, hybrid, uxMode } =
    useConfigContext();
  const isSummaryEnabled = uxMode === "summary";

  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  // Language
  const [languageValue, setLanguageValue] = useState<SummaryLanguage>();

  // History
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Basic search
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<SearchError | undefined>();
  const [searchResponse, setSearchResponse] = useState<SearchResponse>();
  const [searchTime, setSearchTime] = useState<number>(0);

  // Summarization
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summarizationError, setSummarizationError] = useState<
    SearchError | undefined
  >();
  const [summarizationResponse, setSummarizationResponse] =
    useState<SearchResponse>();
  const [summaryTime, setSummaryTime] = useState<number>(0);

  // Citation selection
  const searchResultsRef = useRef<HTMLElement[] | null[]>([]);
  const [selectedSearchResultPosition, setSelectedSearchResultPosition] =
    useState<number>();

  useEffect(() => {
    setHistory(retrieveHistory());
  }, []);

  // Use the browser back and forward buttons to traverse history
  // of searches, and bookmark or share the URL.
  useEffect(() => {
    // Search params are updated as part of calling onSearch, so we don't
    // want to trigger another search when the search params change if that
    // search is already in progress.
    if (!isConfigLoaded || isSearching) return;

    const urlParams = new URLSearchParams(searchParams);

    onSearch({
      // Set to an empty string to wipe out any existing search value.
      value: getQueryParam(urlParams, "query") ?? "",
      filter: getQueryParam(urlParams, "filter"),
      language: getQueryParam(urlParams, "language") as
        | SummaryLanguage
        | undefined,
      isPersistable: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfigLoaded, searchParams]); // TODO: Add onSearch and fix infinite render loop

  const searchResults = deserializeSearchResponse(searchResponse);

  useEffect(() => {
    if (searchResults) {
      searchResultsRef.current = searchResultsRef.current.slice(
        0,
        searchResults.length
      );
    } else {
      searchResultsRef.current = [];
    }
  }, [searchResults]);

  const clearHistory = () => {
    setHistory([]);
    deleteHistory();
  };

  const selectSearchResultAt = (position: number) => {
    if (
      !searchResultsRef.current[position] ||
      selectedSearchResultPosition === position
    ) {
      // Reset selected position.
      setSelectedSearchResultPosition(undefined);
    } else {
      setSelectedSearchResultPosition(position);
      // Scroll to the selected search result.
      window.scrollTo({
        top: searchResultsRef.current[position]!.offsetTop - 78,
        behavior: "smooth",
      });
    }
  };

  const getLanguage = (): SummaryLanguage =>
    (languageValue ?? summary.defaultLanguage) as SummaryLanguage;

  const onSearch = async ({
    value = searchValue,
    filter = filterValue,
    language = getLanguage(),
    isPersistable = true,
  }: {
    value?: string;
    filter?: string;
    language?: SummaryLanguage;
    isPersistable?: boolean;
  }) => {
    const searchId = ++searchCount;

    setSearchValue(value);
    setFilterValue(filter);
    setLanguageValue(language);

    if (value?.trim()) {
      // Save to history.
      setHistory(addHistoryItem({ query: value, filter, language }, history));

      // Persist to URL, only if the search executes. This way the prior
      // search that was persisted remains in the URL if the search doesn't execute.
      if (isPersistable) {
        setSearchParams(
          new URLSearchParams(
            `?query=${encodeURIComponent(value)}&filter=${encodeURIComponent(
              filter
            )}&language=${encodeURIComponent(language)}`
          )
        );
      }

      // First call - only search results - should come back quicky while we wait for summarization
      setIsSearching(true);
      setIsSummarizing(true);
      setSelectedSearchResultPosition(undefined);

      let initialSearchResponse;

      try {
        const startTime = Date.now();
        initialSearchResponse = await sendSearchRequest({
          filter,
          query_str: value,
          rerank: rerank.isEnabled,
          rerankNumResults: rerank.numResults,
          rerankerId: rerank.id,
          rerankDiversityBias: rerank.diversityBias,
          hybridNumWords: hybrid.numWords,
          hybridLambdaLong: hybrid.lambdaLong,
          hybridLambdaShort: hybrid.lambdaShort,
          customerId: search.customerId!,
          corpusId: search.corpusId!,
          endpoint: search.endpoint!,
          apiKey: search.apiKey!,
        });
        const totalTime = Date.now() - startTime;

        // If we send multiple requests in rapid succession, we only want to
        // display the results of the most recent request.
        if (searchId === searchCount) {
          setIsSearching(false);
          setSearchTime(totalTime);
          setSearchResponse(initialSearchResponse);

          if (initialSearchResponse.response.length > 0) {
            setSearchError(undefined);
          } else {
            setSearchError({
              message: "There weren't any results for your search.",
            });
          }
        }
      } catch (error) {
        console.log("Search error", error);
        setIsSearching(false);
        setSearchError(error as SearchError);
        setSearchResponse(undefined);
      }

      // Second call - search and summarize (if summary is enabled); this may take a while to return results
      if (isSummaryEnabled) {
        if (initialSearchResponse.response.length > 0) {
          const startTime = Date.now();
          try {
            const response = await sendSearchRequest({
              filter,
              query_str: value,
              summaryMode: true,
              rerank: rerank.isEnabled,
              rerankNumResults: rerank.numResults,
              rerankerId: rerank.id,
              rerankDiversityBias: rerank.diversityBias,
              summaryNumResults: summary.summaryNumResults,
              summaryNumSentences: summary.summaryNumSentences,
              summaryPromptName: summary.summaryPromptName,
              summaryPromptText: summary.summaryPromptText,
              hybridNumWords: hybrid.numWords,
              hybridLambdaLong: hybrid.lambdaLong,
              hybridLambdaShort: hybrid.lambdaShort,
              language,
              customerId: search.customerId!,
              corpusId: search.corpusId!,
              endpoint: search.endpoint!,
              apiKey: search.apiKey!,
            });
            const totalTime = Date.now() - startTime;

            // If we send multiple requests in rapid succession, we only want to
            // display the results of the most recent request.
            if (searchId === searchCount) {
              setIsSummarizing(false);
              setSummarizationError(undefined);
              setSummarizationResponse(response);
              setSummaryTime(totalTime);
            }
          } catch (error) {
            console.log("Summary error", error);
            setIsSummarizing(false);
            setSummarizationError(error as SearchError);
            setSummarizationResponse(undefined);
          }
        } else {
          setIsSummarizing(false);
          setSummarizationError({
            message: "No search results to summarize",
          });
          setSummarizationResponse(undefined);
        }
      }
    } else {
      // Persist to URL.
      if (isPersistable) setSearchParams(new URLSearchParams(""));

      setSearchResponse(undefined);
      setSummarizationResponse(undefined);
      setIsSearching(false);
      setIsSummarizing(false);
    }
  };

  const reset = () => {
    // Specifically don't reset language because that's more of a
    // user preference.
    onSearch({ value: "", filter: "" });
  };

  return (
    <SearchContext.Provider
      value={{
        filterValue,
        setFilterValue,
        searchValue,
        setSearchValue,
        onSearch,
        reset,
        isSearching,
        searchError,
        searchResults,
        searchTime,
        isSummarizing,
        summarizationError,
        summarizationResponse,
        summaryTime,
        language: getLanguage(),
        summaryNumResults: summary.summaryNumResults,
        summaryNumSentences: summary.summaryNumSentences,
        summaryPromptName: summary.summaryPromptName,
        summaryPromptText: summary.summaryPromptText,
        summaryEnableHem: summary.summaryEnableHem,
        hfToken: summary.hfToken,
        history,
        clearHistory,
        searchResultsRef,
        selectedSearchResultPosition,
        selectSearchResultAt,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }
  return context;
};
