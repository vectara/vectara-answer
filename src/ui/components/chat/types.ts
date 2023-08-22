import { SearchResult } from "../searchResult/SearchResult";

export type ChatTurn = {
  question: string;
  isLoading?: boolean;
  answer?: string;
  query?: string;
  results?: SearchResult[];
};
