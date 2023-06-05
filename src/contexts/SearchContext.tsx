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
  searchError: any;
  searchResults: DeserializedSearchResult[] | undefined;
  isSummarizing: boolean;
  summarizationError: any;
  summarizationResponse: SearchResponse | undefined;
  language: SummaryLanguage;
  setLanguage: (language: SummaryLanguage) => void;
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
  const { isConfigLoaded, search } = useConfigContext();

  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  // Language.
  const [languageValue, setLanguageValue] = useState<SummaryLanguage>("auto");

  // History
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Basic search
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<any>();
  const [searchResponse, setSearchResponse] = useState<SearchResponse>();

  // Summarization
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summarizationError, setSummarizationError] = useState<any>();
  const [summarizationResponse, setSummarizationResponse] =
    useState<SearchResponse>();

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
    if (!isConfigLoaded) return;

    const urlParams = new URLSearchParams(searchParams);

    onSearch({
      value: getQueryParam(urlParams, "query"),
      filter: getQueryParam(urlParams, "filter"),
      language: getQueryParam(urlParams, "language") as
        | SummaryLanguage
        | undefined,
      isPersistable: false,
    });
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

  const onSearch = async ({
    value = searchValue,
    filter = filterValue,
    language = languageValue,
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

      try {
        const response = await sendSearchRequest({
          filter,
          query_str: value,
          customerId: search.customerId!,
          corpusId: search.corpusId!,
          endpoint: search.endpoint!,
          apiKey: search.apiKey!,
        });
        // If we send multiple requests in rapid succession, we only want to
        // display the results of the most recent request.
        if (searchId === searchCount) {
          setIsSearching(false);
          setSearchError(undefined);
          setSearchResponse(response);
        }
      } catch (error) {
        setIsSearching(false);
        setSearchError(error);
        setSearchResponse(undefined);
      }

      // Second call - search and summarize; this may take a while to return results
      try {
        const response = await sendSearchRequest({
          filter,
          query_str: value,
          includeSummary: true,
          language,
          customerId: search.customerId!,
          corpusId: search.corpusId!,
          endpoint: search.endpoint!,
          apiKey: search.apiKey!,
        });

        // If we send multiple requests in rapid succession, we only want to
        // display the results of the most recent request.
        if (searchId === searchCount) {
          setIsSummarizing(false);
          setSummarizationError(undefined);
          setSummarizationResponse(response);
        }
      } catch (error) {
        setIsSummarizing(false);
        setSummarizationError(error);
        setSummarizationResponse(undefined);
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
        isSummarizing,
        summarizationError,
        summarizationResponse,
        language: languageValue,
        setLanguage: setLanguageValue,
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
